import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoaispComponent } from './AdminCP/loaisp/loaisp.component';
import { SanphamComponent } from './AdminCP/sanpham/sanpham.component';
import { HangComponent } from './AdminCP/hang/hang.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { MauComponent } from './AdminCP/mau/mau.component';
import { KichthuocComponent } from './AdminCP/kichthuoc/kichthuoc.component';
import { AnhComponent } from './AdminCP/anh/anh.component';
import { NhacungcapComponent } from './AdminCP/nhacungcap/nhacungcap.component';
import { NguoidungComponent } from './AdminCP/nguoidung/nguoidung.component';
import { HoadonbanComponent } from './AdminCP/hoadonban/hoadonban.component';
import { HoadonnhapComponent } from './AdminCP/hoadonnhap/hoadonnhap.component';
import { ChitietsanphamComponent } from './AdminCP/chitietsanpham/chitietsanpham.component';
import { IndexComponent } from './Pages/index/index.component';
import { DanhmucComponent } from './Pages/danhmuc/danhmuc.component';
import { ChitietComponent } from './Pages/chitiet/chitiet.component';
import { GiohangComponent } from './Pages/giohang/giohang.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';
import { CategoryComponent } from './Pages/category/category.component';
import { VanchuyenComponent } from './AdminCP/vanchuyen/vanchuyen.component';
import { DangnhapComponent } from './Pages/dangnhap/dangnhap.component';
import { ChitiethoadonComponent } from './AdminCP/chitiethoadon/chitiethoadon.component';
import { ChitiethoadonnhapComponent } from './AdminCP/chitiethoadonnhap/chitiethoadonnhap.component';
import { ThongkeComponent } from './AdminCP/thongke/thongke.component';
import { UserLayoutComponent } from './shared/user-layout/user-layout.component';

const routes: Routes = [
  {
    path:'',
    component:UserLayoutComponent,
    children:[
      {
        path:'',
        component:IndexComponent
      },
      {
        path:'danhmuc/:id',
        component:CategoryComponent
      },
      {
        path:'danhmuc',
        component:CategoryComponent
      },
      {
        path:'chitiet/:id',
        component:ChitietComponent
      },
      {
        path:'giohang',
        component:GiohangComponent
      },
      {
        path:'checkout',
        component:CheckoutComponent
      },
      
    ]
  },
  {
    path:'admin',
    component:AdminLayoutComponent,
    children:[
      {
        path:'',
        component:LoaispComponent
      },
      {
        path:"sanpham",
        component:SanphamComponent
      },
      {
        path:"hang",
        component:HangComponent
      },
      {
        path:"mau",
        component:MauComponent
      },
      {
        path:"kichthuoc",
        component:KichthuocComponent
      },
      {
        path:"anh",
        component:AnhComponent
      },
      {
        path:"nhacungcap",
        component:NhacungcapComponent
      },
      {
        path:"nguoidung",
        component:NguoidungComponent
      },
      {
        path:"hoadonban",
        component:HoadonbanComponent
      },
      {
        path:"hoadonnhap",
        component:HoadonnhapComponent
      },
      {
        path:"chitietsp",
        component:ChitietsanphamComponent
      },
      {
        path:"chitiethoadon/:id",
        component:ChitiethoadonComponent
      },
      {
        path:"chitiethdn/:id",
        component:ChitiethoadonnhapComponent
      },
      {
        path:"vanchuyen",
        component:VanchuyenComponent
      },
      {
        path:"thongke",
        component:ThongkeComponent
      }
    ]
  },
  {
    path:'login',
    component:DangnhapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
