import { Component, Pipe } from '@angular/core';
import { CartserviceService } from '../myservice/cartservice.service';
import { carts } from '../model/cart';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css',
    '../../../assets/my-ui/css/responsive.css',
    "../../../assets/my-ui/css/style.css",
    "../../../assets/my-ui/css/checkout.css"]
})
export class CheckoutComponent {
  data: carts[] = [];
  khachhang: any
  hoadonmoinhat: any
  sum = 0;
  sumquantity = 0

  formCheckout: FormGroup
  submitted = false

  paymentmethod = "Thanh toán khi nhận hàng"
  ispaymentvnpay = false


  paymentCode: any;
  infoBill = {
    NgayTao: "",
    DiaChiNhan: "",
    TrangThai: 0,
    DienThoaiNhan: "",
    NguoiNhan: "",
    TongTien: 0,
    MaKhachHang: null,
    HinhThucThanhToan: "Thanh toán khi nhận hàng"
  }
  constructor(
    private cartservice: CartserviceService,
    private http: HttpClient,
    private datePiPe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {

    this.formCheckout = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(1)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      phonenumbers: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]]
      });

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paymentCode = params['code'];
      if (this.paymentCode == "00") {
        const infoBill = window.sessionStorage.getItem('infoPayment');
        const bill = infoBill ? JSON.parse(infoBill) : null;
        this.infoBill.NgayTao = bill.NgayTao
        this.infoBill.DiaChiNhan = bill.DiaChiNhan
        this.infoBill.TrangThai = 0
        this.infoBill.DienThoaiNhan = bill.DienThoaiNhan
        this.infoBill.NguoiNhan = bill.NguoiNhan
        this.infoBill.TongTien = bill.TongTien
        this.infoBill.MaKhachHang = bill.MaKhachHang
        this.infoBill.HinhThucThanhToan = bill.HinhThucThanhToan
        this.paymentvnpay()
        window.sessionStorage.clear();
      } else {
        // this.toasmsg.showToast({
        //   title: "Thanh toán thất bại",
        //   type: "warning",
        //   duration: 10000
        // })
        // window.sessionStorage.clear();
      }
    });

    this.getData();
    let datakh = localStorage.getItem("customer");
    this.khachhang = datakh ? JSON.parse(datakh) : []

    this.hoadonmoi()

    console.log(this.khachhang);

  }

  getData(): void {
    this.data = this.cartservice.getCartItems();
    this.sum = this.data.reduce((sum, value) => sum + (value.Quantity * value.ProductPrice), 0)
    this.sumquantity = this.data.reduce((sum, value) => sum + (value.Quantity), 0)
    console.log(this.data);
  }

  methodbill(event: any) {
    this.paymentmethod = event.target.value
    this.infoBill.HinhThucThanhToan = event.target.value
  }

  chechout() {
    this.submitted = true
    console.log(this.formCheckout);
    
    if (this.formCheckout.valid) {
      console.log(123);
      
      this.infoBill.MaKhachHang = this.khachhang.MaKhachHang
      this.infoBill.TongTien = this.sum
      const formattedDate = this.datePiPe.transform(new Date(Date.now()), 'yyyy-MM-dd');
      let newdate
      if (formattedDate !== null) {
        newdate = formattedDate;
        this.infoBill.NgayTao = newdate
      }
      if (this.infoBill.HinhThucThanhToan == "Thanh toán ví vnpay") {
        window.sessionStorage.setItem('infoPayment', JSON.stringify(this.infoBill));
        this.http.post("http://localhost:3000/order/create_payment_url", {
          amount: this.sum,
          language: 'vn'
        }).subscribe((res: any) => {
          window.location.href = res
        })
      }
      else {
        this.http.post('http://localhost:3000/hoadonban/them', this.infoBill).subscribe((response: any) => {
          if (response.result) {
            this.http.get('http://localhost:3000/hoadonban/hoadonmoi').subscribe((response: any) => {
              console.log(response);
              if (response) {
                let idhbd = response[0].MaHoaDon
                this.data.forEach((item) => {
                  let params = {
                    MaHoaDon: idhbd,
                    MaChiTietSanPham: item.ProductID,
                    TongTien: (item.ProductPrice * item.Quantity),
                    GiaBan: item.ProductPrice,
                    SoLuong: item.Quantity
                  }
                  this.http.post('http://localhost:3000/chitiethdb/them', params).subscribe((response: any) => {
                    if (response.result) {
                      this.cartservice.clearCart()
                      this.getData()
                      alert("Thanh toán thành công.")
                      this.router.navigateByUrl("/")
                    } else {
                      alert("Có lỗi xảy ra.")
                    }
                    console.log(response)
                  }, (error) => {
                    console.warn(error)
                  });
                })
              }
            }, (error) => {
              console.warn(error)
            });
          }
          console.log(response)
        }, (error) => {
          console.warn(error)
        });
      }
    }
  }

  paymentvnpay() {

    this.http.post('http://localhost:3000/hoadonban/them', this.infoBill).subscribe((response: any) => {
      if (response.result) {
        this.http.get('http://localhost:3000/hoadonban/hoadonmoi').subscribe((response: any) => {
          console.log(response);
          if (response) {
            let idhbd = response[0].MaHoaDon
            this.data.forEach((item) => {
              let params = {
                MaHoaDon: idhbd,
                MaChiTietSanPham: item.ProductID,
                TongTien: (item.ProductPrice * item.Quantity),
                GiaBan: item.ProductPrice,
                SoLuong: item.Quantity
              }
              this.http.post('http://localhost:3000/chitiethdb/them', params).subscribe((response: any) => {
                if (response.result) {
                  this.cartservice.clearCart()
                  this.getData()
                  alert("Thanh toán thành công.")
                  this.router.navigateByUrl("/")
                } else {
                  alert("Có lỗi xảy ra.")
                }
                console.log(response)
              }, (error) => {
                console.warn(error)
              });
            })
          }
        }, (error) => {
          console.warn(error)
        });
      }
      console.log(response)
    }, (error) => {
      console.warn(error)
    });

  }

  hoadonmoi() {
    this.http.get('http://localhost:3000/hoadonban/hoadonmoi').subscribe((response: any) => {
      if (response) {
        this.hoadonmoinhat = response
        console.log(this.hoadonmoinhat)
      }
    }, (error) => {
      console.warn(error)
    });
  }


}
