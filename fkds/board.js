'use strict';

const GAME_INFO = {
	BOARD_SIZE_BLOCK: 9,
	BOARD_BLOCK_SET_WIDTH: 3,

	BOARD_AREA: { SIZE: { X: 450, Y: 450 } },
	ELEMENT_AREA: { SIZE: { X: 450, Y: 100 } },
	ALL_ELEMENT_AREA: { SIZE: { X: 450, Y: 240 } },
	BLOCK_SIZE_PX: 50
};

function getSize(blocks, blockSize, spacing) {
	return blockSize * blocks + spacing * (blocks + 1); 
}
	
class board extends canvas {
	color = ['rgba(100, 70, 68, 255)',
		'rgba(68, 43, 27, 255)',
		'rgba(10, 192, 10, 255)',
		'rgba(192, 10, 10, 255)'];

	constructor(canvasId, width, height, blockSize, spacing) {
		super(canvasId, width, height, 'black');
		this.blockSize = blockSize;
		this.spacing = spacing;
	}

	draw() {
		for (var x = this.spacing, col = 0; x < this.width; x += this.blockSize + this.spacing, col++) {
			for (var y = this.spacing, row = 0; y < this.width; y += this.blockSize + this.spacing, row++) {
				var colorId = (Math.floor(x / 3 / this.blockSize) + Math.floor(y / 3 / this.blockSize)) % 2;
				if (this.board[row][col] === 1)
					colorId = 2;
				this.drawRoundedRect(x, y, blockSize, blockSize, 3, this.color[colorId]);
			}
		}
	}

	board = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]];
	drawBoard(board) {
		Object.assign(this.board, board);
		this.draw();
	}
	drawShape(x, y, shape) {
		for (var j = 0; j < shape.h; j++) {
			for (var i = 0; i < shape.w; i++) {
				let posX = this.spacing + (this.spacing + this.blockSize) * (x + i);
				let posY = this.spacing + (this.spacing + this.blockSize) * (y + j);
				if (shape.s[j * shape.w + i])
					this.drawRoundedRect(posX, posY, this.blockSize, this.blockSize, 3, this.color[3]);
			}
		}
	}
	getPosition(offsetX, offsetY) {
		let x = Math.round((offsetX - this.spacing) / (this.spacing + this.blockSize));
		let y = Math.round((offsetY - this.spacing) / (this.spacing + this.blockSize));
		if (x >= 0 && x < 9 && y >= 0 && y < 9)
			return { x: x, y: y };
		else
			return null;
	}
	enableEdit(enable) {
		if (enable) {
			this.canvas.onclick = event => this.onClick(event);
		}
		else {
			this.canvas.onclick = null;
		}
	}

	onClick(event) {
		let x = Math.floor((event.offsetX - this.spacing) / (this.spacing + this.blockSize));
		let y = Math.floor((event.offsetY - this.spacing) / (this.spacing + this.blockSize));
		if (x >= 0 && x < 9 && y >= 0 && y < 9) {
			this.board[y][x] = this.board[y][x] ? 0 : 1;
			this.draw();
        }
	}
}
 
