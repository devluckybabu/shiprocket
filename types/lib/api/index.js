"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createOrder_1 = __importDefault(require("./createOrder"));
const updateOrder_1 = __importDefault(require("./updateOrder"));
const getStatements_1 = __importDefault(require("./getStatements"));
const url = "https://apiv2.shiprocket.in/v1/external";
;
class shiprocketConfig {
    constructor({ email, password }) {
        this.post = (path, data) => {
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
        };
        this.auth = () => this.post('/auth/login', { email: this.email, password: this.password });
        this.get = (path) => {
            return new Promise((resolve, reject) => {
                this.auth().then((user) => {
                    if (user === null || user === void 0 ? void 0 : user.token) {
                        return fetch(url + path, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "Bearer " + (user === null || user === void 0 ? void 0 : user.token)
                            }
                        }).then((res) => res.json())
                            .then((result) => resolve(result))
                            .catch((error) => reject(error));
                    }
                    else {
                        return reject(user);
                    }
                }).catch((error) => reject(error));
            });
        };
        this.getOrders = (options) => {
            const data = options && typeof options == 'object' ? options : {};
            const full_url = Object.entries(data).map(([key, value]) => `${key}=${value}`).join("&");
            const path = `/orders?` + full_url;
            return this.get(path);
        };
        this.getOrder = (id) => this.get('/orders/show/' + id);
        this.getTracking = (options) => {
            return this.get(`/courier/track/${options.type}/${options.id}`);
        };
        this.createOrder = (options) => (0, createOrder_1.default)(Object.assign(Object.assign({}, options), { auth: this.auth() }));
        this.updateOrder = (options) => (0, updateOrder_1.default)(Object.assign(Object.assign({}, options), { auth: this.auth() }));
        this.getLocality = (pincode) => this.get(`/open/postcode/details?postcode=${pincode}`);
        this.getStatements = (options) => (0, getStatements_1.default)(Object.assign({ auth: this.auth() }, options));
        this.email = email;
        this.password = password;
    }
    ;
}
;
exports.default = shiprocketConfig;
//# sourceMappingURL=index.js.map