document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("request-form");
  let selectedFiles = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const desc = document.getElementById("description").value.trim();
    const longDesc = document.getElementById("extra").value.trim();
    const category = document.getElementById("type").value;
    const goal = parseFloat(document.getElementById("goal").value);
    const priority = document.querySelector("#priority").value;
    const files = selectedFiles;
    const extra = document.getElementById("type").value;

    const newRequestData = {
      title,
      desc,
      longDesc,
      category,
      goal,
      priority,
      files,
      extra,
    };

    convertFilesToBase64(newRequestData.files).then((base64Files) => {
      newRequestData.files = base64Files;
      addNewRequest(newRequestData);
      alert("تم إرسال الطلب بنجاح.");
      form.reset();
      selectedFiles = [];
      renderPreviews();
      setTimeout(() => (window.location.href = "../my-request.htm"), 2000);
    });
  });

  function addNewRequest(newRequestData) {
    let allRequests = JSON.parse(localStorage.getItem("aidRequests")) || [];

    const lastId =
      allRequests.length > 0
        ? allRequests[allRequests.length - 1].id
        : "reg_1_0";
    const newId = "reg_1_" + (parseInt(lastId.split("_")[2] || 0) + 1);

    // مصفوفة الصور العشوائية داخل مجلد الصور
    const randomImages = [
      "../img/Photo (1).png",
      "../img/Photo (2).png",
      "../img/Photo (3).png",
      "../img/Photo (4).png",
      "../img/Photo (5).png",
      "../img/Photo (6).png",
      "../img/Photo (7).png",
      "../img/Photo (8).png",
      "../img/Photo (9).png",
    ];

    // اختيار صورة عشوائية
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    const randomImage = randomImages[randomIndex];

    const newRequest = {
      id: newId,
      img: randomImage,
      "card-title": newRequestData.title,
      "card-desc": newRequestData.desc,
      "card-longDesc": newRequestData.longDesc,
      "desc-after-pay": "",
      type: "new",
      name: "حالة جديدة",
      "card-category": newRequestData.category,
      date: new Date().toLocaleDateString("ar-EG"),
      collected: 0,
      goal: newRequestData.goal,
      proofFiles: newRequestData.files || [],
      extra: newRequestData.extra || {},
      donors: [],
      status: "الحالة : قيد التنفيذ",
      ownerEmail: localStorage.getItem("tempEmail") || "unknown",
    };

    allRequests.push(newRequest);
    localStorage.setItem("aidRequests", JSON.stringify(allRequests));
    localStorage.setItem("selectedHelpId", newId);
  }

  const fileInput = document.getElementById("proof-files");
  const filePreview = document.getElementById("file-preview");
  const clearAllBtn = document.getElementById("clear-all-btn");

  // لنجاح عرض الملفات
  function convertFilesToBase64(files) {
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            name: file.name,
            type: file.type,
            size: file.size,
            content: reader.result, // هذا هو Base64
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    return Promise.all(promises);
  }

  // الدوال الخاصة بعرض الملفات
  fileInput.addEventListener("change", function () {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const newFiles = Array.from(fileInput.files);

    const invalidFiles = newFiles.filter(
      (file) => !allowedTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      alert(
        "بعض الملفات غير مسموح بها. يرجى رفع صور JPG/PNG أو ملفات PDF فقط."
      );
      return;
    }

    selectedFiles = [...selectedFiles, ...newFiles];
    renderPreviews();
  });

  clearAllBtn.addEventListener("click", () => {
    selectedFiles = [];
    renderPreviews();
    fileInput.value = "";
  });

  function renderPreviews() {
    filePreview.innerHTML = "";

    if (selectedFiles.length === 0) {
      clearAllBtn.style.display = "none";
      return;
    }

    selectedFiles.forEach((file, index) => {
      const fileCard = document.createElement("div");
      fileCard.className = "file-preview-item";

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "❌";
      removeBtn.className = "remove-btn";
      removeBtn.onclick = () => {
        selectedFiles.splice(index, 1);
        renderPreviews();
      };
      fileCard.appendChild(removeBtn);

      const fileIcon = document.createElement("div");
      fileIcon.classList.add("file-icon");
      fileIcon.textContent = "📎";

      fileCard.appendChild(fileIcon);

      if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        const objectURL = URL.createObjectURL(file);
        img.src = objectURL;

        img.onload = () => {
          if (window.URL && window.URL.revokeObjectURL) {
            window.URL.revokeObjectURL(objectURL);
          }
        };

        fileCard.appendChild(img);
      } else {
        const fileName = document.createElement("span");
        fileName.textContent = `📄 ${file.name}`;
        fileCard.appendChild(fileName);
      }

      filePreview.appendChild(fileCard);
    });

    clearAllBtn.style.display = "inline-block";
    updateInputFiles();
  }

  function updateInputFiles() {
    const dataTransfer = new DataTransfer();
    selectedFiles.forEach((file) => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;
  }

  document
    .getElementById("preview-btn")
    .addEventListener("click", previewRequest);

  // زر لمعاينة
  function previewRequest() {
    const title = document.getElementById("title").value.trim();
    const type = document.getElementById("type").value;
    const goal = document.getElementById("goal").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value;

    if (!title || !type || !goal || !description || !priority) {
      alert("يرجى تعبئة جميع الحقول قبل المعاينة.");
      return;
    }

    let previewHtml = `
    <p><strong>📌 العنوان:</strong> ${title}</p>
    <p><strong>📂 نوع المساعدة:</strong> ${type}</p>
    <p><strong>💰 المبلغ المطلوب:</strong> ${goal} شيكل</p>
    <p><strong>🧾 الوصف:</strong> ${description}</p>
    <p><strong>⚡ أولوية الطلب:</strong> ${priority}</p>
    <hr>
    <p><strong>📎 الملفات المرفقة:</strong></p>
    <div class="preview-files-container">
  `;

    if (selectedFiles.length === 0) {
      previewHtml += `<p>لا توجد ملفات مرفقة.</p>`;
    } else {
      selectedFiles.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const imgUrl = URL.createObjectURL(file);
          previewHtml += `<img src="${imgUrl}" class="preview-img" onload="if(window.URL && window.URL.revokeObjectURL){ window.URL.revokeObjectURL(this.src); }">`;
        } else {
          previewHtml += `<p>📄 ${file.name}</p>`;
        }
      });
    }

    previewHtml += `</div>`;

    document.getElementById("preview-details").innerHTML = previewHtml;
    document.getElementById("preview-modal").style.display = "block";
  }

  document
    .getElementById("close-preview")
    .addEventListener("click", function () {
      document.getElementById("preview-modal").style.display = "none";
    });

  window.addEventListener("click", function (e) {
    const modal = document.getElementById("preview-modal");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  let logout = document.querySelector(".logout");
  logout.addEventListener("click", () => window.open("../login.htm", "_self"));
});
