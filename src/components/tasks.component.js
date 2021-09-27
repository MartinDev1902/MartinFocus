import { footer, timer } from "..";
import Component from "../core/component";

class TasksComponent extends Component {
    constructor(id){
        super(id) }

    init(){
        this.tasks = JSON.parse(localStorage.getItem('tasks'))
        this.renderTasks()
    }

    changeTask(id, valueName, newValue){
        this.tasks.find(item => {
            if(item.id === id){
                item[valueName] = newValue
            }
        })
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
        this.renderTasks()
        footer.renderFooter()
    }

    renderTasks(){
        this.tasks = JSON.parse(localStorage.getItem('tasks'))
        this.$el.innerHTML = ''
        const tasks = this.tasks.map(task => taskTemplate(task))
        this.$el.insertAdjacentHTML('afterbegin', tasks.join(''))
        this.addEvents()
    }

    addEvents(){
        document.querySelectorAll('.js-minus').forEach(element => {
            element.addEventListener('click', e => {
                const newValue = (+e.target.parentElement.nextElementSibling.value) - 1
                if(newValue < 1) return
                e.target.parentElement.nextElementSibling.value = newValue
                this.changeTask(e.target.parentElement.nextElementSibling.dataset.id, 'pomodoroCount', newValue)
            })
        })

        document.querySelectorAll('.js-plus').forEach(element =>{
            element.addEventListener('click', e => {
                const newValue = (+e.target.parentElement.previousElementSibling.value) + 1
                e.target.parentElement.previousElementSibling.value = newValue

                this.changeTask(e.target.parentElement.previousElementSibling.dataset.id, 'pomodoroCount', newValue)
            })

        })
       

        document.querySelectorAll('.js-task-title').forEach(element => {
            element.addEventListener('click', e => {
                
                const answer = prompt('Write new task name')
                if(answer){
                    this.changeTask(e.target.dataset.id, 'title', answer)
                } 
            })
        })

        document.querySelectorAll('.js-remove-task').forEach(element => {
            element.addEventListener('click', e => {
             
                 this.tasks.find(item => {
                    if(item.id === e.target.parentNode.dataset.id){
                       const elementID = this.tasks.indexOf(item)
                       
                       this.tasks.splice(elementID, 1)
                        localStorage.setItem('tasks', JSON.stringify(this.tasks))
                        this.renderTasks()
                        footer.renderFooter()
                        return true                    
                        }
                })
               
            })
        })

        document.querySelectorAll('.js-play-timer').forEach(element => {
            element.addEventListener('click', e => {
                timer.stopTimer()
                timer.startTimer(e.target.parentElement.dataset.id)
            })
        })
    }
}

function taskTemplate(task){
    return `
    <div class="task-item">
    <div class="task-item__title js-task-title" data-id="${task.id}">${task.title}</div>

    <div class="task-item-control">

        <div class="task-item-control__counter-of margin_right">
            <span class="made">${task.pomodoroDone}</span>
             / 
             <span class="total">${task.pomodoroCount}</span> 
        </div>

        <div class="task-item-control__play-button margin_right js-play-timer" data-id="${task.id}"><i class="fas fa-play"></i></div>

        <div class="pomodoro-task-count margin_right">
            <span class="pomodoro-task-count__minus js-minus" ><i class="fas fa-minus"></i></span>
            <input class="pomodoro-task-count__value-input js-pomodoro-count" data-id="${task.id}" type="text" value="${task.pomodoroCount}" readonly>
            <span class="pomodoro-task-count__plus js-plus"><i class="fas fa-plus"></i></span>
        </div>

        <div class="task-item-settings js-remove-task" data-id="${task.id}"> <i class="fas fa-trash"></i></div>
    </div>
</div>
    `
}
export default TasksComponent