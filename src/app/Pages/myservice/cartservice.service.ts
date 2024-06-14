import { Injectable } from '@angular/core';
import { carts } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  private cartItems:carts[] = [];
  constructor() { 
    // Lấy dữ liệu từ localStorage khi service được khởi tạo
    const storedCartItems = localStorage.getItem('cart');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  private updateLocalStorage(): void {
    // Lưu trữ dữ liệu giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItems(): carts[] {
    return this.cartItems;
  }

  addToCart(cart: carts): void {
    console.log(cart);
    
    let datacart:carts[] = this.getCartItems();
    console.log(datacart);
    
    let getDataIdCart = datacart.find(x => x.ProductID === cart.ProductID);
    console.log(getDataIdCart);
    
    if(getDataIdCart){
      if(cart.Quantity > 1){
        getDataIdCart.Quantity += cart.Quantity;
        this.updateLocalStorage();
      }
      else{
        getDataIdCart.Quantity++;
        this.updateLocalStorage();
      }
    }else{
      this.cartItems.push(cart);
      this.updateLocalStorage();
    }
    
  }

  updateCart(cart:carts){
    let datacart:carts[] = this.getCartItems();
    console.log(datacart);
    
    let getDataIdCart = datacart.find(x => x.ProductID === cart.ProductID) || undefined;
    if(this.cartItems){
      if(getDataIdCart){
        getDataIdCart.Quantity = cart.Quantity;
        this.updateLocalStorage();
      }
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.ProductID !== productId);
    this.updateLocalStorage();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateLocalStorage();
  }
}