var shapes = [
	{ w: 2, h: 1, s: [1, 1], score: 2 },
	{ w: 3, h: 1, s: [1, 1, 1], score: 3 },
	{ w: 4, h: 1, s: [1, 1, 1, 1], score: 4 },
	{ w: 5, h: 1, s: [1, 1, 1, 1, 1], score: 5 },

	{ w: 1, h: 2, s: [1, 1], score: 2 },
	{ w: 1, h: 3, s: [1, 1, 1], score: 3 },
	{ w: 1, h: 4, s: [1, 1, 1, 1], score: 4 },
	{ w: 1, h: 5, s: [1, 1, 1, 1, 1], score: 5 },

	{ w: 3, h: 2, s: [1, 1, 1, 1, 0, 0], score: 4 },
	{ w: 3, h: 2, s: [1, 1, 1, 0, 0, 1], score: 4 },
	{ w: 3, h: 2, s: [1, 0, 0, 1, 1, 1], score: 4 },
	{ w: 3, h: 2, s: [0, 0, 1, 1, 1, 1], score: 4 },
	{ w: 2, h: 3, s: [1, 1, 1, 0, 1, 0], score: 4 },
	{ w: 2, h: 3, s: [1, 1, 0, 1, 0, 1], score: 4 },
	{ w: 2, h: 3, s: [1, 0, 1, 0, 1, 1], score: 4 },
	{ w: 2, h: 3, s: [0, 1, 0, 1, 1, 1], score: 4 },

	{ w: 4, h: 2, s: [1, 0, 0, 0, 1, 1, 1, 1], score: 5 },
	{ w: 4, h: 2, s: [0, 0, 0, 1, 1, 1, 1, 1], score: 5 },
	{ w: 4, h: 2, s: [1, 1, 1, 1, 1, 0, 0, 0], score: 5 },
	{ w: 4, h: 2, s: [1, 1, 1, 1, 0, 0, 0, 1], score: 5 },
	{ w: 2, h: 4, s: [1, 1, 1, 0, 1, 0, 1, 0], score: 5 },
	{ w: 2, h: 4, s: [1, 1, 0, 1, 0, 1, 0, 1], score: 5 },
	{ w: 2, h: 4, s: [1, 0, 1, 0, 1, 0, 1, 1], score: 5 },
	{ w: 2, h: 4, s: [0, 1, 0, 1, 0, 1, 1, 1], score: 5 },

	{ w: 3, h: 2, s: [1, 1, 1, 0, 1, 0], score: 4 },
	{ w: 3, h: 2, s: [0, 1, 0, 1, 1, 1], score: 4 },
	{ w: 2, h: 3, s: [1, 0, 1, 1, 1, 0], score: 4 },
	{ w: 2, h: 3, s: [0, 1, 1, 1, 0, 1], score: 4 },

	{ w: 3, h: 2, s: [0, 1, 1, 1, 1, 0], score: 4 },
	{ w: 3, h: 2, s: [1, 1, 0, 0, 1, 1], score: 4 },
	{ w: 2, h: 3, s: [1, 0, 1, 1, 0, 1], score: 4 },
	{ w: 2, h: 3, s: [0, 1, 1, 1, 1, 0], score: 4 },

	{ w: 2, h: 2, s: [1, 1, 1, 0], score: 3 },
	{ w: 2, h: 2, s: [1, 1, 0, 1], score: 3 },
	{ w: 2, h: 2, s: [1, 0, 1, 1], score: 3 },
	{ w: 2, h: 2, s: [0, 1, 1, 1], score: 3 },

	{ w: 3, h: 3, s: [1, 1, 1, 1, 0, 0, 1, 0, 0], score: 5 },
	{ w: 3, h: 3, s: [1, 1, 1, 0, 0, 1, 0, 0, 1], score: 5 },
	{ w: 3, h: 3, s: [1, 0, 0, 1, 0, 0, 1, 1, 1], score: 5 },
	{ w: 3, h: 3, s: [0, 0, 1, 0, 0, 1, 1, 1, 1], score: 5 },

	{ w: 2, h: 3, s: [1, 1, 1, 0, 1, 1], score: 5 },
	{ w: 2, h: 3, s: [1, 1, 0, 1, 1, 1], score: 5 },
	{ w: 3, h: 2, s: [1, 1, 1, 1, 0, 1], score: 5 },
	{ w: 3, h: 2, s: [1, 0, 1, 1, 1, 1], score: 5 },

	{ w: 3, h: 3, s: [1, 1, 1, 0, 1, 0, 0, 1, 0], score: 5 },
	{ w: 3, h: 3, s: [0, 1, 0, 0, 1, 0, 1, 1, 1], score: 5 },
	{ w: 3, h: 3, s: [1, 0, 0, 1, 1, 1, 1, 0, 0], score: 5 },
	{ w: 3, h: 3, s: [0, 0, 1, 1, 1, 1, 0, 0, 1], score: 5 },

	{ w: 1, h: 1, s: [1], score: 1 },
	{ w: 2, h: 2, s: [1, 0, 0, 1], score: 2 },
	{ w: 2, h: 2, s: [0, 1, 1, 0], score: 2 },
	{ w: 3, h: 3, s: [1, 0, 0, 0, 1, 0, 0, 0, 1], score: 3 },
	{ w: 3, h: 3, s: [0, 0, 1, 0, 1, 0, 1, 0, 0], score: 3 },
	{ w: 4, h: 4, s: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], score: 4 },
	{ w: 4, h: 4, s: [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0], score: 4 },

	{ w: 2, h: 2, s: [1, 1, 1, 1], score: 4 },
	{ w: 3, h: 3, s: [0, 1, 0, 1, 1, 1, 0, 1, 0], score: 5 },

	{ w: 3, h: 3, s: [1, 0, 0, 1, 1, 1, 0, 0, 1], score: 5 },
	{ w: 3, h: 3, s: [0, 0, 1, 1, 1, 1, 1, 0, 0], score: 5 },
	{ w: 3, h: 3, s: [0, 1, 1, 0, 1, 0, 1, 1, 0], score: 5 },
	{ w: 3, h: 3, s: [1, 1, 0, 0, 1, 0, 0, 1, 1], score: 5 }
];

const rate_0 = [[0, 9], [1, 18], [2, 9], [4, 9], [5, 18], [6, 9], [55, 28]];
class roundGen {
	constructor(){ }

	shapeSelector = [];
	setRate(rate) {
		this.shapeSelector = [];
		let shapes = [];
		for (var r of rate) {
			for (var i = 0; i < r[1]; i++) {
				shapes.push(r[0]);
            }
		}
		while (shapes.length > 0) {
			let index = Math.floor(Math.random() * shapes.length);
			this.shapeSelector.push(shapes[index]);
			shapes.splice(index, 1);
        }
	}

	getShapes() {
		var round = [];
		for (var i = 0; i < 3; i++) {
			let index = Math.floor(Math.random() * this.shapeSelector.length);
			round.push(shapes[this.shapeSelector[index]]);
		}
		return round;
    }
};

