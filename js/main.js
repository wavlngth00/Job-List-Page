const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search input");

if (searchBtn && searchInput) {
  searchBtn.addEventListener("click", () => searchInput.focus());
}

const modal = document.getElementById("jobModal");
const openBtns = document.querySelectorAll(".btn-create, .btn-small");
const closeBtn = document.querySelector(".close-btn");

openBtns.forEach((btn) => {
  btn.addEventListener("click", () => (modal.style.display = "flex"));
});

if (closeBtn) {
  closeBtn.addEventListener("click", () => (modal.style.display = "none"));
}

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

const jobList = document.getElementById("jobList");
const emptyState = document.getElementById("emptyState");
const jobForm = document.querySelector(".job-form");
let jobs = [];

function saveJobsToLocal() {
  const data = {
    jobs,
    timestamp: Date.now(),
  };
  localStorage.setItem("jobData", JSON.stringify(data));
}

function loadJobsFromLocal() {
  const saved = localStorage.getItem("jobData");
  if (!saved) return;
  const data = JSON.parse(saved);
  const now = Date.now();
  const diff = now - data.timestamp;

  if (diff < 120000) {
    jobs = data.jobs || [];
    renderJobs();
  } else {
    localStorage.removeItem("jobData");
  }
}

function renderJobs() {
  jobList.innerHTML = "";

  if (jobs.length === 0) {
    jobList.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }

  jobList.classList.remove("hidden");
  emptyState.classList.add("hidden");

  jobs.forEach((job) => {
    const card = document.createElement("div");
    card.classList.add("job-card");
    card.innerHTML = `
      <div class="job-info">
        <span class="status inactive">Inactive</span>
        <span class="date">started on ${job.date}</span>
        <h3>${job.name}</h3>
        <p>${job.salaryMin} - ${job.salaryMax}</p>
      </div>
      <button class="btn-manage">Manage Job</button>
    `;
    jobList.appendChild(card);
  });
}

if (jobForm) {
  jobForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = jobForm
      .querySelector('input[placeholder="Ex. Front End Engineer"]')
      .value.trim();
    const salaryMin =
      jobForm.querySelector('input[placeholder="Rp 7.000.000"]').value.trim() ||
      "Rp -";
    const salaryMax =
      jobForm.querySelector('input[placeholder="Rp 8.000.000"]').value.trim() ||
      "Rp -";

    if (!name) return alert("Please enter a job title before publishing!");

    const newJob = {
      name,
      salaryMin,
      salaryMax,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    jobs.push(newJob);
    renderJobs();
    saveJobsToLocal();

    modal.style.display = "none";
    jobForm.reset();

    const notif = document.createElement("div");
    notif.textContent = "✅ Job vacancy successfully created!";
    Object.assign(notif.style, {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#fff",
      border: "1px solid #ccc",
      padding: "0.6rem 1rem",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      fontSize: "0.9rem",
      zIndex: "9999",
    });
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2500);
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-manage")) {
    const card = e.target.closest(".job-card");
    const jobName = card.querySelector("h3").textContent.trim();
    localStorage.setItem("selectedJobName", jobName);

    let manageClickCount =
      parseInt(localStorage.getItem("manageClickCount")) || 0;
    manageClickCount++;
    localStorage.setItem("manageClickCount", manageClickCount);

    saveJobsToLocal();

    if (manageClickCount % 2 === 1) {
      window.location.href = "manageodd.html";
    } else {
      window.location.href = "manageeven.html";
    }
  }
});

document.addEventListener("DOMContentLoaded", loadJobsFromLocal);
