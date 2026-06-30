import { version } from "./version";
import { help } from "./help";
import { doctor } from "./doctor";
import { validate } from "./validate";
import { create } from "./create";
import { skills } from "./skills";
import { info } from "./info";
import { search } from "./search";
import { run } from "./run";
import { exportSkill } from "./export";
import { registry } from "./registry";
import { install } from "./install";
import { uninstall } from "./uninstall";
import { publish } from "./publish";
import { update } from "./update";
import { list } from "./list";
import { init } from "./init";
import { upgrade } from "./upgrade";

export const commands = {
    version,
    help,
    doctor,
    validate,
    create,
    skills,
    info,
    search,
    run,
    export: exportSkill,
    registry,
    install,
    uninstall,
    publish,
    update,
    upgrade,
    list,
    init,
};