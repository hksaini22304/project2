/* ==========================================
   SUPERNATURAL COSMETICS - JAVASCRIPT
   Author: Harjot Kaur Saini
   Date: 2025
   ========================================== */

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // Add class to body to indicate JavaScript is enabled
    // This enables progressive enhancement styles
    document.body.classList.add('js-enabled');
    
    // ==========================================
    // HERO SLIDESHOW FUNCTIONALITY
    // ==========================================
    
    // Get hero slideshow elements
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroPrevBtn = document.getElementById('heroPrev');
    const heroNextBtn = document.getElementById('heroNext');
    const heroCaption = document.getElementById('heroCaption');
    const heroIndicatorsContainer = document.getElementById('heroIndicators');
    
    // Hero slideshow state variables
    let currentHeroSlide = 0;
    let heroAutoplayInterval = null;
    let isHeroAutoplayActive = true;
    
    // Hero slide captions data
    const heroCaptions = [
        {
            title: "New Collection Arrivals",
            description: "Discover our latest beauty essentials"
        },
        {
            title: "Limited Edition Palettes",
            description: "Express your unique beauty"
        },
        {
            title: "Luxury Skincare",
            description: "Pamper yourself with premium care"
        },
        {
            title: "Bold & Beautiful",
            description: "Be fearless in your own skin"
        }
    ];
    
    /**
     * Initialize hero slideshow
     * Sets up indicators and starts autoplay
     */
    function initHeroSlideshow() {
        // Create indicators for hero slides
        createHeroIndicators();
        
        // Start autoplay for hero slideshow
        startHeroAutoplay();
        
        // Show the first slide
        showHeroSlide(0);
    }
    
    /**
     * Create hero slide indicators
     * Generates clickable dots for each slide
     */
    function createHeroIndicators() {
        // Clear any existing indicators
        heroIndicatorsContainer.innerHTML = '';
        
        // Create an indicator button for each slide
        heroSlides.forEach(function(slide, index) {
            const indicator = document.createElement('button');
            indicator.classList.add('hero-indicator');
            indicator.setAttribute('aria-label', 'Go to hero slide ' + (index + 1));
            
            // Mark first indicator as active
            if (index === 0) {
                indicator.classList.add('active');
            }
            
            // Add click event listener to indicator
            indicator.addEventListener('click', function() {
                stopHeroAutoplay();
                showHeroSlide(index);
            });
            
            // Add indicator to container
            heroIndicatorsContainer.appendChild(indicator);
        });
    }
    
    /**
     * Show specific hero slide
     * Displays the slide at the given index with fade transition
     */
    function showHeroSlide(index) {
        // Validate and wrap index if necessary
        if (index < 0) {
            currentHeroSlide = heroSlides.length - 1;
        } else if (index >= heroSlides.length) {
            currentHeroSlide = 0;
        } else {
            currentHeroSlide = index;
        }
        
        // Remove active class from all slides
        heroSlides.forEach(function(slide) {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide (triggers CSS transition)
        heroSlides[currentHeroSlide].classList.add('active');
        
        // Update hero caption
        updateHeroCaption();
        
        // Update indicators
        updateHeroIndicators();
    }
    
    /**
     * Update hero caption
     * Changes the caption text to match current slide
     */
    function updateHeroCaption() {
        const captionData = heroCaptions[currentHeroSlide];
        
        if (captionData && heroCaption) {
            // Fade out caption
            heroCaption.style.opacity = '0';
            
            // Update caption text after fade out
            setTimeout(function() {
                heroCaption.querySelector('h2').textContent = captionData.title;
                heroCaption.querySelector('p').textContent = captionData.description;
                
                // Fade in caption
                heroCaption.style.opacity = '1';
            }, 300);
        }
    }
    
    /**
     * Update hero indicators
     * Highlights the active slide indicator
     */
    function updateHeroIndicators() {
        const indicators = heroIndicatorsContainer.querySelectorAll('.hero-indicator');
        
        // Loop through all indicators
        indicators.forEach(function(indicator, index) {
            if (index === currentHeroSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    /**
     * Show next hero slide
     * Advances to the next slide in sequence
     */
    function showNextHeroSlide() {
        showHeroSlide(currentHeroSlide + 1);
    }
    
    /**
     * Show previous hero slide
     * Goes back to the previous slide
     */
    function showPreviousHeroSlide() {
        showHeroSlide(currentHeroSlide - 1);
    }
    
    /**
     * Start hero autoplay
     * Begins automatic slide advancement every 4 seconds
     */
    function startHeroAutoplay() {
        if (isHeroAutoplayActive) {
            heroAutoplayInterval = setInterval(function() {
                showNextHeroSlide();
            }, 4000); // Change slide every 4 seconds
        }
    }
    
    /**
     * Stop hero autoplay
     * Halts automatic slide advancement
     */
    function stopHeroAutoplay() {
        isHeroAutoplayActive = false;
        
        // Clear interval if it exists
        if (heroAutoplayInterval) {
            clearInterval(heroAutoplayInterval);
            heroAutoplayInterval = null;
        }
    }
    
    // Add event listeners to hero navigation buttons
    if (heroPrevBtn) {
        heroPrevBtn.addEventListener('click', function() {
            stopHeroAutoplay();
            showPreviousHeroSlide();
        });
    }
    
    if (heroNextBtn) {
        heroNextBtn.addEventListener('click', function() {
            stopHeroAutoplay();
            showNextHeroSlide();
        });
    }
    
    // Initialize hero slideshow
    if (heroSlides.length > 0) {
        initHeroSlideshow();
    }
    
    // ==========================================
    // GALLERY SLIDESHOW FUNCTIONALITY
    // ==========================================
    
    // Get gallery elements
    const albums = document.querySelectorAll('.album');
    const albumNav = document.getElementById('albumNav');
    const albumButtons = document.querySelectorAll('.album-btn');
    const slideshowControls = document.getElementById('slideshowControls');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCaption = document.getElementById('slideCaption');
    const slideIndicators = document.getElementById('slideIndicators');
    
    // Gallery state variables
    let currentAlbum = 'lipsticks';
    let currentSlideIndex = 0;
    let slides = [];
    let galleryAutoplayInterval = null;
    let isGalleryAutoplayActive = true;
    
    /**
     * Initialize gallery
     * Sets up the initial state and event listeners
     */
    function initGallery() {
        // Show album navigation
        if (albumNav) {
            albumNav.style.display = 'flex';
        }
        
        // Show slideshow controls
        if (slideshowControls) {
            slideshowControls.style.display = 'block';
        }
        
        // Hide all albums except the first one
        albums.forEach(function(album, index) {
            if (index === 0) {
                album.classList.add('active');
            } else {
                album.style.display = 'none';
            }
        });
        
        // Load first album
        loadAlbum(currentAlbum);
        
        // Add event listeners to album buttons
        albumButtons.forEach(function(button) {
            button.addEventListener('click', handleAlbumChange);
        });
        
        // Add event listeners to prev/next buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                stopGalleryAutoplay();
                showPreviousSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                stopGalleryAutoplay();
                showNextSlide();
            });
        }
        
        // Start gallery autoplay
        startGalleryAutoplay();
    }
    
    /**
     * Handle album change via carousel navigation
     * Switches between different product albums with animation
     */
    function handleAlbumChange(event) {
        const selectedAlbum = event.target.getAttribute('data-album');
        switchToAlbum(selectedAlbum);
    }
    
    /**
     * Switch to specific album
     * Changes the displayed album with fade transition
     */
    function switchToAlbum(albumName) {
        // Find the index of the target album
        let targetIndex = -1;
        const albumArray = ['lipsticks', 'eyeshadows', 'skincare'];
        
        albumArray.forEach(function(album, index) {
            if (album === albumName) {
                targetIndex = index;
            }
        });
        
        if (targetIndex === -1) {
            return;
        }
        
        // Update active button state
        albumButtons.forEach(function(btn) {
            if (btn.getAttribute('data-album') === albumName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Fade out current album
        const currentAlbumElement = document.querySelector('.album.active');
        if (currentAlbumElement) {
            currentAlbumElement.style.opacity = '0';
            
            setTimeout(function() {
                // Hide all albums
                albums.forEach(function(album) {
                    album.style.display = 'none';
                    album.classList.remove('active');
                });
                
                // Show selected album
                const targetAlbum = document.getElementById(albumName + '-album');
                if (targetAlbum) {
                    targetAlbum.style.display = 'block';
                    targetAlbum.style.opacity = '0';
                    
                    setTimeout(function() {
                        targetAlbum.classList.add('active');
                        targetAlbum.style.opacity = '1';
                    }, 50);
                    
                    currentAlbum = albumName;
                    
                    // Reset slide index and reload album
                    currentSlideIndex = 0;
                    loadAlbum(albumName);
                    
                    // Restart gallery autoplay
                    stopGalleryAutoplay();
                    startGalleryAutoplay();
                }
            }, 300);
        }
    }
    
    /**
     * Show next album in carousel
     * Advances to the next album (wraps around)
     */
    function showNextAlbum() {
        const albumArray = ['lipsticks', 'eyeshadows', 'skincare'];
        let currentIndex = -1;
        
        // Find current album index
        albumArray.forEach(function(album, index) {
            if (album === currentAlbum) {
                currentIndex = index;
            }
        });
        
        // Calculate next index (wrap around)
        const nextIndex = (currentIndex + 1) % albumArray.length;
        switchToAlbum(albumArray[nextIndex]);
    }
    
    /**
     * Show previous album in carousel
     * Goes back to the previous album (wraps around)
     */
    function showPreviousAlbum() {
        const albumArray = ['lipsticks', 'eyeshadows', 'skincare'];
        let currentIndex = -1;
        
        // Find current album index
        albumArray.forEach(function(album, index) {
            if (album === currentAlbum) {
                currentIndex = index;
            }
        });
        
        // Calculate previous index (wrap around)
        const prevIndex = (currentIndex - 1 + albumArray.length) % albumArray.length;
        switchToAlbum(albumArray[prevIndex]);
    }
    
    /**
     * Load album function
     * Loads all slides from the selected album
     */
    function loadAlbum(albumName) {
        const albumElement = document.getElementById(albumName + '-album');
        
        if (albumElement) {
            // Get all slides in the current album
            slides = albumElement.querySelectorAll('.slide');
            
            // Create indicators for slides
            createIndicators();
            
            // Show first slide
            if (slides.length > 0) {
                showSlide(0);
            }
        }
    }
    
    /**
     * Create slide indicators
     * Generates clickable dots for navigation
     */
    function createIndicators() {
        // Clear existing indicators
        slideIndicators.innerHTML = '';
        
        // Create indicator for each slide
        slides.forEach(function(slide, index) {
            const indicator = document.createElement('button');
            indicator.classList.add('indicator');
            indicator.setAttribute('aria-label', 'Go to slide ' + (index + 1));
            
            // Add active class to first indicator
            if (index === 0) {
                indicator.classList.add('active');
            }
            
            // Add click event listener
            indicator.addEventListener('click', function() {
                stopGalleryAutoplay();
                showSlide(index);
            });
            
            slideIndicators.appendChild(indicator);
        });
    }
    
    /**
     * Show specific slide
     * Displays the slide at the given index
     */
    function showSlide(index) {
        // Validate index and wrap if necessary
        if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlideIndex = 0;
        } else {
            currentSlideIndex = index;
        }
        
        // Hide all slides
        slides.forEach(function(slide) {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        
        // Show current slide with fade effect
        const currentSlide = slides[currentSlideIndex];
        if (currentSlide) {
            currentSlide.style.display = 'block';
            
            // Use setTimeout to ensure transition works
            setTimeout(function() {
                currentSlide.classList.add('active');
            }, 10);
            
            // Update caption
            const caption = currentSlide.querySelector('.caption');
            if (caption && slideCaption) {
                slideCaption.textContent = caption.textContent;
            }
            
            // Update indicators
            updateIndicators();
        }
    }
    
    /**
     * Update indicator dots
     * Highlights the active slide indicator
     */
    function updateIndicators() {
        const indicators = slideIndicators.querySelectorAll('.indicator');
        indicators.forEach(function(indicator, index) {
            if (index === currentSlideIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    /**
     * Show next slide
     * Advances to the next slide in the sequence
     */
    function showNextSlide() {
        showSlide(currentSlideIndex + 1);
    }
    
    /**
     * Show previous slide
     * Goes back to the previous slide
     */
    function showPreviousSlide() {
        showSlide(currentSlideIndex - 1);
    }
    
    /**
     * Start gallery autoplay
     * Begins automatic slide advancement every 3 seconds
     */
    function startGalleryAutoplay() {
        if (isGalleryAutoplayActive) {
            galleryAutoplayInterval = setInterval(function() {
                showNextSlide();
            }, 3000); // Change slide every 3 seconds
        }
    }
    
    /**
     * Stop gallery autoplay
     * Halts automatic slide advancement
     */
    function stopGalleryAutoplay() {
        isGalleryAutoplayActive = false;
        
        // Clear the interval if it exists
        if (galleryAutoplayInterval) {
            clearInterval(galleryAutoplayInterval);
            galleryAutoplayInterval = null;
        }
    }
    
    // Initialize gallery if albums exist
    if (albums.length > 0) {
        initGallery();
    }
    
    // ==========================================
    // KEYBOARD NAVIGATION
    // ==========================================
    
    /**
     * Handle keyboard navigation
     * Allows arrow keys to control both hero and gallery slides
     */
    document.addEventListener('keydown', function(event) {
        // Check if arrow keys are pressed
        if (event.key === 'ArrowLeft') {
            // Stop both autoplays
            stopHeroAutoplay();
            stopGalleryAutoplay();
            
            // Navigate both slideshows
            showPreviousHeroSlide();
            showPreviousSlide();
        } else if (event.key === 'ArrowRight') {
            // Stop both autoplays
            stopHeroAutoplay();
            stopGalleryAutoplay();
            
            // Navigate both slideshows
            showNextHeroSlide();
            showNextSlide();
        }
    });
    
    // ==========================================
    // ADD TO CART FUNCTIONALITY (PLACEHOLDER)
    // ==========================================
    
    /**
     * Handle add to cart button clicks
     * This is a placeholder for future e-commerce functionality
     */
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the product name from the card
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            // Show a simple alert (in a real application, this would add to cart)
            alert('Added "' + productName + '" to cart!');
            
            // Add a temporary visual feedback
            button.textContent = 'Added!';
            button.style.background = '#28a745';
            
            // Reset button after 2 seconds
            setTimeout(function() {
                button.textContent = 'Add to Cart';
                button.style.background = '#d4537e';
            }, 2000);
        });
    });
    
});

// Unified Add-to-Cart handler for product cards AND gallery slides
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.add-to-cart');
  if (!btn) return;

  // Find product context: product card OR gallery slide
  const container = btn.closest('.product-card, .slide');
  let name = 'Item', price = '';

  if (container) {
    // Prefer data attributes when present
    name = container.dataset.name || 
           container.querySelector('.product-name')?.textContent?.trim() || 
           btn.getAttribute('data-name') || 'Item';

    // price from data-price or from visible text like "$24.99"
    const priceAttr = container.dataset.price ||
                      container.querySelector('.product-price')?.textContent || '';
    price = (priceAttr.match(/[\d.]+/) || [''])[0]; // "24.99"
  }

    // Placeholder action: show alert
  alert(`Added "${name}"${price ? ` ($${price})` : ''} to cart!`);

  // Visual feedback on the button
  btn.textContent = 'Added!';
  const prevBg = btn.style.background;
  btn.style.background = '#28a745';
  setTimeout(() => {
    btn.textContent = 'Add to Cart';
    btn.style.background = prevBg || '';
  }, 1600);
});


/* End of script.js */

// ===== Products: sort + density toggle =====
(function(){
  const grid = document.getElementById('productsGrid');
  const section = document.querySelector('.products-section');
  const select = document.getElementById('sortSelect');
  const count = document.getElementById('productCount');
  const densityBtns = document.querySelectorAll('.density-btn');

  if (grid && count) {
    const items = Array.from(grid.children);
    count.textContent = items.length + ' products';
  }

  function sortCards(by){
    if(!grid) return;
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    const sorted = cards.sort((a,b)=>{
      if(by === 'price-asc' || by === 'price-desc'){
        const pa = parseFloat(a.dataset.price), pb = parseFloat(b.dataset.price);
        return by==='price-asc' ? pa-pb : pb-pa;
      } else if(by === 'name-asc' || by === 'name-desc'){
        const na = a.dataset.name, nb = b.dataset.name;
        return by==='name-asc' ? na.localeCompare(nb) : nb.localeCompare(na);
      }
      return 0; // featured (original order)
    });
    sorted.forEach(el=>grid.appendChild(el));
  }

  if(select){ select.addEventListener('change', ()=> sortCards(select.value)); }

  densityBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      densityBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      if(section){ section.setAttribute('data-density', btn.dataset.density); }
    });
  });
})();
/* End of script.js */

