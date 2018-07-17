
/**
 * 1. 显示
 * 2. 点击跳入游戏界面
 */
class GameEnterDlg extends eui.Component {
    private closeBtn: eui.Image;
    private goImg: eui.Image;
    private descLabel: eui.Label;
    private lvLabel: eui.BitmapLabel;
    private lv: number;

    constructor(lv: number) {
        super();
        this.lv = lv;
        this.skinName = "GameEnterDlgSkin";

        // this.init();
        this.initData()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private addToStage() {
        // Added to the on stage display list.
        this.goImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGo, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    }

    private removeFromStage() {
        // Removed from the display list.
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private init() {
        // init
    }

    private onClose() {
        SoundsManager.playBtnMusic();
        Director.getInstance().popScene();
    }

    private initData() {
        this.lvLabel.text = this.lv.toString();

        var data = FileManager.getLvConfigDataById(this.lv);
        if (data) {
            var str = "在" + data["step"] + "步之内达到" + data["score"] + "分";
            this.descLabel.text = str;
        }
    }

    private onGo() {
        SoundsManager.playBtnMusic();
        GameData.initLvData(this.lv);
        SceneManager.gotoGame();
    }
}
