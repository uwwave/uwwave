"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    uid: {
        type: String,
    },
    username: {
        type: String,
    },
    dateJoined: {
        type: Number,
    },
    profilePicture: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    },
});
schema.set("toObject", {
    transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
    },
});
exports.default = mongoose_1.default.models.userdatas || mongoose_1.default.model("userdatas", schema);
