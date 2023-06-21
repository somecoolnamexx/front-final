document.querySelector("nav").classList.remove("cover-nav")

const urlParams = new URLSearchParams(window.location.search);

const product_id = urlParams.get('id')

if (!product_id || !parseInt(product_id) || parseInt(product_id) > 20 || parseInt(product_id) < 1) {
    window.location = '/'
}

function render_product(product) {
    document.querySelector("#description").textContent = product.description
    document.querySelector("#q_product_name").textContent = product.title.length > 40 ? product.title.slice(0, 37) + '...' : product.title

    const productEl = document.createElement("div")
    productEl.classList.add("row")
    productEl.innerHTML = `
    <div class="col-lg-6 d-flex justify-content-center">
        <img src="${product.image}" alt="image" class="img-fluid">
    </div>
    <div class="col-lg-1 my-3"></div>
    <div class="col-lg-5">
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
        <p class="fs-3 fw-bold mt-3">$${product.price.toFixed(2)}</p>
        <p class="mt-3">${product.description}</p>
        <form id="add_to_cart_form" method="post" action="#">
            <div class="row my-4">
                <div class="col-4 col-lg-3 col-xxl-2">
                    <input type="number" id="quantity" class="form-control" value="1" min="1" max="99">
                </div>
                <button type="submit" class="fs-5 btn primary-btn col-5 ms-3" >Add To Cart</button>
            </div>
            <div id="add_to_cart_form_error" class="text-danger"></div>
        </form>
        <hr>
        <p class="my-4">
            Category:
            <a href="/products/?category=${get_category_id(product.category)}" class="link-secondary link-underline link-underline-opacity-0 hover-color-active">
                ${product.category}
            </a>
        </p>
    </div>
    `
    document.querySelector("#product").appendChild(productEl)

    document.querySelector("#add_to_cart_form").addEventListener("submit", (e) => {
        e.preventDefault()
        const quantity = document.querySelector("#quantity").value 
        if (!quantity || !parseInt(quantity) || parseInt(quantity) > 100 || parseInt(quantity) < 1) {
            document.querySelector("#add_to_cart_form_error").textContent = "Quantity must be between 1 and 99"
        } else {
            document.querySelector("#add_to_cart_form_error").textContent = ""
            add_to_cart(product, quantity)
            document.querySelector("#add_to_cart_success").classList.remove("d-none")
        }
    })
}

function render_related_products(products) {
    const related_products_list = document.querySelector("#related_products .products")

    products = products.filter((p) => p.id != product_id)
    let s = Math.floor(Math.random() * (products.length - 4))
    products = products.slice(s, s + 2 + Math.floor(Math.random() * 2))
    products.forEach(element => {
        const productEl = document.createElement("div")

        productEl.classList.add("card")
        productEl.classList.add("col-12")
        productEl.classList.add("col-sm-5")
        productEl.classList.add("col-md-4")
        productEl.classList.add("col-lg-3")
        productEl.classList.add("col-xl-2")
        
        productEl.innerHTML = `
            <img src="${element.image}" class="card-img-top" alt="image">
            <div class="card-body">
                <a href="/products/?category=${get_category_id(element.category)}" class="link-secondary link-underline link-underline-opacity-0 hover-color-active">
                    ${element.category}
                </a>
                <h6 class="card-title mt-1">
                    <a href="/product/?id=${element.id}" class="link-dark link-underline link-underline-opacity-0 hover-color-active">
                        ${element.title.length > 30 ? element.title.slice(0, 27) + '...' : element.title}
                    </a>
                </h6>
                <p class="card-text"> 
                    <i class="bi bi-star${element.rating.rate >= 1 ? '-fill' : element.rating.rate >= 0.5 ? '-half' : ''}"></i>
                    <i class="bi bi-star${element.rating.rate >= 2 ? '-fill' : element.rating.rate >= 1.5 ? '-half' : ''}"></i>
                    <i class="bi bi-star${element.rating.rate >= 3 ? '-fill' : element.rating.rate >= 2.5 ? '-half' : ''}"></i>
                    <i class="bi bi-star${element.rating.rate >= 4 ? '-fill' : element.rating.rate >= 3.5 ? '-half' : ''}"></i>
                    <i class="bi bi-star${element.rating.rate >= 5 ? '-fill' : element.rating.rate >= 4.5 ? '-half' : ''}"></i>
                    ${element.rating.rate}
                </p>
                <p class="fw-bold">$${element.price.toFixed(2)}</p>
            </div>
        `
        related_products_list.appendChild(productEl)
    });
}


if (localStorage.getItem("products")) {
    render_product(JSON.parse(localStorage.getItem("products")).filter((p) => p.id == product_id)[0])
    render_related_products(JSON.parse(localStorage.getItem("products")))
} else {
    fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((json) => {
        localStorage.setItem("products", JSON.stringify(json))
        render_product(json.filter((p) => p.id == product_id)[0])
        render_related_products(json)
    })
}

function refresh_stars(rate_value) {
    document.querySelectorAll("#review_rate_inp i").forEach((i) => {
        i.classList.remove("bi-star")
        i.classList.remove("bi-star-half")
        i.classList.remove("bi-star-full")
    })
    document.querySelector("#review_star_1").classList.add(rate_value >= 1  ? "bi-star-fill" : rate_value >= 0.5 ? "bi-star-half" : "bi-star")
    document.querySelector("#review_star_2").classList.add(rate_value >= 2  ? "bi-star-fill" : rate_value >= 1.5 ? "bi-star-half" : "bi-star")
    document.querySelector("#review_star_3").classList.add(rate_value >= 3  ? "bi-star-fill" : rate_value >= 2.5 ? "bi-star-half" : "bi-star")
    document.querySelector("#review_star_4").classList.add(rate_value >= 4  ? "bi-star-fill" : rate_value >= 3.5 ? "bi-star-half" : "bi-star")
    document.querySelector("#review_star_5").classList.add(rate_value >= 5  ? "bi-star-fill" : rate_value >= 4.5 ? "bi-star-half" : "bi-star")
}

document.querySelectorAll("#review_rate_inp i").forEach((i) => {
    i.addEventListener("click", (e) => {
        let rate_value = parseInt(i.id.slice(-1))
        const mid_x = i.getBoundingClientRect().x + i.getBoundingClientRect().width / 2
        rate_value -= e.x < mid_x ? 0.5 : 0

        document.querySelector("#review_review_rate").value = rate_value
        refresh_stars(rate_value)
    })
})

document.querySelector("#review_review_rate").addEventListener("change", (e) => {
    const rate = document.querySelector("#review_review_rate").value
    if (!rate || !parseFloat(rate) || parseFloat(rate) < 0) {
        document.querySelector("#review_review_rate").value = 0
    } else if (parseFloat(rate) >= 5){
        document.querySelector("#review_review_rate").value = 5
    }
    refresh_stars(parseFloat(rate))
})

document.querySelector("#review_form").addEventListener("submit", (e) => {
    e.preventDefault()
    if (document.querySelector("#review_review_rate").value && 
        document.querySelector("#review_review_inp").value && 
        document.querySelector("#review_name_inp").value && 
        document.querySelector("#review_email_inp").value
        ) {
        alert("Your review is send")
        document.querySelector("#review_form").reset()
        refresh_stars(0)
    } else {
        alert("Please fill all data")
    }
})

