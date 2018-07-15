enum LevelState {
    NONE,
    OPEN,
    CLOSE
}

/** 游戏进入按钮 */
class IndexButton extends eui.Component {
    private bg: eui.Image;
    private lvLabel: eui.Label;
    private icon: eui.Image;

    private state: LevelState = LevelState.NONE
    private lvNumber: number = 0

    constructor() {
        super();

        this.skinName = 'IndexButtonSkin';

        this.init();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private addToStage() {

    }

    private removeFromStage() {
        // Removed from the display list.
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private init() {
        // init
    }

    public get lv() {
        return this.lvNumber
    }

    public set lv(v) {
        this.lvNumber = v
        this.lvLabel.text = this.lvNumber + ''

        if (this.lvNumber < PlayerData.data.fightLv) {
            // 已经通关了
            this.setData(LevelState.OPEN);
        } else if (this.lvNumber == PlayerData.data.fightLv) {
            this.setData(LevelState.OPEN);
            this.showIcon();
        } else {
            // 还没有通关
            this.setData(LevelState.CLOSE);
        }
    }

    public setData(state: LevelState) {
        this.state = state;

        this.bg.source = this.getStateImage();
    }

    private showIcon() {
        this.icon.visible = true;
        var tw = egret.Tween.get(this.icon, { loop: true });
        var y = this.icon.y;
        tw.to({ y: y + 20 }, 1200, egret.Ease.backIn)
            .to({ y: y }, 500, egret.Ease.backOut);
    }

    private getStateImage() {
        if (this.state == LevelState.OPEN) {
            return "selet_g_green_png";
        } else if (this.state == LevelState.CLOSE) {
            return "selet_g_lock_png";
        }
        return "";
    }
}