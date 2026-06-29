# Examples

## Example 1: Express Server with Middleware

```typescript
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

## Example 2: Router with Validation

```typescript
import { Router, Request, Response } from "express";
import { z } from "zod";

const router = Router();
const userSchema = z.object({ name: z.string().min(1), email: z.string().email() });

router.post("/users", (req: Request, res: Response) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error);
  res.status(201).json({ id: 1, ...result.data });
});
```
