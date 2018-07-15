class GameProgress extends eui.Component {

    private thumb: eui.Image;
    private labelDisplay: eui.Label;


    constructor() {
        super();

        this.skinName = "GameProgressSkin";

        this.init();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private addToStage() {
        // Added to the on stage display list.
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