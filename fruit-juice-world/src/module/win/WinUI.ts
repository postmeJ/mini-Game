class WinUI extends eui.Component {
    private bg1: eui.Image;
    private bg2: eui.Image;
    private starBg: eui.Image;
    private star3: eui.Image;
    private star2: eui.Image;
    private star1: eui.Image;
    private socker: eui.Image;
    private nice: eui.Image;
    private btn1Bg: eui.Image;
    private btn2Bg: eui.Image;
    private btn3Bg: eui.Image;
    private numLabel: eui.BitmapLabel;

    /** 星级评分 */
    private star: number = 0
    constructor(star: number) {
        super();
        this.skinName = 'WinUISkin'
        this.star = star

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);

        SoundsManager.playWinMusic()
    }

    /** 显示star */
    private initStar() {
        var arr = [this.star1, this.star2, this.star3]
        for (let i in arr) {
            arr[i].visible = false
        }
        for (let i = 0; i < this.star; i++) {
            arr[i].visible = true
        }
    }

    private addToStage() {
        this.btn1Bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn1, this)
        this.btn2Bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn2, this)
        this.btn3Bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn3, this)

        this.init()
        this.saveData()
        this.initStar()
    }

    /** 保存设置,开启新的关卡 */
    private saveData() {
        PlayerData.saveLv(GameData.enterLv + 1)
    }

    private removeFromStage() {
        // Removed from the display list.
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private init() {
        this.numLabel.text = GameData.curScore + ''
    }

    /** 返回首页 */
    private clickBtn1() {
        SceneManager.gotoIndex()
    }

    /** 重玩 */
    private clickBtn2() {
        SceneManager.replayLv()
    }

    /** 下一关 */
    private clickBtn3() {
        GameData.initLvData(GameData.enterLv + 1)
        SceneManager.gotoGame()
    }
}
