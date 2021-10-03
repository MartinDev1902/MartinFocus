import { activeTask, footer, taskList, timer } from "../index";
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
            if(store.getState().activeTask === 'defaultTask'){
                const element = store.getState().tasks.find(item => (item.completed !== true))
                store.dispatch({type: 'SET_ACTIVE_TASK', id: element.id}, () => {
                    LocalStorageService.setData('activeTask', store.getState().activeTask)
                    timer.createPomodoroDoneCounter()
                })
            }
            LocalStorageService.setData('tasks', store.getState().tasks)
            e.target.taskTitle.value = ''
            taskList.render()
            activeTask.render()
            footer.render()
        })       
    }
}


export default CreateTaskComponent



function createID() {return '_' + Math.random().toString(36).substr(2, 9)}