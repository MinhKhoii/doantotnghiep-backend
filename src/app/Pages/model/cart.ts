export class carts{
    ProductID:number;
    ProductName: string;
    ProductPrice: number;
    ProductPath: string;
    ProductSize: string;
    Quantity: number;
    UserID: number;

    constructor(id:number,name:string,price:number,path:string,size:string,quantity:number,userid:number){
        this.ProductID = id;
        this.ProductName = name;
        this.ProductPrice = price;
        this.ProductPath = path;
        this.ProductSize = size;
        this.Quantity = quantity;
        this.UserID = userid;

    }
}