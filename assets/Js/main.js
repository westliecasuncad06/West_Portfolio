


/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById('sidebar')
    navToggle = document.getElementById('nav-toggle')
    navClose = document.getElementById('nav-close')
    navLinks = document.querySelectorAll('.nav__link');

/*===== SIDEBAR SHOW =====*/
/* Validate If Constant Exists */

if(navToggle){
    navToggle.addEventListener("click", () => {
        navMenu.classList.add('show-sidebar')
    })
}
/*===== SIDEBAR HIDDEN =====*/
/* Validate If Constant Exists */

if(navClose){
    navClose.addEventListener("click", () => {
        navMenu.classList.remove('show-sidebar')
    })
}

/*=============== Close links===============*/

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove('show-sidebar');
    });
});

/*=============== SKILLS TABS ===============*/

const tabs = document.querySelectorAll('[data-target]'),
    tabContent = document.querySelectorAll('[data-content]')

    tabs.forEach(tab =>{
        tab.addEventListener("click", () => {
            const target = document.querySelector(tab.dataset.target)

            tabContent.forEach(tabContents => {
                tabContents.classList.remove('skills__active')
            })

            target.classList.add('skills__active')


            tabs.forEach(tab => {
                tab.classList.remove('skills__active')
            })

            tab.classList.add('skills__active')
        })
    })


/*=============== MIXITUP FILTER PORTFOLIO
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

 ===============*/



/*===== Link Active Work 
const linkWork = document.querySelectorAll('.work__item')

function activeWork(){
    linkWork.forEach(L=> L.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(L=> L.addEventListener("click", activeWork)) 
=====*/
/*===== Work Popup 
 
document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("work__button")){
        togglePortfolioPopup();
        portfolipItemDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup(){
    document.querySelector(".portfolio__popup").classList.toggle("open");
}

document.querySelector(".portfolio__popup-close").addEventListener("click", togglePortfolioPopup)

function portfolipItemDetails(portfolioItem){
    document.querySelector(".pp__thumbnail img").src = portfolioItem.querySelector(".work__img").src 
    document,querySelector(".portfolio__popup-subtitle span").innerHTML = portfolioItem.querySelector("work__title").innerHTML 
    document,querySelector(".portfolio__popup-body").innerHTML = portfolioItem.querySelector(".portfolio__item-details").innerHTML 

}


=====*/

