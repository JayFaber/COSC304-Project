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

} else{
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

// Yes I should have used Poll instead of Get
// This is an bad function
const button = document.getElementById("hateButton");
button.addEventListener("click", async (event) => {
    const input = document.getElementById("searchInput").value;

    await fetch(nodeUrl + "/search", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success!:', data);
            //Only matches direct hits, but I didn't have time for a better search function
            // At least it protects against injections
            const foundItem = data.find(item => item.name.toLowerCase().slice(0, 5) === input.toLowerCase().slice(0, 5));
            if (foundItem) {
                console.log('Found match:', foundItem);

                newPage = "http://localhost:3000/index/item.html"
                sessionStorage.clear();
                sessionStorage.setItem("", foundItem.item_id);

                window.location.href = newPage;
            } else window.location.href = "index/404.html";
        })

        .catch((error) => {
            console.error('HATE LIFE:', error);
        });
});

