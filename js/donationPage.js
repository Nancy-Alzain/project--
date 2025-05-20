document.addEventListener("DOMContentLoaded", function () {
  const userEmail = localStorage.getItem("tempEmail") || "";
  // userType = localStorage.getItem("userType");

  if (!userEmail || !localStorage.getItem("userType")) {
    alert("يجب تسجيل الدخول أولاً");
    window.location.href = "login.htm";
    // return;
  }
  const selectedRequest = JSON.parse(localStorage.getItem("selectedRequest"));

  // التأكد من وجود البيانات
  if (!selectedRequest) {
    alert("عذرًا، لم يتم تحديد حالة للتبرع.");
    window.location.href = "availabeHelp.htm";
  }

  function updateHeaderDon(caseData) {
    const img = document.querySelector(".header-don img");
    const title = document.querySelector(".case-title");
    const progress = document.querySelector(".progress-bar .progress");
    const collectedText = document.querySelector(".collected");
    const badge = document.querySelector(".status-badge");

    img.src = caseData.img;
    title.textContent = caseData["card-title"];
    let percentage = Math.floor((caseData.collected / caseData.goal) * 100);
    progress.style.width = `${percentage}%`;
    collectedText.textContent = `$${caseData.collected} تم جمعه من أصل $${caseData.goal}`;
    badge.textContent = caseData.name;
    badge.classList.add(caseData.type || "default-type");
  }
  updateHeaderDon(selectedRequest);

  // عند إدخال مبلغ التبرع
  const donationInput = document.querySelector(".donation-amount input");
  const donationValueSpan = document.getElementById("donation-value");
  const totalValueSpan = document.getElementById("total-value");
  const donateBtn = document.querySelector(".donate-btn");

  donationInput.addEventListener("input", function () {
    let value = parseFloat(donationInput.value);
    if (!isNaN(value) && value > 0) {
      donationValueSpan.textContent = value.toFixed(2);
      totalValueSpan.textContent = value.toFixed(2);
    } else {
      donationValueSpan.textContent = "0";
      totalValueSpan.textContent = "0";
    }
  });

  // عند النقر على زر تبرع
  donateBtn.addEventListener("click", function () {
    const amount = parseFloat(donationInput.value);
    const selectedOption = document.querySelector(".payment-option.selected");

    if (isNaN(amount) || amount <= 0) {
      showDonationMessage("error", "الرجاء إدخال مبلغ صالح للتبرع.");
      return;
    }

    if (!selectedOption) {
      showDonationMessage("error", "الرجاء اختيار طريقة الدفع.");
      return;
    }

    const paymentMethod = selectedOption.dataset.method;

    // هنا يتم إرسال البيانات إلى الباك إند (زميلتك تكملها لاحقًا)
    console.log("المبلغ:", amount);
    console.log("طريقة الدفع:", paymentMethod);

    const request = JSON.parse(localStorage.getItem("selectedRequest"));
    if (request) {
      // تحديث قيمة collected
      request.collected = (request.collected || 0) + amount;

      // إضافة المساهم إلى مصفوفة donors
      if (!Array.isArray(request.donors)) request.donors = [];

      // الحصول على اسم المتبرع من localStorage أو وضع اسم افتراضي
      const donorName = localStorage.getItem("userName") || "متبرع مجهول";

      request.donors.push({
        name: donorName,
        amount: amount.toFixed(2),
        date: new Date().toISOString(),
      });
      // ✅ تحديث الطلب داخل مصفوفة الطلبات في localStorage
      const allRequests = JSON.parse(localStorage.getItem("aidRequests")) || [];
      const updatedRequests = allRequests.map((req) => {
        if (req.id === request.id) {
          return request;
        }
        return req;
      });
      localStorage.setItem("aidRequests", JSON.stringify(updatedRequests));
      // حفظ التحديثات
      localStorage.setItem("donatedAmount", amount);
      localStorage.setItem("selectedRequest", JSON.stringify(request));
    }

    showDonationMessage("success", "تم إرسال التبرع بنجاح!");
    setTimeout(() => (window.location.href = "../succPay.html"), 1000);
  });
});

// دالة لاظهار الرسالة
function showDonationMessage(type, text) {
  const messageBox = document.getElementById("donation-message");
  messageBox.className = `donation-message ${type}`;
  messageBox.textContent = text;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 4000);
}

// عند النقر على اي وسيلة دفع
let selectedMethod = "";
document.querySelectorAll(".payment-option").forEach((option) => {
  option.addEventListener("click", function () {
    document
      .querySelectorAll(".payment-option")
      .forEach((o) => o.classList.remove("selected"));
    this.classList.add("selected");
    selectedMethod = option.dataset.method;
  });
});
