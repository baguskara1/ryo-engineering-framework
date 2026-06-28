import fs from "fs";
import path from "path";

import { REQUIRED_FILES } from "../constants/requiredFiles";

export function validate() {

    console.log("");
    console.log("🔍 Validating Skills...");
    console.log("");

    const categories = fs.readdirSync("skills");

    let valid = 0;
    let invalid = 0;

    for (const category of categories) {

        const categoryPath = path.join("skills", category);

        if (!fs.statSync(categoryPath).isDirectory()) continue;

        const skills = fs.readdirSync(categoryPath);

        for (const skill of skills) {

            const skillPath = path.join(categoryPath, skill);

            if (!fs.statSync(skillPath).isDirectory()) continue;

            let ok = true;

            for (const file of REQUIRED_FILES) {

                const fullPath = path.join(skillPath, file);

                if (!fs.existsSync(fullPath)) {
                    ok = false;
                }
            }

            if (ok) {
                console.log(`✅ ${skillPath}`);
                valid++;
            } else {

                console.log(`❌ ${skillPath}`);

                for (const file of REQUIRED_FILES) {

                    const fullPath = path.join(skillPath, file);

                    if (!fs.existsSync(fullPath)) {
                        console.log(`   └── Missing: ${file}`);
                    }
                }

                invalid++;
            }
        }
    }

    console.log("");
    console.log("----------------------------");
    console.log(`Valid   : ${valid}`);
    console.log(`Invalid : ${invalid}`);
    console.log("----------------------------");
    console.log("");
}