import Component from "../core/component"
import { store } from "../store"

class TimerComponent extends Component{
    constructor(id){
        super(id)  
        this.options = store.getState().settings
        this.loopCount = 0
    }

    init(){
        this.tasks = store.getState.tasks
        this.$startStopButton = this.$el.querySelector('#startStopButton')
        this.$nextTimerButton = this.$el.querySelector('#nextTimerButton')
        this.$timer = this.$el.querySelector('#timeCounter')


        this.$startStopButton.addEventListener('click', e => {
            const role = this.$startStopButton.dataset.role
            role === 'start' ? this.startTimer() : role === 'stop' ?  stopTimer.call(this) : null
        })

        this.$el.querySelector('#timerNavigation').addEventListener('click', timerNavigation.bind(this))
        this.$nextTimerButton.addEventListener('click', () => { this.nextTimer() })
        
        this.$timer.innerHTML = JSON.parse(localStorage.getItem('martinFocusSettings')).pomodoro + ' : 00'  
    }



    /**
     * 
     * @param {string} timer - name od timer (pomodoro, shortBreak or longBreak)
     * @param {object} element - DOM element of timer
     * 
    */
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

    nextTimer(){
        this.turnButtonToStart()
    
        const activeTimer = this.$el.querySelector('.active_button').id
       
        switch(activeTimer){
            case 'tabPomodoroTimer':
                this.loopCount++
                if(this.loopCount === +this.options.longBreakInterval)  {
                    this.showTimer('longBreak', this.$el.querySelector('#tabLongBreakTimer'))
                    if(this.options.autoStartBreak){this.startTimer()}
                    break
                }
                if(this.options.autoStartBreak){}
                this.showTimer('shortBreak', this.$el.querySelector('#tabShortBreakTimer'))
                if(this.options.autoStartBreak){this.startTimer()}
                break
            case 'tabShortBreakTimer':
                this.showTimer('pomodoro', this.$el.querySelector('#tabPomodoroTimer'))
                if(this.options.autoStartPomodoro){this.startTimer()}
                break
            case 'tabLongBreakTimer':
                this.showTimer('pomodoro', this.$el.querySelector('#tabPomodoroTimer'))
                if(this.options.autoStartPomodoro){this.startTimer()}
                this.loopCount = 0
                break
        }
    }


    startTimer(taskID, incrementPomdoroDone){
        this.turnButtonToStop()
        if(taskID){
            const activeTask = this.tasks.find(item => item.id === taskID)
            document.getElementById('activeTask').textContent = activeTask.title
            localStorage.setItem('activeTask', JSON.stringify(activeTask.id))
        }

    
        let time = +this.$timer.textContent.slice(0, this.$timer.textContent.indexOf(':')) * 60
        
        this.pomodoroTimer = setInterval(() => {
    
            if(--time <= 0) {
               this.turnButtonToStart()
                this.nextTimer()
            }
           
            let minutes = parseInt(time / 60, 10)
            let seconds = parseInt(time % 60, 10)
            
            minutes = minutes < 10 ? "0" + minutes : minutes
            seconds = seconds < 10 ? "0" + seconds : seconds
            
    
            this.$timer.innerHTML = minutes + ' : ' + seconds
    
        }, 1000);
    
    }


    stopTimer(){
        stopTimer.call(this)
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

export default TimerComponent





    