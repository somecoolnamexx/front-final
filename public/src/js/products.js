document.querySelector("nav").classList.remove("cover-nav")

const urlParams = new URLSearchParams(window.location.search);

const category_id = urlParams.get('category')
const q = urlParams.get('q')

if (category_id && (!parseInt(category_id) || parseInt(category_id) > 4 || parseInt(category_id) < 1)) {
    window.location.search = q ? `q=${q}` : ''
} else {
    const clearCategoryEl = document.createElement("li")
    clearCategoryEl.classList.add("nav-item")
    clearCategoryEl.innerHTML = `
    <a href="?category=0" class="nav-link p-0 text-dark hover-color-active d-flex justify-content-between">
        <span>all category</span>
        <span id="category_0_quantity">()</span>
    </a>
    `
    clearCategoryEl.querySelector('a').addEventListener("click", (e) => {
        e.preventDefault()
        urlParams.set("category", 0)
        window.location.search = urlParams.toString()
    });
    
    document.querySelector("#category_list").appendChild(clearCategoryEl)
}
document.querySelector('#search_inp').value = q ? q : ''
document.querySelector('#search_clear').classList.remove(q ? 'd-none' : '.')


document.querySelector('#search_clear').addEventListener("click", (e) => {
    urlParams.delete("q")
    window.location.search = urlParams.toString()
})


const categories = JSON.parse(localStorage.getItem("categories"))

categories.forEach((category) => {
    const categoryEl = document.createElement("li")
    categoryEl.classList.add("nav-item")
    categoryEl.innerHTML = `
    <a href="?category=${category.id}" class="nav-link p-0 text-dark hover-color-active d-flex justify-content-between">
        <span> ${category.name}</span>
        <span id="category_${category.id}_quantity">()</span>
    </a>
    `
    categoryEl.querySelector('a').addEventListener("click", (e) => {
        e.preventDefault()
        urlParams.set("category", category.id)
        window.location.search = urlParams.toString()
    });
    
    document.querySelector("#category_list").appendChild(categoryEl)
})

function render_category_quantities(products) {
    if (q) {
        products = products.filter((p) => p.title.toLowerCase().search(q.toLowerCase()) != -1)
    }
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

document.querySelector('#search_form').addEventListener("submit", (e) => {
    e.preventDefault()
    urlParams.set("q", document.querySelector('#search_inp').value)
    window.location.search = urlParams.toString()
})


function render_products(products) {
    const related_products_list = document.querySelector("#products .products")

    if (category_id) {
        console.log( get_category_name(category_id));
        products = products.filter((p) => p.category ==  get_category_name(category_id))
    }
    
    if (q) {
        products = products.filter((p) => p.title.toLowerCase().search(q.toLowerCase()) != -1)
    }
    
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
                <p class="fw-bold">$${element.price}</p>
            </div>
        `
        
        const spaceEl = document.createElement("div")
        spaceEl.classList.add("col-1")
        related_products_list.appendChild(spaceEl)
        related_products_list.appendChild(productEl)
    });

    
}


if (localStorage.getItem("products")) {
    render_category_quantities(JSON.parse(localStorage.getItem("products")))
    render_products(JSON.parse(localStorage.getItem("products")))
} else {
    fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((json) => {
        localStorage.setItem("products", JSON.stringify(json))
        render_category_quantities(json)
        render_products(json)
    })
}


