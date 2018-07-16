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

                //提示线
                var point = new egret.Point(cell.x, cell.y);
                this.createPointLine(point);
                this.pointLineBeganCell = cell;
            }
        }
    }

    private deleteCleanList() {
        CellManager.cleanList = [];
        CellManager.lineArray = [];
        this.cleanIndex = 0;
    }

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
        

    }
}