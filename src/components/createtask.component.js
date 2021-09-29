import { footer, taskList } from "../index";
import Component from "../core/component";
import { store } from "../store";
import LocalStorageService from "../services/localstorage.service"

class CreateTaskComponent extends Component{
    constructor (id){
        super(id)
        this.$el.addEventListener('submit', this.createTask)
    }

    createTask(e){
        e.preventDefault()
        const taskTitle = e.target.taskTitle.value
        if(taskTitle === ''){
            alert('Write your task!!!')
            return false
        }

        store.dispatch({ type: 'CREATE_TASK', task: { id:  createID(), title: taskTitle, pomodoroCount: 4, pomodoroDone: 0, completed: false }}, () => {
            LocalStorageService.setData('tasks', store.getState().tasks)
            e.target.taskTitle.value = ''
            taskList.renderTasks()
            footer.renderFooter()
        })       
    }
}


export default CreateTaskComponent



function createID() {return '_' + Math.random().toString(36).substr(2, 9)}