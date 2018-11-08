
var loginurl='/h5/user/login.html';
function login(params){
	$.ajax({
		type:params.type,
		url:params.url,
		async:true,
		data:params.data,
		dataType:params.dataType||'json',
		success:function(data){
			if (data.error==400) {
				window.location.href=loginurl+'?returnUrl='+location.href;
				return false;
			}else{
				params.success&&params.success(data);
			}
		},
		error:function(){
			mui.toast('服务器忙！');
		}
	});
}
function serializeToObject(str){
	var obj={};
	if (str) {
		var strArr=str.split('&');
		strArr.forEach(function(item,i){
			var arr=item.split('=');
			obj[arr[0]]=arr[1];
		});
	}
	return obj;
}
function getItemById(arr,id){
	var item=null;
	arr.forEach(function(ite,i){
		if (ite.id==id) {
			item=ite;
		}
	});
	return item;
}
