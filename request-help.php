<?php
// process_request.php

// الاتصال بقاعدة البيانات
$conn = new mysqli("localhost", "root", "", "wesal");
if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // استقبال بيانات النموذج
    $title = $_POST['title'] ?? '';
    $type = $_POST['type'] ?? '';
    $goal = $_POST['goal'] ?? 0;
    $description = $_POST['description'] ?? '';
    $priority = $_POST['priority'] ?? '';
    $location = $_POST['location'] ?? '';
    $extra = $_POST['extra'] ?? '';
    $agree = isset($_POST['agree']) ? 1 : 0;

    if (!$agree) {
        die("يجب الموافقة على الشروط والأحكام لإرسال الطلب.");
    }

    // مجلد رفع الملفات
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $uploadedFiles = [];

    // التعامل مع الملفات المرفوعة
    if (isset($_FILES['proof-files'])) {
        $files = $_FILES['proof-files'];
        $fileCount = count($files['name']);

        for ($i = 0; $i < $fileCount; $i++) {
            $fileName = basename($files['name'][$i]);
            $tmpName = $files['tmp_name'][$i];
            $fileError = $files['error'][$i];
            $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

            $allowed = ['jpg', 'jpeg', 'png', 'pdf'];

            if ($fileError === 0 && in_array($fileExt, $allowed)) {
                $newName = uniqid('proof_', true) . '.' . $fileExt;
                $destination = $uploadDir . $newName;

                if (move_uploaded_file($tmpName, $destination)) {
                    $uploadedFiles[] = $newName;
                }
            }
        }
    }

    // تحويل أسماء الملفات إلى JSON
    $proofFilesJson = json_encode($uploadedFiles, JSON_UNESCAPED_UNICODE);

    $stmt = $conn->prepare("INSERT INTO help_requests 
        (title, type, goal, description, priority, location, extra, agree, proof_files)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param("ssdssssss", $title, $type, $goal, $description, $priority, $location, $extra, $agree, $proofFilesJson);

    if ($stmt->execute()) {
        echo "<h1>✅ تم استلام طلب المساعدة بنجاح</h1>";
        echo "<p><strong>عنوان المساعدة:</strong> " . htmlspecialchars($title) . "</p>";
        echo "<p><strong>نوع المساعدة:</strong> " . htmlspecialchars($type) . "</p>";
        echo "<p><strong>المبلغ المطلوب:</strong> " . htmlspecialchars($goal) . "</p>";
        echo "<p><strong>الوصف:</strong> " . nl2br(htmlspecialchars($description)) . "</p>";
        echo "<p><strong>الأولوية:</strong> " . htmlspecialchars($priority) . "</p>";
        echo "<p><strong>الموقع الجغرافي:</strong> " . htmlspecialchars($location) . "</p>";
        echo "<p><strong>تفاصيل إضافية:</strong> " . nl2br(htmlspecialchars($extra)) . "</p>";

        if (!empty($uploadedFiles)) {
            echo "<p><strong>الملفات المرفقة:</strong></p><ul>";
            foreach ($uploadedFiles as $file) {
                echo "<li><a href='$uploadDir$file' target='_blank'>" . htmlspecialchars($file) . "</a></li>";
            }
            echo "</ul>";
        } else {
            echo "<p>لم يتم رفع أي ملفات.</p>";
        }
    } else {
        echo "❌ حدث خطأ أثناء إرسال الطلب: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    // إعادة التوجيه إذا لم يكن الطلب POST
    header('Location: request-help.html');
    exit;
}
?>
