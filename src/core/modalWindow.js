export class ModalWindow{
    constructor(options){
        this.$openModalButton = document.getElementById(options.openModalButton)
        this.modalWindowTitle = options.modalWindowTitle
        this.component = options.component
        this.$openModalButton.addEventListener('click', openModalWindow.bind(this))
    }

  
    
}

function modalWindowTemplate(options){
    return `
    <div class="modal-window" id="${options.title}">
        <div class="modal-window-wrapper">
            <div class="close-modal-window" id="closeModal"><i class="fas fa-times"></i></div>
            <div class="modal-window-title">${options.title}</div>
            <div class="modal-window-content">
            ${options.component.render()}
            </div>
        </div>
    </div>
    `
}

async function openModalWindow(){
    document.querySelector('body').insertAdjacentHTML('beforeEnd', modalWindowTemplate({
        title: this.modalWindowTitle, 
        component: this.component
    }))
    this.component.afterRender(() => {
        document.getElementById(this.modalWindowTitle).remove()
    })
  
    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById(this.modalWindowTitle).remove()
        
    })

}