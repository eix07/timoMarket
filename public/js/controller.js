angular.module('market',[])
	.controller('mainCtrl',['itemService','cartService','$window',function(itemService,cartService,$window){
		var self=this;
		self.pressed=true;
		console.log('Controller created beatch');
		self.carrito=cartService.merca();
		console.log('mio joder Miguel');
		self.loadData=function(){
			self.pressed=false;
			self.products=itemService.full();
		};
		self.addCart=function(p){
			if(p.available){
				cartService.add(p);
				self.carrito=cartService.merca();
				console.log(cartService.merca());	
			}else{
				$window.alert('this product is unavaliable :(');
			}
		};
		self.removeCart=function(p){
			cartService.remove(p);
			self.carrito=cartService.merca();
		};
		self.getCarrito=function(){
			return cartService.merca().length;
		};
		self.total=function(){
			return cartService.getTotal();
		}
		self.s1=$window.value1;
		self.s2=200000;
		console.log($window.value1);
		console.log(self.s1);
	}])
	.filter('priceFilter',[function(){
		return function(input,selec1,selec2){
			var res=[];
			var s1=parseInt(selec1);
			var s2=parseInt(selec2);
			for(var a in input){
				var c=parseInt(input[a].price)*1000;
				console.log(c);
				if(c>=s1&&c<=s2){
					res.push(input[a]);
				}
			}
			return res;
		}
	}])
	.filter('category',[function(){
		return function(input,cate){
			var res=[];
			for(var n in input){
				var c=input[n].categories;
				if(c.indexOf(cate)!=-1){
					res.push(input[n]);
				}
			}
			return res;
		}
	}])
	.filter('bestFilter',[function(){
		return function(input){
			var res=[];
			for(var n in input){
				var c=input[n].best_seller;
				if(c){
					res.push(input[n]);
				}
			}
			return res;
		}
	}])
	.factory('itemService',['$http',function($http){
		var data=[];
		$http.get('/getData').then(function(res){
			data=res.data;
			console.log('daticos'+res.data);
		});
		return{
			full: function(){
				return data;
			}
		};
	}])
	.factory('cartService',[function(){
		var cart=[];
		return{
			add: function(data){
				cart.push(data);
			},
			merca: function(){
				return cart;
			},
			remove: function(p){
				var index=cart.indexOf(p);
				cart.splice(index,1);
			},
			getTotal: function(){
				var total=0;
				for(var a in cart){
					total=total+parseInt(cart[a].price);
				}
				return total;
			}
		};
	}]);