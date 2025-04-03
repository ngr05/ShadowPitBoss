import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

let db: Database;

export const addTo = async (table: string, data: object|object[]) => {
    const records = Array.isArray(data) ? data : [data];
    console.log(`Adding ${records.length} record${records.length && "s"} to SQLite ${table}...`);
    validateDbConnection();

    const keys = Object.keys(records[0]);
    const values: any[] = [];
    const query = `INSERT INTO ${table} (\`${keys.join("`, `")}\`) VALUES ${records.map((record: object) => {
        values.push(...Object.values(record));
        return `(${new Array(keys.length).fill("?").join(", ")})`;
    })}`;
    return await db.run(query, values);
};

export const close = async () => {
    console.log("Closing SQLite database...");
    validateDbConnection();
    await db.close();
};

export const connect = async () => {
    console.log("Connecting to SQLite database...");
    db = await open({
        filename: process.env.DATA_FILE ?? ":memory:",
        driver: sqlite3.Database,
    });
};

export const getAll = async (table: string) => {
    console.log(`Getting all records from ${table}...`);
    validateDbConnection();
    return await db.all(`SELECT * FROM ${table}`);
};

export const getSingle = async (table: string, id: number|string, field: string = "id") => {
    console.log(`Getting ${table} with ID: ${id}`);
    validateDbConnection();
    return await db.get(`SELECT * FROM ${table} WHERE ${field} = ?`, [id]);
};

export const migrate = async () => {
    console.log("Migrating SQLite database...");
    validateDbConnection();
    await db.migrate({
        migrationsPath: `${process.cwd()}/migrations`,
    });
};

export const update = async (table: string, data: object, condition: object = {}) => {
    console.log("Updating SQLite record...");
    validateDbConnection();

    const values: any[] = [ ...Object.values(data), ...Object.values(condition) ];
    let query = `UPDATE ${table} SET ${Object.keys(data).map((key: string) => `${key}=?`).join(", ")}`;
    if (Object.keys(condition).length > 0) {
        query = `${query} WHERE ${Object.keys(condition).map((key: string) => `${key}=?`).join(" AND ")}`;
    }
    return await db.run(query, values);
};

const validateDbConnection = () => {
    if (!db) {
        console.error("Database connection is not established.");
        throw new Error("Database connection is not established.");
    }
}