var app = angular.module("AppBanHang",[])
app.controller("myctrl",function($scope,$http){
    $scope.txtbutton = 'Thêm mới';

    $scope.url = $scope.current_url;

    $scope.imageSrc;
    $scope.userid;
    $scope.hoten;
    $scope.quyen;
    $scope.username;
    $scope.password;
    $scope.ngaytao;
    $scope.dienthoai;
    $scope.email;
    $scope.diachi;
    $scope.trangthai;

    $scope.urlimgerr = 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'

    $scope.user = {}

    $scope.loadNew = function(){
        $scope.imageSrc = '';
        $scope.userid = '';
        $scope.hoten = '';
        $scope.quyen = '';
        $scope.username = '';
        $scope.password = '';
        $scope.ngaytao = '';
        $scope.dienthoai = '';
        $scope.email = '';
        $scope.diachi = '';
        $scope.trangthai = '';
        document.getElementById('file').value = '';
        document.getElementById('show-img-file').src = '';
        $scope.selectedFile = null;
        $scope.txtbutton = 'Thêm mới';
    }

    $scope.edit = function(){
        var date = new Date($scope.ngaytao);
        date.setUTCHours(date.getUTCHours() + 7);
        var formattedDate = date.toISOString().slice(0, -8);

        $scope.user.MaNguoiDung = $scope.userid
        $scope.user.UserName = $scope.username
        $scope.user.PassWord = $scope.password
        $scope.user.NgayTao = formattedDate
        $scope.user.HoTen = $scope.hoten
        $scope.user.DienThoai = $scope.dienthoai
        $scope.user.Email = $scope.email
        $scope.user.DiaChi = $scope.diachi
        $scope.user.TrangThai = Number($scope.trangthai)
        $scope.user.MaQuyen = $scope.quyen

        var file = document.getElementById("file").files[0];   
        if(file){
            var formData = new FormData();
            formData.append('file', file);
            $http.post('http://localhost:3000/upload', formData, {
                headers: {
                'Content-Type': undefined
                },
                transformRequest: angular.identity
            }).then(function(response) {
                $scope.user.Anh = current_url + "\\" + response.data.url;
                $scope.imageSrc = current_url + "\\" + response.data.url;
                console.log('File uploaded successfully:', response.data.url);

                if($scope.txtbutton === 'Thêm mới'){
                    $http({
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url:current_url+'/api/user/create',
                        data:  $scope.user
                    }).then(function(response){
                        if(response.data.results){
                            alert(response.data.message)
                        }else{
                            alert("Thêm thất bại")
                        }
                        $scope.loadNew()
                        $scope.loadUser();
                    })
                }
                else{      
                    console.log($scope.user)                
                    $http({
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url:current_url+'/api/user/update',
                        data:  $scope.user
                    }).then(function(response){
                        if(response.data.results){
                            alert(response.data.message)
                        }else{
                            alert("Sửa thất bại")
                        }
                        $scope.loadUser();
                        $scope.loadNew();
                    })
                }
            }).catch(function(error) {
                console.error('Error uploading file:', error);
            });
        }
    }

    $scope.delete = function(id){
        var check = confirm('Bạn có chắc muốn xóa thông tin này không?');
        if(check){
            $http({
                method: 'POST',
                url:current_url+'/api/user/delete/'+id
            }).then(function(response){
                alert('Xóa thành công')
                $scope.loadUser();
            }).catch(function(err){
                alert(err)
            })
        }
    }

    $scope.invalue = function(id){
        $http({
            method: 'GET',
            url:current_url+'/api/user/getbyid/'+id
        }).then(function(response){
            $scope.imageSrc = response.data.Anh;
            $scope.userid = response.data.MaNguoiDung;
            $scope.hoten = response.data.HoTen;
            $scope.quyen = response.data.MaQuyen;
            $scope.username = response.data.UserName;
            $scope.password = response.data.PassWord;
            $scope.ngaytao = response.data.NgayTao;
            $scope.dienthoai = response.data.DienThoai;
            $scope.email = response.data.Email;
            $scope.diachi = response.data.DiaChi;
            $scope.trangthai = String(response.data.TrangThai.data[0]);
            $scope.txtbutton = 'Sửa';
        })
    }

    $scope.loadUser = function(){
        $http({
            method: 'GET', 
            url:current_url+'/api/user/get-all',
        }).then(function (response) {
            $scope.listuser = response.data;  
            console.log($scope.listuser)
        }).catch(function(err){
        })
    }

    $scope.loadRole = function(){
        $http({
            method: 'GET', 
            url:current_url+'/api/user/get-all-role',
        }).then(function (response) {
            $scope.listrole = response.data;  
            console.log($scope.listrole)
        }).catch(function(err){
        })
    }
    
    var fileInput = document.getElementById('file');
    fileInput.addEventListener('change', function(event) {
        var file = event.target.files[0]; // Lấy tệp đã chọn
        var fileReader = new FileReader();

        fileReader.onload = function(e) {
            $scope.$apply(function() {
                $scope.imageSrc = e.target.result; // Gán giá trị của URL tệp đã chọn vào thuộc tính imageSrc
            });
        };

        fileReader.readAsDataURL(file);
    });
    
    $scope.loadRole();
    $scope.loadUser();

})