const body = document.querySelector("body")
const navbar = document.createElement("nav")
const cart_offcanvas = document.createElement("div")
const footer = document.createElement("footer")

if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]))
}

if (!localStorage.getItem("categories")) {
    localStorage.setItem("categories", JSON.stringify([
        {
            id: 1,
            name: "electronics"
        },
        {
            id: 2,
            name: "jewelery"
        },
        {
            id: 3,
            name: "men's clothing"
        },
        {
            id: 4,
            name: "women's clothing"
        }
    ]))
}


const settings = {
    name: "sicariele",
    categories: JSON.parse(localStorage.getItem("categories"))
}

let categories_dropdown = ''

settings.categories.forEach((element) => {
    categories_dropdown += `
    <li><a class="dropdown-item hover-color-active" href="/products/?category=${element.id}">${element.name}</a></li>
    `
})

function refresh_display_cart() {
    const cart = JSON.parse(localStorage.getItem("cart"))
    
    document.querySelector("#nav-cart-items").textContent = cart.length
    
    let cart_subtotal = 0
    cart.forEach((cart_item) => {
        cart_subtotal += cart_item.quantity * cart_item.product.price
    })

    document.querySelector("#nav-cart-price").textContent = `$${cart_subtotal.toFixed(2)}`

    document.querySelector("#cart-offcanvas-body").innerHTML = ''

    if (cart.length == 0) {
        document.querySelector("#cart-offcanvas-body").textContent = "No products in the cart."
        document.querySelector("#cart-offcanvas-body").classList = []
        document.querySelector("#cart-offcanvas-body").classList.add("offcanvas-body", "d-flex", "justify-content-center", "align-items-center", "text-secondary")
        document.querySelector("#cart-offcanvas-footer").innerHTML = `
        <div class="offcanvas-body d-flex flex-column gap-3 mb-3">
            <button type="button" class="btn primary-btn" data-bs-dismiss="offcanvas" aria-label="Close">Continue Shoping</button>
        </div>
        `
        document.querySelector("#nav-cart-icon").classList.remove("bi-bag-fill")
        document.querySelector("#nav-cart-icon").classList.add("bi-bag")

    } else {
        
        document.querySelector("#nav-cart-icon").classList.remove("bi-bag")
        document.querySelector("#nav-cart-icon").classList.add("bi-bag-fill")
        document.querySelector("#cart-offcanvas-body").classList = []
        document.querySelector("#cart-offcanvas-body").classList.add("offcanvas-body")
        document.querySelector("#cart-offcanvas-footer").innerHTML = `
        <hr>
        <div>
            <div class="offcanvas-body py-0 d-flex justify-content-between align-items-center text-secondary">
                <span class="fw-bold">Subtotal:</span>
                <span id="cart-offcanvas-subtotal">$${cart_subtotal.toFixed(2)}</span>
            </div>
        </div>
        <hr>
        <div>
            <div class="offcanvas-body d-flex flex-column gap-3 mb-3">
                <a href="/cart" class="fs-5 btn primary-btn">View cart</a>
                <a href="/checkout" class="fs-5 btn primary-btn">Checkout</a>
            </div>
        </div>
        `
    }

    cart.forEach((cart_item, index) => {
        const cartProductEl = document.createElement("div")
        cartProductEl.classList.add("row")
        cartProductEl.innerHTML = `
        <div class="col-3 col-md-2 d-flex justify-content-center align-items-center">
            <img src="${cart_item.product.image}" alt="image" class="img-fluid">
        </div>
        <div class="col-7 col-md-9 d-flex justify-content-center flex-column">
            <h6 class="">
                ${cart_item.product.title}
            </h6>
            <p class="text-secondary fs-6">
                ${cart_item.quantity} <i class="bi bi-x"></i> $${cart_item.product.price.toFixed(2)}
            </p>
        </div>
        <div class="col-2 col-md-1 d-flex justify-content-end align-items-center">
            <span class="remove text-secondary fs-5 opacity-75" role="button"><i class="bi bi-x-circle"></i></span>
        </div>
        `
        if (index > 0) {
            document.querySelector("#cart-offcanvas-body").appendChild(document.createElement("hr"))    
        }
        cartProductEl.querySelector(".remove").addEventListener("click", (e) => remove_item_from_cart(cart_item))
        document.querySelector("#cart-offcanvas-body").appendChild(cartProductEl)
    })
    
}
function add_to_cart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart"))
    cart.push({
        id: `${product.id}_${Math.floor(Math.random() * 10000)}`,
        quantity: parseInt(quantity),
        product: product
    })
    localStorage.setItem("cart", JSON.stringify(cart))
    refresh_display_cart()
}

function remove_item_from_cart(item) {
    let cart = JSON.parse(localStorage.getItem("cart"))
    cart = cart.filter((cart_item, index) => {
        if (cart_item.id === item.id) {
            localStorage.setItem("removed_item", JSON.stringify({
               index: index,
               item: item 
            }))
            return false
        }
        return true
    })
    localStorage.setItem("cart", JSON.stringify(cart))
    refresh_display_cart()
}

