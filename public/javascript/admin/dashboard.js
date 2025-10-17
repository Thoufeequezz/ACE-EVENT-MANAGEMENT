function openDashboard(section) {
    document.getElementById("hide_for_dash").classList.add("hidden");
    document.getElementById("dashboardDiv").classList.remove("hidden");
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
    sidenav.style.left = '-100%';
}
    
function closeDashboard(section){
    const sidenav = document.getElementById('mobile-sidenav');
    sidenav.style.left = '-100%';
    document.getElementById("hide_for_dash").classList.remove("hidden");
    document.getElementById("dashboardDiv").classList.add("hidden");
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' })
}

////////////////////////////////////////////////////////
// Events section
////////////////////////////////////////////////////////
async function loadEvents() {
  const table = document.getElementById("dashEventsTable");
  table.innerHTML = ""; // clear table

  try {
      const res = await fetch("/admin/api/events");
      const events = await res.json();

      events.forEach(event => {
          const tr = document.createElement("tr");
          tr.className = "bg-gray-800 hover:bg-gray-700";

          // Create cells
          tr.innerHTML = `
            <td class="p-3">${event.TITLE}</td>
            <td class="p-3">${new Date(event.STARTDATE).toLocaleDateString()}</td>
            <td class="p-3">${new Date(event.ENDDATE).toLocaleDateString()}</td>
            <td class="p-3">${event.EVENTSTATUS}</td>
            <td class="p-3"><button class="glossy-btn edit-btn">Edit</button></td>
            <td class="p-3"><button class="glossy-btn-outline delete-btn">Delete</button></td>
          `;

          // Attach event listeners safely
          tr.querySelector(".edit-btn").addEventListener("click", () => editEvent(event));
          tr.querySelector(".delete-btn").addEventListener("click", () => deleteEvent(event.EVENTID));

          table.appendChild(tr);
      });
  } catch(err) {
      console.error("Failed to load events", err);
  }

// Registered events...
const selector = document.getElementById("dashEventSelector");

try {
  const res = await fetch("/admin/api/events");
  if (!res.ok) throw new Error("Failed to fetch events");

  const events = await res.json();
  console.log("Loaded events:", events);

  selector.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select an event";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selector.appendChild(defaultOption);

  events.forEach(event => {
    const option = document.createElement("option");
    option.value = event.EVENTID;
    option.textContent = event.TITLE;
    selector.appendChild(option);
  });
} catch (err) {
  console.error("Error loading events:", err);
}

}

// Load events on page load
window.addEventListener("DOMContentLoaded", loadEvents);

////////////////////////////////////////////////////////
// New Event
////////////////////////////////////////////////////////
const modal = document.getElementById("addEventModal");

function openAddEventModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeAddEventModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// Close modal on outside click
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeAddEventModal();
});

// Handle form submission with file upload
document.getElementById("addEventForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form); // FormData handles files automatically

  try {
    const res = await fetch("/admin/api/events/upload-event", {
      method: "POST",
      body: formData // Send FormData directly
    });

    if (!res.ok) throw new Error("Failed to add event");
    alert("Event added successfully!");
    closeAddEventModal();
    form.reset();
    loadEvents();
  } catch (err) {
    alert(err.message);
  }
});


//////////////////////////////////
//EDIT EVENT
//////////////////////////////////

// open edit modal
function editEvent(eventData) {
  const form = document.getElementById("editEventForm");

  // Fill the form fields
  document.getElementById("editTitle").value = eventData.TITLE;
  document.getElementById("editDescription").value = eventData.DESCRIPTION;
  document.getElementById("editFee").value = eventData.FEE;
  document.getElementById("editStartDate").value = eventData.STARTDATE.split("T")[0];
  document.getElementById("editEndDate").value = eventData.ENDDATE.split("T")[0];
  document.getElementById("editVenue").value = eventData.VENUE;
  document.getElementById("editType").value = eventData.EVENTTYPE;
  document.getElementById("editImagePreview").querySelector("img").src = eventData.IMAGE || "default.jpg";

  // Store the event ID in the form
  form.dataset.eventId = eventData.EVENTID;

  // Show the modal
  document.getElementById("editEventModal").classList.remove("hidden");
}

// Close Edit Modal
function closeEditEventModal() {
  document.getElementById("editEventModal").classList.add("hidden");
}


// Handle form submission with file upload
async function submitEditEvent(e) {
  e.preventDefault();
  const form = e.target;
  const eventId = form.dataset.eventId; // Stored in editEvent()
  const formData = new FormData(form);

  try {
    const res = await fetch(`/admin/api/events/edit-event/${eventId}`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Failed to edit levent");
    showAlert("ALERT!", "Event edited successfully!");
    closeEditEventModal();
    form.reset();
    loadEvents(); // refresh table
  } catch (err) {
    alert(err.message);
  }
}


document.getElementById("editEventForm").addEventListener("submit", submitEditEvent);


//////////////////////////////////
//DELETE EVENT
//////////////////////////////////

async function deleteEvent(id) {
    const confirmed = await showConfirm("Delete Event", "Are you sure you want to delete this event?");
    if (!confirmed) return;
    const res = await fetch(`/admin/api/events/${id}`, { method: "DELETE" });
    if(res.status === 200){
      //alert(`Event ${id} deleted sucsessfully`);
      showAlert("ALERT!",`Event ${id} deleted sucsessfully`);
    }
    loadEvents(); // reload table
}