class shapeSelector extends canvas {
	static lineCount = 8;
	frameWidth = 2;
	shapePos = null;
	enable = true;
	constructor(canvasId, width) {
		let shapeSize = Math.floor(width / shapeSelector.lineCount);
		let height = Math.floor((shapes.length + shapeSelector.lineCount - 1) / shapeSelector.lineCount) * shapeSize;
		super(canvasId, width, height, 'black');

		this.shapeSize = shapeSize;
		this.spacing = 1;
		this.blockSize = Math.floor((this.shapeSize - this.frameWidth * 2) / 5 - this.spacing);
		this.shapes = shapes;
		for (var i = 0; i < this.shapes.length; i++) {
			this.shapes[i]['id'] = i;
		}
		this.canvas.addEventListener('click', event => this.onMouseClick(event));
		this.canvas.addEventListener('mouseout', event => this.onMouseOut(event));
		this.canvas.addEventListener('mousemove', event => this.onMouseMove(event));
	}

	draw() {
		let addPos = (this.shapePos === null);
		if (addPos)
			this.shapePos = new Array();

		for (var i = 0; i < this.shapes.length; i++) {
			let x = i % shapeSelector.lineCount;
			let y = Math.floor(i / shapeSelector.lineCount);
			var baseX = x * this.shapeSize;
			var baseY = y * this.shapeSize;
			let shapeWidth = getSize(shapes[i].w, this.blockSize, this.spacing);
			let shapeHeight = getSize(shapes[i].h, this.blockSize, this.spacing);
			baseX += Math.floor((this.shapeSize - shapeWidth) / 2) + this.spacing;
			baseY += Math.floor((this.shapeSize - shapeHeight) / 2) + this.spacing;
			this.drawShape(baseX, baseY, shapes[i], 'red');
			this.ctx.fillText(shapes[i].id.toString(), baseX - 4, baseY - 4);
			if (addPos) {
				var rect = {};
				rect['x'] = baseX;
				rect['y'] = baseY;
				rect['width'] = shapeWidth;
				rect['height'] = shapeHeight;
				rect['shape'] = shapes[i];
				this.shapePos.push(rect);
			}
		}
	}

	drawShape(x, y, shape, color) {
		for (var j = 0; j < shape.h; j++) {
			for (var i = 0; i < shape.w; i++) {
				let posX = x + (this.spacing + this.blockSize) * i;
				let posY = y + (this.spacing + this.blockSize) * j;
				if (shape.s[j * shape.w + i])
					this.drawRoundedRect(posX, posY, this.blockSize, this.blockSize, 2, color);
			}
		}
	}

	roundSelected = [];

	clearSelect() {
		this.roundSelected = new Array();
	}

	findShapeAtPos(x, y) {
		for (var i = 0; i < this.shapePos.length; i++) {
			let test = this.shapePos[i];
			if (this.isPointInRectangle(test.x, test.y, test.width, test.height, x, y))
				return test;
		}
		return null;
	}

	onMouseClick(event) {
		if (this.enable === false || this.shapePos === null) return;

		const x = event.offsetX;
		const y = event.offsetY;
		let test = this.findShapeAtPos(x, y);
		if (test) {
			if (this.roundSelected.length >= 3)
				this.roundSelected.shift();
			this.roundSelected.push(test);

			// create and dispatch the event
			var event = new CustomEvent("SelectedShapeChanged", { detail: this.roundSelected });
			this.canvas.dispatchEvent(event);
		}
	}

	onMouseOut(event) {
		if (this.enable === false) return;
		this.clearHighlight();
	}

	clearHighlight() {
		if (this.highlightShape) {
			this.drawShape(this.highlightShape.x, this.highlightShape.y, this.highlightShape.shape, 'red');
			this.highlightShape = null;
		}
	}

	highlightShape = null;
	onMouseMove(event) {
		if (this.enable === false) return;

		// 当鼠标在元素内部移动时执行的代码
		var rect = event.target.getBoundingClientRect();
		var x = event.clientX - rect.left; // 鼠标相对于元素的x坐标  
		var y = event.clientY - rect.top; // 鼠标相对于元素的y坐标  

		let test = this.findShapeAtPos(x, y);
		if (test) {
			if (this.highlightShape) {
				if (this.highlightShape == test)	// 不需要重绘
					return;
				this.drawShape(this.highlightShape.x, this.highlightShape.y, this.highlightShape.shape, 'red');
			}
			this.highlightShape = test;
			this.drawShape(test.x, test.y, test.shape, 'lightgreen');
			return;
		}
		else {
			this.clearHighlight();
		}
	}

	addSelectedShapeChangedEventListener(process) {
		this.canvas.addEventListener("SelectedShapeChanged", process);
	}
}

const transparentColor = 'rgba(255, 255, 255, 0)';

class dragbleShape extends canvas {
	shape = null;
	spacing = 1;
	frameWidth = 1;

	constructor(canvasId, centerX, centerY, width, bigBlockSize) {
		super(canvasId, width, width, transparentColor);

		this.bigBlockSize = bigBlockSize;
		this.blockSize = Math.floor((width - this.frameWidth * 2 - this.spacing) / 5) - this.spacing;
		this.info = { size: width, x: centerX, y: centerY};
		let rect = this.calculateRect();
		this.resize(rect.left, rect.top, rect.width, rect.height, 10);
	}

	enableBig(enable) {
		if (enable) {
			this.blockSize = this.bigBlockSize;
		}
		else {
			this.blockSize = Math.floor((this.info.size - this.frameWidth * 2 - this.spacing) / 5) - this.spacing;
        }
		let rect = this.calculateRect();
		this.resize(rect.left, rect.top, rect.width, rect.height, 10);
		this.draw();
	}

