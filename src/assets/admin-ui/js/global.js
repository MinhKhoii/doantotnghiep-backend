var current_url = 'http://localhost:3000';
var user = JSON.parse(localStorage.getItem('user')) || []

var getname = document.querySelectorAll('.name_user')
var img = document.querySelectorAll('.img_user')
var email = document.querySelector('.mail_user')

function loaduser(){
    if(user){
        img.forEach((element) => {
            element.src = user.anh
        })

        getname.forEach((element) => {
            element.innerText = user.hoten
        })

        email.innerText = user.email
    }
}

loaduser()