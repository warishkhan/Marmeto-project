 // Function to fetch data from API
 async function fetchData() {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    const data = await response.json();
    return data.categories;
}

// Function to display products in the specified tab
async function displayProducts(tabId, category) {
    const tabContent = document.getElementById(tabId);
    if (!tabContent) {
        console.error(`Tab content with ID '${tabId}' not found.`);
        return;
    }

    const productsDiv = tabContent.querySelector(`#${category}Products`);
    if (!productsDiv) {
        console.error(`Products div with ID '${category}Products' not found in tab '${tabId}'.`);
        return;
    }

    productsDiv.innerHTML = ''; // Clear existing content
    
    const data = await fetchData();
    const categoryData = data.find(cat => cat.category_name === category);
    if (categoryData) {
        categoryData.category_products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <div class="card">
                <img class="imgControl" src="${product.image}" alt="${product.title}">
                <div class="cardBody">
                <p class="title">${product.title.substring(0,10)}</p>
                <p class="dot"></p>
                <p class="vendor">${product.vendor}</p>
                </div>
                <div class="priceContainer">
                <p class="price">Rs ${product.price}</p>
                <p class="comparePrice">Rs ${product.compare_at_price}.00</p>
                <p class="discount">50% Off</p>
                </div>
                ${product.badge_text ? `<p class="badge">${product.badge_text}</p>` : ''}
                <button class="cartBtn">Add to Cart</button>
                </div>
            `;
            productsDiv.appendChild(productElement);
        });
    }
}

// Function to switch between tabs
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    // Display products for the selected tab
    switch (tabName) {
        case 'Men':
            displayProducts('Men', 'Men');
            break;
        case 'Women':
            displayProducts('Women', 'Women');
            break;
        case 'Kids':
            displayProducts('Kids', 'Kids');
            break;
        default:
            break;
    }
}

 // Show Men's Products by default
 document.addEventListener("DOMContentLoaded", function() {
    openTab(event, 'Men');
});