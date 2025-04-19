import Connection from "../connections/Connection";
import SetUp from "./scripts/0001_setup_script";
import CreateVideoTableScript from "./scripts/0002_create_video_table_script";
import Script from "./scripts/Script";

export default class Migration {

    private steps: Script[];

    constructor(private connection: Connection) {
        this.steps = [
            new SetUp(),
            new CreateVideoTableScript(),
        ];
    }

    private async getVersion(): Promise<number> {
        try {
            const [{ version }] = await this.connection.execute<{ version: number }>('SELECT version FROM migration');
            return version;
        } catch (e) {
            return 0;
        }
    }

    async run(): Promise<void> {
        try {
            const currentVersion = await this.getVersion();
            for (const step of this.steps) {
                if (step.version <= currentVersion) {
                    continue;
                }
                await step.up(this.connection);
                await this.connection.execute('UPDATE migration SET version = ?', [step.version]);
            }
        } catch (e) {
            console.error(`Falha ao rodar as migrations: ${e}`);
        }
    }

}
