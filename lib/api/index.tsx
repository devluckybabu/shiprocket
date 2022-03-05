import createOrder from "./createOrder";
import { orderOptions } from "./data_types";
import updateOrder from "./updateOrder";
import getStatements from "./getStatements";
const url = "https://apiv2.shiprocket.in/v1/external";
interface options {
  email: string;
  password: string;
};


class shiprocketConfig {
  private email: string;
  private password: string;
  constructor({ email, password }: options) {
    this.email = email;
    this.password = password
  };

  private post = (path: string, data: object) => {
    return new Promise((resolve, reject) => {
      fetch(url + path, {
        method: 'POST',
        headers: { 'Content-Type': 'apllication/json', 'Accept': 'apllication/json' },
        body: JSON.stringify(data)
      }).then((res) => res.json())
        .then((result) => {
          return resolve(result);
        }).catch((error) => reject(error));
    });
  }
  private auth = () => this.post('/auth/login', { email: this.email, password: this.password });
  private get = (path: string) => {
    return new Promise((resolve, reject) => {
      this.auth().then((user: any) => {
        if (user?.token) {
          return fetch(url + path, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": "Bearer " + user?.token
            }
          }).then((res) => res.json())
            .then((result) => resolve(result))
            .catch((error) => reject(error))
        } else {
          return reject(user);
        }
      }).catch((error) => reject(error))
    })
  }
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
  }) => {
    const data = options && typeof options == 'object' ? options : {};
    const full_url = Object.entries(data).map(([key, value]) => `${key}=${value}`).join("&");
    const path = `/orders?` + full_url;
    return this.get(path);
  }


  /**
   * 
   * @param id string : e.g="432136546"
   * @returns object
   */
  //get specific order
  getOrder = (id: string) => this.get('/orders/show/' + id);

  /**
   * *
   * @param options : { type: 'awb' | 'shipment' | string, id: string }
   * @returns object
   */
  ///get tracking data
  getTracking = (options: { type: 'awb' | 'shipment' | string, id: string }) => {
    return this.get(`/courier/track/${options.type}/${options.id}`);
  };
  createOrder = (options: orderOptions) => createOrder({ ...options, auth: this.auth() });
  updateOrder = (options: orderOptions) => updateOrder({ ...options, auth: this.auth() });

  /**
   * 
   * @param pincode number | string
   * @returns object
   */
  getLocality = (pincode: number) => this.get(`/open/postcode/details?postcode=${pincode}`);

  getStatements = (options?: { per_page?: number; page?: number; to?: string; from?: string }) => getStatements({ auth: this.auth(), ...options });
};

export default shiprocketConfig;