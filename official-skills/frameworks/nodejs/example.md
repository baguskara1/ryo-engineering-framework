# Examples

## Example 1: Async File Processing

```typescript
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

async function processData(inputPath: string, outputPath: string) {
  try {
    const data = await readFile(inputPath, "utf-8");
    const processed = data.toUpperCase();
    await writeFile(outputPath, processed);
    console.log("File processed successfully");
  } catch (error) {
    console.error("Error processing file:", error);
    throw error;
  }
}
```

## Example 2: Simple HTTP Server

```typescript
import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello from Node.js" }));
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```
