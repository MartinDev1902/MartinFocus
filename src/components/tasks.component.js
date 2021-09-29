import { footer, timer } from ".."
import Component from "../core/component"
import { store } from "../store"
import LocalStorageService from "../services/localstorage.service"


class TasksComponent extends Component {
    constructor(id){
        super(id) }

    init(){
        this.renderTasks()

        this.$el.addEventListener('click', e => {
            const id = e.target.closest('.task-item').dataset.id
            const closestControlButton = e.target.closest('.task-control-button')
            const role = closestControlButton ? closestControlButton.dataset.role : null

            switch(role){
                case 'changeTitle':
                    const answer = prompt('Write new task name')
                    if(answer) this.changeTask(id, 'title', answer) 
                    break
                case 'playTimer':
                    timer.stopTimer()
                    timer.startTimer(id)
                    break
                case 'minusPomodoroCount':
                    let minusValue = +closestControlButton.nextElementSibling.value - 1
                    if(minusValue < 1) break
                    closestControlButton.nextElementSibling.value = minusValue
                    this.changeTask(id, 'pomodoroCount', minusValue)
                    break
                case 'plusPomodoroCount':
                     let plusValue = +closestControlButton.previousElementSibling.value + 1
                     closestControlButton.previousElementSibling.value = plusValue
                     this.changeTask(id, 'pomodoroCount', plusValue)
                     break
                case 'removeTask':
                    store.dispatch({ type: 'REMOVE_TASK', id }, () => {
                        LocalStorageService.setData('tasks', store.getState().tasks)
                        this.renderTasks()
                        footer.renderFooter()
                    })
                    break
                default:
                    break
            }
        })
    }

    changeTask(id, valueName, newValue){
        store.dispatch({type: 'CHANGE_TASK', taskInfo: { id, valueName, newValue }}, () => {
            LocalStorageService.setData('tasks', store.getState().tasks)
            this.renderTasks()
            footer.renderFooter()
        })        
    }

    renderTasks(){
        this.$el.innerHTML = ''
        store.getState().tasks.map(task => this.$el.insertAdjacentHTML('afterbegin', taskTemplate(task)))
    }
}

function taskTemplate({id, title, pomodoroDone, pomodoroCount}){
    return `
    <div class="task-item" data-id="${id}">
    <div class="task-item__title task-control-button" data-role="changeTitle">${title}</div>

    <div class="task-item-control">

        <div class="task-item-control__counter-of margin_right">
            <span class="made">${pomodoroDone}</span>
             / 
             <span class="total">${pomodoroCount}</span> 
        </div>

        <div class="task-item-control__play-button margin_right js-play-timer task-control-button" data-role="playTimer"><i class="fas fa-play"></i></div>

        <div class="pomodoro-task-count margin_right">
            <span class="pomodoro-task-count__minus task-control-button" data-role="minusPomodoroCount"><i class="fas fa-minus"></i></span>
            <input class="pomodoro-task-count__value-input" type="text" value="${pomodoroCount}" readonly>
            <span class="pomodoro-task-count__plus task-control-button" data-role="plusPomodoroCount"><i class="fas fa-plus"></i></span>
        </div>

        <div class="task-item-settings task-control-button" data-role="removeTask"> <i class="fas fa-trash"></i></div>
    </div>
</div>
    `
}
export default TasksComponent