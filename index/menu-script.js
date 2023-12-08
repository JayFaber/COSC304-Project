const nodeUrl = "http://localhost:3001";

function getPizzaData() {

    fetch(nodeUrl + "/pizzaInfo", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success!:', data);

            data.forEach(function (item) {
                writeItemBox(item, "pizzaContainer");
            });

        })
        .catch((error) => {
            console.error('error:', error);
        });
}

function getDrinkData() {

    fetch(nodeUrl + "/drinkInfo", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success!:', data);

            data.forEach(function (item) {
                writeItemBox(item, "drinkContainer");
            });

        })
        .catch((error) => {
            console.error('error:', error);
        });
}

function getDessertData() {

    fetch(nodeUrl + "/dessertInfo", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success!:', data);

            data.forEach(function (item) {
                writeItemBox(item, "dessertContainer");
            });

        })
        .catch((error) => {
            console.error('error:', error);
        });
}

function writeItemBox(item, div) {
    // Add divs
    const content = `
    <div class="ibox">
        <div class="iboxText">${item.name}</div>
        <img src="Images/${item.image_name}" alt="${item.name}">
        <div class="iBoxDescText">${item.description}<br>$${item.cost}</div>
        <button item_id="${item.item_id}" class= "orderButton" type="button">Order</button>
    </div>
`;

    document.getElementById(div).innerHTML += content;
}

// Send data to item page
document.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('orderButton')) {
        const item_id = target.getAttribute('item_id');
        console.log("Order button clicked for item_id:", item_id);

        newPage = "http://localhost:3000/index/item.html"
        sessionStorage.setItem("", item_id);

        window.location.href = newPage;
    }
});

// Couldn't figure out how to run several scripts at once so this needs to go here
const button = document.getElementById("hateButton");
button.addEventListener("click", async (event) => {
    console.log("AAAAAAAAAA")
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

            const foundItem = data.find(item => item.name.toLowerCase() === input.toLowerCase());
            if (foundItem) {
                console.log('Found match:', foundItem);

                newPage = "http://localhost:3000/index/item.html"
                sessionStorage.clear();
                sessionStorage.setItem("", foundItem.item_id);

                window.location.href = newPage;
            } else window.location.href = "index/404.html";
        })

        .catch((error) => {
            console.error('error:', error);
        });
});
