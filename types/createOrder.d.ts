import { options } from "./types";
declare type createOptions = {
    auth: Promise<any>;
    data: options;
};
declare const createOrder: (options: createOptions) => Promise<unknown>;
export default createOrder;
