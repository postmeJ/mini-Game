namespace Game {
    export class IndexGroupSkin extends eui.Component {
        public readonly skinName = "IndexGroupSkin";

        private btn1: IndexButton;
        private btn2: IndexButton;
        private btn3: IndexButton;
        private btn4: IndexButton;
        private btn5: IndexButton;
        private btn6: IndexButton;
        private btn7: IndexButton;
        private btn8: IndexButton;
        private btn9: IndexButton;
        private btn10: IndexButton;
        private btn11: IndexButton;
        private btn12: IndexButton;
        private btn13: IndexButton;


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
