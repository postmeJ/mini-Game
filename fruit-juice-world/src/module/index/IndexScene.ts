/**
 * 1. 显示
 * 2. 内嵌一个group,用一个group来滚动显示
 */

class IndexScene extends eui.Component {
    private list: eui.Group;
    private indexUI: IndexUI
    private prePoint: egret.Point = new egret.Point();

    constructor() {
        super();

        this.skinName = 'IndexSceneSkin'

        // 上面的UI界面
        this.indexUI = new IndexUI();
        this.addChild(this.indexUI);

        // this.init();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private addToStage() {
        this.initData();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegan, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
    }

    /** 初始化视图和视图视口位置 */
    private initData() {
        this.list.addChild(new IndexGroup());

        //滚动到屏幕可见区域
        var arr = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 256,
            "5": 559,
            "6": 778,
            "7": 1000,
            "8": 1284,
            "9": 1461,
            "10": 1617,
            "11": 1640,
            "12": 1640,
            "13": 1640
        };
        this.list.scrollV = arr[PlayerData.data.fightLv.toString()];
    }

    private onBegan(touch: egret.TouchEvent) {
        this.prePoint.x = touch.stageX;
        this.prePoint.y = touch.stageY;
    }

    private onMove(touch: egret.TouchEvent) {
        this.prePoint.x = touch.stageX;
        this.prePoint.y = touch.stageY;
    }

    private onEnd(touch: egret.TouchEvent) {
        this.prePoint.x = touch.stageX;
        this.prePoint.y = touch.stageY;
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