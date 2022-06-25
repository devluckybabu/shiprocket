import { options, ProductOptions, serviceabilityOptions } from "./types";
declare type awb_number = string | number;
declare class shiprocket {
    private email;
    private password;
    constructor(user: {
        email: string;
        password: string;
    });
    auth: () => Promise<unknown>;
    private post;
    private get;
    getOrders: (options?: {
        per_page?: number;
        page?: number;
        sort?: 'ASC' | "DESC";
        sort_by?: string;
        to?: string;
        from?: string;
        filter?: string;
        filter_by?: string;
        search?: string;
        pickup_location?: string;
        orderId?: string | number;
    }) => Promise<unknown>;
    getOrder: (id: string) => Promise<unknown>;
    getTracking: (options: {
        type: 'awb' | 'shipment' | 'orderId' | string;
        id: string | number;
    }) => Promise<unknown>;
    createOrder: (data: options) => Promise<unknown>;
    getProducts: (options?: {
        per_page?: number;
        page?: number;
        sort?: "ASC" | "DESC";
        sort_by?: string;
        filter?: string;
        filter_by?: string;
        productId?: string | number;
    }) => Promise<unknown>;
    getCountries: (countryId?: string | number) => Promise<unknown>;
    getAllZones: (countryId: string | number) => Promise<unknown>;
    getDiscrepancy: () => Promise<unknown>;
    checkImport: (importId: string | number) => Promise<unknown>;
    getLists: (options?: {
        per_page?: number;
        page?: number;
        sort?: "ASC" | "DESC";
        sort_by?: string;
        filter?: string;
        filter_by?: string;
    }) => Promise<unknown>;
    getProduct: (id: string | number) => Promise<unknown>;
    addProduct: (data: ProductOptions) => Promise<unknown>;
    getLocality: (pincode: number | string) => Promise<unknown>;
    getServiceability: (options: serviceabilityOptions) => Promise<unknown>;
    getStatements: (options?: {
        per_page?: number;
        page?: number;
        to?: string;
        from?: string;
    }) => Promise<unknown>;
    getWalletBalance: () => Promise<unknown>;
    getChannels: () => Promise<unknown>;
    getNDR: (options?: {
        per_page?: number;
        page?: number;
        to?: string;
        from?: string;
        search?: awb_number;
        awb?: string;
    }) => Promise<unknown>;
    ndrAction: (options: {
        awb: number | string;
        action: 'return' | 're-attempt';
        comments: string;
    }) => Promise<unknown>;
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
export default shiprocket;
