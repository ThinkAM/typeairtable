"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUrlValidators = void 0;
const url_validator_1 = require("../validators/url-validator");
const makeUrlValidators = () => {
    const selectValidator = new url_validator_1.SelectUrlValidator();
    const whereValidator = new url_validator_1.WhereUrlValidator();
    const oderByValidator = new url_validator_1.OrderByUrlValidator();
    const takeValidator = new url_validator_1.TakeUrlValidator();
    return [selectValidator, whereValidator, oderByValidator, takeValidator];
};
exports.makeUrlValidators = makeUrlValidators;
