import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hoadonnhap',
  templateUrl: './hoadonnhap.component.html',
  styleUrls: ['./hoadonnhap.component.css',
  "../../..//assets/admin-ui/css/responsive.css",
  "../../../assets/admin-ui/css/style.css",
  "../../../assets/admin-ui/css/hoadonban.css",
  ]
})
export class HoadonnhapComponent {
  btn="Thêm mới";
  p: number = 1;
  data: any;
  ncc: any;
  ngd: any;
  id:any
  datas = {
    "MaHoaDonNhap": "",
    "MaNhaCungCap": "",
    "MaNguoiDung": "",
    "NgayNhap": "",
    "DiaChi": "",
    "Email": "",
  };
  savedata:any
  searchTerm = ""
  filteredData = [];
  

  constructor(private http: HttpClient,private router:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.getData();
    this.getData1();
    this.getData2();

  }

  getData(): void {
    this.http.get('http://localhost:3000/hoadonnhap').subscribe((response: any) => {
      this.data = response;
      console.log(this.data)
    }, (error) => {
      console.warn(error)
    });
  }

  filterData(event:any) {
    let searchString = event.target.value 
    
    if (searchString) {
      this.filteredData = this.savedata.filter((item: any) => 
        item.MaNhaCungCap.toLowerCase().includes(searchString.toLowerCase()) || 
        item.DiaChi.toLowerCase().includes(searchString.toLowerCase())
      );  
      this.data = this.filteredData    
    } else {
      this.data = this.savedata;
    }
  }
  
  getData1(): void {
    this.http.get('http://localhost:3000/nhacungcap').subscribe((response: any) => {
      this.ncc = response;
      console.log(this.ncc)
    }, (error) => {
      console.warn(error)
    });
  }

  
  getData2(): void {
    this.http.get('http://localhost:3000/nguoidung').subscribe((response: any) => {
      this.ngd = response;
      console.log(this.ngd)
    }, (error) => {
      console.warn(error)
    });
  }

  loadnew(){
    this.datas.MaHoaDonNhap=""
    this.datas.MaNhaCungCap=""
    this.datas.MaNguoiDung=""
    this.datas.NgayNhap=""
    this.btn="Thêm mới"
  }

  addData(): void {
    if(this.btn==="Thêm mới"){
      this.http.post('http://localhost:3000/hoadonnhap/them', this.datas).subscribe((response: any) => {
        alert("Thêm thành công")
        this.loadnew();
        this.getData();
      }, (error) => {
        console.warn(error)
      });
    }
    if(this.btn==="Sửa"){
      this.http.put('http://localhost:3000/hoadonnhap/edit', this.datas).subscribe((response: any) => {
        console.log(response);
        this.loadnew();
        this.getData();
        alert("Sửa thành công")
      }, (error) => {
        console.error("Lỗi sửa dữ liệu", error)
      });
    }
  }
  
  edit(id:number){
    this.http.get('http://localhost:3000/hoadonnhap/'+id).subscribe((response: any) => {
      this.datas.MaHoaDonNhap=response[0].MaHoaDonNhap;
      this.datas.MaNhaCungCap=response[0].MaNhaCungCap;
      this.datas.MaNguoiDung=response[0].MaNguoiDung;
      this.datas.NgayNhap=response[0].NgayNhap;
      this.btn = "Sửa";
      console.log(response);   
    }, (error) => {
      console.warn(error)
    });
  }


  deleteData(id: number): void {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.http.delete('http://localhost:3000/hoadonnhap/xoa/' + id).subscribe((response: any) => {
        alert("Xóa thành công")
        this.getData();
      }, (error) => {
        console.error("Lỗi xóa dữ liệu", error)
      });
    }
  }



  
}


