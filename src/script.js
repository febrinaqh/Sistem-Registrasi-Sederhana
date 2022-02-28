const users = [];

document.addEventListener("DOMContentLoaded", function() {

    const signUpButton = document.getElementById("form-signup");

    signUpButton.addEventListener("submit", function(event) { 
        event.preventDefault();
        
        const checkbox = document.getElementById("checkbox").checked;
        if(checkbox == false){
            alert("You must agree to the terms and conditions");
        } else {
            alert("Account created successfuly!");
            addUser();
            loginlink();
        }

    });

    const continueButton = document.getElementById("form-login");
    continueButton.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const userData = getUser();
        const username = document.getElementById("un-in").value;
        const password = document.getElementById("pw-in").value;

        for (let user of userData){
            if(username != user.username){
                alert("Wrong username!");
            } else if(username == user.username && password == user.password){
                alert("Login successful!");
                displayUser();
            } else {
                alert("Wrong password!");
            }
        }
        
    });
});

function addUser() {
    const email = document.getElementById("email").value;
    const username = document.getElementById("un").value;
    const password = document.getElementById("pw").value;

    const generateID = generateId();
    const userObject = generateUserObject(generateID, email, username, password);
    users.push(userObject);

    saveData();
}

function generateId() {
    return +new Date();
}

function generateUserObject(id, email, username, password ) {
    return {
        id,
        email,
        username,
        password
    }
}

const userDataKey = "USER_DATA";

function saveData() {
    localStorage.setItem(userDataKey, JSON.stringify(users));
}

function getUser(){
    return JSON.parse(localStorage.getItem(userDataKey));
}

function loginlink() {

    const loginForm = document.querySelector("#form-login");
    const signupForm = document.querySelector("#form-signup");

    loginForm.removeAttribute("style", "display: none");
    signupForm.setAttribute("style", "display: none");
}

function displayUser() {

    const loginForm = document.querySelector("#form-login");
    loginForm.setAttribute("style", "display: none");

    const userData = getUser();
    const welcomeUser = document.querySelector("#container");

    welcomeUser.innerHTML = "";

    for (let user of userData){
        const textUser = document.createElement("h2");
        textUser.innerText = "Halo, " + user.username + "!";
        textUser.setAttribute("id", "textUser");

        const textContainer = document.createElement("div");
        textContainer.classList.add("inner");
        textContainer.append(textUser);
        

        const container = document.createElement("div");
        container.classList.add("user-container");
        container.setAttribute("id", `user-${user.id}`);
        container.append(textContainer);

        welcomeUser.append(container);
    }
}

function signuplink() {

    const loginForm = document.querySelector("#form-login");
    const signupForm = document.querySelector("#form-signup");

    loginForm.setAttribute("style", "display: none");
    signupForm.removeAttribute("style", "display: none");
}