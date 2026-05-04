// ============================================
// FUOCO — PREMIUM INTERACTIONS
// ============================================

// --- DATA ---
const menuItems = [
    { id: 1, name: "Margherita DOC", desc: "San Marzano tomatoes, fior di latte, fresh basil, extra virgin olive oil.", price: 22, category: "classic", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Classic" },
    { id: 2, name: "Diavola", desc: "Spicy salami, roasted red peppers, nduja, smoked mozzarella.", price: 26, category: "classic", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Spicy" },
    { id: 3, name: "Tartufo Nero", desc: "Black truffle cream, wild mushrooms, fontina cheese, fresh thyme.", price: 32, category: "specialty", img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Premium" },
    { id: 4, name: "Salmone Affumicato", desc: "Smoked salmon, crème fraîche, dill, capers, lemon zest.", price: 28, category: "specialty", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Seafood" },
    { id: 5, name: "Orto Botanico", desc: "Grilled zucchini, eggplant, cherry tomatoes, pesto, vegan mozzarella.", price: 24, category: "vegan", img: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Vegan" }
];

// --- PRELOADER ---
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
        document.body.style.overflow = 'auto';
        // Trigger initial hero animations
        initScrollObserver();
    }, 1800);
});

// --- CUSTOM CURSOR ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; 
    mouseY = e.clientY;
    // Changed from -6 to -8 to center the 16px dot
    cursor.style.left = `${mouseX - 8}px`; 
    cursor.style.top = `${mouseY - 8}px`;
});

function animateFollower() {
    // Changed from 0.1 to 0.15 to make the follower feel a bit snappier/premium
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    // Changed from -20 to -25 to center the 50px follower
    follower.style.left = `${followerX - 25}px`; 
    follower.style.top = `${followerY - 25}px`;
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effect for interactive elements
document.querySelectorAll('a, button, .menu-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// --- HERO PARALLAX ---
const heroBg = document.getElementById('heroBg');
window.addEventListener('mousemove', (e) => {
    if (!heroBg) return;
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;
    heroBg.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
});

// --- NAVIGATION ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 100);
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    // Hamburger animation
    const spans = menuBtn.querySelectorAll('span');
    if (menuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        spans[0].style.background = spans[1].style.background = 'white';
    } else {
        spans[0].style.transform = 'none'; spans[1].style.transform = 'none';
        spans[0].style.background = spans[1].style.background = '';
    }
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        menuBtn.querySelectorAll('span').forEach(s => { s.style.transform = 'none'; s.style.background = ''; });
    });
});

// --- MAGNETIC BUTTONS ---
document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// --- SCROLL ANIMATIONS (Intersection Observer) ---
let scrollObserver; // Store observer globally so we can disconnect it later if needed

function initScrollObserver() {
    // Disconnect old observer if it exists (prevents bugs when filtering the menu)
    if (scrollObserver) scrollObserver.disconnect();

    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When scrolling INTO view: Add the class to animate in
                entry.target.classList.add('is-in-view');
            } else {
                // When scrolling OUT of view: Remove the class to reset the animation!
                entry.target.classList.remove('is-in-view');
            }
        });
    }, { 
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" 
    });

    // Find all elements that need to animate and watch them
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });
}

// --- MENU RENDERING ---
const menuGrid = document.getElementById('menuGrid');
let currentFilter = 'all';

function renderMenu(filter) {
    const items = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter);
    
    menuGrid.innerHTML = items.map((item, i) => `
        <div class="menu-card animate-on-scroll fade-up" style="transition-delay: ${i * 0.1}s">
            <div class="menu-card-img" style="background-image: url('${item.img}')"></div>
            <div class="menu-card-body">
                <div class="menu-card-top">
                    <h3>${item.name}</h3>
                    <span>$${item.price}</span>
                </div>
                <p>${item.desc}</p>
                <div class="menu-card-footer">
                    <span class="menu-tag">${item.tag}</span>
                    <button class="menu-add-btn">+</button>
                </div>
            </div>
        </div>
    `).join('');

    // Re-observe new elements for scroll animation
    initScrollObserver();
    
    // Re-attach cursor hover to new cards
    menuGrid.querySelectorAll('.menu-card').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
    // Re-attach cart listeners to newly rendered buttons
menuGrid.querySelectorAll('.menu-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.menu-card');
        if (!card) return;
        const name = card.querySelector('h3').innerText;
        const price = parseFloat(card.querySelector('.menu-card-top span').innerText.replace('$', ''));
        cart.push({ name, price });
        updateCartUI();
        openCart();
        btn.innerText = '✓';
        setTimeout(() => btn.innerText = '+', 1000);
    });
});
}

// Filter Buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderMenu(currentFilter);
    });
});

// Initial Render
renderMenu('all');

// --- SMOOTH SCROLL FOR ANCHORS ---
// ==========================================
// FULL STACK: BACKEND INTEGRATION
// ==========================================

const BACKEND_URL = 'http://localhost:3000/api/order';
let cart = [];

// Open/Close Cart Drawer
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');

document.getElementById('closeCart').addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
});
cartOverlay.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
});

function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
}

// Add to cart when + button is clicked

function updateCartUI() {
    const itemsContainer = document.getElementById('cartItems');
    const totalDisplay = document.getElementById('cartTotalPrice');
    
    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p class="empty-cart">Your selection is empty.</p>';
        totalDisplay.innerText = '$0.00';
        return;
    }

    itemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item-row">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="remove-item" onclick="removeFromCart(${index})">&times;</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisplay.innerText = `$${total.toFixed(2)}`;
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

// Send Order to Backend
document.getElementById('sendOrderBtn').addEventListener('click', async () => {
    const name = document.getElementById('customerName').value || 'Walk-in Guest';
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    if (cart.length === 0) {
        alert("Please add a pizza to your selection first!");
        return;
    }

    const btn = document.getElementById('sendOrderBtn');
    const originalText = btn.innerText;
    btn.innerText = 'Transmitting...';
    btn.style.opacity = '0.5';
    btn.disabled = true;

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerName: name,
                items: cart,
                total: total
            })
        });

        const data = await response.json();

        if (data.success) {
            alert("🎉 Order sent to your phone!");
            cart = []; 
            updateCartUI();
            document.getElementById('customerName').value = '';
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('open');
        } else {
            alert("BACKEND ERROR: " + JSON.stringify(data));
        }
    } catch (error) {
        alert("CONNECTION ERROR: " + error.message);
    } finally {
        btn.innerText = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
    }
});