/*=============== PORTFOLIO MODAL & GALLERY ===============*/
document.addEventListener('DOMContentLoaded', function() {
    const portfolioTiles = document.querySelectorAll('.portfolio__tile');
    const portfolioModal = document.getElementById('portfolioModal');
    const modalClose = document.querySelector('.portfolio__modal-close');
    const modalOverlay = document.querySelector('.portfolio__modal-overlay');
    const mainGalleryImage = document.getElementById('mainGalleryImage');
    const thumbnailsContainer = document.getElementById('portfolioThumbnails');
    const prevBtn = document.querySelector('.gallery__nav-prev');
    const nextBtn = document.querySelector('.gallery__nav-next');
    const categoryEl = document.getElementById('portfolioCategory');
    const titleEl = document.getElementById('portfolioTitle');
    const subtitleEl = document.getElementById('portfolioSubtitle');
    const overviewEl = document.getElementById('portfolioOverview');
    const featuresList = document.getElementById('portfolioFeatures');
    const techStack = document.getElementById('portfolioTechStack');
    const infoList = document.getElementById('portfolioInfoList');
    const actionBtn = document.getElementById('portfolioLiveButton');
    const metricsEl = document.getElementById('portfolioMetrics');
    const badgesEl = document.getElementById('portfolioBadges');
    const signalEl = document.getElementById('portfolioSignal');
    const signalTextEl = document.getElementById('portfolioSignalText');
    
    // Portfolio data
    const portfolioData = {
        'grc-attendance': {
            images: [
                {
                    src: 'assets/img/Portfolio/GRC-Attendance-Monitoring/GRC-Homepage-Web.png',
                    alt: 'GRC Homepage - Dashboard View'
                },
                {
                    src: 'assets/img/Portfolio/GRC-Attendance-Monitoring/Professor-view.png',
                    alt: 'Professor Dashboard - Attendance Management'
                },
                {
                    src: 'assets/img/Portfolio/GRC-Attendance-Monitoring/Student-View-mobile-View.png',
                    alt: 'Student Mobile View'
                },
                {
                    src: 'assets/img/Portfolio/GRC-Attendance-Monitoring/Mobile-View.png',
                    alt: 'Mobile Responsive Design'
                }
            ],
            details: {
                category: 'Web Application',
                title: 'GRC Attendance Monitoring System',
                subtitle: 'Global Reciprocal College',
                overview: 'A comprehensive attendance monitoring system designed for Global Reciprocal College. The system provides real-time attendance tracking, reporting, and analytics for students and professors.',
                metrics: [
                    { value: '3.5K+', label: 'Students onboarded' },
                    { value: '6 dashboards', label: 'Role-based experiences' },
                    { value: '8 weeks', label: 'Design to deployment' }
                ],
                badges: ['Secure auth', 'Realtime dashboards', 'Deployment support'],
                signal: 'Digitized attendance tracking for 3.5K students, eliminating paper logs and unlocking same-day analytics for program chairs.',
                features: [
                    'Real-time attendance tracking and monitoring',
                    'Professor dashboard with class management',
                    'Student portal for attendance history',
                    'Responsive design for mobile and desktop',
                    'Automated attendance reports and analytics',
                    'Secure authentication and role-based access'
                ],
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'AJAX', 'Bootstrap'],
                created: '2025',
                role: 'Full-Stack Developer',
                status: 'Live & Operational',
                website: 'http://grc.gt.tc',
                websiteLabel: 'Website',
                linkDisplayText: 'grc.gt.tc',
                actionLabel: 'Visit Live Site',
                actionIcon: 'uil uil-external-link-alt',
                linkIcon: 'uil uil-external-link-alt',
                linkTarget: '_blank'
            }
        },
        'west-shop': {
            images: [
                {
                    src: 'assets/img/E-commerce-Portfolio/screencapture-westshop-gt-tc-index-php-2025-11-17-18_04_43.png',
                    alt: 'West Shop - Homepage & Product Catalog'
                },
                {
                    src: 'assets/img/E-commerce-Portfolio/screencapture-westshop-gt-tc-dashboards-buyer-index-php-2025-11-17-18_03_38.png',
                    alt: 'Buyer Dashboard - Order Management'
                },
                {
                    src: 'assets/img/E-commerce-Portfolio/screencapture-westshop-gt-tc-buyer-orders-php-2025-11-17-18_05_24.png',
                    alt: 'Order Tracking & History'
                }
            ],
            details: {
                category: 'E-commerce Platform',
                title: 'West Shop E-commerce Platform',
                subtitle: 'Full-Featured Online Shopping System',
                overview: 'A complete e-commerce solution featuring product management, shopping cart, order processing, and user authentication. Built with modern web technologies to provide a seamless online shopping experience.',
                metrics: [
                    { value: '1.2K+', label: 'Monthly shoppers' },
                    { value: '40%', label: 'Faster fulfillment' },
                    { value: '10 modules', label: 'Seller tooling' }
                ],
                badges: ['Buyer & seller portals', 'Secure checkout', 'Inventory control'],
                signal: 'Unified the buyer and seller experience, cutting manual order reconciliation time by 40% and enabling near real-time stock insights.',
                features: [
                    'User authentication and account management',
                    'Product catalog with search and filtering',
                    'Shopping cart and checkout system',
                    'Order tracking and history',
                    'Buyer and seller dashboards',
                    'Secure payment processing integration',
                    'Responsive design for all devices',
                    'Admin panel for inventory management'
                ],
                technologies: ['PHP', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'MySQL'],
                created: '2025',
                role: 'Full-Stack Developer',
                status: 'Live & Operational',
                website: 'http://westshop.gt.tc',
                websiteLabel: 'Website',
                linkDisplayText: 'westshop.gt.tc',
                actionLabel: 'Visit Live Site',
                actionIcon: 'uil uil-external-link-alt',
                linkIcon: 'uil uil-external-link-alt',
                linkTarget: '_blank'
            }
        },
        'coffee-shop-app': {
            images: [
                {
                    src: 'assets/img/e-commerce%20apps/Screenshot%202025-11-17%20181709.png',
                    alt: 'Coffee Shop App - Product Grid'
                },
                {
                    src: 'assets/img/e-commerce%20apps/Screenshot%202025-11-17%20181919.png',
                    alt: 'Coffee Shop App - Product Detail & Cart'
                },
                {
                    src: 'assets/img/e-commerce%20apps/Screenshot%202025-11-17%20181943.png',
                    alt: 'Coffee Shop App - Order Summary'
                },
                {
                    src: 'assets/img/e-commerce%20apps/Screenshot%202025-11-07%20102520.png',
                    alt: 'Coffee Shop App - Onboarding Flow'
                }
            ],
            details: {
                category: 'Mobile Commerce',
                title: 'Coffee Shop E-commerce',
                subtitle: 'Mobile E-commerce for Cafés',
                overview: 'A Flutter-based mobile commerce experience tailored for boutique coffee shops. Built with Firebase for authentication, real-time catalog updates, and cloud-hosted order workflows, the app streamlines ordering, loyalty rewards, and pick-up coordination.',
                metrics: [
                    { value: '<5s', label: 'Avg. checkout flow' },
                    { value: '4 screens', label: 'Order journey' },
                    { value: 'Realtime', label: 'Inventory sync' }
                ],
                badges: ['Firebase sync', 'Loyalty-ready', 'Offline-first'],
                signal: 'Designed for boutique cafés needing a branded mobile flow—offline browsing, loyalty-ready promos, and instant inventory updates via Firebase.',
                features: [
                    'Curated coffee catalog with variants and add-ons',
                    'Firebase Authentication for customer sign-in and guest checkout',
                    'Cloud Firestore-backed cart, orders, and inventory sync',
                    'Push-ready notification layer for order status updates',
                    'Built-in loyalty tracking and promo banner slots',
                    'Offline-first caching for menu browsing'
                ],
                technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Firebase Storage'],
                created: '2025',
                role: 'Mobile App Developer',
                status: 'Beta Release',
                website: 'assets/img/e-commerce%20apps/app-release.apk',
                websiteLabel: 'Download to Explore',
                linkDisplayText: 'Download APK (Android)',
                actionLabel: 'Download APK',
                actionIcon: 'uil uil-import',
                linkIcon: 'uil uil-import',
                linkTarget: '_self',
                isDownload: true
            }
        }
    };
    
    let currentImageIndex = 0;
    let currentPortfolio = null;
    
    // Open modal for specific portfolio
    portfolioTiles.forEach(tile => {
        tile.addEventListener('click', function(e) {
            // Don't open modal if clicking the live link
            if (e.target.closest('.portfolio__live-link')) {
                return;
            }
            const portfolioId = this.getAttribute('data-portfolio');
            currentPortfolio = portfolioId;
            console.log('Portfolio tile clicked:', portfolioId); // Debug log
            openModal(portfolioId);
        });
    });
    
    // Close modal functions
    function closeModal() {
        if (portfolioModal) {
            console.log('Closing modal'); // Debug log
            portfolioModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
            currentPortfolio = null;
        }
    }
    
    function openModal(portfolioId) {
        if (portfolioModal && portfolioData[portfolioId]) {
            console.log('Opening modal for:', portfolioId); // Debug log
            currentImageIndex = 0;
            updateModalContent(portfolioId);
            portfolioModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
    
    // Update modal content based on portfolio
    function updateModalContent(portfolioId) {
        const data = portfolioData[portfolioId];
        if (!data) return;
        
        // Update gallery images and thumbnails
        if (thumbnailsContainer) {
            thumbnailsContainer.innerHTML = '';
            data.images.forEach((img, index) => {
                const thumbDiv = document.createElement('div');
                thumbDiv.className = 'gallery__thumbnail' + (index === 0 ? ' active' : '');
                thumbDiv.setAttribute('data-index', index);
                thumbDiv.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
                thumbDiv.addEventListener('click', function() {
                    currentImageIndex = index;
                    updateGalleryImage();
                });
                thumbnailsContainer.appendChild(thumbDiv);
            });
        }
        
        // Update details
        const details = data.details;
        if (categoryEl) categoryEl.textContent = details.category;
        if (titleEl) titleEl.textContent = details.title;
        if (subtitleEl) subtitleEl.textContent = details.subtitle;
        if (overviewEl) overviewEl.textContent = details.overview;

        const toggleSection = (el, condition) => {
            if (!el) return;
            if (condition) {
                el.classList.remove('is-hidden');
            } else {
                el.classList.add('is-hidden');
            }
        };

        if (metricsEl) {
            const hasMetrics = Array.isArray(details.metrics) && details.metrics.length > 0;
            toggleSection(metricsEl, hasMetrics);
            if (hasMetrics) {
                metricsEl.innerHTML = details.metrics.map(metric => `
                    <div class="portfolio__metric">
                        <span class="portfolio__metric-value">${metric.value}</span>
                        <span class="portfolio__metric-label">${metric.label}</span>
                    </div>
                `).join('');
            } else {
                metricsEl.innerHTML = '';
            }
        }

        if (badgesEl) {
            const hasBadges = Array.isArray(details.badges) && details.badges.length > 0;
            toggleSection(badgesEl, hasBadges);
            if (hasBadges) {
                badgesEl.innerHTML = details.badges.map(badge => `
                    <span class="portfolio__badge">${badge}</span>
                `).join('');
            } else {
                badgesEl.innerHTML = '';
            }
        }

        if (signalEl) {
            const hasSignal = Boolean(details.signal);
            toggleSection(signalEl, hasSignal);
            if (hasSignal && signalTextEl) {
                signalTextEl.textContent = details.signal;
            }
        }
        
        // Update features list
        if (featuresList) {
            featuresList.innerHTML = details.features.map(feature => 
                `<li><i class="uil uil-check"></i> ${feature}</li>`
            ).join('');
        }
        
        // Update tech stack
        if (techStack) {
            techStack.innerHTML = details.technologies.map(tech => 
                `<span class="tech__badge">${tech}</span>`
            ).join('');
        }
        
        // Update project info
        if (infoList) {
            const linkTarget = details.linkTarget || '_blank';
            const isDownloadLink = Boolean(details.isDownload);
            const linkLabel = details.websiteLabel || 'Website';
            const linkIcon = details.linkIcon || 'uil uil-external-link-alt';
            const displayUrl = details.linkDisplayText || (details.website ? details.website.replace(/^https?:\/\//, '') : '');
            const downloadAttr = isDownloadLink ? ' download' : '';
            infoList.innerHTML = `
                <li><strong>Created:</strong> ${details.created}</li>
                <li><strong>Role:</strong> ${details.role}</li>
                <li><strong>Status:</strong> ${details.status}</li>
                <li><strong>${linkLabel}:</strong> <a href="${details.website}" target="${linkTarget}"${downloadAttr}>${displayUrl} <i class="${linkIcon}"></i></a></li>
            `;
        }
        
        // Update action button
        if (actionBtn) {
            const linkTarget = details.linkTarget || '_blank';
            const isDownloadLink = Boolean(details.isDownload);
            const actionLabel = details.actionLabel || 'Visit Live Site';
            const actionIcon = details.actionIcon || 'uil uil-external-link-alt';
            actionBtn.href = details.website || '#';
            actionBtn.target = linkTarget;
            if (isDownloadLink) {
                actionBtn.setAttribute('download', '');
            } else {
                actionBtn.removeAttribute('download');
            }
            actionBtn.innerHTML = `<i class="${actionIcon}"></i> ${actionLabel}`;
        }
        
        // Update main image
        updateGalleryImage();
    }
    
    // Update gallery image
    function updateGalleryImage() {
        if (!currentPortfolio || !portfolioData[currentPortfolio]) return;
        
        const images = portfolioData[currentPortfolio].images;
        if (mainGalleryImage && images[currentImageIndex]) {
            // Fade out
            mainGalleryImage.style.opacity = '0';
            
            setTimeout(() => {
                mainGalleryImage.src = images[currentImageIndex].src;
                mainGalleryImage.alt = images[currentImageIndex].alt;
                
                // Fade in
                mainGalleryImage.style.opacity = '1';
            }, 150);
            
            // Update active thumbnail
            const thumbnails = document.querySelectorAll('.gallery__thumbnail');
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === currentImageIndex);
            });
        }
    }
    
    // Close button click
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && portfolioModal && portfolioModal.classList.contains('active')) {
            closeModal();
        }
    });

    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (!currentPortfolio || !portfolioData[currentPortfolio]) return;
            const images = portfolioData[currentPortfolio].images;
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateGalleryImage();
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (!currentPortfolio || !portfolioData[currentPortfolio]) return;
            const images = portfolioData[currentPortfolio].images;
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateGalleryImage();
        });
    }
    
    // Keyboard navigation (arrow keys)
    document.addEventListener('keydown', function(e) {
        if (portfolioModal && portfolioModal.classList.contains('active') && currentPortfolio) {
            const images = portfolioData[currentPortfolio].images;
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateGalleryImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateGalleryImage();
            }
        }
    });
    
    // ========== IMAGE ZOOM FUNCTIONALITY ==========
    const zoomBtn = document.getElementById('zoomBtn');
    const imageZoomModal = document.getElementById('imageZoomModal');
    const zoomedImage = document.getElementById('zoomedImage');
    const zoomCloseBtn = document.getElementById('zoomCloseBtn');
    
    // Open zoom modal
    if (zoomBtn) {
        zoomBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent closing portfolio modal
            if (mainGalleryImage) {
                zoomedImage.src = mainGalleryImage.src;
                zoomedImage.alt = mainGalleryImage.alt;
                imageZoomModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Close zoom modal - close button
    if (zoomCloseBtn) {
        zoomCloseBtn.addEventListener('click', function() {
            imageZoomModal.classList.remove('active');
            document.body.style.overflow = 'hidden'; // Keep portfolio modal scroll disabled
        });
    }
    
    // Close zoom modal - click on background
    if (imageZoomModal) {
        imageZoomModal.addEventListener('click', function(e) {
            if (e.target === imageZoomModal) {
                imageZoomModal.classList.remove('active');
                document.body.style.overflow = 'hidden'; // Keep portfolio modal scroll disabled
            }
        });
    }
    
    // Close zoom modal - ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageZoomModal && imageZoomModal.classList.contains('active')) {
            imageZoomModal.classList.remove('active');
            document.body.style.overflow = 'hidden'; // Keep portfolio modal scroll disabled
        }
    });
    
    // Allow click on main gallery image to zoom
    if (mainGalleryImage) {
        mainGalleryImage.addEventListener('click', function() {
            zoomedImage.src = mainGalleryImage.src;
            zoomedImage.alt = mainGalleryImage.alt;
            imageZoomModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
});

/*=============== CERTIFICATE VIEWER ===============*/
document.addEventListener('DOMContentLoaded', function() {
    const certificateCards = document.querySelectorAll('.certificate__card');
    const certificateModal = document.getElementById('certificateModal');
    const certCloseBtn = document.getElementById('certCloseBtn');
    const certEmbed = document.getElementById('certEmbed');
    const certTitle = document.getElementById('certTitle');
    const certDownload = document.getElementById('certDownload');
    const certOverlay = document.querySelector('.certificate__modal-overlay');
    
    // Certificate data mapping
    const certificates = {
        'php-essential': {
            file: 'assets/img/CERTIFICATE/CertificateOfCompletion_PHP Essential Training (1).pdf',
            title: 'PHP Essential Training Certificate'
        },
        'diploma': {
            file: 'assets/img/CERTIFICATE/Diploma_e9ea271a-bdea-4c3d-bcab-b1334b9591f2.pdf',
            title: 'Diploma Certificate'
        },
        'python-1': {
            file: 'assets/img/CERTIFICATE/Python_Essentials_1_Badge20241119-28-rie6ez.pdf',
            title: 'Python Essentials 1 Certificate'
        },
        'python-2': {
            file: 'assets/img/CERTIFICATE/Python_Essentials_2_Badge20241119-26-8bkhdt.pdf',
            title: 'Python Essentials 2 Certificate'
        },
        'udemy-1': {
            file: 'assets/img/CERTIFICATE/UC-28d5196b-2ba0-4d33-ba18-a7f7da7ab448.pdf',
            title: 'Udemy Course Certificate'
        },
        'udemy-2': {
            file: 'assets/img/CERTIFICATE/UC-dacf2492-c8be-4b53-be7a-a214bc15974f.pdf',
            title: 'Udemy Professional Certificate'
        }
    };
    
    // Open certificate modal
    certificateCards.forEach(card => {
        const viewBtn = card.querySelector('.certificate__view-btn');
        
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const certId = card.getAttribute('data-cert');
                const certData = certificates[certId];
                
                if (certData) {
                    certEmbed.src = certData.file;
                    certTitle.textContent = certData.title;
                    certDownload.href = certData.file;
                    certDownload.download = certData.title + '.pdf';
                    
                    certificateModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });
    
    // Close certificate modal - close button
    if (certCloseBtn) {
        certCloseBtn.addEventListener('click', function() {
            closeCertModal();
        });
    }
    
    // Close certificate modal - overlay click
    if (certOverlay) {
        certOverlay.addEventListener('click', function() {
            closeCertModal();
        });
    }
    
    // Close certificate modal - ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && certificateModal && certificateModal.classList.contains('active')) {
            closeCertModal();
        }
    });
    
    function closeCertModal() {
        certificateModal.classList.remove('active');
        document.body.style.overflow = '';
        // Clear embed src to stop loading
        setTimeout(() => {
            certEmbed.src = '';
        }, 300);
    }
});

