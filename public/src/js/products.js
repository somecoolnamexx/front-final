document.querySelector("nav").classList.remove("cover-nav")

function filter_q(products) {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q')
    if (q) {
        products = products.filter((p) => p.title.toLowerCase().search(q.toLowerCase()) != -1)
    }
    return products
}

function render_category_quantities(products) {
    const categories = JSON.parse(localStorage.getItem("categories"))
    products = filter_q(products)
    categories.forEach((c) => {
        let count = 0
        products.forEach((p) => {
            if (p.category == c.name) {
                count ++
            }
        })
        document.querySelector(`#category_${c.id}_quantity`).textContent = `(${count})`
    })
    document.querySelector(`#category_0_quantity`).textContent = `(${products.length})`
}


function render_products(products) {
    const related_products_list = document.querySelector("#products .products")
    const urlParams = new URLSearchParams(window.location.search);
    const category_id = urlParams.get('category')

    related_products_list.innerHTML = ''
    
    if (category_id) {
        products = products.filter((p) => p.category == get_category_name(category_id))
    }
    
    products = filter_q(products)
    
    document.querySelector('#products_quantity_text').textContent = products.length > 1 ? `Showing all ${products.length} results` : products.length == 1 ?"Showing the single result" : "No products were found matching your selection."
    
    products.forEach(element => {
        const productEl = document.createElement("div")

        productEl.classList.add("card")
        productEl.classList.add("col-11")
        productEl.classList.add("col-md-5")
        productEl.classList.add("col-xl-3")
        productEl.classList.add("my-4")
        
        productEl.innerHTML = `
            <img src="${element.image}" class="card-img-top" alt="image">
            <div class="card-body">
                <a href="/products/?category=${get_category_id(element.category)}" class="link-secondary link-underline link-underline-opacity-0 hover-color-active">
                    ${element.category}
                </a>
                <h6 class="card-title mt-1">
                    <a href="/product/?id=${element.id}" class="link-dark link-underline link-underline-opacity-0 hover-color-active">
                        ${element.title.length > 40 ? element.title.slice(0, 37) + '...' : element.title}
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
        
        const spaceEl = document.createElement("div")
        spaceEl.classList.add("col-1")
        related_products_list.appendChild(spaceEl)
        related_products_list.appendChild(productEl)
    });
}

function update_products() {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q')
    if (q) {
        document.querySelector('#search_inp').value = q
        document.querySelector('#search_clear').classList.remove('d-none')
    } else {
        document.querySelector('#search_inp').value = ''
        document.querySelector('#search_clear').classList.add('d-none')
    }
    fetch_products((products) => {
        render_category_quantities(products)
        render_products(products)
    })
}


function url_params_change(func) {
    const url = new URL(window.location.href);
    func(url.searchParams)
    window.history.replaceState(null, null, url);
    update_products()
}

function initial() {
    for (let i = 0; i < 3; i ++) {
        document.querySelector("#products .products").innerHTML += `
        <div class="col-1"></div>
        <div class="card col-11 col-md-5 col-xl-3 my-4" aria-hidden="true">
            <svg class="card-img-top placeholder"></svg>
            <div class="card-body">
                <p class="placeholder-glow">
                    <span class="placeholder text-secondary col-8"></span>
                </p>
                <h6 class="card-title placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                </h6>
                <p class="card-text placeholder-glow">
                    <span class="placeholder col-1"></span>
                    <span class="placeholder col-1"></span>
                    <span class="placeholder col-1"></span>
                    <span class="placeholder col-1"></span>
                    <span class="placeholder col-1"></span>
                    <span class="placeholder col-2"></span>
                </p>
                <p class="card-text placeholder-glow">
                    <span class="placeholder col-5"></span>
                </p>
            </div>
        </div>
        `
    }

    JSON.parse(localStorage.getItem("categories")).forEach((category) => {
        const categoryEl = document.createElement("li")
        categoryEl.classList.add("nav-item")
        categoryEl.innerHTML = `
        <a href="?category=${category.id}" id="category-${category.id}-link" class="nav-link p-0 text-dark hover-color-active d-flex justify-content-between">
            <span> ${category.name}</span>
            <span id="category_${category.id}_quantity">()</span>
        </a>
        `
        categoryEl.querySelector(`#category-${category.id}-link`).addEventListener("click", (e) => {
            e.preventDefault()

            if (document.querySelector("#category_list .active")) {
                document.querySelector("#category_list .active").classList.remove("active")
            }
            categoryEl.querySelector(`#category-${category.id}-link`).classList.add("active")
            
            url_params_change((url_params) => {
                url_params.set("category", category.id)
            })
        });    
        document.querySelector("#category_list").appendChild(categoryEl)
    })

    const urlParams = new URLSearchParams(window.location.search);
    const category_id = urlParams.get('category')

    if (category_id && (!parseInt(category_id) || parseInt(category_id) > 4 || parseInt(category_id) < 1)) {
        url_params_change((url_params) => {
            url_params.delete("category")
        })
        document.querySelector('#category-0-link').classList.add("active")
    } else {
        url_params_change(() => {})
        document.querySelector(`#category-${category_id ? category_id : 0}-link`).classList.add("active")
    }
}

document.querySelector('#search_form').addEventListener("submit", (e) => {
    e.preventDefault()
    url_params_change((url_params) => {
        url_params.set("q", document.querySelector('#search_inp').value)
    })
})

document.querySelector('#search_clear').addEventListener("click", (e) => {
    url_params_change((url_params) => {
        url_params.delete("q")
    })
})

document.querySelector('#category-0-link').addEventListener("click", (e) => {
    e.preventDefault()
    
    if (document.querySelector("#category_list .active")) {
        document.querySelector("#category_list .active").classList.remove("active")
    }
    document.querySelector('#category-0-link').classList.add("active")
    
    url_params_change((url_params) => {
        url_params.delete("category")
    })
});

initial()
