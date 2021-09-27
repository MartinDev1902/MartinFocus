import { footer, taskList } from "../index";
import Component from "../core/component";

class CreateTaskComponent extends Component{
    constructor (id){
        super(id)

        this.$el.addEventListener('submit', this.createTask)
    }

    createTask(e){
        e.preventDefault()
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        const taskTitle = e.target.taskTitle.value
        if(taskTitle === ''){
            alert('Write your task!!!')
            return false
        }
        let task = {
            id:  createID(),
            title: taskTitle,
            pomodoroCount: 4,
            pomodoroDone: 0,
            completed: false
        }

        const newTasks = [...tasks, task]

        
        localStorage.setItem('tasks', JSON.stringify(newTasks))
        e.target.taskTitle.value = ''
        taskList.renderTasks()
        footer.renderFooter()
    }
}


export default CreateTaskComponent



function createID() {return '_' + Math.random().toString(36).substr(2, 9)}