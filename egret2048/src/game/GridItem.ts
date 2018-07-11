class GridItem extends eui.Component {
    public grid: eui.Rect
    public numTxt: eui.Label
    public data: {num, color, bg, size}
    // private _num: number

    public constructor() {
        super()
        this.skinName = 'GameGridItem'
        this.touchEnabled = false
        this.anchorOffsetX = this.width >> 1
        this.anchorOffsetY = this.height >> 1
    }

    public setData(data: {num, color, bg, size}): void {
        this.data = data
        
        // 显示的矩形填充颜色
        // 不知道是哪个属性的话,查看下该节点的所有属性
        this.grid.fillColor = data.bg

        if (data.num > 0) {
            this.numTxt.visible = true
            this.numTxt.text = data.num + ''
            this.numTxt.size = data.size
            this.numTxt.textColor = data.color
        }
        else {
            this.numTxt.visible = false
        }
    }

    public get num(): number {
        return this.data.num
    }
}