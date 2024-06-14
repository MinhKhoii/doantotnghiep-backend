var app = angular.module("AppBanHang",[])
app.controller("myctrl",function($scope,$http){
    $scope.txtbutton = 'Thêm mới';
    $scope.url = $scope.current_url;

  
    $scope.productcategoryid;
    $scope.tenloai;
   
    $scope.productcategory = {}

    $scope.loadNew = function(){
        $scope.productcategoryid = '';
        $scope.tenloai = '';    
        $scope.txtbutton = 'Thêm mới';
    }

    $scope.edit = function(){
        if($scope.txtbutton === 'Thêm mới'){
            $scope.productcategory.TenLoai = $scope.tenloai;      
            $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url:current_url+'/api/danh-muc/create',
                data:  $scope.productcategory
            }).then(function(response){
                if(response.data.results){
                    alert(response.data.message)
                }else{
                    alert("Thêm thất bại")
                }
                $scope.loadCategory();
                $scope.loadNew();
            })
        }

        else if($scope.txtbutton === "Sửa"){
            $scope.productcategory.MaLoai = $scope.productcategoryid;
            $scope.productcategory.TenLoai = $scope.tenloai; 
            $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url:current_url+'/api/danh-muc/update',
                data:  $scope.productcategory
            }).then(function(response){
                if(response.data.results){
                    alert(response.data.message)
                }else{
                    alert("Thêm thất bại")
                }
                $scope.loadCategory();
                $scope.loadNew();
            })
        }

    }

    $scope.delete = function(id){
        var check = confirm('Bạn có chắc muốn xóa loại sản phẩm này không?');
        if(check){
            $http({
                method: 'POST',
                url:current_url+'/api/danh-muc/delete/'+id
            }).then(function(response){
                alert('Xóa thành công')
                $scope.loadCategory();
            }).catch(function(err){
                alert(err)
            })
        }
    }

    $scope.invalue = function(id){
        $http({
            method: 'GET',
            url:current_url+'/api/danh-muc/getbyid/'+id
        }).then(function(response){
            $scope.productcategoryid = response.data.MaLoai;
            $scope.tenloai = response.data.TenLoai;          
            $scope.txtbutton = 'Sửa';
        })
    }

    $scope.loadCategory = function(){
        $http({
            method: 'GET', 
            url:current_url+'/api/danh-muc/get-all',
        }).then(function (response) {
            $scope.listcate = response.data;  
            console.log(listcate)    			         
        })
    }
   
    // $scope.listColor = function(){
    //     $http({
    //         method: 'GET', 
    //         url:current_url+'/api/san-pham/get-all-color',
    //     }).then(function (response) {
    //         $scope.listcolor= response.data;           			         
    //     }).catch(function(err){          
    //     })
    // }

    // $scope.listSize = function(){
    //     $http({
    //         method: 'GET', 
    //         url:current_url+'/api/san-pham/get-all-size',
    //     }).then(function (response) {
    //         $scope.listsize = response.data;      			         
    //     }).catch(function(err){          
    //     })
    // }

    // $scope.listBrand = function(){
    //     $http({
    //         method: 'GET', 
    //         url:current_url+'/api/san-pham/get-all-brand',
    //     }).then(function (response) {
    //         $scope.listbrand = response.data;      			         
    //     })
    // }
    
    $scope.loadCategory();
})