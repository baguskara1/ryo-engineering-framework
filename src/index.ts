#!/usr/bin/env node

import { commands } from "./commands";

const command = process.argv[2];
const args = process.argv.slice(3);

const handler = commands[command as keyof typeof commands];

if (!handler) {
    console.log("");
    console.log("Unknown command");
    console.log("");

    process.exit(1);
}

handler(...args);