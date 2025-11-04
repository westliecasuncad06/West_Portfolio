


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
    const portfolioTile = document.querySelector('.portfolio__tile');
    const portfolioModal = document.getElementById('portfolioModal');
    const modalClose = document.querySelector('.portfolio__modal-close');
    const modalOverlay = document.querySelector('.portfolio__modal-overlay');
    const mainGalleryImage = document.getElementById('mainGalleryImage');
    const thumbnails = document.querySelectorAll('.gallery__thumbnail');
    const prevBtn = document.querySelector('.gallery__nav-prev');
    const nextBtn = document.querySelector('.gallery__nav-next');
    
    // Gallery images array
    const galleryImages = [
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
    ];
    
    let currentImageIndex = 0;
    
    // Open modal
    if (portfolioTile) {
        portfolioTile.addEventListener('click', function(e) {
            // Don't open modal if clicking the live link
            if (e.target.closest('.portfolio__live-link')) {
                return;
            }
            console.log('Portfolio tile clicked!'); // Debug log
            openModal();
        });
    }
    
    // Close modal functions
    function closeModal() {
        if (portfolioModal) {
            console.log('Closing modal'); // Debug log
            portfolioModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    }
    
    function openModal() {
        if (portfolioModal) {
            console.log('Opening modal'); // Debug log
            portfolioModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            currentImageIndex = 0;
            updateGalleryImage();
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
    
    // Update gallery image
    function updateGalleryImage() {
        if (mainGalleryImage && galleryImages[currentImageIndex]) {
            // Fade out
            mainGalleryImage.style.opacity = '0';
            
            setTimeout(() => {
                mainGalleryImage.src = galleryImages[currentImageIndex].src;
                mainGalleryImage.alt = galleryImages[currentImageIndex].alt;
                
                // Fade in
                mainGalleryImage.style.opacity = '1';
            }, 150);
            
            // Update active thumbnail
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === currentImageIndex);
            });
        }
    }
    
    // Thumbnail clicks
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            currentImageIndex = index;
            updateGalleryImage();
        });
    });
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateGalleryImage();
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateGalleryImage();
        });
    }
    
    // Keyboard navigation (arrow keys)
    document.addEventListener('keydown', function(e) {
        if (portfolioModal && portfolioModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateGalleryImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
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
