// TODO: 我们可以把

class Director {
    private static instance: Director = null
    public static getInstance() {
        if (Director.instance) {
            Director.instance = new Director()
        }
        return Director.instance
    }

    /** 游戏层,其实就是Main层 */
    private gameLayer: Main = null
    /**
     * 其实应该抽象出来一个网络层,
     * 就能解决当通行证恢复的时候,
     * 如果主界面有打开的ui界面,
     * 会导致该界面被popScene掉没有考虑到关卡顶级的情况
     */
    private netLayer: NetLayerUtil = null
    /** 引导层 */
    private guidLayer: GuidLayerUtil = null
    public initWithMain(m: Main) {
        if (this.gameLayer == null) {
            this.gameLayer = m
        }

        if (this.netLayer == null) {
            this.netLayer = new NetLayerUtil()
            Display.stage.addChildAt(this.netLayer, 9)
        }
        if (this.guidLayer == null) {
            this.guidLayer = new GuidLayerUtil()
            Display.stage.addChildAt(this.guidLayer, 10)
        }
    }

    // ==== 牵扯游戏逻辑的层管理
    /** 场景替换,其他场景删除,除了Main */
    private repleseScene(layer: egret.DisplayObject) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.removeChildren()
            this.gameLayer.addChild(layer)
        }
    }

    /** 添加场景,放入堆中 */
    private stackLayer: egret.DisplayObject[]
    private pushScene(layer: egret.DisplayObject) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.addChild(layer)
            this.stackLayer.push(layer)
        }
    }

    /** 删除场景,推出 */
    private popScene(layer: egret.DisplayObject) {
        if (this.gameLayer != null && layer != null) {
            var len = this.stackLayer.length
            if (len) {
                var layer = this.stackLayer[len - 1]
                if (layer.parent == this.gameLayer) {
                    this.gameLayer.removeChild(layer)
                    Util.removeByElements(this.stackLayer, layer)
                }
            }
        }
    }

    // ==== 引导层
    public addGuidLayer() {
        this.guidLayer.addGuidLayer()
    }

    public getCurGuidLayer() {
        return this.guidLayer.curLayer
    }
    
    public cleanGuidLayer() {
        this.guidLayer.cleanGuidLayer()
    }

    // ==== 牵扯网络逻辑层管理
    // 网络等待
    public addNetWaitLayer() {
        this.netLayer.addWaitLayer()
    }

    // 强制下线
    public addNetOutLineLayer() {
        this.netLayer.addOutLineLayer()
    }
    
    // 网络错误
    public addNetErrorLayer() {
        this.netLayer.addErrorLayer()
    }

    // 清理网路异常的所有弹框
    public cleanNetLayer() {
        this.netLayer.cleanLayer()
    }
}