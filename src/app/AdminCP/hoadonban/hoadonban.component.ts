import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-hoadonban',
  templateUrl: './hoadonban.component.html',
  styleUrls: ['./hoadonban.component.css',
  "../../..//assets/admin-ui/css/responsive.css",
  "../../../assets/admin-ui/css/style.css",
  "../../../assets/admin-ui/css/hoadonban.css",]
})
export class HoadonbanComponent {
  btn="Thêm mới";
  data: any;
  kh: any;
  st = 0;
  datas = {
    "Mahoadonban": 0,
    "MaHoaDon": "",
    "MaKhachHang": 0,
    "NgayTao": 0,
    "TrangThai": 1,
    "DiaChiNhan": "",
    "SoDienThoai": "",
    "HinhThucThanhToan": "",
    "TongTien": "",
  };
  status:any
  filterobj = {
    "searchkeyword": "",
    "pagenumber": 1,
    "itemsperpage": 5,
    
    "status":0
  }

  savedata:any
  searchTerm = ""
  filteredData = [];
  p: number = 1;

  constructor(private http: HttpClient,
      private router:Router
    ) {}

  getData(): void {
    this.http.get('http://localhost:3000/hoadonban').subscribe((response: any) => {
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
        item.NguoiNhan.toLowerCase().includes(searchString.toLowerCase()) || 
        item.DiaChiNhan.toLowerCase().includes(searchString.toLowerCase())
      );  
      this.data = this.filteredData    
    } else {
      this.data = this.savedata;
    }
  }

  getData1(): void {
    this.http.get('http://localhost:3000/khachhang').subscribe((response: any) => {
      this.kh = response;
      console.log(this.kh)
    }, (error) => {
      console.warn(error)
    });
  }


  loadnew(){
    this.datas.MaHoaDon=""
    this.datas.MaKhachHang=0
    this.datas.NgayTao=0
    this.datas.TrangThai=1
    this.datas.DiaChiNhan=""
    this.datas.SoDienThoai=""
    this.datas.HinhThucThanhToan=""
    this.datas.TongTien=""
    this.btn="Thêm mới"
  }

  addData(): void {
    if(this.btn==="Thêm mới"){
      this.http.post('http://localhost:3000/hoadonban/them', this.datas).subscribe((response: any) => {
        alert("Thêm thành công")
        this.getData();
        this.getData1();
        this.loadnew();
      }, (error) => {
        console.warn("Lỗi",error)
      });
    }
    if(this.btn==="Sửa"){
      this.http.put('http://localhost:3000/hoadonban/edit',this.datas).subscribe((response: any) => {
        this.loadnew();
        this.getData();
        this.getData1();
        alert("Sửa thành công")
      }, (error) => {
        console.error("Lỗi sửa dữ liệu", error)
      });
    }
  }
  
  edit(id:number){
    // this.http.get('http://localhost:3000/hoadonban/'+id).subscribe((response: any) => {
    //   this.datas.Mahoadonban=response[0].Mahoadonban;
    //   this.datas.MaKhachHang=response[0].MaKhachHang;
    //   this.datas.MaHoaDon=response[0].MaHoaDon;
    //   this.datas.NgayTao=response[0].NgayTao;
    //   this.datas.DiaChiNhan=response[0].DiaChiNhan;
    //   this.datas.TrangThai=response[0].TrangThai;
    //   this.btn = "Sửa";
    //   console.log(this.datas);   
    // }, (error) => {
    //   console.warn("Lỗi",error)
    // });
    this.router.navigate(['/admin/chitiethoadon/'+id])
    
  }

  deleteData(id: number): void {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.http.delete('http://localhost:3000/hoadonban/xoa/' + id).subscribe((response: any) => {
        alert("Xóa thành công")
        this.getData();
      }, (error) => {
        console.error("Lỗi xóa dữ liệu", error)
      });
    }
  }

  changene(){
    this.status = this.st
    this.http.get("http://localhost:3000/hoadonban/trangthai/" + this.status).subscribe((response: any) => {
      if (response) {   
          this.data = response
      }
    }, (error) => {
      console.error(error);
    })
  
  }
  
  ngOnInit(): void {
    this.changene();
    this.getData1();
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

