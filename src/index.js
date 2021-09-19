import TimerComponent from './components/timer.component'
import './scss/main.scss'

initApplication()

const timer = new TimerComponent('timer')


function initApplication(){

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
}
