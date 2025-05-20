let count = 1;
const initialRequests = [
  {
    id: "reg_" + Date.now() + "_" + count++,
    img: "img/Photo (1).png", // x
    "card-title": "علاج طارئ لطفلة مريضة",
    "card-desc": "تعاني الطفلة من حالة صحية حرجة  تتطلب علاجا طارئا",
    "card-longDesc": `تعاني الطفلة رُبى  (6 سنوات) من حالة صحية حرجة تتطلب علاجًا طبيًا طارئًا لا يمكن تأجيله.
      الأسرة تمر بظروف صعبة ولا تملك القدرة على تغطية تكاليف العلاج`,
    "desc-after-pay":
      "تبرعك ساهم في تقريب عائلة من العلاج ومنحها فرصة جديدة للحياة.",
    type: "urgent",
    name: "عاجلة",
    "card-category": "مساعدات طبية",
    date: "20 مارس 2025",
    collected: 600,
    goal: 1000,
    proofFiles: [
      { name: "تقرير طبي.pdf", url: "uploads/report1.pdf" },
      { name: "صورة وصفة.jpg", url: "uploads/prescription1.jpg" },
    ],
    extra: {
      "تاريخ الحالة": "3 مايو 2025",
      "عدد أفراد الأسرة": "4",
      "أولوية الحالة": "عالية",
      "نوع السكن": "مخيم",
      "تم التحقق من الحالة؟": "نعم",
    },
    donors: [
      { name: " محمد", amount: 54, date: "2025-02-08T12:00:00Z" },
      { name: "علي سالم", amount: 105, date: "2025-04-07T15:30:00Z" },
      { name: "مجهول", amount: 108, date: "2025-05-05T09:00:00Z" },
      { name: "مجهول", amount: 108, date: "2025-05-08T06:40:00Z" },
    ],
    status: "pending",
  },
  {
    id: "reg_" + Date.now() + "_" + count++,
    img: "img/Photo (9).png",
    "card-title": "أدوية لمرضى مزمنين",
    "card-desc": "مجموعة مرضى في مخيم يحتاجون الى ادوية لأمراض مزمنة ",
    "card-longDesc": `يعيش عدد من المرضى المزمنين داخل المخيم أوضاعًا صحية صعبة نتيجة نقص الأدوية الأساسية 
    مثل أدوية القلب والسكري والضغط. تتكرر معاناتهم يوميًا بسبب انقطاع العلاج وعدم توفر الإمكانيات.`,
    "desc-after-pay":
      "تبرعك وفّر دواءً لحالة عاجلة، وأنقذ حياة شخص يعاني منذ زمن.",
    type: "normal",
    name: "عادية",
    "card-category": "مساعدات طبية",
    date: "20 مارس 2025",
    collected: 1500,
    goal: 3000,
    proofFiles: [
      { name: "كشف أسماء المرضى.pdf", url: "uploads/patients-list.pdf" },
      { name: "مستند احتياج دوائي.pdf", url: "uploads/medical-need.pdf" },
    ],
    extra: {
      "عدد المرضى المستفيدين": "12",
      "نوع الأدوية المطلوبة": "ضغط، سكري، قلب",
      المنطقة: "مخيم الشاطئ",
      "تم التحقق؟": "نعم",
      "جهة التوثيق": "اللجنة الطبية بالمخيم",
    },
    donors: [
      { name: " محمد", amount: 54, date: "2025-02-08T12:00:00Z" },
      { name: "خالد محمود", amount: 120, date: "2025-05-01T10:45:00Z" },
    ],
    status: "pending",
  },
  {
    id: "reg_" + Date.now() + "_" + count++,
    img: "img/Photo.png",
    "card-title": "مساعدة غذائية لعائلة نازحة وصلت حديثًا",
    "card-desc": "العائلة وصلت المخيم وتحتاج سلة غذائية أساسية بشكل عاجلا",
    "card-longDesc": `العائلة النازحة حديثًا فقدت منزلها نتيجة الأحداث الأخيرة. لا تملك مصدر دخل حالي،
    وتحتاج بشكل عاجل إلى سلة غذائية تكفي لأفرادها خلال الأسابيع القادمة.`,
    "desc-after-pay":
      "تبرعك ساعد في توفير وجبة كريمة لعائلة محتاجة ومنحهم يومًا أقل قسوة.",
    type: "urgent",
    name: "عاجلة",
    "card-category": "مساعدات غذائية",
    date: "20 مارس 2025",
    collected: 200,
    goal: 500,
    proofFiles: [
      { name: "شهادة نزوح.pdf", url: "uploads/displacement-cert.pdf" },
    ],
    extra: {
      "عدد أفراد الأسرة": "6",
      "وضع السكن": "خيمة مؤقتة",
      "نوع السلة المطلوبة": "سلة غذائية أسبوعية",
      "تاريخ الوصول": "10 مارس 2025",
      "تم التحقق؟": "نعم",
    },
    donors: [
      { name: "مجهول", amount: 108, date: "2025-05-08T06:40:00Z" },
      { name: "فاطمة أحمد", amount: 250, date: "2025-05-07T11:15:00Z" },
      { name: "خالد محمود", amount: 120, date: "2025-05-01T10:45:00Z" },
    ],
    status: "pending",
  },
  {
    id: "reg_" + Date.now() + "_" + count++,
    img: "img/Photo (3).png",
    "card-title": "مساعدة ملابس ودفء لطفل نازح",
    "card-desc": "طفل بحاجة لملابس شتوية تساعده على تحمل ظروف البرد",
    "card-longDesc": `الطفل كريم (8 سنوات) يعيش في خيمة مع أسرته بعد تهجيرهم مؤخرًا. لا يملك ما يكفي من الملابس 
    لتدفئته في ظل انخفاض درجات الحرارة ليلاً. الأسرة عاجزة عن شراء مستلزمات شتوية.`,
    "desc-after-pay":
      "تبرعك أعاد الدفء والكرامة لطفل محتاج، ومنحه شعورًا بالاهتمام والرعاية.",
    type: "urgent",
    name: "عاجلة",
    "card-category": "مساعدات ملابس",
    date: "20 مارس 2025",
    collected: 700,
    goal: 1000,
    proofFiles: [
      { name: "تقرير حالة اجتماعية.pdf", url: "uploads/social-case.pdf" },
    ],
    extra: {
      العمر: "8 سنوات",
      "نوع الملابس المطلوبة": "جاكيت شتوي، كنزة، طاقية، قفازات",
      "مكان الإقامة": "مخيم دير البلح",
      "تاريخ الطلب": "15 مارس 2025",
    },
    donors: [
      { name: "سارة خالد", amount: 65, date: "2025-05-03T16:20:00Z" },
      { name: "خالد محمود", amount: 120, date: "2025-05-01T10:45:00Z" },
    ],
    status: "pending", // أو
  },
  {
    id: "reg_" + Date.now() + "_" + count++,
    img: "img/Photo (2).png",
    "card-title": "وجبات ساخنة لعائلة تقيم في الخيام",
    "card-desc": "العائلة تعيش في ظروف صعبة وتحتاج لوجبات غذائية يومية",
    "card-longDesc": `العائلة مكونة من أب وأم و3 أطفال يعيشون في خيمة بلا مطبخ أو وسيلة للطبخ.
    يعانون من نقص الطعام المطبوخ، ويعتمدون فقط على الخبز وبعض المعلبات.`,
    "desc-after-pay":
      "تبرعك ساعد في توفير وجبة كريمة لعائلة محتاجة ومنحهم يومًا أقل قسوة.",
    type: "urgent",
    name: "عاجلة",
    "card-category": "مساعدات غذائية",
    date: "20 مارس 2025",
    collected: 300,
    goal: 1000,
    proofFiles: [
      { name: "كشف زيارة ميدانية.pdf", url: "uploads/field-visit.pdf" },
    ],
    extra: {
      "عدد الوجبات المطلوبة يوميًا": "3",
      "مدة التغطية المطلوبة": "أسبوعين",
      "نوع الطعام": "وجبات ساخنة جاهزة",
      "جهة المتابعة": "فريق الإغاثة المحلية",
    },
    donors: [
      { name: "سامي عبد الله", amount: 75, date: "2025-05-06T13:00:00Z" },
      { name: "مجهول", amount: 300, date: "2025-05-04T14:30:00Z" },
      { name: "سارة خالد", amount: 65, date: "2025-05-03T16:20:00Z" },
      { name: "خالد محمود", amount: 120, date: "2025-05-01T10:45:00Z" },
    ],
    status: "pending", // أو
  },
  {
    id: "reg_" + Date.now() + "_" + count++,
    img: "img/Photo (2).png",
    "card-title": "معدات طبية لغزة",
    "card-desc":
      "نقص حاد في المعدات الطبية داخل قطاع غزة، وهناك حاجة عاجلة لتوفيرها",
    "card-longDesc": `في ظل النقص الحاد في المعدات الطبية داخل قطاع غزة، هناك حاجة عاجلة لتوفير معدات حيوية مثل أجهزة قياس الضغط والسكر وأسرة طبية متنقلة لخدمة المرضى في المناطق المنكوبة.`,
    "desc-after-pay":
      "تبرعك ساهم في تقريب عائلة من العلاج ومنحها فرصة جديدة للحياة.",
    type: "normal",
    name: "عادية",
    "card-category": "مساعدات طبية",
    date: "20 مارس 2025",
    collected: 4000,
    goal: 10000,
    proofFiles: [
      { name: "طلب رسمي من مركز طبي.pdf", url: "uploads/clinic-request.pdf" },
      {
        name: "قائمة المعدات المطلوبة.pdf",
        url: "uploads/equipment-list.pdf",
      },
    ],
    extra: {
      "الجهة المستفيدة": "مركز رعاية أولية",
      "نوع المعدات": "أجهزة قياس ضغط وسكر، أسرة طبية، كراسي متحركة",
      "عدد المستفيدين المتوقع": "150 مريض شهريًا",
      "تم التحقق؟": "نعم",
    },
    donors: [
      { name: "إبراهيم يوسف", amount: 200, date: "2025-04-29T12:10:00Z" },
      { name: "زينب علي", amount: 150, date: "2025-04-28T17:00:00Z" },
      { name: "رنا فوزي", amount: 90, date: "2025-04-27T13:30:00Z" },
    ],
    status: "pending",
  },
  {
    id: "reg_" + Date.now() + "_" + count++,
    img: "img/Photo (6).png",
    "card-title": "توفير جهاز أكسجين لطفل مريض",
    "card-desc":
      "الطفل يعاني من مشاكل تنفسية مزمنة ويحتاج جهاز أكسجين منزلي بشكل عاجل",
    "card-longDesc": `الطفل أيهم (10 سنوات) يعاني من مرض رئوي مزمن، ويحتاج جهاز أكسجين للاستخدام المنزلي لتفادي أي تدهور في حالته الصحية، خصوصًا في أوقات الليل.`,
    "desc-after-pay":
      "تبرعك وفّر دواءً لحالة عاجلة، وأنقذ حياة شخص يعاني منذ زمن.",
    type: "mean",
    name: "متوسطة",
    "card-category": "مساعدات طبية",
    date: "20 مارس 2025",
    collected: 1000,
    goal: 1000,
    proofFiles: [
      { name: "تقرير طبي حديث.pdf", url: "uploads/oxygen-report.pdf" },
    ],
    extra: {
      العمر: "10 سنوات",
      "نوع الجهاز": "مولد أوكسجين منزلي",
      "استخدام الجهاز": "يومي، ساعات طويلة",
      "تم التحقق؟": "نعم",
    },
    donors: [
      { name: "رنا فوزي", amount: 90, date: "2025-04-27T13:30:00Z" },
      { name: "حسام سليم", amount: 80, date: "2025-04-26T18:40:00Z" },
      { name: "أحمد سعيد", amount: 130, date: "2025-04-25T14:50:00Z" },
    ],
    status: "pending",
  },
  {
    id: "reg_" + Date.now() + "_" + count++,
    img: "img/Photo (4).png",
    "card-title": "توزيع ملابس على الأسر المحتاجة",
    "card-desc":
      "عشرات من العائلات النازحة في ظل الطقس البارد تحتاج الى ملابس ",
    "card-longDesc": `تعيش عشرات العائلات في مخيم الشاطئ دون ملابس كافية لأطفالها، خصوصًا في ظل تغير الفصول.
    الحملة تهدف لتوفير ملابس مناسبة للرجال والنساء والأطفال المحتاجين.`,
    "desc-after-pay":
      "تبرعك أعاد الدفء والكرامة لطفل محتاج، ومنحه شعورًا بالاهتمام والرعاية.",
    type: "urgent",
    name: "عاجلة",
    "card-category": "مساعدات ملابس",
    date: "20 مارس 2025",
    collected: 1500,
    goal: 2000,
    proofFiles: [
      { name: "قائمة بالأسر المستفيدة.pdf", url: "uploads/family-list.pdf" },
    ],
    extra: {
      "عدد الأسر المستفيدة": "20",
      "نوع الملابس": "صيفية وشتوية حسب الحاجة",
      "مكان التوزيع": "مخيم الشاطئ",
      "جهة التوثيق": "متطوعي المنطقة",
    },
    donors: [
      { name: "مجهول", amount: 108, date: "2025-05-08T06:40:00Z" },
      { name: "فاطمة أحمد", amount: 250, date: "2025-05-07T11:15:00Z" },
      { name: "سامي عبد الله", amount: 75, date: "2025-05-06T13:00:00Z" },
    ],
    status: "pending",
  },
  {
    id: "reg_" + Date.now() + "_" + count++,
    img: "img/Photo (9).png",
    "card-title": "حليب أطفال ومستلزمات لرضيع",
    "card-desc": "رضيع يعاني من سوء تغذية بحاجة لحليب خاص وعلاجات مغذية",
    "card-longDesc": `الرضيع سامي (8 أشهر) يعاني من سوء تغذية حاد نتيجة غياب الحليب المناسب وعدم قدرة الأم على الإرضاع.
    الحالة تحتاج حليب خاص وبعض المكملات الغذائية الضرورية لنمو الطفل.`,
    "desc-after-pay":
      "تبرعك ساعد في الحفاظ على كرامة المحتاجين، ومنحهم أساسيات الحياة.",
    type: "mean",
    name: "متوسطة",
    "card-category": "مساعدات غذائية",
    date: "20 مارس 2025",
    collected: 200,
    goal: 500,
    proofFiles: [
      { name: "تشخيص سوء تغذية.pdf", url: "uploads/malnutrition.pdf" },
    ],
    extra: {
      العمر: "8 أشهر",
      الاحتياج: "حليب خاص – تركيبة طبية للأطفال",
      "عدد العلب المطلوبة شهريًا": "12",
      "مدة التغطية": "شهر واحد",
      "تم التحقق؟": "نعم",
    },
    donors: [
      { name: "فاطمة أحمد", amount: 250, date: "2025-05-07T11:15:00Z" },
      { name: "نورة منصور", amount: 500, date: "2025-04-30T09:00:00Z" },
      { name: "إبراهيم يوسف", amount: 200, date: "2025-04-29T12:10:00Z" },
    ],
    status: "pending",
  },
  {
    id: "reg_" + Date.now() + "_" + count++,
    img: "img/Photo (5).png",
    "card-title": "أحذية وملابس شتوية لأطفال في الخيام",
    "card-desc": "الأطفال لا يملكون ما يقيهم برد الشتاء ويحتاجون أحذية ومعاطف",
    "card-longDesc": `عدد من الأطفال يعيشون في خيام بدون وسائل تدفئة ولا يمتلكون أحذية مناسبة أو معاطف،
    مما يعرضهم لخطر المرض مع اشتداد البرد. الحاجة ملحة لتوفير ملابس شتوية جيدة.`,
    "desc-after-pay":
      "تبرعك أعاد الدفء والكرامة لطفل محتاج، ومنحه شعورًا بالاهتمام والرعاية.",
    type: "urgent",
    name: "عاجل",
    "card-category": "مساعدات ملابس",
    date: "20 مارس 2025",
    collected: 1000,
    goal: 1500,
    proofFiles: [
      { name: "صور من الخيام.pdf", url: "uploads/tent-photos.pdf" },
      {
        name: "تقرير لجنة الحماية.pdf",
        url: "uploads/protection-report.pdf",
      },
    ],
    extra: {
      "عدد الأطفال المستفيدين": "30",
      "نوع المستلزمات": "أحذية، معاطف، جوارب",
      "جهة التوزيع": "فريق المتطوعين",
      "تاريخ التنفيذ": "بداية ديسمبر 2025",
    },
    donors: [
      { name: "سامي عبد الله", amount: 75, date: "2025-05-06T13:00:00Z" },
      { name: "سارة خالد", amount: 65, date: "2025-05-03T16:20:00Z" },
      { name: "خالد محمود", amount: 120, date: "2025-05-01T10:45:00Z" },
      { name: "إبراهيم يوسف", amount: 200, date: "2025-04-29T12:10:00Z" },
    ],
    status: "pending",
  },
];

