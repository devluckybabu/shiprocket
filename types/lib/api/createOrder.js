"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const createOrder = (options) => {
    return new Promise((resolve, reject) => {
        const data = {
            "order_id": options.id,
            "order_date": options.date,
            "pickup_location": "primary",
            "channel_id": "ARICHALI",
            "comment": "Company: SANTALI ARICHALI BAZAR",
            "billing_customer_name": options.first_name,
            "billing_last_name": options.last_name,
            "billing_address": options.address,
            "billing_address_2": options.address_2,
            "billing_city": options.city,
            "billing_pincode": options.pincode,
            "billing_state": options.state,
            "billing_country": options.country,
            "billing_email": options.email,
            "billing_phone": options.phone,
            "shipping_is_billing": true,
            "order_items": options.items,
            "payment_method": options.payment_method,
            "shipping_charges": options.charge,
            "giftwrap_charges": 0,
            "transaction_charges": 0,
            "total_discount": 0,
            "sub_total": options.total,
            "length": options.length,
            "breadth": options.breadth,
            "height": options.height,
            "weight": options.weight,
            "type": "Essential"
        };
        options.auth.then((user) => {
            axios_1.default.post(`https://apiv2.shiprocket.in/v1/external/orders/create/adhoc`, data, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + (user === null || user === void 0 ? void 0 : user.token)
                }
            }).then((result) => resolve(result.data));
        }).catch((error) => reject(error));
    });
};
exports.default = createOrder;
//# sourceMappingURL=createOrder.js.map