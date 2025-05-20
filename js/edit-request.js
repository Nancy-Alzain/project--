document.addEventListener("DOMContentLoaded", function () {
  const userEmail = localStorage.getItem("tempEmail") || "";
  // userType = localStorage.getItem("userType");

  if (!userEmail || !localStorage.getItem("userType")) {
    alert("يجب تسجيل الدخول أولاً");
    window.location.href = "login.htm";
    // return;
  }
  const form = document.getElementById("edit-help-form");
  const titleInput = document.getElementById("title");
  const typeInput = document.getElementById("type");
  const amountInput = document.getElementById("amount");
  const priorityInput = document.getElementById("priority");
  // const statusInput = document.getElementById("status");
  const descriptionInput = document.getElementById("description");
  const imageInput = document.getElementById("image");
  const replaceProofInput = document.getElementById("replaceProof");
  const addProofInput = document.getElementById("addProof");

  let aidRequests = JSON.parse(localStorage.getItem("aidRequests")) || [];
  const selectedRequest = JSON.parse(localStorage.getItem("selectedRequest"));
  if (!selectedRequest) {
    alert("لم يتم تحديد حالة للتعديل.");
    window.location.href = "my-request.htm";
    return;
  }

  if (selectedRequest.img) {
    document.getElementById("current-image-preview").innerHTML = `
      <p>الصورة الحالية:</p>
      <img src="${selectedRequest.img}" alt="صورة الحالة" style="max-width: 200px; border: 1px solid #ccc; border-radius: 5px;">
    `;
  }

  if (selectedRequest.proofFiles && Array.isArray(selectedRequest.proofFiles)) {
    const container = document.getElementById("current-proof-preview");
    container.innerHTML = "<p>ملفات الإثبات الحالية:</p>";
    selectedRequest.proofFiles.forEach((file) => {
      const fileLink = document.createElement("a");
      fileLink.href = file.content;
      fileLink.target = "_blank";
      fileLink.textContent = `📎 ${file.name}`;
      fileLink.style.display = "block";
      fileLink.style.color = "#007bff";
      fileLink.style.fontWeight = "bold";
      container.appendChild(fileLink);
    });
  }

  titleInput.value = selectedRequest["card-title"] || "";
  typeInput.value = selectedRequest["card-category"] || "";
  amountInput.value = selectedRequest.goal || "";
  priorityInput.value = selectedRequest.priority || "medium";
  // statusInput.value = selectedRequest.status || "new";
  descriptionInput.value = selectedRequest["card-desc"] || "";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (
      !titleInput.value.trim() ||
      !typeInput.value.trim() ||
      !amountInput.value
    ) {
      alert("يرجى تعبئة الحقول الأساسية: العنوان، النوع، المبلغ.");
      return;
    }

    selectedRequest["card-title"] = titleInput.value.trim();
    selectedRequest["card-category"] = typeInput.value.trim();
    selectedRequest.goal = parseFloat(amountInput.value) || 0;
    selectedRequest.priority = priorityInput.value;
    // selectedRequest.status = statusInput.value;
    selectedRequest["card-desc"] = descriptionInput.value.trim();

    const fileReadPromises = [];

    // ✅ حالة استبدال الملفات
    if (replaceProofInput.files.length > 0) {
      selectedRequest.proofFiles = []; // نحذف كل الملفات القديمة
      for (let i = 0; i < replaceProofInput.files.length; i++) {
        const file = replaceProofInput.files[i];
        fileReadPromises.push(
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              selectedRequest.proofFiles.push({
                name: file.name,
                type: file.type,
                content: e.target.result,
              });
              resolve();
            };
            reader.readAsDataURL(file);
          })
        );
      }
    }

    // ✅ حالة إضافة ملفات جديدة دون حذف القديمة
    if (addProofInput.files.length > 0) {
      if (!Array.isArray(selectedRequest.proofFiles)) {
        selectedRequest.proofFiles = [];
      }
      for (let i = 0; i < addProofInput.files.length; i++) {
        const file = addProofInput.files[i];
        fileReadPromises.push(
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              selectedRequest.proofFiles.push({
                name: file.name,
                type: file.type,
                content: e.target.result,
              });
              resolve();
            };
            reader.readAsDataURL(file);
          })
        );
      }
    }

    // قراءة الصورة الجديدة، لو فيه
    if (imageInput.files.length > 0) {
      fileReadPromises.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            selectedRequest.img = e.target.result;
            resolve();
          };
          reader.readAsDataURL(imageInput.files[0]);
        })
      );
    }
    Promise.all(fileReadPromises).then(() => {
      saveUpdates();
    });
  });

  function saveUpdates() {
    const index = aidRequests.findIndex((r) => r.id === selectedRequest.id);
    if (index !== -1) {
      aidRequests[index] = selectedRequest;
      localStorage.setItem("aidRequests", JSON.stringify(aidRequests));
      localStorage.setItem("selectedRequest", JSON.stringify(selectedRequest));
      alert("✅ تم حفظ التعديلات بنجاح!");
      window.location.href = "my-request.htm";
    } else {
      alert("⚠️ حدث خطأ أثناء حفظ التعديلات.");
    }
  }
});
