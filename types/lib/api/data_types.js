"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceAll = void 0;
;
;
const replaceAll = (text, separater, replacer) => {
    if ((text === null || text === void 0 ? void 0 : text.length) && typeof text == "string") {
        const new_text = text.split(separater).join(replacer);
        return new_text;
    }
    ;
    return '';
};
exports.replaceAll = replaceAll;
exports.default = exports.replaceAll;
//# sourceMappingURL=data_types.js.map