# Fit India - Health & Fitness Platform

A modern, responsive health and fitness website with AI-powered diet planning, product catalog, and comprehensive wellness solutions.

## 🚀 Features

- **AI-Powered Diet Planner**: Personalized meal plans and supplement recommendations
- **Product Catalog**: Curated selection of fitness supplements and equipment
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Admin Dashboard**: Complete backend management system
- **Shopping Cart**: E-commerce functionality with local storage
- **Modern Tech Stack**: HTML5, CSS3, JavaScript, Tailwind CSS

## 📁 Project Structure

```
FitIndiaSite/
├── index.html                 # Main homepage
├── about.html                 # About us page
├── chatbot.html              # AI diet planner
├── products.html             # Product catalog
├── categories.html           # Product categories
├── cart.html                 # Shopping cart
├── admin.html                # Admin login
├── admin-dashboard.html      # Admin dashboard
├── assets/                   # All static assets
│   ├── css/
│   │   └── styles.css        # Main stylesheet
│   ├── js/
│   │   ├── nav.js           # Navigation functionality
│   │   ├── products.js      # Product management
│   │   ├── chatbot.js       # AI chatbot integration
│   │   ├── cart.js          # Shopping cart logic
│   │   ├── home.js          # Homepage functionality
│   │   ├── about.js         # About page features
│   │   ├── categories.js    # Category management
│   │   ├── error-handling.js # Asset error handling
│   │   ├── firebase-config.js # Firebase configuration
│   │   ├── admin-auth.js    # Admin authentication
│   │   └── admin/           # Admin-specific scripts
│   │       ├── charts.js
│   │       ├── user-management.js
│   │       ├── health-records.js
│   │       └── meal-plans.js
│   ├── images/
│   │   ├── products/        # Product images
│   │   ├── testimonials/    # User testimonial images
│   │   ├── team/           # Team member photos
│   │   └── categories/     # Category images
│   └── videos/             # Video assets
├── api/                     # Backend API files
├── chatbot-api/            # Chatbot API
├── ecommerce-api/          # E-commerce API
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Quick Start

1. **Clone or Download** the project files
2. **Open `index.html`** in your web browser
3. **For development**, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### Running the Chatbot API

1. **Navigate to chatbot-api directory**:
   ```bash
   cd chatbot-api
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the chatbot server**:
   ```bash
   python app.py
   ```

4. **Access the chatbot** at `http://localhost:5000`

### Running the E-commerce API

1. **Navigate to ecommerce-api directory**:
   ```bash
   cd ecommerce-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

## 🎨 Customization Guide

### Colors & Branding

Edit `assets/css/styles.css` to customize:
- Primary colors (green theme)
- Typography
- Spacing and layout
- Component styles

### Content Updates

1. **Homepage**: Edit `index.html` sections
2. **Products**: Update product data in `assets/js/products.js`
3. **Images**: Replace files in `assets/images/`
4. **Videos**: Add new videos to `assets/videos/`

### Adding New Pages

1. Create new HTML file
2. Copy navigation structure from existing pages
3. Update navigation links in all HTML files
4. Add corresponding CSS/JS files to `assets/`

### Admin Panel Customization

1. **Authentication**: Modify `assets/js/admin-auth.js`
2. **Dashboard**: Edit `admin-dashboard.html`
3. **User Management**: Update `assets/js/admin/user-management.js`

## 🔧 Technical Details

### Frontend Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Tailwind CSS
- **JavaScript**: ES6+ features
- **Responsive Design**: Mobile-first approach

### Backend Integration
- **Chatbot API**: Python Flask
- **E-commerce API**: Node.js/Express
- **Database**: JSON-based storage
- **Authentication**: Firebase Auth

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🚀 Deployment

### Static Hosting (Recommended)
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free hosting for public repos

### Server Deployment
1. Upload all files to web server
2. Ensure proper file permissions
3. Configure server for SPA routing
4. Set up SSL certificate

### Environment Variables
Create `.env` file for API endpoints:
```
CHATBOT_API_URL=http://localhost:5000
ECOMMERCE_API_URL=http://localhost:3000
FIREBASE_CONFIG=your_firebase_config
```

## 📱 Mobile Optimization

- Responsive breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly navigation
- Optimized images and videos
- Fast loading times

## 🔒 Security Features

- Input validation
- XSS protection
- CSRF tokens
- Secure authentication
- HTTPS enforcement

## 📊 Performance

- Optimized images
- Minified CSS/JS
- Lazy loading
- CDN integration
- Caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@fitindia.com
- Phone: +91 123-456-7890
- Documentation: [Link to docs]

## 🎯 Roadmap

- [ ] PWA implementation
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] AI-powered workout plans
- [ ] Social features
- [ ] Payment gateway integration

---

**Built with ❤️ for the Reckon 6.0 Hackathon** 