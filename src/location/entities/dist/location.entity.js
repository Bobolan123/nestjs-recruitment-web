"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Location = void 0;
var company_entity_1 = require("src/company/entities/company.entity");
var typeorm_1 = require("typeorm");
var Location = /** @class */ (function () {
    function Location() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Location.prototype, "id");
    __decorate([
        typeorm_1.Column({ type: 'varchar' })
    ], Location.prototype, "address");
    __decorate([
        typeorm_1.Column({ type: 'varchar' })
    ], Location.prototype, "address_city");
    __decorate([
        typeorm_1.ManyToOne(function () { return company_entity_1.Company; }, function (company) { return company.locations; })
    ], Location.prototype, "company");
    Location = __decorate([
        typeorm_1.Entity()
    ], Location);
    return Location;
}());
exports.Location = Location;
