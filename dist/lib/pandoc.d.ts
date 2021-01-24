declare const pandoc: (src: string, out: string, options?: {
    [key: string]: string | boolean;
}, pwd?: string) => Promise<string>;
export default pandoc;
export declare const TEMPLATES: {
    latex: string;
};
export declare const FILTERS: {
    latex: string;
};
