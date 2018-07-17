class Cell extends egret.Sprite {
    public static CellWidth = 60
    public static CellHeight = 60
    public id = 0
    public row = 0
    public column = 0
    public moveFlag: boolean = false
    /** 检查标识,游戏逻辑中是否被检查过*/
    public checkFlag: boolean = false
    private sprite: eui.Image = null

    private isAction: boolean = false
    public isSelected: boolean = false

    public constructor(id) {
        super()

        this.id = id
        this.sprite = new eui.Image()
        this.addChild(this.sprite)

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this)
    }

    private onAddStage() {
        this.init()
    }

    /** 贴图,位置 */
    private init() {
        let png = ["game_Apple_png", "game_Blueberry_png",
            "game_Grape_png", "game_Lemon_png", "game_Watermelon_png"];
        var res = png[this.id - 1];
        var texture = RES.getRes(res);
        if (texture) {
            this.width = Cell.CellWidth;//texture.textureWidth;
            this.height = Cell.CellHeight;// texture.textureHeight;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;

            /** 贴图,赋予位置 */
            this.sprite.source = texture;
            this.sprite.width = Cell.CellWidth;
            this.sprite.height = Cell.CellHeight;
            this.sprite.anchorOffsetX = this.sprite.width / 2;
            this.sprite.anchorOffsetY = this.sprite.height / 2;
            this.sprite.x = this.width / 2;
            this.sprite.y = this.height / 2;
        }
        else {
            console.error('没有对应的texture', res)
        }
    }

    public setSelect(b: boolean) {
        if (this.isSelected != b) {
            this.isSelected = b
            if (b) {
                this.runSelectedAni()
            } else {

            }
        }
    }

    private runSelectedAni() {
        if (this.isAction == false) {
            this.isAction = true;
            SoundsManager.playClickCellMusic();
            egret.Tween.removeTweens(this);

            var tw = egret.Tween.get(this);
            tw.to({ scaleX: 0.8, scaleY: 1.3 }, 100, egret.Ease.bounceIn)
                .to({ scaleX: 1.1, scaleY: 1 }, 100, egret.Ease.bounceOut)
                .to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.backIn)
                .call(function () {
                    this.isAction = false;
                }, this);
        }
    }

    private clean() {
        Util.removeByElements(CellManager.cleanList, this)
        CellManager.cleanCell(this)

        let tw = egret.Tween.get(this)
        tw.to({ scaleX: 0.4, scaleY: 0.4 }, 200)
            .call(() => {
                this.sendCleanOverEvent()
            }, this)
            .wait(50)
            .call(() => {
                if (this.parent) {
                    this.parent.removeChild(this)
                }
            }, this)
    }

    private sendCleanOverEvent() {
        var event: GameEvent = new GameEvent(GameEvent.CleanOver);
        this.dispatchEvent(event);
    }

}