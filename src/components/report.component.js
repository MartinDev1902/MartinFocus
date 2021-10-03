import { timer } from ".."
import { store } from "../store"
import LocalStorageService from "../services/localstorage.service"
class ReportComponent {
    constructor(){ 
        this.settings = store.getState().settings        
    }

    afterRender(callback){
        const completedTasks = store.getState().tasks.map(item => {
            if(item.completed === true){
                return `<div class="completed-task-list__item">
                        <div class="task-title">${item.title}</div>
                        <div class="task-pomodoro-done">${item.pomodoroDone}</div>
                </div>`
            }
        })
        document.getElementById('completedTaskList').insertAdjacentHTML('beforeend', completedTasks.join(' '))
       
    }

    render(){
        return `<div id="reportWindow">
            <div id="completedTaskList" class="completed-task-list">
                <div class="report-header">
                <div class="title ">Title</div>
            <div class="pomodoro-done">Pomodoro done</div></div>
            </div>
        </div>`
    }
}
export default ReportComponent