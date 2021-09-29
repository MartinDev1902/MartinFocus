import CreateTaskComponent from './components/createtask.component'
import FooterComponent from './components/footer.component'
import SettingsComponent from './components/settings.component'
import TasksComponent from './components/tasks.component'
import TimerComponent from './components/timer.component'
import { ModalWindow } from './core/modalWindow'
import './scss/main.scss'
import { store } from './store'




// Preloader
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hide')
    }, 2000)
})


// Mobile navigation
document.getElementById('mobileNavigationButton').addEventListener('click', () => {
    document.getElementById('headerNavigation').classList.toggle('visible')
})


// Initial components
export const timer = new TimerComponent('timer')
export const taskList = new TasksComponent('taskList')
const createTask = new CreateTaskComponent('createTask')
export const footer = new FooterComponent('footer')

// Modal Windows
new ModalWindow({
    openModalButton: 'settings',
    modalWindowTitle: 'Settings',
    component: new SettingsComponent
})
