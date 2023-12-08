const nodeUrl = "http://localhost:3001";

let data = sessionStorage.getItem("");

if (!data > 0) window.location.href = "http://localhost:3000/404.html"

fetch(nodeUrl + "/itemInfo", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            index: data
        }),
    })
    .then(response => response.json())
    .then(data => {

        writePage(data);

    })
    .catch((error) => {
        console.error('error:', error);
});

function writePage(data){
    console.log(data)
    document.getElementById('titleBox').innerHTML += data.name;

}

