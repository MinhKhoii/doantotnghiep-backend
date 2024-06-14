import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CheckinvalidService } from '../myservice/checkinvalid.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.css',
    "../../../assets/my-ui/css/login.scss"

  ]
})
export class DangnhapComponent {
  user = {
    email: "",
    password: "",
    name: "",
    phone: "",
    address: ""
  }

  user_registration = {
    email: "",
    password: "",
    name: "",
    phone: "",
    address: ""
  }

  message_resgistration = {
    email: "",
    password: "",
    name: "",
    phone: "",
    address: ""
  }

  message = {
    email: "",
    password: "",
  }

  customer: any;
  isEmailInvalid = false
  isPasswordInvalid = false
  isEmailResgisInvalid = false
  isPasswordResgisInvalid = false
  isNameInvalid = false
  isPhoneInvalid = false
  isAddressInvalid = false
  constructor(
    private el: ElementRef,
    private router: Router,
    private renderer: Renderer2,
    private valid: CheckinvalidService,
    private http: HttpClient) { }

  ngAfterViewInit() {
    let element = document.querySelector('.img__btn');
    if (element) {
      element.addEventListener('click', function () {
        let item = document.querySelector('.cont');
        if (item) {
          item.classList.toggle('s--signup');
        }

      });
    }

  }

  onInputEmail() {
    this.isEmailInvalid = false
  }
  onInputPassWord() {
    this.isPasswordInvalid = false
  }
  onInputRegisEmail() {
    this.isEmailResgisInvalid = false
  }
  onInputRegisPassWord() {
    this.isPasswordResgisInvalid = false
  }
  onInputName() {
    this.isNameInvalid = false
  }
  onInputPhonenumber() {
    this.isPhoneInvalid = false
  }
  onInputAddressnumber() {
    this.isAddressInvalid = false
  }

  onSubmit() {
    console.log(this.user.email.length);
    if (!this.user.email.length) {
      this.isEmailInvalid = true;
      this.message.email = "Thông tin tài khoản không được để trống"
    } else if (!this.valid.isValidEmail(this.user.email)) {
      this.isEmailInvalid = true;
      this.message.email = "Không đúng định dạng email"
    } else {
      this.isEmailInvalid = false;
    }


    if (this.user.password.length <= 0) {
      this.isPasswordInvalid = true;
      this.message.password = "Thông tin mật khẩu không được để trống"
    } else if (this.valid.isValidLength(this.user.password, 8)) {
      this.isPasswordInvalid = true;
      this.message.password = "Chỉ có thể nhập tối đa 8 ký tự"
    }
    else {
      this.isPasswordInvalid = false;
    }

    if (!this.isEmailInvalid && !this.isPasswordInvalid) {
      let params = {
        Email: this.user.email,
        PassWord: this.user.password
      }
      this.http.post("http://localhost:3000/khachhang/login", params).subscribe((response: any) => {
        console.log(response);
        if (response.result) {
          
          const data = localStorage.getItem("customer")
          const datauser = data ? JSON.parse(data) : false
          if (datauser == false) {
            const user = {
              MaKhachHang: response.data[0].MaKhachHang,
              HoVaTen: response.data[0].HoVaTen,
              DiaChi: response.data[0].DiaChi,
              SoDienThoai: response.data[0].SoDienThoai,
              Email: response.data[0].Email,
              Anh: response.data[0].Anh,
              PassWord: response.data[0].PassWord
            }
            localStorage.setItem("customer", JSON.stringify(user))
            alert("Đăng nhập thành công")
            this.router.navigate(["/"])
          }
          else {
            alert("Đăng nhập thành công")
            this.router.navigate(["/"])
          }

        }
        else {
          console.log(123);

          this.isPasswordInvalid = true
          this.message.password = "Tài khoản hoặc mật khẩu không chính xác"
        }


      }, (error) => {
        console.error(error);
      })
    }
  }

  onSubmitRegistration() {
    if (!this.user_registration.email.length) {
      this.isEmailResgisInvalid = true;
      this.message_resgistration.email = "Thông tin tài khoản không được để trống"
    } else if (!this.valid.isValidEmail(this.user_registration.email)) {
      this.isEmailResgisInvalid = true;
      this.message_resgistration.email = "Không đúng định dạng email"
    } else {
      this.isEmailResgisInvalid = false;
    }


    if (!this.user_registration.password.length) {
      this.isPasswordResgisInvalid = true;
      this.message_resgistration.password = "Thông tin mật khẩu không được để trống"
    } else if (this.valid.isValidLength(this.user.password, 8)) {
      this.isPasswordResgisInvalid = true;
      this.message_resgistration.password = "Chỉ có thể nhập tối đa 8 ký tự"
    }
    else {
      this.isPasswordResgisInvalid = false;
    }

    if (!this.user.name.length) {
      this.isNameInvalid = true;
      this.message_resgistration.name = "Thông tin họ tên không được để trống"
    } else if (this.valid.isValidLength(this.user.name, 100)) {
      this.isNameInvalid = true;
      this.message_resgistration.name = "Chỉ có thể nhập tối đa 100 ký tự"
    }
    else {
      this.isNameInvalid = false;
    }

    if (!this.user.address.length) {
      this.isAddressInvalid = true;
      this.message_resgistration.address = "Thông tin địa chỉ không được để trống"
    } else if (this.valid.isValidLength(this.user.address, 200)) {
      this.isAddressInvalid = true;
      this.message_resgistration.address = "Chỉ có thể nhập tối đa 100 ký tự"
    }
    else {
      this.isAddressInvalid = false;
    }

    if (!this.user.phone.length) {
      this.isPhoneInvalid = true;
      this.message_resgistration.phone = "Thông tin số điện thoại không được để trống"
    } else if (this.valid.isValidPhoneNumber(this.user.phone)) {
      this.isPhoneInvalid = true;
      this.message_resgistration.phone = "Chỉ có thể nhập tối đa 10 số"
    }
    else {
      this.isPhoneInvalid = false;
    }

    if (!this.isEmailResgisInvalid && !this.isPasswordResgisInvalid && !this.isAddressInvalid && !this.isNameInvalid && !this.isPhoneInvalid) {
      let params = {
        Email: this.user_registration.email,
        PassWord: this.user_registration.password,
        SoDienThoai: this.user.phone,
        DiaChi: this.user.address,
        Anh: "",
        HoVaTen: this.user.name
      }
      console.log(params);

      this.http.post("http://localhost:3000/khachhang/them", params).subscribe((response: any) => {
        if (response) {
          this.customer = response
          console.log(response);
          alert("Thêm thành công")
          window.location.reload()
        }
        else {
          console.log(response);
          alert("Thêm thất bại")
        }

      }, (error) => {
        console.error(error);
      })

    }
  }

}
