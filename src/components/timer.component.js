import Component from "../core/component"

class TimerComponent extends Component{
    constructor(id){
        super(id)  
    }

    init(){
        this.$startStopButton = this.$el.querySelector('#startStopButton')
        this.$nextTimerButton = this.$el.querySelector('#nextTimerButton')
        this.$timer = this.$el.querySelector('#timeCounter')


        this.$startStopButton.addEventListener('click', e => {
            const role = this.$startStopButton.dataset.role
            role === 'start' ? startTimer.call(this) : role === 'stop' ?  stopTimer.call(this) : null
        })
        this.$el.querySelector('#timerNavigation').addEventListener('click', timerNavigation.bind(this))
        this.$nextTimerButton.addEventListener('click', nextTimer.bind(this))
        
        this.$timer.innerHTML = JSON.parse(localStorage.getItem('martinFocusSettings')).pomodoro + ' : 00'  
    }

    showTimer = (timer, element) => {
        let time = JSON.parse(localStorage.getItem('martinFocusSettings'))[timer] 
    
        this.$el.querySelectorAll('.timer-navigation__item').forEach(element => {
            element.classList.remove('active_button')
        })
    
        this.$timer.innerHTML = time < 10 ? '0' + time + ' : 00' : time + ' : 00'
        element.classList.add('active_button')
    }

    turnButtonToStop = () => {
        this.$startStopButton.innerHTML = '<i class="fas fa-stop"></i> Stop'
        this.$nextTimerButton.removeAttribute('disabled')
        this.$startStopButton.dataset.role = 'stop'
    }

    turnButtonToStart = () =>{
        this.$startStopButton.innerHTML = '<i class="fas fa-play"></i> Start';
        this.$nextTimerButton.setAttribute('disabled', 'disabled')
        this.$startStopButton.dataset.role = 'start'

        clearInterval(this.pomodoroTimer)
    } 
}

function nextTimer(){
    this.turnButtonToStart()

    const activeTimer = this.$el.querySelector('.active_button').id

    switch(activeTimer){
        case 'tabPomodoroTimer':
            this.showTimer('shortBreak', this.$el.querySelector('#tabShortBreakTimer'))
            break
        case 'tabShortBreakTimer':
            this.showTimer('longBreak', this.$el.querySelector('#tabLongBreakTimer'))
            break
        case 'tabLongBreakTimer':
            this.showTimer('pomodoro', this.$el.querySelector('#tabPomodoroTimer'))
            break
    }
}


function timerNavigation(e){

    this.turnButtonToStart()
    
    switch(e.target.id){
        case 'tabPomodoroTimer':
            this.showTimer('pomodoro', e.target)
            break
        case 'tabShortBreakTimer':
            this.showTimer('shortBreak', e.target)
            break
        case 'tabLongBreakTimer':
            this.showTimer('longBreak', e.target)
            break
    }

    
}


function stopTimer(){

    this.turnButtonToStart()

    const activeTimer = this.$el.querySelector('.active_button').id

    switch(activeTimer){
        case 'tabPomodoroTimer':
            this.showTimer('pomodoro', this.$el.querySelector('#' + activeTimer))
            break
        case 'tabShortBreakTimer':
            this.showTimer('shortBreak', this.$el.querySelector('#' + activeTimer))
            break
        case 'tabLongBreakTimer':
            this.showTimer('longBreak', this.$el.querySelector('#' + activeTimer))
            break
    }
}


function startTimer(){

    this.turnButtonToStop()
    let time = +this.$timer.textContent.slice(0, this.$timer.textContent.indexOf(':')) * 60

    this.pomodoroTimer = setInterval(() => {

        if(--time <= 0) clearInterval(pomodoroTimer)
       
        let minutes = parseInt(time / 60, 10)
        let seconds = parseInt(time % 60, 10)
        
        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds
        

        this.$timer.innerHTML = minutes + ' : ' + seconds

    }, 1000);

}

export default TimerComponent





    