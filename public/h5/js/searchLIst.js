$(function(){
	mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	indicators: false,
	bounce: true
	});
	//页面初始化显示搜索的关键字
	
	var urlParams=getParamsByUrl();
	var input=$('#search');
	input.val(urlParams.key||'');
	var key=$.trim(input.val());
	
	//获取搜索到的数据结果，显示搜索到的商品列表
	
	getSearchData({
		proName:input.val(),
		page:1,
		pageSize:4
	},function(data){
		$('.lt-product').html(template('ltProduct',data));
	});
	//点击搜索重新渲染数据
	$('.lt-search a').on('tap',function(){
		
		if (!key) {
			mui.toast('请输入关键字');
		}
		getSearchData({
			proName:key,
			page:1,
			pageSize:4
			},function(data){
				$('.lt-product').html(template('ltProduct',data));
			});
	});
	$('.order li').on('tap',function(){
		//改变当前样式
		$(this).addClass('now').siblings().removeClass('now');
			$(this).addClass('now').siblings().removeClass('now').find('span').removeClass('fa-arrow-up').addClass('fa-arrow-down');
			if ($(this).find('span').hasClass('fa-arrow-down')) {
				$(this).find('span').removeClass('fa-arrow-down').addClass('fa-arrow-up');
			} else{
				$(this).find('span').removeClass('fa-arrow-up').addClass('fa-arrow-down');
			}
		//获取当前点击的功能参数
		var order=$(this).data('order');
		console.log(order);
		var orderVal=$(this).find('span').hasClass('fa-arrow-up')?1:2;
		var params={
			proName:key,
			page:1,
			pageSize:4
		};
		params[order]=orderVal;
		getSearchData(params,function(data){
				$('.lt-product').html(template('ltProduct',data));
				
			});
	
	});
	//下拉刷新
	mui.init({pullRefresh:{
		
		container:'#refresh',
		down:{
			
			callback:function(){
				var that=this;
				if (!key) {
					mui.toast('请输入关键字');
					return false;
				}
				getSearchData({
					proName:key, 
					page:1,
					pageSize:4
				},function(data){
					$('.lt-product').html(template('ltProduct',data));
					console.log(data);
					that.endPulldownToRefresh();
				});
			}
		},
		//上拉加载
		up : {
			callback:function(){
				window.page++;
				var that=this;
				if (!key) {
					mui.toast('请输入关键字');
					return false;
				}
				getSearchData({
					proName:key, 
					page:window.page,
					pageSize:4
				},function(data){
					$('.lt-product').append(template('ltProduct',data));
					console.log(data);
					if(data.data.length){
						that.endPullupToRefresh();
					}else{
						that.endPullupToRefresh(true);
					}
					
				});
			}
		}
	}
	});
	
	

});
function getSearchData(params,callback){
		$.ajax({
			type:"get",
			data:params,
			dataType:'json',
			url:"/product/queryProduct",
			async:true,
			success:function(data){
				window.page=data.page;
				callback&&callback(data);
			}
		});
	}
	function getParamsByUrl(){
		//用对象存储地址栏信息
		var params={};
		var search=location.search;
		if(search){
			search=search.replace('?','');
			var arr=search.split('&');
			arr.forEach(function(item,i){
				var itemArr=item.split('=');
				params[itemArr[0]]=itemArr[1];
			});
		}
//		console.log(params);
		return params;
	}