	calculateRect() {
		if (this.shape !== null) {
			let shapeWidth = getSize(this.shape.w, this.blockSize, this.spacing);
			let shapeHeight = getSize(this.shape.h, this.blockSize, this.spacing);
			return { left: Math.round(this.info.x - shapeWidth / 2), top: Math.round(this.info.y - shapeHeight / 2), width: shapeWidth, height: shapeHeight };
		}
		else {
			return { left: this.info.x, top: this.info.y, width: 1, height: 1 };
		}
	}

	setShape(shape) {
		this.shape = shape;
		let rect = this.calculateRect();
		this.resize(rect.left, rect.top, rect.width, rect.height, 10);
		this.draw();
	}

	draw() {
		this.clear(transparentColor);
		if (this.shape !== null) {
			this.drawShape(0, 0, this.shape);
		}
	}

	drawShape(x, y, shape) {
		for (var j = 0; j < shape.h; j++) {
			for (var i = 0; i < shape.w; i++) {
				let posX = x + (this.spacing + this.blockSize) * i;
				let posY = y + (this.spacing + this.blockSize) * j;
				if (shape.s[j * shape.w + i])
					this.drawRoundedRect(posX, posY, this.blockSize, this.blockSize, 2, 'green');
			}
		}
	}

	enableDrag(enable) {
		if (enable && this.shape !== null) {
			this.canvas.onmousedown = event => this.onMouseDown(event);
		}
		else {
			this.canvas.onmousedown = null;
		}
	}

	isDragging = false;
	onMouseDown(event) {
		event.preventDefault();
		this.isDragging = true;
		this.enableBig(true);
		this.offsetX = event.clientX - this.canvas.offsetLeft;
		this.offsetY = event.clientY - this.canvas.offsetTop;

		this.canvas.onmousemove = event => this.onMouseMove(event);
		this.canvas.onmouseup = event => this.onMouseUp(event);
	}

	// 处理鼠标移动事件
	onMouseMove(event) {
		if (!this.isDragging) return;

		var newLeft = event.clientX - this.offsetX;
		var newTop = event.clientY - this.offsetY;

		// 防止元素被拖出视口
		//if (newLeft < 0) newLeft = 0;
		//if (newTop < 0) newTop = 0;
		this.setPosition(newLeft, newTop, 100);
	}

	shapeDraged = null;
	onMouseUp(event) {
		if (!this.isDragging) return;

		this.isDragging = false;
		this.canvas.onmousemove = null;
		this.canvas.onmouseup = null;

		// create and dispatch the event
		var left = event.clientX - this.offsetX;
		var top = event.clientY - this.offsetY;
		if (shapeDraged !== null) {
			if (shapeDraged(left, top, this.shape)) {
				this.canvas.onmousedown = null;
				this.shape = null;
				this.enableBig(false);
			}
			else {
				this.enableBig(false);
            }
        }
	}
}

class roundShape extends canvas {
	static lineCount = 3;
	frameWidth = 2;
	selectedShape = [];

	constructor(canvasId, width, height) {
		super(canvasId, width, height);
		this.spacing = 1;
		this.shapeSize = 120;	//Math.min(Math.floor(width / roundShape.lineCount), height) - this.spacing * 2;
		this.blockSize = Math.floor((this.shapeSize - this.frameWidth * 2 - this.spacing) / 5) - this.spacing;
	}

	draw(roundSelected) {
		this.clear('black');
		this.selectedShape = [];
		for (var i = 0; i < roundSelected.length; i++) {
			var baseX = this.frameWidth + i * this.shapeSize;
			var baseY = this.frameWidth;
			let shape = roundSelected[i];
			let shapeWidth = getSize(shape.w, this.blockSize, this.spacing);
			let shapeHeight = getSize(shape.h, this.blockSize, this.spacing);
			baseX += Math.floor((this.shapeSize - shapeWidth) / 2);
			baseY += Math.floor((this.shapeSize - shapeHeight) / 2);
			this.drawShape(baseX, baseY, shape);
			this.selectedShape.push(shape);
		}
	}

	getSelectedShape() {
		return this.selectedShape;
	}

	drawShape(x, y, shape) {
		for (var j = 0; j < shape.h; j++) {
			for (var i = 0; i < shape.w; i++) {
				let posX = x + (this.spacing + this.blockSize) * i;
				let posY = y + (this.spacing + this.blockSize) * j;
				if (shape.s[j * shape.w + i])
					this.drawRoundedRect(posX, posY, this.blockSize, this.blockSize, 2, 'green');
			}
		}
	}
}

function getPermutations(arr) {  
    const result = new Set();  
    const used = new Array(arr.length).fill(false);  
    backtrack(arr, used, [], result);  
    return Array.from(result);  
}  
  
function backtrack(arr, used, current, result) {
	if (current.length === arr.length) {
		result.add(JSON.stringify([...current]));
		return;
	}

	for (let i = 0; i < arr.length; i++) {
		if (!used[i]) {
			used[i] = true;
			current.push(arr[i]);
			backtrack(arr, used, current, result);
			used[i] = false;
			current.pop();
		}
	}
}

