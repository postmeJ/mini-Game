namespace Game {
    export class GameEnterDlgSkin extends eui.Component {
        public readonly skinName = "GameEnterDlgSkin";

        private closeBtn: eui.Image;
        private goImg: eui.Image;
        private descLabel: eui.Label;
        private lvLabel: eui.BitmapLabel;

        constructor() {
            super();

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
}
