
const cart_contents = document.getElementById("cart-contents");
const empty_cart_message = document.getElementById("empty-cart-message");

// put all product datas together
const all_product_data = [
    nike_data, blinks_data, adidas_data, hippie_data, puma_data
];

// get basket from the local storage
let basket = JSON.parse(localStorage.getItem("data")) || [];

// display contents in the cart
const display_content = () => {
    if (basket.length !== 0) {
        cart_contents.innerHTML = basket.map((product) => {
            let {id, item} = product;
            // Flatten all product array coming from the database.js
            let search = all_product_data.flat().find((x) => x.id === id);
            
            if (!search) return; // skip if the selected product is not found
            
            // here we return the contents found in the basket in a div
            return `
            <div id="product-id-${id}" class="contents">
                <img width="100px" src=${search.img} alt="">
                <div class="details">
                <h5 class="name">${search.name}</h5>
                    <h5 class="price"><i class="fa fa-tag" aria-hidden="true"></i> $ ${search.price * item}</h5>
                    <div class="button-quantity">
                    <i class="fa-solid fa-square-minus" onclick="remove('${id}')"></i>
                    <h5 class="quantity" id=${id}>Quantity:  ${item}</h5>
                    </div>
                </div>
            </div>
            `;
        }).join("");
    } else {
        // If the basket is empty, clear the cart contents
        cart_contents.innerHTML = "";
        // Update the empty cart message
    }
};

// Initial display of cart contents
display_content();

// Function to remove the content from the cart when the button is clicked
const remove = (id) => {
    // Find the item in the basket
    const search = basket.find((product) => product.id === id);
    
    // If the item doesn't exist, return
    if (search === undefined) return;
    
    // Decrease the quantity
    search.item -= 1;
    
    // If quantity reaches 0, remove the item from the basket
    if (search.item === 0) {
        // Remove the element from the DOM immediately
        const elementToRemove = document.getElementById(`product-id-${id}`);
        if (elementToRemove) {
            elementToRemove.remove();
        }
        
        // Filter out the item from the basket
        basket = basket.filter((product) => product.id !== id);
    } else {
        // Update the displayed quantity
        document.getElementById(id).innerHTML = `Quantity: ${search.item}`;
    }
    
    // Update localStorage with the modified basket
    localStorage.setItem("data", JSON.stringify(basket));
    
    // Update the cart count
    cart_update();
    
    // Update the total price display
    message();
    
    // Update the empty cart message if the basket is now empty
    if (basket.length === 0) {
        message();
    }
};

// Update the remaining quantity
const update = (id) => {
    const search = basket.find((product) => product.id === id);
    if (search) {
        document.getElementById(id).innerHTML = `Quantity: ${search.item}`;
    }
    cart_update();
};

// Cart update function
const cart_update = () => {
    const cart = document.getElementById("cart");
    if (basket.length === 0) {
        cart.innerHTML = "0";
    } else {
        cart.innerHTML = basket.map((products) => products.item).reduce((a, b) => a + b, 0);
    }
};

// Initial cart count update
cart_update();

// Calculate the total price of all items in the cart
const calculateTotal = () => {
    if (basket.length === 0) return 0;
    
    return basket.reduce((total, product) => {
        // Find the product details from the data
        const item = all_product_data.flat().find(x => x.id === product.id);
        if (!item) return total; // Skip if product not found
        
        // Add the product price * quantity to the total
        return total + (item.price * product.item);
    }, 0);
};

// Empty cart message with total price
const message = () => {
    if (basket.length !== 0) {
        const totalPrice = calculateTotal();
        
        empty_cart_message.innerHTML = `
        <div class="cart-summary">
            <h3 class="total-price">Total: $ ${totalPrice.toFixed(2)}</h3>
            <div class="cart-buttons">
                <a href="userAccount.html">
                 <button class="check-out" onclick="checkOut()">check out</button>
                </a>
                <button class="clear-cart" onclick="clearCart()">clear cart</button>
            </div>
        </div>
        `;
    } else {
        empty_cart_message.innerHTML = `
        <h3 class="text">CART IS EMPTY</h3>
        <a href="index.html">
        <button class="home-bbtn">Back to home</button>
        </a>
        `;
    }
};

// Function to clear the entire cart
const clearCart = () => {
    basket = [];
    localStorage.setItem("data", JSON.stringify(basket));
    display_content();
    cart_update();
    message();
};

const checkOut = () => {
    const totalAmount = calculateTotal();
    // Implementation for checkout process
    alert(`Thank you for your purchase! Total amount: ${totalAmount.toFixed(2)}`);
    // Clear the cart after checkout
    clearCart();
};
const successMessage=()=>{
    const totalAmount = calculateTotal();
    // Implementation for checkout process
    alert(`Thank you for your purchase! Total amount: ${totalAmount.toFixed(2)}`);
    // Clear the cart after checkout
    clearCart();
}
// Initial message display
message();