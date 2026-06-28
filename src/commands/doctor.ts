import fs from "fs";

function checkDirectory(path: string) {
    if (fs.existsSync(path)) {
        console.log(`✅ ${path}`);
    } else {
        console.log(`❌ ${path} (missing)`);
    }
}

export function doctor() {

    console.log("");
    console.log("🔍 Running Ryo Doctor...");
    console.log("");

    checkDirectory("skills");
    checkDirectory("docs");
    checkDirectory("templates");
    checkDirectory("scripts");
    checkDirectory("specs");

    console.log("");
}