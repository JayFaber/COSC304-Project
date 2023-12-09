const nodeUrl = "http://localhost:3001";

const tryLogin = document.getElementById("loginButton");
button.addEventListener("click", async (event) => {

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
    writeForgotPassBox();
});

function writeForgotPassBox() {
    const content = '<p>Input your username and/or email address</p><input id="fpGetUsername" placeholder="Username"></input><input id="fpGetEmail" placeholder="Email Address"></input><br><button id="reqPassButton">Reset Password</button><div id ="displayPassReqFailPass"></div>';
}