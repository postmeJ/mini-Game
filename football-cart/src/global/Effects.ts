class Effects {

    public static jumpTo(obj: any, _x: number, _y: number, _sp: number = 1, _h: number = 88, fn?: Function, fnObj?: any, params?: any[], fn2?: Function, fnObj2?: any, params2?: any[]) {
        egret.Tween.removeTweens(obj);
        // console.log("[ pnl In ]", obj.name);
        // obj.scaleX = .8;
        // obj.scaleY = .8;
        // var xx: number = (obj.x + _x) * .5;
        var dis: number = egret.Point.distance(new egret.Point(_x, _y), new egret.Point(obj.x, obj.y));
        dis = Math.max(1, Math.pow(dis, .45) / 10) * _sp;
        // '移动中间位置'
        var yy: number = Math.min(obj.y, _y) - _h;
        // 这样写,可以把动作和callback拆分开来
        if (fn2) {
            egret.Tween.get(obj).to({ x: _x }, GloVar.SP_NORMAL * dis).call(fn, fnObj, params).call(fn2, fnObj2, params2);
            egret.Tween.get(obj).to({ y: yy }, GloVar.SP_FAST * dis, egret.Ease.circOut).to({ y: _y }, GloVar.SP_FAST * dis, egret.Ease.circIn);
        }
        if (fn) {
            egret.Tween.get(obj).to({ x: _x }, GloVar.SP_NORMAL * dis).call(fn, fnObj, params);
            egret.Tween.get(obj).to({ y: yy }, GloVar.SP_FAST * dis, egret.Ease.circOut).to({ y: _y }, GloVar.SP_FAST * dis, egret.Ease.circIn);
        }
        else {
            egret.Tween.get(obj).to({ x: _x }, GloVar.SP_NORMAL * dis);
            egret.Tween.get(obj).to({ y: yy }, GloVar.SP_FAST * dis, egret.Ease.circOut).to({ y: _y }, GloVar.SP_FAST * dis, egret.Ease.circIn);
        }
    }

    public static jumpLittle(obj: any, fn?: Function, fnObj?: any, params?: any[]) {
        egret.Tween.removeTweens(obj);
        var yy: number = obj.y;
        if (fn) {
            egret.Tween.get(obj).to({ y: yy - 10 }, GloVar.SP_FAST, egret.Ease.circOut).to({ y: yy + 6 }, GloVar.SP_FAST).to({ y: yy - 3 }, GloVar.SP_FAST).to({ y: yy }, GloVar.SP_FAST, egret.Ease.backOut).call(fn, fnObj, params);
        }
        else {
            egret.Tween.get(obj).to({ y: yy - 10 }, GloVar.SP_FAST, egret.Ease.circOut).to({ y: yy + 6 }, GloVar.SP_FAST).to({ y: yy - 3 }, GloVar.SP_FAST).to({ y: yy }, GloVar.SP_FAST, egret.Ease.backOut);
        }
    }

    public static sinkLittle(obj: any, fn?: Function, fnObj?: any, params?: any[]) {
        egret.Tween.removeTweens(obj);
        var yy: number = obj.y;
        if (fn) {
            egret.Tween.get(obj).to({ y: yy + 10 }, GloVar.SP_FAST, egret.Ease.circOut).to({ y: yy }, GloVar.SP_FAST, egret.Ease.backOut).call(fn, fnObj, params);
        }
        else {
            egret.Tween.get(obj).to({ y: yy + 10 }, GloVar.SP_FAST, egret.Ease.circOut).to({ y: yy }, GloVar.SP_FAST, egret.Ease.backOut);
        }
    }

    public static tanLittle(obj: any, _y: number = -999, fn?: Function, fnObj?: any, params?: any[]) {
        egret.Tween.removeTweens(obj);
        var yy: number = (_y == -999 ? obj.y : _y);
        if (fn) {
            egret.Tween.get(obj).to({ y: yy - 8 }, GloVar.SP_FAST).to({ y: yy }, GloVar.SP_FAST).call(fn, fnObj, params);
        }
        else {
            egret.Tween.get(obj).to({ y: yy - 8 }, GloVar.SP_FAST).to({ y: yy }, GloVar.SP_FAST);
        }
    }

    public static PopOut(obj: any, prop_name: string[], value: number[], fn?: Function, fnObj?: any, params?: any[]) {
        // egret.Tween.removeTweens(obj);
        var tween_data1: any = {};
        var tween_data2: any = {};
        var prop_num: number = prop_name.length;
        var i: number;
        for (i = 0; i < prop_name.length; i++) {
            tween_data1[prop_name[i]] = value[i] * .7;
            tween_data2[prop_name[i]] = value[i];
            // console.log("Effects	58: ", tween_data, prop_name[i], value[i]);
        }
        // console.log("Effects	60: ", tween_data, prop_num);

        if (fn) {
            egret.Tween.get(obj).to(tween_data2, GloVar.SP_NORMAL, egret.Ease.elasticOut).call(fn, fnObj, params);
        }
        else {
            egret.Tween.get(obj).to(tween_data1, GloVar.SP_FAST, egret.Ease.cubicIn).to(tween_data2, GloVar.SP_FAST, egret.Ease.elasticOut);
        }
    }

    public static tweenSteam(obj: any, prop_name: string[], value: number[], fn?: Function, fnObj?: any, params?: any[]) {
        // egret.Tween.removeTweens(obj);
        var tween_data1: any = {};
        var tween_data2: any = {};
        var prop_num: number = prop_name.length;
        var i: number;
        for (i = 0; i < prop_name.length; i++) {
            tween_data1[prop_name[i]] = value[i] * .7;
            tween_data2[prop_name[i]] = value[i];
            // console.log("Effects	58: ", tween_data, prop_name[i], value[i]);
        }
        // console.log("Effects	60: ", tween_data, prop_num);

        if (fn) {
            egret.Tween.get(obj).to(tween_data2, GloVar.SP_NORMAL, egret.Ease.elasticOut).call(fn, fnObj, params);
        }
        else {
            egret.Tween.get(obj).to(tween_data1, GloVar.SP_FAST, egret.Ease.cubicIn).to(tween_data2, GloVar.SP_FAST, egret.Ease.elasticOut);
        }
    }

    public static pnlIn(obj: any, fn?: Function) {
        // console.log("[ pnl In ]", obj.name);
        obj.scaleX = .8;
        obj.scaleY = .8;
        obj.alpha = 0;
        obj.y = (GloVar.STAGE_H - obj.height) * .5;
        obj.visible = true;
        if (fn) {
            egret.Tween.get(obj).wait(500).to({ scaleX: 1, scaleY: 1, alpha: 1, y: GloVar.STAGE_H * .5 }, GloVar.SP_NORMAL, GloVar.PNL_EASE_IN).call(fn);
        }
        else {
            egret.Tween.get(obj).wait(500).to({ scaleX: 1, scaleY: 1, alpha: 1, y: GloVar.STAGE_H * .5 }, GloVar.SP_NORMAL, GloVar.PNL_EASE_IN);
        }
    }

    public static pnlOut(obj: any, fn?: Function) {
        // console.log("[ pnl Out ]", obj.name);
        var v_scale = 1.1;
        if (fn) {
            egret.Tween.get(obj).to({ scaleX: v_scale, scaleY: v_scale, alpha: 0 }, GloVar.SP_NORMAL, GloVar.PNL_EASE_OUT).call(fn);
        }
        else {
            egret.Tween.get(obj).to({ scaleX: v_scale, scaleY: v_scale, alpha: 0 }, GloVar.SP_NORMAL, GloVar.PNL_EASE_OUT);
        }
    }

    public static pnlAlphaIn(obj: any, fn?: Function) {
        // console.log("[ pnl In ]", obj.name);
        obj.alpha = 0;
        obj.visible = true;
        if (fn) {
            egret.Tween.get(obj).wait(500).to({ alpha: 1 }, GloVar.SP_NORMAL, GloVar.PNL_EASE_IN).call(fn);
        }
        else {
            egret.Tween.get(obj).wait(500).to({ alpha: 1 }, GloVar.SP_NORMAL, GloVar.PNL_EASE_IN);
        }
    }

    public static pnlAlphaOut(obj: any, fn?: Function) {
        // console.log("[ pnl In ]", obj.name);
        if (fn) {
            egret.Tween.get(obj).to({ alpha: 0 }, GloVar.SP_NORMAL, GloVar.PNL_EASE_OUT).call(fn);
        }
        else {
            egret.Tween.get(obj).to({ alpha: 0 }, GloVar.SP_NORMAL, GloVar.PNL_EASE_OUT);
        }
    }

    public static showMapData(str: string) {
        console.log(str, ":	showMapData-----------");
        // var mapData_log:string;
        // for (var i = 0 ; i< GameData.MaxColumn; i++)
        // {
        // 	mapData_log = "";
        // 	for(var t = 0; t< GameData.MaxRow; t++)
        // 	{
        // 		mapData_log = mapData_log + " | " +GameData.mapData[i][t] + "/" + GameData.elements[(i*GameData.MaxColumn)+t].id + "/" + GameData.elements[(i*GameData.MaxColumn)+t].location;
        // 	}
        // 	console.log(str,":	", mapData_log);
        // }
        // console.log("---------------------------\n");
    }

    // public static createParitcal(_json: JSON_PARTICALE, _texture: TEXTURE_P): particle.GravityParticleSystem {
    //     var texture = RES.getRes(_texture + "_png");
    //     var config = RES.getRes(_json + "_json");
    //     return new particle.GravityParticleSystem(texture, config);
    // }

    // public static createMC(_json: JSON_MC, _texture: TEXTURE_MC): egret.MovieClip {
    //     var texture = RES.getRes(_texture + "_png");
    //     var config = RES.getRes(_json + "_json");
    //     var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(config, texture);
    //     return new egret.MovieClip(mcFactory.generateMovieClipData(<string>_json));
    // }



    public static objUp(obj: any, fn?: Function) {
        // console.log("[ pnl In ]", obj.name);
        // obj.alpha = 1;
        // obj.visible = true;
        if (fn) {
            egret.Tween.get(obj).wait(100).to({ y: obj.y - 30 }, GloVar.SP_SLOW, GloVar.PNL_EASE_IN).to({ alpha: 0 }, GloVar.SP_NORMAL, GloVar.PNL_EASE_IN).call(Effects.delObj, obj, [obj]).call(fn);
        }
        else {
            egret.Tween.get(obj).wait(100).to({ y: obj.y - 30 }, GloVar.SP_SLOW, GloVar.PNL_EASE_IN).to({ alpha: 0 }, GloVar.SP_NORMAL, GloVar.PNL_EASE_IN).call(Effects.delObj, obj, [obj]);
        }
    }

    private static delObj(obj: any) {
        obj.parent.removeChild(obj);
    }

    public static createPiaoZi(text: string, _x: number = 0, _y: number = 0, _c: number = 0xcccccc) {
        var tf: egret.TextField = new egret.TextField();
        tf.fontFamily = "微软雅黑";
        tf.width = 200;
        tf.textAlign = egret.HorizontalAlign.CENTER;
        tf.size = 48;
        tf.textColor = _c;
        tf.stroke = 5;
        tf.strokeColor = 0x333333;
        tf.x = _x - 100;//GamePlaying.inst.score1.x -100;
        tf.y = _y;//GamePlaying.inst.score1.y + 100;
        // console.log("levelData   38:", add_time.x, add_time.y);

        tf.text = text;


        // console.log("LevelData  53: ", LevelData.point);
        // GamePlaying.inst.addChild(tf);
        LayerM.add(tf, LAYER.UI.EFF);
        Effects.objUp(tf);//, new function d(){tf.parent.removeChild(tf);});

    }
}