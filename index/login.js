const nodeUrl = "http://localhost:3001";

const tryLogin = document.getElementById("loginButton");
tryLogin.addEventListener("click", async (event) => {

    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;

    await fetch(nodeUrl + "/tryLogin", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)

        })
        .catch((error) => {
            console.error('error:', error);
        });
});

const forgotPass = document.getElementById("forgotPassword");
forgotPass.addEventListener("click", async (event) => {
    console.log("AAAAA")
    writeForgotPassBox();
});

function writeForgotPassBox() {
    const content = '<p>Input your email address</p><input id="fpGetEmail" placeholder="Email Address"></input><br><button id="reqPassButton">Reset Password</button><div id ="displayPassReqFailPass"></div>';

    document.getElementById("loginPopupContainer").innerHTML = content;
}

const signUp = document.getElementById("signup");
signUp.addEventListener("click", async (event) => {

    writeSignupBox();
});

function writeSignupBox() {
    console.log("AAA")
    const content = '<p>Sign up</p><input id="suGetName" placeholder="Name"></input><input id="suGetEmail" placeholder="Email"></input><input id="suGetPass" placeholder="Password"></input><input id="suGetAddress" placeholder="Address"></input></br><button id="trySignUp">Sign Up</button>'
    
    document.getElementById("loginPopupContainer").innerHTML = content;
}

const tryForgotPassword = document.getElementById("reqPassButton");
tryForgotPassword.addEventListener("click", async (event) => {
    console.log("AAAAA")
    writeSignupBox();
});

const trySignUp = document.getElementById("trySignUp");
trySignUp.addEventListener("click", async (event) => {
    console.log("AAAAA")
});