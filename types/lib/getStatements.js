"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getStatements = (options) => {
    return new Promise((resolve, reject) => {
        options === null || options === void 0 ? void 0 : options.auth.then((user) => {
            const data = typeof options == 'object' ? options : {};
            const full_url = Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
            const url = `https://apiv2.shiprocket.in/v1/external/account/details/statement?` + full_url;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'apllication/json',
                    'Accept': 'apllication/json',
                    'Authorization': "Bearer " + (user === null || user === void 0 ? void 0 : user.token)
                }
            }).then((res) => res.json()).then((result) => {
                var _a;
                if ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.length) {
                    return resolve([...result === null || result === void 0 ? void 0 : result.data]);
                }
                return reject(result);
            }).catch((error) => reject(error));
        }).catch((error) => reject(error));
    });
};
exports.default = getStatements;
//# sourceMappingURL=getStatements.js.map