export declare type address = {
    first_name: string;
    last_name: string;
    phone: number;
    email: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    address: string;
    address_2?: string;
};
export declare type priceInfo = {
    discount?: number;
    sub_total: number;
    total_discount?: number;
    shipping_charges: number;
    giftwrap_charges?: number;
    transaction_charges?: number;
};
export declare type dimensions = {
    length: number;
    breadth: number;
    height: number;
    weight: number;
};
export interface options {
    channel_id: string;
    order_id: string;
    order_date: string;
    pickup_location: "primary";
    comment?: string;
    billing_address: address;
    shipping_address?: address;
    shipping_is_billing?: boolean;
    order_items: [
        {
            title: string;
            sku: string;
            quantity: number;
            price: number;
            discount?: number;
            tax?: number;
            hsn?: number;
        }
    ];
    priceInfo: priceInfo;
    payment_method: "Prepaid" | "COD";
    pakageInfo: dimensions;
}
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
export interface serviceabilityOptions {
    pickup_pincode: string;
    delivery_pincode: string;
    cod: boolean;
    orderId?: string;
    price?: number;
    weight: number;
    hieght: number;
    breadth?: number;
    mode: 'Surface' | 'Air';
    is_return?: boolean;
}
