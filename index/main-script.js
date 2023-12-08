const nodeUrl = "http://localhost:3001";

// Yes I should have used Poll instead of Get
// This is an bad function
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

