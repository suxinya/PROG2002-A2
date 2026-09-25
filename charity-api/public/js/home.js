const API_BASE = "http://localhost:3000/api";

const orgContentDiv = document.getElementById("orgContent");
const eventContainer = document.getElementById("eventContainer");
const errorBox = document.getElementById("errorBox");

function showError(message){
    errorBox.innerHTML = `<p class="error-message">${message}</p>`;
}

async function loadOrganisationInfo(){
    try{
        const res = await fetch(`${API_BASE}/org`);
        if(!res.ok) throw new Error("Failed fetch organisation data");
        const org = await res.json();
        orgContentDiv.innerHTML = `
            <p><strong>Mission:</strong> ${org.mission}</p>
            <p><strong>Contact:</strong> ${org.contact_email} | ${org.contact_phone}</p>
            <p>${org.description}</p>
        `;
    }catch(err){
        showError("Cannot load organisation information. " + err.message);
    }
}

async function loadEventList(){
    try{
        const resp = await fetch(`${API_BASE}/events`);
        if(!resp.ok) throw new Error("API request error");
        const allEvents = await resp.json();
        const activeEvents = allEvents.filter(e => e.status !== "disabled");
        eventContainer.innerHTML = "";

        activeEvents.forEach(event =>{
            const today = new Date();
            const eventDate = new Date(event.event_date);
            let statusText, statusClass;
            if(eventDate >= today){
                statusText = "Upcoming";
                statusClass = "event-status-upcoming";
            }else{
                statusText = "Ended";
                statusClass = "event-status-ended";
            }

            const cardDiv = document.createElement("div");
            cardDiv.className = "event-card";

            const statusSpan = document.createElement("span");
            statusSpan.className = statusClass;
            statusSpan.textContent = statusText;

            const h3 = document.createElement("h3");
            h3.textContent = event.event_name;

            const pLoc = document.createElement("p");
            pLoc.textContent = `Location: ${event.location}`;

            const pDate = document.createElement("p");
            pDate.textContent = `Date: ${event.event_date}`;

            const link = document.createElement("a");
            link.textContent = "View Event Details";
            link.href = `detail.html?id=${event.event_id}`;

            cardDiv.appendChild(statusSpan);
            cardDiv.appendChild(h3);
            cardDiv.appendChild(pLoc);
            cardDiv.appendChild(pDate);
            cardDiv.appendChild(link);
            eventContainer.appendChild(cardDiv);
        })
    }catch(error){
        showError("Error loading events: " + error.message);
    }
}

window.onload = function(){
    loadOrganisationInfo();
    loadEventList();
}