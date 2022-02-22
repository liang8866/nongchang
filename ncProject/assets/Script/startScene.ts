const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    accountLabel: cc.Label = null;

    @property
    text: string = 'hello';

    start () {
        // init logic
        
    }
    onLoad(): void {
        
    }
}
