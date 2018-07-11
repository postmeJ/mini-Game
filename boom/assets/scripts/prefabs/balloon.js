// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.anim = this.node.getChildByName('anim')
        this.inAnim = this.node.getChildByName('inAnim')
        this.isMoving = false

        this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
            e.stopPropagationImmediate()

            // 表示还在产生中,不能搓破
            if (!this.isMoving) {
                return
            }

            this.onBalloonBomb()
        }, this.node)
    },

    start() {
    },

    update(dt) {
        if (!this.isMoving) {
            return
        }

        let dy = dt * this.speed
        this.node.y += dy

        if (this.node.y >= 1024) {
            this.node.removeFromParent()
        }
    },

    genBalloon(type, speed) {
        if (type < 1 || type > 7) {
            return
        }

        cc.audioEngine.play(cc.url.raw("resources/sounds/ad_1.mp3"), false)

        // idle
        this.isMoving = false
        this.speed = speed
        this.ballType = type
    },

    onBalloonBomb() {
        
    }
});
