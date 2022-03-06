"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createOrder = (options) => {
    return new Promise((resolve, reject) => {
        options.auth.then((user) => {
            fetch(`https://apiv2.shiprocket.in/v1/external/orders/create/adhoc`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + (user === null || user === void 0 ? void 0 : user.token)
                },
                body: JSON.stringify(options)
            }).then((res) => res.json()).then((result) => resolve(result));
        }).catch((error) => reject(error));
    });
};
exports.default = createOrder;
//# sourceMappingURL=createOrder.js.map