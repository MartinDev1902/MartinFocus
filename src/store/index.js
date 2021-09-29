import LocalStorageService from "../services/localstorage.service";
import createStore from "./createStore";
import reducers from "./reducers";


const defaultSettings = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    autoStartBreak: true,
    autoStartPomodoro: true
}
const defaultActiveTask = {title: "Just working"}

const tasks = LocalStorageService.getData('tasks')
const settings = LocalStorageService.getData('martinFocusSettings')
const activeTask = LocalStorageService.getData('activeTask')


const initialState = {
    tasks: tasks ? tasks : LocalStorageService.setData('tasks', []),
    settings: settings ? settings : LocalStorageService.setData('martinFocusSettings', defaultSettings),
    activeTask: activeTask ? activeTask : LocalStorageService.setData('activeTask', tasks ? tasks[0].id : defaultActiveTask )
}

export let store = createStore(initialState, reducers)