class GameUI extends eui.Component {
    private top: eui.Image;
    private pauseBtn: eui.Image;
    private progress: eui.ProgressBar;
    private star1: eui.Image;
    private star3: eui.Image;
    private star2: eui.Image;
    private stepScore: eui.BitmapLabel;
    private lv: eui.BitmapLabel;
    private gold: eui.BitmapLabel;
    private targetScore: eui.BitmapLabel;
    private score: eui.BitmapLabel;


    constructor() {
        super();

        this.skinName = 'GameUISkin'

        this.init();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    /** 初始化界面展示 */
    private addToStage() {
        this.progress.value = 0;
        this.gold.text = "0";
        this.score.text = "0";
        this.targetScore.text = GameData.targetScore.toString();
        this.lv.text = GameData.enterLv.toString();
        this.stepScore.text = GameData.targetStep.toString();

        this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPause, this);
    }

    private removeFromStage() {
        // Removed from the display list.
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private init() {
        // init
    }

    /** 星级评估没有被使用 */
    private star: number = 0;
    public addScore(v) {
        GameData.curScore += v;
        this.score.text = GameData.curScore.toString();

        // 星级评价
        var star1Score = GameData.targetScore;
        var star2Score = GameData.targetScore * 1.5;
        var star3Score = GameData.targetScore * 2;

        if (GameData.curScore < star1Score) {
            this.showStar(0);
        } else if (GameData.curScore >= star1Score && GameData.curScore < star2Score) {
            // 一星
            this.showStar(1);
        } else if (GameData.curScore >= star2Score && GameData.curScore < star3Score) {
            // 二星
            this.showStar(2);
        } else {
            // 三星
            this.showStar(3);
        }
        var progress = GameData.curScore / star3Score * 100;
        this.progress.value = progress;
    }

    /** 隐藏和展示星星 */
    private showStar(v) {
        this.star = v;
        this.star1.source = "game_rate1_off_png";
        this.star2.source = "game_rate2_off_png";
        this.star3.source = "game_rate3_off_png";
        if (v == 1) {
            this.star1.source = "game_rate1_png";
        } else if (v == 2) {
            this.star2.source = "game_rate2_png";
        } else if (v == 3) {
            this.star3.source = "game_rate3_png";
        }
    }

    /** 减步和判断是否成功 */
    public reduceStep() {
        GameData.curStep--;
        
        this.stepScore.text = GameData.curStep.toString();
        
        // 没有步数了
        if (GameData.curStep <= 0) {
            GameData.curStep = 0;
            if (GameData.isOver == false) {
                // 失败
                GameData.isOver = true;
                GameData.isWin = false;
                this.addDefeatLayer();
            }
        } 
        
        // 还有步数,分数够了
        else {
            if (GameData.curScore >= GameData.targetScore) {
                // 胜利
                if (GameData.isOver == false) {
                    GameData.isOver = true;
                    GameData.isWin = true;
                    this.addWinLayer();
                }
            }
        }
    }

    private addWinLayer() {
        Director.getInstance().pushScene(new WinUI(this.star));
    }

    private addDefeatLayer() {
        Director.getInstance().pushScene(new LoseLayer());
    }

    private onPause() {
        SoundsManager.playBtnMusic();
        this.addChild(new PauseLayer());
    }

    private onBtn() {
        return;
        // CellMgr.removeAllCellAction();

        // //var cell = CellMgr.cellArray[0][0];
        // //var arr = [cell];
        // //CellMgr.getSameArrByCell(cell, arr);
        // //CellMgr.setAllCellCheckFlag(false);
        // //for (var k in arr) {
        // //    var item:Cell = arr[k];
        // //    item.noticeAction();
        // //}
        // var arr = CellMgr.getNowCleanListNum();
        // for (var k in arr) {
        //     for (var j in arr[k]) {
        //         var item: Cell = arr[k][j];
        //         item.noticeAction();
        //     }
        // }

    }
}

