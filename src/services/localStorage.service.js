class LocalStorageService {

    static setData(fieldName, data){
        localStorage.setItem(fieldName, JSON.stringify(data))
    }

    static getData(fieldName){
        return JSON.parse(localStorage.getItem(fieldName))
    }

}

export default LocalStorageService