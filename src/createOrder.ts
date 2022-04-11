import { options } from "./types";


type createOptions = {
  auth: Promise<any>;
  data: options;
};
const converItems = (data: object[]) => {
  if (data?.length) {
    const order_items = data.map((item: any) => ({
      sku: item?.sku,
      name: item?.title,
      tax: item?.tax ?? "",
      hsn: item?.hsn ?? "",
      units: item?.quantity,
      selling_price: item?.price,
      discount: item?.discount ?? 0,
    }));
    return order_items;
  };

  return [];
};



const createOrder = (options: createOptions) => {
  return new Promise((resolve, reject) => {
    const { auth, data: {
      comment,
      order_id,
      priceInfo,
      channel_id,
      pakageInfo,
      order_date,
      order_items,
      billing_address,
      shipping_address,
      payment_method,
      pickup_location = 'primary',
      shipping_is_billing = true,
    } } = options;
    auth.then((user: any) => {
      fetch(`https://apiv2.shiprocket.in/v1/external/orders/create/adhoc`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          "Authorization": "Bearer " + user?.token
        },
        body: JSON.stringify({
          pickup_location,
          order_id, order_date,
          order_items: converItems(order_items),
          shipping_is_billing, comment, channel_id,
          payment_method, ...priceInfo, ...pakageInfo,
          billing_customer_name: billing_address.firt_name,
          billing_last_name: billing_address.last_name,
          billing_address: billing_address.address,
          billing_address_2: billing_address.address_2,
          billing_email: billing_address.email,
          billing_phone: billing_address.phone,
          billing_city: billing_address.city,
          billing_state: billing_address.state,
          billing_country: billing_address.country,
          billing_pincode: billing_address.pincode,
          shipping_customer_name: shipping_address?.firt_name,
          shipping_last_name: shipping_address?.last_name,
          shipping_phone: shipping_address?.phone,
          shipping_email: shipping_address?.email,
          shipping_address: shipping_address?.address,
          shipping_address_2: shipping_address?.address_2,
          shipping_city: shipping_address?.city,
          shipping_state: shipping_address?.state,
          shipping_pincode: shipping_address?.pincode,
          shipping_country: shipping_address?.country
        })
      }).then((res) => res.json()).then((result) => resolve(result))
    }).catch((error) => reject(error))
  });
};

export default createOrder;