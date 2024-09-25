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
exports.ResumeController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var Public_1 = require("src/auth/Public");
var ResumeController = /** @class */ (function () {
    function ResumeController(resumeService) {
        this.resumeService = resumeService;
    }
    ResumeController.prototype.createCV = function (cvFile, dataInput) {
        // Convert user and job to numbers
        var data = {
            status: dataInput.status,
            user: { id: +dataInput.user },
            job: { id: +dataInput.job }
        };
        return this.resumeService.createCV(data, cvFile);
    };
    ResumeController.prototype.findAll = function (curPage, limit, qs) {
        return this.resumeService.findAll(+curPage, +limit, qs);
    };
    ResumeController.prototype.findOne = function (id) {
        return this.resumeService.findOne(+id);
    };
    ResumeController.prototype.update = function (id, updateResumeDto) {
        return this.resumeService.update(+id, updateResumeDto);
    };
    ResumeController.prototype.remove = function (id) {
        return this.resumeService.remove(+id);
    };
    __decorate([
        common_1.Post('createCV'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('cvFile')),
        __param(0, common_1.UploadedFile()),
        __param(1, common_1.Body())
    ], ResumeController.prototype, "createCV");
    __decorate([
        Public_1.Public(),
        common_1.Get('read'),
        __param(0, common_1.Query('page')),
        __param(1, common_1.Query('limit')),
        __param(2, common_1.Query())
    ], ResumeController.prototype, "findAll");
    __decorate([
        Public_1.Public(),
        common_1.Get('read/:id'),
        __param(0, common_1.Param('id'))
    ], ResumeController.prototype, "findOne");
    __decorate([
        common_1.Patch('update/:id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], ResumeController.prototype, "update");
    __decorate([
        common_1.Delete('delete/:id'),
        __param(0, common_1.Param('id'))
    ], ResumeController.prototype, "remove");
    ResumeController = __decorate([
        common_1.Controller('resume')
    ], ResumeController);
    return ResumeController;
}());
exports.ResumeController = ResumeController;
