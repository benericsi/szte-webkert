export interface Cart { 
    id: string;
    userId: string;
    productId: string;
    productTitle: string;
    productImg: string;
    productPrice: number;
    sum: number;
    quantity: number;
}