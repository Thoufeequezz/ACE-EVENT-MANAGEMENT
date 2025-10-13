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

            tr.innerHTML = `
                <td class="p-3">${event.TITLE}</td>
                <td class="p-3">${new Date(event.STARTDATE).toLocaleDateString()}</td>
                <td class="p-3">${new Date(event.ENDDATE).toLocaleDateString()}</td>
                <td class="p-3">${event.EVENTSTATUS}</td>
                <td class="p-3">
                    <button class="glossy-btn" onclick="editEvent(${event.EVENTID})">Edit</button>
                </td>
                <td class="p-3">
                  <button class="glossy-btn-outline" onclick="deleteEvent(${event.EVENTID})">Delete</button>
                </td>
            `;
            table.appendChild(tr);
        });
    } catch(err) {
        console.error("Failed to load events", err);
    }
}

async function deleteEvent(id) {
    if (!confirm("Are you sure you want to delete this event?")) return;
    const res = await fetch(`/admin/api/events/${id}`, { method: "DELETE" });
    if(res.status === 200){
      alert(`Event ${id} deleted sucsessfully`);
    }
    loadEvents(); // reload table
}

function editEvent(id) {
    alert("Open edit modal for event " + id);
    // Implement your edit modal logic here
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
          // TODO: Update events table dynamically if needed
        } catch (err) {
          alert(err.message);
        }
      });