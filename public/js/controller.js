angular.module('market',[])
	.controller('mainCtrl',['itemService','cartService',function(itemService,cartService){
		var self=this;
		self.pressed=true;
		console.log('Controller created beatch');
		self.carrito=cartService.merca();
		console.log('mio joder Miguel');
		console.log(self.carrito.lenght);
		self.loadData=function(){
			self.pressed=false;
			self.products=itemService.full();
		};
		self.addCart=function(p){
			cartService.add(p);
			self.carrito=cartService.merca();
			console.log(cartService.merca());
		};
		self.removeCart=function(p){
			cartService.remove(p);
			self.carrito=cartService.merca();
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
			}
		};
	}]);