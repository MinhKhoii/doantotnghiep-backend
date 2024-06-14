import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-anh',
  templateUrl: './anh.component.html',
  styleUrls: [
    "../../..//assets/admin-ui/css/responsive.css",
    "../../../assets/admin-ui/css/style.css",
    "../../../assets/admin-ui/css/hoadonban.css",
    './anh.component.css']
})
export class AnhComponent {
  btn = "Thêm mới"
  data: any;
  selectedFile: any;
  imageSrc: any;
  mau: any;
  ct:any;
  p: number = 1;
  datas: any = {
    "MaAnh": 0,
    "DuongDan": "",
    "MaChiTietSanPham":"",
    "MaMau": 0,
  };


  constructor(private http: HttpClient) { }

  getData(): void {
    this.http.get('http://localhost:3000/anh').subscribe((response: any) => {
      this.data = response;
      console.log(this.data)
    }, (error) => {
      console.warn(error)
    });
  }

  getData1(): void {
    this.http.get('http://localhost:3000/mau').subscribe((response: any) => {
      this.mau = response;
      console.log(this.mau)
    }, (error) => {
      console.warn(error)
    });
  }

  getData2(): void {
    this.http.get('http://localhost:3000/chitietsanpham').subscribe((response: any) => {
      this.ct = response;
      console.log(this.ct)
    }, (error) => {
      console.warn(error)
    });
  }
  

  loadnew() {
    this.datas.MaAnh = ""
    this.datas.DuongDan = ""
    this.datas.MaChiTietSanPham,
    this.datas.MaSanPham,
    this.datas.MaMau = ""
    this.btn = "Thêm mới"
  }

  addData(): void {
    if (this.btn === "Thêm mới") {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('fileanh', this.selectedFile);
        console.log(this.datas);
        this.http.post("http://localhost:3000/anh/upload", formData).subscribe((response: any) => {
          let path = response.url;

          this.datas.DuongDan = path;
    
          console.log(this.datas);

          if (path) {
            this.http.post('http://localhost:3000/anh/them', this.datas).subscribe((response: any) => {
              this.getData();
              this.getData2();
              this.loadnew();
              alert("Thêm thành công")
            }, (error) => {
              console.warn(error)
            });
          }
        }, (error) => {
          console.error(error);
        })
      }

    }
    if (this.btn === "Sửa") {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('fileanh', this.selectedFile);
        console.log(formData);

        this.http.post("http://localhost:3000/anh/upload", formData).subscribe((response: any) => {
          let path = response.url;

          this.datas.DuongDan = path;
          console.log(this.datas);

          if (path) {
            this.http.put('http://localhost:3000/anh/edit', this.datas).subscribe((response: any) => {
              this.getData();
              this.getData2();
              this.loadnew();
              alert("Thêm thành công")
            }, (error) => {
              console.warn(error)
            });
          }
        }, (error) => {
          console.error(error);
        })
      }

    }
  }

  upfile(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result;
        console.log(this.imageSrc)
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      console.log(formData);

      this.http.post("http://localhost:3000/anh/upload", formData).subscribe((response: any) => {
        console.log(response);

        let path = response.url;

        console.log(response.url)
        this.imageSrc = "http://localhost:3000/" + path;
      }, (error) => {
        console.error(error);
      })
    }
  }

  edit(id: number) {
    this.http.get('http://localhost:3000/anh/' + id).subscribe((response: any) => {
      this.datas.MaMau = response[0].MaMau
      this.datas.MaAnh = response[0].MaAnh;
      this.datas.DuongDan = response[0].DuongDan;
      this.imageSrc =  "http://localhost:3000/" + response[0].DuongDan
      this.datas.MaChiTietSanPham = response[0].MaChiTietSanPham;
      this.btn = "Sửa";
      console.log(this.datas)
    }, (error) => {
      console.warn(error)
    });
  }

  deleteData(id: number): void {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.http.delete('http://localhost:3000/anh/xoa/' + id).subscribe((response: any) => {
        alert("Xóa thành công")
        this.getData();
        this.getData2();
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
    this.getData1();
    this.getData2();

  }
}

