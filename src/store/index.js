import LocalStorageService from "../services/localstorage.service"
import createStore from "./createStore"
import reducers from "./reducers"


const defaultSettings = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    autoStartBreak: true,
    autoStartPomodoro: true
}

const defaultActiveTask = 'defaultTask'

const tasks = LocalStorageService.getData('tasks') ? LocalStorageService.getData('tasks') : LocalStorageService.setData('tasks', [])
const settings = LocalStorageService.getData('martinFocusSettings') ? LocalStorageService.getData('martinFocusSettings'): LocalStorageService.setData('martinFocusSettings', defaultSettings)
const activeTask = LocalStorageService.getData('activeTask') && LocalStorageService.getData('activeTask') !== 'defaultTask' ? LocalStorageService.getData('activeTask') : LocalStorageService.setData('activeTask', newActiveTask())

function newActiveTask(){
    let activeTask
    if(tasks && tasks.length > 0) {
        activeTask = tasks.find(element => element.completed !== true )
        return activeTask ? activeTask.id : defaultActiveTask
    }else{
        return defaultActiveTask
    }  
}

const initialState = {
    tasks: tasks ? tasks : [],
    settings: settings ? settings : defaultSettings,
    activeTask: activeTask ? activeTask : defaultActiveTask
}

export const store = createStore(initialState, reducers)