function undo_removed_item_in_cart() {
    const cart = JSON.parse(localStorage.getItem("cart"))
    const removed_item = JSON.parse(localStorage.getItem("removed_item"))
    cart.splice(removed_item.index, 0, removed_item.item)
    localStorage.setItem("cart", JSON.stringify(cart))
    refresh_display_cart()
}

function get_category_id(name) {
    const category = settings.categories.filter((c) => c.name == name)[0]
    return category ? category.id : 1
}

function get_category_name(id) {
    const category = settings.categories.filter((c) => c.id == id)[0]
    return category ? category.name : settings.categories[0].name
}


function fetch_products(func) {
    if (localStorage.getItem("products")) {
        func(JSON.parse(localStorage.getItem("products")))
    } else {
        fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((json) => localStorage.setItem("products", JSON.stringify(json)))
        .catch(async () => await fetch('https://raw.githubusercontent.com/datotoda/front-final/master/public/src/products.json')
            .then((res) => res.json())
            .then((json) => localStorage.setItem("products", JSON.stringify(json)))
            .catch(() => localStorage.setItem("products", JSON.stringify([])))
        ).finally(() => func(JSON.parse(localStorage.getItem("products"))))
    }
}

function get_quick_view_element(product) {
    const modal = document.createElement("div")
    modal.classList.add("modal", "fade")
    modal.setAttribute("id", "quickView")
    modal.setAttribute("tabindex", "-1")
    modal.setAttribute("aria-labelledby", "quickViewLabel")
    modal.setAttribute("aria-hidden", "true")
    modal.innerHTML = `
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-bottom-0">
                <h1 class="modal-title fs-5" id="quickViewLabel">Quick View</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="d-flex flex-wrap">
                    <div class="col-12 col-lg-5 d-flex justify-content-center align-items-center">
                        <img src="${product.image}" alt="image" class="img-fluid">
                    </div>
                    <div class="col-lg-1 my-3"></div>
                    <div class="col-lg-6">
                        <a href="/products/?category=${get_category_id(product.category)}" class="link-secondary link-underline link-underline-opacity-0 hover-color-active">
                            ${product.category}
                        </a>
                        <h3 class="card-title mt-2">
                        ${product.title}
                        </h3>
                        <p> 
                            <i class="bi bi-star${product.rating.rate >= 1 ? '-fill' : product.rating.rate >= 0.5 ? '-half' : ''}"></i>
                            <i class="bi bi-star${product.rating.rate >= 2 ? '-fill' : product.rating.rate >= 1.5 ? '-half' : ''}"></i>
                            <i class="bi bi-star${product.rating.rate >= 3 ? '-fill' : product.rating.rate >= 2.5 ? '-half' : ''}"></i>
                            <i class="bi bi-star${product.rating.rate >= 4 ? '-fill' : product.rating.rate >= 3.5 ? '-half' : ''}"></i>
                            <i class="bi bi-star${product.rating.rate >= 5 ? '-fill' : product.rating.rate >= 4.5 ? '-half' : ''}"></i>
                            ${product.rating.rate}
                        </p>
                        <p class="fs-3 fw-bold mt-3">
                            $${product.price.toFixed(2)}
                        </p>
                        <p class="mt-3">
                            ${product.description}
                        </p>
                        <form id="quick_view_add_to_cart_form" method="post" action="#">
                            <div class="row mt-4">
                                <div class="col-4 col-lg-3">
                                    <input type="number" id="quick_view_quantity" class="form-control" value="1" min="1" max="99">
                                </div>
                                <button type="submit" class="fs-5 btn primary-btn col-5 ms-3" >Add To Cart</button>
                            </div>
                            <div id="quick_view_add_to_cart_form_error" class="mb-4 text-danger"></div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-top-0">
                <button type="button" class="btn primary-btn px-4" data-bs-dismiss="modal">Close</button>
                <a href="/product/?id=2" class="btn primary-btn px-4">See product</a>
            </div>
        </div>
    </div>
    `
    modal.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault()
        const quantity = document.querySelector("#quick_view_quantity").value 
        if (!quantity || !parseInt(quantity) || parseInt(quantity) > 100 || parseInt(quantity) < 1) {
            document.querySelector("#quick_view_add_to_cart_form_error").textContent = "Quantity must be between 1 and 99"
        } else {
            document.querySelector("#quick_view_add_to_cart_form_error").textContent = ""
            add_to_cart(product, quantity)
            document.querySelector("#quick_view_add_to_cart_form_error").classList.remove("d-none")
            modal.querySelector(".btn-close").click()
        }
    })
    return modal
}



