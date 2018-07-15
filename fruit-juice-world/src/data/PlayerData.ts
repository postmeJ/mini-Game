class PlayerData {
    private static prefix = 'fruit_juice_world'

    public static data = {
        fightLv: 1,
        gold: 0,
        heart: 0
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