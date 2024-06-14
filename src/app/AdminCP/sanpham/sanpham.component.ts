import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css',
  "../../..//assets/admin-ui/css/responsive.css",
    "../../../assets/admin-ui/css/style.css",
    "../../../assets/admin-ui/css/hoadonban.css"
]
})
export class SanphamComponent {
  btn="Thêm mới";
  data: any;
  sploai: any;
  hang:any;
  datas = {
    "MaSanPham": 0,
    "TenSanPham": "",
    "MaLoai": 0,
    "MaHang": 0,
    "LuotXem": 0,
    "TrangThai": 1,
    "ChiTiet": "",
    "MoTaNgan": " ",
    "MoTa": " ",
  };
  savedata:any
  searchTerm = ""
  filteredData = [];

  p: number = 1;

  constructor(private http: HttpClient) {}

  getData(): void {
    this.http.get('http://localhost:3000/sanpham').subscribe((response: any) => {
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
        item.TenSanPham.toLowerCase().includes(searchString.toLowerCase()) || 
        item.MoTa.toLowerCase().includes(searchString.toLowerCase())
      );  
      this.data = this.filteredData    
    } else {
      this.data = this.savedata;
    }
  }

  getData1(): void {
    this.http.get('http://localhost:3000/loaisp').subscribe((response: any) => {
      this.sploai = response;
      console.log(this.sploai)
    }, (error) => {
      console.warn(error)
    });
  }

  getData2(): void {
    this.http.get('http://localhost:3000/hang').subscribe((response: any) => {
      this.hang = response;
      console.log(this.hang)
    }, (error) => {
      console.warn(error)
    });
  }
  loadnew(){
    this.datas.TenSanPham=""
    this.datas.MaLoai=0
    this.datas.MaHang=0
    this.datas.TrangThai=1
    this.datas.ChiTiet=""
    this.datas.MoTaNgan=""
    this.datas.MoTa=" "
    this.btn="Thêm mới"
  }

  addData(): void {
    if(this.btn==="Thêm mới"){
      this.http.post('http://localhost:3000/sanpham/them', this.datas).subscribe((response: any) => {
        alert("Thêm thành công")
        this.loadnew();
        this.getData();
        this.getData1();
        this.getData2();
      }, (error) => {
        console.warn("Lỗi",error)
      });
    }
    if(this.btn==="Sửa"){
      this.http.put('http://localhost:3000/sanpham/edit',this.datas).subscribe((response: any) => {
        this.loadnew();
        this.getData();
        this.getData1();
        this.getData2();
        alert("Sửa thành công")
      }, (error) => {
        console.error("Lỗi sửa dữ liệu", error)
      });
    }
  }
  
  edit(id:number){
    this.http.get('http://localhost:3000/sanpham/'+id).subscribe((response: any) => {
      this.datas.MaSanPham=response[0].MaSanPham;
      this.datas.MaLoai=response[0].MaLoai;
      this.datas.TenSanPham=response[0].TenSanPham;
      this.datas.MaHang=response[0].MaHang;
      this.datas.ChiTiet=response[0].ChiTiet;
      this.datas.TrangThai=response[0].TrangThai;
      this.datas.MoTaNgan=response[0].MoTaNgan
      this.datas.MoTa=response[0].MoTa;
      this.btn = "Sửa";
      console.log(this.datas);   
    }, (error) => {
      console.warn("Lỗi",error)
    });
  }

  deleteData(id: number): void {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.http.delete('http://localhost:3000/sanpham/xoa/' + id).subscribe((response: any) => {
        alert("Xóa thành công")
        this.getData();
      }, (error) => {
        console.error("Lỗi xóa dữ liệu", error)
      });
    }
  }

  
  ngOnInit(): void {
    this.getData();
    this.getData1();
    this.getData2();
  }
  

  editorConfig:AngularEditorConfig = {
    editable: true, // Cho phép hoặc không cho phép chỉnh sửa
    spellcheck: true, // Kiểm tra chính tả
    height: '100px', // Chiều cao của trình soạn thảo
    minHeight: '0', // Chiều cao tối thiểu
    maxHeight: 'auto', // Chiều cao tối đa
    width: 'auto', // Chiều rộng của trình soạn thảo
    minWidth: '0', // Chiều rộng tối thiểu
    translate: 'yes', // Dịch văn bản
    enableToolbar: true, // Cho phép thanh công cụ
    showToolbar: true, // Hiển thị thanh công cụ
    placeholder: 'Nhập mô tả', // Placeholder của trình soạn thảo
    defaultParagraphSeparator: 'p', // Thẻ HTML sẽ được sử dụng cho các đoạn văn bản mới
    defaultFontName: 'Arial', // Phông chữ mặc định
    defaultFontSize: '3', // Kích thước chữ mặc định
    fonts: [{ class: 'arial', name: 'Arial' }], // Danh sách các phông chữ
    customClasses: [
        // Danh sách các lớp tùy chỉnh
        {
            name: 'quote',
            class: 'quote',
        },
        {
            name: 'redText',
            class: 'red-text',
        },
        {
            name: 'titleText',
            class: 'title-text',
            tag: 'h1', // Thẻ HTML cho lớp này
        },
    ],
    sanitize: true, // Loại bỏ HTML không an toàn
    toolbarPosition: 'top', // Vị trí thanh công cụ ('top' hoặc 'bottom')
    toolbarHiddenButtons: [
        ['bold', 'italic', 'underline'], // Các nút thanh công cụ bị ẩn
        ['subscript', 'superscript'],
    ],
};
}
