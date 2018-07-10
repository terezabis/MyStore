import React, {Component} from 'react';
import LoginForm from './../user/LoginForm';

export default class HomeContainer extends Component {
    render = () => {
        return (
            <section id="viewSignIn">
                <div className="welcome">
                    <div></div>
                    <div className="signup">
                        <LoginForm {...this.props} />
                    </div>
                </div>
            </section>
        )
    }
}