navbar.classList.add("navbar")
navbar.classList.add("navbar-expand-lg")
navbar.classList.add("cover-nav")
navbar.innerHTML = `
<div class="container">
    <a class="navbar-brand fs-4" href="/">
        <i class="bi bi-cart-fill active"></i>
        ${settings.name}
    </a>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="navbarSupportedContent">
        <div class="offcanvas-header">
            <a class="navbar-brand fs-2" href="/">
                <i class="bi bi-cart-fill active"></i>
                ${settings.name}
            </a>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="navbar-nav ms-auto me-3 mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link hover-color-active" aria-current="page" href="/">Home</a>
                </li>
                <hr class="my-1">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle hover-color-active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        By Category
                    </a>
                    <ul class="dropdown-menu">
                        ${categories_dropdown}
                    </ul>
                </li>
                <hr class="my-1">
                <li class="nav-item">
                    <a class="nav-link hover-color-active" href="/about_us">About Us</a>
                </li>
                <hr class="my-1">
                <li class="nav-item">
                    <a class="nav-link hover-color-active" href="/contact">Contact</a>
                </li>
            </ul>
        </div>
        <div class="offcanvas-footer offcanvas-body flex-grow-0 flex-shrink-0 d-lg-none"> 
            <div class="text-center text-muted">
                © 2023 Davit Chinchaladze
            </div>
            <hr>
            <ul class="d-flex justify-content-around list-unstyled fs-4">
                <li>
                    <a class="text-muted hover-color-active" href="https://www.facebook.com/datotoda13/">
                        <i class="bi bi-facebook"></i>
                    </a>
                </li>
                <li>
                    <a class="text-muted hover-color-active" href="https://www.instagram.com/dato_toda/">
                        <i class="bi bi-instagram"></i>
                    </a>
                </li>
                <li>
                    <a class="text-muted hover-color-active" href="https://github.com/datotoda/">
                        <i class="bi bi-github"></i>
                    </a>
                </li>
                <li>
                    <a class="text-muted hover-color-active" href="https://www.linkedin.com/in/davit-chinchaladze/">
                        <i class="bi bi-linkedin"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <div>
        <ul class="navbar-nav flex-row">
            <li class="nav-item">
                <div class="nav-link">
                    <a class="text-decoration-none position-relative pe-3 active" data-bs-toggle="offcanvas" href="#cart-offcanvas" role="button" aria-controls="cart-offcanvas">
                        <span id="nav-cart-price">$0.00</span> <i id="nav-cart-icon" class="bi bi-bag"></i>
                        <span id="nav-cart-items" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span>
                    </a>
                </div>
            </li>
            <li class="nav-item"> 
                <button class="navbar-toggler ms-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </li>
        </ul>
    </div>  
</div>
`

cart_offcanvas.classList.add("offcanvas")
cart_offcanvas.classList.add("offcanvas-end")
cart_offcanvas.setAttribute("id", "cart-offcanvas")
cart_offcanvas.setAttribute("tabindex", "-1")
cart_offcanvas.setAttribute("aria-labelledby", "cart-offcanvas-label")
cart_offcanvas.innerHTML = `
<div class="offcanvas-header">
    <h5 class="offcanvas-title" id="cart-offcanvas-label">Shopping Cart</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<hr>
<div id="cart-offcanvas-body"></div>
<div id="cart-offcanvas-footer"></div>
`
cart_offcanvas.addEventListener('show.bs.offcanvas', (e) => {
    if (location.pathname.toLocaleLowerCase().search('cart') >= 0 || 
        location.pathname.toLocaleLowerCase().search('checkout') >= 0) {
        e.preventDefault()
        window.location = '/cart'
    }
})


footer.classList.add("container")
footer.classList.add("py-3")
footer.classList.add("my-4")
footer.innerHTML = `
<ul class="nav justify-content-center border-bottom pb-3 mb-3 gap-3">
    <li class="nav-item"><a href="/" class="nav-link px-2 text-muted hover-color-active">Home</a></li>
    <li class="nav-item"><a href="/about_us" class="nav-link px-2 text-muted hover-color-active">About Us</a></li>
    <li class="nav-item"><a href="/contact" class="nav-link px-2 text-muted hover-color-active">Contact</a></li>
</ul>
<div class="d-flex flex-wrap justify-content-between align-items-center px-sm-5">
    <div class="col-md-4 d-flex align-items-center">
        <span class="text-muted">© 2023 Davit Chinchaladze</span>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3">
            <a class="text-muted hover-color-active" href="https://www.facebook.com/datotoda13/">
                <i class="bi bi-facebook"></i>
            </a>
        </li>
        <li class="ms-3">
            <a class="text-muted hover-color-active" href="https://www.instagram.com/dato_toda/">
                <i class="bi bi-instagram"></i>
            </a>
        </li>
        <li class="ms-3">
            <a class="text-muted hover-color-active" href="https://github.com/datotoda/">
                <i class="bi bi-github"></i>
            </a>
        </li>
        <li class="ms-3">
            <a class="text-muted hover-color-active" href="https://www.linkedin.com/in/davit-chinchaladze/">
                <i class="bi bi-linkedin"></i>
            </a>
        </li>
    </ul>
</div>
`

body.insertBefore(navbar, body.firstChild)
body.insertBefore(cart_offcanvas, body.querySelector("script"))
body.insertBefore(footer, body.querySelector("script"))
refresh_display_cart()
