
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/dragonBones/dragonBones.js",
	"libs/modules/tiled/tiled.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/data/Config.js",
	"bin-debug/data/FileManager.js",
	"bin-debug/data/PlayerData.js",
	"bin-debug/data/SceneManager.js",
	"bin-debug/data/SoundsManager.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/module/game/Cell.js",
	"bin-debug/module/game/CellManager.js",
	"bin-debug/module/game/DCAgentManager.js",
	"bin-debug/module/game/GameConfig.js",
	"bin-debug/module/game/GameData.js",
	"bin-debug/module/game/GameEnterDlg.js",
	"bin-debug/module/game/GameEvent.js",
	"bin-debug/module/game/GameMissionProgress.js",
	"bin-debug/module/game/GameProgress.js",
	"bin-debug/module/game/GameScene.js",
	"bin-debug/module/game/GameUI.js",
	"bin-debug/module/index/IndexButton.js",
	"bin-debug/module/index/IndexGroup.js",
	"bin-debug/module/index/IndexScene.js",
	"bin-debug/module/index/IndexUI.js",
	"bin-debug/module/loading/ResLoading.js",
	"bin-debug/module/login/Login.js",
	"bin-debug/module/lose/LoseLayer.js",
	"bin-debug/module/pause/PauseLayer.js",
	"bin-debug/module/win/WinUI.js",
	"bin-debug/net/Net.js",
	"bin-debug/net/NetError.js",
	"bin-debug/net/NetMsg.js",
	"bin-debug/net/NetWait.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/util/CallBackFunc.js",
	"bin-debug/util/Director.js",
	"bin-debug/util/Display.js",
	"bin-debug/util/GuidLayerUtil.js",
	"bin-debug/util/NetLayerUtil.js",
	"bin-debug/util/Tips.js",
	"bin-debug/util/Util.js",
	"bin-debug/util/_Animation.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};