import CreateTaskComponent from './components/createtask.component'
import FooterComponent from './components/footer.component'
import SettingsComponent from './components/settings.component'
import TasksComponent from './components/tasks.component'
import TimerComponent from './components/timer.component'
import { ModalWindow } from './core/modalWindow'
import './scss/main.scss'

const appSettings = JSON.parse(localStorage.getItem('martinFocusSettings'))
const tasks = JSON.parse(localStorage.getItem('tasks'))
if(!appSettings){
    localStorage.setItem('martinFocusSettings', JSON.stringify({
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
        longBreakInterval: 4,
        autoStartBreak: true,
        autoStartPomodoro: true
    }))
}

if(!tasks){
    localStorage.setItem('tasks', JSON.stringify([]))
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hide')
    }, 2000)
})

document.getElementById('mobileNavigationButton').addEventListener('click', () => {
    document.getElementById('headerNavigation').classList.toggle('visible')
})


export const timer = new TimerComponent('timer', appSettings)
export const taskList = new TasksComponent('taskList')
const createTask = new CreateTaskComponent('createTask')

export const footer = new FooterComponent('footer')


new ModalWindow({
    openModalButton: 'settings',
    modalWindowTitle: 'Settings',
    component: new SettingsComponent
})
