class LoseLayer extends eui.Component {
    /** 再来一次 */
    private btnAgain: eui.Image;
    private closeBtn: eui.Image;


    constructor() {
        super();

        this.skinName = 'LoseLayerSkin'

        this.init();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private addToStage() {
        this.btnAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            SceneManager.replayLv()
        }, this)

        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=> {
            Director.getInstance().replaceScene(new IndexScene())
        }, this)
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