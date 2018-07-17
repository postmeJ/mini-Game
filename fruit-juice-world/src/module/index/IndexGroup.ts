/**
 * 1. 显示
 * 2. 关联13个按钮
 */

class IndexGroup extends eui.Component {
    private btn1: IndexButton;
    private btn2: IndexButton;
    private btn3: IndexButton;
    private btn4: IndexButton;
    private btn5: IndexButton;
    private btn6: IndexButton;
    private btn7: IndexButton;
    private btn8: IndexButton;
    private btn9: IndexButton;
    private btn10: IndexButton;
    private btn11: IndexButton;
    private btn12: IndexButton;
    private btn13: IndexButton;


    constructor() {
        super();

        this.skinName = 'IndexGroupSkin'

        this.init();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private addToStage() {
        /** 给每一个按钮添加点击事件 */
        let buttonArr = [this.btn1, this.btn2, this.btn3, this.btn4, this.btn5, this.btn6,
        this.btn7, this.btn8, this.btn9, this.btn10, this.btn11, this.btn12, this.btn13];

        for (var k in buttonArr) {
            var itemBtn = buttonArr[k];
            itemBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        }
    }

    private clickBtn(touch: egret.TouchEvent) {
        SoundsManager.playBtnMusic();
        
        var btn: IndexButton = touch.currentTarget;
        var lv = btn.lv;

        if (lv <= PlayerData.data.fightLv) {
            Director.getInstance().pushScene(new GameEnterDlg(lv));
        } else {
            new Tips().show("不能进入");
        }
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