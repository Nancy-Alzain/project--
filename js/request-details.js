document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const requestId = urlParams.get("id");

  let selectedRequest =
    JSON.parse(localStorage.getItem("selectedRequest")) || null;

  if (!selectedRequest || selectedRequest.id != requestId) {
    const allRequests = JSON.parse(localStorage.getItem("allRequests")) || [];
    selectedRequest = allRequests.find((r) => r.id == requestId);
  }

  if (!selectedRequest) {
    alert("لم يتم العثور على تفاصيل الحالة.");
    window.location.href = "my-request.htm";
    return;
  }

  document.getElementById("detail-title").textContent =
    selectedRequest["card-title"];
  document.getElementById("detail-desc").textContent =
    selectedRequest["card-desc"];
  document.getElementById("detail-category").textContent =
    selectedRequest["card-category"];
  document.getElementById("detail-date").textContent =
    selectedRequest.date || "غير محدد";

  const formatCurrency = (amount) => {
    if (typeof amount !== "number") return "0";
    return amount < 1000 ? `${amount}` : `${amount.toLocaleString("en-US")}`;
  };

  const percentage = Math.min(
    (selectedRequest.collected / selectedRequest.goal) * 100,
    100
  );
  document.getElementById("detail-progress-bar").style.width = `${percentage}%`;
  document.getElementById(
    "detail-progress-text"
  ).textContent = `تم جمع ${formatCurrency(
    selectedRequest.collected
  )}$ من أصل ${formatCurrency(selectedRequest.goal)}$`;

  document.getElementById("detail-img").src =
    selectedRequest.img || "default-image.jpg";

  document.getElementById("help-badge").textContent = selectedRequest.status;

  let req_status = document.getElementById("request-status");
  req_status.className = "request-status";
  req_status.classList.add(
    `${
      selectedRequest.goal === selectedRequest.collected
        ? "finished"
        : "pending"
    }`
  );
  req_status.textContent = `${
    selectedRequest.goal !== selectedRequest.collected
      ? "الحالة : قيد الانتظار "
      : "الحالة : منتهية"
  }`;

  // ======== عرض ملفات الإثبات بشكل متقدم ==========
  const container = document.getElementById("proof-files-container");
  container.innerHTML = "";

  if (selectedRequest.proofFiles?.length > 0) {
    selectedRequest.proofFiles.forEach((file) => {
      const div = document.createElement("div");
      div.classList.add("proof-file");

      if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = file.content;
        img.alt = file.name;
        img.classList.add("proof-image");

        // عند الضغط، عرض بالحجم الكامل
        // img.addEventListener("click", () => {
        //   const fullWindow = window.open();
        //   // fullWindow.document.write(
        //   //   `<img src="${file.content}" style="width:100%">`
        //   // );
        //   fullWindow.document.title = file.name;
        // });

        div.appendChild(img);
      } else if (file.type === "application/pdf") {
        const viewLink = document.createElement("a");
        viewLink.href = file.content;
        viewLink.target = "_blank";
        viewLink.textContent = `عرض الملف (${file.name})`;
        viewLink.classList.add("proof-download");
        div.appendChild(viewLink);
      } else {
        const link = document.createElement("a");
        link.href = file.content;
        link.download = file.name;
        link.textContent = `تحميل الملف (${file.name})`;
        link.classList.add("proof-download");
        div.appendChild(link);
      }

      container.appendChild(div);
    });
  } else {
    const msg = document.createElement("p");
    msg.textContent = "لم يتم إرفاق ملفات إثبات.";
    msg.classList.add("empty-message");
    container.appendChild(msg);
  }

  // ========= عرض المساهمين ============
  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
      { label: "ثانية", seconds: 1 },
      { label: "دقيقة", seconds: 60 },
      { label: "ساعة", seconds: 3600 },
      { label: "يوم", seconds: 86400 },
      { label: "شهر", seconds: 2592000 },
      { label: "سنة", seconds: 31536000 },
    ];

    let counter;
    for (let i = intervals.length - 1; i >= 0; i--) {
      counter = Math.floor(seconds / intervals[i].seconds);
      if (counter >= 1) {
        const label = intervals[i].label;
        return `قبل ${arabicPlural(counter, label)}`;
      }
    }

    return "الآن";
  }

  function arabicPlural(count, label) {
    if (count === 1) return `${label}`;
    if (count === 2) {
      if (label === "يوم") return "يومين";
      if (label === "ساعة") return "ساعتين";
      if (label === "دقيقة") return "دقيقتين";
      if (label === "ثانية") return "ثانيتين";
      if (label === "شهر") return "شهرين";
      if (label === "سنة") return "سنتين";
    }
    if (count >= 3 && count <= 10) {
      if (label === "يوم") return `${count} أيام`;
      if (label === "ساعة") return `${count} ساعات`;
      if (label === "دقيقة") return `${count} دقائق`;
      if (label === "ثانية") return `${count} ثوانٍ`;
      if (label === "شهر") return `${count} أشهر`;
      if (label === "سنة") return `${count} سنوات`;
    }
    return `${count} ${label}`;
  }

  const donorsContainer = document.getElementById("donors-list");
  donorsContainer.innerHTML = "";

  if ((selectedRequest.donors || []).length > 0) {
    (selectedRequest.donors || []).forEach((donor) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${donor.name}</span>
        <span>${donor.amount} شيكل</span>
        <span>${timeAgo(donor.date)}</span>
      `;
      donorsContainer.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "لا توجد مساهمات حتى الآن.";
    li.classList.add("empty-message");
    donorsContainer.appendChild(li);
  }

  // ######## عند النقر على ازار المواقع لمشاركة الحالة مع الاصدقاء #######

  const pageUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("تفاصيل مساعدة مهمة! شاهدوها الآن 👇");

  // روابط المشاركة
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  const whatsappLink = `https://wa.me/?text=${shareText}%20${pageUrl}`;
  const xLink = `https://twitter.com/intent/tweet?text=${shareText}%20${pageUrl}`;

  // ضبط الروابط على الأيقونات
  document.querySelector(".icon.facebook").href = facebookLink;
  document.querySelector(".icon.whatsapp").href = whatsappLink;
  document.querySelector(".icon.x").href = xLink;
});

