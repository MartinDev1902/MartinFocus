import { timer } from ".."
import { store } from "../store"
import LocalStorageService from "../services/localstorage.service"
class SettingsComponent {
    constructor(){ 
        this.settings = store.getState().settings        
    }

    afterRender(callback){
        document.getElementById('saveSettingsButton').addEventListener('click', e => {
            this.settings = {
                pomodoro: document.getElementById('pomodoro').value,
                shortBreak: document.getElementById('shortBreak').value,
                longBreak: document.getElementById('longBreak').value,
                autoStartBreak: document.getElementById('autoStartBreaks').checked,
                autoStartPomodoro: document.getElementById('autoStartPomodoros').checked,
                longBreakInterval: document.getElementById('longBreakInterval').value
            }
           

            store.dispatch({type: 'CHANGE_SETTINGS', settings: this.settings}, () => {
                LocalStorageService.setData('martinFocusSettings', store.getState().settings)
                callback()
                timer.showTimer('pomodoro', timer.$el.querySelector('#tabPomodoroTimer'))
            }) 
        }) 
    }

    render(){
        return `    <div class="settings-group" id="settingsModal">
                    <div class="settings-group__title">Time (minutes)</div>

                    <div class="settings-group-subsettings">
                        <div class="settings-group-subsettings__item">
                            <label class="title" for="pomodoro">Pomodoro</label>
                            <input class="value" id="pomodoro" type="number" min="1" value="${this.settings.pomodoro}">
                        </div>
                        <div class="settings-group-subsettings__item">
                            <label class="title" for="shortBreak">Short break</label>
                            <input class="value" id="shortBreak" type="number" min="1" value="${this.settings.shortBreak}">
                        </div>
                        <div class="settings-group-subsettings__item">
                            <label class="title" for="longBreak">Long break</label>
                            <input class="value" id="longBreak" type="number" min="1" value="${this.settings.longBreak}">
                        </div>
                    </div>
                </div>

                <div class="settings-group flex_center_space-between">
                    <div class="settings-group__title">Auto start breaks?</div>
                    <div class="settings-group__control">
                        <div class="custom-checkbox">
                            <input  type="checkbox" id="autoStartBreaks" ${this.settings.autoStartBreak ? 'checked' : null}>
                            <label for="autoStartBreaks" class="custom-checkbox__content">
                                <span class="custom-checkbox__indicator"></span>
                            </label>
                        </div>
                    </div>                
                </div>

                <div class="settings-group flex_center_space-between">
                    <div class="settings-group__title">Auto start pomodoros?</div>
                    <div class="settings-group__control">
                        <div class="custom-checkbox">
                            <input  type="checkbox" id="autoStartPomodoros" ${this.settings.autoStartPomodoro ? 'checked' : null}> 
                            <label for="autoStartPomodoros" class="custom-checkbox__content">
                                <span class="custom-checkbox__indicator"></span>
                            </label>
                        </div>
                    </div>                
                </div>


                <div class="settings-group flex_center_space-between">
                    <div class="settings-group__title">Long break interval?</div>
                    <div class="settings-group__control">
                        <input class="value" id="longBreakInterval" type="number" min="1" value="${this.settings.longBreakInterval}">
                    </div>                
                </div>


                <div class="settings-group flex_center_space-between">
                    <button class="save-settings-button button-primary" id="saveSettingsButton">Save settings</button>    
                </div>
                `
    }
}
export default SettingsComponent