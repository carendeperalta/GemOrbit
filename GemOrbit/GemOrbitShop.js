//toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll section active link
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });
    //sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    //remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Open cart when cart icon is clicked
cartIcon.onclick = () => {
    cart.classList.add("active");
}

// Close cart when close button is clicked
closeCart.onclick = () => {
    cart.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContent = document.querySelector('.cart-content');
    let totalPrice = 0; // Initialize total price

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Event delegation to handle click events on dynamically added remove buttons
    cartContent.addEventListener('click', function (event) {
        if (event.target.classList.contains('cart-remove')) {
            const cartBox = event.target.closest('.cart-box');
            const priceElement = cartBox.querySelector('.cart-price');
            const productPrice = parseFloat(priceElement.dataset.price);
            const quantityElement = cartBox.querySelector('.cart-quantity');
            const quantity = parseInt(quantityElement.value);
            const itemTotalPrice = productPrice * quantity;

            // Subtract item price from total price
            totalPrice -= itemTotalPrice;

            if (totalPrice < 0) {
                totalPrice = 0; // Ensure total price doesn't go below zero
            }

            document.querySelector('.total-price').textContent = formatPrice(totalPrice);

            cartBox.remove();

            updateTotal(); // Update the total price in the cart
        }
    });

    // Event listener for quantity change
    cartContent.addEventListener('change', function (event) {
        if (event.target.classList.contains('cart-quantity')) {
            const cartBox = event.target.closest('.cart-box');
            const priceElement = cartBox.querySelector('.cart-price');
            const productPrice = parseFloat(priceElement.dataset.price);
            const newQuantity = parseInt(event.target.value);
            const oldQuantity = parseInt(event.target.dataset.oldValue || 1); // Default to 1 if no old value
            const priceChange = productPrice * (newQuantity - oldQuantity);

            totalPrice += priceChange;

            document.querySelector('.total-price').textContent = formatPrice(totalPrice);

            event.target.dataset.oldValue = newQuantity; // Update old value

            updateTotal(); // Update the total price in the cart
        }
    });

    function addToCart(event) {
        const button = event.target;
        const worksBox = button.closest('.works-box');
        const productTitle = worksBox.querySelector('.food-title').textContent;

        // Check if the product is already in the cart
        const existingCartItem = cartContent.querySelector(`.cart-box[data-title="${productTitle}"]`);
        if (existingCartItem) {
            alert('This product is already in your cart.');
            return; // Stop the function
        }

        const productPrice = parseFloat(worksBox.querySelector('.food-price').textContent.replace('₱', '').replace(/,/g, ''));
        const quantity = 1; // Default quantity when adding to cart

        // Add item price to total price
        totalPrice += productPrice;

        // Update total price element
        document.querySelector('.total-price').textContent = formatPrice(totalPrice);

        // If the product is not in the cart, add it
        const cartBox = document.createElement('div');
        cartBox.classList.add('cart-box');
        cartBox.setAttribute('data-title', productTitle);
        cartBox.innerHTML = `
            <div class="pic"><img src="${worksBox.querySelector('.pic img').getAttribute('src')}" alt="${productTitle}" style="width: 100px; height: 100px;"></div>
            <div class="detail-box">
                <div class="cart-product-title">${productTitle}</div>
                <div class="cart-price" data-price="${productPrice}">${formatPrice(productPrice)}</div>
                <input type="number" value="${quantity}" class="cart-quantity" min="1">
            </div>
            <i class='bx bxs-trash-alt cart-remove'></i>
        `;
        cartContent.appendChild(cartBox);

        updateTotal(); // Update the total price in the cart
    }

    // Function to update the total price in the cart
    function updateTotal() {
        const cartItems = cartContent.querySelectorAll('.cart-box');
        let totalPrice = 0;

        cartItems.forEach(item => {
            const priceElement = item.querySelector('.cart-price');
            const quantityElement = item.querySelector('.cart-quantity');
            const productPrice = parseFloat(priceElement.dataset.price);
            const quantity = parseInt(quantityElement.value);

            const itemTotalPrice = productPrice * quantity;
            totalPrice += itemTotalPrice;
        });

        document.querySelector('.total-price').textContent = formatPrice(totalPrice);
    }

    // Function to format price with commas
    function formatPrice(price) {
        return '₱ ' + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    // Function to validate if a string contains special characters
    function containsSpecialCharacters(str) {
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
        return regex.test(str);
    }

    // Function to add days to a date
    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    // Add event listener to the "Buy Now" button
    const buyNowButton = document.querySelector('.btn-buy');
    buyNowButton.addEventListener('click', function () {
        // Check if the total price is 0
        if (totalPrice === 0) {
            alert('Your cart is empty.');
        } else {
            let name = '';
            let address = '';

            // Loop until both name and address are valid or canceled
            while (true) {
                // Prompt the user to enter their name
                name = prompt('Please enter your name (minimum 5 characters):');
                // If the user canceled entering the name, exit the function
                if (name === null) return;
                // Check if the name contains special characters
                if (containsSpecialCharacters(name)) {
                    alert('Name cannot contain special characters.');
                    continue; // Start the loop again to re-prompt for name
                } else if (name.length < 5) {
                    alert('Name must be at least 5 characters long.');
                    continue; // Start the loop again to re-prompt for name
                } else {
                    // Loop until a valid address is entered
                    while (true) {
                        // Prompt the user to enter their address
                        address = prompt('Please enter your address (minimum 5 characters):');
                        // If the user canceled entering the address, break the loop and go back to entering name
                        if (address === null) break;
                        // Check if the address contains special characters
                        if (containsSpecialCharacters(address)) {
                            alert('Address cannot contain special characters.');
                            continue; // Start the loop again to re-prompt for address
                        } else if (address.length < 5) {
                            alert('Address must be at least 5 characters long.');
                            continue; // Start the loop again to re-prompt for address
                        }

                        // If the address is valid, exit the loop
                        break;
                    }

                    // If the user canceled entering the address, break the loop and go back to entering name
                    if (address === null) continue;

                    // If both name and address are valid, exit the loop
                    break;
                }
            }

            // Get the current date and time
            const orderDate = new Date();

            // Calculate the delivery date (5 days from the order date)
            const deliveryDate = addDays(orderDate, 5);

            // Format order date in MM/DD/YY format with AM/PM time
            const formattedOrderDate = orderDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }) + ' ' + orderDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

            // Format delivery date in MM/DD/YY format
            const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });

            // Display the order details including delivery date
            alert(`Thank you for purchasing!\n\nName: ${name}\nAddress: ${address}\nTotal Price: ${formatPrice(totalPrice)}\nOrder Date: ${formattedOrderDate}\nExpected Delivery Date: ${formattedDeliveryDate}`);

            // Reset total price to zero
            totalPrice = 0;
            document.querySelector('.total-price').textContent = '₱ 0.00';

            // Remove all items from the cart
            const cartItems = document.querySelectorAll('.cart-box');
            cartItems.forEach(item => {
                item.remove();
            });
        }
    });
});

document.getElementById("logoutBtn").addEventListener("click", function () {
    // Redirect to the new HTML file
    window.location.href = "GemOrbitLogout.html";
});

//scroll reveal
ScrollReveal({
    //reset: true, 
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', {
    origin: 'top'
});

ScrollReveal().reveal('.home-img, .skills-container, .interest-container, .works-container, .album-container, .contact form', {
    origin: 'bottom'
});

ScrollReveal().reveal('.home-content h1, .about-img', {
    origin: 'left'
});

ScrollReveal().reveal('.home-content p, .about-content', {
    origin: 'right'
});