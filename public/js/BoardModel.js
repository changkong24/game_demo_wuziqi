/**
 * 保存游戏状态
 * @param {[num]} cols [列数]
 * @param {[num]} rows [行数]
 */
function BoardModel(cols,rows){
	this._cols = cols || 10;//棋盘列数
	this._rows = rows || 10;//棋盘行数
	this._data = [];//每个格子数据
	this._currentPlayer = BoardModel.RED;//当前的游戏选手 默认红棋先行
	this._totalToken = 0;//操作的步数
	this.reset();//重置数据	
}
var _p = BoardModel.prototype;//原型
BoardModel.RED = 1 ;//红棋
BoardModel.GREEN=2;//绿棋
BoardModel.EMPTY = 0;//空

BoardModel.NONE = 0;//未分胜负
BoardModel.WIN = 1;//胜
BoardModel.DRAW = 2;//平
BoardModel.ILLEGAl = 3;//非法操作
/**
 * 重置数据
 * @return {[type]} [description]
 */
_p.reset  = function (){
	this._data = [];
	for(var i = 0;i < this._cols;i++){
		this._data[i] = [];
		for(var j = 0;j < this._rows;j++){
			this._data[i][j] = BoardModel.EMPTY;
		}
	}
	this._currentPlayer = BoardModel.RED;
	this._totalTokens = 0;
}
/**
 * 获取列数
 * @return {[type]}
 */
_p.getCols = function(){
	return this._cols;
}
/**
 * 获取行数
 */
_p.getRows = function(){
	return this._rows;	
}
/**
 * 获取数据
 */
_p.getData = function(col,row){
	return this._data[col][row];
}
/**
 * 切换选手 获取状态
 * @param  {[type]} col [description]
 * @param  {[type]} row [description]
 * @return {[type]}     [description]
 */
_p.makeTurn = function(col,row){
	if(col < 0 || col > this._cols){
		//点击不在行内
		return {status:BoardModel.ILLEGAl};//非法点击
	}
	if(row < 0 || row > this._rows){
		//点击不在行内
		return {status:BoardModel.ILLEGAl};
	}
	if(this.getData(col,row) != BoardModel.EMPTY){
		//点击行内有数据
		return {status:BoardModel.ILLEGAl};	
	}
	this._totalToken ++;//操作的步数
	this._data[col][row] = this._currentPlayer;
	var player = this._currentPlayer;//当前的操作员
	var status = this._getStatus(col,row);//获取当前棋局状态
	this._toggleCurrentPlayer();//交换选手
	return{
		status:status,
		x:col,
		y:row,
		player:player
	}
}
/**
 * 交换选手
 * @return {[type]} [description]
 */
_p._toggleCurrentPlayer = function(){
	if(this._currentPlayer == BoardModel.RED){
		this._currentPlayer = BoardModel.GREEN;
	}
	else{
		this._currentPlayer = BoardModel.RED;
	}
}
/**
 * 获取当前状态
 * @param  {[type]} col [description]
 * @param  {[type]} row [description]
 * @return {[type]}     [description]
 */
_p._getStatus = function (col,row){
	if(this._totalToken == this.cols * this.rows && !this._isWin(col,row)){
		//如果全部占 并且没有胜 平局
		return BoardModel.DRAW;
	}
	if(this._isWin(col,row)){
		return BoardModel.WIN;
	}
	return BoardModel.NONE;
}
/**
 * 判断是否胜出
 * @param  {[num]}  col [description]
 * @param  {[num]}  row [description]
 * @return {Boolean}     [description]
 */
_p._isWin = function(col,row){
	var color = this._currentPlayer;//当前下的棋子颜色
	var count1 = 0,count2 = 0,count3 = 0,count4 = 0;//四个方向
	for(var i = 0;i < 4;i++){
		if((col - 1 - i > 0 && color == this.getData(col - 1 - i,row)) || (col + 1 + i < this._cols && color == this.getData(col + 1 + i,row))){
			//水平方向
			count1 ++;
		}
		if((row - 1 - i > 0 && color == this.getData(col,row - 1 - i)) || (row + 1 + i < this.rows && color == this.getData(col,row + 1 + i))){
			//垂直方向
			count2 ++;
		}
		if((col - 1 - i> 0 && row - 1 - i > 0 && this.getData(col - 1 - i ,row - 1 - i) == color) || (col + 1 + i < this._cols && row + 1 + i < this._rows && this.getData(col + 1 + i,row + 1 + i) == color)){
			//右向斜角
			count3 ++;
		}
		if((col - 1 - i > 0 && row + 1 + i < this._rows && this.getData(col - 1 - i,row + 1 + i) == color) || (col + 1 + i < this._cols && row - 1 - i && this.getData(col + 1 + i,row - 1 - i) == color)){
			//左向斜角
			count4 ++;
		}
	}
	if(count1 == 4 || count2 == 4 || count3 == 4 || count4 == 4){
		return true;
	}
	return false;
}