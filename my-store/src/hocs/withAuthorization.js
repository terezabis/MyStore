import React, {Component} from 'react'
const AdminRoleId = "d8c9bd74-7204-4e59-90fa-394db832909c";

function withAuthorization(WrappedComponent, roles) {
    return class WithAuthorization extends Component {
        constructor(props) {
            super(props);
            this.state = {
                roles: []
            };
        }

        // load users roles from databse
        componentDidMount = () => {
            let roles = sessionStorage.getItem('userRoles')

            if (roles) {
                // if there are roles -> change state
                this.setState({ roles : roles.split(',') });
            }
        }

        render = () => {
            let userHasAccess = false;

            for (let role of roles) {
                userHasAccess = userHasAccess || this.state.roles.indexOf(role) !== -1;
            }

            // if user has the role with access -> render component; else -> message
            if (userHasAccess) {                
                return <WrappedComponent {...this.props} />
            } else {
                return <h1>Unauthorized</h1>
            }
        }
    }
}

// show component only if loggedin user has role 'Admin' 
export function withAdminAuthorization(Component) {
    return withAuthorization(Component, [AdminRoleId]);
}

// render element only if loggedin user has role 'Admin' 
export function isAdmin() {
    let roles = sessionStorage.getItem('userRoles')

    if (roles) {
        let rolesArray = roles.split(',');
        return rolesArray.indexOf(AdminRoleId) !== -1;    
    }

    return false;
}
