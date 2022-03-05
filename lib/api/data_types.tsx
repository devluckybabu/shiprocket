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
  items: [{
    name: string;
    sku: string;
    units: string;
    selling_price: number;
    discount?: number;
    tax?: string;
    hsn?: string
  }];
  charge: number;
  total: number;
  length: number;
  breadth: number;
  height: number;
  weight: number;
  payment_method: "Prepaid" | "COD";
  auth: Promise<any>;
};

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
  items: [{
    name: string;
    sku: string;
    units: string;
    selling_price: number;
    discount?: number;
    tax?: string;
    hsn?: string
  }];
  charge: number;
  total: number;
  length: number;
  breadth: number;
  height: number;
  weight: number;
  payment_method: "Prepaid" | "COD";
};

export const replaceAll = (text: string, separater: string, replacer: string) => {
  if (text?.length && typeof text == "string") {
    const new_text = text.split(separater).join(replacer);
    return new_text;
  };
  return '';
};
export default replaceAll;