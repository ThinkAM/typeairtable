"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectUrlValidator = void 0;
class SelectUrlValidator {
    validate(url, dataInstance) {
        var _a;
        (_a = dataInstance.select) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            url = `${url}&fields[]=${String(item)}`;
        });
        return url;
    }
}
exports.SelectUrlValidator = SelectUrlValidator;
