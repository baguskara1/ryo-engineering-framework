"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const version_1 = require("./version");
const help_1 = require("./help");
const doctor_1 = require("./doctor");
const validate_1 = require("./validate");
const create_1 = require("./create");
const skills_1 = require("./skills");
const info_1 = require("./info");
const search_1 = require("./search");
const run_1 = require("./run");
const export_1 = require("./export");
const registry_1 = require("./registry");
const install_1 = require("./install");
const uninstall_1 = require("./uninstall");
const publish_1 = require("./publish");
const update_1 = require("./update");
const list_1 = require("./list");
const init_1 = require("./init");
const upgrade_1 = require("./upgrade");
const opencodeSetup_1 = require("./opencodeSetup");
const config_1 = require("./config");
exports.commands = {
    version: version_1.version,
    help: help_1.help,
    doctor: doctor_1.doctor,
    validate: validate_1.validate,
    create: create_1.create,
    skills: skills_1.skills,
    info: info_1.info,
    search: search_1.search,
    run: run_1.run,
    export: export_1.exportSkill,
    registry: registry_1.registry,
    install: install_1.install,
    uninstall: uninstall_1.uninstall,
    publish: publish_1.publish,
    update: update_1.update,
    upgrade: upgrade_1.upgrade,
    list: list_1.list,
    init: init_1.init,
    "opencode-setup": opencodeSetup_1.opencodeSetup,
    config: config_1.configGet,
    "config-set": config_1.configSet,
    "config-delete": config_1.configDelete,
};
//# sourceMappingURL=index.js.map