var app = angular.module("AppBanHang",[])
app.controller("myctrl",function($scope,$http){
    $scope.txtbutton = 'Thêm mới';

    $scope.url = $scope.current_url;

    $scope.imageSrc;
    $scope.productid;
    $scope.productname;
    $scope.category;
    $scope.price;
    $scope.description;
    $scope.productdetail;
    $scope.brand;

    $scope.urlimgerr = 'https://developer.android.com/static/codelabs/basic-android-kotlin-training-internet-images/img/467c213c859e1904.png?hl=vi'

    $scope.product = {}

    $scope.loadNew = function(){
        $scope.imageSrc = '';
        $scope.productname = '';
        $scope.category = '';
        $scope.price = '';
        $scope.description = '';
        $scope.productdetail = '';
        $scope.brand = '',
        document.getElementById('file').value = '';
        document.getElementById('show-img-file').src = '';
        $scope.selectedFile = null;
        $scope.txtbutton = 'Thêm mới';
    }

    $scope.editproduct = function(){
        if($scope.txtbutton === 'Thêm mới'){
            $scope.product.TenSanPham = $scope.productname
            $scope.product.MaLoai = Number($scope.category)
            $scope.product.MaHang = Number($scope.brand)
            $scope.product.GiaBan = $scope.price
            $scope.product.MoTa = $scope.description
            $scope.product.ChiTietSanPham = $scope.productdetail  
            $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url:current_url+'/api/san-pham/create',
                data:  $scope.product
            }).then(function(response){
                if(response.data.results){
                    alert(response.data.message)
                }else{
                    alert("Thêm thất bại")
                }
                $scope.loadProduct();
                $scope.loadNew();
            })
        }

        else if($scope.txtbutton === "Sửa"){
            $scope.product.MaSanPham = $scope.productid;
            $scope.product.TenSanPham = $scope.productname
            $scope.product.MaLoai = Number($scope.category)
            $scope.product.MaHang = Number($scope.brand)
            $scope.product.GiaBan = $scope.price
            $scope.product.MoTa = $scope.description
            $scope.product.ChiTietSanPham = $scope.productdetail
            
            $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url:current_url+'/api/san-pham/update',
                data:  $scope.product
            }).then(function(response){
                if(response.data.results){
                    alert(response.data.message)
                }else{
                    alert("Thêm thất bại")
                }
                $scope.loadProduct();
                $scope.loadNew();
            })
        }

        console.log($scope.product)
    }

    $scope.deleteProduct = function(id){
        var check = confirm('Bạn có chắc muốn xóa sản phẩm này không?');
        if(check){
            $http({
                method: 'POST',
                url:current_url+'/api/san-pham/delete/'+id
            }).then(function(response){
                alert('Xóa thành công')
                $scope.loadProduct();
            }).catch(function(err){
                alert(err)
            })
        }
    }

    $scope.deleteImg= function(id){
        var check = confirm('Bạn có chắc muốn xóa ảnh này không?');
        if(check){
            $http({
                method: 'POST',
                url:current_url+'/api/san-pham/deleteimg/'+id
            }).then(function(response){
                alert('Xóa thành công')
                $scope.listImgByid($scope.masp);
            }).catch(function(err){
                alert(err)
            })
        }
    }

    $scope.edit = function(id){
        $http({
            method: 'GET',
            url:current_url+'/api/san-pham/getbyid/'+id
        }).then(function(response){
            $scope.productid = response.data.MaSanPham;
            $scope.productname = response.data.TenSanPham;
            $scope.category = response.data.MaLoai;
            $scope.price = response.data.GiaBan;
            $scope.description = response.data.MoTa;
            $scope.productdetail = response.data.ChiTietSanPham;
            $scope.brand = response.data.MaHang;
            $scope.txtbutton = 'Sửa';
        })
    }

    $scope.loadProduct = function(){
        $http({
            method: 'GET', 
            url:current_url+'/api/san-pham/get-all',
        }).then(function (response) {
            $scope.listpro = response.data;  
            console.log($scope.listpro)
        }).catch(function(err){
        })
    }
    $scope.listimg = []
    $scope.loadImgById = function(id,index){
        $http({
            method: 'GET', 
            url:current_url+'/api/san-pham/getimgbyid/'+id,
        }).then(function (response) {
            $scope.listimg[index] = response.data;    			         
        })
    }

   $scope.showimg = function(id){
        document.querySelector('.showSettingImg').style.display = "block";
        $scope.masp = id;
        $scope.listImgByid(id);
    }

    $scope.editimg = function(){
        $scope.hinhanh = {}
            $scope.hinhanh.MaMau = Number($scope.mausac);
            $scope.hinhanh.MaSanPham = $scope.masp;
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
                    $scope.hinhanh.DuongDan = current_url + "\\" + response.data.url;
                    $scope.imageSrc = current_url + "\\" + response.data.url;
                    console.log('File uploaded successfully:', response.data.url);

                    if($scope.txtbutton === 'Thêm mới'){
                        $http({
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            url:current_url+'/api/san-pham/createimg',
                            data:  $scope.hinhanh
                        }).then(function(response){
                            if(response.data.results){
                                alert(response.data.message)
                            }else{
                                alert("Thêm thất bại")
                            }
                            $scope.mausac = '';
                            $scope.file = '';
                            $scope.imageSrc = '';
                            $scope.listImgByid($scope.masp);
                            $scope.loadProduct();
                        })
                    }
                }).catch(function(error) {
                    console.error('Error uploading file:', error);
                });
            }
    }

    $scope.listColor = function(){
        $http({
            method: 'GET', 
            url:current_url+'/api/mau-sac/get-all',
        }).then(function (response) {
            $scope.listcolor= response.data;           			         
        }).catch(function(err){          
        })
    }

    $scope.listSize = function(){
        $http({
            method: 'GET', 
            url:current_url+'/api/kich-thuoc/get-all',
        }).then(function (response) {
            $scope.listsize = response.data;      			         
        }).catch(function(err){          
        })
    }

    $scope.listImgByid = function(id){
        $http({
            method: 'GET', 
            url:current_url+'/api/san-pham/getimgbyid/'+id,
        }).then(function (response) {
            $scope.listimgid = response.data;      			         
        })
    }

    $scope.getProByid = function(id){
        $http({
            method: 'GET', 
            url:current_url+'/api/san-pham/getbyid/'+id,
        }).then(function (response) {
            $scope.productbyid = response.data      			         
        })
    }

    $scope.listBrand = function(){
        $http({
            method: 'GET', 
            url:current_url+'/api/hang/get-all',
        }).then(function (response) {
            $scope.listbrand = response.data;   
            console.log($scope.listbrand)   			         
        })
    }

    $scope.listCategory = function(){
        $http({
            method: 'GET', 
            url:current_url+'/api/danh-muc/get-all',
        }).then(function (response) {
            $scope.listcate = response.data;      			         
        })
    }

    // upload file
    $scope.uploadFile = function() {
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
                $scope.imageSrc = current_url + "\\" + response.data.url;
                console.log('File uploaded successfully:', response.data.url);
            }).catch(function(error) {
                console.error('Error uploading file:', error);
            });
        }
    };
    
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
    
    $scope.listColor();
    $scope.listSize();
    $scope.listBrand();
    $scope.listCategory();
    $scope.loadProduct();

})