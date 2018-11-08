$(function(){
	var p_id=getParamsByUrl().productId;
	getProuduct(p_id,function(data){
		console.log(data);
		$('#productDetail').html(template('detail',data));
		mui('.mui-slider').slider({
			interval:3000,//自动轮播周期，若为0则不自动播放，默认为0；
			indicator:true
		});
		$('.btn_size').on('tap',function(){
			$(this).addClass('now').siblings('span').removeClass('now');
		});
		$('.jian').on('tap',function(){
			var value=Number($('.p_number input').val());
			if (value<=0) {
				$('.p_number input').val(0);
			} else{
				$('.p_number input').val(value-1);
			}
			
		});
		$('.jia').on('tap',function(){
			var value=Number($('.p_number input').val());
			if (value>=data.num) {
				$('.p_number input').val(data.num);
			} else{
				$('.p_number input').val(value+1);
			}
			
		});
		$('.btn_addCart').on('tap',function(){
			var size=$('.p_size .now').html();
			console.log(size);
			if (!size) {
				mui.toast('请选择尺码');
				return false;
			}
			var num=Number($('.p_number input').val())
			if (num==0) {
				mui.toast('请正确添加购物车');
				return false;
			};
			login({
				url:'/cart/addCart',
				type:'post',
				data:{
					productId:p_id,
					size:size,
					num:num
				},
				dataType:'json',
				success:function(data){
					mui.confirm('添加购物车成功，点击确定进入购物车','温馨提示',['确定','取消'],function(e){
						if (e.index==0) {
							location.href='/h5/user/cart.html';
						} else{
//							info.innerText='购物车添加成功';
							
						}
					});
				}
			});
		});
	});
	
	mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	indicators: false,
	bounce: true
	});
	//尺码，数量的选择，加入购物车
});



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

function getProuduct(id,callback){
	$.getJSON('/product/queryProductDetail',{id:id
		
	},function(data){
		callback&&callback(data);
	});
}
