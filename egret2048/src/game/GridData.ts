class GridItemData {
    public i: number
    public j: number
    public value: number = 0
    public item: GridItem

    public get disX(): number {
        let _half: number = 125 >> 1
        let disX: number = 20 + (20 + 125) * this.j + _half
        return disX
    }

    public get disY(): number {
        let _half: number = 125 >> 1
        let disY: number = 20 + (20 + 125) * this.i + _half
        return disY
    }
}