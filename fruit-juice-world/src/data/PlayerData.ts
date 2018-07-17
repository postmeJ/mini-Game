/**
 * 1. 记录基本的玩家数据
 * 2. 提供接口,修改本类中保存的数据
 */

class PlayerData {
    private static prefix = 'fruit_juice_world'

    public static data = {
        fightLv: 1,
        gold: 0,
        heart: 0
    }

    public static initData() {
        let localData = this.get()
        if (localData) {
            this.data = JSON.parse(localData);
        }
    }

    public static saveLv(lv: number) {
        if (lv >= this.data.fightLv) {
            this.data.fightLv = lv
        }
        this.save()
    }

    public static get() {
        return egret.localStorage.getItem(`${this.prefix}_data`)
    }

    private static save() {
        var s = JSON.stringify(this.data)
        egret.localStorage.setItem(`${this.prefix}_data`, s)
    }
}