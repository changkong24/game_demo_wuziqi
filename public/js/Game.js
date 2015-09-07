/**
 * 游戏启动 处理事件 执行内务
 * [Game description]
 */
function Game(canvas){
	this._canvas = canvas;//获取canvas
	this._ctx = canvas.getContext("2d");//获取context
	this._boardModel = new BoardModel(16,20);//游戏状态对象 传入行 列
	this._boardRenderer = new BoardRenderer(this._ctx,this._boardModel);//游戏渲染
	this._handleResize();//执行resize事件
	this._boardRect = null;//棋盘矩形
}
var _p = Game.prototype;//游戏类原型
/**
 * 获取游戏棋盘的起点坐标 每个方格大小
 * @return {[object]} [棋盘的起点坐标 每个方格的大小]
 */
_p._getBoardRect = function(){
	var cols = this._boardModel.getCols();
	var rows = this._boardModel.getRows();
	var width = this._canvas.width;
	var height = this._canvas.height;
	var cellSize =Math.floor(Math.min(width/cols,height/rows));//取横向最大宽度 或者 纵向最大宽度的最小值 取整
	var x = (width - cellSize * cols)/2;
	var y = (height - cellSize * rows)/2;
	return{
		x:x,
		y:y,
		cellSize:cellSize
	}
}

/**
 * 窗口大小改变事件
 * @return {[type]} [description]
 */
_p._handleResize = function(){
	this._boardRect = this._getBoardRect();
	this._clearCanvas();
	this._boardRenderer.setSize(this._boardRect.x,this._boardRect.y,this._boardRect.cellSize);//设置大小
	this._boardRenderer.repaint();
}
/**
 * 重设canvas
 * @return {[type]} [description]
 */
_p._reset = function(){
	this._clearCanvas();
	this._boardModel.reset();//重置数据
	this._boardRenderer.repaint();
}
/**
 * 将画布还原成原始状态
 * @return {[type]} [description]
 */
_p._clearCanvas = function(){
	this._ctx.fillStyle = "white";
	this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height);
}
/**
 * 点击单元格事件
 * @param  {[num]} x [点击点横坐标]
 * @param  {[num]} y [点击点纵坐标]
 * @return {[type]}   [description]
 */
_p.handleClick = function (x,y){
	var col =Math.floor((x - this._boardRect.x)/this._boardRect.cellSize);//获取点击的行
	var row = Math.floor((y - this._boardRect.y)/this._boardRect.cellSize);//获取点击的列

	var status = this._boardModel.makeTurn(col,row);
	//判断当前状态
	if(status.status == BoardModel.ILLEGAl){
		//非法操作
		return;
	}
	this._boardRenderer.drawToken(col,row);//绘制一个点
	if(status.status == BoardModel.NONE){
		//如果没有胜负
		return;
	}
	if(status.status == BoardModel.DRAW){
		alert("平局！");
		this._reset();
		return;
	}
	if(status.status == BoardModel.WIN){
		alert((status.player == BoardModel.RED ? "red" : "green") + "获得胜利！");
		this._reset();
		return;
	}

}
