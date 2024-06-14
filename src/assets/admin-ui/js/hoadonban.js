var app = angular.module("AppBanHang",[])
app.controller("myctrl",function($scope,$http){

    $scope.delete = function(id){
        var check = confirm('Bạn có chắc muốn xóa hóa đơn này không?');
        if(check){
            $http({
                method: 'POST',
                url:current_url+'/api/hoadonban/delete/'+id
            }).then(function(response){
                alert('Xóa thành công')
                $scope.loadBill();
            }).catch(function(err){
                alert(err)
            })
        }
    }

    $scope.loadBill= function(){
        $http({
            method: 'GET', 
            url:current_url+'/api/hoadonban/get-all',
        }).then(function (response) {
            $scope.listbill = response.data;  
            console.log($scope.listbill)    			         
        })
    }
    $scope.loadBill();
})