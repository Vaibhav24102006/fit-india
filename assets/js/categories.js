class CategoryManager {
  constructor() {
    this.categories = [
      {
        id: "supplements",
        name: "Supplements",
        description: "Premium quality supplements for your fitness journey",
        image: "images/categories/supplements.jpg",
      },
      // Add more categories
    ];

    this.featuredProducts = [];
    this.initializeCategories();
  }

  async initializeCategories() {
    this.setupEventListeners();
    await this.loadFeaturedProducts();
  }

  setupEventListeners() {
    document.querySelectorAll(".category-card").forEach((card) => {
      card.addEventListener("mouseenter", this.handleCategoryHover);
      card.addEventListener("mouseleave", this.handleCategoryLeave);
    });
  }

  handleCategoryHover(e) {
    e.currentTarget.classList.add("category-hover");
  }

  handleCategoryLeave(e) {
    e.currentTarget.classList.remove("category-hover");
  }

  async loadFeaturedProducts() {
    try {
      const productsGrid = document.getElementById("featured-products");
      // Load featured products from ProductStore
      const productStore = new ProductStore();
      this.featuredProducts = productStore.products.slice(0, 4);

      productsGrid.innerHTML = this.featuredProducts
        .map(
          (product) => `
                <div class="product-card bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold">${product.name}</h3>
                        <p class="text-green-600 font-bold mt-2">₹${product.price}</p>
                    </div>
                </div>
            `
        )
        .join("");
    } catch (error) {
      console.error("Error loading featured products:", error);
    }
  }
}

// Initialize category manager
const categoryManager = new CategoryManager();
