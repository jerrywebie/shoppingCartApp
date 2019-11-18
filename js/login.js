let users = JSON.parse(localStorage.getItem("userList")); // fetching userlist array from local storage

let navList = document.querySelector('#nav-tabs');
let loginList = document.querySelector('#login-user');

// register user
document.querySelector('#signup-form').addEventListener('submit', registerUser);
function registerUser() {

    // creating user object
    let newUser = {
        id: Date.now(),
        username: document.getElementById("newUsername").value,
        email: document.getElementById("newEmail").value,
        password: document.getElementById("newPassword").value,
        confirmPassword: document.getElementById("confirmPassword").value
    }

    // pushing new user object into array 
    users.push(newUser);  

    /* display registration message  */

    // saving updated array into local storage
    localStorage.setItem("userList", JSON.stringify(users)); 
}


// user login 
document.querySelector('#login-form').addEventListener('submit', loginUser);
function loginUser() {
    let usrname = document.getElementById("txtUsername").value;
    let pwd = document.getElementById("txtPassword").value;

    for (let i = 0; i < users.length; i++) {
        if (usrname === users[i].username && pwd === users[i].password) {
            logInSuccess(usrname);
            return;
        }
    }
    console.log("incorrect username and password!");   
}

// login success 
function logInSuccess(name) {    

    // save login user in local storage
    localStorage.setItem("loginUser", name);
    location.reload();
}

// onload function after login success
window.onload = function () {

    // get saved login user from local storage
    let currentUser = localStorage.getItem("loginUser");
    
    // if user does not login ,  
    if (currentUser === null) {
        
        // display login & sign up
        navList.children[1].style.display = '';
        navList.children[2].style.display = '';
    }
    // if user login,  
    else {

        // display username 
        document.querySelector('.login-user-name').innerHTML = currentUser;

        //create logout
        const li = document.createElement('LI');
        li.className = 'fa fa-sign-out';
        loginList.appendChild(li);

        // remove login & sign up 
        navList.children[1].style.display = 'none';
        navList.children[2].style.display = 'none';
    }
}

// user log out 
loginList.addEventListener('click', logout);
function logout(event) {
    if (event.target.className === 'fa fa-sign-out') {        

        // remove logout
        loginList.children[1].remove();

        // display login & sign up
        navList.children[1].style.display = '';
        navList.children[2].style.display = '';

        //remove current user
        document.querySelector('.login-user-name').innerHTML = '';

        // remove login user in local storage
        localStorage.removeItem("loginUser");
    }

}

