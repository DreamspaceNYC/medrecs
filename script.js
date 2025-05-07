/* MediSecure – minimal interactive behaviour (sidebar, modals, theme) */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- sidebar navigation ---------- */
  document.querySelectorAll("a[id$='-link']").forEach(link => {
    link.addEventListener("click", () => {
      const viewId = link.id.replace("-link", "-view");
      /* hide all views, show the selected one */
      document.querySelectorAll("main > div").forEach(v => v.classList.add("hidden"));
      document.getElementById(viewId)?.classList.remove("hidden");

      /* update page title */
      document.getElementById("page-title").textContent = link.textContent.trim();

      /* highlight active link */
      document.querySelectorAll("a[id$='-link']").forEach(l => 
        l.classList.remove("bg-blue-50", "text-blue-600"));
      link.classList.add("bg-blue-50", "text-blue-600");
    });
  });

  /* ---------- modal helpers ---------- */
  const show = id => document.getElementById(id)?.classList.remove("hidden");
  const hide = id => document.getElementById(id)?.classList.add("hidden");

  /* Patient modal */
  document.getElementById("new-patient-btn")?.addEventListener("click", () => show("patient-modal"));
  document.getElementById("cancel-patient-btn")?.addEventListener("click", () => hide("patient-modal"));

  /* Record modal */
  document.getElementById("new-record-btn")?.addEventListener("click", () => show("record-modal"));
  document.getElementById("cancel-record-btn")?.addEventListener("click", () => hide("record-modal"));

  /* QR modal */
  document.getElementById("generate-qr-btn")?.addEventListener("click", () => show("qr-modal"));
  document.getElementById("close-qr-btn")?.addEventListener("click", () => hide("qr-modal"));

  /* Emergency modal */
  document.getElementById("emergency-access-btn")?.addEventListener("click", () => show("emergency-modal"));
  document.getElementById("cancel-emergency-btn")?.addEventListener("click", () => hide("emergency-modal"));

  /* ---------- theme (dark / light) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  themeToggle?.addEventListener("click", () => {
    const htmlTag = document.documentElement;
    htmlTag.classList.toggle("dark");
    localStorage.setItem("theme", htmlTag.classList.contains("dark") ? "dark" : "light");
  });
  if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.remove("dark");
  }

  /* ---------- demo data for tables ---------- */
  function populateTable(tbodyId, rows) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    tbody.innerHTML = "";
    for (let i = 0; i < rows; i++) {
      tbody.insertAdjacentHTML("beforeend", `
        <tr class="border-b hover:bg-gray-50">
          <td class="p-4">#P-${1000 + i}</td>
          <td class="p-4">John Doe ${i}</td>
          <td class="p-4">${20 + i}</td>
          <td class="p-4">${i % 2 ? "Male" : "Female"}</td>
          <td class="p-4">2025‑05‑${(i % 30) + 1}</td>
          <td class="p-4"><span class="text-sm bg-green-200 text-green-800 px-2 py-1 rounded">Active</span></td>
          <td class="p-4"><button class="text-blue-500">View</button></td>
        </tr>`);
    }
  }

  populateTable("patients-table-body", 10);
  populateTable("appointments-table-body", 10);
});