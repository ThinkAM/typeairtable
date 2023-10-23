"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderByUrlValidator = void 0;
class OrderByUrlValidator {
    validate(url, dataInstance) {
        if (!dataInstance.orderBy) {
            return url;
        }
        Object.keys(dataInstance.orderBy).forEach((item, index) => {
            const value = dataInstance.orderBy[item];
            url = `${url}&sort[${index}][field]=${item}&sort[${index}][direction]=${value}`;
        });
        return url;
    }
}
exports.OrderByUrlValidator = OrderByUrlValidator;
