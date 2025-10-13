const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
function showSlide(i){slides.forEach((s,x)=>{s.classList.toggle('active', x===i);});}
setInterval(()=>{currentSlide=(currentSlide+1)%slides.length;showSlide(currentSlide);},5000);

function requireAuth(action){
if (Clerk.user) { action(); }
else { Clerk.openSignIn({ afterSignInUrl: window.location.href }); }
}

// only for non-admin (admin uses open/close dashboard)
function exhibit(section){
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
    const sidenav = document.getElementById('mobile-sidenav');
    sidenav.style.left = '-100%';
}

///////////////////////////////
//Show search bar
///////////////////////////////

function toggle_search_bar() {
    const navItems = document.getElementById("navbarLinks");
    const searchContainer = document.getElementById("navbarSearchContainer");
    const searchInput = document.getElementById("navbarSearchInput");

    // Toggle visibility
    if (searchContainer.classList.contains("hidden")) {
        navItems.classList.add("nav-hidden"); 
        searchContainer.classList.remove("hidden"); // show search bar
        searchInput.focus();
    } else {
        navItems.classList.remove("nav-hidden"); 
        searchContainer.classList.add("hidden"); // hide search bar
        searchInput.value = "";                  // clear input
    }

    // Optional: live search
    searchInput.addEventListener("input", async () => {
        const query = searchInput.value.trim();
        // implement your search logic here (fetch from /api/search-events)
        console.log("Search query:", query);
    });
}

///////////////////////////////
///////////////////////////////
const hamburgerBtn = document.querySelector('button.md\\:hidden'); // ☰ button
const sidenav = document.getElementById('mobile-sidenav');
const closeBtn = document.getElementById('close-sidenav');

hamburgerBtn.addEventListener('click', () => {
    if (!(sidenav.style.left == '0')){
        sidenav.style.left = '0';
    }// slide in
    else{
        sidenav.style.left = '-100%';
    }
});

closeBtn.addEventListener('click', () => {
    sidenav.style.left = '-100%'; // slide out
});

// close when clicking outside
window.addEventListener('click', (e) => {
    if (!sidenav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        sidenav.style.left = '-100%';
    }
});

// close when scrolling outside
window.addEventListener('scroll',(e) => {
    if (!sidenav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        sidenav.style.left = '-100%';
    }
});

////////////////////////////////////
//EVENT VIEW
////////////////////////////////////

// 1️⃣ Open Modal when a "View Details" button is clicked
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Get event details from data attributes
    const event = {
      TITLE: btn.dataset.title,
      DESCRIPTION: btn.dataset.desc,
      IMAGE: btn.dataset.image,
      FEE: btn.dataset.fee,
      STARTDATE: btn.dataset.start,
      ENDDATE: btn.dataset.end,
      VENUE: btn.dataset.venue,
      EVENTTYPE: btn.dataset.type
    };

    // Populate modal content
    document.getElementById('modalTitle').textContent = event.TITLE;
    document.getElementById('modalDesc').textContent = event.DESCRIPTION;
    document.getElementById('modalFee').textContent = `Fee: ₹${event.FEE || '0'}`;
    document.getElementById('modalDate').textContent = `Date: ${event.STARTDATE}${event.ENDDATE ? ' - ' + event.ENDDATE : ''}`;
    document.getElementById('modalVenue').textContent = `Venue: ${event.VENUE || ''} | Type: ${event.EVENTTYPE || ''}`;

    // Show modal
    const modal = document.getElementById('eventModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // prevent background scroll

    // Register button functionality
    const registerBtn = document.getElementById('registerBtn');
    registerBtn.onclick = () => {
      requireAuth(() => {
        // Example: send registration request
        fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: event.TITLE }) // you can replace with event ID
        })
        .then(res => {
          if (res.ok) alert('Registered successfully!');
          else alert('Registration failed');
        })
        .catch(() => alert('Network error'));
        closeEventModal();
      });
    };
  });
});

// 2️⃣ Close modal function
function closeEventModal() {
  const modal = document.getElementById('eventModal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// 3️⃣ Close modal when "×" button clicked
document.getElementById('closeModal').addEventListener('click', closeEventModal);

// 4️⃣ Close modal when clicking outside the modal content
document.getElementById('eventModal').addEventListener('click', e => {
  if (e.target.id === 'eventModal') closeEventModal();
});





