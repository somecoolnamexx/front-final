
document.querySelectorAll("#navbarSupportedContent ul li a").forEach((a) => {
    if (a.textContent.trim().toLowerCase() === 'home') {
        a.classList.add("active")
    };
})

function render_products(products) {
    const featured_products_list = document.querySelector("#featured_products_list")
    featured_products_list.innerHTML =''

    products.reverse()
    products = products.slice(0, 10)
    products.forEach(element => {
        const productEl = document.createElement("div")

        productEl.classList.add("card")
        productEl.classList.add("col-12")
        productEl.classList.add("col-sm-5")
        productEl.classList.add("col-md-4")
        productEl.classList.add("col-lg-3")
        productEl.classList.add("col-xl-2")
        productEl.classList.add("position-relative")
        
        productEl.innerHTML = `
            <img src="${element.image}" class="card-img-top" alt="image" role="button">
            <div class="card-body">
                <h6 class="card-title">${element.title.length > 50 ? element.title.slice(0, 47) + '...' : element.title}</h6>
                <p class="card-text mb-1"> 
                    <i class="bi bi-star${element.rating.rate >= 1 ? '-fill' : element.rating.rate >= 0.5 ? '-half' : ''}"></i>
                    <i class="bi bi-star${element.rating.rate >= 2 ? '-fill' : element.rating.rate >= 1.5 ? '-half' : ''}"></i>
                    <i class="bi bi-star${element.rating.rate >= 3 ? '-fill' : element.rating.rate >= 2.5 ? '-half' : ''}"></i>
                    <i class="bi bi-star${element.rating.rate >= 4 ? '-fill' : element.rating.rate >= 3.5 ? '-half' : ''}"></i>
                    <i class="bi bi-star${element.rating.rate >= 5 ? '-fill' : element.rating.rate >= 4.5 ? '-half' : ''}"></i>
                    ${element.rating.rate}
                </p>
                <p class="fw-bold">$${element.price.toFixed(2)}</p>
                <a href="/product/?id=${element.id}" class="btn primary-btn">See product</a>
            </div>
            <span class="quick_view position-absolute" role="button"><i class="bi bi-front"></i></span>
            <span class="quick_add_to_cart position-absolute" role="button"><i class="bi bi-cart-fill"></i></span>
        `
        productEl.querySelector(".quick_view").addEventListener("click", () => {
            const modal = get_quick_view_element(element)
            document.querySelector("#modal").innerHTML = `
            <button id="modal_button" type="button" class="d-none" data-bs-toggle="modal" data-bs-target="#quickView"></button>
            `
            document.querySelector("#modal").appendChild(modal)
            document.querySelector("#modal_button").click()
        })
        productEl.querySelector(".quick_add_to_cart").addEventListener("click", () => {
            add_to_cart(element, 1)
            document.querySelector("#nav-cart-price").parentElement.click()
        })
        productEl.querySelector("img").addEventListener("click", () => {
            productEl.querySelector(".quick_view").click()
        })

        featured_products_list.appendChild(productEl)
    });
}


for (let i = 0; i < 3; i ++) {
    document.querySelector("#featured_products_list").innerHTML += `
    <div class="card col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2" aria-hidden="true">
        <svg class="placeholder card-img-top"></svg>
        <div class="card-body">
            <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
            </p>
            <p class="card-text placeholder-glow">
                <span class="placeholder col-8"></span>
            </p>
            <a class="btn primary-btn placeholder col-6"></a>
        </div>
    </div>
    `
}

fetch_products((products) => render_products(products))
