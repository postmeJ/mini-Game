class GameScene extends egret.DisplayObjectContainer {
    private linePanel: egret.Sprite
    private cellPanel: egret.Sprite
    private pointLine: eui.Image
    private pointLineBeganCell: Cell

    private state: GameState = GameState.Play

    private toBottom: number = 250;// 距离底部的距离
    private btn: eui.Button;
    private UILayer: GameUI;
    private map: tiled.TMXTilemap = null;

    private cleanIndex: number = 0
    constructor() {
        super()

        this.UILayer = new GameUI()
        this.addChild(this.UILayer)

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this)
        this.onLoadMap()
    }

    private onLoadMap() {
        let url: string = "resource/fruit-juice-world/tmx/map1.tmx";
        let urlLoader: egret.URLLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        urlLoader.addEventListener(egret.Event.COMPLETE, (event: egret.Event): void => {
            let data: any = egret.XML.parse(event.target.data);
            this.map = new tiled.TMXTilemap(2000, 2000, data, url);
            this.map.render();
            this.map.addEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, this.onLoaded, this);
            this.addChildAt(this.map, 1);
        }, this);
        urlLoader.load(new egret.URLRequest(url));
    }

    // private onLoaded() {
    //     if (this.map) {
    //         this.map.visible = true
    //         this.map.scaleX = this.map.scaleY = 8 / 9
    //     }
    // }

    private onLoaded() {
        if (this.map) {
            this.map.visible = true;
            this.map.scaleX = this.map.scaleY = 8 / 9;
        }
    }

    private onAddStage() {
        this.initStage()
        this.initLinePanel()
        this.initCellPanel()
        this.initCell()

        this.addChildAt(this.UILayer, 1000)
    }

    private initStage() {
        var bg = new egret.Sprite();
        bg.name = "stageBg";
        bg.graphics.beginFill(0x999999, 0.8);
        bg.graphics.drawRect(0, 0, Display.winSize.width, Display.winSize.height);
        bg.graphics.endFill();
        bg.visible = false;
        this.addChild(bg);
    }


    private initLinePanel() {
        this.linePanel = new egret.Sprite();
        this.linePanel.name = "linePanel";
        this.linePanel.width = GameConfig.column * Cell.CellWidth + (GameConfig.column - 1) * GameConfig.columnSpace;
        this.linePanel.height = GameConfig.row * Cell.CellHeight + (GameConfig.row - 1) * GameConfig.rowSpace;
        this.linePanel.anchorOffsetX = this.linePanel.width / 2;
        this.linePanel.anchorOffsetY = this.linePanel.height;
        this.linePanel.x = Display.winSize.cx;
        this.linePanel.y = Display.winSize.height - this.toBottom;

        this.linePanel.graphics.beginFill(0x00ff00, 0);
        this.linePanel.graphics.drawRect(0, 0, this.linePanel.width, this.linePanel.height);
        this.linePanel.graphics.endFill();


        this.addChild(this.linePanel);
    }

    private initCellPanel() {
        this.cellPanel = new egret.Sprite();
        this.cellPanel.name = "cellPanel";
        this.cellPanel.width = GameConfig.column * Cell.CellWidth + (GameConfig.column - 1) * GameConfig.columnSpace;
        this.cellPanel.height = GameConfig.row * Cell.CellHeight + (GameConfig.row - 1) * GameConfig.rowSpace;
        this.cellPanel.anchorOffsetX = this.cellPanel.width / 2;
        this.cellPanel.anchorOffsetY = this.cellPanel.height;
        this.cellPanel.x = Display.winSize.cx;
        this.cellPanel.y = Display.winSize.height - this.toBottom;

        //this.cellPanel.graphics.beginFill(0x0000ff, 0.5);
        //this.cellPanel.graphics.drawRect(0, 0, this.cellPanel.width, this.cellPanel.height);
        //this.cellPanel.graphics.endFill();

        var rect = new eui.Rect(this.cellPanel.width, this.cellPanel.height, 0x0000ff);
        rect.alpha = 0;
        this.cellPanel.addChild(rect);

        this.cellPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegan, this);
        this.cellPanel.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.cellPanel.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.cellPanel.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSide, this);
        this.addChild(this.cellPanel);
    }

    private initCell() {
        CellManager.cleanList = [];
        CellManager.cleanCellArray();
        for (var i = 0; i < GameConfig.row; i++) {
            for (var j = 0; j < GameConfig.column; j++) {
                var id = CellManager.genInitCellId(i, j);
                var cell: Cell = this.createCell(i, j, id);
                cell.x = CellManager.getCellPosX(j);
                cell.y = CellManager.getCellPosY(i);
            }
        }
    }

    private createCell(row, column, id): Cell {
        var cell = new Cell(id);
        cell.row = row;
        cell.column = column;
        // test
        // cell.addEventListener(GameEvent.CleanOver, this.cleanOneByeOne, this);
        // cell.addEventListener(GameEvent.DropOver, this.onDropOver, this);
        CellManager.cellArray[row][column] = cell;
        this.cellPanel.addChild(cell);
        return cell;
    }

    private onBegan(e: egret.TouchEvent) {
        if (this.state === GameState.Play) {
            this.deleteCleanList()
            let x = e.stageX
            let y = e.stageY
            /** 我们就可以得知是哪个cell被点击 */
            let cell: Cell = CellManager.getTouchCell(x, y)
            if (cell) {
                cell.setSelect(true)
                this.pushCleanCell(cell)

                egret.log("row: " + cell.row + ", column: " + cell.column);

                // 提示线
                var point = new egret.Point(cell.x, cell.y);
                this.createPointLine(point);
                this.pointLineBeganCell = cell;
            }
        }
    }

    /** 清空cleanList */
    private deleteCleanList() {
        CellManager.cleanList = [];
        CellManager.lineArray = [];
        this.cleanIndex = 0;
    }

    /** 添加点,并且开始画线 */
    private pushCleanCell(cell) {
        CellManager.cleanList.push(cell);
        var length = CellManager.cleanList.length;
        if (length > 1) {
            var fromCell = CellManager.cleanList[length - 2];

            // 上一个点到现在最后一个点
            this.drawLine(fromCell, cell);
            // 提示线更新起点
        }
    }

    /**
     * 画线
     * 修改x,y,width,angle
     * @param fromCell 
     * @param toCell
     */
    private drawLine(fromCell: Cell, toCell: Cell) {
        let lineTexture: egret.Texture = RES.getRes('line_png')
        let line = new eui.Image()
        line.texture = lineTexture
        line.anchorOffsetX = 0
        line.anchorOffsetY = lineTexture.textureHeight / 2

        this.linePanel.addChild(line)
        CellManager.lineArray.push(line)

        // x,y
        line.x = fromCell.x
        line.y = fromCell.y

        // width
        let fromPoint: egret.Point = new egret.Point(fromCell.x, fromCell.y)
        let toPoint: egret.Point = new egret.Point(toCell.x, toCell.y)
        let distance = egret.Point.distance(fromPoint, toPoint)
        line.width = distance

        // angle
        let angle = this.getAngle(fromPoint, toPoint);
        line.rotation = angle;
    }

    /**
     * 获取角度,范围[0, 360]
     */
    private getAngle(beganPoint: egret.Point, endPoint: egret.Point) {
        let x = endPoint.x - beganPoint.x;
        let y = Math.abs(endPoint.y - beganPoint.y);
        let z = egret.Point.distance(beganPoint, endPoint);
        let a = Math.round(Math.asin(y / z) / Math.PI * 180);

        if (beganPoint.x > endPoint.x) { // 2,3 象限
            if (beganPoint.y > endPoint.y) { // 2
                a = a + 180;
            } else if (beganPoint.y < endPoint.y) { // 3
                a = 180 - a;
            } else if (beganPoint.y == endPoint.y) {
                a = 180;
            }
        } else if (beganPoint.x < endPoint.x) { // 1,4 象限
            if (beganPoint.y > endPoint.y) { // 1
                a = 360 - a;
            } else if (beganPoint.y < endPoint.y) { // 4
                a = a;
            } else if (beganPoint.y == endPoint.y) {
                a = 0;
            }
        } else if (beganPoint.x == endPoint.x) {
            if (beganPoint.y > endPoint.y) {
                a = 270;
            } else if (beganPoint.y < endPoint.y) {
                a = 90;
            }
        }
        return a;
    }

    /** 创建提示线 */
    private createPointLine(p: egret.Point) {
        if (this.pointLine && this.pointLine.parent) {
            this.pointLine.parent.removeChild(this.pointLine)
        }

        this.pointLine = new eui.Image()
        this.pointLine.texture = RES.getRes('line_png')
        this.pointLine.width = 0
        this.pointLine.anchorOffsetX = 0
        this.pointLine.anchorOffsetY = this.pointLine.height / 2
        this.pointLine.x = p.x
        this.pointLine.y = p.y
        this.linePanel.addChild(this.pointLine)
    }

    private onMove(e: egret.TouchEvent) {
        if (this.state == GameState.Play) {
            let x = e.stageX
            let y = e.stageY
            this.updatePointLineEnd(x, y)

            let cell: Cell = CellManager.getTouchCell(x, y)
            if (cell) {
                // 倒一倒二要回退
                if (cell.isSelected) {
                    let b = CellManager.getIsLastTwoInCleanList(cell)
                    if (b) {
                        CellManager.removeTopLine()

                        let topItem = CellManager.removeTopItemInCleanList()
                        topItem.setSelect(false)

                        this.updatePointLineBegan(x, y)
                    }
                }
                else {
                    let sameId = CellManager.getCleanListID()
                    let isAround = CellManager.isInAround(cell)
                    if (cell.id === sameId && isAround) {
                        cell.setSelect(true)
                        this.pushCleanCell(cell)
                        this.updatePointLineBegan(x, y)
                    }
                }
            }
        }
    }

    private onEnd() {
        let listLength = CellManager.cleanList.length
        if (listLength >= GameConfig.baseCleanNum) {
            if (this.state == GameState.Play) {
                this.state = GameState.DealLogic
                this.cleanOneByOne()
            }
        }

        /** cleanList是数组 */
        for (let k in CellManager.cleanList) {
            let item: Cell = CellManager.cleanList[k]
            item.setSelect(false)
        }

        this.cleanAllLine()
    }

    private cleanAllLine() {
        this.linePanel.removeChildren()
    }

    private cleanOneByeOne() {
        var len = CellManager.cleanList.length;
        // 清理完毕
        if (len == 0) {
            this.deleteCleanList();
            this.dropAndFillCell();
        }
        // 清除下一个
        else {
            var item: Cell = CellManager.cleanList[0];
            this.createDirtyAndScore(item);
            item.clean();

            SoundsManager.playRemoveCellMusic(this.cleanIndex);
            this.cleanIndex++;
        }
    }

    private createDirtyAndScore(cell: Cell) {
        let dirtyArr = ["apple_png", "blueberry_png",
            "mangosteen_png", "lemon_png", "watermelon_png"];
        let id = cell.id;

        let dirty = new eui.Image(dirtyArr[id - 1]);
        let texture = RES.getRes(dirtyArr[id - 1]);
        dirty.anchorOffsetX = texture.textureWidth / 2;
        dirty.anchorOffsetY = texture.textureHeight / 2;
        dirty.x = cell.x;
        dirty.y = cell.y;
        dirty.scaleX = dirty.scaleY = 0;
        dirty.rotation = Math.random() * 360;
        this.cellPanel.addChild(dirty);

        let tw = egret.Tween.get(dirty);
        tw.to({ scaleX: 1.2, scaleY: 1.2 }, 400, egret.Ease.bounceOut)
            .wait(200)
            .to({ alpha: 0 }, 100)
            .call(function (node) {
                if (node && node.parent) {
                    node.parent.removeChild(node);
                }
            }, this, [dirty]);

    }
}   