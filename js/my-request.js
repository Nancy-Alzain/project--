const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".request-card");

// فعّل زر "الكل" تلقائيًا عند بداية التحميل
document.querySelector('[data-filter="all"]')?.classList.add("active");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // شيل الكلاس active من جميع الأزرار وأضفه للزر الحالي
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    cards.forEach((card) => {
      const status = card.getAttribute("data-status");
      if (!status) return;

      if (filter === "all" || status === filter) {
        card.classList.remove("hidden");
        card.classList.add("fade-in");
        setTimeout(() => card.classList.remove("fade-in"), 300); // يشيل الأنميشن بعد شوي
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// لزر المعاينة

// استهداف كل أزرار المعاينة
document.querySelectorAll(".btn-view").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation(); // لمنع التفاعل مع الكرت نفسه إذا فيه onclick
    const card = button.closest(".request-card");
    const requestId = card.getAttribute("data-id");

    // حفظ ID في localStorage أو الانتقال مع query parameter
    window.location.href = `help-details.html?id=${requestId}`;
  });
});

// زر الحذف
// استهداف كل أزرار الحذف
document.querySelectorAll(".btn-delete").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation(); // عشان ما يفتح تفاصيل الكرت

    const confirmed = confirm("هل أنت متأكد من حذف هذه المساعدة؟");
    if (confirmed) {
      const card = button.closest(".request-card");

      // إزالة الكرت من الصفحة
      card.remove();

      // في المستقبل: إرسال طلب حذف إلى السيرفر باستخدام fetch
      // const requestId = card.getAttribute("data-id");
      // fetch(`/api/delete-help?id=${requestId}`, { method: "DELETE" });
    }
  });
});

//  زر التعديل
document.querySelectorAll(".btn-edit").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation(); // منع تفاعل الكرت الأساسي

    const card = button.closest(".request-card");
    const requestId = card.getAttribute("data-id");

    // الانتقال لصفحة التعديل مع تمرير المعرف
    window.location.href = `edit-help.htm?id=${requestId}`;
  });
});

document.querySelectorAll(".btn-view").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    localStorage.setItem("selectedRequest", JSON.stringify(cards));
    window.location.href = "../request-details.html";
  });
});

// يعني  الarray اللي هعملها في صفحة طلباتي واحفظها في localStorage كيف استدعي البيانات في صفحة "المساعدات المتاحة" (للمتبرع). وكذلك لما برضو يدعس على زر التفاصيل في صفحة المساعدات المتاحة اي كيف اخلي كل هاي الصفحات تيجي من نفس المصفوفة ونفس الlocalstorage ???
