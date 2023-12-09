const nodeUrl = "http://localhost:3001";

let index = sessionStorage.getItem("");

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

const idString = getCookie("id");  

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
    loginNavButton.setAttribute('href', 'login.html');
    loginNavButton.removeAttribute('onclick');
    loginNavButton.innerHTML = 'Login/Signin';
}

function clearId() {
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    let x = document.cookie;
    console.log(x)
    
    location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById("aaa");
    getCart();

    function getCart() {
        fetch(nodeUrl + "/getCart", {
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
            console.log(data);

            const div = 'aaa'; 
            
            data.forEach(item => {
                document.getElementById(div).innerHTML = '<button onclick="decrement('+item.item_id+')">-1</button>';
                console.log(item);

                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = JSON.stringify(item);
                document.getElementById(div).appendChild(itemDiv);
            });
        })
        .catch((error) => {
            console.error('Error fetching cart data:', error);
        });
    }
});

function decrement(int){
    fetch(nodeUrl + "/removeFromCart", {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            item_id:int,
            id: getCookie("id"),
            quantityToRemove: 1,
        }),
    })
    .then(data => {
        location.reload()
    })
    .catch((error) => {
        console.error('error:', error);
    });

}
