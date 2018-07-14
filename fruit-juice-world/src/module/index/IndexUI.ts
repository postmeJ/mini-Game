namespace Game {
    export class IndexUISkin extends eui.Component {
        public readonly skinName = "IndexUISkin";

        private top: eui.Image;
        private gold: eui.BitmapLabel;
        private heart: eui.BitmapLabel;
        private addHeartBtn: eui.Image;
        private addGoldBtn: eui.Image;


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
