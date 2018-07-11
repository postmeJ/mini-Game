class LayerM {
    public constructor() {

    }

    public static stage: egret.Stage
    public static layer: egret.Sprite[] = []

    public static init(game_stage: egret.Stage) {
        LayerM.stage = game_stage
        console.log('LayerMange:', game_stage.numChildren)
        for (let i: number = 0; i < LAYER.UI.MAX; i++) {
            LayerM.layer[i] = new egret.Sprite()
            game_stage.addChild(LayerM.layer[i])
        }
        LayerM.stage.addEventListener(egret.Event.RESIZE, LayerM.onStageChange, LayerM.stage)
    }

    public static _resizeFn: Function = null
    public static set resizeFn(fn: Function) {
        LayerM._resizeFn = fn
    }

    /** 主要是都伸缩和尺寸的处理 */
    private static onStageChange(e: egret.Event) {
        console.log('--------->>> onStageChanage', LayerM.stage.stageWidth, GloVar.STAGE_W, GloVar.STAGE_H, GloVar.STAGE_SCALE)
        GloVar.resetSize()
        console.log('LayerM setSize', GloVar.STAGE_W, GloVar.STAGE_H, GloVar.STAGE_SCALE)

        LayerM.layer[LAYER.UI.PNL].scaleX = GloVar.STAGE_SCALE
        LayerM.layer[LAYER.UI.PNL].scaleY = GloVar.STAGE_SCALE
        LayerM.layer[LAYER.UI.PNL].x = GloVar.STAGE_W_INIT * .5 * (1 - GloVar.STAGE_SCALE)
        LayerM._resizeFn == null ? 0 : LayerM._resizeFn()
    }

    public static add(obj: egret.DisplayObject, layer: number) {
        LayerM.layer[layer].addChild(obj)
    }
}


module LAYER {
    export enum UI {
        BG,
        PLANT,
        GAME,
        PNL,
        EFF,
        TOP,
        MAX
    }
}