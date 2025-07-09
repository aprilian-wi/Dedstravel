// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
const navbarLinks = document.querySelectorAll('.navbar-link');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
        navbarLinks.forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-gray-700');
        });
    } else {
        navbar.classList.remove('nav-scrolled');
        navbarLinks.forEach(link => {
            link.classList.remove('text-gray-700');
            link.classList.add('text-white');
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
            
            // Calculate position with navbar offset
            const navbarHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
  // Data destinasi
  const destinasi = [
    {
      img: 'assets/Bogor.png',
      title: 'BOGOR',
      desc: 'Destinasi favorit paket tour dan travel terbaik dengan pemandangan memukau'
    },
    {
      img: 'assets/Kawah.png',
      title: 'KAWAH PUTIH',
      desc: 'Keindahan alam vulkanik dengan pemandangan danau kawah yang memesona'
    },
    {
      img: 'assets/Lembang.png',
      title: 'LEMBANG',
      desc: 'Wisata alam sejuk dengan berbagai spot instagramable dan kuliner khas'
    },
    {
      img: 'assets/Bandung.png',
      title: 'BANDUNG',
      desc: 'Kota kreatif dengan wisata belanja, kuliner, dan sejarah yang menarik'
    },
    {
      img: 'assets/Ciwidey.png',
      title: 'CIWIDEY',
      desc: 'Dataran tinggi dengan kebun teh, kawah, dan udara segar pegunungan'
    }
  ];



  const container = document.querySelector('#galeri-destinasi .gallery-track');
  if (!container) return;

  // Generate images and duplicate for infinity loop
  function createCard({img, title, desc}) {
    const card = document.createElement('div');
    card.className = 'rounded-xl overflow-hidden relative min-w-[320px] w-80 h-64 bg-gray-200 shadow group';
    card.innerHTML = `
      <img src="${img}" alt="${title}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
      <div class="absolute bottom-0 left-0 p-6 text-white">
        <h4 class="text-xl font-bold mb-2">${title}</h4>
        <p class="text-sm">${desc}</p>
      </div>
    `;
    return card;
  }

  // Isi track dengan 2x destinasi (untuk loop)
  for (let i = 0; i < 2; i++) {
    destinasi.forEach(d => container.appendChild(createCard(d)));
  }

  // Infinity loop logic
  let isHover = false, isDragging = false, startX = 0, scrollLeft = 0, pos = 0, animationId;
  const speed = 1.2; // px per frame

  function getSliderWidth() {
    return container.scrollWidth / 2;
  }

  function animate() {
    if (!isHover && !isDragging) {
      pos -= speed;
      if (Math.abs(pos) >= getSliderWidth()) pos = 0;
      container.style.transform = `translateX(${pos}px)`;
    }
    animationId = requestAnimationFrame(animate);
  }

  const wrapper = container.parentElement;
  wrapper.addEventListener('mouseenter', () => { isHover = true; });
  wrapper.addEventListener('mouseleave', () => { isHover = false; });
  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = pos;
    wrapper.classList.add('cursor-grabbing');
  });
  wrapper.addEventListener('mouseleave', () => {
    isDragging = false;
    wrapper.classList.remove('cursor-grabbing');
  });
  wrapper.addEventListener('mouseup', () => {
    isDragging = false;
    wrapper.classList.remove('cursor-grabbing');
  });
  wrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = x - startX;
    pos = scrollLeft + walk;
    if (Math.abs(pos) >= getSliderWidth()) pos = 0;
    container.style.transform = `translateX(${pos}px)`;
  });

  // Touch support
  wrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - container.offsetLeft;
    scrollLeft = pos;
  });
  wrapper.addEventListener('touchend', () => {
    isDragging = false;
  });
  wrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = x - startX;
    pos = scrollLeft + walk;
    if (Math.abs(pos) >= getSliderWidth()) pos = 0;
    container.style.transform = `translateX(${pos}px)`;
  });

  animate();
});
