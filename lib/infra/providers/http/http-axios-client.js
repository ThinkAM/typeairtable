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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpAxiosClient = void 0;
const axios_1 = __importDefault(require("axios"));
class HttpAxiosClient {
    get(url, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const http = yield axios_1.default.get(url, config);
            return http.data;
        });
    }
    post(url, body, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield axios_1.default.post(url, body, config);
            return result.data;
        });
    }
    delete(url, id, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield axios_1.default.delete(`${url}&records[]=${id}`, config);
                return result.data.records[0].deleted;
            }
            catch (_a) {
                return false;
            }
        });
    }
    patch(url, body, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield axios_1.default.patch(url, body, config);
            return result.data;
        });
    }
}
exports.HttpAxiosClient = HttpAxiosClient;
