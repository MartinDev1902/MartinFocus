import { taskList } from "..";
import Component from "../core/component";
import { store } from "../store";

class ActiveTaskComponent extends Component{
    constructor(id){
        super(id)
    }
    init(){
        super.init()
    }

    render(){
        let activetask
        if(store.getState().activeTask !== 'defaultTask'){
           activetask = taskList.getTaskById(store.getState().activeTask).title
        } else {
            activetask = 'Just working'
        }
        const text = activetask
        this.$el.innerHTML = text
    }
}

export default ActiveTaskComponent