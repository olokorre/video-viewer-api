import Connection from "../../connections/Connection";
import Script from "./Script";

export default class CreateVideoTableScript implements Script {
    readonly version = 2;

    async up(connection: Connection): Promise<void> {
        await connection.execute(`
            CREATE TABLE video (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                url TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    async down(connection: Connection): Promise<void> {
        await connection.execute('DROP TABLE video');
    }
}
