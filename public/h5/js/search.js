$(function(){
	var search=$('input[type=search');
	var searchHistory=[];
	$('.lt-search a').on('tap',function(){
		var key=$.trim(search.val());
		console.log(key);
		searchHistory.push(key);
		localStorage.setItem('searchHistory',searchHistory);
		if(!key){
			mui.toast('请输入关键字') ;
		}else{
			location.href='/h5/searchList.html?key='+key;
			console.log(22)
		}
//		return false;
	});
	
});