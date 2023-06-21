document.querySelectorAll("#navbarSupportedContent ul li a").forEach((a) => {
    if (a.textContent.trim().toLowerCase() === 'about us') {
        a.classList.add("active")
    };
})
