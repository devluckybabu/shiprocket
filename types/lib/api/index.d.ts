import { orderOptions, ProductOptions } from "./data_types";
declare class shiprocketConfig {
    private email;
    private password;
    constructor(user: {
        email: string;
        password: string;
    });
    private post;
    private auth;
    private get;
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
    getProducts: (options?: {
        per_page?: number | undefined;
        page?: number | undefined;
        sort?: "ASC" | "DESC" | undefined;
        sort_by?: string | undefined;
        filter?: string | undefined;
        filter_by?: string | undefined;
    } | undefined) => Promise<unknown>;
    getLists: (options?: {
        per_page?: number | undefined;
        page?: number | undefined;
        sort?: "ASC" | "DESC" | undefined;
        sort_by?: string | undefined;
        filter?: string | undefined;
        filter_by?: string | undefined;
    } | undefined) => Promise<unknown>;
    getProduct: (id: string) => Promise<unknown>;
    addProduct: (data: ProductOptions) => Promise<unknown>;
    getLocality: (pincode: number) => Promise<unknown>;
    getServiceability: (options: {
        pickup_pincode: string;
        delivery_pincode: string;
        cod: boolean;
        orderId?: string;
        price?: number;
        weight: number;
        hieght: number;
        breadth?: number;
        mode?: 'Surface' | 'Air';
        is_return?: boolean;
    }) => Promise<unknown>;
    getStatements: (options?: {
        per_page?: number | undefined;
        page?: number | undefined;
        to?: string | undefined;
        from?: string | undefined;
    } | undefined) => Promise<unknown>;
    getWalletBalance: () => Promise<unknown>;
    getChannels: () => Promise<unknown>;
    getPickupLocations: () => Promise<unknown>;
    addPickupLocation: (data: {
        pickup_location: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        address_2?: string;
        city: string;
        state: string;
        country: string;
        pin_code: string;
    }) => Promise<unknown>;
}
export default shiprocketConfig;
