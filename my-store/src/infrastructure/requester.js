import $ from 'jquery';
const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_HJzmCWf77";
const kinveyAppSecret = "3a5bea2fda4c496db8d0bc9c268a226e";
const guestUsername = "react";
const guestPass = "1234";

// Creates the authentication header
function makeAuth(type) {
    switch(type) {
        case 'kinvey':
            return 'Kinvey ' + sessionStorage.getItem('authtoken');
        case 'register':
            return 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret);
        case 'basic':
        default:
            return 'Basic ' + btoa(guestUsername + ':' + guestPass);
    }
}

// Creates request object to kinvey
function makeRequest(method, module, endpoint, auth) {
    return {
        method,
        url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
        headers: {
            'Authorization': makeAuth(auth)
        }
    };
}

// Function to return GET promise
function get (module, endpoint, auth) {
    return $.ajax(makeRequest('GET', module, endpoint, auth));
}

// Function to return POST promise
function post (module, endpoint, auth, data) {
    let req = makeRequest('POST', module, endpoint, auth);
    req.data = data;
    return $.ajax(req);
}

// Function to return PUT promise
function update (module, endpoint, auth, data) {
    let req = makeRequest('PUT', module, endpoint, auth);
    req.data = data;
    return $.ajax(req);
}

// Function to return DELETE promise
function remove (module, endpoint, auth) {
    return $.ajax(makeRequest('DELETE', module, endpoint, auth));
}

export default {
    get,
    post,
    update,
    remove
}