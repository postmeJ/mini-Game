class PauseLayer extends eui.Component {
    private bg1: eui.Image;
    /** 回到游戏 */
    private btn1: eui.Image;
    /** 重新开始 */
    private btn2: eui.Image;
    /** 退出 */
    private btn3: eui.Image;

    constructor() {
        super();

        this.skinName = 'PauseLayerSkin'

        this.init();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private addToStage() {
        // 回到游戏
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SoundsManager.playBtnMusic()
            if (this.parent) {
                this.parent.removeChild(this)
            }
        }, this)
        
        // 重新开始
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundsManager.playBtnMusic()
            SceneManager.replayLv();
        }, this);

        // 退出
        this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundsManager.playBtnMusic();
            Director.getInstance().replaceScene(new IndexScene());
        }, this);
    }

    private removeFromStage() {
        // Removed from the display list.
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private init() {
        // init
    }
}
