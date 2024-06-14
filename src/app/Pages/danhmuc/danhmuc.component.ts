import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.css',
  "../../../assets/my-ui/css/danhmuc.css",
  "../../../assets/my-ui/css/responsive.css",
  "../../../assets/my-ui/css/style.css"
]
})
export class DanhmucComponent {
  p: number = 1;
  id:any;
  data:any;
  loaisp:any;
  datas:any;
  lsp: any;
  constructor(private http: HttpClient,private router:ActivatedRoute) {}
  ngOnInit(){
    this.id = this.router.snapshot.paramMap.get('id');
    
    this.getData();
    this.getData1();
    this.categoryProduct(this.id);
  }

  getData(): void {
    this.http.get('http://localhost:3000/chitietsanpham').subscribe((response: any) => {
      this.data = response;
      console.log(this.data)
    }, (error) => {
      console.warn(error)
    });
  }

  getData1(): void {
    this.http.get('http://localhost:3000/loaisp').subscribe((response: any) => {
      this.loaisp = response;
      console.log(this.loaisp)
    }, (error) => {
      console.warn(error)
    });
  }
  categoryProduct(id:number): void {
    this.http.get('http://localhost:3000/loaisp/'+id).subscribe((response: any) => {
      this.datas = response;
      console.log(this.datas)
    }, (error) => {
      console.warn(error)
    });
  }
}
