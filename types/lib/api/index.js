"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createOrder_1 = __importDefault(require("./createOrder"));
const updateOrder_1 = __importDefault(require("./updateOrder"));
const getStatements_1 = __importDefault(require("./getStatements"));
;
class shiprocketConfig {
    constructor({ email, password }) {
        this.auth = () => {
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
                }).catch((error) => reject(error));
            });
        };
        this.getOrders = (options) => {
            return new Promise((resolve, reject) => {
                this.auth().then((user) => {
                    const data = typeof options == 'object' ? options : {};
                    const full_url = Object.entries(data).map(([key, value]) => `${key}=${value}`).join();
                    const url = `https://apiv2.shiprocket.in/v1/external/orders?` + (full_url === null || full_url === void 0 ? void 0 : full_url.split(',').join('&'));
                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'apllication/json',
                            'Accept': 'apllication/json',
                            'Authorization': "Bearer " + (user === null || user === void 0 ? void 0 : user.token)
                        }
                    }).then((res) => res.json()).then((result) => {
                        return resolve(result);
                    }).catch((error) => reject(error));
                }).catch((error) => reject(error));
            });
        };
        this.getOrder = (id) => {
            return new Promise((resolve, reject) => {
                this.auth().then((user) => {
                    const url = `https://apiv2.shiprocket.in/v1/external/orders/show/` + id;
                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'apllication/json',
                            'Accept': 'apllication/json',
                            'Authorization': "Bearer " + (user === null || user === void 0 ? void 0 : user.token)
                        }
                    }).then((res) => res.json()).then((result) => {
                        return resolve(result);
                    }).catch((error) => reject(error));
                }).catch((error) => reject(error));
            });
        };
        this.getTracking = (options) => {
            return new Promise((resolve, reject) => {
                this.auth().then((user) => {
                    const url = `https://apiv2.shiprocket.in/v1/external/courier/track/${options.type}/${options.id}`;
                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': "Bearer " + (user === null || user === void 0 ? void 0 : user.token)
                        }
                    }).then((res) => res.json()).then((result) => {
                        return resolve(result === null || result === void 0 ? void 0 : result.tracking_data);
                    }).catch((error) => reject(error));
                }).catch((error) => reject(error));
            });
        };
        this.createOrder = (options) => (0, createOrder_1.default)(Object.assign(Object.assign({}, options), { auth: this.auth() }));
        this.updateOrder = (options) => (0, updateOrder_1.default)(Object.assign(Object.assign({}, options), { auth: this.auth() }));
        this.getLocality = (pincode) => {
            return new Promise((resolve, reject) => {
                this.auth().then((user) => {
                    fetch(`https://apiv2.shiprocket.in/v1/external/open/postcode/details?postcode=${pincode}`, {
                        method: 'GET',
                        headers: {
                            "Accept": "application/json",
                            "Conentent-Type": "application/json",
                            "Authorization": "Bearer " + (user === null || user === void 0 ? void 0 : user.token),
                        }
                    }).then((res) => res.json()).then((result) => { resolve(result === null || result === void 0 ? void 0 : result.postcode_details); }).catch((error) => reject(error)).catch((error) => reject(error));
                }).catch((error) => reject(error));
            });
        };
        this.getStatements = (options) => (0, getStatements_1.default)(Object.assign({ auth: this.auth() }, options));
        this.email = email;
        this.password = password;
    }
    ;
}
;
exports.default = shiprocketConfig;
//# sourceMappingURL=index.js.map