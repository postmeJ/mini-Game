class Data {
    public static marginTop: number = 20
    public static marginBottom: number = 20

    private static _rectWidth: number = 0

    /** 正方形的长宽 */
    public static getRectWidth() {
        if (this._rectWidth == 0) {
            this._rectWidth = egret.MainContext.instance.stage.stageWidth / 4
        }
        return Data._rectWidth
    }

    public static score: number = 0
    private static _rectRow: number = 0
    
    /** 总共有多少行,y轴方向的值 */
    public static getRectRow(): number {
        if (Data._rectRow == 0) {
            // 获取有多少行,y值
            // 正方形,所有长裤宽一样
            Data._rectRow = Math.ceil((Data.getStageHeight() - Data.marginTop - Data.marginBottom) / Data.getRectWidth())
        }
        return Data._rectRow
    }

    /** 舞台的高度 */
    public static getStageHeight(): number {
        return egret.MainContext.instance.stage.stageHeight
    }
}