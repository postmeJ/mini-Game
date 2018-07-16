class SceneManager {
    /** 跳转到'加载'和'登陆'界面 */
    public static gotoLogin() {
        let loading = new ResLoading()
        Director.getInstance().pushScene(loading)

        let call = new CallBackFunc().handler(SceneManager.onLogin, this, [])
        // TODO login logoin
        loading.load(['com', 'fruit', 'login', 'mp3'], call)
    }

    public static onLogin() {
        let layer = new Login()
        Director.getInstance().replaceScene(layer)
    }
    
    public static gotoIndex() {
        var loading = new ResLoading();
        Director.getInstance().pushScene(loading);
        var call = new CallBackFunc().handler(SceneManager.onIndex, this, []);
        loading.load(["map", "index", "json"], call);
    }

    private static onIndex() {
        let layer = new IndexScene()
        Director.getInstance().replaceScene(layer)
    }

    /**
     * to game
     */
    public static gotoGame() {
        let loading = new ResLoading()
        Director.getInstance().pushScene(loading)

        var call = new CallBackFunc().handler(SceneManager.onGame, this, []);
        loading.load(["cell", "fruit", "json"], call);
    }

    private static onGame() {
        let layer = new GameScene()
        Director.getInstance().replaceScene(layer)
    }

    /** 重玩当前的层级 */
    public static replayLv() {
        GameData.curScore = 0
        GameData.curStep = GameData.targetStep
        GameData.isOver = false
        GameData.isWin = false

        let layer = new GameScene()
        Director.getInstance().replaceScene(layer)
    }
}