// تكبير الصورة باستخدام Modal
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("proof-image")) {
    modal.style.display = "block";
    modalImg.src = e.target.src;
  }
});

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// التنقل بين الصور اذا فيه اكثر من صورة
let currentImageIndex = 0;
let allProofImages = [];

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("proof-image")) {
    allProofImages = Array.from(document.querySelectorAll(".proof-image"));
    currentImageIndex = allProofImages.indexOf(e.target);

    showImageInModal(currentImageIndex);
    modal.style.display = "block";
  }
});

function showImageInModal(index) {
  if (index >= 0 && index < allProofImages.length) {
    modalImg.src = allProofImages[index].src;
  }
}

document.querySelector(".prev").onclick = function () {
  currentImageIndex =
    (currentImageIndex - 1 + allProofImages.length) % allProofImages.length;
  showImageInModal(currentImageIndex);
};

document.querySelector(".next").onclick = function () {
  currentImageIndex = (currentImageIndex + 1) % allProofImages.length;
  showImageInModal(currentImageIndex);
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// // عند النقر على "تفاصيل اضافية" بيصير
// function toggleExtraDetails() {
//   const content = document.getElementById("extra-content");
//   const arrow = document.getElementById("arrow");
//   const isVisible = content.style.display === "block";

//   content.style.display = isVisible ? "none" : "block";
//   arrow.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
// }

// دالة لتبديل إظهار التفاصيل الإضافية
// function renderExtraDetails(extraData) {
//   const extraList = document.getElementById("extra-list");
//   extraList.innerHTML = "";

//   if (extraData && typeof extraData === "object") {
//     for (let key in extraData) {
//       const li = document.createElement("li");
//       li.innerHTML = `<strong>${key}:</strong> ${extraData[key]}`;
//       extraList.appendChild(li);
//     }
//   } else {
//     const li = document.createElement("li");
//     li.textContent = "لا توجد تفاصيل إضافية متوفرة.";
//     li.classList.add("empty-message");
//     extraList.appendChild(li);
//   }
// }

// renderExtraDetails(selectedRequest.extra);

// دالة لتبديل إظهار التفاصيل الإضافية
// function toggleExtraDetails() {
//   const extraContent = document.getElementById("extra-content");
//   const arrow = document.getElementById("arrow");

//   if (
//     extraContent.style.display === "none" ||
//     extraContent.style.display === ""
//   ) {
//     extraContent.style.display = "block";
//     arrow.textContent = "▲";
//   } else {
//     extraContent.style.display = "none";
//     arrow.textContent = "▼";
//   }
// }

//

// تفاصيل إضافية
// const extraContent = document.getElementById("extra-content");
// const extraList = document.getElementById("extra-list");
// selectedRequest.extraDetails.forEach((detail) => {
//   const li = document.createElement("li");
//   li.textContent = detail;
//   extraList.appendChild(li);
// });
