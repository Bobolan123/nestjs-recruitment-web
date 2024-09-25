"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.SkillsController = void 0;
var common_1 = require("@nestjs/common");
var Public_1 = require("src/auth/Public");
var SkillsController = /** @class */ (function () {
    function SkillsController(skillsService) {
        this.skillsService = skillsService;
    }
    SkillsController.prototype.create = function (createSkillDto) {
        return this.skillsService.create(createSkillDto);
    };
    SkillsController.prototype.findAll = function (curPage, limit, qs) {
        return this.skillsService.findAll(+curPage, +limit);
    };
    SkillsController.prototype.findByIds = function (ids) {
        return this.skillsService.findByIds(ids);
    };
    SkillsController.prototype.getEmail = function (data) {
        return this.skillsService.getEmail(data);
    };
    SkillsController.prototype.findOne = function (id) {
        return this.skillsService.findOne(+id);
    };
    SkillsController.prototype.update = function (id, updateSkillDto) {
        return this.skillsService.update(+id, updateSkillDto);
    };
    SkillsController.prototype.remove = function (id) {
        return this.skillsService.remove(+id);
    };
    __decorate([
        common_1.Post(''),
        __param(0, common_1.Body())
    ], SkillsController.prototype, "create");
    __decorate([
        Public_1.Public(),
        common_1.Get(''),
        __param(0, common_1.Query('page')),
        __param(1, common_1.Query('limit')),
        __param(2, common_1.Query())
    ], SkillsController.prototype, "findAll");
    __decorate([
        common_1.Get('readByIds'),
        __param(0, common_1.Body())
    ], SkillsController.prototype, "findByIds");
    __decorate([
        common_1.Post('getEmail'),
        __param(0, common_1.Body())
    ], SkillsController.prototype, "getEmail");
    __decorate([
        Public_1.Public(),
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], SkillsController.prototype, "findOne");
    __decorate([
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], SkillsController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], SkillsController.prototype, "remove");
    SkillsController = __decorate([
        common_1.Controller('skills')
    ], SkillsController);
    return SkillsController;
}());
exports.SkillsController = SkillsController;
