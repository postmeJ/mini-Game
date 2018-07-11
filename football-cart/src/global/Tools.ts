class Tools {
    public static createMC(name: string): egret.MovieClip {
        let tex = RES.getRes(name + '_png')
        let data = RES.getRes(name + '_json')
        let mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, tex)
        let _mc: egret.MovieClip = new egret.MovieClip(mcf.generateMovieClipData(name))
        return _mc
    }

    public static getTips(): string {
        let tips: string = ''
        let _rand: number = Math.floor(Math.random() * 100) % 7
        if (_rand === 0) {
            tips = '[纯]系列 - 纯粹，朴实无华，回归本心。'
        }
        return tips
    }

    public static getOverTitle(): string {
        let tips: string
        let _rand: number = Math.floor(Math.random() * 100) % 4
        if (_rand === 0) {
            tips = '止步于此'
        } else if (_rand === 1) {
            tips = '发挥失常'
        } else if (_rand === 2) {
            tips = '惨遭淘汰'
        } else if (_rand === 3) {
            tips = '我不服'
        }

        return tips
    }
}