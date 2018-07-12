/**
 * 表示的是一行rect,并且有一些事件动作 
 */

class GroupRect extends egret.Sprite {
    private _rects: Rect[]

    public constructor() {
        super();

        this.createRects()
        this.createBlackRect()
    }

    /** 创建一行rect,但是没有给予type */
    private createRects() {
        this._rects = [];
        for (var i: number = 0; i < 4; i++) {
            var rect: Rect = new Rect();
            rect.x = i * rect.width;
            rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

            this.addChild(rect);
            this._rects.push(rect);
        }
    }

    /** 一行的rect的type设为NONCLICKABLE */
    public init() {
        for (var i = 0; i < 4; i++) {
            this._rects[i].type = RectType.NONCLICKABLE;
        }
    }

    private _currentBlackRectIndex: number = 0;
    /** 创建'黑子',且先init */
    public createBlackRect() {
        this.init();
        var random: number = Math.random();
        if (random >= 0 && random < 0.25) {
            this._currentBlackRectIndex = 0;
        } else if (random >= 0.25 && random < 0.5) {
            this._currentBlackRectIndex = 1;
        } else if (random >= 0.5 && random < 0.75) {
            this._currentBlackRectIndex = 2;
        } else if (random >= 0.75 && random <= 1) {
            this._currentBlackRectIndex = 3;
        }

        this._rects[this._currentBlackRectIndex].type = RectType.CLICKABLE;
    }


    /** currentRow */
    private _currentRow: number = 0;
    public get currentRow() {
        return this._currentRow;
    }
    public set currentRow(val: number) {
        this._currentRow = val;
    }

    private onClick(val: egret.TouchEvent) {
        // ?
        if (this._currentRow == Data.getRectRow() - 2) {
            val.target.onClick();
            if (val.target.type == RectType.CLICKABLE) {
                this.dispatchEventWith(EventConst.MoveDown);
            } else {
                this.dispatchEventWith(EventConst.GameOver);
            }
        } else {
            if (val.target.type == RectType.NONCLICKABLE) {
                val.target.onClick();
                this.dispatchEventWith(EventConst.GameOver);
            }
        }
    }

    public moveDown() {
        this._currentRow++;
        // 向下移动的过程过,如果本行是最后一行了,就移动第一行中,重新创建黑色块
        if (this._currentRow == Data.getRectRow()) {
            this._currentRow = 0;
            this.createBlackRect();
        }
        this.y = this._currentRow * Data.getRectWidth();
    }

    private gameOver() {
        this.dispatchEventWith(EventConst.GameOver);
    }
}