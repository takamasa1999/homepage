let lastId = null;
let isLoading = false;
let hasMore = true;

// Load main elements globally
const loader = document.getElementById("loader");
const tableBottom = document.getElementById("table-bottom");
const table = document.getElementById("stt-table");

async function getSTT() {
    NProgress.start();
    if (isLoading || !hasMore) return;
    isLoading = true;

    try {
        const url = new URL("https://api.repainter.net/get-stt");
        if (lastId !== null) {
            url.searchParams.append("after_id", lastId);
        }

        const res = await fetch(url, {
            method: "GET",
        });
        const sttData = await res.json();

        if (sttData.length === 0) {
            hasMore = false;
            observer.unobserve(tableBottom); // stop observing if no more data
            return;
        }

        sttData.forEach((item) => {
            const row = document.createElement("div");
            row.className = "row table-row";
            row.id = item.id;

            const dateCol = document.createElement("h5");
            dateCol.className = "column-25 date-column";
            dateCol.textContent = new Date(item.created_at + "Z").toLocaleString();

            const textCol = document.createElement("p");
            textCol.className = "column-offset-25";
            textCol.textContent = item.text;

            row.appendChild(dateCol);
            row.appendChild(textCol);

            table.appendChild(row);
        });

        lastId = sttData[sttData.length - 1].id;

        // Keep loading until loader is pushed below viewport
        requestIdleCallback(() => {
            const tableBottomRect = tableBottom.getBoundingClientRect();
            if (tableBottomRect.top < window.innerHeight && hasMore) {
                getSTT();
            }
        });
    } catch (error) {
        console.error("Error loading STT:", error);
    } finally {
        isLoading = false;
        NProgress.done();
    }
}

// Lazy load table history
function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            getSTT();
        }
    });
}
const observer = new IntersectionObserver(handleIntersection, {
    // rootMargin: "100px",
});
observer.observe(tableBottom);

// Initial load
getSTT();

// Update table data with Server-Sent Events
const sttUpdateEvents = new EventSource("https://api.repainter.net/stt-table-updates");
console.log("STT Cloud is running");
sttUpdateEvents.addEventListener("message", (e) => {
    const newData = JSON.parse(e.data)
    const row = document.createElement("div");
    row.className = "row table-row";
    row.id = newData.id;

    const dateCol = document.createElement("h5");
    dateCol.className = "column-25 date-column";
    dateCol.textContent = new Date(newData.created_at + "Z").toLocaleString();

    const textCol = document.createElement("p");
    textCol.className = "column-offset-25";
    textCol.textContent = newData.text;

    row.appendChild(dateCol);
    row.appendChild(textCol);

    table.prepend(row);
    var notyf = new Notyf({
        duration: 3000,
        position: {
            x: 'right',
            y: 'top',
        },
        types: [
            {
                type: 'success',
                icon: false
            }]
    });
    notyf.success('New transcription available. ☝️');
});
