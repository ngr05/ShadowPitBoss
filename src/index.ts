import dotenv from "dotenv";

import app from "./server";

dotenv.config();

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
});
