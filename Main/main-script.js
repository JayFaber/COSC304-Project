//Yes I should have used Poll instead of Get
//I am well past the point of caring about that
const button = document.getElementById("hateButton");
button.addEventListener("click", async (event) => {
    const input = document.getElementById("searchInput").value;


    fetch("/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success!:', data);
            //Only matches direct hits, but I didn't have time for a better search function
            const foundItem = data.find(item => item.name.toLowerCase() === input.toLowerCase());
            if (foundItem) {
                console.log('Found match:', foundItem);

                newPage = "http://172.24.80.1:3000/item" + foundItem.item_id + ".html"
                window.location.href = newPage;
            } 
        })

        .catch((error) => {
            console.error('HATE LIFE:', error);
        });
});

function getPizzaData(){
    fetch("/pizzaInfo", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })

        .then(response => response.json())
        .then(data => {
            console.log('Success!:', data);
        })

        .catch((error) => {
            console.error('HATE LIFE:', error);
        });
}