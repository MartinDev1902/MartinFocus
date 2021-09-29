export default function reducers(state, action){
    switch(action.type){
        case 'CREATE_TASK':
            return { ...state, tasks: [...state.tasks, action.task]}
        case 'CHANGE_SETTINGS':
            return {...state, settings: action.settings}
        case 'CHANGE_TASK':
            state.tasks.find(task => {
                task.id === action.taskInfo.id ? task[action.taskInfo.valueName] = action.taskInfo.newValue : null
            })
            return state
        case 'REMOVE_TASK':
            state.tasks.find(task => {
                if(task.id === action.id){
                    const elementID = state.tasks.indexOf(task)
                    state.tasks.splice(elementID, 1)
                    return state
                }
            })
        default:
            return state
    }
}