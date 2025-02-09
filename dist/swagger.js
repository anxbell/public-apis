"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
//npm install swagger-autogen
const doc = {
    info: { title: "Public APIs Database", version: "1.0.0" },
    host: "localhost:8080",
    schemes: ["http"],
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./src/server.ts"];
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles);
