
let ConfigMgr = new class { 
    
    ageArray:any = [];
    docMap:any = new Map();// 事件文案                  doc.json
    actionEventMap:any =  new Map();// 行为事件          actionEvent.json
    advMeetingMap:any=  new Map();// 奇遇事件            advMeeting.json
    ageMap:any = new Map();//年龄事件池                 age.json
    artifactMap:any =  new Map();// 神器功法             artifact.json
    fateEventMap:any =  new Map();// 逆天改名事件        fateEvent.json
    mainLandArray:any =  [];//大陆分类              mainLand.json
    randEventMap:any =  new Map();// 随机事件            randEvent.json
    talentMap:any =  new Map();//天赋池                  talent.json

    //相关定义 品质对应值
    TYPE_Q1:number = 1;
    TYPE_Q2:number = 2;
    TYPE_Q3:number = 3;
    TYPE_Q4:number = 4;
    TYPE_Q5:number = 5;
   
    //临时的
    talentQualityData:any = [];///二维数组

    initAllConfigJson()
    {
        this.parseToMap("mainLand.json",this.mainLandArray,false);
        this.parseToMap("doc.json",this.docMap,true);
        this.parseToMap("actionEvent.json", this.actionEventMap,true);
        this.parseToMap("advMeeting.json",this.advMeetingMap,true);
        this.parseToMap("age.json",this.ageArray,false);
        this.parseToMap("artifact.json",this.artifactMap,true);
        this.parseToMap("fateEvent.json", this.fateEventMap,true);
        this.parseToMap("randEvent.json",this.randEventMap,true);
        this.parseToMap("talent.json",this.talentMap,true);
       
    };

    parseToMap(json_name:string,ConfigMap:any,isToMap:boolean)
    {
        let json_url = 'data/' + json_name;
        let Configdata = [];
       
        cc.loader.loadRes(json_url, (err, data: cc.JsonAsset) => {
            if (err) {
                cc.log("------>>josn error "+ json_url);
            } else {
                Configdata = data.json;
                //cc.log(Configdata);
                if(isToMap == true)
                {
                    for(var key in Configdata) {
                        var configInfo = Configdata[key];
                        ConfigMap.set(configInfo.id, configInfo);  
                    }
                }else{
                    // ConfigMap = Configdata;
                    for(var key in Configdata) {
                        var configInfo = Configdata[key];
                        ConfigMap.push(configInfo);  
                    }
                   
                }
               
               
            }
        });
      
    };
    parseAgeToMap()
    {
        for(let i =0;i<this.ageArray.length;i++)
        {
            let itemAge = this.ageArray[i];
            this.ageMap.set(itemAge.age, itemAge);  
        }
        
    }
    parseStrIntArr(str:string, del:string) {
        let strs:Array<any> = str.split(del);
        for(var i = 0; i < strs.length; i++) {
            strs[i] = parseInt(strs[i]);
        }

        return strs;
    };
    
    load_json(json_name:string) {
        let json_url = 'data/' + json_name;
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(json_url, (err, data: cc.JsonAsset) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.json);
                }
            });
        });
    };
    getQualityColor (quality:any) {
        let color:any = cc.color(255, 255, 255);
        if(quality == 1) {
            color = cc.color(255, 255, 255);
        }else if(quality == 2) {
            color = cc.color(0, 255, 0);
        }else if(quality == 3) {
            color = cc.color(0, 0, 255);
        }else if(quality == 4) {
            color = cc.color(255, 0, 255);
        }else if(quality == 5) {
            color = cc.color(255, 255, 0);
        }else if(quality == 6) {
            color = cc.color(255, 0, 0);
        }

       return color
   }

   //获取随机数
   getRandomNum(Min:number,Max:number){
        let Range = Number(Max) - Number(Min);
        let Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

 
  
    



   
};
window["ConfigMgr"] = ConfigMgr
