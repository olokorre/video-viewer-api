import Connection from "../../connections/Connection";
import Script from "./Script";

export default class SetUp implements Script {

    readonly version = 1;

    async up(connection: Connection): Promise<void> {
        await connection.execute(`
            CREATE TABLE migration (
                version INTEGER NOT NULL
            )
        `);
        await connection.execute('INSERT INTO migration (version) VALUES (?)', [0]);
    }

    async down(connection: Connection): Promise<void> {
        await connection.execute('DROP TABLE migration');
    }
}
