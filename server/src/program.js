"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const ws_1 = __importDefault(require("ws"));
const wss = new ws_1.default.Server({ port: 7071 });
const clients = new Map();
wss.on('connection', (ws) => {
    const id = (0, crypto_1.randomUUID)();
    const color = Math.floor(Math.random() * 360);
    const metadata = { id, color };
    clients.set(ws, metadata);
    ws.on('message', (messageAsString) => {
        const message = JSON.parse(messageAsString);
        const metadata = clients.get(ws);
        message.sender = metadata.id;
        message.color = metadata.color;
        const outbound = JSON.stringify(message);
        [...clients.keys()].forEach((client) => {
            client.send(outbound);
        });
    });
    ws.on('close', () => {
        clients.delete(ws);
    });
});
console.log('wss up');
