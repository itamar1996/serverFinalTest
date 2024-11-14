"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketConnection = void 0;
const handleSocketConnection = (client) => {
    console.log(`[socket.io] New Connection ${client.id}`);
    client.on("disconnect", () => {
        console.log("Bye bye user");
    });
};
exports.handleSocketConnection = handleSocketConnection;
