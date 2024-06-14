import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chitiethoadonnhap',
  templateUrl: './chitiethoadonnhap.component.html',
  styleUrls: ['./chitiethoadonnhap.component.css',
    "../../..//assets/admin-ui/css/responsive.css",
    "../../../assets/admin-ui/css/style.css",
    "../../../assets/admin-ui/css/hoadonban.css",
  ]
})
export class ChitiethoadonnhapComponent {
  btn = "Thêm mới";
  p: number = 1;
  data: any;
  sp: any;
  id: any
  hd: any;
  mau: any;
  maugoc:any
  kt: any;
  ktgoc:any
  datas = {
    "MaChiTietHoaDonNhap": "",
    "MaHoaDonNhap": "",
    "MaChiTietSanPham": "",
    "MaKichThuoc": "",
    "MaMau": "",
    "SoLuong": "",
    "GiaNhap": "",
  };


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getData();
    this.getData1();
    this.getData2();
    this.getData3();
    this.getData4();
  }

  getData(): void {
    this.http.get('http://localhost:3000/chitiethdn').subscribe((response: any) => {
      this.data = response;
      console.log(this.data)
    }, (error) => {
      console.warn(error)
    });
  }


  getData1(): void {
    this.http.get('http://localhost:3000/chitietsanpham').subscribe((response: any) => {
      this.sp = response;
      console.log(this.sp)
    }, (error) => {
      console.warn(error)
    });
  }


  getData2(): void {
    this.http.get('http://localhost:3000/hoadonban').subscribe((response: any) => {
      this.hd = response;
      console.log(this.hd)
    }, (error) => {
      console.warn(error)
    });
  }

  getData3(): void {
    this.http.get('http://localhost:3000/mau').subscribe((response: any) => {
      this.maugoc =response
      this.mau = response;
    }, (error) => {
      console.warn(error)
    });
  }

  getData4(): void {
    this.http.get('http://localhost:3000/kichthuoc').subscribe((response: any) => {
      this.ktgoc=response
      this.kt = response;
      console.log(this.kt)
    }, (error) => {
      console.warn(error)
    });
  }



  loadnew() {
    this.datas.MaChiTietHoaDonNhap = ""
    this.datas.MaHoaDonNhap = ""
    this.datas.MaChiTietSanPham = ""
    this.datas.MaKichThuoc = ""
    this.datas.MaMau = ""
    this.datas.SoLuong = ""
    this.datas.GiaNhap = ""
    this.btn = "Thêm mới"
  }

  addData(): void {
    if (this.btn === "Thêm mới") {
      this.datas.MaHoaDonNhap = this.id
      this.http.post('http://localhost:3000/chitiethdn/them', this.datas).subscribe((response: any) => {
        alert("Thêm thành công")
        this.loadnew();
        this.getData();
      }, (error) => {
        console.warn(error)
      });
    }
    if (this.btn === "Sửa") {
      this.http.put('http://localhost:3000/chitiethdn/edit', this.datas).subscribe((response: any) => {
        console.log(response);
        this.loadnew();
        this.getData();
        alert("Sửa thành công")
      }, (error) => {
        console.error("Lỗi sửa dữ liệu", error)
      });
    }
  }
  changeproduct(event: any) {
    this.datas.MaChiTietSanPham = event.target.value
    const datanew = this.sp.filter((x: any) => x.MaSanPham === Number(event.target.value))
    const uniqueMauIds = new Set(datanew.map((item: any) => item.MaMau));
    const maumoi = this.maugoc.filter((x: any) => uniqueMauIds.has(x.MaMau));
    const uniqueKichThuocIds = new Set(datanew.map((item:any) => item.MaKichThuoc));
    const kichthuocmoi = this.ktgoc.filter((x: any) => uniqueKichThuocIds.has(x.MaKichThuoc));
    this.mau =maumoi
    this.kt=kichthuocmoi

  }
  edit(id: number) {
    console.log(id);
    
    this.http.get('http://localhost:3000/chitiethdn/' + id).subscribe((response: any) => {
      console.log(response);
      
      this.datas.MaChiTietHoaDonNhap = response[0].MaChiTietHoaDonNhap;
      this.datas.MaHoaDonNhap = response[0].MaHoaDonNhap;
      this.datas.MaChiTietSanPham = response[0].MaChiTietSanPham;
    // const datanew = this.sp.filter((x: any) => x.MaSanPham === Number(event.target.value))
    // const uniqueMauIds = new Set(datanew.map((item: any) => item.MaMau));
    // const maumoi = this.maugoc.filter((x: any) => uniqueMauIds.has(x.MaMau));
    // const uniqueKichThuocIds = new Set(datanew.map((item:any) => item.MaKichThuoc));
    // const kichthuocmoi = this.ktgoc.filter((x: any) => uniqueKichThuocIds.has(x.MaKichThuoc));
      this.datas.MaKichThuoc = response[0].MaKichThuoc;
      this.datas.MaMau = response[0].MaMau;
      this.datas.SoLuong = response[0].SoLuong;
      this.datas.GiaNhap = response[0].GiaNhap;
      this.btn = "Sửa";
      console.log(this.datas);
    }, (error) => {
      console.warn(error)
    });
  }


  deleteData(id: number): void {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.http.delete('http://localhost:3000/chitiethdn/xoa/' + id).subscribe((response: any) => {
        alert("Xóa thành công")
        this.getData();
      }, (error) => {
        console.error("Lỗi xóa dữ liệu", error)
      });
    }
  }
}


