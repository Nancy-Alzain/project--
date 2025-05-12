document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("selectedRequest"));

  if (!data) {
    document.querySelector(".container").innerHTML =
      "<p>لا توجد بيانات لعرضها.</p>";
    return;
  }

  document.getElementById("request-image").src = data.img;
  document.getElementById("request-title").textContent = data["card-title"];
  document.getElementById("request-type").textContent = data["card-category"];
  document.getElementById("request-amount").textContent = data.goal;
  document.getElementById("request-status").textContent = data.status;
  document.getElementById("request-priority").textContent = data.name;
  document.getElementById("request-description").textContent =
    data["card-desc"];

  const evidenceContainer = document.getElementById("evidence-files");
  if (data.evidence && data.evidence.length > 0) {
    data.evidence.forEach((fileUrl) => {
      const img = document.createElement("img");
      img.src = fileUrl;
      evidenceContainer.appendChild(img);
    });
  } else {
    evidenceContainer.innerHTML = "<p>لا توجد ملفات إثبات.</p>";
  }
});
