// CFF Resin Products
const products = [
    {
        id: 1,
        name: "CFF Resin T-Shirt",
        category: "merchandise",
        price: 25.00,
        rating: 5.0,
        image: "👕",
        description: "Show your passion for resin work with our exclusive CFF Resin branded t-shirt. Made from premium cotton blend for comfort and durability. Perfect for wearing in the workshop or out and about. Features the CFF Resin logo and represents quality craftsmanship in every thread."
    }
];

// Shopping cart
let cart = [];
// Load cart from localStorage ASAP
try {
  const stored = localStorage.getItem('cart');
  if (stored) cart = JSON.parse(stored);
} catch (_) {
  cart = [];
}

function persistCart() {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (_) {}
}

// DOM Elements - Initialize globally with null checks
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const productsGrid = document.getElementById('products-grid');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const sortFilter = document.getElementById('sort-filter');

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Cart functionality is now handled in initCartGlobally() function

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateCartCount();
    persistCart();
    
    // Show success message
    showNotification('Product added to cart!');
}

// Update cart display
function updateCartDisplay() {
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #64748b;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                ${item.image}
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        
        updateCartDisplay();
        updateCartCount();
        persistCart();
    }
}

// Update cart count
function updateCartCount() {
    if (!cartCount) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// --- Quote Wizard (Contact Form) ---
function initQuoteWizard() {
  const form = document.getElementById('quoteWizardForm');
  if (!form) return;

  const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3-flooring'),
    document.getElementById('step-3-custom'),
    document.getElementById('step-4')
  ];
  let currentStep = 0;
  let quoteType = '';

  function showStep(index) {
    steps.forEach((step, i) => {
      if (step) step.style.display = i === index ? 'block' : 'none';
    });
    currentStep = index;
  }

  const next1 = document.getElementById('next-1');
  const next2 = document.getElementById('next-2');
  const back2 = document.getElementById('back-2');
  const next3Floor = document.getElementById('next-3-flooring');
  const back3Floor = document.getElementById('back-3-flooring');
  const next3Custom = document.getElementById('next-3-custom');
  const back3Custom = document.getElementById('back-3-custom');
  const back4 = document.getElementById('back-4');

  if (next1) next1.onclick = () => {
    if (
      document.getElementById('wiz-name').value &&
      document.getElementById('wiz-email').value &&
      document.getElementById('wiz-phone').value &&
      document.getElementById('wiz-address').value
    ) {
      showStep(1);
    } else {
      alert('Please fill out all contact information.');
    }
  };

  if (next2) next2.onclick = () => {
    quoteType = document.getElementById('wiz-quoteType').value;
    if (quoteType === 'flooring') showStep(2);
    else if (quoteType === 'custom') showStep(3);
    else alert('Please select a quote type.');
  };
  if (back2) back2.onclick = () => showStep(0);

  function showReview() {
    const review = document.getElementById('review-content');
    if (!review) return;
    let html = `
      <strong>Name:</strong> ${document.getElementById('wiz-name').value}<br>
      <strong>Email:</strong> ${document.getElementById('wiz-email').value}<br>
      <strong>Phone:</strong> ${document.getElementById('wiz-phone').value}<br>
      <strong>Address:</strong> ${document.getElementById('wiz-address').value}<br>
      <strong>Type of Quote:</strong> ${quoteType.charAt(0).toUpperCase() + quoteType.slice(1)}<br>
    `;
    if (quoteType === 'flooring') {
      const cond = document.getElementById('wiz-concreteCondition');
      html += `
        <strong>Square Footage / Size:</strong> ${document.getElementById('wiz-squareFootage').value}<br>
        <strong>Condition of Concrete:</strong> ${cond.options[cond.selectedIndex].text}<br>
        <strong>Requests/Questions:</strong> ${document.getElementById('wiz-flooringRequests').value}<br>
      `;
    } else {
      html += `
        <strong>Custom Request:</strong> ${document.getElementById('wiz-customRequest').value}<br>
      `;
    }
    review.innerHTML = html;
  }

  if (next3Floor) next3Floor.onclick = () => {
    if (
      document.getElementById('wiz-squareFootage').value &&
      document.getElementById('wiz-concreteCondition').value
    ) {
      showReview();
      showStep(4);
    } else {
      alert('Please fill out all flooring details.');
    }
  };
  if (back3Floor) back3Floor.onclick = () => showStep(1);

  if (next3Custom) next3Custom.onclick = () => {
    if (document.getElementById('wiz-customRequest').value) {
      showReview();
      showStep(4);
    } else {
      alert('Please explain your custom request.');
    }
  };
  if (back3Custom) back3Custom.onclick = () => showStep(1);

  if (back4) back4.onclick = () => {
    if (quoteType === 'flooring') showStep(2); else showStep(3);
  };

  // File input previews
  ['wiz-files', 'wiz-files-custom'].forEach((inputId) => {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(inputId === 'wiz-files' ? 'file-preview' : 'file-preview-custom');
    if (!input || !preview) return;
    input.addEventListener('change', (e) => {
      preview.innerHTML = '';
      const files = Array.from(e.target.files);
      files.forEach((file, index) => {
        if (index >= 5) return;
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file-item';
        if (file.type.startsWith('image/')) {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(file);
          img.style.width = '50px';
          img.style.height = '50px';
          img.style.objectFit = 'cover';
          img.style.marginRight = '10px';
          fileDiv.appendChild(img);
        }
        const fileInfo = document.createElement('span');
        fileInfo.textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`;
        fileDiv.appendChild(fileInfo);
        preview.appendChild(fileDiv);
      });
    });
  });

  // Submit handler
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    const data = {
      name: document.getElementById('wiz-name').value,
      email: document.getElementById('wiz-email').value,
      phone: document.getElementById('wiz-phone').value,
      address: document.getElementById('wiz-address').value,
      quoteType,
      squareFootage: document.getElementById('wiz-squareFootage')?.value || '',
      concreteCondition: document.getElementById('wiz-concreteCondition')?.value || '',
      flooringRequests: document.getElementById('wiz-flooringRequests')?.value || '',
      customRequest: document.getElementById('wiz-customRequest')?.value || '',
      files: []
    };
    const fileInput = quoteType === 'flooring' ?
      document.getElementById('wiz-files') : document.getElementById('wiz-files-custom');

    const filePromises = [];
    if (fileInput && fileInput.files.length > 0) {
      for (let i = 0; i < fileInput.files.length && i < 5; i++) {
        const file = fileInput.files[i];
        data.files.push({ name: file.name, type: file.type, size: file.size, data: null });
        filePromises.push(new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            data.files[i].data = ev.target.result.split(',')[1];
            resolve();
          };
          reader.readAsDataURL(file);
        }));
      }
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbw1cNg7A3-4Hy67jVoDnzz7zKa58tkfPpa9p-aS7GMXeUj224lcLulPWrwXj_FeqVjl/exec';
    Promise.all(filePromises).then(() => fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }))
    .then(r => r.json())
    .then(resp => {
      if (resp.result === 'success') {
        alert('Quote request submitted successfully! We will contact you soon.');
        form.reset();
        showStep(0);
        const p1 = document.getElementById('file-preview');
        const p2 = document.getElementById('file-preview-custom');
        if (p1) p1.innerHTML = '';
        if (p2) p2.innerHTML = '';
      } else {
        alert('Error: ' + (resp.error || 'There was an error submitting your request. Please try again.'));
      }
    })
    .catch(() => alert('There was an error submitting your request. Please try again.'))
    .finally(() => { submitBtn.textContent = originalText; submitBtn.disabled = false; });
  });

  // Ensure first step visible
  showStep(0);
}

// Display products
function displayProducts(productsToShow = products) {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-category">${product.category}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">
                    <div class="stars">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span>(${product.rating})</span>
                </div>
                <button class="add-to-cart" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    Add to Cart
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Filter and sort products
function filterAndSortProducts() {
    if (!categoryFilter || !priceFilter || !sortFilter) return;
    
    let filteredProducts = [...products];
    
    // Category filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
    
    // Price filter
    const selectedPrice = priceFilter.value;
    if (selectedPrice !== 'all') {
        const [min, max] = selectedPrice.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
            if (selectedPrice === '200+') {
                return product.price >= 200;
            }
            return product.price >= min && product.price <= max;
        });
    }
    
    // Sort
    const sortBy = sortFilter.value;
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
        default:
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    displayProducts(filteredProducts);
}

// Add event listeners for filters
if (categoryFilter) {
    categoryFilter.addEventListener('change', filterAndSortProducts);
}

if (priceFilter) {
    priceFilter.addEventListener('change', filterAndSortProducts);
}

if (sortFilter) {
    sortFilter.addEventListener('change', filterAndSortProducts);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Material Calculator Data
const materialCalculator = {
    // Base coverage rates (gallons per 100 sq ft at 1/8" thickness)
    coverageRates: {
        'floor': { rate: 0.8, wasteFactor: 1.1 },
        'table': { rate: 0.9, wasteFactor: 1.05 },
        'countertop': { rate: 0.85, wasteFactor: 1.1 },
        'art': { rate: 1.0, wasteFactor: 1.2 },
        'garage': { rate: 0.75, wasteFactor: 1.15 },
        'commercial': { rate: 0.7, wasteFactor: 1.2 },
        'basement': { rate: 0.8, wasteFactor: 1.15 }
    },
    
    // Substrate-specific factors
    substrateFactors: {
        'concrete': { absorption: 1.0, prepFactor: 1.0 },
        'wood': { absorption: 1.3, prepFactor: 1.1 },
        'metal': { absorption: 0.8, prepFactor: 1.2 },
        'existing-coating': { absorption: 0.9, prepFactor: 1.1 },
        'plywood': { absorption: 1.4, prepFactor: 1.15 }
    },
    
    // Environmental factors
    environmentalFactors: {
        temperature: {
            'cold': { factor: 1.15, cureTime: 1.5 },
            'normal': { factor: 1.0, cureTime: 1.0 },
            'warm': { factor: 0.95, cureTime: 0.8 },
            'hot': { factor: 0.9, cureTime: 0.6 }
        },
        humidity: {
            'low': { factor: 1.05 },
            'normal': { factor: 1.0 },
            'high': { factor: 1.1 },
            'very-high': { factor: 1.2 }
        }
    },
    
    // Traffic level factors
    trafficFactors: {
        'light': { thickness: 1.0, durability: 1.0 },
        'medium': { thickness: 1.1, durability: 1.15 },
        'heavy': { thickness: 1.25, durability: 1.3 },
        'industrial': { thickness: 1.5, durability: 1.5 }
    },
    
    // Material pricing and IDs (matching your products)
    materials: {
        resin: { 
            id: 1, 
            name: 'Premium Epoxy Resin Kit', 
            price: 89.99, 
            coverage: 12, // sq ft per kit at 1/8"
            image: '💎'
        },
        primer: { 
            id: 11, 
            name: 'Epoxy Primer', 
            price: 34.99, 
            coverage: 200, // sq ft per gallon
            image: '🏠'
        },
        sealer: {
            id: 12,
            name: 'Topcoat Sealer',
            price: 45.99,
            coverage: 150, // sq ft per gallon
            image: '🛡️'
        },
        prep: {
            id: 13,
            name: 'Surface Prep Kit',
            price: 28.99,
            image: '🔧'
        },
        pigments: { 
            id: 4, 
            name: 'Resin Pigments Pack', 
            price: 19.99, 
            image: '🎨'
        },
        tools: [
            { id: 6, name: 'Resin Applicator Brushes', price: 12.99, image: '🖌️' },
            { id: 5, name: 'Silicone Mixing Cups', price: 15.99, image: '🥤' },
            { id: 8, name: 'Resin Safety Kit', price: 24.99, image: '🛡️' }
        ]
    }
};

// Initialize Material Calculator
function initMaterialCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsDiv = document.getElementById('calculator-results');
    const addAllBtn = document.getElementById('add-all-to-cart');
    const getQuoteBtn = document.getElementById('get-quote-btn');
    
    if (!calculateBtn) return;
    
    let currentCalculation = null;
    
    calculateBtn.addEventListener('click', function() {
        const calculation = calculateMaterials();
        if (calculation) {
            currentCalculation = calculation;
            displayResults(calculation);
            resultsDiv.style.display = 'block';
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    
    if (addAllBtn) {
        addAllBtn.addEventListener('click', function() {
            if (currentCalculation && currentCalculation.materials) {
                let itemsAdded = 0;
                currentCalculation.materials.forEach(material => {
                    if (material.quantity > 0) {
                        for (let i = 0; i < material.quantity; i++) {
                            addToCart(material);
                            itemsAdded++;
                        }
                    }
                });
                showNotification(`${itemsAdded} items added to cart!`);
            }
        });
    }
    
    if (getQuoteBtn) {
        getQuoteBtn.addEventListener('click', function() {
            // Scroll to contact info or show modal
            document.querySelector('.contact-info-simple').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            showNotification('Call us for a professional quote!');
        });
    }
}

// Calculate materials needed
function calculateMaterials() {
    // Get all form values
    const projectType = document.getElementById('project-type').value;
    const finishType = document.getElementById('finish-type').value;
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const thickness = parseFloat(document.getElementById('thickness').value);
    const substrateType = document.getElementById('substrate-type').value;
    const surfaceCondition = document.getElementById('surface-condition').value;
    const temperature = document.getElementById('temperature').value;
    const humidity = document.getElementById('humidity').value;
    const trafficLevel = document.getElementById('traffic-level').value;
    const includeTools = document.getElementById('include-tools').checked;
    const includeSealer = document.getElementById('include-sealer').checked;
    const rushDelivery = document.getElementById('rush-delivery').checked;
    
    // Validation
    if (!projectType || !finishType || !length || !width) {
        alert('Please fill in all required fields (Project Type, Finish Type, Length, Width)');
        return null;
    }
    
    // Calculate base area and volume
    const baseArea = length * width;
    
    // Apply environmental and substrate factors
    const substrateData = materialCalculator.substrateFactors[substrateType];
    const tempData = materialCalculator.environmentalFactors.temperature[temperature];
    const humidityData = materialCalculator.environmentalFactors.humidity[humidity];
    const trafficData = materialCalculator.trafficFactors[trafficLevel];
    const coverageData = materialCalculator.coverageRates[projectType];
    
    // Calculate adjusted thickness based on traffic level
    const adjustedThickness = thickness * trafficData.thickness;
    
    // Calculate adjusted area accounting for substrate absorption
    const adjustedArea = baseArea * substrateData.absorption;
    
    // Calculate volume with all factors
    const volumeCubicFeet = adjustedArea * (adjustedThickness / 12);
    const baseVolume = volumeCubicFeet * 7.48; // Convert to gallons
    const adjustedVolume = baseVolume * coverageData.wasteFactor * tempData.factor * humidityData.factor;
    
    // Calculate resin needed
    const baseResinCoverage = materialCalculator.materials.resin.coverage * (adjustedThickness / 0.125);
    const resinCoverage = baseResinCoverage / substrateData.absorption;
    const resinKitsNeeded = Math.ceil(adjustedArea / resinCoverage);
    
    // Calculate primer needed based on surface condition and substrate
    let primerNeeded = 0;
    const primerFactor = substrateData.prepFactor;
    
    switch(surfaceCondition) {
        case 'new':
            primerNeeded = substrateType === 'concrete' ? 0 : Math.ceil(baseArea / materialCalculator.materials.primer.coverage * 0.3 * primerFactor);
            break;
        case 'good':
            primerNeeded = Math.ceil(baseArea / materialCalculator.materials.primer.coverage * 0.4 * primerFactor);
            break;
        case 'fair':
            primerNeeded = Math.ceil(baseArea / materialCalculator.materials.primer.coverage * 0.7 * primerFactor);
            break;
        case 'poor':
            primerNeeded = Math.ceil(baseArea / materialCalculator.materials.primer.coverage * 1.0 * primerFactor);
            break;
        case 'damaged':
            primerNeeded = Math.ceil(baseArea / materialCalculator.materials.primer.coverage * 1.3 * primerFactor);
            break;
    }
    
    // Build materials list
    const materials = [];
    let totalCost = 0;
    
    // Add surface prep kit for poor conditions
    if (['poor', 'damaged'].includes(surfaceCondition)) {
        const prepMaterial = {
            ...materialCalculator.materials.prep,
            quantity: 1,
            totalPrice: materialCalculator.materials.prep.price
        };
        materials.push(prepMaterial);
        totalCost += prepMaterial.totalPrice;
    }
    
    // Add primer if needed
    if (primerNeeded > 0) {
        const primerMaterial = {
            ...materialCalculator.materials.primer,
            quantity: primerNeeded,
            totalPrice: primerNeeded * materialCalculator.materials.primer.price
        };
        materials.push(primerMaterial);
        totalCost += primerMaterial.totalPrice;
    }
    
    // Add resin
    if (resinKitsNeeded > 0) {
        const resinMaterial = {
            ...materialCalculator.materials.resin,
            quantity: resinKitsNeeded,
            totalPrice: resinKitsNeeded * materialCalculator.materials.resin.price
        };
        materials.push(resinMaterial);
        totalCost += resinMaterial.totalPrice;
    }
    
    // Add pigments for colored finishes
    if (['metallic', 'flake', 'solid', 'quartz', 'terrazzo'].includes(finishType)) {
        const pigmentQty = ['quartz', 'terrazzo'].includes(finishType) ? 2 : 1;
        const pigmentMaterial = {
            ...materialCalculator.materials.pigments,
            quantity: pigmentQty,
            totalPrice: pigmentQty * materialCalculator.materials.pigments.price
        };
        materials.push(pigmentMaterial);
        totalCost += pigmentMaterial.totalPrice;
    }
    
    // Add sealer if requested or for high traffic
    if (includeSealer || ['heavy', 'industrial'].includes(trafficLevel)) {
        const sealerNeeded = Math.ceil(baseArea / materialCalculator.materials.sealer.coverage);
        const sealerMaterial = {
            ...materialCalculator.materials.sealer,
            quantity: sealerNeeded,
            totalPrice: sealerNeeded * materialCalculator.materials.sealer.price
        };
        materials.push(sealerMaterial);
        totalCost += sealerMaterial.totalPrice;
    }
    
    // Add tools if requested
    if (includeTools) {
        materialCalculator.materials.tools.forEach(tool => {
            const toolMaterial = {
                ...tool,
                quantity: 1,
                totalPrice: tool.price
            };
            materials.push(toolMaterial);
            totalCost += toolMaterial.totalPrice;
        });
    }
    
    // Apply rush delivery surcharge
    if (rushDelivery) {
        totalCost *= 1.15;
    }
    
    return {
        area: baseArea,
        adjustedArea: adjustedArea,
        volume: adjustedVolume,
        materials: materials,
        totalCost: totalCost,
        cureTime: tempData.cureTime,
        projectDetails: {
            type: projectType,
            finish: finishType,
            dimensions: `${length}' x ${width}' x ${adjustedThickness.toFixed(2)}"`,
            substrate: substrateType,
            traffic: trafficLevel,
            environmental: `${temperature} temp, ${humidity} humidity`
        }
    };
}

// Display calculation results
function displayResults(calculation) {
    // Update summary
    document.getElementById('total-area').textContent = `${calculation.area.toFixed(1)} sq ft`;
    document.getElementById('total-volume').textContent = `${calculation.volume.toFixed(2)} gallons`;
    document.getElementById('total-cost').textContent = `$${calculation.totalCost.toFixed(2)}`;
    
    // Add project details summary
    const resultsDiv = document.getElementById('calculator-results');
    const existingDetails = resultsDiv.querySelector('.project-details-summary');
    if (existingDetails) {
        existingDetails.remove();
    }
    
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'project-details-summary';
    detailsDiv.innerHTML = `
        <h4><i class="fas fa-info-circle"></i> Project Details</h4>
        <div class="details-grid">
            <div class="detail-item">
                <span class="detail-label">Type:</span>
                <span class="detail-value">${calculation.projectDetails.type}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Substrate:</span>
                <span class="detail-value">${calculation.projectDetails.substrate}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Traffic Level:</span>
                <span class="detail-value">${calculation.projectDetails.traffic}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Dimensions:</span>
                <span class="detail-value">${calculation.projectDetails.dimensions}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Environment:</span>
                <span class="detail-value">${calculation.projectDetails.environmental}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Est. Cure Time:</span>
                <span class="detail-value">${(calculation.cureTime * 24).toFixed(0)} hours</span>
            </div>
        </div>
    `;
    
    const resultsSummary = resultsDiv.querySelector('.results-summary');
    resultsSummary.parentNode.insertBefore(detailsDiv, resultsSummary.nextSibling);
    
    // Build materials list HTML
    const materialsListDiv = document.getElementById('materials-list');
    materialsListDiv.innerHTML = '';
    
    calculation.materials.forEach(material => {
        const materialDiv = document.createElement('div');
        materialDiv.className = 'material-item';
        materialDiv.innerHTML = `
            <div class="material-info">
                <div class="material-image">${material.image}</div>
                <div class="material-details">
                    <div class="material-name">${material.name}</div>
                    <div class="material-quantity">Quantity: ${material.quantity}</div>
                    <div class="material-price">$${material.price ? material.price.toFixed(2) : '0.00'} each</div>
                </div>
            </div>
            <div class="material-total">
                <div class="material-total-price">$${material.totalPrice.toFixed(2)}</div>
                <button class="btn btn-sm btn-primary add-material-btn" 
                        onclick="addToCart(${JSON.stringify(material).replace(/"/g, '&quot;')})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        materialsListDiv.appendChild(materialDiv);
    });
}

// --- STRIPE INTEGRATION FOR CHECKOUT PAGE ---
function initStripeCheckout() {
  if (!document.body.classList.contains('checkout-page')) return;
  let stripe, elements, card;
  const stripePublicKey = 'pk_test_51Rnq8BGdHBAUE4It8eH3w8vbIEHua8hBqanxFN0gUCJyGza3v4nUVdzGtNM7zTrrqz2qj0Qjg11fgmVtd7cjSvpg008cMprIn6';
  const createPaymentIntentUrl = 'http://localhost:4242/create-payment-intent';

  // Render checkout cart summary
  (function renderCheckoutCart() {
    const itemsDiv = document.getElementById('checkout-cart-items');
    const totalSpan = document.getElementById('checkout-cart-total');
    if (!itemsDiv || !totalSpan) return;
    let checkoutCart = [];
    try {
      checkoutCart = Array.isArray(cart) && cart.length ? cart : JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (_) { checkoutCart = []; }
    itemsDiv.innerHTML = '';
    if (!checkoutCart || checkoutCart.length === 0) {
      itemsDiv.innerHTML = '<p style="color:#64748b;">Your cart is empty.</p>';
      totalSpan.textContent = '0.00';
      return;
    }
    let total = 0;
    checkoutCart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      const div = document.createElement('div');
      div.className = 'checkout-cart-item';
      div.innerHTML = `
        <div class="checkout-item-info">
          <span class="checkout-item-name">${item.name}</span>
          <span class="checkout-item-qty">x${item.quantity}</span>
        </div>
        <div class="checkout-item-price">$${itemTotal.toFixed(2)}</div>
      `;
      itemsDiv.appendChild(div);
    });
    totalSpan.textContent = total.toFixed(2);
  })();

  // Only show card input if "Credit Card" is selected
  const paymentSelect = document.getElementById('checkout-payment');
  const cardElementGroup = document.getElementById('card-element-group');
  if (paymentSelect && cardElementGroup) {
    function toggleCardInput() {
      if (paymentSelect.value === 'card') {
        cardElementGroup.style.display = '';
      } else {
        cardElementGroup.style.display = 'none';
      }
    }
    paymentSelect.addEventListener('change', toggleCardInput);
    toggleCardInput();
  }

  // Initialize Stripe Elements
  function mountStripeIfReady() {
    if (!window.Stripe || !paymentSelect || paymentSelect.value !== 'card') return;
    if (card) return;
    stripe = Stripe(stripePublicKey);
    elements = stripe.elements();
    card = elements.create('card', {
      style: {
        base: {
          color: '#e0e0e0',
          fontFamily: 'Inter, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': { color: '#b0b3b8' }
        },
        invalid: { color: '#ef4444' }
      }
    });
    card.mount('#card-element');
  }
  mountStripeIfReady();

  // Handle form submission
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async function(e) {
      if (paymentSelect && paymentSelect.value === 'card') {
        e.preventDefault();
        document.getElementById('checkout-success').style.display = 'none';
        document.getElementById('card-errors').textContent = '';
        if (!stripe || !card) {
          // Try mounting again if Stripe loaded after
          mountStripeIfReady();
          if (!stripe || !card) {
            document.getElementById('card-errors').textContent = 'Payment system not loaded.';
            return;
          }
        }
        // 1. Create payment intent on backend (stubbed for now)
        let clientSecret;
        try {
          // TODO: Replace with real backend call
          const res = await fetch(createPaymentIntentUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: parseInt(document.getElementById('checkout-cart-total').textContent.replace(/[^\d]/g, '')) || 1000,
              currency: 'usd',
              // You can add more order/customer info here
            })
          });
          const data = await res.json();
          clientSecret = data.clientSecret;
        } catch (err) {
          document.getElementById('card-errors').textContent = 'Could not start payment. Try again.';
          return;
        }
        // 2. Confirm card payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: document.getElementById('checkout-name').value,
              email: document.getElementById('checkout-email').value,
              address: { line1: document.getElementById('checkout-address').value }
            }
          }
        });
        if (error) {
          document.getElementById('card-errors').textContent = error.message;
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          document.getElementById('checkout-success').style.display = 'block';
          localStorage.removeItem('cart');
          window.cart = [];
          setTimeout(() => { window.location.href = 'store.html'; }, 2000);
        }
      }
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart functionality globally
  initCartGlobally();
  
  // Initialize material calculator
  initMaterialCalculator();
  
  // Initialize Stripe checkout
  initStripeCheckout();
  
  // Initialize store page products
  if (productsGrid) {
    displayProducts();
  }
  
  // Initialize quote wizard
  initQuoteWizard();
});

window.addEventListener('load', () => {
  initStripeCheckout();
});

// Global cart initialization
function initCartGlobally() {
  // Update cart display and count on page load
  updateCartDisplay();
  updateCartCount();
  
  // Cart modal functionality
  if (cartIcon && cartModal) {
    cartIcon.addEventListener('click', () => {
      cartModal.classList.add('open');
    });
  }

  if (closeCart && cartModal) {
    closeCart.addEventListener('click', () => {
      cartModal.classList.remove('open');
    });
  }

  // Close cart when clicking outside
  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) {
        cartModal.classList.remove('open');
      }
    });
  }

  // Checkout button functionality
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      window.location.href = 'checkout.html';
    });
  }
}

// Lightbox functionality for showcase images
let currentImageIndex = 0;
let showcaseImages = [];

function openLightbox(img) {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    if (modal && modalImg) {
        // Get all showcase images and find the current index
        showcaseImages = Array.from(document.querySelectorAll('.showcase-img'));
        currentImageIndex = showcaseImages.indexOf(img);
        
        modalImg.src = img.src;
        modalImg.alt = img.alt || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
}

function navigateLightbox(direction) {
    if (showcaseImages.length === 0) return;
    
    currentImageIndex += direction;
    
    // Handle wrapping around
    if (currentImageIndex < 0) {
        currentImageIndex = showcaseImages.length - 1;
    } else if (currentImageIndex >= showcaseImages.length) {
        currentImageIndex = 0;
    }
    
    const modalImg = document.getElementById('lightbox-img');
    if (modalImg) {
        const newImg = showcaseImages[currentImageIndex];
        modalImg.src = newImg.src;
        modalImg.alt = newImg.alt || '';
    }
}

function closeLightbox(event) {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    if (!modal) return;
    // Only close if clicking the overlay or close button, not the image itself
    if (
        event.target === modal ||
        event.target.classList.contains('lightbox-close')
    ) {
        modal.classList.remove('active');
        if (modalImg) modalImg.src = '';
        document.body.style.overflow = '';
        // Reset current image index
        currentImageIndex = 0;
    }
}

// Close lightbox on ESC key
window.addEventListener('keydown', function(e) {
    const modal = document.getElementById('lightbox-modal');
    if (modal && modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox({ target: modal });
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    }
}); 