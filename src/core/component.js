class Component {
    constructor(elementID){
        this.$el = document.getElementById(elementID)
        this.init()
    }

    init(){
        this.render()
    }

    render(){

    }
}

export default Component