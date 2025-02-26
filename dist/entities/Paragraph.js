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
exports.Paragraph = void 0;
const typeorm_1 = require("typeorm");
const Document_1 = require("./Document");
const Role_1 = require("./Role");
const ParagraphMetadata_1 = require("./ParagraphMetadata");
let Paragraph = class Paragraph {
};
exports.Paragraph = Paragraph;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Paragraph.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Paragraph.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Paragraph.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Paragraph.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Document_1.Document, document => document.paragraphs),
    __metadata("design:type", Document_1.Document)
], Paragraph.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role_1.Role),
    __metadata("design:type", Role_1.Role)
], Paragraph.prototype, "responsible_role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ParagraphMetadata_1.ParagraphMetadata, metadata => metadata.paragraph),
    __metadata("design:type", Array)
], Paragraph.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Paragraph.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Paragraph.prototype, "updated_at", void 0);
exports.Paragraph = Paragraph = __decorate([
    (0, typeorm_1.Entity)("paragraphs")
], Paragraph);
