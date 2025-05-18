// بيانات تجريبية مؤقتة
const sampleDonations = [
  { needyEmail: "nancy@example.com", amount: 200 },
  { needyEmail: "nancy@example.com", amount: 150 },
  { needyEmail: "nancy@example.com", amount: 300 },
  { needyEmail: "other@example.com", amount: 100 },
];
localStorage.setItem("donations", JSON.stringify(sampleDonations));

// const needyUser = {
//   name: "نانسي الزين",
//   email: "nancy@example.com",
// };
// localStorage.setItem("currentNeedy", JSON.stringify(needyUser));
// استرداد الاسم والبريد من localStorage

const userName = localStorage.getItem("userNameNeedy") || "مستخدم";
const userEmail = localStorage.getItem("tempEmail") || "";

if (!userEmail) {
  alert("يجب تسجيل الدخول أولاً");
  window.location.href = "login.html";
  // return;
}

let allRequests = JSON.parse(localStorage.getItem("aidRequests")) || [];

// حساب مجموع التبرعات
// const user = JSON.parse(localStorage.getItem("currentNeedy"));
// const donations = JSON.parse(localStorage.getItem("donations")) || [];
// const total = donations
//   .filter((d) => d.needyEmail === user.email)
//   .reduce((sum, d) => sum + d.amount, 0);

const myRequests = allRequests.filter((req) => req.ownerEmail === userEmail);
let total = 0;

myRequests.forEach((req) => {
  total += req.collected;
});
localStorage.setItem("totalDonation", total);
document.getElementById("total-donations").textContent = `${total} شيكل`;

// التحقق من المبلغ
const withdrawInput = document.getElementById("withdraw-amount");
const message = document.getElementById("withdraw-message");

function validateWithdraw() {
  const amount = parseFloat(withdrawInput.value);
  if (isNaN(amount) || amount <= 0) {
    message.textContent = "يرجى إدخال مبلغ صالح.";
    return false;
  }
  if (amount > total) {
    message.textContent = "المبلغ المطلوب يتجاوز مجموع التبرعات.";
    return false;
  }
  message.textContent = "";
  return true;
}

withdrawInput.addEventListener("input", validateWithdraw);

// الحقول الخاصة بطرق الدفع
const methodSelect = document.getElementById("method-select");
const bankFields = document.getElementById("bank-fields");
const walletFields = document.getElementById("wallet-fields");

methodSelect.addEventListener("change", () => {
  const method = methodSelect.value;
  bankFields.style.display = method === "bank" ? "block" : "none";
  walletFields.style.display = method === "wallet" ? "block" : "none";
});

// زر الإرسال
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", () => {
  if (!validateWithdraw()) return;

  const amount = parseFloat(withdrawInput.value);
  const method = methodSelect.value;
  let details = {};

  if (method === "bank") {
    const bankName = document.getElementById("bank-name").value;
    const accountNumber = document.getElementById("account-number").value;
    const accountHolder = document.getElementById("account-holder").value;

    if (!bankName || !accountNumber || !accountHolder) {
      alert("يرجى تعبئة جميع بيانات الحساب البنكي.");
      return;
    }

    details = { bankName, accountNumber, accountHolder };
  }

  if (method === "wallet") {
    const walletType = document.getElementById("wallet-type").value;
    const walletNumber = document.getElementById("wallet-number").value;

    if (!walletType || !walletNumber) {
      alert("يرجى تعبئة جميع بيانات المحفظة.");
      return;
    }

    details = { walletType, walletNumber };
  }

  const newRequest = {
    email: userEmail,
    amount: amount,
    method: method,
    date: new Date().toISOString().split("T")[0],
    details: details,
  };

  const oldRequests =
    JSON.parse(localStorage.getItem("withdrawRequests")) || [];
  oldRequests.push(newRequest);
  localStorage.setItem("withdrawRequests", JSON.stringify(oldRequests));
  total -= amount;
  localStorage.setItem("totalDonation", total);
  // تحويل المستخدم لصفحة التأكيد
  setTimeout(() => {
    window.location.href = "../withdraw-success.html";
  }, 1000);
});
