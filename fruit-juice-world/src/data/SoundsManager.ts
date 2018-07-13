class SoundsManager {
    private static bgSoundChannel: egret.SoundChannel = null;

    public static playBtnMusic() {
        this.playMusic("button_mp3");
    }

    public static playClickCellMusic() {
        this.playMusic("dianji_mp3");
    }

    public static playWinMusic() {
        this.playMusic("win_mp3");
    }

    public static playLoseMusic() {
        this.playMusic("lose_mp3");
    }

    private static playMusic(str: string) {
        var sound: egret.Sound = RES.getRes(str.toString())
        if (sound) {
            this.bgSoundChannel = sound.play(0, 1)
        }
    }

    public static playRemoveCellMusic(len) {
        // 有声音顺序
        var soundArr = [
            "efx_combine_1_mp3",
            "efx_combine_2_mp3",
            "efx_combine_3_mp3",
            "efx_combine_4_mp3",
            "efx_combine_5_mp3",
            "efx_combine_6_mp3",
            "efx_combine_7_mp3"
        ];
        if (len >= 6) {
            len = 6;
        }
        this.playMusic(soundArr[len]);
    }
}