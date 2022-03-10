"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createOrder_1 = __importDefault(require("./createOrder"));
const updateOrder_1 = __importDefault(require("./updateOrder"));
const url = "https://apiv2.shiprocket.in/v1/external";
const paramUrl = (options) => {
    if (options && typeof options == "object") {
        const params = Object.entries(options).map(([key, vlaue]) => `${key}=${vlaue}`).join("&");
        return params;
    }
    ;
    return '';
};
class shiprocketConfig {
    constructor(user) {
        this.auth = () => {
            return new Promise((resolve, reject) => {
                fetch(url + '/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'apllication/json', 'Accept': 'apllication/json' },
                    body: JSON.stringify({ email: this.email, password: this.password })
                }).then((res) => res.json()).
                    then((result) => resolve(result)).catch((error) => reject(error));
            });
        };
        this.post = (path, data) => {
            return new Promise((resolve, reject) => {
                this.auth().then((user) => {
                    if (user === null || user === void 0 ? void 0 : user.token) {
                        fetch(url + path, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'apllication/json',
                                'Accept': 'apllication/json',
                                "Authorization": "Bearer " + (user === null || user === void 0 ? void 0 : user.token)
                            },
                            body: JSON.stringify(data)
                        }).then((res) => res.json()).then((result) => resolve(result)).catch((error) => reject(error));
                    }
                    else
                        return reject(user);
                }).catch((error) => reject(error));
            });
        };
        this.get = (path) => {
            return new Promise((resolve, reject) => {
                this.auth().then((user) => {
                    if (user === null || user === void 0 ? void 0 : user.token) {
                        fetch(url + path, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "Bearer " + (user === null || user === void 0 ? void 0 : user.token)
                            }
                        }).then((res) => res.json())
                            .then((result) => resolve(result)).catch((error) => reject(error));
                    }
                    else
                        return reject(user);
                }).catch((error) => reject(error));
            });
        };
        this.getOrders = (options) => {
            if (options === null || options === void 0 ? void 0 : options.orderId) {
                const path = '/orders/show/' + (options === null || options === void 0 ? void 0 : options.orderId);
                return this.get(path);
            }
            else {
                const params = paramUrl(options);
                const path = `/orders?` + params;
                return this.get(path);
            }
        };
        this.getOrder = (id) => this.get('/orders/show/' + id);
        this.getTracking = (options) => {
            if (options.type == "orderId") {
                return this.get(`/courier/track?order_id=${options.id}`);
            }
            ;
            return this.get(`/courier/track/${options.type}/${options.id}`);
        };
        this.createOrder = (options) => (0, createOrder_1.default)(Object.assign(Object.assign({}, options), { auth: this.auth() }));
        this.updateOrder = (options) => (0, updateOrder_1.default)(Object.assign(Object.assign({}, options), { auth: this.auth() }));
        this.getProducts = (options) => {
            if (options === null || options === void 0 ? void 0 : options.productId) {
                const path = '/products/show/' + (options === null || options === void 0 ? void 0 : options.productId);
                return this.get(path);
            }
            else {
                const path = '/products?' + paramUrl(options);
                return this.get(path);
            }
        };
        this.getCountries = (countryId) => {
            if (countryId)
                return this.get('/countries/show/' + countryId);
            else
                return this.get('/countries');
        };
        this.getAllZones = (countryId) => this.get('/countries/show/' + countryId);
        this.getDiscrepancy = () => this.get('/billing/discrepancy');
        this.checkImport = (importId) => this.get(`/errors/${importId}/check`);
        this.getLists = (options) => {
            const path = '/listings?' + paramUrl(options);
            return this.get(path);
        };
        this.getProduct = (id) => this.get('/products/show/' + id);
        this.addProduct = (data) => this.post('/products', data);
        this.getLocality = (pincode) => this.get(`/open/postcode/details?postcode=${pincode}`);
        this.getServiceability = (options) => {
            const { pickup_pincode, delivery_pincode, cod, weight, hieght, breadth, mode, is_return, price, orderId } = options;
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
        this.getStatements = (options) => {
            const path = '/account/details/statement?' + paramUrl(options);
            return this.get(path);
        };
        this.getWalletBalance = () => this.get('/account/details/wallet-balance');
        this.getChannels = () => this.get('/channels');
        this.getNDR = (options) => {
            if (options === null || options === void 0 ? void 0 : options.awb) {
                return this.get('/ndr/show/' + options.awb);
            }
            else {
                const path = '/ndr/all?' + paramUrl(options);
                return this.get(path);
            }
        };
        this.ndrAction = (options) => this.post(`/ndr/${options.awb}/action`, { acction: options.action, comments: options.comments });
        this.getPickupLocations = () => this.get('/settings/company/pickup');
        this.addPickupLocation = (data) => this.post('/settings/company/addpickup', data);
        this.email = user.email;
        this.password = user.password;
    }
    ;
}
;
exports.default = shiprocketConfig;
//# sourceMappingURL=index.js.map