var xyMap = [];
function initXY() {
	for (let value = 0; value < 512; value++) {
		let divCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
		let divValue = 0;

		let v = value;
		var gapSize = 0;

		for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
			var cellState = v % 2;
			v = Math.floor(v / 2);
			if (cellState && gapSize) {		// === 1 && > 0
				divCount[gapSize]++;
				gapSize = 0;				// reset gap size
			}
			gapSize += !cellState;
		}
		if (gapSize) {
			divCount[gapSize]++;
		}

		for (var key in divCount) {
			divValue += (10 - Number(key)) * divCount[key];
		}
		xyMap.push(divValue);
	}
}
initXY();

var zMap = [];
function initZ() {
	for (let value = 0; value < 512; value++) {
		let divCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
		let divValue = 0;

		var traverseMap;
		var blockSetStates = [[], [], []];

		var v = value;
		for (let i = 8; i >= 0; i--) {
			var cellState = v % 2;
			v = Math.floor(v / 2);
			var row = Math.floor(i / 3);
			var col = i % 3;
			blockSetStates[row][col] = cellState;
		}
		var getMatrixGapCount = function (row, col) {
			let gapCount = 0;

			if (row < GAME_INFO.BOARD_BLOCK_SET_WIDTH
				&& col < GAME_INFO.BOARD_BLOCK_SET_WIDTH
				&& !traverseMap[row * GAME_INFO.BOARD_BLOCK_SET_WIDTH + col]
				&& blockSetStates[row][col]) {

				traverseMap[row * GAME_INFO.BOARD_BLOCK_SET_WIDTH + col] = true;

				gapCount = 1
					+ getMatrixGapCount(row + 1, col)
					+ getMatrixGapCount(row, col + 1);
				//+ getMatrixGapCount( blockSetOffset, row + 1  , col + 1 );        TODO: oriental should be considered later
			}

			return gapCount;
		};

		traverseMap = { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false }; // reset block traverse state
		for (let j = 0; j < GAME_INFO.BOARD_BLOCK_SET_WIDTH; j++) {
			for (let i = 0; i < GAME_INFO.BOARD_BLOCK_SET_WIDTH; i++) {
				let gapSize = getMatrixGapCount(j, i);
				if (gapSize) {
					divCount[gapSize]++
				}
			}
		}

		for (var key in divCount) {
			divValue += (10 - Number(key)) * divCount[key];
		}

		zMap.push(divValue);
	}
}
initZ();
class slover {
	constructor() {
		this.board = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0]];
	}

	clone() {
		var newSolver = new slover();
		for (var i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
			newSolver.board[i] = this.board[i].slice();
		}
		return newSolver;
	}
	canEliminateRow(row) {
		for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
			if (this.board[row][i] === 0) return false;
		}
		return true;
	}

	canEliminateCol(col) {
		for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
			if (this.board[i][col] === 0) return false;
		}
		return true;
	}

	canEliminateBlock(blockRow, blockCol) {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (this.board[blockRow + i][blockCol + j] === 0) return false;
			}
		}
		return true;
	}

	canEliminateBlockSet(blockSetIndex) {
		blockSetIndex = Number(blockSetIndex);
		let blockCol = blockSetIndex % GAME_INFO.BOARD_BLOCK_SET_WIDTH * GAME_INFO.BOARD_BLOCK_SET_WIDTH;
		let blockRow = Math.floor(blockSetIndex / GAME_INFO.BOARD_BLOCK_SET_WIDTH) * GAME_INFO.BOARD_BLOCK_SET_WIDTH;
		return this.canEliminateBlock(blockRow, blockCol);
	}

	// 检查并消除行、列或3x3块  
	checkAndEliminate() {
		var eliminateBlocks = new Array();
		var eliminateCount = 0;
		for (let row = 0; row < GAME_INFO.BOARD_SIZE_BLOCK; row++) {
			if (this.canEliminateRow(row)) {
				for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
					//board[row][i] = 0;
					eliminateBlocks.push([row, i]);
				}
				eliminateCount++;
			}
		}

		for (let col = 0; col < GAME_INFO.BOARD_SIZE_BLOCK; col++) {
			if (this.canEliminateCol(col)) {
				for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
					//board[i][col] = 0;
					eliminateBlocks.push([i, col]);
				}
				eliminateCount++;
			}
		}

		for (let blockRow = 0; blockRow < GAME_INFO.BOARD_SIZE_BLOCK; blockRow += 3) {
			for (let blockCol = 0; blockCol < GAME_INFO.BOARD_SIZE_BLOCK; blockCol += 3) {
				if (this.canEliminateBlock(blockRow, blockCol)) {
					for (let i = 0; i < 3; i++) {
						for (let j = 0; j < 3; j++) {
							this.board[blockRow + i][blockCol + j] = 0;	// 块和块之间没有重叠区域，因此可以直接消除
							//eliminateBlocks.push([blockRow + i, blockCol + j]);
						}
					}
					eliminateCount++;
				}
			}
		}

		// 消除记录的可消除的行和列
		for (let e of eliminateBlocks) {
			this.board[e[0]][e[1]] = 0;
		}

		return eliminateCount;
	};

	canPutAt(x, y, shape) {
		for (var row = 0; row < shape.h; row++) {
			for (var col = 0; col < shape.w; col++) {
				let boardBlock = this.board[row + y][col + x];
				let shapeBlock = shape.s[row * shape.w + col];
				if (boardBlock === 1 && shapeBlock === 1)
					return false;
			}
		}
		return true;
	}

	putAt(x, y, shape) {
		for (var row = 0; row < shape.h; row++) {
			for (var col = 0; col < shape.w; col++) {
				this.board[row + y][col + x] |= shape.s[row * shape.w + col];
			}
		}
	}

	getBlockSet_fast(blockSetIndex) {
		blockSetIndex = Number(blockSetIndex);
		let result = 0;
		let x = blockSetIndex % GAME_INFO.BOARD_BLOCK_SET_WIDTH * GAME_INFO.BOARD_BLOCK_SET_WIDTH;
		let y = Math.floor(blockSetIndex / GAME_INFO.BOARD_BLOCK_SET_WIDTH) * GAME_INFO.BOARD_BLOCK_SET_WIDTH;

		for (let j = 0; j < GAME_INFO.BOARD_BLOCK_SET_WIDTH; j++) {
			var row = j + y;
			for (let i = 0; i < GAME_INFO.BOARD_BLOCK_SET_WIDTH; i++) {
				result = result * 2 + this.board[row][i + x];
			}
		}
		return result;
	}

	getBlockSet(blockSetIndex) {
		blockSetIndex = Number(blockSetIndex);
		let resultSet = {};
		let blockSetOffset = {
			x: blockSetIndex % GAME_INFO.BOARD_BLOCK_SET_WIDTH * GAME_INFO.BOARD_BLOCK_SET_WIDTH,
			y: Math.floor(blockSetIndex / GAME_INFO.BOARD_BLOCK_SET_WIDTH) * GAME_INFO.BOARD_BLOCK_SET_WIDTH
		};

		for (let j = 0; j < GAME_INFO.BOARD_BLOCK_SET_WIDTH; j++) {
			var row = j + blockSetOffset.y;
			if (resultSet[row] === undefined) {
				resultSet[row] = {};
			}
			for (let i = 0; i < GAME_INFO.BOARD_BLOCK_SET_WIDTH; i++) {
				var col = i + blockSetOffset.x;
				resultSet[row][col] = this.board[row][col];
			}
		}
		return resultSet;
	}


	getX_fast() {
		let divValue = 0;

		for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
			var key = 0;
			for (let j = 0; j < GAME_INFO.BOARD_SIZE_BLOCK; j++) {
				key = key * 2 + this.board[j][i];
			}
			divValue += xyMap[key];
		}
		divValue /= GAME_INFO.BOARD_SIZE_BLOCK * 45;   // normalise the value according to the worst case value ( 9 * 45 )
		divValue = Math.round(divValue * 100) / 100;  // 2 decimal precision

		return divValue;
	}
	// X: avg sparsity of cols  // column integrity
	getX() {
		let resultSet = {
			divCount: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
			divValue: 0
		};

		for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
			var gapSize = 0;
			for (let j = 0; j < GAME_INFO.BOARD_SIZE_BLOCK; j++) {
				var cellState = this.board[j][i];
				if (cellState && gapSize) { // === 1 && > 0
					resultSet.divCount[gapSize]++;
					gapSize = 0;    // reset gap size
				}
				gapSize += !cellState;
			}
			if (gapSize) {
				resultSet.divCount[gapSize]++;
			}
		}

		for (var key in resultSet.divCount) {
			resultSet.divValue += (10 - Number(key)) * resultSet.divCount[key];
		}

		resultSet.divValue /= GAME_INFO.BOARD_SIZE_BLOCK * 45;   // normalise the value according to the worst case value ( 9 * 45 )
		resultSet.divValue = Math.round(resultSet.divValue * 100) / 100;  // 2 decimal precision

		return resultSet;
	}

	// Y: avg sparsity of rows // row integrity
	getY_fast() {
		let divValue = 0;

		for (let j = 0; j < GAME_INFO.BOARD_SIZE_BLOCK; j++) {
			var key = 0;
			for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
				key = key * 2 + this.board[j][i];
			}
			divValue += xyMap[key];
		}
		divValue /= GAME_INFO.BOARD_SIZE_BLOCK * 45;   // normalise the value according to the worst case value ( 9 * 45 )
		divValue = Math.round(divValue * 100) / 100;  // 2 decimal precision

		return divValue;
	}
	getY() {
		let resultSet = {
			divCount: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
			divValue: 0
		};

		for (let j = 0; j < GAME_INFO.BOARD_SIZE_BLOCK; j++) {
			var gapSize = 0;
			for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
				var cellState = this.board[j][i];
				if (cellState && gapSize) { // === 1 && > 0
					resultSet.divCount[gapSize]++;
					gapSize = 0;    // reset gap size
				}
				gapSize += !cellState;
			}
			if (gapSize) {
				resultSet.divCount[gapSize]++;
			}
		}

		for (var key in resultSet.divCount) {
			resultSet.divValue += (10 - Number(key)) * resultSet.divCount[key];
		}

		resultSet.divValue /= GAME_INFO.BOARD_SIZE_BLOCK * 45;   // normalise the value according to the worst case value ( 9 * 45 )
		resultSet.divValue = Math.round(resultSet.divValue * 100) / 100;  // 2 decimal precision

		return resultSet;
	}

	// Z: avg sparsity of 9-blocks // 9 sets integrity
	getZ_fast() {
		let divValue = 0;

		for (let index = 0; index < GAME_INFO.BOARD_SIZE_BLOCK; index++) {
			var blockSetStates = this.getBlockSet_fast(index);
			divValue += zMap[blockSetStates];
		}

		divValue /= GAME_INFO.BOARD_SIZE_BLOCK * 45;   // normalise the value according to the worst case value ( 9 * 45 )
		divValue = Math.round(divValue * 100) / 100;  // 2 decimal precision

		return divValue;
	}
	getZ() {
		let resultSet = {
			divCount: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
			divValue: 0
		};

		var traverseMap;
		var blockSetStates;

		var getMatrixGapCount = function (blockSetOffset, row, col) {
			let gapCount = 0;

			if (row < GAME_INFO.BOARD_BLOCK_SET_WIDTH
				&& col < GAME_INFO.BOARD_BLOCK_SET_WIDTH
				&& !traverseMap[row * GAME_INFO.BOARD_BLOCK_SET_WIDTH + col]
				&& blockSetStates[row + blockSetOffset.y][col + blockSetOffset.x]) {

				traverseMap[row * GAME_INFO.BOARD_BLOCK_SET_WIDTH + col] = true;

				gapCount = 1
					+ getMatrixGapCount(blockSetOffset, row + 1, col)
					+ getMatrixGapCount(blockSetOffset, row, col + 1);
				//+ getMatrixGapCount( blockSetOffset, row + 1  , col + 1 );        TODO: oriental should be considered later
			}

			return gapCount;
		};

		for (let index = 0; index < GAME_INFO.BOARD_SIZE_BLOCK; index++) {
			traverseMap = { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false }; // reset block traverse state
			blockSetStates = this.getBlockSet(index);
			for (let j = 0; j < GAME_INFO.BOARD_BLOCK_SET_WIDTH; j++) {
				for (let i = 0; i < GAME_INFO.BOARD_BLOCK_SET_WIDTH; i++) {
					let gapSize = getMatrixGapCount(
						{
							x: (index % GAME_INFO.BOARD_BLOCK_SET_WIDTH) * GAME_INFO.BOARD_BLOCK_SET_WIDTH,
							y: Math.floor(index / GAME_INFO.BOARD_BLOCK_SET_WIDTH) * GAME_INFO.BOARD_BLOCK_SET_WIDTH
						},
						j, i
					);
					if (gapSize) {
						resultSet.divCount[gapSize]++
					}
				}
			}
		}

		for (var key in resultSet.divCount) {
			resultSet.divValue += (10 - Number(key)) * resultSet.divCount[key];
		}

		resultSet.divValue /= GAME_INFO.BOARD_SIZE_BLOCK * 45;   // normalise the value according to the worst case value ( 9 * 45 )
		resultSet.divValue = Math.round(resultSet.divValue * 100) / 100;  // 2 decimal precision

		return resultSet;
	}

	// W: total occupation (%) // occupation percentage
	getW() {
		let result = 0;

		for (let j = 0; j < GAME_INFO.BOARD_SIZE_BLOCK; j++) {
			for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
				result += this.board[j][i];
			}
		}
		result /= Math.pow(GAME_INFO.BOARD_SIZE_BLOCK, 2);    // normalise the value according to the worst case value ( 9 * 9 )
		return Math.round(result * 100) / 100;  // 2 decimal precision
	}

	// T: row/col/blockSet completeness (%) // occupation on sets (row / col / blockSet)
	getT() {
		let result = 0;


		for (let index = 0; index < GAME_INFO.BOARD_SIZE_BLOCK; index++) {
			// blockSet
			result += this.canEliminateBlockSet(index) ? 1 : 0;
			// row
			result += this.canEliminateRow(index) ? 1 : 0;
			// col
			result += this.canEliminateCol(index) ? 1 : 0;
		}

		result /= 3 * GAME_INFO.BOARD_SIZE_BLOCK;    // normalise the value according to the best case value ( 9 * 9 )
		return Math.round(result * 100) / 100;  // 2 decimal precision
	}

	// S: board total integrity (%)
	getS() {
		let resultSet = {
			divCount: {},  // { 1: 0, 2: 0 .. 80: 0, 81: 0 }; to be initialised ahead
			divValue: 0
		};

		var traverseMap = [];   // [ 0: false, 1: false, .. 79: false, 80: false ]; to be initialised ahead

		for (let index = 0; index < GAME_INFO.BOARD_SIZE_BLOCK * GAME_INFO.BOARD_SIZE_BLOCK; index++) {
			resultSet.divCount[(index + 1)] = 0;    // set initial count of gaps to zero
			traverseMap.push(false);          // set default block traverse state to 'false'
		}

		var getMatrixGapCount = function (board, x, y) {
			let gapCount = 0;
			let cellIndex = y * GAME_INFO.BOARD_SIZE_BLOCK + x;

			if (y < GAME_INFO.BOARD_SIZE_BLOCK
				&& x < GAME_INFO.BOARD_SIZE_BLOCK
				&& !traverseMap[cellIndex]
				&& board[y][x]) {

				traverseMap[cellIndex] = true;

				gapCount = 1    // add current cell state
					+ getMatrixGapCount(board, x + 1, y)
					+ getMatrixGapCount(board, x, y + 1)
					+ getMatrixGapCount(board, x + 1, y + 1);        // TODO: oriental should be considered later
			}

			return gapCount;
		};

		for (let index = 0; index < GAME_INFO.BOARD_SIZE_BLOCK * GAME_INFO.BOARD_SIZE_BLOCK; index++) {
			let gapSize = getMatrixGapCount(this.board, index % GAME_INFO.BOARD_SIZE_BLOCK, Math.floor(index / GAME_INFO.BOARD_SIZE_BLOCK));
			if (gapSize) {
				resultSet.divCount[gapSize]++
			}
		}

		for (var key in resultSet.divCount) {
			resultSet.divValue += ((GAME_INFO.BOARD_SIZE_BLOCK * GAME_INFO.BOARD_SIZE_BLOCK + 1) - Number(key)) * resultSet.divCount[key];
		}

		resultSet.divValue /= GAME_INFO.BOARD_SIZE_BLOCK * GAME_INFO.BOARD_SIZE_BLOCK * 45;   // normalise the value according to the worst case value ( 81 * 45 )
		resultSet.divValue = Math.round(resultSet.divValue * 100) / 100;  // 2 decimal precision

		return resultSet;
	}

	chromosome = {
		a: 5.44,
		b: 6.17,
		c: 5.85,
		d: 3.9,
		e: -5.37,
		f: 3.53,
		g: -5.76,
		h: -0.66,
	};

	evaluateStatus() {
		//let slow = this.getZ().divValue;
		//let fast = this.getZ_fast();
		//if (slow !== fast) {
		//	let stop = 3;
		//}
		let score = this.chromosome.a * this.getX_fast() //this.getX().divValue
			+ this.chromosome.b * this.getY_fast()	//this.getY().divValue
			+ this.chromosome.c * this.getZ_fast();	// this.getZ().divValue
			+ this.chromosome.d * this.getW()
			//+ this.chromosome.e * getOccupationOfElement(element)
			+ this.chromosome.f
			+ this.chromosome.g * this.getT()
			+ this.chromosome.h * this.getS().divValue;
		return Math.abs(score);
	}
}

