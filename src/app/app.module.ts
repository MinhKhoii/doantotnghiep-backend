import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanphamComponent } from './AdminCP/sanpham/sanpham.component';
import { LoaispComponent } from './AdminCP/loaisp/loaisp.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HangComponent } from './AdminCP/hang/hang.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';

import { MauComponent } from './AdminCP/mau/mau.component';
import { KichthuocComponent } from './AdminCP/kichthuoc/kichthuoc.component';
import { AnhComponent } from './AdminCP/anh/anh.component';
import { NhacungcapComponent } from './AdminCP/nhacungcap/nhacungcap.component';
import { NguoidungComponent } from './AdminCP/nguoidung/nguoidung.component';
import { HoadonnhapComponent } from './AdminCP/hoadonnhap/hoadonnhap.component';
import { HoadonbanComponent } from './AdminCP/hoadonban/hoadonban.component';
import { ChitietsanphamComponent } from './AdminCP/chitietsanpham/chitietsanpham.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule, DatePipe } from '@angular/common';
import { IndexComponent } from './Pages/index/index.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DanhmucComponent } from './Pages/danhmuc/danhmuc.component';
import { ChitietComponent } from './Pages/chitiet/chitiet.component';
import { GiohangComponent } from './Pages/giohang/giohang.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';
import { CategoryComponent } from './Pages/category/category.component';
import { VanchuyenComponent } from './AdminCP/vanchuyen/vanchuyen.component';
import { DangnhapComponent } from './Pages/dangnhap/dangnhap.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ChitiethoadonComponent } from './AdminCP/chitiethoadon/chitiethoadon.component';
import { ChitiethoadonnhapComponent } from './AdminCP/chitiethoadonnhap/chitiethoadonnhap.component';
import { ThongkeComponent } from './AdminCP/thongke/thongke.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPayPalModule } from 'ngx-paypal';
import { UserLayoutComponent } from './shared/user-layout/user-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SanphamComponent,
    LoaispComponent,
    HangComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    MauComponent,
    KichthuocComponent,
    AnhComponent,
    NhacungcapComponent,
    NguoidungComponent,
    HoadonnhapComponent,
    HoadonbanComponent,
    ChitietsanphamComponent,
    IndexComponent,
    DanhmucComponent,
    ChitietComponent,
    GiohangComponent,
    CheckoutComponent,
    CategoryComponent,
    VanchuyenComponent,
    DangnhapComponent,
    ChitiethoadonComponent,
    ChitiethoadonnhapComponent,
    ThongkeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    NgxPayPalModule,
    CommonModule,
    NgxChartsModule,
    CalendarModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
