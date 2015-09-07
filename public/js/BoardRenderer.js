/**
 * 绘图相关
 * @param {[object]} context [canvas 对象]
 * @param {[object]} model   [模型对象]
 */
function BoardRenderer(context,model){
	this._ctx = context;//canvas 对象
	this._model = model;//模板状态
	this._cols = model.getCols();//获取列数
	this._rows = model.getRows();//获取行数
	this._x = 0;//起点x
	this._y = 0;//起点y
	this._width = 0;//游戏宽度
	this._height = 0;//游戏高度
	this._cellSize = 0;//小方格大小
}
var _p = BoardRenderer.prototype;
/**
 * 重绘canvas
 * @return {[type]} [description]
 */
_p.repaint = function(){
	this._ctx.save();//保存当前状态
	this._ctx.translate(this._x,this._y);//重新映射 x,y 的坐标位置
	this._drawBackground();//绘制背景
	this._drawGrid();//绘制格子
	this._ctx.restore();//还原之前状态
	//绘制每个格子的样式
	for(var i = 0;i < this._cols;i++){
		for(var j = 0;j < this._rows;j++){
			this.drawToken(i,j);//绘制每个格子的样式
		}
	}
}
/**
 * 设置旋转角度
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
function reorient(ctx){
	var angle = window.orientation;
	if(angle){
		var rot = -Math.PI*(angle/180);
		ctx.translate(angle==-90?canvas.width :0,
		angle == 90? canvas.height : 0);
		ctx.rotate(rot);
	}
}

/**
 * 绘制背景
 * @return {[type]} [description]
 */
_p._drawBackground = function(){
	var ctx = this._ctx;

	ctx.fillStyle = "#fffbb3";
	ctx.fillRect(0,0,this._width,this._height);

	ctx.font="20px Georgia";//字号 字体
	ctx.fillStyle = "#333333";//设置颜色
	ctx.fillText("五子棋",this._width/2 - 40 ,-20);//文字
}
//绘制格子
_p._drawGrid = function(){
	var ctx = this._ctx;
	ctx.beginPath();//开始路径
	//绘制垂直线
	for (var i = 0;i <= this._cols;i++) {
		ctx.moveTo(i*this._cellSize+0.5,0.5);
		ctx.lineTo(i*this._cellSize+0.5,this._height+0.5);
	};
	//水平线
	for(var j = 0;j <=this._rows;j++){
		ctx.moveTo(0.5,j*this._cellSize+0.5);
		ctx.lineTo(this._width+0.5,j*this._cellSize+0.5);
	}
	ctx.strokeStyle = "#cccccc";
	ctx.stroke();
}

/**
 * 绘制指定格子
 * @param  {[type]} col [第几列]
 * @param  {[type]} row [第几行]
 * @return {[type]}   [description]
 */
_p.drawToken = function(col,row){
	var ctx = this._ctx;
	var cellSize = this._cellSize;
	var cellData = this._model.getData(col,row);//该单元格的值
	if(!cellData){
		return;
	}
	var circleColor = "black";
	switch (cellData){
		case BoardModel.RED:
			circleColor = "red";
			break;
		case BoardModel.GREEN:
			circleColor = "green";
			break;
	}
	//圆心
	var x = this._x + (col + 0.5) * this._cellSize;
	var y = this._y +(row + 0.5) * this._cellSize;
	ctx.save();
	var radius = this._cellSize / 2;//半径
	ctx.translate(x,y);//重新定位 x y 起点
	ctx.beginPath();
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = circleColor;
	ctx.arc(0,0,radius,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}
/**
 * 设置格子大小 起点 x,y坐标
 * @param {[type]} x        [棋盘开始点横坐标]
 * @param {[type]} y        [棋盘开始点纵坐标]
 * @param {[type]} cellSize [棋盘每个格子的大小]
 */
_p.setSize =  function(x,y,cellSize){
	this._x = x;
	this._y = y;
	this._cellSize = cellSize;
	this._width = cellSize * this._cols;//棋盘宽度
	this._height = cellSize * this._rows;//棋盘高度
}