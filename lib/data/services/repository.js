"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const utils_1 = require("../utils");
class Repository {
    constructor(urlGenerator, httpClient) {
        this.httpClient = httpClient;
        this.urlGenerator = (0, utils_1.deepClone)(urlGenerator);
    }
    find(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const headerAuthorizationValue = this.urlGenerator.getHeaderAuthorizationValue();
            const config = {
                headers: {
                    Authorization: headerAuthorizationValue,
                },
            };
            const url = this.urlGenerator.getUrl(Object.assign(Object.assign({}, params), { take: 1 }));
            const rawData = yield this.httpClient.get(url, config);
            const data = this.convertRawData(rawData);
            return data && data.length ? data[0] : null;
        });
    }
    findAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const headerAuthorizationValue = this.urlGenerator.getHeaderAuthorizationValue();
            const config = {
                headers: {
                    Authorization: headerAuthorizationValue,
                },
            };
            const url = this.urlGenerator.getUrl(params);
            const rawData = yield this.httpClient.get(url, config);
            return this.convertRawData(rawData);
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const headerAuthorizationValue = this.urlGenerator.getHeaderAuthorizationValue();
            const config = {
                headers: {
                    Authorization: headerAuthorizationValue,
                },
            };
            const result = yield this.httpClient.post(this.urlGenerator.getUrl({}), {
                fields: body,
            }, config);
            return Object.assign(Object.assign({}, result.fields), { id: result.id, createdTime: result.createdTime });
        });
    }
    destroy(id) {
        const headerAuthorizationValue = this.urlGenerator.getHeaderAuthorizationValue();
        const config = {
            headers: {
                Authorization: headerAuthorizationValue,
            },
        };
        return this.httpClient.delete(this.urlGenerator.getUrl({}), id, config);
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const headerAuthorizationValue = this.urlGenerator.getHeaderAuthorizationValue();
            const config = {
                headers: {
                    Authorization: headerAuthorizationValue,
                },
            };
            const result = yield this.httpClient.patch(this.urlGenerator.getUrl({}), {
                records: [
                    {
                        id,
                        fields: body,
                    },
                ],
            }, config);
            return Object.assign(Object.assign({}, result.records[0].fields), { id: result.records[0].id, createdTime: result.records[0].createdTime });
        });
    }
    convertRawData(rawData) {
        var _a;
        return (_a = rawData === null || rawData === void 0 ? void 0 : rawData.records) === null || _a === void 0 ? void 0 : _a.map((item) => (Object.assign(Object.assign({}, this.filterIdAndCreatedTime(item)), this.filterFields(item.fields))));
    }
    filterIdAndCreatedTime(record) {
        return {
            id: record.id,
            createdTime: record.createdTime,
        };
    }
    filterFields(fields) {
        let result = {};
        Object.keys(fields).forEach((key) => {
            const value = {};
            value[key] = fields[key];
            result = Object.assign(Object.assign({}, result), value);
        });
        return result;
    }
}
exports.Repository = Repository;