// المفتاح المستخدم لتخزين الطلبات في localStorage
const REQUESTS_KEY = "aidRequests";
// فقط أول مرة إذا ما في بيانات مخزنة
if (!localStorage.getItem("aidRequests")) {
  localStorage.setItem("aidRequests", JSON.stringify(initialRequests));
}

// localStorage.setItem("aidRequests", JSON.stringify(initialRequests));

/**
 * إرجاع جميع الطلبات المحفوظة في localStorage.
 * @returns {Array} مصفوفة الطلبات
 */

// جلب الطلبات من localStorage أو إرجاع مصفوفة فاضية إن ما في بيانات

function getAllRequests() {
  const data = localStorage.getItem(REQUESTS_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    // أول مرة: حفظ البيانات الابتدائية
    saveRequests(initialRequests);
    return initialRequests;
  }
}

/**
 * حفظ مصفوفة الطلبات في localStorage.
 * @param {Array} requests - المصفوفة المراد حفظها
 */
function saveRequests(requests) {
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

/**
 * إضافة طلب جديد إلى المصفوفة.
 * @param {Object} newRequest - الطلب الجديد (كائن)
 */
function addRequest(newRequest) {
  const requests = getAllRequests();
  requests.push(newRequest);
  saveRequests(requests);
}

/**
 * تعديل طلب موجود حسب الـ id.
 * @param {String} id - المعرف الفريد للطلب
 * @param {Object} updatedData - البيانات الجديدة المراد تعديلها
 */
function updateRequest(id, updatedData) {
  const requests = getAllRequests();
  const index = requests.findIndex((req) => req.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updatedData };
    saveRequests(requests);
  }
}

