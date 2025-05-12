// const counter = 1;
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("help-request-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // // 1. جمع البيانات من النموذج:
    // const request = {
    //   // id = Date.now() // معرف فريد
    //   id: "reg_1" + count++,
    //   img: "../img/Photo (1).png",
    //   "card-title": document.getElementById("title").value.trim(),
    //   "card-desc": document.getElementById("description").value.trim(),
    //   "card-longDesc": "",
    //   "desc-after-pay":
    //     "تبرعك ساهم في تقريب عائلة من العلاج ومنحها فرصة جديدة للحياة.",
    //   "card-category": document.getElementById("type").value,
    //   collected: 200, // هذا مش عارفة كيف يكون تلقائي بيدخل
    //   goal: document.getElementById("amount").value.trim(),
    //   type: "urgent",
    //   priority: document.getElementById("priority").value,
    //   name: "عاجل | حالة جديدة ", // لو فيه خيار عاجل ومش عارفة يكون بالزبط  شو بتفرق
    //   status: "pending", // هانا تدخل يديويا او بنعمللها زي دالة لما يصل المبلغ الي الهدف بتصير منيهة
    //   proofFiles: document.getElementById("proof-files").files,
    //   extra: document.querySelector(".extra-details"), // هذا الاشي مش عارفة شو هخليه بيفرق عن الوضف الطويل +
    //   // هي وملفات الاثبات والمتبرعون مش عارفة ميف بيكونوا مصفوفة او اوبجكت
    // };

    // هذا اللي كان قبل
    const title = document.getElementById("title").value.trim();
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value;
    const files = document.getElementById("proof-files").files;

    // 2. احضار المصفوفة القديمة أو إنشاء مصفوفة جديدة
    // let requests = JSON.parse(localStorage.getItem("helpRequests")) || [];

    // 3. إضافة الطلب الجديد
    // requests.push(request);

    // 4. حفظها مجددًا
    localStorage.setItem("helpRequests", JSON.stringify(requests));

    if (!title || !type || !amount || !description || !priority) {
      alert("يرجى تعبئة جميع الحقول المطلوبة.");
      return;
    }
    const form = e.target;
    const formData = new FormData(form);

    fetch("https://example.com/api/help-request", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("✅ تم إرسال الطلب بنجاح!");
          form.reset();
        } else {
          alert("❌ فشل في الإرسال: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("🚫 حدث خطأ في الاتصال بالسيرفر.");
      });

    alert("تم تقديم الطلب بنجاح! (تجريبي)");
    form.reset();
  });

  const fileInput = document.getElementById("proof-files");
  const filePreview = document.getElementById("file-preview");
  const clearAllBtn = document.getElementById("clear-all-btn");

  let selectedFiles = [];

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
        img.src = URL.createObjectURL(file);
        img.onload = () => URL.revokeObjectURL(img.src);
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
    const amount = document.getElementById("amount").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value;

    if (!title || !type || !amount || !description || !priority) {
      alert("يرجى تعبئة جميع الحقول قبل المعاينة.");
      return;
    }

    let previewHtml = `
      <p><strong>📌 العنوان:</strong> ${title}</p>
      <p><strong>📂 نوع المساعدة:</strong> ${type}</p>
      <p><strong>💰 المبلغ المطلوب:</strong> ${amount} شيكل</p>
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
          previewHtml += `<img src="${imgUrl}" class="preview-img" onload="URL.revokeObjectURL(this.src)">`;
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

  const confirmSubmitBtn = document.getElementById("confirm-submit-btn");

  confirmSubmitBtn.addEventListener("click", function () {
    document.getElementById("preview-modal").style.display = "none";
    form.requestSubmit();

    setTimeout(() => {
      alert("تم إرسال الطلب بنجاح!");
    }, 500);
  });
});
