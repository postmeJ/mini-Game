class Login extends eui.Component {
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

        this.skinName = 'LoginSkin'

        this.init();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private addToStage() {
        this.initDB();

        this.beganBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegan, this);
        // var tw = egret.Tween.get(this.beganBtn, { loop: true });
        // tw.to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000);

        // egret的重复的写法
        egret.Tween.get(this.beganBtn, { loop: true })
            .to({ scaleX: 0.8, scaleY: 0.8 }, 1000)
            .to({ scaleX: 1, scaleY: 1 }, 1000)
    }

    /** 初始化椰子树的动画效果 */
    private initDB() {
        var data = RES.getRes("tree_json");
        var textureData = RES.getRes("textureTree_json");
        var texture = RES.getRes("textureTree_png");
        var dragonFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dragonFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(data));
        dragonFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));

        var armature: dragonBones.Armature = dragonFactory.buildArmature("Armature");

        this.treeGroup.addChild(armature.display);
        armature.display.x = 150;
        armature.display.y = 200;

        dragonBones.WorldClock.clock.add(armature);
        armature.animation.gotoAndPlay("run", -1, -1, 0);

        egret.Ticker.getInstance().register(
            function () {
                dragonBones.WorldClock.clock.advanceTime(0.01)
            }, this);
    }

    private onBegan() {
        SoundsManager.playBtnMusic()
        SceneManager.gotoIndex()
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
