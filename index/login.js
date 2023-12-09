const nodeUrl = "http://localhost:3001";


let x = document.cookie;
console.log(x)



function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(part => part.trim());
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}


if (x.includes("id")) {

    if (!getCookie("id")) {
        // If "id" cookie is undefined, delete it and reload the page
        document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        location.reload();
    }

    loginNavButton.setAttribute('onclick', 'clearId()');
    loginNavButton.removeAttribute('href');
    loginNavButton.innerHTML = 'Logout';



    fetch(nodeUrl + "/getUserName", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: getCookie("id")
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById("userContain").innerHTML = "User: " + data[0].name;
            document.getElementById("userContain").innerHTML = "<button id='deleteUser' onclick='delUser()'>Delete Account</button>";
        })
        .catch((error) => {
            console.error('error:', error);
        });



    const tryLogin = document.getElementById("loginButton")

} else {
    document.getElementById("loginBox").innerHTML = '                    <div id="loginHeader">                        <u>Login</u>                    </div>                    <button id = "signup" style="font-variant: normal;">                        /Sign Up                    </button>                    <p>                        Email                    </p>                    <input class="logInput" id="emailInput">                    </input>                    <p>                        Password                    </p>                    <input class="logInput" id="passwordInput">                    </input>                    <button id="loginButton">                        Log In                    </button>                    <br>                    <button id="forgotPassword" style="font-variant: normal;">                        Forgot Password                    </button>                    <div id="loginPopupContainer">                    </div>';

    loginNavButton.setAttribute('href', 'login.html');
    loginNavButton.removeAttribute('onclick');
    loginNavButton.innerHTML = 'Login/Signin';
}

function clearId() {
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    let x = document.cookie;
    console.log(x)
    
    location.reload();
}

const tryLogin = document.getElementById("loginButton");
tryLogin.addEventListener("click", async (event) => {

    var email = document.getElementById("emailInput").value;
    var password = document.getElementById("passwordInput").value;

    await fetch(nodeUrl + "/tryLogin", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        .then(response => response.text())
        .then(data => {

            if (data != 0) {
                console.log(JSON.parse(data).user_id);
                document.cookie = 'id=' + JSON.parse(data).user_id;
                // Set cookie

                let x = document.cookie;
                console.log(x);
                location.reload();
            }

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

    const tryForgotPassword = document.getElementById("reqPassButton");
    tryForgotPassword.addEventListener("click", async (event) => {
        var email = document.getElementById("fpGetEmail").value;

        await fetch(nodeUrl + "/checkEmail", {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log("AAAAAAA")
                console.log(data)

                if (data > 0) {
                    document.getElementById("displayPassReqFailPass").innerHTML = "password sent to email";
                }

            })
            .catch((error) => {
                console.error('error:', error);
            });

    });
}

const signUp = document.getElementById("signup");
signUp.addEventListener("click", async (event) => {

    writeSignupBox();
});

function writeSignupBox() {
    const content = '<p>Sign up</p><input id="suGetName" placeholder="Name"></input><input id="suGetEmail" placeholder="Email"></input><input id="suGetPass" placeholder="Password"></input><input id="suGetAddress" placeholder="Address"></input></br><button id="trySignUp">Sign Up</button>'

    document.getElementById("loginPopupContainer").innerHTML = content;

    const trySignUp = document.getElementById("trySignUp");
    trySignUp.addEventListener("click", async (event) => {
        var email = document.getElementById("suGetEmail").value;
        var name = document.getElementById("suGetName").value;
        var pass = document.getElementById("suGetPass").value;
        var address = document.getElementById("suGetAddress").value;

        console.log(email + name + pass + address)

        await fetch(nodeUrl + "/checkEmail", {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)

                if (data == 0) {
                    fetch(nodeUrl + "/createUser", {

                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: email,
                                name: name,
                                pass: pass,
                                address: address
                            }),
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)

                        })
                        .catch((error) => {
                            console.error('error:', error);
                        });
                }


            })

    });

}

function delUser() {
    fetch(nodeUrl + "/delUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: getCookie("id"),
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        if (data !== '0') {
            const parsedData = JSON.parse(data);
            console.log(parsedData.user_id);
            document.cookie = 'id=' + parsedData.user_id;
            let x = document.cookie;
            console.log(x);
        }
    })
    .catch(error => {
        console.error('Error in delUser:', error);
    });
}
