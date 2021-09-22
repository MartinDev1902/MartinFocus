import SettingsComponent from './components/settings.component'
import TimerComponent from './components/timer.component'
import { ModalWindow } from './core/modalWindow'
import './scss/main.scss'

const appSettings = JSON.parse(localStorage.getItem('martinFocusSettings'))
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
else{
    console.log(appSettings)
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




new ModalWindow({
    openModalButton: 'settings',
    modalWindowTitle: 'Settings',
    component: new SettingsComponent
})

new ModalWindow({
    openModalButton: 'login',
    modalWindowTitle: 'Login'
})

new ModalWindow({
    openModalButton: 'report',
    modalWindowTitle: 'Report'
})
