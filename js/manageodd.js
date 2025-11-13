document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".job-title");
  const jobName = localStorage.getItem("selectedJobName");

  if (title && jobName) {
    title.textContent = jobName;
  } else {
    title.textContent = "Job Title Not Found";
  }
});

console.log("Dashboard loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
  const jobListBtn = document.querySelector(".btn");

  if (jobListBtn) {
    jobListBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});
