/** 设计不好 */

class Game {

    private _root: egret.DisplayObjectContainer
    public constructor(root: egret.DisplayObjectContainer) {
        this._root = root
        this.createGroupRect()
        this.createTimer()
        this.startGame()
    }

    private _row: number
    private _rectRoot: egret.Sprite
    private _rectGroups: GroupRect[]

    /** init的操作 */
    private createGroupRect() {
        this._rectRoot = new egret.Sprite()
        this._root.addChild(this._rectRoot)

        this._rectGroups = []
        this._row = Data.getRectRow()

        var groupRect: GroupRect
        for (var i = 0; i < this._row; i++) {
            groupRect = new GroupRect()
            groupRect.currentRow = i
            groupRect.addEventListener(EventConst.GameOver, this.gameOver, this)
            groupRect.addEventListener(EventConst.MoveDown, this.moveDown, this)

            groupRect.y = Data.getRectWidth() * i
            this._rectRoot.addChild(groupRect)

            this._rectGroups.push(groupRect)
        }

        this._rectRoot.y = Data.getStageHeight() - this._rectRoot.height
    }

    private _timerPanel: TimerPanel
    /** 创建时间面板 */
    private createTimer() {
        if (!this._timerPanel) {
            this._timerPanel = new TimerPanel()
            this._timerPanel.addEventListener(EventConst.GameOver, this.gameOver, this)
        }
        this._root.addChild(this._timerPanel)
    }

    /** 开始游戏 */
    /** 启动计时面板,更新分数(性能不行), */
    private startGame() {
        Data.score = 0
        if (this._timerPanel) {
            this._timerPanel.updateScore()
        }

        // 初始化所有的rect
        for (var i = 0; i < this._row; i++) {
            // 刚开始的时候,从下向上算, 第一行全部都是白色的.
            if (this._rectGroups[i].currentRow == this._row - 1) {
                this._rectGroups[i].init();
            } else {
                this._rectGroups[i].createBlackRect();
            }
        }

        /** 所有的rect都设置为可点击的 */
        this.setGameTouchEnabled(true)
        this._timerPanel.start()
    }

    /** 全部设置为可点击的 */
    private setGameTouchEnabled(bol: boolean) {
        for (var i = 0; i < this._rectGroups.length; i++) {
            for (var j = 0; j < 4; j++) {
                this._rectGroups[i].getChildAt(j).touchEnabled = bol
            }
        }
    }

    private moveDown() {
        for (var i = 0; i <= this._rectGroups.length - 1; i++) {
            this._rectGroups[i].moveDown()
        }

        Data.score++

        if (this._timerPanel) {
            this._timerPanel.updateScore()
        }
    }

    private _gameOverPanel
    /** 游戏结束 */
    private gameOver() {
        this._timerPanel.stop()
        this.setGameTouchEnabled(false)

        if (!this._gameOverPanel) {
            this._gameOverPanel = new GameOverPanel()
            this._gameOverPanel.addEventListener(EventConst.StartGame, this.startGame, this)
        }
        this._root.addChild(this._gameOverPanel)
    }
}