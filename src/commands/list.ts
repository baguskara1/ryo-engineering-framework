import fs from "fs";

export function list() {
    console.log("");
    console.log("📦 Available Skill Categories");
    console.log("");

const categories = fs
    .readdirSync("skills", { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => item.name)
    .sort();

    for (const category of categories) {
        console.log(category);
    }

    console.log("");
}