import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hang',
  templateUrl: './hang.component.html',
  styleUrls: ["../../..//assets/admin-ui/css/responsive.css",
    "../../../assets/admin-ui/css/style.css",
    "../../../assets/admin-ui/css/hoadonban.css",
    './hang.component.css']
})
export class HangComponent {
  btn = "Thêm mới"
  p: number = 1;
  data: any;
  datas: any = {
    "MaHang": "",
    "TenHang": "",
    "MoTa": ""
  };
  savedata:any
  searchTerm = ""
  filteredData = [];

  constructor(private http: HttpClient) { }

  getData(): void {
    this.http.get('http://localhost:3000/hang').subscribe((response: any) => {
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
        item.TenHang.toLowerCase().includes(searchString.toLowerCase()) || 
        item.MoTa.toLowerCase().includes(searchString.toLowerCase())
      );  
      this.data = this.filteredData    
    } else {
      this.data = this.savedata;
    }
  }

  loadnew() {
    this.datas.MaHang = ""
    this.datas.TenHang = ""
    this.datas.MoTa = ""
    this.btn = "Thêm mới"
  }

  addData(): void {
    if (this.btn === "Thêm mới") {
      this.http.post('http://localhost:3000/hang/them', this.datas).subscribe((response: any) => {
        this.loadnew();
        this.getData();
        alert("Thêm thành công")
      }, (error) => {
        console.warn(error)
      });
    }
    if (this.btn === "Sửa") {
      this.http.put('http://localhost:3000/hang/edit', this.datas).subscribe((response: any) => {
        this.loadnew();
        this.getData();
        alert("Sửa thành công")
      }, (error) => {
        console.error("Lỗi sửa dữ liệu", error)
      });
    }
  }

  edit(id: number) {
    this.http.get('http://localhost:3000/hang/' + id).subscribe((response: any) => {
      this.datas.MaHang = response[0].MaHang;
      this.datas.TenHang = response[0].TenHang;
      this.datas.MoTa = response[0].MoTa;
      this.btn = "Sửa";
      console.log(this.datas)
    }, (error) => {
      console.warn(error)
    });
  }

  deleteData(id: number): void {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.http.delete('http://localhost:3000/hang/xoa/' + id).subscribe((response: any) => {
        alert("Xóa thành công")
        this.getData();
      }, (error) => {
        console.error("Lỗi xóa dữ liệu", error)
      });
    }
  }

  // getdataid(data:any){
  //   this.datas = data;
  // }

  ngOnInit(): void {
    this.getData();

  }
}
