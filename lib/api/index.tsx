import createOrder from "./createOrder";
import { orderOptions } from "./data_types";
import updateOrder from "./updateOrder";
import getStatements from "./getStatements";

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

  private auth = () => {
    return new Promise((resolve, reject) => {
      fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'apllication/json',
          'Accept': 'apllication/json'
        },
        body: JSON.stringify({ email: this.email, password: this.password })
      }).then((res) => res.json()).then((result) => {
        return resolve(result);
      }).catch((error) => reject(error))
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
  }) => {
    return new Promise((resolve, reject) => {
      this.auth().then((user: any) => {
        const data = typeof options == 'object' ? options : {};
        const full_url = Object.entries(data).map(([key, value]) => `${key}=${value}`).join();
        const url = `https://apiv2.shiprocket.in/v1/external/orders?` + full_url?.split(',').join('&');
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'apllication/json',
            'Accept': 'apllication/json',
            'Authorization': "Bearer " + user?.token
          }
        }).then((res) => res.json()).then((result) => {
          return resolve(result);
        }).catch((error) => reject(error))
      }).catch((error) => reject(error))
    })
  };


  getOrder = (id: string) => {
    return new Promise((resolve, reject) => {
      this.auth().then((user: any) => {
        const url = `https://apiv2.shiprocket.in/v1/external/orders/show/` + id;
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'apllication/json',
            'Accept': 'apllication/json',
            'Authorization': "Bearer " + user?.token
          }
        }).then((res) => res.json()).then((result) => {
          return resolve(result);
        }).catch((error) => reject(error))
      }).catch((error) => reject(error))
    })
  };


  getTracking = (options: { type: 'awb' | 'shipment' | string, id: string }) => {
    return new Promise((resolve, reject) => {
      this.auth().then((user: any) => {
        const url = `https://apiv2.shiprocket.in/v1/external/courier/track/${options.type}/${options.id}`
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + user?.token
          }
        }).then((res) => res.json()).then((result) => {
          return resolve(result?.tracking_data);
        }).catch((error) => reject(error))
      }).catch((error) => reject(error))
    })
  };
  createOrder = (options: orderOptions) => createOrder({ ...options, auth: this.auth() });
  updateOrder = (options: orderOptions) => updateOrder({ ...options, auth: this.auth() });
  getLocality = (pincode: number) => {
    return new Promise((resolve, reject) => {
      this.auth().then((user: any) => {
        fetch(`https://apiv2.shiprocket.in/v1/external/open/postcode/details?postcode=${pincode}`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Conentent-Type": "application/json",
            "Authorization": "Bearer " + user?.token,
          }
        }).then((res) => res.json()).then((result) => { resolve(result?.postcode_details) }).catch((error) => reject(error)).catch((error) => reject(error))
      }).catch((error) => reject(error))
    })
  }

  getStatements = (options?: { per_page?: number; page?: number; to?: string; from?: string }) => getStatements({ auth: this.auth(), ...options });
};

export default shiprocketConfig;