$(function(){
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		indicators: false,
		bounce: true
	});
	mui.init({pullRefresh:{
		container:'#refresh',
		down:{
			//初始化页面，自动下拉刷新
			auto:true,
			callback:function(){
				var that=this;
				setTimeout(function(){
					getCarData(function(data){
						window.data=data;
						console.log(data);
						$('.mui-table-view').html(template('carList',data));
					});
					that.endPulldownToRefresh();
					},1000)
				}
			}
		}
	});
	$('body').on('tap','.modify',function(){
		var id=$(this).parents().data('id');
		var item=getItemById(data.data,id);
		console.log(item);
		var html=template('edit',item);
		mui.confirm(html.replace(/\n/g,''),'编辑商品',['确定','取消'],function(e){
			if (e.index==0) {
				var size=$('.btn_size.now').html();
				var num=$('#number').val();
				login({
					type:"post",
					url:"/cart/updateCart",
					data:{
						id:id,
						num:num,
						size:size
					},
					dataType:'json',
					async:true,
					success:function(data){
						if (data.success==true) {
							mui('#refresh').pullRefresh().pulldownLoading();
							mui.toast('编辑成功');
						} else{
							mui.toast('服务器繁忙，请稍后重试');
							}
						}
					});
				} else{
			//info.innerText='购物车添加成功';
			}
		});
	});
	//删除功能
	$('body').on('tap','.delete',function(){
		var id=$(this).parents().data('id');
		var that=$(this);
		mui.confirm('您真的忍心删除我么！','提示',['确定','取消'],function(e){
			if (e.index==0) {
				login({
					url:'/cart/deleteCart',
					type:'get',
					data:{
						id:id
					},
					success:function(data){
						if (data.success==true) {
							that.parent().parent().remove();
							amount();
						}else{
							mui.toast('服务器忙！');
						}
					}
				});
			} else{
			//info.innerText='购物车添加成功';
			}
		});
	});
	//点击刷新，重新刷新购物侧
	$('.fa-refresh').on('tap',function(){
		mui('#refresh').pullRefresh().pulldownLoading();
	});
	$('body').on('tap','.btn_size',function(){
		console.log(1);
		$(this).addClass('now').siblings().removeClass('now');
	});
	$('body').on('tap','.jian',function(){
		var val=$('#number').val();
		if (val<=1) {
			mui.toast('亲，不能再少了哦！');
			$('#number').val('1');
		}else{
			val--;
			$('#number').val(val);
		}
	});
	$('body').on('tap','.jia',function(){
		var val=$('#number').val();
		if (val>=5) {
			mui.toast('抱歉，此商品限购5件！')
			$('#number').val(5);
		} else{
			val++;
			$('#number').val(val);
		}
	});
	amount();
	//点击复选框，计算总金额
	$('.mui-table-view').on('change','input[type=checkbox',function(){
		amount();
//		var item=amount();
//		console.log(item);
	});
	
});
function getCarData(callback){
	login({
		type:'get',
		url:'/cart/queryCartPaging',
		data:{
			page:1,
			pageSize:100
		},
		dataType:'json',
		success:function(data){
			callback&&callback(data);
		}
	});
}
function amount(){
	var chec=$('input[type=checkbox]:checked');
	var sum=0;
	chec.each(function(i,item){
		var id=$(item).data('id');
		var ite=getItemById(data.data,id);
		var price=ite.price;
		var num=ite.num;
		var total=num*price;
		sum+=total;
	});
	$('#cartAmount').text(parseInt(sum));
}