function bestSolutionCheck(bestSolution, solution, solver) {
	if ((bestSolution.step.length === 0) ||
		(solution.score > bestSolution.score) ||
		(solution.score === bestSolution.score && solution.strik > bestSolution.strik)) {
		Object.assign(bestSolution, solution);
		bestSolution.statusScore = solver.evaluateStatus();
	}
	else if (solution.score === bestSolution.score && solution.strik === bestSolution.strik) {
		let statusScore = solver.evaluateStatus();
		if (bestSolution.statusScore > statusScore) {
			Object.assign(bestSolution, solution);
			bestSolution.statusScore = statusScore;
		}
	}
}

function GetScore(shape, eliminationCount, strik) {
	const score = [0, 18, 42, 66, 90, 114, 132, 150, 168];

	if (eliminationCount > 0)
		return shape.score + score[eliminationCount] + strik * 5;
	else
		return shape.score;
}

function clone(obj) {
	var o;
	if (typeof obj === "object") {
		if (obj === null) {
			o = null;
		}
		else {
			if (obj instanceof Array) {
				o = [];
				for (var i = 0, len = obj.length; i < len; i++) {
					o.push(clone(obj[i]));
				}
			}
			else {
				o = Object.create(obj);
				for (var j in obj) {
					o[j] = clone(obj[j]);
				}
			}
		}
	}
	else {
		o = obj;
	}
	return o;
}

