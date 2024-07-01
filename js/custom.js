$(document).ready(function() {
    // Function to get current year and display it (only if #displayYear exists)
    function getYear() {
        var displayYearElement = document.querySelector("#displayYear");
        if (displayYearElement) {
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear();
            displayYearElement.innerHTML = currentYear;
        }
    }

    // Call getYear function to display current year (if applicable)
    getYear();

    // Function to initialize Owl Carousel if .client_owl-carousel exists
    if ($(".client_owl-carousel").length > 0) {
        $(".client_owl-carousel").owlCarousel({
            // Owl Carousel configuration options
            loop: true,
            margin: 0,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            autoplay: true,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1000: {
                    items: 2
                }
            }
        });
    }

    // Function to initialize Google Map
    function myMap() {
        // Check if google maps is defined
        if (typeof google !== 'undefined') {
            var mapProp = {
                center: new google.maps.LatLng(40.712775, -74.005973),
                zoom: 18,
            };
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        } else {
            console.warn('Google Maps API is not loaded.');
        }
    }

    // Call myMap function to initialize Google Map
    myMap();

    // Sample product data (replace with actual data retrieval logic)
    var products = [
        {
            id: '1',
            name: "Men's Shirt",
            price: 75,
            image: 'images/p1.png',
            description: "High-quality men's shirt."
        },
        {
            id: '2',
            name: "Men's Shirt",
            price: 80,
            image: 'images/p2.png',
            description: "Stylish men's shirt."
        },
        {
            id: '3',
            name: "Women's Dress",
            price: 68,
            image: 'images/p3.png',
            description: "Elegant women's dress."
        },
        {
            id: '4',
            name: "Women's Dress",
            price: 70,
            image: 'images/p4.png',
            description: "Casual women's dress."
        },
        {
            id: '5',
            name: "Women's Dress",
            price: 75,
            image: 'images/p5.png',
            description: "Summer women's dress."
        },
        {
            id: '6',
            name: "Women's Dress",
            price: 58,
            image: 'images/p6.png',
            description: "Chic women's dress."
        },
        {
            id: '7',
            name: "Women's Dress",
            price: 80,
            image: 'images/p7.png',
            description: "Fashionable women's dress."
        },
        {
            id: '8',
            name: "Men's Shirt",
            price: 65,
            image: 'images/p8.png',
            description: "Classic men's shirt."
        },
        {
            id: '9',
            name: "Men's Shirt",
            price: 65,
            image: 'images/p9.png',
            description: "Sporty men's shirt."
        },
        {
            id: '10',
            name: "Men's Shirt",
            price: 65,
            image: 'images/p10.png',
            description: "Casual men's shirt."
        },
        {
            id: '11',
            name: "Men's Shirt",
            price: 65,
            image: 'images/p11.png',
            description: "Formal men's shirt."
        },
        {
            id: '12',
            name: "Women's Dress",
            price: 65,
            image: 'images/p12.png',
            description: "Party women's dress."
        }
    ];

    // Store products in localStorage for easier access across pages
    localStorage.setItem('products', JSON.stringify(products));

    // Function to populate product details on product-landing.html
    function populateProductDetails(productId) {
        var products = JSON.parse(localStorage.getItem('products')) || [];
        var product = products.find(function(item) {
            return item.id === productId;
        });

        if (product) {
            $('#productName').text(product.name);
            $('#productPrice').text('$' + product.price.toFixed(2));
            $('#productImage').attr('src', product.image);
            $('#productDescription').text(product.description);
        } else {
            console.error('Product not found');
            $('#productDetails').html('<p>Product not found</p>');
        }

        // Add to Cart button functionality
        $('#addToCartBtn').click(function(e) {
            e.preventDefault();
            
            var quantity = $('#quantity').val();
            var item = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: parseInt(quantity)
            };

            // Retrieve existing cart items from localStorage or initialize empty array
            var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(item);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            alert('Added ' + quantity + ' ' + product.name + '(s) to cart!');
            window.location.href = 'cart.html';
        });
    }

    // Get product ID from URL parameter for product-landing.html
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');

    // If productId is present, populate product details on product-landing.html
    if (productId) {
        populateProductDetails(productId);
    }
});
