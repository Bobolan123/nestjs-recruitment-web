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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SkillsService = void 0;
var common_1 = require("@nestjs/common");
var skill_entity_1 = require("./entities/skill.entity");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm"); // Import In operator
var SkillsService = /** @class */ (function () {
    function SkillsService(skillRepository, mailerService) {
        this.skillRepository = skillRepository;
        this.mailerService = mailerService;
    }
    SkillsService.prototype.create = function (createSkillDto) {
        return __awaiter(this, void 0, Promise, function () {
            var name, skill, savedSkill;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = createSkillDto.name;
                        skill = new skill_entity_1.Skill();
                        skill.name = name; // Assign the name to the skill
                        return [4 /*yield*/, this.skillRepository.save(skill)];
                    case 1:
                        savedSkill = _a.sent();
                        return [2 /*return*/, savedSkill];
                }
            });
        });
    };
    SkillsService.prototype.findAll = function (curPage, limit, qs) {
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, Promise, function () {
            var offset, skills;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        offset = (curPage - 1) * limit;
                        return [4 /*yield*/, this.skillRepository.find({
                                relations: {
                                    jobs: true
                                },
                                take: limit || null,
                                skip: offset || null
                            })];
                    case 1:
                        skills = _a.sent();
                        return [2 /*return*/, skills];
                }
            });
        });
    };
    SkillsService.prototype.findByIds = function (ids) {
        return __awaiter(this, void 0, Promise, function () {
            var jobs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.skillRepository.find({
                            where: {
                                id: typeorm_2.In(ids)
                            },
                            relations: ['jobs']
                        })];
                    case 1:
                        jobs = _a.sent();
                        return [2 /*return*/, jobs];
                }
            });
        });
    };
    SkillsService.prototype.getEmail = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var skills, getEmail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByIds(data.ids)];
                    case 1:
                        skills = _a.sent();
                        return [4 /*yield*/, this.mailerService.sendMail({
                                to: data.email,
                                subject: 'Jobs related to your skills',
                                template: './jobs',
                                context: {
                                    skills: skills
                                }
                            })];
                    case 2:
                        getEmail = _a.sent();
                        if (getEmail) {
                            return [2 /*return*/, 'Sent Email successfully'];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SkillsService.prototype.findOne = function (id) {
        return this.skillRepository.findOne({
            where: { id: id }
        });
    };
    SkillsService.prototype.update = function (id, updateSkillDto) {
        return __awaiter(this, void 0, Promise, function () {
            var existingSkill, updatedSkill;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        existingSkill = _a.sent();
                        if (!existingSkill) {
                            throw new common_1.BadRequestException('Skill not found');
                        }
                        updatedSkill = Object.assign(existingSkill, updateSkillDto);
                        return [4 /*yield*/, this.skillRepository.save(updatedSkill)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, updatedSkill];
                }
            });
        });
    };
    SkillsService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var skillToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        skillToRemove = _a.sent();
                        if (!skillToRemove) {
                            throw new common_1.BadRequestException('Skill not found');
                        }
                        return [4 /*yield*/, this.skillRepository["delete"](id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {}];
                }
            });
        });
    };
    SkillsService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(skill_entity_1.Skill))
    ], SkillsService);
    return SkillsService;
}());
exports.SkillsService = SkillsService;
