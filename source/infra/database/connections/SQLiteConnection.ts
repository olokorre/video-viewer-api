import Connection, { Value } from "./Connection";
import { DatabaseSync } from "node:sqlite";

export default class SQLiteConnection implements Connection {

    private connection: DatabaseSync;

    constructor(database: string) {
        this.connection = new DatabaseSync(database);
    }

    async execute<T>(stmt: string, params?: Value[]): Promise<T[]> {
        if (stmt.toUpperCase().includes('SELECT')) {
            const query = this.connection.prepare(stmt);
            if (params && params.length > 0) {
                return query.all(...params) as T[];
            }
            return query.all() as T[];
        }
        const statement = this.connection.prepare(stmt);
        if (params && params.length > 0) {
            statement.run(...params);
        } else {
            statement.run();
        }
        return [] as T[];
    }
}
