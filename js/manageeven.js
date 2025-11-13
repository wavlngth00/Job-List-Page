document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".job-title");
  const jobName = localStorage.getItem("selectedJobName");

  if (title && jobName) {
    title.textContent = jobName;
  } else {
    title.textContent = "Job Title Not Found";
  }
});

const candidates = [
  {
    full_name: "Aurelie Yukiko",
    email: "aurelieyukiko@yahoo.com",
    phone: "082120908766",
    date_of_birth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Female",
    linkedin: "https://www.linkedin.com/in/user1",
  },
  {
    full_name: "Dityo Hendyawan",
    email: "dityohendyawan@yahoo.com",
    phone: "081184180678",
    date_of_birth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Female",
    linkedin: "https://www.linkedin.com/in/user2",
  },
  {
    full_name: "Mira Workman",
    email: "miraworkman@yahoo.com",
    phone: "081672007108",
    date_of_birth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Female",
    linkedin: "https://www.linkedin.com/in/user3",
  },
  {
    full_name: "Paityn Culhane",
    email: "paitynculhane@yahoo.com",
    phone: "081521500714",
    date_of_birth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedin: "https://www.linkedin.com/in/user4",
  },
  {
    full_name: "Emerson Baptista",
    email: "emersonbaptista@yahoo.com",
    phone: "082167008244",
    date_of_birth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedin: "https://www.linkedin.com/in/user5",
  },
  {
    full_name: "Indra Zein",
    email: "indrazein@yahoo.com",
    phone: "081181630568",
    date_of_birth: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedin: "https://www.linkedin.com/in/user6",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("candidate-section");

  const table = document.createElement("table");
  table.classList.add("candidate-table");

  table.innerHTML = `
    <thead>
      <tr>
        <th><input type="checkbox" id="selectAll" /></th>
        <th>NAMA LENGKAP</th>
        <th>EMAIL ADDRESS</th>
        <th>PHONE NUMBERS</th>
        <th>DATE OF BIRTH</th>
        <th>DOMICILE</th>
        <th>GENDER</th>
        <th>LINK LINKEDIN</th>
      </tr>
    </thead>
    <tbody>
      ${candidates
        .map(
          (c) => `
        <tr>
          <td><input type="checkbox" class="row-check" /></td>
          <td>${c.full_name}</td>
          <td>${c.email}</td>
          <td>${c.phone}</td>
          <td>${c.date_of_birth}</td>
          <td>${c.domicile}</td>
          <td>${c.gender}</td>
          <td><a href="${c.linkedin}" target="_blank">${c.linkedin}</a></td>
        </tr>`
        )
        .join("")}
    </tbody>
  `;

  section.appendChild(table);

  const selectAll = document.getElementById("selectAll");
  selectAll.addEventListener("change", (e) => {
    const checked = e.target.checked;
    document.querySelectorAll(".row-check").forEach((cb) => {
      cb.checked = checked;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const jobListBtn = document.querySelector(".btn");

  if (jobListBtn) {
    jobListBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});
