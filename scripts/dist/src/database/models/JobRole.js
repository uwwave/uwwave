"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    role: {
        type: String,
        required: [true, "role is required"],
    },
});
schema.set("toObject", {
    transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
    },
});
exports.default = mongoose_1.default.models.JobRoles || mongoose_1.default.model("JobRoles", schema);
