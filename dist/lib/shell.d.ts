export * from "shelljs";
export declare const exec: (command: string, shouldReject?: (params: {
    code: number;
    value: string;
    error: string;
}) => boolean) => Promise<string>;
