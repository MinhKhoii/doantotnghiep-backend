import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-mau',
  templateUrl: './mau.component.html',
  styleUrls: ["../../..//assets/admin-ui/css/responsive.css",
  "../../../assets/admin-ui/css/style.css",
  "../../../assets/admin-ui/css/hoadonban.css",
  './mau.component.css']
})
export class MauComponent {
  btn="Thêm mới";
  p: number = 1;
  data: any;
  datas = {
    "MaMau": "",
    "TenMau": "",

  };
  savedata:any
  searchTerm = ""
  filteredData = [];

  constructor(private http: HttpClient,private route:ActivatedRoute) {}

  getData(): void {
    this.http.get('http://localhost:3000/mau').subscribe((response: any) => {
      this.data = response;
      this.savedata = response
      console.log(this.data)
    }, (error) => {
      console.warn(error)
    });
  }

  filterData(event:any) {
    let searchString = event.target.value 
    if (searchString) {
      this.filteredData = this.savedata.filter((item: any) => 
        item.TenMau.toLowerCase().includes(searchString.toLowerCase()) 
      );  
      console.log(this.filteredData);
      
      this.data = this.filteredData    
      console.log(this.data);
      
    } else {
      this.data = this.savedata;
    }
  }

  loadnew(){
    this.datas.MaMau=""
    this.datas.TenMau=""
    this.btn="Thêm mới"
  }

  addData(): void {
    if(this.btn==="Thêm mới"){
      this.http.post('http://localhost:3000/mau/them', this.datas).subscribe((response: any) => {
        alert("Thêm thành công")
        this.loadnew();
        this.getData();
      }, (error) => {
        console.warn(error)
      });
    }
    if(this.btn==="Sửa"){
      this.http.put('http://localhost:3000/mau/edit', this.datas).subscribe((response: any) => {
        this.loadnew();
        this.getData();
        alert("Sửa thành công")
      }, (error) => {
        console.error("Lỗi sửa dữ liệu", error)
      });
    }
  }
  
  edit(id:number){
    this.http.get('http://localhost:3000/mau/'+id).subscribe((response: any) => {
      this.datas.MaMau=response[0].MaMau;
      this.datas.TenMau=response[0].TenMau;
      this.btn = "Sửa";
      console.log(this.datas);   
    }, (error) => {
      console.warn(error)
    });
  }


  deleteData(id: number): void {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.http.delete('http://localhost:3000/mau/xoa/' + id).subscribe((response: any) => {
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
