module SOUND {
    export enum BGM {
        BGM1,
        MAX
    }

    export enum EFF {
        START,
        CLICK,
        PK,
        WIN,
        MAX
    }
}

class Sounds extends egret.DisplayObjectContainer {
    private list_bgm: string[] = ['Music.mp3']
    private list_sound: string[] = [
        'sound_start.mp3',
        'snd_sou.wav',
        'shao.mp3',
        'win.mp3'
    ]

    public constructor() {
        super()
    }

    public static _instance: Sounds
    public static get inst(): Sounds {
        if (!Sounds._instance) {
            Sounds._instance = new Sounds()
        }
        return Sounds._instance
    }

    private sound: egret.Sound[] = new Array()
    private sound_channel: egret.SoundChannel[] = []

    private bgm: egret.Sound[] = new Array()
    private bgm_channel: egret.SoundChannel
    private bgm_curr: number = -1
    private load_curr: number = 0

    public startLoad() {
        this.loadBGM(0)
    }

    private loadBGM(soundID: SOUND.BGM) {
        let url: string;
        if (soundID < SOUND.BGM.MAX) {
            url = 'resource/sound/' + this.list_bgm[soundID]
        } else {
            this.loadEFF(0)
            return
        }

        let sound: egret.Sound = new egret.Sound()
        sound.type = egret.Sound.MUSIC
        sound.addEventListener(egret.Event.COMPLETE, this.onBGMLoadComplete, this)
        sound.load(url)

        this.load_curr = soundID + 1
    }

    private loadEFF(soundID: SOUND.EFF) {
        let url: string
        if (soundID < SOUND.EFF.MAX) {
            url = 'resource/sound/' + this.list_sound[soundID]
        }
        else {
            return
        }

        let sound: egret.Sound = new egret.Sound()
        sound.type = egret.Sound.MUSIC
        sound.addEventListener(egret.Event.COMPLETE, this.onSoundLoadComplete, this)
        sound.load(url)

        this.load_curr = soundID + 1
    }

    /** play effect */
    public play(soundID: SOUND.EFF) {
        this.sound_channel[soundID] = this.sound[soundID].play(0, 1)
        this.sound_channel[soundID].volume = .5
        this.sound_channel[soundID].addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this)
    }

    /** stop effect */
    public stop(soundID: SOUND.EFF) {
        this.sound_channel[soundID].stop()
    }

    /** play music */
    public playBGM(soundID: SOUND.BGM) {
        if (this.bgm.length > soundID) {
            this.bgm_channel = this.bgm[soundID].play()
            this.bgm_channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this)
        }
        else {
            this.bgm_curr = soundID
        }
    }

    private onSoundLoadComplete(event: egret.Event): void {
        egret.log('sounds onSoundLoadComplete: ', this.load_curr, <egret.Sound>event.target)
        
        let sound: egret.Sound = <egret.Sound>event.target

        this.sound.push(sound)
        this.loadEFF(this.load_curr)
    }

    private onBGMLoadComplete(event: egret.Event): void {
        egret.log('sounds onBGMLoadComplete: ', this.load_curr, <egret.Sound>event.target)

        let sound: egret.Sound = <egret.Sound>event.target;

        this.bgm.push(sound)
        this.loadBGM(this.load_curr)
        if (this.bgm_curr > -1) {
            this.playBGM(this.load_curr)
        }
    }

    private onSoundComplete(event: egret.Event): void {

    }
}