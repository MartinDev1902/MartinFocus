import Component from "../core/component"

class FooterComponent extends Component{
    constructor(id){
        super(id)   
           
    }

    init(){
       
        
        this.renderFooter()
        

    }

    renderFooter(){
        this.tasks = JSON.parse(localStorage.getItem('tasks'))
        this.pomodoroTime = +JSON.parse(localStorage.getItem('martinFocusSettings')).pomodoro
        this.longBreakInterval = +JSON.parse(localStorage.getItem('martinFocusSettings')).longBreakInterval
        this.longBreak = +JSON.parse(localStorage.getItem('martinFocusSettings')).longBreak
        this.shortBreak = +JSON.parse(localStorage.getItem('martinFocusSettings')).shortBreak
       
        this.total = 0 
        this.completed = 0
        
        this.tasks.forEach(item => {
           this.total += (+item.pomodoroCount)
            
        })
        this.tasks.forEach(item => {
            if(item.completed){
                this.completed++
            }
            
        })
        
        let longIntervalCount =  Math.floor(this.total / this.longBreakInterval)
        let longTime = 
        this.time = ((((this.total - longIntervalCount)) * this.shortBreak) + (longIntervalCount * this.longBreak ) + this.total * this.pomodoroTime) * 60 * 1000
        let time = new Date(Date.now() + this.time)

      
        this.$el.innerHTML = ''
        const template = `
        <div class="container">
            <ul class="footer-report">
                <li class="footer-report__item">Total: <span class="footer-report__item-value">${this.total}</span></li>
                <li class="footer-report__item">Completed: <span class="footer-report__item-value">${this.completed}</span></li>
                <li class="footer-report__item">Completion time: <span class="footer-report__item-value"> ${time.toLocaleString()}</span></li>
            </ul>
        </div>`
        this.$el.insertAdjacentHTML('afterbegin', template)
    }

}

export default FooterComponent