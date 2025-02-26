"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParagraphMetadata = void 0;
const typeorm_1 = require("typeorm");
const Paragraph_1 = require("./Paragraph");
let ParagraphMetadata = class ParagraphMetadata {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ParagraphMetadata.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Paragraph_1.Paragraph, paragraph => paragraph.metadata),
    __metadata("design:type", Paragraph_1.Paragraph)
], ParagraphMetadata.prototype, "paragraph", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ParagraphMetadata.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb"),
    __metadata("design:type", Object)
], ParagraphMetadata.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["string", "number", "boolean", "date"],
        default: "string"
    }),
    __metadata("design:type", String)
], ParagraphMetadata.prototype, "data_type", void 0);
ParagraphMetadata = __decorate([
    (0, typeorm_1.Entity)("paragraph_metadata")
], ParagraphMetadata);
exports.ParagraphMetadata = ParagraphMetadata;
