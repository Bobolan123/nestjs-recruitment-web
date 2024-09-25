"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateCompanyDto = void 0;
// create-company.dto.ts
var class_validator_1 = require("class-validator");
var CreateCompanyDto = /** @class */ (function () {
    function CreateCompanyDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreateCompanyDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreateCompanyDto.prototype, "briefInformation");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreateCompanyDto.prototype, "type");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreateCompanyDto.prototype, "industry");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreateCompanyDto.prototype, "size");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreateCompanyDto.prototype, "description");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreateCompanyDto.prototype, "location");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreateCompanyDto.prototype, "filename");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreateCompanyDto.prototype, "country");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], CreateCompanyDto.prototype, "logo");
    return CreateCompanyDto;
}());
exports.CreateCompanyDto = CreateCompanyDto;
