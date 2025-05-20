const userType = localStorage.getItem("userType");
const ul = document.getElementById("main-nav");
const container = document.querySelector(".container-head");
const float_btn = document.querySelector(".floating-buttons");
const btns = document.querySelector(".log-btn");
if (userType !== "donor" && userType !== "needy") {
  const section = document.createElement("section");
  section.className = "quick-links";
  section.innerHTML = `
  <h2>ابدأ الآن</h2>
  <p>اختر ما يناسبك وابدأ بخطوة تصنع فرقًا.</p>
  <div class="buttons">
      <a href="availabeHelp.htm" class="btn donate">تبرع الآن</a>
      <a href="request-help.htm" class="btn request">طلب مساعدة</a>
  </div>
  `;
  container.appendChild(section);
}
if (userType === "donor") {
  ul.innerHTML = `
    <li><a href="landing.htm">الرئيسية</a></li>
    <li><a href="availabeHelp.htm">المساعدات المتاحة</a></li>
    <li><a href="how.htm">كيف يعمل الموقع</a></li>
    <li><a href="donor-dashboard.htm">حسابي</a></li>
    <li><a href="volunteer.html">تطوع معنا </a></li>
    <li><a href="us.html">من نحن؟</a></li>
    <li><a href="contact-us.htm">تواصل معنا</a></li>
  `;
  float_btn.innerHTML = `
    <a href="availabeHelp.htm" class="floating-btn donate-btn">
      <i class="fas fa-hand-holding-heart"></i>
      <span>تبرع الآن</span>
    </a>
  `;
  btns.innerHTML = `
    <button id="logout" class="logout">تسجيل الخروج</button>
  `;
  // logout.onclick = () => window.open("../login.htm", "_self");
  logout.addEventListener("click", () => {
    const confirmLogout = confirm("هل أنت متأكدة أنك تريدين تسجيل الخروج؟");
    if (confirmLogout) {
      localStorage.removeItem("userType");
      localStorage.removeItem("tempEmail");
      localStorage.removeItem("currentUserEmail");
      let selectedUserType = localStorage.getItem("userType");
      if (selectedUserType === "donor") {
        localStorage.removeItem("userName");
      } else if (selectedUserType === "needy") {
        localStorage.removeItem("userNameNeedy");
      }
      window.location.href = "login.htm";
    }
  });
} else if (userType === "needy") {
  ul.innerHTML = `
    <li><a href="landing.htm">الرئيسية</a></li>
    <li><a href="how.htm">كيف يعمل الموقع</a></li>
    <li><a href="volunteer.html">تطوع معنا </a></li>
    <li><a href="needy-dashboard.htm">حسابي</a></li>
    
    <li><a href="request-help.htm">طلب المساعدة</a></li>
    <li><a href="us.html">من نحن؟</a></li>
    <li><a href="contact-us.htm">تواصل معنا</a></li>
  `;
  float_btn.innerHTML = `
    <a href="request-help.htm" class="floating-btn request-btn">
      <i class="fas fa-hands-helping"></i>
      <span>طلب مساعدة</span>
    </a>
  `;
  btns.innerHTML = `
    <button id="logout" class="logout">تسجيل الخروج</button>
  `;
  // logout.onclick = () => window.open("../login.htm", "_self");
  logout.addEventListener("click", () => {
    const confirmLogout = confirm("هل أنت متأكدة أنك تريدين تسجيل الخروج؟");
    if (confirmLogout) {
      localStorage.removeItem("userType");
      localStorage.removeItem("tempEmail");
      localStorage.removeItem("currentUserEmail");
      let selectedUserType = localStorage.getItem("userType");
      if (selectedUserType === "donor") {
        localStorage.removeItem("userName");
      } else if (selectedUserType === "needy") {
        localStorage.removeItem("userNameNeedy");
      }
      window.location.href = "login.htm";
    }
  });
} else {
  // المستخدم غير مسجل الدخول
  ul.innerHTML = `
    <li><a href="landing.htm">الرئيسية</a></li>
    <li><a href="how.htm">كيف يعمل الموقع</a></li>
    <li><a href="volunteer.html">تطوع معنا </a></li>
    <li><a href="us.html">من نحن؟</a></li>
    <li><a href="contact-us.htm">تواصل معنا</a></li>
  `;
  btns.innerHTML = `
    <button id="create" class="create">إنشاء حساب</button>
    <button id="login" class="login">تسجيل الدخول</button>
  `;
  float_btn.innerHTML = `
    <a href="sign-up.htm" class="floating-btn donate-btn">
      <i class="fas fa-hand-holding-heart"></i>
      <span>تبرع الآن</span>
    </a>
    <a href="sign-up.htm" class="floating-btn request-btn">
      <i class="fas fa-hands-helping"></i>
      <span>طلب مساعدة</span>
    </a>
  `;
  create.onclick = () => window.open("../sign-up.htm", "_self");
  login.onclick = () => window.open("../login.htm", "_self");
}
// عند النقر على الزرين يروح لهدول الصفحتين
// let create = document.querySelector(".create");
// let login = document.querySelector(".login");
// create.onclick = () => window.open("../sign-up.htm", "_self");
// login.onclick = () => window.open("../login.htm", "_self");

//له هذه السمات  active اسمه  class  يصير في
const links = document.querySelectorAll(".links li a");
const currentPage = window.location.pathname;
links.forEach((link) => {
  const linkHref = link.getAttribute("href");
  if (currentPage.includes(linkHref)) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// تحديث عرض شريط التقدم حسب البيانات
document.querySelectorAll(".progress-bar").forEach((bar) => {
  const collected = parseFloat(bar.getAttribute("data-collected"));
  const goal = parseFloat(bar.getAttribute("data-goal"));
  const percentage = Math.min((collected / goal) * 100, 100); // لضمان ألا يتجاوز 100%
  bar.querySelector(".progress").style.width = percentage + "%";
});

// إظهار البطاقات بحركة عند التمرير
const cards = document.querySelectorAll(".card");

const showCards = () => {
  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (cardTop < windowHeight - 50) {
      card.classList.add("show");
    }
  });
};

// تشغيل الحركة عند التحميل وعند التمرير
window.addEventListener("scroll", showCards);
window.addEventListener("load", showCards);

const toggle = document.querySelector(".menu-toggle");
const linkss = document.querySelector(".links");

toggle.addEventListener("click", () => {
  linkss.classList.toggle("show");
});

// إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", (e) => {
  if (!toggle.contains(e.target) && !linkss.contains(e.target)) {
    linkss.classList.remove("show");
  }
});

// إغلاق القائمة عند الضغط على رابط
linkss.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    linkss.classList.remove("show");
  });
});

// قسم الاحصائيات

const counters = document.querySelectorAll(".number");
counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const speed = 50; // كلما قلّ الرقم زاد السرعة
    const inc = Math.ceil(target / speed);
    if (count < target) {
      counter.innerText = count + inc;
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});
