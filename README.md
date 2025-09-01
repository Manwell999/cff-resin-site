# CFF Resin

A modern, responsive website with a landing page, store, quote wizard, and checkout built with HTML, CSS, and JavaScript.

## Features

### Landing Page (`index.html`)
- **Hero Section**: Eye-catching introduction with call-to-action buttons
- **Features Section**: Highlight your business benefits with icons and descriptions
- **About Section**: Tell your story and mission
- **Contact Section**: Contact form and business information
- **Responsive Navigation**: Mobile-friendly navigation with hamburger menu
- **Footer**: Social links and quick navigation

### Store Page (`store.html`)
- **Product Grid**: Display products with images, prices, and ratings
- **Filtering System**: Filter by category and price range
- **Sorting Options**: Sort by name, price, or rating
- **Shopping Cart**: Add/remove items with quantity controls
- **Cart Modal**: Slide-out cart with total calculation
- **Responsive Design**: Works on all device sizes

## File Structure

```
.
├── index.html          # Landing page
├── store.html          # Store page
├── checkout.html       # Checkout page
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── server.js           # Stripe backend (Node/Express)
└── README.md           # This file
```

## Getting Started (static)

1. **Download/Clone** the files to your local machine
2. **Open** `index.html` in your web browser to view the landing page
3. **Click** "Store" in the navigation to view the store page. Add items and proceed to checkout.
4. **Customize** the content, styling, and functionality as needed

## Customization Guide

### Business Information
Update the following in both HTML files:
- Business name: Replace "YourBusiness" throughout
- Contact information: Update address, phone, and email
- Social media links: Add your actual social media URLs
- About section: Write your business story

### Products
Edit the `products` array in `script.js`:
```javascript
const products = [
    {
        id: 1,
        name: "Your Product Name",
        category: "electronics", // or "clothing", "home", "books"
        price: 99.99,
        rating: 4.5,
        image: "🎧" // Use emoji or replace with image URL
    },
    // Add more products...
];
```

### Styling
Modify `styles.css` to change:
- **Colors**: Update the color scheme (primary: #2563eb, gradient: #667eea to #764ba2)
- **Fonts**: Change the font family (currently using Inter from Google Fonts)
- **Layout**: Adjust spacing, sizes, and responsive breakpoints

### Images
Replace placeholder elements with actual images:
- Hero section: Replace the store icon with your business image
- About section: Replace the building icon with your company image
- Products: Replace emojis with product images

## Features in Detail

### Navigation
- Fixed navigation bar with blur effect
- Mobile hamburger menu
- Active page highlighting
- Smooth scrolling to sections

### Store Functionality
- **Product Display**: Grid layout with hover effects
- **Filtering**: By category and price range
- **Sorting**: By name, price (low/high), and rating
- **Shopping Cart**: 
  - Add/remove items
  - Quantity controls
  - Total calculation
  - Slide-out modal
- **Responsive**: Adapts to all screen sizes

### Contact Form
- Form validation
- Success notifications
- Ready for backend integration

### Animations & Effects
- Hover effects on cards and buttons
- Smooth transitions
- Loading animations
- Notification system

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance

- Optimized CSS with efficient selectors
- Minimal JavaScript for fast loading
- Responsive images and icons
- Smooth animations without performance impact

## Local Stripe Backend

1. Install dependencies:
   ```sh
   npm install express stripe cors dotenv
   ```
2. Create `.env` with:
   ```env
   STRIPE_SECRET_KEY=sk_test_REPLACE_WITH_YOUR_SECRET_KEY
   ```
3. Run backend:
   ```sh
   node server.js
   ```
4. In `checkout.html`, the frontend calls `/create-payment-intent` (works locally when served by Node). If you deploy backend separately, update the URL in `script.js`.

## Customization Examples

### Change Color Scheme
In `styles.css`, update these variables:
```css
/* Primary blue */
.nav-logo h2 { color: #your-color; }
.btn-primary { background: #your-color; }

/* Gradient background */
.hero { background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%); }
```

### Add New Product Categories
1. Update the category filter options in `store.html`
2. Add new category values to products in `script.js`
3. Add corresponding CSS styles if needed

### Modify Layout
- Change grid layouts in CSS
- Adjust padding and margins
- Modify responsive breakpoints

## Support

This is a static website template. For advanced features like:
- User accounts
- Payment processing
- Inventory management
- Order tracking

You'll need to integrate with backend services or use platforms like:
- Shopify
- WooCommerce
- Squarespace
- Wix

## License

This template is free to use and modify for your business needs.

---

**Happy customizing!** 🚀 

## Stripe Integration Setup

### 1. Backend Setup (Node.js/Express)

1. Install dependencies:
   ```sh
   npm install express stripe cors dotenv
   ```
2. Create a file named `.env` in your project root with:
   ```env
   STRIPE_SECRET_KEY=sk_test_REPLACE_WITH_YOUR_SECRET_KEY
   ```
3. Add the backend server code (see below) as `server.js` in your project root.
4. Start the backend:
   ```sh
   node server.js
   ```

### 2. Frontend Setup

- In `script.js`, replace the publishable key with your own `pk_test_...`.

### 3. Running Locally

- Start the backend (`node server.js`).
- Open `store.html`, add items, then go to `checkout.html`.
- The frontend posts to `http://localhost:4242/create-payment-intent`.

---

## Example Backend (`server.js`)

```js
require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      // You can add metadata or receipt_email here
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Stripe backend running on port ${PORT}`));
```

---

## Environment Variables
- `STRIPE_SECRET_KEY`: Your Stripe secret key (starts with `sk_test_...` for test mode).
- Your publishable key (starts with `pk_test_...`) goes in the frontend JS.

## Production checklist

- Replace Stripe publishable key in `script.js` and set `STRIPE_SECRET_KEY` in your backend host.
- Change fetch URL in `script.js` to your deployed backend.
- Replace the Google Apps Script URL in the quote wizard with your own endpoint or service.
- Swap emoji placeholders for real product images.
- Add SEO meta tags, sitemap, analytics, and legal pages (privacy/terms).

---

## Security Note
- Never expose your secret key in frontend code or public repos.
- Use HTTPS in production. 