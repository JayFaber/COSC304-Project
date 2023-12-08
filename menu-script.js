const nodeUrl = "http://localhost:3001";

getPizzaData();
getDrinkData();

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

function writeItemBox(item, div) {
    // add divs
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

document.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('orderButton')) {
        const item_id = target.getAttribute('item_id');
        console.log("Order button clicked for item_id:", item_id);
        newPage = "http://localhost:3000/item" + item_id + ".html"
        window.location.href = newPage;
    }
});