"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirTableConfig = void 0;
const data_instance_1 = require("../../data/services/data-instance");
const url_generator_1 = require("../../data/services/url-generator");
const http_axios_client_1 = require("../providers/http/http-axios-client");
class AirTableConfig {
    configure(config) {
        const urlGenerator = new url_generator_1.UrlGenerator(config);
        const httpAxiosClient = new http_axios_client_1.HttpAxiosClient();
        return new data_instance_1.DataInstance(urlGenerator, httpAxiosClient);
    }
}
exports.AirTableConfig = AirTableConfig;
