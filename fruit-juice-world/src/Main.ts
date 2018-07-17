/**
 * 1. 注册样式样式器
 * 2. 加载resource资源加载库
 * 3. 加载皮肤
 * 4. 加载preload资源组
 * 5. 跳转到login场景
 */

class Main extends eui.UILayer {
    // http://bbs.egret.com/thread-25738-1-1.html
    // 大致看明白了，那似乎对于各种数据操作、控件增加监听等，
    // 在createChildren方法内更合适些？
    // 因为COMPLETE有时候会遇到皮肤解析完，但类内数据未加载之类的情况？

    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren()

        /** 注册样式适配器 */
        var assetAdapter = new AssetAdapter()
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        // egret_4399_h5api.initGame(Config.gameId, Config.gameName, this.stage.stageWidth, this.stage.stageHeight)

        this.loadingView = new LoadingUI()
        this.stage.addChild(this.loadingView)

        // 初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/")
    }

    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this)

        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        /** 加载组preload资源 */
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }

    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }

    private createScene() {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.startCreateScene();
        }
    }

    /**
     * 资源组加载出错
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建场景界面
     */
    protected startCreateScene(): void {
        Director.getInstance().initWithMain(this);
        PlayerData.initData();
        // DCAgentMgr.init();// DC统计
        //var layer = new CleanWithLineGameScene();
        SceneManager.gotoLogin();
        //SceneMgr.gotoIndex();
        //SceneMgr.gotoGame();
        //SceneMgr.gotoTest();
        //SceneMgr.gotoChat();
    }
}
