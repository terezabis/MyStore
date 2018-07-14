import React, {Component} from 'react';
import observer from '../../infrastructure/observer';

const DEFAULT_STATE = {
    message: null,
    success: null,
    error: null
}

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;

        observer.subscribe(observer.events.notification, this.showNotification); 

    }

    showNotification = data => {
        let message= data.message;
        let type = data.type;
        this.setState({ [type]: type, message: message });
    }

    hideNotification = ev => this.setState(DEFAULT_STATE);

    render = () => {
        let notificationId;
        if (this.state.success) {
            notificationId = 'infoBox';
        } else if (this.state.error) {
            notificationId = 'errorBox';
        } 

        if (this.state.message) {
            return (
                <div id={notificationId} className="notification" onClick={this.hideNotification}>
                    <span>{this.state.message}</span>
                </div>)
        } else {
            return null;
        }
    }

}