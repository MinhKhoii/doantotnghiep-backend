import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loaisp',
  templateUrl: './loaisp.component.html',
  styleUrls: [
    "../../..//assets/admin-ui/css/responsive.css",
    "../../../assets/admin-ui/css/style.css",
    "../../../assets/admin-ui/css/hoadonban.css",
  ]
})
export class LoaispComponent {
  btn="Thêm mới";
  p: number = 1;
  data: any;
  datas = {
    "MaLoai": "",
    "TenLoai": "",
    "MoTa": "",
  };
  savedata:any
  searchTerm = ""
  filteredData = [];

  constructor(private http: HttpClient,private route:ActivatedRoute) {}

  getData(): void {
    this.http.get('http://localhost:3000/loaisp').subscribe((response: any) => {
      this.data = response;
      this.savedata = response;
      console.log(this.data)
    }, (error) => {
      console.warn("Lỗi cơ sở dữ liệu",error)
    });
  }

  filterData(event:any) {
    let searchString = event.target.value 
    
    if (searchString) {
      this.filteredData = this.savedata.filter((item: any) => 
        item.TenLoai.toLowerCase().includes(searchString.toLowerCase()) || 
        item.MoTa.toLowerCase().includes(searchString.toLowerCase())
      );  
      this.data = this.filteredData    
    } else {
      this.data = this.savedata;
    }
  }

  loadnew(){
    this.datas.MaLoai=""
    this.datas.TenLoai=""
    this.datas.MoTa=""
    this.btn="Thêm mới"
  }

  addData(): void {
    if(this.btn==="Thêm mới"){
      this.http.post('http://localhost:3000/loaisp/them', this.datas).subscribe((response: any) => {
        alert("Thêm thành công")
        this.loadnew();
        this.getData();
      }, (error) => {
        console.warn("Lỗi",error)
      });
    }
    if(this.btn==="Sửa"){
      this.http.put('http://localhost:3000/loaisp/edit', this.datas).subscribe((response: any) => {
        this.loadnew();
        this.getData();
        alert("Sửa thành công")
      }, (error) => {
        console.error("Lỗi sửa dữ liệu", error)
      });
    }
  }
  
  edit(id:number){
    this.http.get('http://localhost:3000/loaisp/'+id).subscribe((response: any) => {
      console.log(response);
      
      this.datas.MaLoai=response[0].MaLoai;
      this.datas.TenLoai=response[0].TenLoai;
      this.datas.MoTa=response[0].MoTa;
      this.btn = "Sửa";
      console.log(this.datas);   
    }, (error) => {
      console.warn(error)
    });
  }


  deleteData(id: number): void {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.http.delete('http://localhost:3000/loaisp/xoa/' + id).subscribe((response: any) => {
        alert("Xóa thành công")
        this.getData();
      }, (error) => {
        console.error("Lỗi xóa dữ liệu", error)
      });
    }
  }

  ngOnInit(): void {

    this.getData();

  }
}
