document.querySelector("nav").classList.remove("cover-nav")


function refresh_cart_list() {
    let cart = JSON.parse(localStorage.getItem("cart"))
    if (cart.length === 0) {
        document.querySelector(".items").classList.add("d-none")
        document.querySelector("#no_products").classList.remove("d-none")
    } else {
        let subtotals = 0
        document.querySelector(".items").classList.remove("d-none")
        document.querySelector("#no_products").classList.add("d-none")
        document.querySelector("#table_body").innerHTML = ''
        cart.forEach((item) => {
            const table_tr = document.createElement("tr")
            const subtotal = item.quantity * item.product.price
            table_tr.innerHTML = `
            <td scope="row" class="text-right text-md-center text-secondary"><span class="remove fs-5" role="button"><i class="bi bi-x-circle"></i></span></td>
            <td><img src="${item.product.image}" alt="image" class="img-fluid"></td>
            <td data-title="Product:" class="text-secondary"><a href="/product/?id=${item.product.id}" class="link-secondary link-underline-opacity-0 hover-color-active">${item.product.title}</a></td>
            <td data-title="Price:" class="text-secondary">$${item.product.price.toFixed(2)}</td>
            <td data-title="Quantity:" class="text-secondary"><input type="number" class="form-control" id="quantity_${item.id}" value="${item.quantity}" min="1" max="99"></td>
            <td data-title="Subtotal:" class="text-secondary">$${subtotal.toFixed(2)}</td>
            `
            subtotals += subtotal
            table_tr.querySelector(".remove").addEventListener("click", (e) => {
                document.querySelector("#message").classList.remove("d-none")
                document.querySelector("#q-product-title").textContent = item.product.title
                remove_item_from_cart(item)
                refresh_cart_list()
            })
            table_tr.querySelector(`#quantity_${item.id}`).addEventListener("input", (e) => {
                const value = table_tr.querySelector(`#quantity_${item.id}`).value
                if(value && parseInt(value) && parseInt(value) > 0 && parseInt(value) < 99) {
                    cart.forEach((i) => {
                        if (i.id === item.id) {
                            i.quantity = parseInt(value)
                        }
                    })
                    localStorage.setItem("cart", JSON.stringify(cart))
                    refresh_cart_list()
                } else {
                    alert("Quantity must be between 1 and 99")
                }
            })
            document.querySelector("#table_body").appendChild(table_tr)
        });
        document.querySelector("#cart_totals_subtotal").textContent = `$${subtotals.toFixed(2)}`
        document.querySelector("#cart_totals_total").textContent = `$${subtotals.toFixed(2)}`
    }
}


refresh_cart_list()
document.querySelector("#undo_btn").addEventListener("click", (e) => {
    document.querySelector("#message").classList.add("d-none")
    document.querySelector(".items").classList.remove("d-none")
    undo_removed_item_in_cart()
    refresh_cart_list()
})