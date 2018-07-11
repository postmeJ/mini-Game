class Game2048 extends eui.Component {

    private newBtn: eui.Button;
    private scoreTxt: eui.Label;
    private bestTxt: eui.Label;
    private contentCon: eui.Group;
    private gridBg: eui.Rect;
    private kongList: eui.List;
    private gridList: eui.List;
    private gameOver: eui.Group;
    private gradeTxt: eui.Label;
    private newGame: eui.Label;

    /** 鼠标开始点 */
    private _startPoint: egret.Point
    /** 鼠标结束点 */
    private _endPoint: egret.Point

    public gridNum: number = 16
    /** 格子大小 */
    private _size: number = 125
    /** 格子圆角 */
    private _radius: number = 15
    /** 格子间隔 */
    private _space: number = 20

    /** 分数 */
    private _grade: number = 0
    /** 最佳分数 */
    private _best: number = 0

    public static self: Game2048
    private items: GridItemData[][] = [[], [], [], []]

    public constructor() {
        super()

        this.skinName = 'Game2048Skin'
        Game2048.self = this
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addFromStage, this)
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this)
    }

    public addFromStage(): void {
        for (let i: number = 0; i < this.gridNum; i++) {
            let row: number = i % 4
            let col: number = Math.floor(i / 4)
            let gridX: number = this._space + (this._space + this._size) * row
            let gridY: number = this._space + (this._space + this._size) * col
            let grid: eui.Rect = Util.createRect(gridX, gridY, this._size, this._radius, 0xcdc1b4)
            this.contentCon.addChild(grid)
        }

        this.contentCon.touchChildren = false

        this.gameOver.anchorOffsetX = this.gameOver.width >> 1
        this.gameOver.anchorOffsetY = this.gameOver.height >> 1
        this.gameOver.x = this.width >> 1
        this.gameOver.y = this.height >> 1
        // this.gameOver.visible = false
        // test
        this.gameOver.visible = true

        this.bestTxt.text = '0'
        this.gradeTxt.text = '0'

        this.contentCon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this)
        this.newBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this)
        this.newGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this)
        /** keydown */
        document.addEventListener('keydown', this.onKeyup)

        this.resetGrids()
    }

    public onKeyup(e: KeyboardEvent): void {
        // 0:上,1:右,2下,3左
        switch (e.keyCode) {
            case 37: // left
                Game2048.self.doMove(3)
                break;
            case 38: // up
                Game2048.self.doMove(0)
                break;
            case 39: // right
                Game2048.self.doMove(1)
                break;
            case 40: // down
                Game2048.self.doMove(2)
                break;
        }
    }

    private onClick(e: egret.TouchEvent): void {
        switch (e.target) {
            case this.newBtn:
                this.resetGrids();
                break;
            case this.newGame:
                this.resetGrids()
                break;
            case this.contentCon:
                if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                    this._startPoint = new egret.Point(e.stageX, e.stageY)
                    this.contentCon.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClick, this)
                } else if (e.type == egret.TouchEvent.TOUCH_MOVE) {
                    this._endPoint = new egret.Point(e.stageX, e.stageY)

                    let disX: number = this._endPoint.x - this._startPoint.x
                    let disY: number = this._endPoint.y - this._startPoint.y

                    // 方向区分不是很明显,忽略操作
                    if (Math.abs(disX - disY) <= 40) {
                        return;
                    }

                    let direction: number = Math.abs(disX) > Math.abs(disY) ? (disX > 0 ? 1 : 3) : (disY > 0 ? 2 : 0)

                    this.doMove(direction)
                    this.contentCon.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClick, this)
                }
                break;

        }
    }

    /** 初始化新游戏 */
    public resetGrids() {
        // 清空
        for (let i = 0; i < this.items.length; i++) {
            for (let j: number = 0; j < this.items[i].length; j++) {
                if (this.items[i][j].item) {
                    this.items[i][j].item.setData(Util.numStyle[0])
                    this.items[i][j].value = 0
                    this.removeFromParent(this.items[i][j].item)
                }
            }
        }

        this._grade = 0
        this.scoreTxt.text = `${this._grade}`

        // 新建
        for (let i = 0; i < this.items.length; i++) {
            for (let j: number = 0; j < 4; j++) {
                if (!this.items[i]) {
                    this.items[i] = []
                }

                let data: GridItemData = new GridItemData()
                data.value = 0
                data.i = 0
                data.j = 0
                this.items[i][j] = data
            }
        }

        // 开始的时候,添加2个随机格子
        this.addNewGrids(2)

        // 重置结束弹框状态
        if (this.gameOver.visible) {
            egret.Tween.get(this.gameOver).to({ scaleX: 0, scaleY: 0 }, 300)
                .call(() => {
                    this.gameOver.visible = false
                })
        }
    }

    /** 记录空的格子数量 */
    private usefulCell(): GridItemData[] {
        let cells: GridItemData[] = []
        for (let i: number = 0; i < 4; i++) {
            for (let j: number = 0; j < 4; j++) {
                if (this.items[i][j] && this.items[i][j].value == 0) {
                    this.items[i][j].i = i
                    this.items[i][j].j = j
                    cells.push(this.items[i][j])
                }
            }
        }
        return cells
    }

    /** 随机取得一个个数的数据 */
    private selectCell(): GridItemData {
        let cells: GridItemData[] = this.usefulCell()
        if (cells.length) {
            return cells[Math.floor(Math.random() * cells.length)]
        }
    }

    /** 
     * 随机创建数字 
     * @param size 数量
     * */
    public addNewGrids(size: number): void {
        if (!this.isOver()) {
            for (let i: number = 0; i < size; i++) {
                let cells: GridItemData = this.selectCell()
                if (!cells) {
                    return
                }
                let num: number = Math.random() < 0.9 ? 2 : 4;
                let grid: GridItem = new GridItem();
                grid.setData(Util.numStyle[num]);
                grid.x = cells.disX;
                grid.y = cells.disY;
                this.contentCon.addChild(grid);
                this.items[cells.i][cells.j].item = grid;
                this.items[cells.i][cells.j].value = num;
            }
        }
    }

    // 根据滑动方向生成list的四个数组（方便计算）
    private formList(dir): GridItemData[][] {
        let list: GridItemData[][] = [[], [], [], []];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                switch (dir) {
                    case 0:
                        list[i].push(this.items[j][i]);
                        break;
                    case 1:
                        list[i].push(this.items[i][3 - j]);
                        break;
                    case 2:
                        list[i].push(this.items[3 - j][i]);
                        break;
                    case 3:
                        list[i].push(this.items[i][j]);
                        break;
                }
            }
        }
        return list;
    }

    private running: number = 0
    private record: number = 0
    private bestRecord: number = 0
    private doMove(type: number): void {
        if (this.isOver()) {
            return;
        }

        let arr: GridItemData[][] = this.formList(type)
        let nextI: number
        for (let i: number = 0; i < arr.length; i++) {
            for (let j: number = 0; j < arr[i].length; j++) {
                nextI = -1
                for (let m: number = j + 1; m < arr[i].length; m++) {
                    if (arr[i][m].value != 0) {
                        nextI = m
                        break;
                    }
                }

                if (nextI !== -1) {
                    let curData: GridItemData = arr[i][j];
                    let nextData: GridItemData = arr[i][nextI]
                    
                    // 移动的时间计算
                    let time = Math.abs(j - nextI) * 60

                    if (curData.value == 0) {
                        this.running++
                        let value: number = nextData.value
                        
                        curData.value = value
                        curData.item = nextData.item

                        nextData.item = null
                        nextData.value = 0
                        j--
                        egret.Tween.get(curData.item).to({
                            x: curData.disX,
                            y: curData.disY
                        }, time).call(() => {
                            this.running--
                            if (this.running <= 0) {
                                this.addNewGrids(1)
                            }
                        })
                    } else if (curData.value == nextData.value) {
                        this.running++
                        if (this.contentCon.getChildIndex(nextData.item) < this.contentCon.getChildIndex(curData.item)) {
                            this.contentCon.swapChildren(nextData.item, curData.item)
                        }
                        let nextItem: GridItem = nextData.item
                        let curItem: GridItem = curData.item
                        let value: number = nextData.value * 2

                        nextData.value = 0
                        nextData.item = null

                        curData.value = value

                        egret.Tween.get(nextItem).to({
                            x: curData.disX,
                            y: curData.disY
                        }, time)
                            .to({ scaleX: 1.2, scaleY: 1.2 }, 50)
                            .to({ scaleX: 0.8, scaleY: 0.8 }, 50)
                            .to({ scaleX: 1, scaleY: 1 }, 50)
                            .call(() => {
                                this.running--
                                curItem.setData(Util.numStyle[value])
                                this.removeFromParent(nextItem)

                                if (value >= 2048) {
                                    let label: eui.Label = Util.createLabel(`恭喜达到${value}!`, 0, 500, 40, 640, 0xf57c5f, "center");
                                    this.addChild(label)

                                    egret.Tween.get(label).to({ y: 400 }, 1200)
                                        .call(() => {
                                            this.removeFromParent(label)
                                        }, this)
                                }

                                this.record += value
                                this._grade += value

                                let g: number = this._grade
                                let b: number = this._best

                                if (g > b) {
                                    this.bestRecord += value
                                    g = b
                                }

                                if (this.running <= 0) {
                                    this.addNewGrids(1)

                                    let num: number = this.record
                                    this.record = 0

                                    let label: eui.Label = Util.createLabel(`+${num}`, 360, 100, 30, 120, 0x7c736a, "center");
                                    this.addChild(label)

                                    egret.Tween.get(label).to({ y: 50 }, 300)
                                        .to({ alpha: 0 }, 200)
                                        .call(() => {
                                            this.scoreTxt.text = `${this._grade}`
                                            this.removeFromParent(label)
                                        })

                                    if (this._grade > this._best) {
                                        this._best = this._grade;
                                        let num: number = this.bestRecord;
                                        this.bestRecord = 0;
                                        let bestLabel: eui.Label = Util.createLabel(`+${num}`, 490, 100, 30, 120, 0xf59563, "center");
                                        this.addChild(bestLabel);
                                        egret.Tween.get(bestLabel).to({ y: 50 }, 300).to({ alpha: 0 }, 200).call((label) => {
                                            this.bestTxt.text = `${this._best}`;
                                            this.removeFromParent(label);
                                        }, this, [label]);
                                    }


                                }
                            })
                    }
                }

            }
        }
    }

    private isOver(): boolean {
        // 还有位置
        if (this.usefulCell().length > 0) {
            return false
        }
        // 刚好没有位置的情况下
        // 相邻之间还有可以合并的
        else {
            // 左右
            for (let i: number = 0; i < this.items.length; i++) {
                for (let j: number = 1; j < this.items[i].length; j++) {
                    if (this.items[i][j].value == this.items[i][j - 1].value) {
                        return false
                    }
                }
            }
            // 上下
            for (let j: number = 0; j < this.items.length; j++) {
                for (let i: number = 1; i < this.items[j].length; i++) {
                    if (this.items[i][j].value == this.items[i - 1][j].value) {
                        return false
                    }
                }
            }
        }

        /** 结束弹框动画 */
        this.gameOver.scaleX = this.gameOver.scaleY = 0
        this.gameOver.visible = true
        egret.Tween.get(this.gameOver).to({ scaleX: 1, scaleY: 1 }, 300).call(() => {
            this.gradeTxt.text = this._grade + ''
        }, this)
        return true
    }

    private removeFromParent(child: egret.DisplayObject) {
        if (!child || child.parent == null) {
            return
        }
        child.parent.removeChild(child)
    }

    private removeFromStage(): void {
        this.contentCon.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this)
        this.newBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this)
        this.newGame.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this)
    }
}
