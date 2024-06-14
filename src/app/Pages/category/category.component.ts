import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css',
    "../../../assets/my-ui/css/danhmuc.css",
    "../../../assets/my-ui/css/responsive.css",
    "../../../assets/my-ui/css/style.css"]
})
export class CategoryComponent {
  p: number = 1;
  id: any;
  data: any;
  loaisp: any;
  searchkey: string = ""
  datas: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,) { }
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.searchkey = params['query'];
      
      const currentURL = this.router.url;
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.searchkey) {
        this.getData();
      }
      if (currentURL === '/danhmuc') {        
        this.getData()
      }

      if (this.id) {
        this.categoryProduct(this.id);
      }

    });

    this.getData1();

  }

  getData(): void {
    this.http.get('http://localhost:3000/chitietsanpham').subscribe((response: any) => {
      if (response.length > 0) {
        if (this.searchkey === undefined) {
          this.data = response
          this.datas = response
          
        } else {
          const data = response.filter((x: any) =>
            x.TenSanPham.toLowerCase().includes(this.searchkey.toLowerCase())
            || x.GiaBan.toString().includes(this.searchkey.toLowerCase()))
          this.data = data;      
          this.datas = data    
        }
      }
    }, (error) => {
      console.warn(error)
    });
  }

  changeprice(event:any,price:any,max?:any){
    event.preventDefault()
    if(max){
      const data = this.datas.filter((x:any)=>x.GiaBan>=price && x.GiaBan<=max)
      this.data = data
    }else if(price == 1000000){
      const data = this.datas.filter((x:any)=>x.GiaBan<=price)
      this.data = data
    }else if(price == 5000000){
      const data = this.datas.filter((x:any)=>x.GiaBan>=price)
      this.data = data
    }
  }

  getData1(): void {
    this.http.get('http://localhost:3000/loaisp').subscribe((response: any) => {
      this.loaisp = response;
      console.log(this.loaisp)
    }, (error) => {
      console.warn(error)
    });
  }

  categoryProduct(id: number): void {
    this.http.get('http://localhost:3000/chitietsanpham').subscribe((response: any) => {
      if (response.length > 0) {
        const data = response.filter((x: any) => x.MaLoai === Number(id))
        this.data = data;
        this.datas = data
      }
    }, (error) => {
      console.warn(error)
    });


  }
}
