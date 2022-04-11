"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const converItems = (data) => {
    if (data === null || data === void 0 ? void 0 : data.length) {
        const order_items = data.map((item) => {
            var _a, _b, _c;
            return ({
                sku: item === null || item === void 0 ? void 0 : item.sku,
                name: item === null || item === void 0 ? void 0 : item.title,
                tax: (_a = item === null || item === void 0 ? void 0 : item.tax) !== null && _a !== void 0 ? _a : "",
                hsn: (_b = item === null || item === void 0 ? void 0 : item.hsn) !== null && _b !== void 0 ? _b : "",
                units: item === null || item === void 0 ? void 0 : item.quantity,
                selling_price: item === null || item === void 0 ? void 0 : item.price,
                discount: (_c = item === null || item === void 0 ? void 0 : item.discount) !== null && _c !== void 0 ? _c : 0,
            });
        });
        return order_items;
    }
    ;
    return [];
};
const createOrder = (options) => {
    return new Promise((resolve, reject) => {
        const { auth, data: { comment, order_id, priceInfo, channel_id, pakageInfo, order_date, order_items, billing_address, shipping_address, payment_method, pickup_location = 'primary', shipping_is_billing = true, } } = options;
        auth.then((user) => {
            fetch(`https://apiv2.shiprocket.in/v1/external/orders/create/adhoc`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + (user === null || user === void 0 ? void 0 : user.token)
                },
                body: JSON.stringify(Object.assign(Object.assign(Object.assign({ pickup_location,
                    order_id, order_date, order_items: converItems(order_items), shipping_is_billing, comment, channel_id,
                    payment_method }, priceInfo), pakageInfo), { billing_customer_name: billing_address.first_name, billing_last_name: billing_address.last_name, billing_address: billing_address.address, billing_address_2: billing_address.address_2, billing_email: billing_address.email, billing_phone: billing_address.phone, billing_city: billing_address.city, billing_state: billing_address.state, billing_country: billing_address.country, billing_pincode: billing_address.pincode, shipping_customer_name: shipping_address === null || shipping_address === void 0 ? void 0 : shipping_address.first_name, shipping_last_name: shipping_address === null || shipping_address === void 0 ? void 0 : shipping_address.last_name, shipping_phone: shipping_address === null || shipping_address === void 0 ? void 0 : shipping_address.phone, shipping_email: shipping_address === null || shipping_address === void 0 ? void 0 : shipping_address.email, shipping_address: shipping_address === null || shipping_address === void 0 ? void 0 : shipping_address.address, shipping_address_2: shipping_address === null || shipping_address === void 0 ? void 0 : shipping_address.address_2, shipping_city: shipping_address === null || shipping_address === void 0 ? void 0 : shipping_address.city, shipping_state: shipping_address === null || shipping_address === void 0 ? void 0 : shipping_address.state, shipping_pincode: shipping_address === null || shipping_address === void 0 ? void 0 : shipping_address.pincode, shipping_country: shipping_address === null || shipping_address === void 0 ? void 0 : shipping_address.country }))
            }).then((res) => res.json()).then((result) => resolve(result));
        }).catch((error) => reject(error));
    });
};
exports.default = createOrder;
//# sourceMappingURL=createOrder.js.map