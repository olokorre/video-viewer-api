export type Value = string | number | null | Buffer;

export default interface Connection {

    execute<T>(smtm: string, parms?: Value[]): Promise<T[]>;

}
