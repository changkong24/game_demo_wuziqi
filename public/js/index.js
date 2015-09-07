window.onload = init();
var game;
/**
 * 初始化
 * @return {[type]} [description]
 */
function init(){
	var canvas = initFullScreenCanvas("mainCanvas");
	game = new Game(canvas);//创建游戏对象
	game._handleResize();
	if(isTouchDevice()){
		canvas.addEventListener("touchstart",function(e){
			var touch = event.targetTouches[0];
			game.handleClick(touch.pageX,touch.pageY);
			e.stopPropagation();
			e.preventDefault();
		},false);
	}
	else{
		canvas.addEventListener("mouseup",function(e){
			game.handleClick(e.pageX,e.pageY);
			e.stopPropagation();
			e.preventDefault();
		})
	}
}
/**
* 获取canvas 并绑定事件
*/
function initFullScreenCanvas(canvasID){
	var canvas = document.getElementById(canvasID);
	resizeCanvas(canvas);
	window.addEventListener("resize",function(){
		resizeCanvas(canvas);
		game._handleResize();
	})
	return canvas;
}

/**
* 调整大小 将canvas 设为满屏
*/
function resizeCanvas(canvas){
	canvas.width = document.width || document.body.clientWidth;
	canvas.height = document.height || document.body.clientHeight;
	//repaint(canvas, canvas.getContext("2d"));
}
/**
 * 判断是否是移动网页
 * @return {Boolean} [description]
 */
function isTouchDevice(){
	return ('ontouchstart' in document.documentElement);
}
