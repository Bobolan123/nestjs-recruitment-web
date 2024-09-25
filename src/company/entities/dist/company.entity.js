"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Company = void 0;
var job_entity_1 = require("src/job/entities/job.entity");
var location_entity_1 = require("src/location/entities/location.entity");
var review_entity_1 = require("src/review/entities/review.entity");
var skill_entity_1 = require("src/skills/entities/skill.entity");
var typeorm_1 = require("typeorm");
var Company = /** @class */ (function () {
    function Company() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Company.prototype, "id");
    __decorate([
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], Company.prototype, "name");
    __decorate([
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], Company.prototype, "briefInformation");
    __decorate([
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], Company.prototype, "type");
    __decorate([
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], Company.prototype, "industry");
    __decorate([
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], Company.prototype, "size");
    __decorate([
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], Company.prototype, "description");
    __decorate([
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], Company.prototype, "logo");
    __decorate([
        typeorm_1.Column({ type: 'varchar', nullable: true })
    ], Company.prototype, "country");
    __decorate([
        typeorm_1.OneToMany(function () { return job_entity_1.Job; }, function (job) { return job.company; }, {
            onDelete: 'CASCADE'
        })
    ], Company.prototype, "jobs");
    __decorate([
        typeorm_1.OneToMany(function () { return review_entity_1.Review; }, function (review) { return review.company; })
    ], Company.prototype, "reviews");
    __decorate([
        typeorm_1.OneToMany(function () { return location_entity_1.Location; }, function (location) { return location.company; })
    ], Company.prototype, "locations");
    __decorate([
        typeorm_1.ManyToMany(function () { return skill_entity_1.Skill; }),
        typeorm_1.JoinTable({
            name: 'company_skill',
            joinColumn: {
                name: 'company_id',
                referencedColumnName: 'id'
            },
            inverseJoinColumn: {
                name: 'skill_id',
                referencedColumnName: 'id'
            }
        })
    ], Company.prototype, "skills");
    __decorate([
        typeorm_1.CreateDateColumn({
            type: 'timestamp',
            "default": function () { return 'CURRENT_TIMESTAMP(6)'; }
        })
    ], Company.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn({
            type: 'timestamp',
            "default": function () { return 'CURRENT_TIMESTAMP(6)'; },
            onUpdate: 'CURRENT_TIMESTAMP(6)'
        })
    ], Company.prototype, "updated_at");
    Company = __decorate([
        typeorm_1.Entity()
    ], Company);
    return Company;
}());
exports.Company = Company;
