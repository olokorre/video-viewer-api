import Connection from "../../connections/Connection";

export default interface Script {

    readonly version: number;
    up(connection: Connection): Promise<void>;
    down(connection: Connection): Promise<void>;

}
