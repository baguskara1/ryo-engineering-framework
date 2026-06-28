#!/usr/bin/env node

import { version } from "./commands/version";
import { doctor } from "./commands/doctor";
import { list } from "./commands/list";
import { validate } from "./commands/validate";
import { create } from "./commands/create";

const command = process.argv[2];

const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (command) {

    case "version":
        version();
        break;

    case "doctor":
    doctor();
    break;
    
    case "list":
    list();
    break;

    case "validate":
    validate();
    break;

    case "create":
    create(arg1, arg2);
    break;

    default:
        console.log("");
        console.log("Ryo CLI");
        console.log("");
        console.log("Commands");
        console.log("");
        console.log("version");
        console.log("");
}