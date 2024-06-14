import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css',
  '../../../assets/my-ui/css/responsive.css',
  "../../../assets/my-ui/css/style.css"
  ]
})
export class UserLayoutComponent {
  customer:any
  constructor(private router:Router){
    const user = JSON.parse(localStorage.getItem('customer')!)
    if(user){
      this.customer = user
    }
  }
  searchkey:any

  search(){
    if(this.searchkey.length===0){
      alert("Nhập thông tin tìm kiếm")
    }else{
      const queryParams: NavigationExtras = {
        queryParams: { query: this.searchkey },
        replaceUrl: true
      };
      this.searchkey = ""
      this.router.navigate(['/danhmuc'],queryParams)
    }
  }
  logout(){
    localStorage.removeItem('customer')
    this.router.navigate(['/login'])
  }

  checkk(){
    alert("Chức năng này sẽ sớm hoàn thiện trên website. Cảm ơn bạn!")
  }

}
