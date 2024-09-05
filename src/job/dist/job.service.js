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
exports.JobService = void 0;
var common_1 = require("@nestjs/common");
var job_entity_1 = require("./entities/job.entity");
var typeorm_1 = require("@nestjs/typeorm");
var JobService = /** @class */ (function () {
    function JobService(jobRepository) {
        this.jobRepository = jobRepository;
    }
    JobService.prototype.create = function (createJobDto) {
        return __awaiter(this, void 0, Promise, function () {
            var job, savedJob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        job = new job_entity_1.Job();
                        job.name = createJobDto.name;
                        job.description = createJobDto.description;
                        job.skills = createJobDto.skills;
                        job.count = createJobDto.count;
                        job.location = createJobDto.location;
                        job.status = createJobDto.status;
                        job.salary = createJobDto.salary;
                        job.company = createJobDto.company;
                        job.level = createJobDto.level;
                        job.startDate = createJobDto.startDate;
                        job.endDate = createJobDto.endDate;
                        return [4 /*yield*/, this.jobRepository.save(job)];
                    case 1:
                        savedJob = _a.sent();
                        return [2 /*return*/, savedJob];
                }
            });
        });
    };
    JobService.prototype.findAll = function (curPage, limit, qs) {
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var offset, _a, result, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        offset = (curPage - 1) * limit;
                        return [4 /*yield*/, this.jobRepository.findAndCount({
                                // where: { name: Like('%' + keyword + '%') }, order: { name: "DESC" },
                                order: { name: qs === null || qs === void 0 ? void 0 : qs.sort },
                                take: limit,
                                skip: offset,
                                relations: ['company', 'skills', 'resumes'],
                                select: {
                                    company: {
                                        logo: true,
                                        name: true
                                    },
                                    skills: {
                                        name: true
                                    },
                                    resumes: {
                                        status: true,
                                        cvFile: true
                                    }
                                }
                            })];
                    case 1:
                        _a = _b.sent(), result = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                jobs: result,
                                totalJobs: total,
                                totalPages: Math.ceil(total / limit)
                            }];
                }
            });
        });
    };
    JobService.prototype.findOne = function (id) {
        return this.jobRepository.findOne({
            where: { id: id },
            relations: {
                company: true,
                skills: true
            },
            select: {
                company: {
                    logo: true,
                    name: true
                },
                skills: {
                    name: true
                }
            }
        });
    };
    JobService.prototype.update = function (id, updateJobDto) {
        return __awaiter(this, void 0, Promise, function () {
            var existingJob, updatedJob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        existingJob = _a.sent();
                        if (!existingJob) {
                            throw new common_1.BadRequestException('Job not found');
                        }
                        updatedJob = Object.assign(existingJob, updateJobDto);
                        return [4 /*yield*/, this.jobRepository.save(updatedJob)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, updatedJob];
                }
            });
        });
    };
    JobService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var jobToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        jobToRemove = _a.sent();
                        if (!jobToRemove) {
                            throw new common_1.BadRequestException('Job not found');
                        }
                        return [4 /*yield*/, this.jobRepository["delete"](id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, 'OK'];
                }
            });
        });
    };
    JobService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(job_entity_1.Job))
    ], JobService);
    return JobService;
}());
exports.JobService = JobService;
