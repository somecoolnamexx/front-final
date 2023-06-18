document.querySelector("nav").classList.remove("cover-nav")

const urlParams = new URLSearchParams(window.location.search);

const product_id = urlParams.get('id')

if (!product_id || !parseInt(product_id) || parseInt(product_id) > 20 || parseInt(product_id) < 1) {
    window.location = '/'
}


fetch(`https://fakestoreapi.com/products/${product_id}`)
.then((res) => res.json())
.then((json) => {
    document.querySelector("#description").textContent = json.description

    const productEl = document.createElement("div")
    productEl.classList.add("row")
    productEl.innerHTML = `
    <div class="col-lg-6 d-flex justify-content-center">
        <img src="${json.image}" alt="image" class="img-fluid">
    </div>
    <div class="col-lg-6">
        <a href="/products/?category=${json.category == 'electronics' ? 1 : json.category == 'jewelery' ? 2 : 3}" class="link-secondary link-underline link-underline-opacity-0 hover-color-active">
            ${json.category}
        </a>
        <h3 class="card-title mt-2">
            ${json.title}
        </h3>
        <p> 
            <i class="bi bi-star${json.rating.rate >= 1 ? '-fill' : json.rating.rate >= 0.5 ? '-half' : ''}"></i>
            <i class="bi bi-star${json.rating.rate >= 2 ? '-fill' : json.rating.rate >= 1.5 ? '-half' : ''}"></i>
            <i class="bi bi-star${json.rating.rate >= 3 ? '-fill' : json.rating.rate >= 2.5 ? '-half' : ''}"></i>
            <i class="bi bi-star${json.rating.rate >= 4 ? '-fill' : json.rating.rate >= 3.5 ? '-half' : ''}"></i>
            <i class="bi bi-star${json.rating.rate >= 5 ? '-fill' : json.rating.rate >= 4.5 ? '-half' : ''}"></i>
            ${json.rating.rate}
        </p>
        <p class="fs-3 fw-bold mt-3">$${json.price}</p>
        <p class="mt-3">${json.description}</p>
        <form id="add_to_cart_form" method="post" action="#">
            <div class="row">
                <div class="col-4 col-xl-2">
                    <input type="number" id="quantity" class="form-control" value="1" min="1" max="99">
                </div>
                <button type="submit" class="btn primary-btn col-5 ms-3" >Add To Cart</button>
            </div>
        </form>
        <hr>
        <p>
            Category:
            <a href="/products/?category=${json.category == 'electronics' ? 1 : json.category == 'jewelery' ? 2 : 3}" class="link-secondary link-underline link-underline-opacity-0 hover-color-active">
                ${json.category}
            </a>
        </p>
    </div>
    `
    document.querySelector("#product").appendChild(productEl)

    document.querySelector("#add_to_cart_form").addEventListener("submit", (e) => {
        e.preventDefault()
        alert(document.querySelector("#quantity").value)
    })
})


const stars = document.querySelectorAll("#review_rate_inp i")

stars.forEach((i) => {
    i.addEventListener("click", (e) => {
        let fill = true
        stars.forEach((j) => {
            if (fill) {
                j.classList.remove("bi-star")
                j.classList.add("bi-star-fill")
            } else {
                j.classList.remove("bi-star-fill")
                j.classList.add("bi-star")
            }
            if (i === j) {
                fill = false
            }
        })
    })
})


document.querySelector("#review_form").addEventListener("submit", (e) => {
    e.preventDefault()
    if (!document.querySelector("#review_rate_inp .bi-star-fill")) {
        alert("Please select a rating")
    } else if (
            document.querySelector("#review_review_inp").value && 
            document.querySelector("#review_name_inp").value && 
            document.querySelector("#review_email_inp").value
        ) {
        alert("Your review is send")
        location.reload()
    } else {
        alert("Please fill all data")
    }
})


fetch('https://fakestoreapi.com/products')
.then((res) => res.json())
.then((json) => {
    const related_products_list = document.querySelector("#related_products .products")

    json.reverse()
    let s = Math.floor(Math.random() * (json.length - 4))
    json = json.slice(s, s + 2 + Math.floor(Math.random() * 2))
    json.forEach(element => {
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
                <a href="/products/?category=${element.category == 'electronics' ? 1 : element.category == 'jewelery' ? 2 : 3}" class="link-secondary link-underline link-underline-opacity-0 hover-color-active">
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
                <p class="fw-bold">$${element.price}</p>
            </div>
        `
        related_products_list.appendChild(productEl)
    });
})