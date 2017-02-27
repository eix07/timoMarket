$(document).ready(function(){
  $('select').material_select();
  $(".button-collapse").sideNav();
  $('.parallax').parallax();
  $('.modal').modal();
  var html5Slider = document.getElementById('sliderr');
  noUiSlider.create(html5Slider,{
  	start:[12000,100000],
  	connect:true,
  	range:{
  		'min':12000,
  		'max':120000
  	}
  });
  var selec1=document.getElementById('selec1');
  var selec2=document.getElementById('selec2');
  html5Slider.noUiSlider.on('update',function(values,handle){
  	var value=values[handle];
  	if(handle==1){
  		window.value2=value;
  		selec2.value=value;
  	}else{
  		window.value1=value;
  		selec1.value=value;
  	}
  });
});
window.value1=0;
window.value2=0;
