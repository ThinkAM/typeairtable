"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataInstance = void 0;
const repository_1 = require("./repository");
class DataInstance {
    constructor(urlGenerator, httpClient) {
        this.urlGenerator = urlGenerator;
        this.httpClient = httpClient;
    }
    getRepository(table) {
        this.urlGenerator.setTable(table);
        return new repository_1.Repository(this.urlGenerator, this.httpClient);
    }
}
exports.DataInstance = DataInstance;
