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
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    let x = document.cookie;
    console.log(x)
    
    location.reload();
}

if (!index > 0) window.location.href = "http://localhost:3000/404.html"

fetch(nodeUrl + "/itemRev", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            index: index
        }),
    })
    .then(response => response.json())
    .then(data => {

        data.forEach(function (item) {
            writeReview(item);
        });

    })
    .catch((error) => {
        console.error('error:', error);
    });

fetch(nodeUrl + "/itemInfo", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            index: index
        }),
    })
    .then(response => response.json())
    .then(data => {
        writePage(data[0]);
    })
    .catch((error) => {
        console.error('error:', error);
    });

function writePage(item) {
    document.getElementById('itemTitleBox').innerHTML = item.name;
    document.getElementById('itemImageBox').innerHTML = '<img src="data:image/png;base64,' + item.image_name + '" alt="' + item.name + '">';
    document.getElementById('itemDescBox').innerHTML = item.description;
    document.getElementById('itemCost').innerHTML = '<p>' + item.cost + '</p>';
}

function postReview() {
    const z = document.getElementById("review").value;
    console.log(z)
    fetch(nodeUrl + "/postReview", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: z,
                user_id: idString,
                item_id: index,

            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            writeReview(data);
            location.reload()
        })
        .catch((error) => {
            console.log('error:', error);
        });

    var inputElement = document.getElementById("review");

    var inputValue = inputElement.value;

    console.log(inputValue);
}

function writeReview(item) {
    console.log(item)

    const content = `
    <div class="revBox">
        <p> ${item.name} </br> ${item.text}</p>
    </div>
`;

    document.getElementById("itemReviews").innerHTML += content;
}
function addToCart(){

     fetch(nodeUrl + "/addToCart", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: getCookie("id"),
                item_id: index
            }),
        })
        .then(response => response.text())
        .then(data => {

        })
        .catch((error) => {
            console.error('error:', error);
        });
};

