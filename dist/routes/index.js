"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
exports.routes = new express_1.Router();
exports.routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'ok',
    });
});
//# sourceMappingURL=index.js.map