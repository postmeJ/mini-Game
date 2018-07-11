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

    // onLoad () {},

    start() {
        let sprite, scale_max, scale_min, seq, rf;

        sprite = cc.find("Canvas/boom1");
        scale_max = cc.scaleTo(1.5, 1.1);
        scale_min = cc.scaleTo(1.5, 0.9);
        seq = cc.sequence([scale_max, scale_min]);
        rf = cc.repeatForever(seq);
        sprite.runAction(rf);
        
        sprite = cc.find("Canvas/boom2");
        scale_max = cc.scaleTo(2.5, 1.1);
        scale_min = cc.scaleTo(2.5, 0.9);
        seq = cc.sequence([scale_max, scale_min]);
        rf = cc.repeatForever(seq);
        sprite.runAction(rf);
        
        sprite = cc.find("Canvas/boom3");
        scale_max = cc.scaleTo(2.5, 0.9);
        scale_min = cc.scaleTo(2.5, 1.1);
        seq = cc.sequence([scale_max, scale_min]);
        rf = cc.repeatForever(seq);
        sprite.runAction(rf);
        
        var start_button = cc.find("Canvas/btnStart");
        var rot = cc.rotateBy(1.2, 360).easing(cc.easeCubicActionOut());
        rf = cc.repeatForever(rot);
        start_button.runAction(rf);
        
        cc.audioEngine.stopAll();
        cc.audioEngine.play(cc.url.raw("resources/sounds/bg.mp3"), true);
    },

    // update (dt) {},

    clickHandler() {
        cc.director.loadScene('game');
    }
});
