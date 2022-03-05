declare const getStatements: (options?: {
    per_page?: number | undefined;
    page?: number | undefined;
    to?: string | undefined;
    from?: string | undefined;
    auth: Promise<any>;
} | undefined) => Promise<unknown>;
export default getStatements;
