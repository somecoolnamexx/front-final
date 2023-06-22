document.querySelector("nav").classList.remove("cover-nav")



document.querySelector("#payment_radio_cash").addEventListener("change", (e) => {
    if (e.isTrusted) {
        document.querySelector("#order_payment").classList.remove("card_show")
    }
})

document.querySelector("#payment_radio_card").addEventListener("change", (e) => {
    if (e.isTrusted) {
        document.querySelector("#order_payment").classList.add("card_show")
    }
})

function order_submit(message) {
    const checkout_form = document.querySelector("#checkout_form")
    if (checkout_form.checkValidity()) {
        localStorage.setItem("cart", "[]")
        document.querySelector("main").innerHTML = `
        <div class="mt-5 p-3 bg-secondary bg-opacity-10 border border-dark border-3 border-end-0 border-bottom-0 border-start-0 container col-sm-10">
            <span><i class="bi bi-check-circle-fill"></i> ${message}</span>
        </div>
        `
        refresh_display_cart()
        scroll(0, 0)
    } else {
        checkout_form.reportValidity()
    }
}

document.querySelector("#order_btn").addEventListener("click", (e) => order_submit("Thank you for your purchase."))
document.querySelector("#gpay_btn").addEventListener("click", (e) => order_submit("Thank you for your purchase with gpay."))


let cart = JSON.parse(localStorage.getItem("cart"))
if (cart.length === 0) {
    document.querySelector("#tables").classList.add("d-none")
    window.location = "/cart"
} else {
    const order_table_tbody = document.querySelector("#order_table_tbody")
    order_table_tbody.innerHTML = ''
    const add_tr = (title, subtotal, quantity) => {
        const trEl = document.createElement("tr")
        trEl.innerHTML = `
        <td scope="row" class="px-0 py-3 text-secondary fw-medium">
        ${title}${quantity ? `<span class="fw-normal"><i class="bi bi-x"></i>${quantity}</span>` : ''}
        </td>
        <td scope="row" class="px-0 py-3 text-secondary text-end">
            $${subtotal.toFixed(2)}
        </td>
        `
        order_table_tbody.appendChild(trEl)
    }
    
    cart.forEach((item) => add_tr(item.product.title, item.quantity * item.product.price, item.quantity))
    let subtotal = 0
    cart.forEach((item) => subtotal += item.quantity * item.product.price)
    add_tr("Subtotal", subtotal)
    add_tr("Total", subtotal)
}
