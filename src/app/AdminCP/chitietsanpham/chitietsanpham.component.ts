import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chitietsanpham',
  templateUrl: './chitietsanpham.component.html',
  styleUrls: ['./chitietsanpham.component.css',
    "../../..//assets/admin-ui/css/responsive.css",
    "../../../assets/admin-ui/css/style.css",
    "../../../assets/admin-ui/css/hoadonban.css"
  ]
})
export class ChitietsanphamComponent {
  @ViewChild('fileinput') fileinput!: ElementRef
  btn = "Thêm mới";
  data: any;
  sploai: any;
  mau: any;
  kichthuoc: any;
  hinhanh: any;
  imageSrc: any;
  selectedFile: any;
  p: number = 1;
  savedata:any
  searchTerm = ""
  filteredData = [];

  items: any

  datas = {
    "MaChiTietSanPham": 0,
    "MaSanPham": 0,
    "MaMau": 0,
    "MaKichThuoc": 0,
    "GiaBan": 0,
    "GiaKhuyenMai": 0,
    "SoLuongTon": 100,
    "HinhAnh":[]
  };
  id: any

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getData(): void {
    this.http.get('http://localhost:3000/chitietsanpham').subscribe((response: any) => {
      const data = response.filter((x: any) => x.MaSanPham === Number(this.id))
      this.data = data;
      console.log(data);

    }, (error) => {
      console.warn(error)
    });
  }

  filterData(event:any) {
    let searchString = event.target.value 
    
    if (searchString) {
      this.filteredData = this.savedata.filter((item: any) => 
        item.TenSanPham.toLowerCase().includes(searchString.toLowerCase()) || 
        item.GiaBan.toLowerCase().includes(searchString.toLowerCase())
      );  
      this.data = this.filteredData    
    } else {
      this.data = this.savedata;
    }
  }

  getData1(): void {
    this.http.get('http://localhost:3000/sanpham').subscribe((response: any) => {
      this.sploai = response;
      console.log(this.sploai)
    }, (error) => {
      console.warn(error)
    });
  }

  getData2(): void {
    this.http.get('http://localhost:3000/mau').subscribe((response: any) => {
      this.mau = response;
      console.log(this.mau)
    }, (error) => {
      console.warn(error)
    });
  }
  getData3(): void {
    this.http.get('http://localhost:3000/kichthuoc').subscribe((response: any) => {
      this.kichthuoc = response;
      console.log(this.kichthuoc)
    }, (error) => {
      console.warn(error)
    });
  }
  loadnew() {
    this.datas.MaChiTietSanPham = 0;
    this.datas.MaSanPham = 1;
    this.datas.MaMau = 0;
    this.datas.MaKichThuoc = 0;
    this.datas.GiaBan = 0;
    this.datas.GiaKhuyenMai = 0;
    this.datas.SoLuongTon = 100;
    this.btn = "Thêm mới"
  }

  addData(): void {
    if (this.btn === "Thêm mới") {
      console.log(this.datas);
      
      this.http.post('http://localhost:3000/chitietsanpham/them', this.datas).subscribe((response: any) => {
        alert("Thêm thành công")
        this.getData();
        this.getData1();
        this.getData2();
        this.getData3();
        this.loadnew();
      }, (error) => {
        console.warn(error)
      });
    }
    if (this.btn === "Sửa") {
  
      console.log(this.datas);
      
      this.http.put('http://localhost:3000/chitietsanpham/edit', this.datas).subscribe((response: any) => {
        this.loadnew();
        this.getData();
        this.getData1();
        this.getData2();
        this.getData3();
        alert("Sửa thành công")
      }, (error) => {
        console.error("Lỗi sửa dữ liệu", error)
      });
    }
  }

  edit(id: number) {
    this.http.get('http://localhost:3000/chitietsanpham/' + id).subscribe((response: any) => {
      
      this.datas.MaChiTietSanPham = response[0].MaChiTietSanPham;
      this.datas.MaSanPham = response[0].MaSanPham;
      this.datas.MaKichThuoc = response[0].MaKichThuoc;
      this.datas.MaMau = response[0].MaMau;
      this.datas.GiaBan = response[0].GiaBan;
      this.datas.GiaKhuyenMai = response[0].GiaKhuyenMai
      this.datas.SoLuongTon = response[0].SoLuongTon;
      this.datas.HinhAnh = response[0].HinhAnh
      this.btn = "Sửa";
      console.log(this.datas);
    }, (error) => {
      console.warn(error)
    });
  }

  deleteData(id: number): void {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.http.delete('http://localhost:3000/chitietsanpham/xoa/' + id).subscribe((response: any) => {
        alert("Xóa thành công")
        this.getData();
      }, (error) => {
        console.error("Lỗi xóa dữ liệu", error)
      });
    }
  }

  upfile(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      this.uploadFile()
    }
  }

  addImage(item: any) {
    if (item) {
      this.items = item
    }
    this.fileinput.nativeElement.click()
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('fileanh', this.selectedFile);
      this.http.post("http://localhost:3000/anh/upload", formData).subscribe((response: any) => {
        console.log(response);
        
        let path = response.url;
        this.items.HinhAnh.push(path)
        if (path) {
          this.http.put('http://localhost:3000/chitietsanpham/edit', this.items).subscribe((response: any) => {
            alert("Thêm thành công")
            this.getData();
            this.getData1();
            this.getData2();
            this.getData3();
            this.loadnew();
          }, (error) => {
            console.warn(error)
          });
        }
      }, (error) => {
        console.error(error);
      })
    }
  }
  deleteimg(index:any,data:any){
    this.items = data
    this.items.HinhAnh.splice(index,1)
    this.http.put('http://localhost:3000/chitietsanpham/edit', this.items).subscribe((response: any) => {
      alert("Xóa thành công")
      this.getData();
      this.getData1();
      this.getData2();
      this.getData3();
      this.loadnew();
    }, (error) => {
      console.warn(error)
    });
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.getData();
    });
    this.getData1();
    this.getData2();
    this.getData3();
  }
}
