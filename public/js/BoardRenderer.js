//绘图相关
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
//重绘
_p.repaint = function(){
	this._ctx.save();//保存当前状态
	this._ctx.translate(this._x,this._y);//重新映射
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

//绘制背景
_p._drawBackground = function(){
	var ctx = this._ctx;
	ctx.font = "20px Microsoft YaHei"

}