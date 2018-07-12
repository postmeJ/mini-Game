class TimerPanel extends egret.Sprite {
    public constructor() {
        super()

        this.draw()
        this.createTimer()
    }
    private _txtTimer: egret.TextField;
    private _txtScore: egret.TextField;

    private _timer: egret.Timer;
    private _num = 10;
    private createTimer() {
        this._timer = new egret.Timer(1000, this._num);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
    }

    private _timers = this._num;
    private onTimer() {
        console.log("TimerPanel.onTimer");
        this._timers--;
        this._txtTimer.text = this._timers + "'00''";
    }

    public updateScore() {
        this._txtScore.text = "Score: " + Data.score;
    }

    private onTimerComplete() {
        console.log("TimerPanel.onTimerComplete");
        this.dispatchEventWith(EventConst.GameOver);
    }

    private draw() {
        this._txtTimer = new egret.TextField();
        this._txtTimer.width = egret.MainContext.instance.stage.stageWidth;
        this._txtTimer.y = 100;
        this._txtTimer.textColor = 0xFF8247;
        this._txtTimer.textAlign = egret.HorizontalAlign.CENTER;
        this._txtTimer.text = this._num + "'00''";
        this.addChild(this._txtTimer);

        this._txtScore = new egret.TextField();
        this._txtScore.textAlign = egret.HorizontalAlign.CENTER;
        this._txtScore.y = 150;
        this._txtScore.textColor = this._txtTimer.textColor;
        this._txtScore.width = egret.MainContext.instance.stage.stageWidth;
        this._txtScore.text = "Score: " + Data.score;
        this.addChild(this._txtScore);
    }

    public start() {
        this._txtTimer.text = this._num + "'00''";
        this._timers = this._num;
        this._timer.reset();
        this._timer.start();
    }

    public stop() {
        this._timer.stop();
    }
}