import { orderOptions } from "./data_types";
interface options {
    email: string;
    password: string;
}
declare class shiprocketConfig {
    private email;
    private password;
    constructor({ email, password }: options);
    private auth;
    getOrders: (options?: {
        per_page?: number | undefined;
        page?: number | undefined;
        sort?: "ASC" | "DESC" | undefined;
        sort_by?: string | undefined;
        to?: string | undefined;
        from?: string | undefined;
        filter?: string | undefined;
        filter_by?: string | undefined;
        search?: string | undefined;
        pickup_location?: string | undefined;
    } | undefined) => Promise<unknown>;
    getOrder: (id: string) => Promise<unknown>;
    getTracking: (options: {
        type: 'awb' | 'shipment' | string;
        id: string;
    }) => Promise<unknown>;
    createOrder: (options: orderOptions) => Promise<unknown>;
    updateOrder: (options: orderOptions) => Promise<unknown>;
    getLocality: (pincode: number) => Promise<unknown>;
    getStatements: (options?: {
        per_page?: number | undefined;
        page?: number | undefined;
        to?: string | undefined;
        from?: string | undefined;
    } | undefined) => Promise<unknown>;
}
export default shiprocketConfig;
