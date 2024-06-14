import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chitiethoadon',
  templateUrl: './chitiethoadon.component.html',
  styleUrls: ['./chitiethoadon.component.css',
  "../../../assets/admin-ui/css/style.css",
  "../../../assets/admin-ui/css/hoadonban.css",]
})
export class ChitiethoadonComponent {
  id: any
  discouttotal = 0
  allquantity = 0;
  totalPages = 0;
  getsummoney = 0;
  detailbills: any[] = [];
  mota = "";
  btn: string = "Thêm mới";


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getdatabyid(this.id)
    
  }

  getdatabyid(id: any) {
    this.http.get("http://localhost:3000/chitiethdb/" + id).subscribe((response: any) => {
      if (response) {
        this.detailbills = response
        console.log(this.detailbills);

        this.allquantity = this.detailbills.reduce((sum, value) => sum + value.SoLuong, 0);
        this.getsummoney = this.detailbills[0].TongTien

        // switch (this.detailbills[0].LoaiPhieu) {
        //   case "Phần trăm":
        //     this.discouttotal += this.getsummoney * this.detailbills[0].GiaTri / 100;
        //     break;
        //   case "VND":
        //     this.discouttotal += this.detailbills[0].GiaTri;
        //     break
        // }
      }
      console.log(this.detailbills)
    }, (error) => {
      console.error(error);
    })
  }


  update() {
    if (!(this.detailbills[0].TrangThai === 2)) {
      let params = {
        MaHoaDon: this.detailbills[0].MaHoaDon,
        TrangThai: this.detailbills[0].TrangThai += 1
      }
      if(params.TrangThai == 2){
        this.http.get("http://localhost:3000/chitiethdb/"+params.MaHoaDon).subscribe((response: any) => {
        if (response) {
          response.forEach((value:any) => {
            const data = {
              MaChiTietSanPham:value.MaChiTietSanPham,
              SoLuong:value.SoLuong
            }
            this.http.put('http://localhost:3000/chitietsanpham/editquantity', data).subscribe((response: any) => {
                console.log(response);
                
            }, (error) => {
              console.error("Lỗi sửa dữ liệu", error)
            });
          });
        }
        else {
          alert("Duyệt thất bại")
        }
      }, (error) => {
        console.error(error);
      })
      }
      this.http.put("http://localhost:3000/hoadonban/update", params).subscribe((response: any) => {
        if (response) {
          alert("Duyệt thành công")
          // this.router.navigate(['/admin/hoadonban']);
        }
        else {
          alert("Duyệt thất bại")
        }
      }, (error) => {
        console.error(error);
      })
    }

  }

  delete(id: any) {
    if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
      this.http.delete("http://localhost:3000/admin/hoadonban/delete/" + id).subscribe((response: any) => {
        if (response.result) {
          alert(response.message)

        }
        else {
          alert("xóa thất bại")
        }
      }, (error) => {
        console.error(error);
      })
    }
  }

  printPDF(){
    window.print()
  }
}
