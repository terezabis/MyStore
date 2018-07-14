import requester from '../infrastructure/requester'
import observer from '../infrastructure/observer'

export default {
    login: {
        send: data => requester.post('user', 'login', 'basic', data),
        success: function(res) {
            observer.trigger(observer.events.loginUser, res.username);
            observer.trigger(observer.events.notification, { type: 'success', message: "Successs." })
            sessionStorage.setItem('authtoken', res._kmd.authtoken);
            sessionStorage.setItem('username', res.username);
            //sessionStorage.setItem('userRoles', res.Roles.join(','))
            let roleArray = [];
            if (res._kmd.roles) {
                for (let currentRole of res._kmd.roles) {
                    roleArray.push(currentRole.roleId);
                }
                sessionStorage.setItem('userRoles', roleArray.join(','));
            } else {
                sessionStorage.setItem('userRoles', []);
            }
            
            this.props.history.push('/products');
        },
        fail: res => {
            observer.trigger(observer.events.notification, { 
                type: 'error', 
                message: 'Error logging in'//res.responseJSON.description
            });
            
            this.setState({ username: '', password: '' });
        }
    },
    register: {
        send: data => requester.post('user', '', 'register', data),
        success: function(res) {
            observer.trigger(observer.events.loginUser, res.username);
            sessionStorage.setItem('authtoken', res._kmd.authtoken);  
            sessionStorage.setItem('username', res.username);          
            //sessionStorage.setItem('userRoles', res.Roles.join(','))

            let roleArray = [];
            if (res._kmd.roles) {
                for (let currentRole of res._kmd.roles) {
                    roleArray.push(currentRole.roleId);
                }
                sessionStorage.setItem('userRoles', roleArray.join(','));
            } else {
                sessionStorage.setItem('userRoles', []);
            }

            this.props.history.push('/products');
        },
        fail: function(res) {
            observer.trigger(observer.events.notification, { 
                type: 'error', 
                message: res.responseJSON.description
            });

            this.setState({ username: '', password: '' });
        }
    },
    getByUsername: username =>
        requester.get('user', '', 'kinvey', { username })
}