namespace Game {
    export class GameUISkin extends eui.Component {
        public readonly skinName = "GameUISkin";

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
