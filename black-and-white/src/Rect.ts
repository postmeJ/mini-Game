/**
 * 颜色变化的核心是: 不同的情况,重新绘制,显示不同的效果
 */

class Rect extends egret.Sprite {
    public constructor() {
        super()

        this.touchEnabled = true

        this.draw()
    }

    private _colors: Array<number> = [0x7FFF00, 0xffffff, 0xff0000, 0x000080];
    private _currentColor: number = 1;

    private draw() {
        this.width = this.height = Data.getRectWidth()

        this.graphics.lineStyle(1, 0x000000);
        // 根据类型来判断是哪种颜色
        this.graphics.beginFill(this._colors[this._currentColor]);
        this.graphics.drawRect(0, 0, Data.getRectWidth(), Data.getRectWidth());
        this.graphics.endFill();
    }

    private _type: string = RectType.NONCLICKABLE
    public get type(): string {
        return this._type
    }

    public set type(val: string) {
        this._type = val;
        if (this._type == RectType.CLICKABLE) {
            this._currentColor = 0;
        } else {
            this._currentColor = 1;
        }
        this.draw();
    }

    public onClick() {
        if (this._type == RectType.CLICKABLE) {
            this._currentColor = 3
        } else {
            this._currentColor = 2;
        }
        this.draw();
    }
}