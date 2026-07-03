/**
 * Jieneng Industrial Website — Main JavaScript
 * Company: Guangdong Jieneng Electrical Technology Co., Ltd.
 * Website: https://www.stjieneng.com
 *
 * Handles all shared interactive functionality across the website.
 * Works with PRODUCT_DATA from js/products.js (loaded on pages that need it).
 * Each module checks for element existence before binding — safe to load on any page.
 */

(function () {
  'use strict';

  /* ================================================================
     UTILITIES
     ================================================================ */

  /** Escape HTML special characters to prevent XSS in dynamic content */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /** Safe querySelector — returns null silently */
  function $(selector) {
    return document.querySelector(selector);
  }

  /** Safe querySelectorAll — returns empty NodeList silently */
  function $$(selector) {
    return document.querySelectorAll(selector);
  }

  /** Check whether PRODUCT_DATA is available on this page */
  function hasProductData() {
    return typeof PRODUCT_DATA !== 'undefined' && PRODUCT_DATA !== null;
  }

  /** Read a URL query parameter by name */
  function getQueryParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch (e) {
      // Fallback for older browsers
      var match = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
      return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : null;
    }
  }

  /** Get a category object by its ID from PRODUCT_DATA */
  function getCategoryById(catId) {
    if (!hasProductData() || !PRODUCT_DATA.categories) return null;
    for (var i = 0; i < PRODUCT_DATA.categories.length; i++) {
      if (PRODUCT_DATA.categories[i].id === catId) return PRODUCT_DATA.categories[i];
    }
    return null;
  }

  /** Throttle a function call to at most once per delay ms */
  function throttle(fn, delay) {
    var lastCall = 0;
    return function () {
      var now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        fn.apply(this, arguments);
      }
    };
  }


  /* ================================================================
     1. HEADER SCROLL EFFECT
     Add / remove `.scrolled` class on header when page scrolls > 10px
     ================================================================ */

  function initHeaderScroll() {
    var header = $('#header');
    if (!header) return;

    // Set initial state
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    }

    window.addEventListener('scroll', throttle(function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, 16), { passive: true });
  }


  /* ================================================================
     2. MOBILE NAVIGATION
     Toggle mobile menu when `.nav-toggle` is clicked
     ================================================================ */

  function initMobileNav() {
    var toggle = $('#navToggle');
    var nav = $('#nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      nav.classList.toggle('open');
    });

    // Close mobile menu when a nav link is clicked
    var navLinks = nav.querySelectorAll('a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }

    // Close mobile menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }


  /* ================================================================
     3. FAQ ACCORDION
     On `.faq-question` click, toggle `.active` on parent `.faq-item`
     Close other items when opening a new one; animate max-height
     ================================================================ */

  function initFaqAccordion() {
    var faqItems = $$('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      // Ensure answer starts collapsed
      answer.style.maxHeight = '0';
      answer.style.overflow = 'hidden';
      answer.style.transition = 'max-height 0.35s ease';

      question.addEventListener('click', function () {
        var isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(function (otherItem) {
          var otherAnswer = otherItem.querySelector('.faq-answer');
          var otherQuestion = otherItem.querySelector('.faq-question');
          otherItem.classList.remove('active');
          if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
        });

        // Open clicked item (if it wasn't already active)
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }


  /* ================================================================
     4. PRODUCT DETAIL PAGE
     Reads `id` from URL, loads product from PRODUCT_DATA,
     populates all sections, handles 404, updates SEO
     ================================================================ */

  /** Spec field display labels */
  var SPEC_LABELS = {
    power: 'Power',
    voltage: 'Voltage',
    steamPressure: 'Steam Pressure',
    steamTemp: 'Steam Temperature',
    steamFlow: 'Steam Flow',
    heatUpTime: 'Heat-Up Time',
    tankCapacity: 'Water Tank Capacity',
    hoseLength: 'Hose Length',
    gunCount: 'Gun Count',
    controlSystem: 'Control System',
    shellMaterial: 'Shell Material',
    innerMaterial: 'Inner Tank Material',
    dimensions: 'Dimensions (L\u00D7W\u00D7H)',
    weight: 'Net Weight',
    packageDimensions: 'Package Dimensions',
    packageWeight: 'Package Weight',
    continuousOperation: 'Continuous Operation',
    safetyProtections: 'Safety Protections',
    warranty: 'Warranty',
    certifications: 'Certifications',
    leadTime: 'Lead Time',
    origin: 'Origin',
    pumpBrand: 'Pump Brand'
  };

  /** Key spec highlights shown in the hero area */
  var KEY_SPEC_FIELDS = [
    { key: 'power', label: 'Power' },
    { key: 'steamPressure', label: 'Pressure' },
    { key: 'steamTemp', label: 'Temperature' },
    { key: 'steamFlow', label: 'Steam Flow' }
  ];

  /** Category short names for badges */
  var CATEGORY_SHORT_NAMES = {
    'explosion-proof': 'Explosion-Proof',
    'industrial-steam': 'Industrial Steam',
    'precision-parts': 'Precision Parts',
    'steam-car-wash': 'Steam Car Wash',
    'crawler-pv': 'Crawler PV',
    'automated-cleaning': 'Automated'
  };

  /** Feature icons cycled by index */
  var FEATURE_ICONS = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/></svg>'
  ];

  function showProduct404() {
    var content = $('#page-content');
    if (!content) return;
    content.innerHTML =
      '<div class="product-not-found">' +
        '<div class="container">' +
          '<h1>Product Not Found</h1>' +
          '<p>The product you are looking for does not exist or has been removed.</p>' +
          '<a href="products.html" class="btn btn-primary btn-lg">Browse All Products</a>' +
        '</div>' +
      '</div>';
    document.title = 'Product Not Found \u2014 Jieneng Steam Cleaning Equipment';
  }

  function updateProductSEO(product, category) {
    var title = product.model + ' ' + product.name + ' | Jieneng Steam Cleaning Equipment';
    var desc = product.tagline + ' By Guangdong Jieneng Electrical Technology Co., Ltd. ' +
      (category ? category.name + '. ' : '') + (product.certifications || '');
    var productId = getQueryParam('id') || '';
    var url = 'https://www.stjieneng.com/products/product.html?id=' + productId;

    document.title = title;

    var metaDesc = $('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);

    var ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    var ogDesc = $('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);

    var ogUrl = $('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);

    var twTitle = $('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);

    var twDesc = $('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', desc);

    var canonical = $('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);

    if (product.images && product.images.hero) {
      var heroUrl = 'https://www.stjieneng.com/' + product.images.hero;
      var ogImage = $('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', heroUrl);
    }

    // Update Schema.org Product
    var productSchemaEl = $('#product-schema');
    if (productSchemaEl) {
      try {
        var schema = JSON.parse(productSchemaEl.textContent);
        schema.name = product.model + ' ' + product.name;
        schema.description = desc;
        schema.image = (product.images && product.images.hero)
          ? 'https://www.stjieneng.com/' + product.images.hero : '';
        if (product.certifications) {
          schema.additionalProperty = {
            '@type': 'PropertyValue',
            'name': 'Certifications',
            'value': product.certifications
          };
        }
        productSchemaEl.textContent = JSON.stringify(schema);
      } catch (e) { /* silent */ }
    }

    // Update Schema.org BreadcrumbList
    var breadcrumbSchemaEl = $('#breadcrumb-schema');
    if (breadcrumbSchemaEl) {
      try {
        var bSchema = JSON.parse(breadcrumbSchemaEl.textContent);
        if (bSchema.itemListElement && bSchema.itemListElement[2]) {
          bSchema.itemListElement[2].name = product.model;
          bSchema.itemListElement[2].item = url;
        }
        breadcrumbSchemaEl.textContent = JSON.stringify(bSchema);
      } catch (e) { /* silent */ }
    }
  }

  function renderBreadcrumb(product, category) {
    var el = $('#breadcrumb-product');
    if (!el) return;
    el.textContent = product.model;

    // If there's a category, insert category link between Products and model
    var breadcrumbList = $('.breadcrumb-list');
    if (breadcrumbList && category) {
      var items = breadcrumbList.querySelectorAll('li');
      // Replace the last item (model) with: Category / Model
      if (items.length >= 2) {
        var catLi = document.createElement('li');
        catLi.innerHTML =
          '<a href="../products.html#cat-' + category.id + '">' + escapeHtml(category.name) + '</a>' +
          '<span class="breadcrumb-separator">/</span>';
        breadcrumbList.insertBefore(catLi, items[items.length - 1]);
      }
    }
  }

  function renderProductHero(product, category) {
    // Category tag
    var tag = $('#product-category-tag');
    if (tag) tag.textContent = category ? category.name : product.category;

    // Title
    var titleEl = $('#product-title');
    if (titleEl) titleEl.textContent = product.model + ' \u2014 ' + product.name;

    // Tagline
    var taglineEl = $('#product-tagline');
    if (taglineEl) taglineEl.textContent = product.tagline;

    // Main gallery image
    var mainImg = $('#gallery-main-img');
    if (mainImg) {
      if (product.images && product.images.hero) {
        mainImg.src = '../' + product.images.hero;
        mainImg.alt = product.model + ' ' + product.name;
      } else {
        mainImg.src = '../images/company/logo.jpg';
        mainImg.alt = product.model;
      }
    }

    // Gallery thumbnails
    var thumbsContainer = $('#gallery-thumbs');
    if (thumbsContainer) {
      thumbsContainer.innerHTML = '';
      var allImages = [];
      if (product.images) {
        if (product.images.hero) allImages.push(product.images.hero);
        if (product.images.gallery && product.images.gallery.length) {
          product.images.gallery.forEach(function (img) {
            if (img !== product.images.hero) allImages.push(img);
          });
        }
      }
      allImages.forEach(function (img, idx) {
        var thumb = document.createElement('div');
        thumb.className = 'product-gallery-thumb' + (idx === 0 ? ' active' : '');
        thumb.innerHTML = '<img src="../' + img + '" alt="' + escapeHtml(product.model) +
          ' view ' + (idx + 1) + '" loading="lazy">';
        thumb.addEventListener('click', function () {
          if (mainImg) mainImg.src = '../' + img;
          var allThumbs = thumbsContainer.querySelectorAll('.product-gallery-thumb');
          for (var t = 0; t < allThumbs.length; t++) allThumbs[t].classList.remove('active');
          thumb.classList.add('active');
        });
        thumbsContainer.appendChild(thumb);
      });
    }

    // Key specs highlights
    var keySpecsEl = $('#key-specs');
    if (keySpecsEl) {
      keySpecsEl.innerHTML = '';
      KEY_SPEC_FIELDS.forEach(function (field) {
        if (product[field.key] && product[field.key] !== '\u2014') {
          var specDiv = document.createElement('div');
          specDiv.className = 'key-spec';
          specDiv.innerHTML =
            '<span class="key-spec-value">' + escapeHtml(product[field.key]) + '</span>' +
            '<span class="key-spec-label">' + field.label + '</span>';
          keySpecsEl.appendChild(specDiv);
        }
      });
    }

    // CTA links
    var ctaQuote = $('#cta-quote');
    if (ctaQuote) {
      ctaQuote.href = 'mailto:stjieneng@gmail.com?subject=Quote%20Request%3A%20' +
        encodeURIComponent(product.model);
    }
    var ctaSpec = $('#cta-spec');
    if (ctaSpec) {
      ctaSpec.href = 'mailto:stjieneng@gmail.com?subject=Spec%20Sheet%20Request%3A%20' +
        encodeURIComponent(product.model);
    }
  }

  function renderSpecTable(product) {
    var wrapper = $('#spec-table-wrapper');
    var section = $('#spec-section');
    if (!wrapper) return;

    var rows = '';
    Object.keys(SPEC_LABELS).forEach(function (key) {
      if (product[key] && product[key] !== '\u2014') {
        rows +=
          '<tr>' +
            '<td>' + SPEC_LABELS[key] + '</td>' +
            '<td>' + escapeHtml(product[key]) + '</td>' +
          '</tr>';
      }
    });

    if (!rows) {
      if (section) section.style.display = 'none';
      return;
    }

    wrapper.innerHTML = '<table class="spec-table">' + rows + '</table>';
  }

  function renderFeatures(product) {
    var grid = $('#features-grid');
    var section = $('#features-section');
    var subtitle = $('#features-subtitle');
    if (!grid) return;

    if (!product.features || !product.features.length) {
      if (section) section.style.display = 'none';
      return;
    }

    if (subtitle) subtitle.textContent = 'What makes the ' + product.model + ' stand out';

    grid.innerHTML = '';
    product.features.forEach(function (feature, idx) {
      var icon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
      var item = document.createElement('div');
      item.className = 'feature-item';
      item.innerHTML =
        '<div class="feature-item-icon">' + icon + '</div>' +
        '<div class="feature-item-text">' + escapeHtml(feature) + '</div>';
      grid.appendChild(item);
    });
  }

  function renderApplications(product) {
    var grid = $('#applications-grid');
    var section = $('#applications-section');
    if (!grid) return;

    if (!product.applications || !product.applications.length) {
      if (section) section.style.display = 'none';
      return;
    }

    grid.innerHTML = '';
    product.applications.forEach(function (app) {
      var tag = document.createElement('span');
      tag.className = 'application-tag';
      tag.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>' +
        escapeHtml(app);
      grid.appendChild(tag);
    });
  }

  function renderProductFAQ(product) {
    var list = $('#faq-list');
    var section = $('#faq-section');
    if (!list) return;

    if (!product.faq || !product.faq.length) {
      if (section) section.style.display = 'none';
      return;
    }

    list.innerHTML = '';
    product.faq.forEach(function (item) {
      var faqItem = document.createElement('div');
      faqItem.className = 'faq-item';
      faqItem.innerHTML =
        '<button class="faq-question" aria-expanded="false">' + escapeHtml(item.q) + '</button>' +
        '<div class="faq-answer"><div class="faq-answer-inner">' + escapeHtml(item.a) + '</div></div>';
      list.appendChild(faqItem);
    });

    // Init accordion for these dynamically created FAQ items
    initFaqAccordion();
  }

  function renderRelatedProducts(product, category) {
    var grid = $('#related-grid');
    var section = $('#related-section');
    if (!grid) return;

    if (!category || !category.models || category.models.length <= 1) {
      if (section) section.style.display = 'none';
      return;
    }

    var currentId = getQueryParam('id');
    var hasRelated = false;

    grid.innerHTML = '';
    category.models.forEach(function (modelId) {
      if (modelId === currentId) return;
      var relProduct = PRODUCT_DATA.products[modelId];
      if (!relProduct) return;
      hasRelated = true;

      var card = document.createElement('a');
      card.className = 'related-card';
      card.href = 'product.html?id=' + modelId;
      card.innerHTML =
        '<div class="related-card-model">' + escapeHtml(relProduct.model) + '</div>' +
        '<div class="related-card-name">' + escapeHtml(relProduct.name) + '</div>' +
        '<div class="related-card-tagline">' + escapeHtml(relProduct.tagline) + '</div>';
      grid.appendChild(card);
    });

    if (!hasRelated && section) {
      section.style.display = 'none';
    }
  }

  function initProductDetail() {
    // Only run on the product detail page (has #product-hero or #page-content)
    var heroSection = $('#product-hero');
    var pageContent = $('#page-content');
    if (!heroSection && !pageContent) return;
    if (!hasProductData()) return;

    var productId = getQueryParam('id');

    if (!productId || !PRODUCT_DATA.products || !PRODUCT_DATA.products[productId]) {
      showProduct404();
      return;
    }

    var product = PRODUCT_DATA.products[productId];
    var category = getCategoryById(product.category);

    updateProductSEO(product, category);
    renderBreadcrumb(product, category);
    renderProductHero(product, category);
    renderSpecTable(product);
    renderFeatures(product);
    renderApplications(product);
    renderProductFAQ(product);
    renderRelatedProducts(product, category);
  }


  /* ================================================================
     5. PRODUCTS LISTING PAGE
     Generate product cards from PRODUCT_DATA, category filter,
     smooth animation on filter
     ================================================================ */

  /** Spec fields to show on listing cards */
  var CARD_SPEC_FIELDS = [
    { key: 'power', label: 'Power' },
    { key: 'steamPressure', label: 'Pressure' },
    { key: 'steamTemp', label: 'Temp' }
  ];

  /** Category badge colors */
  var CATEGORY_COLORS = {
    'explosion-proof': '#E65100',
    'industrial-steam': '#0B3D91',
    'precision-parts': '#00695C',
    'steam-car-wash': '#1565C0',
    'crawler-pv': '#F57F17',
    'automated-cleaning': '#4E342E'
  };

  function buildFilterTabs(categories) {
    var tabsContainer = $('#filterTabs');
    if (!tabsContainer) return;

    var totalCount = 0;
    categories.forEach(function (cat) {
      if (cat.models) totalCount += cat.models.length;
    });

    // "All" tab
    var allTab = document.createElement('button');
    allTab.className = 'filter-tab active';
    allTab.setAttribute('role', 'tab');
    allTab.setAttribute('aria-selected', 'true');
    allTab.setAttribute('data-category', 'all');
    allTab.innerHTML = 'All <span class="tab-count">' + totalCount + '</span>';
    allTab.addEventListener('click', function () { filterProducts('all'); });
    tabsContainer.appendChild(allTab);

    // Category tabs
    categories.forEach(function (cat) {
      var tab = document.createElement('button');
      tab.className = 'filter-tab';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('data-category', cat.id);
      tab.innerHTML = (CATEGORY_SHORT_NAMES[cat.id] || cat.name) +
        ' <span class="tab-count">' + (cat.models ? cat.models.length : 0) + '</span>';
      tab.addEventListener('click', function () { filterProducts(cat.id); });
      tabsContainer.appendChild(tab);
    });
  }

  function buildProductCards(categories, products) {
    var container = $('#products-container');
    if (!container) return;
    container.innerHTML = '';

    categories.forEach(function (cat) {
      if (!cat.models || cat.models.length === 0) return;

      // Category section
      var section = document.createElement('div');
      section.className = 'category-section';
      section.setAttribute('data-category', cat.id);

      // Category header
      var header = document.createElement('div');
      header.className = 'category-header';
      header.innerHTML =
        '<div class="category-header-icon">' + (cat.icon || '') + '</div>' +
        '<div class="category-header-text">' +
          '<h3>' + escapeHtml(cat.name) + '</h3>' +
          '<p>' + escapeHtml(cat.subtitle || '') + '</p>' +
        '</div>';
      section.appendChild(header);

      // Products grid
      var grid = document.createElement('div');
      grid.className = 'products-grid';

      cat.models.forEach(function (modelId) {
        var product = products[modelId];
        if (!product) return;

        var card = document.createElement('article');
        card.className = 'product-card';
        card.setAttribute('data-category', cat.id);
        card.setAttribute('data-model', modelId);

        // Card image
        var imageDiv = document.createElement('div');
        imageDiv.className = 'product-card-image';

        var heroImg = (product.images && product.images.hero) ? product.images.hero : '';
        if (heroImg) {
          imageDiv.innerHTML =
            '<span class="category-badge" style="background:' +
              (CATEGORY_COLORS[cat.id] || 'var(--color-primary)') + '">' +
              (CATEGORY_SHORT_NAMES[cat.id] || cat.name) +
            '</span>' +
            '<img src="' + heroImg + '" alt="' + escapeHtml(product.model) + ' ' +
              escapeHtml(product.name) + '" loading="lazy">';
        } else {
          var fallbackImg = cat.heroImage || '';
          imageDiv.innerHTML =
            '<span class="category-badge" style="background:' +
              (CATEGORY_COLORS[cat.id] || 'var(--color-primary)') + '">' +
              (CATEGORY_SHORT_NAMES[cat.id] || cat.name) +
            '</span>' +
            (fallbackImg
              ? '<img src="' + fallbackImg + '" alt="' + escapeHtml(product.model) +
                '" loading="lazy" style="opacity:0.6;">'
              : '<span class="placeholder" style="font-size:3rem;">' + (cat.icon || '') + '</span>');
        }
        card.appendChild(imageDiv);

        // Card body
        var body = document.createElement('div');
        body.className = 'product-card-body';

        // Model name
        var modelEl = document.createElement('div');
        modelEl.className = 'product-card-model';
        modelEl.textContent = product.model;
        body.appendChild(modelEl);

        // Title
        var title = document.createElement('h3');
        title.className = 'product-card-title';
        title.textContent = product.name;
        body.appendChild(title);

        // Tagline
        var desc = document.createElement('p');
        desc.className = 'product-card-desc';
        desc.textContent = product.tagline || '';
        body.appendChild(desc);

        // Key specs
        var specsDiv = document.createElement('div');
        specsDiv.className = 'product-card-specs';
        CARD_SPEC_FIELDS.forEach(function (field) {
          if (product[field.key] && product[field.key] !== '\u2014') {
            var spec = document.createElement('span');
            spec.className = 'product-card-spec';
            spec.innerHTML = '<strong>' + field.label + ':</strong> ' + escapeHtml(product[field.key]);
            specsDiv.appendChild(spec);
          }
        });
        // Control system as fallback spec
        if (!product.steamPressure && !product.steamTemp && product.controlSystem) {
          var ctrlSpec = document.createElement('span');
          ctrlSpec.className = 'product-card-spec';
          ctrlSpec.innerHTML = '<strong>Control:</strong> ' + escapeHtml(product.controlSystem);
          specsDiv.appendChild(ctrlSpec);
        }
        // Certifications badge
        if (product.certifications) {
          var certSpec = document.createElement('span');
          certSpec.className = 'product-card-spec';
          certSpec.style.background = 'rgba(230, 81, 0, 0.1)';
          certSpec.style.color = '#E65100';
          certSpec.textContent = product.certifications;
          specsDiv.appendChild(certSpec);
        }
        body.appendChild(specsDiv);

        // View details link
        var link = document.createElement('a');
        link.className = 'product-card-link';
        link.href = 'products/product.html?id=' + modelId;
        link.innerHTML = 'View Details <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        body.appendChild(link);

        card.appendChild(body);
        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  function filterProducts(categoryId) {
    var tabs = $$('.filter-tab');
    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute('data-category') === categoryId;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    var sections = $$('.category-section');
    var visibleCount = 0;

    sections.forEach(function (section) {
      var sectionCat = section.getAttribute('data-category');
      var show = (categoryId === 'all') || (sectionCat === categoryId);
      section.style.display = show ? '' : 'none';

      if (show) {
        var cards = section.querySelectorAll('.product-card');
        visibleCount += cards.length;
      }
    });

    // Update count text
    var countEl = $('#productCount');
    if (countEl) {
      var catLabel = categoryId === 'all'
        ? 'all categories'
        : (CATEGORY_SHORT_NAMES[categoryId] || categoryId);
      countEl.innerHTML = 'Showing <strong>' + visibleCount + '</strong> product' +
        (visibleCount !== 1 ? 's' : '') + ' in <strong>' + escapeHtml(catLabel) + '</strong>';
    }

    // No results message
    var noResults = $('#noResults');
    if (noResults) noResults.style.display = visibleCount === 0 ? '' : 'none';

    // Update URL hash for back-button support
    try {
      if (categoryId === 'all') {
        history.replaceState(null, '', 'products.html');
      } else {
        history.replaceState(null, '', 'products.html#cat-' + categoryId);
      }
    } catch (e) { /* history API not available */ }
  }

  function updateItemListSchema(categories, products) {
    var schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (!schemaScript) return;

    try {
      var schema = JSON.parse(schemaScript.textContent);
      var position = 1;
      schema.itemListElement = [];

      categories.forEach(function (cat) {
        if (!cat.models) return;
        cat.models.forEach(function (modelId) {
          var product = products[modelId];
          if (!product) return;
          schema.itemListElement.push({
            '@type': 'ListItem',
            'position': position++,
            'name': product.model + ' ' + product.name,
            'url': 'https://www.stjieneng.com/products/product.html?id=' + modelId
          });
        });
      });

      schema.numberOfItems = position - 1;
      schemaScript.textContent = JSON.stringify(schema);
    } catch (e) { /* silent */ }
  }

  function initProductsListing() {
    // Only run on the products listing page (has #products-container)
    var container = $('#products-container');
    if (!container) return;
    if (!hasProductData()) return;
    // Skip if inline script on products.html already populated the container
    if (container.children.length > 0) return;

    var categories = PRODUCT_DATA.categories;
    var products = PRODUCT_DATA.products;

    buildFilterTabs(categories);
    buildProductCards(categories, products);
    updateItemListSchema(categories, products);

    // Initial count
    var totalCount = 0;
    categories.forEach(function (cat) {
      if (cat.models) totalCount += cat.models.length;
    });
    var countEl = $('#productCount');
    if (countEl) {
      countEl.innerHTML = 'Showing <strong>' + totalCount +
        '</strong> products in <strong>all categories</strong>';
    }

    // Check URL hash for initial category
    var hash = window.location.hash.replace('#cat-', '');
    if (hash && CATEGORY_SHORT_NAMES[hash]) {
      filterProducts(hash);
    }
  }


  /* ================================================================
     6. CONTACT FORM
     Client-side validation, success/error messages, prevent default
     ================================================================ */

  function initContactForm() {
    var form = $('#inquiryForm');
    var formContainer = $('#contactFormContainer');
    var formSuccess = $('#formSuccess');
    if (!form) return;

    // Helper: show field error
    function showFieldError(input, message) {
      // Remove existing error
      var existingError = input.parentNode.querySelector('.form-error');
      if (existingError) existingError.remove();

      input.classList.add('error');
      var errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      errorEl.style.cssText = 'color:#D32F2F;font-size:0.8rem;margin-top:4px;display:block;';
      errorEl.textContent = message;
      input.parentNode.appendChild(errorEl);
    }

    // Helper: clear field error
    function clearFieldError(input) {
      input.classList.remove('error');
      var existingError = input.parentNode.querySelector('.form-error');
      if (existingError) existingError.remove();
    }

    // Real-time validation on blur
    var requiredFields = form.querySelectorAll('[required]');
    for (var i = 0; i < requiredFields.length; i++) {
      requiredFields[i].addEventListener('blur', function () {
        if (!this.value.trim()) {
          showFieldError(this, 'This field is required');
        } else {
          clearFieldError(this);
        }
      });
      requiredFields[i].addEventListener('input', function () {
        if (this.value.trim()) clearFieldError(this);
      });
    }

    // Email field specific validation
    var emailField = $('#email');
    if (emailField) {
      emailField.addEventListener('blur', function () {
        var val = this.value.trim();
        if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          showFieldError(this, 'Please enter a valid email address');
        }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');
      var hasError = false;

      // Validate required fields
      [name, email, message].forEach(function (field) {
        if (!field) return;
        if (!field.value.trim()) {
          showFieldError(field, 'This field is required');
          hasError = true;
        } else {
          clearFieldError(field);
        }
      });

      // Validate email format
      if (email && email.value.trim()) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
          showFieldError(email, 'Please enter a valid email address');
          hasError = true;
        }
      }

      if (hasError) return;

      // Build mailto as fallback (no actual backend)
      var subject = 'Inquiry from ' + name.value.trim() + ' - ' +
        (form.querySelector('#company').value.trim() || 'N/A');
      var body = 'Name: ' + name.value.trim() + '\n' +
        'Email: ' + email.value.trim() + '\n' +
        'Company: ' + (form.querySelector('#company').value.trim() || 'N/A') + '\n' +
        'Phone: ' + (form.querySelector('#phone').value.trim() || 'N/A') + '\n' +
        'Product Interest: ' + (form.querySelector('#product').value || 'N/A') + '\n\n' +
        'Message:\n' + message.value.trim();

      // Show success state
      form.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('active');

      // Open mailto link
      window.location.href = 'mailto:stjieneng@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }


  /* ================================================================
     7. WHATSAPP FLOAT BUTTON
     Ensure the link points to the correct WhatsApp URL
     ================================================================ */

  var WHATSAPP_URL = 'https://wa.me/8613302738777?text=Hello%2C%20I%20am%20interested%20in%20your%20industrial%20steam%20cleaning%20equipment.';

  function initWhatsAppFloat() {
    var whatsappBtn = $('.whatsapp-float');
    if (!whatsappBtn) return;
    whatsappBtn.href = WHATSAPP_URL;
  }


  /* ================================================================
     8. SMOOTH SCROLL
     For anchor links on the same page (#section-id)
     ================================================================ */

  function initSmoothScroll() {
    // Handle click on all anchor links
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      var target = $(targetId);
      if (!target) return;

      e.preventDefault();

      // Get header height for offset
      var header = $('#header');
      var headerHeight = header ? header.offsetHeight : 0;

      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update URL hash without jump
      try {
        history.pushState(null, '', targetId);
      } catch (err) { /* silent */ }
    });

    // Scroll to hash on page load (if any)
    if (window.location.hash) {
      var hashTarget = $(window.location.hash);
      if (hashTarget) {
        // Delay to allow page layout to settle
        setTimeout(function () {
          var header = $('#header');
          var headerHeight = header ? header.offsetHeight : 0;
          window.scrollTo({
            top: hashTarget.getBoundingClientRect().top + window.pageYOffset - headerHeight,
            behavior: 'smooth'
          });
        }, 300);
      }
    }
  }


  /* ================================================================
     9. ACTIVE NAV LINK
     Highlight current page's nav link based on URL path
     ================================================================ */

  function initActiveNavLink() {
    var navLinks = $$('.nav a, #nav a');
    if (!navLinks.length) return;

    var currentPath = window.location.pathname;
    var currentHref = window.location.href;

    // Normalize path: remove trailing slash and index.html
    currentPath = currentPath.replace(/\/$/, '').replace(/index\.html$/, '');

    navLinks.forEach(function (link) {
      link.classList.remove('active');

      var href = link.getAttribute('href');
      if (!href) return;

      // Skip hash-only links (e.g. #products) — they are section anchors, not page links
      if (href.charAt(0) === '#' && href.length > 1) return;

      // Resolve relative path
      var linkUrl;
      try {
        linkUrl = new URL(href, window.location.origin + window.location.pathname);
      } catch (e) {
        return;
      }

      var linkPath = linkUrl.pathname.replace(/\/$/, '').replace(/index\.html$/, '');

      // Match logic
      var isMatch = false;

      // Exact path match
      if (linkPath === currentPath) {
        isMatch = true;
      }

      // Root path: match "/" or empty
      if ((href === '/' || href === '../') && (currentPath === '' || currentPath === '/')) {
        isMatch = true;
      }

      // Products page
      if (href.indexOf('products.html') !== -1 && currentPath.indexOf('products') !== -1) {
        isMatch = true;
      }

      // Product detail subdirectory
      if (currentPath.indexOf('/products/') !== -1 && href.indexOf('#products') !== -1) {
        isMatch = true;
      }

      // About page
      if (href.indexOf('about.html') !== -1 && currentPath.indexOf('about') !== -1) {
        isMatch = true;
      }

      // Contact page
      if (href.indexOf('contact.html') !== -1 && currentPath.indexOf('contact') !== -1) {
        isMatch = true;
      }

      if (isMatch) {
        link.classList.add('active');
      }
    });
  }


  /* ================================================================
     FILTER BAR SHADOW ON SCROLL (products listing page)
     ================================================================ */

  function initFilterBarScroll() {
    var filterBar = $('#filterBar');
    if (!filterBar) return;

    window.addEventListener('scroll', throttle(function () {
      var headerHeight = 80;
      try {
        headerHeight = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height')) || 80;
      } catch (e) { /* use default */ }

      filterBar.classList.toggle('scrolled', window.scrollY > headerHeight + 200);
    }, 16), { passive: true });
  }


  /* ================================================================
     INITIALIZATION
     ================================================================ */

  function init() {
    try {
      initHeaderScroll();
      initMobileNav();
      initFaqAccordion();
      initProductDetail();
      initProductsListing();
      initContactForm();
      initWhatsAppFloat();
      initSmoothScroll();
      initActiveNavLink();
      initFilterBarScroll();
    } catch (e) {
      // Log error but don't break the page
      if (typeof console !== 'undefined' && console.error) {
        console.error('[Jieneng main.js] Initialization error:', e);
      }
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
