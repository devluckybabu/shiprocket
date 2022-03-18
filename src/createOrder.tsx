import { dataOptions } from "./data_types";

const createOrder = (options: dataOptions) => {
  return new Promise((resolve, reject) => {
    options.auth.then((user: any) => {
      fetch(`https://apiv2.shiprocket.in/v1/external/orders/create/adhoc`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          "Authorization": "Bearer " + user?.token
        },
        body: JSON.stringify(options)
      }).then((res) => res.json()).then((result) => resolve(result))
    }).catch((error) => reject(error))
  });
};

export default createOrder;