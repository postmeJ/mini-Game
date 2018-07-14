class GameData {
    /** 当前进入的层次 */
    public static enterLv: number = 0
    /** 本局中当前剩余多少步 */
    public static curStep: number = 0
    /** 本局最大可以行走的步数 */
    public static targetStep: number = 0
    /** 本局中当前获得的分数 */
    public static curScore: number = 0
    /** 本局目标分数 */
    public static targetScore: number = 0
    public static isOver: boolean = false
    public static isWin: boolean = false

    public static reset() {
        this.enterLv = 0
        this.curStep = 0
        this.targetStep = 0
        this.curScore = 0
        this.targetScore = 0
        this.isOver = false
        this.isWin = false
    }

    public static initLvData(lv: number) {
        this.reset()
        
        var data = FileManager.getLvConfigDataById(lv)
        GameData.targetStep = parseInt(data['step'])
        GameData.targetScore = parseInt(data['score'])

        GameData.curStep = GameData.targetStep
        GameData.enterLv = lv
    }
}

enum GameState {
    DealLogic, // 处理游戏逻辑中
    Play // 游戏中
}