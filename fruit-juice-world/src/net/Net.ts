class Net {
    private static instance: Net = null
    public static getInstance() {
        if (Net.instance == null) {
            Net.instance = new Net()
        } 
        return Net.instance
    }
}