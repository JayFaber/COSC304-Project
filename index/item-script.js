const nodeUrl = "http://localhost:3001";

let index = sessionStorage.getItem("");

if (!index > 0) window.location.href = "http://localhost:3000/404.html"

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

function writePage(item){
    document.getElementById('itemTitleBox').innerHTML += item.name;
    document.getElementById('itemImageBox').innerHTML += '<img src = "Images/' + item.image_name + '">';
    document.getElementById('itemDescBox').innerHTML += item.description;
    document.getElementById('itemCost').innerHTML += '<p>' +item.cost + '</p>';
}

function postReview(){
    var inputElement = document.getElementById("review");

      var inputValue = inputElement.value;

      console.log(inputValue);
}