/**
 * حذف طلب حسب الـ id.
 * @param {String} id - المعرف الفريد للطلب
 */
function deleteRequest(id) {
  const requests = getAllRequests();
  const updatedRequests = requests.filter((req) => req.id !== id);
  saveRequests(updatedRequests);
}

/**
 * جلب طلب واحد حسب الـ id.
 * @param {String} id - المعرف الفريد للطلب
 * @returns {Object|null} الطلب إن وُجد أو null
 */
function getRequestById(id) {
  const requests = getAllRequests();
  return requests.find((req) => req.id === id) || null;
}

/**
 * إنشاء معرف فريد تلقائي للطلبات (UUID بسيط)
 * @returns {String} id فريد
 */
function generateId() {
  return "id-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
}

// ✅ إضافة طلب جديد:

// addRequest({
//     id: generateId(),
//     title: 'مساعدة طبية عاجلة',
//     type: 'دواء',
//     amount: 300,
//     description: 'الحالة بحاجة لدواء مزمن بشكل عاجل',
//     priority: 'عاجل',
//     status: 'جديدة',
//     image: 'path/to/image.jpg',
//     files: ['file1.pdf', 'file2.jpg'],
//     date: new Date().toISOString()
// });

//  تعديل طلب:
// updateRequest('id-1234567890-123', {
//     amount: 500,
//     priority: 'متوسطة'
// });

// ❌ حذف طلب:
// deleteRequest('id-1234567890-123');

// 📦 جلب كل الطلبات:
// const all = getAllRequests();

// 🔍 جلب طلب حسب ID:
// const request = getRequestById('id-1234567890-123');
// const initialRequest = initialRequests.forEach((req) => {
//   if (req.collected === req.goal) {
//     return (req.status = "الحالة : منتهية ");
//   } else {
//     return (req.status = "الحالة : قيد التنفيذ");
//   }
// });
