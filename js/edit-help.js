// 1. جلب الـ id من الرابط
const urlParams = new URLSearchParams(window.location.search);
const requestId = urlParams.get("id");

// محاكاة تحميل بيانات المساعدة من الـ backend أو array وهمي (مؤقتاً)
// const mockData = {
//   123: {
//     title: "مساعدة غذائية عاجلة",
//     type: "food",
//     amount: 500,
//     description: "الأسرة بحاجة ماسة إلى مواد غذائية.",
//     priority: "high",
//     status: "new",
//   },
//   456: {
//     title: "شراء أدوية ضرورية",
//     type: "medicine",
//     amount: 300,
//     description: "الحالة تعاني من مرض مزمن وتحتاج علاج شهري.",
//     priority: "high",
//     status: "new",
//   },
// };

// // تعبئة الفورم إذا كانت البيانات موجودة
// if (requestId && mockData[requestId]) {
//   const data = mockData[requestId];
//   document.getElementById("title").value = data.title;
//   document.getElementById("type").value = data.type;
//   document.getElementById("amount").value = data.amount;
//   document.getElementById("priority").value = data.priority || "medium";
//   document.getElementById("status").value = data.status || "new";
//   document.getElementById("description").value = data.description;
// } else {
//   alert("تعذر تحميل بيانات المساعدة");
// }

// // عند إرسال النموذج
// document
//   .getElementById("edit-help-form")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();
//     // هنا يتم إرسال البيانات المعدلة إلى السيرفر لحفظها
//     alert("تم حفظ التعديلات بنجاح!");
//     // ممكن نرجع المستخدم لصفحة المساعدات
//     window.location.href = "../my-request.htm"; // عدليها حسب اسم صفحتك
//   });

//

// 2. مكان استدعاء البيانات - زميلتك رح تستخدم هذا الـ id
// يمكنك تكتبيله TODO حتى تعرف انها تعمل هون
// TODO: جلب بيانات الحالة من السيرفر باستخدام requestId
console.log("معرّف المساعدة المطلوب تعديله:", requestId);

// 3. تنفيذ عند إرسال النموذج
document
  .getElementById("edit-help-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // 4. تجميع البيانات المدخلة
    const updatedData = {
      id: requestId,
      title: document.getElementById("title").value,
      type: document.getElementById("type").value,
      amount: document.getElementById("amount").value,
      priority: document.getElementById("priority").value,
      status: document.getElementById("status").value,
      description: document.getElementById("description").value,
      proof: document.getElementById("proof").files[0] || null, // مرفق اختياري
    };

    // 5. عرض البيانات في الكونسول حتى تستخدمها زميلتك
    console.log("بيانات التعديل:", updatedData);

    // يمكنك أيضاً وضع TODO إضافي هنا لزميلتك:
    // TODO: إرسال البيانات إلى الباك باستخدام API
  });
