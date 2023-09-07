const url = 'https://fakestoreapi.com/products';
const prodContainer = document.getElementById('prod-container');
let products='';

async function getData() {
    try { 
        const response = await fetch (url);
        const data = await response.json();

        products = data;
        showData(products)
        console.log (products);

       
    } catch (error) {
        console.log('Error: ' + error);
    }

};
getData();

function showData(products) {
    const prod = products;
    let content='';

    prod.forEach(product => {
        let description = `${product.description}`;
        let title = `${product.title}`;
        content += ` 
        <div class="product">
        <img src="${product.image}" class="product-img">
        <h2 class="product-title">${title.length> 30 ? title.substring(0,40).concat('...'):title}</h2>
        <p class="product-price">USD $${product.price}</p>
        <p class="product-description">${description.length>80 ? description.substring(0,80).concat('...'):description}</p>
        <button class="buyBtn">Buy</button>
        </div>
        `;
    }); prodContainer.innerHTML = content;

};

const minInput = document.getElementById('minPrice');
const maxInput = document.getElementById('maxPrice');

const clearBtn = document.getElementById('clearBtn');
const filterBtn = document.getElementById('submitBtn');

filterBtn.addEventListener('click', () =>{
    const minPrice = parseFloat(minInput.value);
    const maxPrice = parseFloat(maxInput.value); //parseFloat() method parses a value as a string and returns the first number.

    const filteredProducts = products.filter(product => {
        const productPrice = parseFloat(product.price);
        return(!isNaN(minPrice) ? productPrice >= minPrice : true) && (!isNaN(maxPrice) ? productPrice <= maxPrice : true);
    })

    showData(filteredProducts);

});

clearBtn.addEventListener('click', () => {
    minInput.value='';
    maxInput.value='';

    filterBtn.click();
})

