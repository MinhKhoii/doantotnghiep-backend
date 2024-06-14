import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartserviceService } from '../myservice/cartservice.service';
import { carts } from '../model/cart';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.css',
  '../../../assets/my-ui/css/chitiet.css',
  '../../../assets/my-ui/css/responsive.css',
  "../../../assets/my-ui/css/style.css"
]
})
export class ChitietComponent {
  data:any;
  id:any;
  loaisp:any;
  kt:any;
  detaildata:any;
  @ViewChild('addQuantityButton') addQuantityButton!: ElementRef;
  @ViewChild('minusQuantityButton') minusQuantityButton!: ElementRef;
  @ViewChild('cartInput') quantityInput!: ElementRef;

  @ViewChild('star1') star1!: ElementRef<HTMLDivElement>;
  @ViewChild('star2') star2!: ElementRef<HTMLDivElement>;
  @ViewChild('star3') star3!: ElementRef<HTMLDivElement>;
  @ViewChild('star4') star4!: ElementRef<HTMLDivElement>;
  @ViewChild('star5') star5!: ElementRef<HTMLDivElement>;

  imageSrc:any;
  toastmsg:any;
  selectedFile: any;

  feedBack1star: any
  feedBack2star: any
  feedBack3star: any
  feedBack4star: any
  feedBack5star: any
  feedBackMediumStar: any

  feedBacks: any[] = []

  feedBack: any = {
    BinhLuan: "",
    SoSao: 0,
    NgayDang: Date.now(),
    HinhAnh: "",
    MaKhachHang: 0,
    MaChiTietSanPham: 0
  }

  detailproducts:any

  users:any[]=[]

  stars: number[] = []

  selectedStars: number = -1;

  activeTabIndex = 0;

  listDetailProductImg: any = []
  selectedImagePath: string = '';
  selectedImageIndex: number = 0;
  checksize:string = ""

