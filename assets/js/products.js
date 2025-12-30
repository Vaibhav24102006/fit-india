class ProductStore {
  constructor() {
    this.products = [
      {
        id: 1,
        name: "Whey Protein Isolate",
        category: "supplements",
        price: 7999,
        image: "images/products/whey-protein.jpg", // Changed to relative path
        description: "High-quality protein supplement for muscle recovery",
        dietTypes: ["vegetarian", "non-veg"],
        imageSize: {
          width: "150px",
          height: "150px",
        },
      },
      {
        id: 2,
        name: "Yoga Mat",
        category: "equipment",
        price: 799,
        image: "images/products/yoga-mat.webp",
        description: "Non-slip exercise mat for yoga and fitness",
        dietTypes: ["all"],
        imageSize: {
          width: "150px",
          height: "150px",
        },
      },
      {
        id: 3,
        name: "Plant-Based Protein",
        category: "supplements",
        price: 2199,
        image: "images/products/shopping.webp",
        description: "Vegan protein powder blend",
        dietTypes: ["vegan", "vegetarian"],
        imageSize: {
          width: "150px",
          height: "150px",
        },
      },
      {
        id: 9,
        name: "Optimum Nutrition BCAA 5000 Powder",
        category: "nutrition",
        price: 1200,
        image: "images/products/shopping2.0.webp",
        description:
          "amino acids that contain BCAAs with every meal have less belly fat and more muscles",
        dietTypes: ["all"],
        imageSize: {
          width: "150px",
          height: "150px",
        },
      },
      {
        id: 10,
        name: "TrueBasics Vegan Omega",
        category: "nutrition",
        price: 1600,
        image: "images/products/shopping3.0.webp",
        description: "Omega 870mg of Vegetarian Omega Fatty Acids, 90 capsules",
        dietTypes: ["all"],
        imageSize: {
          width: "150px",
          height: "150px",
        },
      },
      {
        id: 11,
        name: "Supply6 360",
        category: "nutrition",
        price: 2100,
        image: "images/products/Catalog_5.webp",
        description:
          "all your daily micronutrients in the form of antioxidants, berries, greens, adaptogens, super fruits, and healthy seeds.",
        dietTypes: ["all"],
        imageSize: {
          width: "150px",
          height: "150px",
        },
      },
    ];

    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.initializeStore();
    this.ensureNavManager();
  }

  ensureNavManager() {
    if (window.navManager) {
      window.navManager.updateCartCount();
    } else {
      setTimeout(() => this.ensureNavManager(), 100);
    }
  }

  initializeStore() {
    this.renderProducts();
    this.setupEventListeners();
    this.updateCartCount();
  }

  renderProducts(category = "all") {
    const productsGrid = document.getElementById("products-grid");
    const filteredProducts =
      category === "all"
        ? this.products
        : this.products.filter((p) => p.category === category);

    productsGrid.innerHTML = filteredProducts
      .map(
        (product) => `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                    src="${product.image}" 
                    alt="${product.name}" 
                    style="width: ${
                      product.imageSize?.width || "100%"
                    }; height: ${product.imageSize?.height || "12rem"};"
                    class="object-cover"
                >
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-800">${
                      product.name
                    }</h3>
                    <p class="text-gray-600 text-sm mb-2">${
                      product.description
                    }</p>
                    <div class="flex justify-between items-center mt-4">
                        <span class="text-green-600 font-bold">₹${
                          product.price
                        }</span>
                        <button 
                            class="btn-primary text-sm px-4 py-2"
                            onclick="productStore.addToCart(${product.id})"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  setupEventListeners() {
    document.querySelectorAll(".category-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        document
          .querySelectorAll(".category-btn")
          .forEach((btn) => btn.classList.remove("active"));
        e.target.classList.add("active");
        this.renderProducts(e.target.dataset.category);
      });
    });
  }

  addToCart(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      const cartItem = this.cart.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.updateCart();
      this.showNotification("Added to cart!");
    }
  }

  updateCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    window.dispatchEvent(new Event('cartUpdated'));
  }

  updateCartCount() {
    const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector(".cart-count").textContent = count;
  }

  showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "success-message fixed top-4 right-4 z-50";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  }
}

// Initialize the store
const productStore = new ProductStore();
