import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vanchuyen',
  templateUrl: './vanchuyen.component.html',
  styleUrls: ['./vanchuyen.component.css',
  "../../..//assets/admin-ui/css/responsive.css",
  "../../../assets/admin-ui/css/style.css",
  "../../../assets/admin-ui/css/hoadonban.css",]
})
export class VanchuyenComponent {
  btn="Thêm mới";
  p: number = 1;
  data: any;
  datas = {
    "MaVanChuyen": "",
    "TenVanChuyen": "",
    "Gia": "",
  };


  constructor(private http: HttpClient) {}

  getData(): void {
    this.http.get('http://localhost:3000/vanchuyen').subscribe((response: any) => {
      this.data = response;
      console.log(this.data)
    }, (error) => {
      console.warn(error)
    });
  }

  loadnew(){
    this.datas.MaVanChuyen="",
    this.datas.TenVanChuyen="",
    this.datas.Gia = "",
    this.btn="Thêm mới"
  }

  addData(): void {
    if(this.btn==="Thêm mới"){
      this.http.post('http://localhost:3000/vanchuyen/them', this.datas).subscribe((response: any) => {
        alert("Thêm thành công")
        this.loadnew();
        this.getData();
      }, (error) => {
        console.warn(error)
      });
    }
    if(this.btn==="Sửa"){
      this.http.put('http://localhost:3000/vanchuyen/edit', this.datas).subscribe((response: any) => {
        this.loadnew();
        this.getData();
        alert("Sửa thành công")
      }, (error) => {
        console.error("Lỗi sửa dữ liệu", error)
      });
    }
  }
  
  edit(id:number){
    this.http.get('http://localhost:3000/vanchuyen/'+id).subscribe((response: any) => {
      this.datas.MaVanChuyen=response[0].MaVanChuyen;
      this.datas.TenVanChuyen=response[0].TenVanChuyen;
      this.datas.Gia=response[0].Gia;
      this.btn = "Sửa";
      console.log(this.datas);   
    }, (error) => {
      console.warn(error)
    });
  }


  deleteData(id: number): void {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.http.delete('http://localhost:3000/vanchuyen/xoa/' + id).subscribe((response: any) => {
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
