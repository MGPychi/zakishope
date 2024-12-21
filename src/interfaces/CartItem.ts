export default interface CartItem{
    qt:number;
    item:Product
}
export interface Product {
    name:string;
    image:string
    id:string;
    price:number;
}