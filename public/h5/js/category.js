$(function(){
	mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	indicators: false,
	bounce: true
	});
	getData('/category/queryTopCategory',function(res){
		var left=$('.category-left');
//		console.log(res.rows);
		left.html(template('firstCategory',res));
		//默认选择二级分类
		var id01=$('.category-left li:first-child a').data('id');
		console.log(id01);
		$.getJSON('/category/querySecondCategory',{id:id01},function(res){
			$('.category-right').html(template('second-category',res));
		});
		$('.category-left li a').on('click',function(){
			var id=$(this).data('id');
			$.getJSON('/category/querySecondCategory',{id:id
				
			},function(res){
				console.log(res);
				$('.category-right').html(template('second-category',res));
			});
		});
		
//		console.log(a);
	});
	$('input[type=search]').on('focus',function(){
		console.log(location.href='/h5/search.html');
	});
});
function getData(url,callback){
	$.ajax({
		type:"get",
		url:url,
		data:'',
		dataType:'json',
		async:true,
		success:function(res){
			callback&&callback(res);
		}
	});
}
