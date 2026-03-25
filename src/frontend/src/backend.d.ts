import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Cart {
    id: bigint;
    items: Array<CartItem>;
}
export type CurrencyCents = bigint;
export type ProductId = bigint;
export interface CartItem {
    productId: ProductId;
    quantity: bigint;
}
export interface Product {
    id: ProductId;
    isOnSale: boolean;
    name: string;
    description: string;
    isFeatured: boolean;
    category: string;
    rating: number;
    price: CurrencyCents;
    reviewCount: bigint;
}
export interface backendInterface {
    addProduct(product: Product): Promise<ProductId>;
    addToCart(productId: ProductId, quantity: bigint): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(): Promise<Cart>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getOnSaleProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    placeOrder(): Promise<CurrencyCents>;
    removeFromCart(productId: ProductId): Promise<void>;
}
