class IndexUI extends eui.Component {
    /** 加星星 */
    private addGoldBtn: eui.Image;
    /** 加血 */
    private addHeartBtn: eui.Image;

    public constructor() {
        super();
        this.skinName = "IndexUISkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {
        /** 加钱按钮点击 */
        this.addGoldBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //GH.showAd();

            new Tips().show("功能暂未开放");
        }, this);
        
        /** 加血按钮点击 */
        this.addHeartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //Director.getInstance().repleaceScene(new IndexScene());
            new Tips().show("功能暂未开放");
        }, this);
    }
}