// =====================
// МОДАЛЬНОЕ ОКНО ВХОДА
// =====================

function openModal() {
    document.getElementById("loginModal").style.display = "block";
}

function closeModal() {
    document.getElementById("loginModal").style.display = "none";
}

window.onclick = function (event) {
    let modal = document.getElementById("loginModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


// =====================
// КОРЗИНА
// =====================

document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const buttons = document.querySelectorAll(".btn-accent");

    buttons.forEach(button => {
        button.addEventListener("click", function () {

            const card = this.closest(".product-card");

            const name = card.querySelector("h3").innerText;
            const priceText = card.querySelector("p").innerText;
            const price = parseInt(priceText);
            const img = card.querySelector(".product-img").src;

            cart.push({ name, price, img });

            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();
            updateCartCount();
        });
    });


    function renderCart() {

        const cartItems = document.getElementById("cart-items");
        const totalElement = document.getElementById("cart-total");

        if (!cartItems || !totalElement) return;

        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {

            total += item.price;

            cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${item.img}" class="cart-img">

                <div class="cart-info">
                    <p>${item.name}</p>
                    <p>${item.price} MDL</p>
                </div>

                <button onclick="removeItem(${index})">✕</button>

            </div>
            `;
        });

        totalElement.innerText = total;
    }


    window.removeItem = function (index) {

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
        updateCartCount();
    }


    window.openCart = function () {
        document.getElementById("cart-sidebar").classList.add("active");
    }

    window.closeCart = function () {
        document.getElementById("cart-sidebar").classList.remove("active");
    }


    function updateCartCount() {

        const countElement = document.getElementById("cart-count");

        if (!countElement) return;

        countElement.innerText = cart.length;

        if (cart.length > 0) {
            countElement.style.display = "flex";
        } else {
            countElement.style.display = "none";
        }
    }

    renderCart();
    updateCartCount();
});


// =====================
// ПРОСМОТР КАРТИНОК
// =====================

document.querySelectorAll(".idea-card, .category-card").forEach(card => {

    const images = Array.from(card.querySelectorAll(".category-img"));

    let currentIndex = 0;

    card.addEventListener("click", function () {

        const viewer = document.getElementById("viewer");
        const viewerImg = document.getElementById("viewer-img");
        const prev = document.getElementById("prev");
        const next = document.getElementById("next");

        viewer.style.display = "flex";

        currentIndex = 0;

        viewerImg.src = images[currentIndex].src;


        function showImage(index) {

            if (index < 0) index = images.length - 1;
            if (index >= images.length) index = 0;

            currentIndex = index;

            viewerImg.src = images[currentIndex].src;
        }


        prev.onclick = () => showImage(currentIndex - 1);
        next.onclick = () => showImage(currentIndex + 1);


        viewer.onclick = function (e) {
            if (e.target === viewer) viewer.style.display = "none";
        };


        let scale = 1;

        viewerImg.style.transform = "scale(1)";

        viewerImg.onwheel = function (e) {

            e.preventDefault();

            scale += e.deltaY < 0 ? 0.1 : -0.1;

            if (scale < 1) scale = 1;
            if (scale > 3) scale = 3;

            viewerImg.style.transform = `scale(${scale})`;
        };
    });
});


// =====================
// МОДАЛЬНЫЕ СТАТЬИ
// =====================

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".idea-card");

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg-articles");
    const modalTitle = document.getElementById("modalTitle-articles");
    const modalDescription = document.getElementById("modalDescription-articles");

    if (!modal) return;

    const closeBtn = modal.querySelector(".close-articles");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const title = card.dataset.title;
            const img = card.dataset.img;

            modalTitle.textContent = card.querySelector(".category-title").textContent;

            modalImg.src = img;

            const template = document.getElementById(title);

            modalDescription.innerHTML = "";

            modalDescription.appendChild(template.content.cloneNode(true));

            modal.style.display = "flex";
        });

    });


    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });


    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

});

const burger = document.getElementById("burger");
const nav = document.getElementById("main-nav");
const closeMenu = document.getElementById("closeMenu");
const icons = document.getElementById("header-icons");

burger.onclick = () => {
    nav.classList.add("open");
    icons.classList.add("hide-icons");
}

closeMenu.onclick = () => {
    nav.classList.remove("open");
    icons.classList.remove("hide-icons");
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        icons.classList.remove("hide-icons");
    });
});