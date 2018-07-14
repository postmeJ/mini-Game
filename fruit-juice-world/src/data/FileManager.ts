class FileManager {
    public static getLvConfigDataById(id: number) {
        var format = Util.formatString(["%04s", id])
        var jsonFile = RES.getRes('lvcfg_json')
        for (let k in jsonFile) {
            let item = jsonFile[k]
            if (item['id'] == format.toString()) {
                return item
            }
        }
        return null
    }
}