//solution = {step: [{x, y, shape},], strik, score, statusScore];
function cloneSolution(solution) {
	return { step: solution.step.slice(), strik: solution.strik, score: solution.score, statusScore: solution.statusScore };
}
function dfs(solver, shapes, index, bestSolution, solution) {
	// 如果所有形状都已放置，更新最优解  
	if (index === shapes.length) {
		bestSolutionCheck(bestSolution, solution, solver);
		return;
	}

	const shape = shapes[index];

	// 遍历所有可能的放置位置  
	for (let row = 0; row <= 9 - shape.h; row++) {
		for (let col = 0; col <= 9 - shape.w; col++) {
			// 如果形状可以放置  
			if (solver.canPutAt(col, row, shape)) {
				// 放置形状  
				let newSolver = solver.clone(); //clone(solver);
				newSolver.putAt(col, row, shape);
				let eliminationCount = newSolver.checkAndEliminate();
				let nextStrik = eliminationCount > 0 ? solution.strik + 1 : 0;
				let newSolution = cloneSolution(solution);	// clone(solution);
				newSolution.step.push({ x: col, y: row, shape: shape });
				newSolution.strik = nextStrik;
				newSolution.score += GetScore(shape, eliminationCount, solution.strik);
				// 递归放置下一个形状  
				dfs(newSolver, shapes, index + 1, bestSolution, newSolution);
			}
		}
	}
}

function putShapes(solver, shapes, bestSolution) {
	if (shapes.length !== 3)
		return false;

	var solution = clone(bestSolution);

	const allPosiblePutSeq = getPermutations(shapes);
	for (let value of allPosiblePutSeq) {
		let shapes = JSON.parse(value);
		dfs(solver, shapes, 0, bestSolution, clone(solution));	// 这里是各种调用顺序的搜索，因此每次调用dfs，solution需要恢复到最初状态
	}
	return true;
}
