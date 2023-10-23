"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakeUrlValidator = void 0;
class TakeUrlValidator {
    validate(url, dataInstance) {
        if (!dataInstance.take) {
            return url;
        }
        return `${url}&maxRecords=${dataInstance.take}`;
    }
}
exports.TakeUrlValidator = TakeUrlValidator;
