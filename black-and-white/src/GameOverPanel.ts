class GameOverPanel extends egret.Sprite {
    public constructor() {
        super()

        this.draw()
        this.addEventListener(egret.Event.ADDED, this.onAdded, this)
    }


    private _btn: egret.Sprite
    private _txtRestart: egret.TextField
    private draw() {
        let w: number = egret.MainContext.instance.stage.stageWidth
        let h: number = egret.MainContext.instance.stage.stageHeight

        // 外框
        this.graphics.beginFill(0x111111, 0.5)
        this.graphics.drawRect(0, 0, w, h)
        this.graphics.endFill()

        // 
        this._btn = new egret.Sprite()
        this._btn.graphics.lineStyle(5, 0x00ffff)
        this._btn.graphics.beginFill(0x0000fff)
        this._btn.graphics.drawRect(0, 0, 200, 100)
        this._btn.graphics.endFill()

        this._btn.width = 200
        this._btn.height = 100
        this._btn.x = (w - 200) / 2
        this._btn.y = (h - 100) / 2
        this.addChild(this._btn)
        this._btn.touchEnabled = true
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this)

        this._txtRestart = new egret.TextField()
        this._txtRestart.text = this.getRestartBtnText()
        this._txtRestart.textAlign = egret.HorizontalAlign.CENTER
        this._txtRestart.y = this._btn.y + (this._btn.height - this._txtRestart.height) / 2
        this._txtRestart.textColor = 0xff0000
        this._txtRestart.width = w
        this.addChild(this._txtRestart)
    }

    private restartBtnTexts: string[]
    private getRestartBtnText(): string {
        if (!this.restartBtnTexts) {
            this.restartBtnTexts = [];
            // this.restartBtnTexts.push("功夫了得：》");
            // this.restartBtnTexts.push("小屁孩:<");
            // this.restartBtnTexts.push("找妈妈喝奶去");
            // this.restartBtnTexts.push("Michael在哪里");
            // this.restartBtnTexts.push("Peter太调皮了");
            // this.restartBtnTexts.push("你妈贵姓！");
            this.restartBtnTexts.push("文案1 挂了");
            this.restartBtnTexts.push("文案2 挂了");
            this.restartBtnTexts.push("文案3 挂了");
            this.restartBtnTexts.push("文案4 挂了");
            this.restartBtnTexts.push("文案5 挂了");
        }
        var num: number = 0;
        if (Data.score < 10) {
            num = Math.random();
            num = Math.ceil(num * 10) % 5 + 1;
        }
        return this.restartBtnTexts[num];
    }

    private onAdded() {
        this._txtRestart.text = this.getRestartBtnText()
    }

    private startGame() {
        this.parent.removeChild(this)
        this.dispatchEventWith(EventConst.StartGame)
    }
}