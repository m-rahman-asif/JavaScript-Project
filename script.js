
var s = "abcdefghijklmnopqrstuvwxyz";

function getElementBySearch(value)
{ 
    const container = document.getElementById("cards");
    container.innerHTML = "";
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
        .then((res) => res.json())
        .then((data) => {
            var f = 0;
            if (data.drinks) {
                for (var j = 0; j < data.drinks.length; j++)
                {
                    showData(data.drinks[j]);
                }
                f = 1;
            }
            if (f == 0)
            {
                noElement();
            }
            console.log(data);
        })
}




for (var i = 0; i < s.length; i++)
{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${s[i]}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.drinks) {
                for (var j = 0; j < data.drinks.length; j++)
                    showData(data.drinks[j]);
            }
            console.log(data);
        })
}
function showData(data) {
    const container = document.getElementById("cards");
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
        <img height="200px" src="${data.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Name: ${data.strDrink}</h5>
            <h6 class="card-title">Category: ${data.strCategory}</h6>
            <p class="card-text">${data.strInstructions.slice(0, 60)}...</p>
            <div class="buttons">
                <button class="btn btn-primary detailsBtn">Details</button>&nbsp;
                <button class="btn btn-success addToCartBtn">Add to Cart</button>
            </div>
        </div>`;

    div.querySelector(".addToCartBtn").addEventListener("click", () => addToCart(data));
    div.querySelector(".detailsBtn").addEventListener("click", () => showDetailsPopup(data));

    container.appendChild(div);
}



function noElement()
{
    const container = document.getElementById("cards");
    const div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML =
        (`<h1 align="center"> No element found </h1>`);
    container.appendChild(div);
}


document.getElementById("searchButton").addEventListener("click", (event) => {
    event.preventDefault();
    const iv = document.getElementById("Input").value;
    console.log(iv);
    getElementBySearch(iv);

})


let cartCount = 0;

function addToCart(item) {
    if (cartCount >= 7) {
        alert("You cannot add more than 7 drinks to the cart!");
        return;
    }

    cartCount++;

    
    document.getElementById("cartCount").innerText = cartCount;

    const cart = document.querySelector(".cart");

    const entry = document.createElement("p");
    entry.innerHTML = `
        &nbsp;&nbsp;&nbsp;&nbsp;${cartCount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <img src="${item.strDrinkThumb}" width="50">&nbsp;&nbsp;&nbsp;&nbsp;
        ${item.strDrink}
    `;

    cart.appendChild(entry);
}


function showDetailsPopup(item) {
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <img src="${item.strDrinkThumb}" class="img-fluid mb-3" />
        <h5>${item.strDrink}</h5>
        <p><b>Category:</b> ${item.strCategory}</p>
        <p><b>Alcoholic:</b> ${item.strAlcoholic}</p>
        <p><b>Glass:</b> ${item.strGlass}</p>
        <p><b>Instructions:</b><br/>${item.strInstructions}</p>
    `;

    const detailsModal = new bootstrap.Modal(document.getElementById("detailsModal"));
    detailsModal.show();
}
