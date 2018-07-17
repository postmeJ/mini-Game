class CellManager {
    /** 所有cell数组 */
    public static cellArray: Cell[][] = []
    /** 清理cell的队列 */
    public static cleanList: Cell[] = []
    /** 临时存放line的数组 */
    public static lineArray: eui.Image[] = []

    /** 清空cellArray数组,重置cellArray所有元素为null */
    public static cleanCellArray() {
        /** 行列 [[],[],[]] */
        this.cellArray = []
        for (var i = 0; i < GameConfig.row; i++) {
            this.cellArray.push([])
            for (var j = 0; j < GameConfig.column; j++) {
                this.cellArray[i].push(null)
            }
        }
    }

    /** 产生一个cellId */
    public static genDropCellId() {
        // let idArr = [1, 2, 3, 4, 5]
        // let i = Math.floor(Math.random() * idArr.length)
        // return idArr[i]
        return Math.floor(Math.random() * 5) + 1
    }

    /** 查找配置文件,获得对应的列和行的数据 */
    /** y,x */
    public static genInitCellId(row, column) {
        if (row >= GameConfig.row) {
            console.error('[CellManager] 超过最大行的限制')
            return
        }
        if (column >= GameConfig.column) {
            console.error('[CellManager] 超过最大列的限制')
            return
        }

        let json = RES.getRes('gameCellCfg_json')
        let arr = json[1]
        return arr[row][column]
    }

    /** 移除所有cell的action */
    public static removeAllCellAction() {
        for (var k in this.cellArray) {
            for (var j in this.cellArray[k]) {
                var item: Cell = this.cellArray[k][j];
                if (item) {
                    egret.Tween.removeTweens(item);
                    item.scaleX = item.scaleY = 1;
                }
            }
        }
    }

    /** 设置所有cell的检测状态 */
    public static setAllCellCheckFlag(b: boolean) {
        for (var k in this.cellArray) {
            for (var j in this.cellArray[k]) {
                var item: Cell = this.cellArray[k][j];
                if (item) {
                    item.checkFlag = b;
                }
            }
        }
    }

    public static getNowCleanListNum() {
        var arr = []
        for (var k in this.cellArray) {
            for (var j in this.cellArray[k]) {
                let item: Cell = this.cellArray[k][j]
                if (item && item.checkFlag == false) {
                    // sameArr的开头item是有数据的,checkFlag为false的状态
                    let sameArr = [item]
                    this.getSameArrByCell(item, sameArr)
                    // sameArr的>=3个点的时候,才认为是可清除的数组
                    if (sameArr.length >= GameConfig.baseCleanNum) {
                        arr.push(sameArr)
                    }
                }
            }
        }
    }

    /** 循环检查所有点开始的,可连接的点 */
    public static getSameArrByCell(cell: Cell, sameArray) {
        var row = cell.row;
        var column = cell.column;
        var id = cell.id;
        cell.checkFlag = true;

        //  判断左边cell
        var leftRow = row;
        var leftColumn = column - 1;
        if (leftColumn >= 0) {
            var leftCell = this.cellArray[leftRow][leftColumn];
            if (leftCell.id == id && leftCell.checkFlag == false) {
                leftCell.checkFlag = true;
                this.getSameArrByCell(leftCell, sameArray);
                sameArray.push(leftCell);
            }
        }

        // 判断右边
        var rightRow = row;
        var rightColumn = column + 1;
        if (rightColumn < GameConfig.column) {
            var rightCell = this.cellArray[rightRow][rightColumn];
            if (rightCell.id == id && rightCell.checkFlag == false) {
                rightCell.checkFlag = true;
                this.getSameArrByCell(rightCell, sameArray);
                sameArray.push(rightCell);
            }
        }

        // 判断下边
        var bottomRow = row + 1;
        var bottomColumn = column;
        if (bottomRow < GameConfig.row) {
            var bottomCell = this.cellArray[bottomRow][bottomColumn];
            if (bottomCell.id == id && bottomCell.checkFlag == false) {
                bottomCell.checkFlag = true;
                this.getSameArrByCell(bottomCell, sameArray);
                sameArray.push(bottomCell);
            }
        }

        // 判断上边
        var topRow = row - 1;
        var topColumn = column;
        if (topRow >= 0) {
            var topCell = this.cellArray[topRow][topColumn];
            if (topCell.id == id && topCell.checkFlag == false) {
                topCell.checkFlag = true;
                this.getSameArrByCell(topCell, sameArray);
                sameArray.push(topCell);
            }
        }
    }

    /** 对应的Cell,修改cellArray对应列行的指向为该cell */
    public static setCell(cell: Cell, row, column) {
        // 先清空原来位置的cell指向
        let cellRow = cell.row
        let cellColumn = cell.column
        this.cellArray[cellRow][cellColumn] = null

        // 设置新的指向
        cell.row = row
        cell.column = column
        this.cellArray[row][column] = cell
    }

    /** 将传入的cell对应的cellArray为null */
    public static cleanCell(cell: Cell) {
        var row = cell.row;
        var column = cell.column;
        this.cellArray[row][column] = null;
    }

    /** 获得cell对应的x位置 */
    public static getCellPosX(column) {
        var halfWidth = Cell.CellWidth / 2;
        var x = column * (Cell.CellWidth + GameConfig.columnSpace) + halfWidth;
        return x;
    }

    /** 获得cell对应的y位置 */
    public static getCellPosY(row) {
        var halfHeight = Cell.CellHeight / 2;
        var y = row * (Cell.CellHeight + GameConfig.rowSpace) + halfHeight;
        return y;
    }

    /** 获得当前被触碰的cell */
    public static getTouchCell(x, y) {
        for (var k in this.cellArray) {
            var itemLineArr = this.cellArray[k];
            for (var j in itemLineArr) {
                var item = itemLineArr[j];
                if (item) {
                    var b = item.hitTestPoint(x, y);
                    if (b) {
                        return item;
                    }
                }
            }
        }
        return null;
    }

    /** 获得cleanList的第一个cell点 */
    public static getCleanListID() {
        if (this.cleanList.length > 0) {
            var cell: Cell = this.cleanList[0];
            return cell.id;
        }
        return 0;
    }

    /** 该点是否再cleanList最后一点的周围 */
    public static isInAround(cell: Cell) {
        var row = cell.row;
        var column = cell.column;
        var len = this.cleanList.length;
        if (len > 0) {
            var item: Cell = this.cleanList[len - 1];
            var itemRow = item.row;
            var itemColumn = item.column;
            if (itemRow == row + 1 || itemRow == row - 1 || itemRow == row) {
                if (itemColumn == column + 1 || itemColumn == column - 1 || itemColumn == column) {
                    return true;
                }
            }
        }
        return false;
    }

    // 这个cell是否是倒数第二个
    public static getIsLastTwoInCleanList(cell: Cell) {
        var length = this.cleanList.length;
        if (length >= 2) {
            var index = length - 2;
            var item: Cell = this.cleanList[index];
            if (item == cell) {
                return true;
            }
        }
        return false;
    }

    /** 移除cleanList最顶的元素 */
    public static removeTopItemInCleanList() {
        var length = this.cleanList.length;
        if (length > 0) {
            var topItem = this.cleanList[length - 1];
            Util.removeByElements(this.cleanList, topItem);
            return topItem;
        }
    }

    // 是否有cell在move
    public static isAllMove() {
        for (var k in this.cellArray) {
            var itemArr = this.cellArray[k];
            for (var j in itemArr) {
                var item: Cell = itemArr[j];

                if (item && item.moveFlag == true) {
                    return true;
                }
            }
        }
        return false;
    }

    // 获取空的cell
    public static getEmptyCell() {
        var retArr = [];
        for (var i = GameConfig.row - 1; i >= 0; i--) {
            for (var j = 0; j < GameConfig.column; j++) {
                var item: Cell = CellManager.cellArray[i][j];
                if (item == null) {
                    var p = { row: i, column: j };
                    retArr.push(p);
                }
            }
        }
        return retArr;
    }

    /** 获得cell为null的行列 */
    public static getDropRowAndColumn(cell: Cell) {
        var row = cell.row;
        var column = cell.column;
        var ret = { row: row, column: column };

        row++;
        while (row < GameConfig.row) {
            var item = this.cellArray[row][column];
            if (item == null) {
                ret.row++;
                row++;
            } else {
                break;
            }
        }
        return ret;
    }

    /** 删除最后一条线 */
    public static removeTopLine() {
        let length = this.lineArray.length
        if (length > 0) {
            let lineItem = this.lineArray[length - 1]
            Util.removeByElements(this.lineArray, lineItem)
            if (lineItem.parent) {
                lineItem.parent.removeChild(lineItem)
            }
        }
    }
}