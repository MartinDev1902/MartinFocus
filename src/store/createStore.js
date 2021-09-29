export default function createStore(initialState, reducer){
    let currentState = initialState
    let currentReducer = reducer

    return {
        dispatch(action, callback){
            currentState = currentReducer(currentState, action)
            callback()
            return currentState
        },
        getState(){
            return currentState
        },
        
    }
}