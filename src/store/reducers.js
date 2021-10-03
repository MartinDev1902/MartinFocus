import { taskList } from ".."

export default function reducers(state, action){
    switch(action.type){
        case 'CREATE_TASK':
            return { ...state, tasks: [...state.tasks, action.task]}
        case 'CHANGE_SETTINGS':
            return {...state, settings: action.settings}
        case 'CHANGE_TASK':
            //TODO Use taskList.getTaskById(axtion.taskInfo.id)
            state.tasks.find(task => {
                task.id === action.taskInfo.id ? task[action.taskInfo.valueName] = action.taskInfo.newValue : null
            })
            return state
        case 'CHANGE_TASK_STATUS':
            //TODO Use taskList.getTaskById(axtion.taskInfo.id)
            state.tasks.find(task => {
                task.id === action.id ? task.completed = true : null
            })
            return state
        case 'REMOVE_TASK':
            const taskIndex = state.tasks.indexOf(taskList.getTaskById(action.id))
            return { ...state, ...state.tasks.splice(taskIndex, 1), activeTask: state.tasks.length > 0 ? state.tasks[0].id : 'defaultTask' }
        case 'SET_ACTIVE_TASK':
            return {...state, activeTask: action.id}
        case 'SET_POMODORO_DONE_VALUE':
             //TODO Use taskList.getTaskById(axtion.taskInfo.id)
            state.tasks.find(task => {
                task.id === action.taskInfo.id ? task.pomodoroDone = action.taskInfo.value : null
            })
            return state           
        default:
            return state
    }
}