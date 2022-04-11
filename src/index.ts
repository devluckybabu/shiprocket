import createOrder from "./createOrder";
import { options, ProductOptions } from "./types";
const url = "https://apiv2.shiprocket.in/v1/external";

type awb_number = string | number;
const paramUrl = (options?: object) => {
  if (options && typeof options == "object") {
    const params = Object.entries(options).map(([key, vlaue]) => `${key}=${vlaue}`).join("&");
    return params;
  };
  return '';
};

class shiprocket {
  private email: string;
  private password: string;
  constructor(user: { email: string; password: string }) {
    this.email = user.email;
    this.password = user.password
  };

  auth = () => {
    return new Promise((resolve, reject) => {
      fetch(url + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'apllication/json', 'Accept': 'apllication/json' },
        body: JSON.stringify({ email: this.email, password: this.password })
      }).then((res) => res.json()).
        then((result) => resolve(result)).catch((error) => reject(error));
    });
  };

  private post = (path: string, data: object) => {
    return new Promise((resolve, reject) => {
      this.auth().then((user: any) => {
        if (user?.token) {
          fetch(url + path, {
            method: 'POST',
            headers: {
              'Content-Type': 'apllication/json',
              'Accept': 'apllication/json',
              "Authorization": "Bearer " + user?.token
            },
            body: JSON.stringify(data)
          }).then((res) => res.json()).then((result) => resolve(result)).catch((error) => reject(error));
        } else return reject(user);
      }).catch((error) => reject(error));
    });
  }
  private get = (path: string) => {
    return new Promise((resolve, reject) => {
      this.auth().then((user: any) => {
        if (user?.token) {
          fetch(url + path, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": "Bearer " + user?.token
            }
          }).then((res) => res.json()).then((result) => resolve(result)).catch((error) => reject(error))
        } else return reject(user);
      }).catch((error) => reject(error));
    });
  };
  getOrders = (options?: {
    per_page?: number;
    page?: number;
    sort?: 'ASC' | "DESC",
    sort_by?: string;
    to?: string;
    from?: string;
    filter?: string;
    filter_by?: string;
    search?: string;
    pickup_location?: string;
    orderId?: string | number;
  }) => {
    if (options?.orderId) {
      const path = '/orders/show/' + options?.orderId;
      return this.get(path);
    } else {
      const params = paramUrl(options);
      const path = `/orders?` + params;
      return this.get(path);
    }
  };


  /**
   * @param id string : e.g="432136546"
   * @return object
   */
  //get specific order
  getOrder = (id: string) => this.get('/orders/show/' + id);

  /**
   * @param options : { type: 'awb' | 'shipment' | 'Order Id, id: string }
   * @return object
   */
  ///get tracking data
  getTracking = (options: { type: 'awb' | 'shipment' | 'orderId', id: string | number }) => {
    if (options.type == "orderId") {
      return this.get(`/courier/track?order_id=${options.id}`);
    };
    return this.get(`/courier/track/${options.type}/${options.id}`);
  };
  createOrder = (data: options) => createOrder({ auth: this.auth(), data });
  // updateOrder = (options: orderOptions) => updateOrder({ auth: this.auth(), data: options });

  getProducts = (
    options?: {
      per_page?: number;
      page?: number;
      sort?: "ASC" | "DESC";
      sort_by?: string;
      filter?: string;
      filter_by?: string;
      productId?: string | number;
    }) => {
    if (options?.productId) {
      const path = '/products/show/' + options?.productId;
      return this.get(path);
    } else {
      const path = '/products?' + paramUrl(options);
      return this.get(path);
    }
  };


  getCountries = (countryId?: string | number) => {
    if (countryId) return this.get('/countries/show/' + countryId);
    else return this.get('/countries');
  }
  getAllZones = (countryId: string | number) => this.get('/countries/show/' + countryId);

  getDiscrepancy = () => this.get('/billing/discrepancy');
  checkImport = (importId: string | number) => this.get(`/errors/${importId}/check`);

  getLists = (
    options?: {
      per_page?: number;
      page?: number;
      sort?: "ASC" | "DESC";
      sort_by?: string;
      filter?: string;
      filter_by?: string;
    }) => {
    const path = '/listings?' + paramUrl(options);
    return this.get(path);
  };
  /**
   * @param id required (string)
   * @returns object
   */
  getProduct = (id: string | number) => this.get('/products/show/' + id);

  addProduct = (data: ProductOptions) => this.post('/products', data);

  //get locality
  /**
   * @param pincode required (number | string)
   * @returns object
   */
  getLocality = (pincode: number | string) => this.get(`/open/postcode/details?postcode=${pincode}`);

  getServiceability = (
    options: {
      pickup_pincode: string;
      delivery_pincode: string;
      cod: boolean;
      orderId?: string;
      price?: number;
      weight: number;
      hieght: number;
      breadth?: number;
      mode?: 'Surface' | 'Air';
      is_return?: boolean;
    }) => {
    const {
      pickup_pincode,
      delivery_pincode,
      cod, weight,
      hieght, breadth,
      mode, is_return, price, orderId
    } = options;
    const parmas = {
      pickup_postcode: pickup_pincode,
      delivery_postcode: delivery_pincode,
      cod: cod == true ? 1 : 0,
      hieght, weight, is_return,
      mode, breadth, orderId,
      declare_value: price
    };
    const path = "/courier/serviceability/" + paramUrl(parmas);
    return this.get(path);
  };
  //get statements
  getStatements = (options?: {
    per_page?: number;
    page?: number; to?:
    string; from?: string
  }) => {
    const path = '/account/details/statement?' + paramUrl(options);
    return this.get(path);
  };

  ///get wallet balance
  getWalletBalance = () => this.get('/account/details/wallet-balance');
  ///get channels
  getChannels = () => this.get('/channels');
  getNDR = (options?: {
    per_page?: number;
    page?: number;
    to?: string;
    from?: string;
    search?: awb_number;
    awb?: string;
  }) => {
    if (options?.awb) {
      return this.get('/ndr/show/' + options.awb)
    } else {
      const path = '/ndr/all?' + paramUrl(options);
      return this.get(path);
    }
  };
  ndrAction = (
    options: {
      awb: number | string;
      action: 'return' | 're-attempt';
      comments: string;
    }) => this.post(`/ndr/${options.awb}/action`, { acction: options.action, comments: options.comments });
  ///get pickup locations
  getPickupLocations = () => this.get('/settings/company/pickup');

  ///add pickup location
  addPickupLocation = (
    data: {
      pickup_location: string;
      name: string;
      email: string;
      phone: string;
      address: string;
      address_2?: string,
      city: string;
      state: string,
      country: string;
      pin_code: string;
    }) => this.post('/settings/company/addpickup', data);
};

export default shiprocket;