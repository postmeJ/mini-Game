class GloVar {
    public static IS_MOBILE: boolean
    public static PLANT: string = 'K'
    public static GAME_NAME: string = '卡牌足球'
    public static GAME_MODE: number = TYPE.MODE.A
    public static GAME_SAVE: string = GloVar.GAME_NAME + GloVar.GAME_MODE + GloVar.PLANT + '_REC'
    public static GAME_ID: number[] = [100053862, 0, 0]
    public static MODE_NAME: string[] = ['SOLO', '合作', '对战']
    public static NUM_PLAYER: number = GloVar.GAME_MODE == TYPE.MODE.A ? 2 : 3

    public static STAGE_SCALE: number = 0
    public static STAGE_W_INIT: number = 0
    public static STAGE_H_INIT: number = 0
    public static STAGE_W: number = 0
    public static STAGE_H: number = 0
    public static STAGE_WC: number = 0
    public static STAGE_WH: number = 0

    /** 最大蓄力 */
    public static POWER_MAX: number = 1500
    /** 最大跳跃距离 */
    public static POWER_DIS_MAX: number = 600

    /** 文字打在头上的强度,size的n次方 */
    public static WORDS_POWER: number = 2.5
    /** 眩晕蓄力的时间 */
    public static STUN_TIME: number = 2000
    public static PSTUN_POWER: number = 140
    public static DK_STUN_TIME: number = 200

    public static EV_HIGH_SPEED: number = 250

    public static SP_FAST: number = 250
    public static SP_NORMAL: number = 500
    public static SP_SLOW: number = 1000

    public static COLOR_WIN1: number = 0x893D06
    public static COLOR_WIN2: number = 0xFCD719
    public static COLOR_LOSE1: number = 0x131B28
    public static COLOR_LOSE2: number = 0xE3E7ED
    public static COLOR_DRAW1: number = 0xEEEEEE
    public static COLOR_DRAW2: number = 0x666666

    public static PNL_EASE_IN: Function = egret.Ease.backOut
    public static PNL_EASE_OUT: Function = egret.Ease.quartOut

    public static resetSize() {
        // if (Main.isConfigLoadEnd) {
            console.log('GloVar 34: ',
                window.screen.width,
                window.screen.availWidth,
                egret.MainContext.instance.stage.stageWidth,
                '/',
                window.screen.height,
                window.screen.availHeight,
                egret.MainContext.instance.stage.stageHeight
            )

            GloVar.STAGE_W = egret.MainContext.instance.stage.stageWidth
            GloVar.STAGE_H = egret.MainContext.instance.stage.stageHeight
            GloVar.STAGE_SCALE = GloVar.STAGE_H / GloVar.STAGE_H_INIT

            GloVar.STAGE_WC = GloVar.STAGE_W * 0.5
            GloVar.STAGE_WH = GloVar.STAGE_H * 0.5

            // if (Main.isThemeLoadEnd) {
                // GPL.inst.initUI()
            // }
        // }
    }

}