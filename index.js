import "dotenv/config";
import express from "express";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.js";
const databaseUrl = process.env["DATABASE_URL"];
if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
}
const adapter = new PrismaMariaDb(databaseUrl);
const client = new PrismaClient({ adapter });
const app = express();
const PORT = 3000;
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.post("/users", async (req, res) => {
    try {
        const user = await client.user.create({
            data: req.body,
        });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map