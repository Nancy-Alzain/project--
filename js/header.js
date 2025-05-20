window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 200) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

const ul = document.getElementById("main-nav");
const btns = document.querySelector(".log-btn");

const userType = localStorage.getItem("userType");
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
  btns.innerHTML = `
    <button id="logout" class="logout">تسجيل الخروج</button>
  `;
  // logout.addEventListener("click", () => window.open("../login.htm", "_self"));
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
  create.onclick = () => window.open("../sign-up.htm", "_self");
  login.onclick = () => window.open("../login.htm", "_self");
}

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

// let create = document.querySelector(".create");
// let login = document.querySelector(".login");

// create.onclick = () => window.open("../sign-up.htm", "_self");
// login.onclick = () => window.open("../login.htm", "_self");

// عند النقر على زر تسجيل الخروج الذهاب الى صفحة تسجيل الدخول
// let logout = document.querySelector(".logout");
// logout.addEventListener("click", () => window.open("../login.htm", "_self"));
