import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CartserviceService } from '../myservice/cartservice.service';
import { carts } from '../model/cart';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-giohang',
  templateUrl: './giohang.component.html',
  styleUrls: ['./giohang.component.css',
  '../../../assets/my-ui/css/giohang.css',
  '../../../assets/my-ui/css/responsive.css',
  "../../../assets/my-ui/css/style.css"
]
})
export class GiohangComponent {
  data:carts[]=[];
  loaisp:any;
  khachhang:any [] = []
  sum = 0;
  constructor(private http: HttpClient,private cartservice:CartserviceService,private router:Router) {}

  ngOnInit(){
    this.getData();
   
  }

  getData(): void {
    this.data = this.cartservice.getCartItems();
    this.sum = this.data.reduce((sum,value) => sum + (value.Quantity * value.ProductPrice) ,0)
    console.log(this.data);
    
  }

  upquantity(cart:carts){
    cart.Quantity++;
    this.cartservice.updateCart(cart);
    this.getData()
  }

  nextthanhtoan(){
    if(this.data.length==0){
      alert("Không có sản phẩm trong giỏ hàng. \nVui lòng thêm sản phẩm vào giỏ hàng.")
      this.router.navigateByUrl("/danhmuc")
    }else{
      let datakh = localStorage.getItem("customer");
    this.khachhang = datakh ? JSON.parse(datakh) : []
    if(!datakh){
      alert("Bạn cần phải đăng nhập để thực hiện thanh toán.")
      this.router.navigate(["/login"])
    }
    else{
      this.router.navigate(["/checkout"])
    }
    }
  }

  minusquantity(cart:carts){
    cart.Quantity--;
    if(cart.Quantity<0){
      cart.Quantity =0
    console.log(cart);
    
    this.cartservice.updateCart(cart);
    this.getData()
    }
  }

  deleteCart(id:number){
   
      this.cartservice.removeFromCart(id);
      this.getData();
    
  }
}
