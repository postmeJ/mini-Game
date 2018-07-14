namespace Game {
    export class LoginSkin extends eui.Component {
        public readonly skinName = "LoginSkin";

        private sky: eui.Rect;
        private bird1: eui.Image;
        private bird2: eui.Image;
        private cloudLeft: eui.Image;
        private sea: eui.Image;
        private water2: eui.Image;
        private water1: eui.Image;
        private boat2: eui.Image;
        private boat1: eui.Image;
        private cloudRight: eui.Image;
        private mountain: eui.Image;
        private beach: eui.Image;
        private logo: eui.Image;
        private fruit1: eui.Image;
        private fruit3: eui.Image;
        private fruit2: eui.Image;
        private fruit5: eui.Image;
        private fruit4: eui.Image;
        private treeGroup: eui.Group;
        private beganBtn: eui.Image;


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
