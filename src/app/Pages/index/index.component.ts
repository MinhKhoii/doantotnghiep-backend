import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css',
  '../../../assets/my-ui/css/index.css',
  '../../../assets/my-ui/css/responsive.css',
  "../../../assets/my-ui/css/style.css"
]
})
export class IndexComponent {
  data:any;
  loaisp:any;
  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getData();
    this.getData1();
  }

  getData(): void {
    this.http.get('http://localhost:3000/chitietsanpham').subscribe((response: any) => {
      console.log(response);
      
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


}
