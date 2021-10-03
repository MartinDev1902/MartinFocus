import { activeTask, taskList } from ".."
import Component from "../core/component"
import LocalStorageService from "../services/localstorage.service"
import { store } from "../store"

class TimerComponent extends Component{
    constructor(id){
        super(id)
        this.pomodoroDoneCount = 0
        this.loopCount
        if(store.getState().activeTask !== 'defaultTask'){
            this.createPomodoroDoneCounter()
        }
        
    }

    init(){
       
        this.$startStopButton = this.$el.querySelector('#startStopButton')
        this.$nextTimerButton = this.$el.querySelector('#nextTimerButton')
        this.$timer = this.$el.querySelector('#timeCounter')

        this.$startStopButton.addEventListener('click', () => {
            const role = this.$startStopButton.dataset.role
            role === 'start' ? this.startTimer() : role === 'stop' ?  this.stopTimer() : null
        })
        this.$el.querySelector('#timerNavigation').addEventListener('click', e => this.timerNavigation(e))
        this.$nextTimerButton.addEventListener('click', () => { this.nextTimer() })

        this.showTimer( 'pomodoro' ,this.$el.querySelector('#tabPomodoroTimer'))
    }

    showTimer (timer, element) {
        let time = store.getState().settings[timer] 
        this.$el.querySelectorAll('.timer-navigation__item').forEach(item => item.classList.remove('active_button'))
        this.$timer.innerHTML = time < 10 ? '0' + time + ' : 00' : time + ' : 00'
        element.classList.add('active_button')
    }

    turnTimerToStop () {
        this.$startStopButton.innerHTML = '<i class="fas fa-stop"></i> Stop'
        this.$nextTimerButton.removeAttribute('disabled')
        this.$startStopButton.dataset.role = 'stop'
    }

    turnTimerToStart () {
        this.$startStopButton.innerHTML = '<i class="fas fa-play"></i> Start';
        this.$nextTimerButton.setAttribute('disabled', 'disabled')
        this.$startStopButton.dataset.role = 'start'
        clearInterval(this.pomodoroTimer)
    } 

    nextTimer(){
        this.turnTimerToStart()
        const options = store.getState().settings
        const activeTimer = this.$el.querySelector('.active_button').id
       
        switch(activeTimer){
            case 'tabPomodoroTimer':
                if(store.getState().activeTask !== 'defaultTask'){
                    this.loopCount.incremenetValue()
                    if(this.loopCount.getValue() === taskList.getTaskById(store.getState().activeTask).pomodoroCount){
                        console.log('if loopCount === pomodoro count of active task')
                         /**
                          * if loopCount === pomodoro count of active task
                          * 1. Change task status on true
                          * 2. Set pomodoro done value on max
                          * 3. Get pomodoro done count of new active task
                          * 4. Set new active task
                          * 5. Resent counter of pomodoro done
                          */
                         store.dispatch({type: 'CHANGE_TASK_STATUS', id: store.getState().activeTask}, () => {
                             LocalStorageService.setData('tasks', store.getState().tasks)
                         })
                         store.dispatch({type: 'SET_POMODORO_DONE_VALUE', taskInfo : {id: taskList.getTaskById(store.getState().activeTask).id, value: this.loopCount.getValue()}}, () => {
                             LocalStorageService.setData('tasks', store.getState().tasks)
                             taskList.render()
                         })   
     
     
                         let newActiveTask = store.getState().tasks.find(item => (item.completed !== true)) ? store.getState().tasks.find(item => (item.completed !== true)).id : 'defaultTask'
                         console.log(newActiveTask)
                         store.dispatch({type: 'SET_ACTIVE_TASK', id: newActiveTask}, () =>{
                             LocalStorageService.setData('activeTask', store.getState().activeTask)
                          
                         })
                         if(store.getState().activeTask !== 'defaultTask') {
                            this.loopCount.resetValue(taskList.getTaskById(store.getState().activeTask).pomodoroDone)
                         } else{
                             
                             this.stopTimer()
                            this.loopCount.resetValue(0)
                            activeTask.render()
                            return
                            }

                         activeTask.render()
                     
                     } else{
                         console.log('if loopCount !== pomodoro count of active task')
                         /**
                          * if loopCount !== pomodoro count of active task
                          * 1. Get active task
                          * 2. Set new pomodoro done value
                          * 3. Set new state to the local storage
                          * 4. Render taskList
                          */
                         const activeTaskItem = taskList.getTaskById(store.getState().activeTask)
                        console.log(activeTaskItem)
                         store.dispatch({type: 'SET_POMODORO_DONE_VALUE', taskInfo : {id: activeTaskItem.id, value: this.loopCount.getValue()}}, () => {
                             LocalStorageService.setData('tasks', store.getState().tasks)
                             // this.loopCount.resetValue(taskList.getTaskById(store.getState().activeTask).pomodoroDone)
                             taskList.render()
                         })   
     
                     }
                }
                
               
                
                if(++this.pomodoroDoneCount === +options.longBreakInterval)  {
                    this.pomodoroDoneCount = 0
                    this.showTimer('longBreak', this.$el.querySelector('#tabLongBreakTimer'))
                    if(options.autoStartBreak){this.startTimer()}
                    break
                }
                if(options.autoStartBreak){}
                this.showTimer('shortBreak', this.$el.querySelector('#tabShortBreakTimer'))
                if(options.autoStartBreak){this.startTimer()}
                break
            case 'tabShortBreakTimer':
                this.showTimer('pomodoro', this.$el.querySelector('#tabPomodoroTimer'))
                if(options.autoStartPomodoro){this.startTimer()}
                break
            case 'tabLongBreakTimer':
                this.showTimer('pomodoro', this.$el.querySelector('#tabPomodoroTimer'))
                if(options.autoStartPomodoro){this.startTimer()}
                break
        }
    }
    createPomodoroDoneCounter(){
        this.loopCount = createPomodoroDoneCounter(taskList.getTaskById(store.getState().activeTask).pomodoroDone) 
    }
    

    startTimer(){
        // this.stopTimer()
        clearInterval(this.pomodoroTimer)
        this.turnTimerToStop()
        
        if(store.getState().tasks.length === 0){
            // this.stopTimer()
            store.dispatch({type: 'SET_ACTIVE_TASK', id: 'defaultTask'}, () =>{
                LocalStorageService.setData('activeTask', store.getState().activeTask)
             
            })

        }
       
    
        let time = +this.$timer.textContent.slice(0, this.$timer.textContent.indexOf(':')) * 60
        
        this.pomodoroTimer = setInterval(() => {
    
            if(--time <= 0) this.nextTimer()

            let minutes = Math.floor(time / 60)
            let seconds = Math.floor(time % 60)
            
            minutes = minutes < 10 ? "0" + minutes : minutes
            seconds = seconds < 10 ? "0" + seconds : seconds
            
    
            this.$timer.innerHTML = minutes + ' : ' + seconds
    
        }, 1000);
    
    }

    timerNavigation(e){
        this.turnTimerToStart()
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

    stopTimer(){
        this.turnTimerToStart()
    
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

}
export default TimerComponent

function createPomodoroDoneCounter(startValue){
    let value = startValue

    return {
        getValue(){
            return value
        }, 
        incremenetValue(){
            value++
        },
        resetValue(newValue){
            value = newValue
        }
    }
}



    