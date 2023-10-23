"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhereUrlValidator = void 0;
class WhereUrlValidator {
    validate(url, dataInstance) {
        if (!dataInstance.where || !Object.keys(dataInstance.where).length) {
            return url;
        }
        url = `${url}&filterByFormula=`;
        return url + this.generateUrl(dataInstance.where);
    }
    generateUrl(where) {
        const isArray = Array.isArray(where);
        if (isArray) {
            return this.generateOR(where);
        }
        return this.generateAND(where);
    }
    generateAND(where) {
        const whereArray = Object.keys(where).map((item) => {
            const value = where[item];
            if (typeof value === 'boolean') {
                return value ? item : `NOT(${item})`;
            }
            return `{${item}}='${value}'`;
        });
        return `AND(${whereArray.join(',')})`;
    }
    generateOR(where) {
        const orArray = where.reduce((acc, item) => {
            return `${acc},${this.generateAND(item)}`;
        }, '');
        return `OR(${orArray.substring(1)})`;
    }
}
exports.WhereUrlValidator = WhereUrlValidator;
