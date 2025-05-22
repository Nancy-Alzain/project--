<?php
$conn = new mysqli('localhost', 'root', '', 'wesal');
if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

$query = "SELECT * FROM donations where is_verify  = 1 ORDER BY requested_at DESC";
$result = $conn->query($query);
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>المساعدات المتاحة </title>
        <!-- Normalize  File  -->
        <link rel="stylesheet" href="css/normalize.css">
        <!-- Google Font -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Open+Sans:wdth,wght@75..100,300..800&display=swap" rel="stylesheet">
        <!-- Font Awesome -->
         <link rel="stylesheet" href="css/all.min.css">
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
         <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    
        <!-- CSS File -->
         <link rel="stylesheet" href="css/header&footer.css">
         <link rel="stylesheet" href="css/avialableHelp.css">
         
</head>
<body>
<div class="header">
            <?php include "inc/head.php" ?> 
          
     
    </div>
    <div class="container">
        <h1>اختر الخير الذي يصلك بقلوبهم</h1>
        <p class="description">في هذا القسم، تجد الحالات الإنسانية التي تحتاج دعمك. ساهم في علاج، إطعام، أو توفير الأمان لعائلة تنتظرك – كل تبرع يصنع فرقاً حقيقياً!</p>

        <div class="filters">
            <button class="active" onclick="filterCards('all')">تصفح كل المساعدات</button>
            <button onclick="filterCards('مساعدات غذائية')">مساعدات غذائية</button>
            <button onclick="filterCards('مساعدات طبية')">مساعدات طبية</button>
            <button onclick="filterCards('مساعدات ملابس')">مساعدات ملابس</button>
            <button onclick="filterCards('مساعدات نقدية')">مساعدات نقدية</button>
            <button onclick="filterCards('اخرى')">أخرى</button>
        </div>

        <div class="cards" id="cards-container">
        <?php while($row = $result->fetch_assoc()): ?>
            <?php
                $percentage = min(($row['collected_amount'] / $row['request_amount']) * 100, 100);
                $category = $row['type'];
            ?>

<p id="no-data" style="display:none; text-align: center; color: red; font-weight: bold; margin-top: 20px;">
    لا توجد بيانات لعرضها
</p>
<a href="help-details.php?id=<?= $row['id'] ?>" class="card-link">

            <div class="card" data-category="<?= htmlspecialchars($category) ?>">
                <img src="<?= htmlspecialchars($row['image']) ?>" alt="<?= htmlspecialchars($row['title']) ?>">
                <div class="badge <?= $row['tag'] == 'حالة جديدة' ? 'new' : 'urgent' ?>">
                    <?= $row['tag'] ? $row['tag'] : 'حالة جديدة' ?>
                </div>
                <div class="card-body">
                    <div class="card-title"><?= htmlspecialchars($row['title']) ?></div>
                    <div class="card-desc"><?= htmlspecialchars(mb_substr($row['details'], 0, 80)) ?>...</div>
                    <div class="card-category"><?= htmlspecialchars($row['type']) ?></div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: <?= $percentage ?>%;"></div>
                    </div>
                    <div class="progress-text">
                        <?= number_format($row['collected_amount']) ?> / <?= number_format($row['request_amount']) ?> دولار
                    </div>
                </div>
            </div>
            </a>
        <?php endwhile; ?>
        </div>
    </div>

    <?php //include "inc/footer.php"; ?>

    <script>
    function filterCards(category) {
    const allCards = document.querySelectorAll(".card");
    let visibleCount = 0;

    allCards.forEach(card => {
        if (category === 'all' || card.getAttribute("data-category") === category) {
            card.classList.remove("hidden");
            visibleCount++;
        } else {
            card.classList.add("hidden");
        }
    });

   
    const noDataMsg = document.getElementById("no-data");
    if (visibleCount === 0) {
        noDataMsg.style.display = "block";
    } else {
        noDataMsg.style.display = "none";
    }

  
    document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.filters button[onclick*="${category}"]`)?.classList.add("active");
}

        document.querySelector(".logout").onclick = () => window.location.href = "login.php";
    </script>
    <script src="js/header.js"></script>
</body>
</html>
<?php $conn->close(); ?>
