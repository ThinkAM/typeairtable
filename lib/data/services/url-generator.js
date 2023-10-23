"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlGenerator = void 0;
const factories_1 = require("../factories");
class UrlGenerator {
    constructor(config, table, validators = (0, factories_1.makeUrlValidators)()) {
        this.config = config;
        this.table = table;
        this.validators = validators;
        this.url = '';
        this.header = {
            name: 'Authorization',
            value: ''
        };
        this.setTable(table);
    }
    setTable(table) {
        if (table) {
            this.header.value = `Bearer ${this.config.apiKey}`;
            this.url = `${this.config.baseUrl}/${table.tableName}`;
        }
    }
    getUrl(dataInstance, table) {
        this.setTable(table);
        this.validators.forEach((validator) => {
            this.url = validator.validate(this.url, dataInstance);
        });
        return this.url;
    }
    getHeaderAuthorizationValue() {
        return this.header.value;
    }
}
exports.UrlGenerator = UrlGenerator;
