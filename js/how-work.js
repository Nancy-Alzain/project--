// const userType = localStorage.getItem("userType");
const secNeedy = document.querySelector("#needy-steps");
const secDonor = document.querySelector("#donor-steps");

if (userType === "donor") {
  secDonor.innerHTML = `
    <h3>كيف تبدأ كمتبرع؟</h3>
        <p class="role-intro">
          نُقدّر رغبتك في المساهمة! من خلال هذه الخطوات البسيطة يمكنك البدء بالتبرع ومساعدة العائلات المحتاجة بطريقة شفافة وآمنة عبر منصة وصال.
        </p>
        <div class="steps-flow">
          <div class="step-bubble">
            <div class="step-number">1 <span>تسجيل الدخول</span></div>
            <p>سجل حسابك كمستخدم متبرع على المنصة.</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">2 <span>استعراض الحالات</span></div>
            <p>تصفح الحالات الإنسانية حسب نوع المساعدة (غذاء، دواء، نقود...)</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">3 <span>اختيار المساعدة</span></div>
            <p>اختر الحالة التي ترغب بمساعدتها واقرأ التفاصيل.</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">4 <span>إتمام التبرع</span></div>
            <p>أكمل عملية التبرع من خلال وسائل الدفع المتاحة .</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">5 <span>الاشعار</span></div>
            <p>تابع إشعارات وصول التبرع والتقارير لضمان الشفافية.</p>
          </div>
        </div>
        <a href="availabeHelp.htm" class="start-donor-button">ابدأ كمتبرع</a> 
  `;
  secNeedy.style.cssText = `
    padding : 0px;
`;
} else if (userType === "needy") {
  secNeedy.innerHTML = `
            <h3>كيف تبدأ كمحتاج ؟</h3>
        <p class="role-intro">
          وصال هنا لتكون صوتك. إذا كنت بحاجة إلى مساعدة، يمكنك تقديم طلبك بسهولة وسنضمن توصيله للجهات المناسبة بأسرع وقت ممكن.
        </p>
        <div class="steps-flow">
          <div class="step-bubble">
            <div class="step-number">1 <span>إنشاء حساب</span></div>
            <p>أنشئ حساب جديد واختر "محتاج" كنوع المستخدم.</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">2 <span>طلب المساعدة</span></div>
            <p>أدخل بياناتك الشخصية والموقع ونوع المساعدة المطلوبة.</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">3 <span>انتظار المراجعة</span></div>
            <p>سيتم مراجعة طلبك من قبل الفريق المختص للتحقق من حالتك.</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">4 <span>نشر الحالة </span></div>
            <p>عند الموافقة، سيتم نشر حالتك ليراها المتبرعون.</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">5 <span>استلام الدعم</span></div>
            <p>تابع حالة طلبك واستلام المساعدة من خلال حسابك.</p>
          </div>
        </div>
      
        <a href="request-help.htm" class="start-needy-button">قدّم طلبك الآن</a>
  `;
  secDonor.style.cssText = `
    padding : 0px;
`;
} else {
  secDonor.innerHTML = `
    <h3>كيف تبدأ كمتبرع؟</h3>
        <p class="role-intro">
          نُقدّر رغبتك في المساهمة! من خلال هذه الخطوات البسيطة يمكنك البدء بالتبرع ومساعدة العائلات المحتاجة بطريقة شفافة وآمنة عبر منصة وصال.
        </p>
        <div class="steps-flow">
          <div class="step-bubble">
            <div class="step-number">1 <span>تسجيل الدخول</span></div>
            <p>سجل حسابك كمستخدم متبرع على المنصة.</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">2 <span>استعراض الحالات</span></div>
            <p>تصفح الحالات الإنسانية حسب نوع المساعدة (غذاء، دواء، نقود...)</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">3 <span>اختيار المساعدة</span></div>
            <p>اختر الحالة التي ترغب بمساعدتها واقرأ التفاصيل.</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">4 <span>إتمام التبرع</span></div>
            <p>أكمل عملية التبرع من خلال وسائل الدفع المتاحة .</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">5 <span>الاشعار</span></div>
            <p>تابع إشعارات وصول التبرع والتقارير لضمان الشفافية.</p>
          </div>
        </div>
        <a href="sign-up.htm" class="start-donor-button">ابدأ كمتبرع</a> 
  `;
  secNeedy.innerHTML = `
            <h3>كيف تبدأ كمحتاج ؟</h3>
        <p class="role-intro">
          وصال هنا لتكون صوتك. إذا كنت بحاجة إلى مساعدة، يمكنك تقديم طلبك بسهولة وسنضمن توصيله للجهات المناسبة بأسرع وقت ممكن.
        </p>
        <div class="steps-flow">
          <div class="step-bubble">
            <div class="step-number">1 <span>إنشاء حساب</span></div>
            <p>أنشئ حساب جديد واختر "محتاج" كنوع المستخدم.</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">2 <span>طلب المساعدة</span></div>
            <p>أدخل بياناتك الشخصية والموقع ونوع المساعدة المطلوبة.</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">3 <span>انتظار المراجعة</span></div>
            <p>سيتم مراجعة طلبك من قبل الفريق المختص للتحقق من حالتك.</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">4 <span>نشر الحالة </span></div>
            <p>عند الموافقة، سيتم نشر حالتك ليراها المتبرعون.</p>
          </div>
          <div class="arrow">→</div>
      
          <div class="step-bubble">
            <div class="step-number">5 <span>استلام الدعم</span></div>
            <p>تابع حالة طلبك واستلام المساعدة من خلال حسابك.</p>
          </div>
        </div>
      
        <a href="sign-up.htm" class="start-needy-button">قدّم طلبك الآن</a>
  `;
}
