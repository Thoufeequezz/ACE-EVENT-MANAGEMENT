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
      eventId: btn.dataset.eventId,
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
    document.getElementById('modalFee').textContent = `Fee: ${event.FEE === "0" ? "FREE" : "₹" + event.FEE || '0'}`;
    document.getElementById('modalDate').textContent = `Date: ${event.STARTDATE}${event.ENDDATE ? ' - ' + event.ENDDATE : ''}`;
    document.getElementById('modalVenue').textContent = `Venue: ${event.VENUE || ''} | Type: ${event.EVENTTYPE || ''}`;

    const registerBtn = document.getElementById("registerBtn");

    // Set the event ID in the button's dataset
    registerBtn.dataset.eventId = event.eventId;

    // Show modal
    const modal = document.getElementById('eventModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // prevent background scroll

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

////////////////////////////////
//ALERT MESSAGE
////////////////////////////////

function showAlert(title, message) {
  const overlay = document.getElementById("alertOverlay");
  const titleEl = document.getElementById("alertTitle");
  const messageEl = document.getElementById("alertMessage");

  titleEl.textContent = title;
  messageEl.textContent = message;

  overlay.classList.remove("hidden");
  overlay.classList.add("flex");

  // Close on button click
  document.getElementById("alertClose").onclick = () => {
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
  };
}

/////////////////////////////////////
//SHOW CONFIRM
/////////////////////////////////////

function showConfirm(title, message) {
  return new Promise((resolve) => {
    const overlay = document.getElementById("confirmOverlay");
    const titleEl = document.getElementById("confirmTitle");
    const messageEl = document.getElementById("confirmMessage");
    const yesBtn = document.getElementById("confirmYes");
    const noBtn = document.getElementById("confirmNo");

    titleEl.textContent = title;
    messageEl.textContent = message;

    overlay.classList.remove("hidden");
    overlay.classList.add("flex");

    const cleanup = (result) => {
      overlay.classList.add("hidden");
      overlay.classList.remove("flex");
      yesBtn.onclick = noBtn.onclick = null;
      resolve(result);
    };

    yesBtn.onclick = () => cleanup(true);
    noBtn.onclick = () => cleanup(false);
  });
}

///////////////////////////////////////////
//REGISTER BUTTON
///////////////////////////////////////////

// Checkbox & Button logic
const checkbox = document.getElementById('agreeTerms');
const registerBtn = document.getElementById('registerBtn');

checkbox.addEventListener('change', () => {
  registerBtn.disabled = !checkbox.checked;
});

// Register button click
registerBtn.onclick = async () => {
  requireAuth(async ()=> {if (!window.userId) {
    alert("Please log in first!");
    return;
  }

  const eventId = registerBtn.dataset.eventId;

  try {
    console.log(eventId);
    const response = await fetch('/register-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: window.userId,
        eventId: eventId
      })
    });

    const result = await response.json();

    if (response.ok) {
      showAlert("INFO", result.message || "Successfully registered!");
    } else {
      showAlert(result.error || "Registration failed!");
    }
    } catch (err) {
      console.error(err);
      showAlert("OOPS!", "Something went wrong. Try again later.");
    }
    })};

        







