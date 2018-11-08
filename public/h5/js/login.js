$(function(){
	mui('.mui-input-row input').input();
	$('#login').on('tap',function(){
		var data=$('form').serialize();
		var dataObj=serializeToObject(data);
		if (!dataObj.username) {
			mui.toast('请输入用户名');
			return false;
		}
		if (!dataObj.password) {
			mui.toast('请输入密码');
			return false;
		}
		$.ajax({
			type:"post",
			url:"/user/login",
			async:true,
			data:dataObj,
			success:function(data){
				if (data.success==true) {
					var url=location.search.replace('?returnUrl=','');
					if (url) {
						location.href=url;
					} else{
						location.href='/h5/user/index.html';
					}
				}else{
					mui.toast(data.message);
				}
			}
		});
	});
	
	
});

