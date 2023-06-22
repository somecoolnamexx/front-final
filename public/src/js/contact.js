document.querySelectorAll("#navbarSupportedContent ul li a").forEach((a) => {
    if (a.textContent.trim().toLowerCase() === 'contact') {
        a.classList.add("active")
    };
})

document.querySelector("#contact_form").addEventListener("submit", (e) => {
    e.preventDefault()
    if (document.querySelector("#contact_name_inp").value && 
        document.querySelector("#contact_email_inp").value && 
        document.querySelector("#contact_subject_inp").value && 
        document.querySelector("#contact_message_inp").value
        ) {
        alert("Your message is send")
        document.querySelector("#contact_form").reset()
    } else {
        alert("Please fill all data")
    }
})