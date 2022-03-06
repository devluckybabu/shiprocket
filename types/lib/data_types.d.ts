export interface dataOptions {
    id: string;
    date: string;
    location: "primary";
    comment?: string;
    first_name: string;
    last_name: string;
    address: string;
    address_2: string;
    city: string;
    pincode: number;
    state: string;
    country: string;
    email: string;
    phone: number;
    items: [
        {
            name: string;
            sku: string;
            units: string;
            selling_price: number;
            discount?: number;
            tax?: string;
            hsn?: string;
        }
    ];
    charge: number;
    total: number;
    length: number;
    breadth: number;
    height: number;
    weight: number;
    payment_method: "Prepaid" | "COD";
    auth: Promise<any>;
}
export interface orderOptions {
    id: string;
    date: string;
    location: "primary";
    comment?: string;
    first_name: string;
    last_name: string;
    address: string;
    address_2: string;
    city: string;
    pincode: number;
    state: string;
    country: string;
    email: string;
    phone: number;
    items: [
        {
            name: string;
            sku: string;
            units: string;
            selling_price: number;
            discount?: number;
            tax?: string;
            hsn?: string;
        }
    ];
    charge: number;
    total: number;
    length: number;
    breadth: number;
    height: number;
    weight: number;
    payment_method: "Prepaid" | "COD";
}
export declare const replaceAll: (text: string, separater: string, replacer: string) => string;
export interface ProductOptions {
    name: string;
    category_code: 'default' | string;
    hsn?: string;
    type: "single" | "multiple";
    sku: string;
    quantity: number;
    description?: string;
    brand?: string;
    size?: string;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    ean?: string;
    upc?: string;
    color?: string;
    imei_serialnumber?: string;
    cost_price?: number;
    mrp?: number;
    status?: boolean;
    image_ur?: string;
}