  constructor(private http: HttpClient,private route:ActivatedRoute,private cartservice:CartserviceService,private renderer: Renderer2,
    private router: Router,
    private datePiPe: DatePipe,
  ) {}
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      let number = params['status']
      if (number) {
        this.activeTabIndex = number
      }
    })
    this.detailProduct(this.id)

    this.getData();
    this.getData1();
    this.allDetailProduct();
    this.getUsers()
    this.getFeedback(this.id)
  }
  ngAfterViewInit(): void {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.renderer.listen(this.addQuantityButton.nativeElement, 'click', () => {
      let quantity = parseInt(this.quantityInput.nativeElement.value) + 1;
      this.renderer.setProperty(this.quantityInput.nativeElement, 'value', quantity.toString());
    });

    this.renderer.listen(this.minusQuantityButton.nativeElement, 'click', () => {
      let quantity = parseInt(this.quantityInput.nativeElement.value) - 1;
      if (quantity < 1) {
        quantity = 1;
      }
      this.renderer.setProperty(this.quantityInput.nativeElement, 'value', quantity.toString());
    });
  }

  getData(): void {
    this.http.get('http://localhost:3000/chitietsanpham').subscribe((response: any) => {
      this.data = response;
      console.log(this.data)
    }, (error) => {
      console.warn(error)
    });
  }

  getUsers() {
    this.http.get("http://localhost:3000/khachhang").subscribe((response: any) => {
      if (response) {
        this.users = response
      }
      else {
        console.log(response.message);
      }
    }, (error) => {
      console.error(error);

    })
  }
  getStars(star: number): any[] {
    this.stars = Array(star).fill(0).map((x, i) => i);
    return this.stars
  }

  hoverStar(nb: number) {
    let stars = [this.star1, this.star2, this.star3, this.star4, this.star5]
    if (nb <= stars.length) {
      for (let i = nb; i >= 0; i--) {
        stars[i].nativeElement.classList.add('active')
      }
      nb++
      for (let i = nb; i <= stars.length - 1; i++) {
        stars[i].nativeElement.classList.remove('active')
      }
    }
  }

  clickStar(star: any) {
    this.selectedStars = star
    this.feedBack.SoSao = star + 1
    let stars = [this.star1, this.star2, this.star3, this.star4, this.star5]
    for (let i = star; i >= 0; i--) {
      stars[i].nativeElement.classList.add('active')
    }
  }

  newStars() {
    this.feedBack.star = 0
    this.selectedStars = -1
    let stars = [this.star1, this.star2, this.star3, this.star4, this.star5];
    stars.forEach((star) => {
      star.nativeElement.classList.remove('active');
    });
  }

  resetStars() {
    let stars = [this.star1, this.star2, this.star3, this.star4, this.star5];
    stars.forEach((star, index) => {
      if (index <= this.selectedStars) {
        star.nativeElement.classList.add('active');
      } else {
        star.nativeElement.classList.remove('active');
      }
    });
  }

  btnEvaluate() {
    let userid = JSON.parse(localStorage.getItem("customer")!)
    if (this.feedBack.SoSao === 0) {
      alert('vui lòng chọn số sao bạn muốn đánh giá về sản phẩm.')
    }
    else if (this.feedBack.BinhLuan === "") {
      alert('vui lòng nhập thông tin đánh giá về sản phẩm.')
    }
    else if (!userid) {
      alert('vui lòng đăng nhập để đánh giá sản phẩm.')
    }
    else {
      this.feedBack.MaKhachHang = userid.MaKhachHang
      this.feedBack.MaChiTietSanPham = this.id
      const formattedDate = this.datePiPe.transform(new Date(this.feedBack.NgayDang), 'yyyy-MM-dd HH:mm:ss');
      this.feedBack.NgayDang = formattedDate
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('fileanh', this.selectedFile);
        this.http.post("http://localhost:3000/anh/upload", formData).subscribe((response: any) => {          
          let path = response.url;
          this.feedBack.HinhAnh = path;          
          if (path) {
            this.http.post("http://localhost:3000/danhgia/them", this.feedBack).subscribe((response: any) => {
              console.log(response);
              
              if (response) {
                this.newStars()
                this.feedBack.BinhLuan = ""
                this.feedBack.SoSao = 0
                this.feedBack.MaKhachHang = 0
                this.feedBack.MaChiTietSanPham = 0
                this.feedBack.HinhAnh = ""
                this.getFeedback(this.id)
              }
             
            }, (error) => {
              console.error(error);

            })
          }
        }, (error) => {
          console.error(error);
        })
      }
      else {
        
        this.http.post("http://localhost:3000/danhgia/them", this.feedBack).subscribe((response: any) => {
          if (response) {
            this.getFeedback(this.id)
          }
         
        }, (error) => {
          console.error(error);

        })
      }
    }
  }

  getImageCustomerId(id: number): string {
    let img = ""
    const user = this.users.find((item: any) => item.MaKhachHang == id)
    if (user.Anh) {
      img = "http://localhost:3000/" + user.Anh
    } else{
      img = "./assets/admin-ui/img/1.png"
    }

    return img
  }

  getFeedback(id: number) {
    this.http.get("http://localhost:3000/danhgia").subscribe((response: any) => {
      if (response) {

        this.feedBacks = response.filter((data: any) => data.MaChiTietSanPham == id)
        console.log(this.feedBacks);

        this.feedBack1star = this.feedBacks.filter((item: any) =>
          item.SoSao == 1
        ).length
        this.feedBack2star = this.feedBacks.filter((item: any) =>
          item.SoSao == 2
        ).length
        this.feedBack3star = this.feedBacks.filter((item: any) =>
          item.SoSao == 3
        ).length
        this.feedBack4star = this.feedBacks.filter((item: any) =>
          item.SoSao == 4
        ).length
        this.feedBack5star = this.feedBacks.filter((item: any) =>
          item.SoSao == 5
        ).length
        if (this.feedBacks.length == 0) {
          this.feedBackMediumStar = 0
        } else {
          this.feedBackMediumStar = ((this.feedBacks.reduce((sum: number, item: any) => item.SoSao + sum, 0)) / this.feedBacks.length).toFixed(2)
        }
      }
      else {
        console.log(response.message);
      }
    }, (error) => {
      console.error(error);

    })
  }

  upfile(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  addcart(event:Event,item: any) {
    event.preventDefault();
    let quantity = 1;
    if(this.quantityInput){
      var obj: carts = {
        ProductID: item.MaChiTietSanPham,
        ProductName: item.TenSanPham,
        ProductPrice: item.GiaBan,
        ProductPath: item.HinhAnh[0],
        ProductSize:item.TenKichThuoc,
        Quantity: Number(this.quantityInput.nativeElement.value),
        UserID: 1
      }
    }
    else{
      var obj: carts = {
        ProductID: item.MaChiTietSanPham,
        ProductName: item.TenSanPham,
        ProductPrice: item.GiaBan,
        ProductPath: item.HinhAnh[0],
        ProductSize:item.TenKichThuoc,
        Quantity: quantity,
        UserID: 1
      }
    }

    this.cartservice.addToCart(obj);
    alert("Thêm giỏ hàng thành công.")
  }

  detailProduct(id:number): void {
    this.http.get('http://localhost:3000/chitietsanpham/'+id).subscribe((response: any) => {
      this.detaildata = response;
    }, (error) => {
      console.warn(error)
    });
  }

  allDetailProduct(): void {
    this.http.get('http://localhost:3000/chitietsanpham').subscribe((response: any) => {
      this.detailproducts = response;
      const getsizes = this.detailproducts.filter((x:any)=>x.MaSanPham == this.detaildata[0].MaSanPham)
      this.kt = getsizes;
      this.checksize = this.kt[0].TenKichThuoc
      console.log(this.kt);
    }, (error) => {
      console.warn(error)
    });
  }

  changesize(item:any){
    this.checksize = item.TenKichThuoc
    this.detaildata[0].GiaBan = item.GiaBan
  }

  getData1(): void {
    this.http.get('http://localhost:3000/loaisp').subscribe((response: any) => {
      this.loaisp = response;
      console.log(this.loaisp)
    }, (error) => {
      console.warn(error)
    });
  }

  activateTab(event: any, nb: number) {
    event.preventDefault()
    this.activeTabIndex = nb
    const urlWithParams = this.router.createUrlTree([], { queryParams: { status: nb } }).toString();
    this.router.navigateByUrl(urlWithParams);
  }

  checkk(event: any) {
    event.preventDefault(); // Ngăn chặn việc tải lại trang
    alert("Chức năng này sẽ sớm hoàn thiện trên website. Cảm ơn bạn!");
}
}
