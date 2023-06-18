const body = document.querySelector("body")
const navbar = document.createElement("nav")
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
    name: "magazia",
    categories: JSON.parse(localStorage.getItem("categories"))
}

let categories_dropdown = ''

settings.categories.forEach((element) => {
    categories_dropdown += `
    <li><a class="dropdown-item hover-color-active" href="/products/?category=${element.id}">${element.name}</a></li>
    `
})

function refresh_nav_cart() {
    document.querySelector("#nav-cart-items").textContent = JSON.parse(localStorage.getItem("cart")).length
}

function get_category_id(name) {
    const category = settings.categories.filter((c) => c.name == name)[0]
    return category ? category.id : 1
}

function get_category_name(id) {
    const category = settings.categories.filter((c) => c.id == id)[0]
    return category ? category.name : settings.categories[0].name
}


navbar.classList.add("navbar")
navbar.classList.add("navbar-expand-lg")
navbar.classList.add("cover-nav")
navbar.innerHTML = `
<div class="container">
    <a class="navbar-brand" href="/">
        <i class="bi bi-cart-fill active"></i>
        ${settings.name}
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto me-3 mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link hover-color-active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle hover-color-active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    By Category
                </a>
                <ul class="dropdown-menu">
                    ${categories_dropdown}
                </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link hover-color-active" href="/about_us">About Us</a>
            </li>
            <li class="nav-item">
                <a class="nav-link hover-color-active" href="/contact">Contact</a>
            </li>
        </ul>
        <ul class="navbar-nav ">
            <li class="nav-item">
                <div class="nav-link">
                <a class="text-decoration-none position-relative pe-3 active" href="/cart">
                    Cart <i class="bi bi-cart"></i>
                    <span id="nav-cart-items" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span>
                </a>
                </div>
            </li>
        </ul>
        
    </div>
</div>
`
footer.classList.add("container")
footer.classList.add("py-3")
footer.classList.add("my-4")
footer.innerHTML = `
<ul class="nav justify-content-center border-bottom pb-3 mb-3">
    <li class="nav-item"><a href="/" class="nav-link px-2 text-muted hover-color-active">Home</a></li>
    <li class="nav-item"><a href="/about_us" class="nav-link px-2 text-muted hover-color-active">About Us</a></li>
    <li class="nav-item"><a href="/contact" class="nav-link px-2 text-muted hover-color-active">Contact</a></li>
</ul>
<div class="d-flex flex-wrap justify-content-between align-items-center px-sm-5">
    <div class="col-md-4 d-flex align-items-center">
        <span class="mb-3 mb-md-0 text-muted">© 2023 Davit Chinchaladze</span>
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
body.insertBefore(footer, document.querySelector("body script"))
refresh_nav_cart()
