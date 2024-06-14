import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nhacungcap',
  templateUrl: './nhacungcap.component.html',
  styleUrls: [
    "../../..//assets/admin-ui/css/responsive.css",
    "../../../assets/admin-ui/css/style.css",
    "../../../assets/admin-ui/css/hoadonban.css",
    './nhacungcap.component.css']
})
export class NhacungcapComponent {
  btn="Thêm mới";
  p: number = 1;
  data: any;
  datas = {
    "MaNhaCungCap": "",
    "HoTen": "",
    "DienThoai": "",
    "DiaChi": "",
    "Email": "",
  };
  savedata:any
  searchTerm = ""
  filteredData = [];

  constructor(private http: HttpClient) {}

  getData(): void {
    this.http.get('http://localhost:3000/nhacungcap').subscribe((response: any) => {
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
        item.HoTen.toLowerCase().includes(searchString.toLowerCase()) || 
        item.DiaChi.toLowerCase().includes(searchString.toLowerCase())
      );  
      this.data = this.filteredData    
    } else {
      this.data = this.savedata;
    }
  }

  loadnew(){
    this.datas.MaNhaCungCap=""
    this.datas.HoTen=""
    this.datas.DienThoai=""
    this.datas.DiaChi=""
    this.datas.Email=""
    this.btn="Thêm mới"
  }

  addData(): void {
    if(this.btn==="Thêm mới"){
      this.http.post('http://localhost:3000/nhacungcap/them', this.datas).subscribe((response: any) => {
        alert("Thêm thành công")
        this.loadnew();
        this.getData();
      }, (error) => {
        console.warn(error)
      });
    }
    if(this.btn==="Sửa"){
      this.http.put('http://localhost:3000/nhacungcap/edit', this.datas).subscribe((response: any) => {
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
    this.http.get('http://localhost:3000/nhacungcap/'+id).subscribe((response: any) => {
      this.datas.MaNhaCungCap=response[0].MaNhaCungCap;
      this.datas.HoTen=response[0].HoTen;
      this.datas.DienThoai=response[0].DienThoai;
      this.datas.DiaChi=response[0].DiaChi;
      this.datas.Email=response[0].Email;
      this.btn = "Sửa";
      console.log(response);   
    }, (error) => {
      console.warn(error)
    });
  }


  deleteData(id: number): void {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.http.delete('http://localhost:3000/nhacungcap/xoa/' + id).subscribe((response: any) => {
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