/*=============== SERVICES MODAL ===============*/

const modalViews = document.querySelectorAll('.services__modal'),
    modelBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal');
}

modelBtns.forEach((modelBtn, i) =>{
    modelBtn.addEventListener('click', () =>{
        modal(i)
    })
})

modalCloses.forEach((modalClose) =>{
    modalClose.addEventListener("click", () => {
        modalViews.forEach((modalViews) => {
            modalViews.classList.remove('active-modal')
        })
    })
})
/*=============== SWIPER TESTIMONIAL ===============*/
let swiper = new Swiper(".testimonials__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor:true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 48,
        },
    },
    
  });
/*=============== INPUT ANIMATION ===============*/
const inputs = document.querySelectorAll(".input");

function focusFunc(){
    let parent= this.parentNode;
    parent.classList.add("focus");
}

function blurFunc(){
    let parent = this.parentNode
    if(this.value == "" ){
        parent.classList.remove("focus")
    }
}

inputs.forEach((input) =>{
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);

})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
//get all sections that have an ID defined 
const sections = document.querySelectorAll("section[id]");

// add an event listner  listening for scoll
window.addEventListener("scroll", navHighlighter);

function navHighlighter()
{
    //get current scrool position
    let scrollY = window.pageYOffset;
    //now we loop though all the sections to get height, top and ID values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute("id");


/* - If our current scroll position enters the space here current section on screen is, add .active class
        corresponding navigation link, else remove it

        - to know which link needs an active class, we use sectionID varialbe we are getting while looping though
        sections as an selector
*/
        if(scrollY > sectionTop &&  scrollY <= sectionTop + sectionHeight)
        {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add("active-link")
        }
        else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove("active-link")
        }
    })
}





/*=============== SHOW SCROLL UP ===============*/
