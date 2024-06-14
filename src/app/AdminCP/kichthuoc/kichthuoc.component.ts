import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-kichthuoc',
  templateUrl: './kichthuoc.component.html',
  styleUrls: [
    "../../..//assets/admin-ui/css/responsive.css",
    "../../../assets/admin-ui/css/style.css",
    "../../../assets/admin-ui/css/hoadonban.css",
    './kichthuoc.component.css']
})
export class KichthuocComponent {
  btn="Thêm mới";
  p: number = 1;
  data: any;
  datas = {
    "MaKichThuoc": "",
    "TenKichThuoc": "",
  };
  savedata:any
  searchTerm = ""
  filteredData = [];

  constructor(private http: HttpClient) {}

  getData(): void {
    this.http.get('http://localhost:3000/kichthuoc').subscribe((response: any) => {
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
        item.TenKichThuoc.toLowerCase().includes(searchString.toLowerCase())
      );  
      this.data = this.filteredData    
    } else {
      this.data = this.savedata;
    }
  }

  loadnew(){
    this.datas.MaKichThuoc=""
    this.datas.TenKichThuoc=""
    this.btn="Thêm mới"
  }

  addData(): void {
    if(this.btn==="Thêm mới"){
      this.http.post('http://localhost:3000/kichthuoc/them', this.datas).subscribe((response: any) => {
        alert("Thêm thành công")
        this.loadnew();
        this.getData();
      }, (error) => {
        console.warn(error)
      });
    }
    if(this.btn==="Sửa"){
      this.http.put('http://localhost:3000/kichthuoc/edit', this.datas).subscribe((response: any) => {
        this.loadnew();
        this.getData();
        alert("Sửa thành công")
      }, (error) => {
        console.error("Lỗi sửa dữ liệu", error)
      });
    }
  }
  
  edit(id:number){
    this.http.get('http://localhost:3000/kichthuoc/'+id).subscribe((response: any) => {
      this.datas.MaKichThuoc=response[0].MaKichThuoc;
      this.datas.TenKichThuoc=response[0].TenKichThuoc;
      this.btn = "Sửa";
      console.log(this.datas);   
    }, (error) => {
      console.warn(error)
    });
  }


  deleteData(id: number): void {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.http.delete('http://localhost:3000/kichthuoc/xoa/' + id).subscribe((response: any) => {
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

