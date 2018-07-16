class GameScene extends egret.DisplayObjectContainer {
    private linePanel: egret.Sprite
    private cellPanel: egret.Sprite
    private pointLine: eui.Image
    private pointLineBeganCell: Cell

    private state: GameState = GameState.Play

    constructor() {
        super()
    }
}