<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// إعدادات قاعدة البيانات
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'wesal';

// الاتصال بقاعدة البيانات
$conn = new mysqli($host, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}

// التحقق من أن الطلب من نوع POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // استقبال البيانات
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // التحقق من أن الحقول غير فارغة
    if (empty($name) || empty($email) || empty($message)) {
        header("Location: contact-us.htm?status=error");
        exit;
    }

    // تحضير الاستعلام
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);

    // تنفيذ الاستعلام والتحقق من النجاح
    if ($stmt->execute()) {
        header("Location: contact-us.htm?status=success");
        exit;
    } else {
        header("Location: contact-us.htm?status=error");
        exit;
    }

    // إغلاق الاتصال
    $stmt->close();
    $conn->close();
} else {
    // إذا لم يكن الطلب من نوع POST، الرجوع للصفحة الرئيسية
    header("Location: contact-us.htm");
    exit;
}
?>
