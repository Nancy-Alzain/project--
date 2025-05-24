<?php
// request-details.php

// إعدادات الاتصال بقاعدة البيانات
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wesal";

// الاتصال بقاعدة البيانات
$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}


$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($id <= 0) {
    echo "<h1>طلب غير صالح</h1>";
    exit;
}


$sql_request = "SELECT * FROM `request-help` WHERE id = ?";
$stmt = $conn->prepare($sql_request);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo "<h1>الطلب غير موجود</h1>";
    exit;
}

$request = $result->fetch_assoc();

// تحويل ملفات الإثبات من JSON إلى مصفوفة
$proof_files = [];
if (!empty($request['proof_files'])) {
    $decodedFiles = json_decode($request['proof_files'], true);
    if (is_array($decodedFiles)) {
        foreach ($decodedFiles as $fileName) {
            $proof_files[] = [
                'filename' => $fileName,
                'filepath' => 'uploads/' . $fileName
            ];
        }
    }
}

// جلب أسماء المتبرعين من جدول donors المرتبطين بالطلب
$sql_donors = "SELECT donor_name FROM donors WHERE request_id = ?";
$stmt_donors = $conn->prepare($sql_donors);
$stmt_donors->bind_param("i", $id);
$stmt_donors->execute();
$result_donors = $stmt_donors->get_result();

$donors = [];
while ($row = $result_donors->fetch_assoc()) {
    $donors[] = $row['donor_name'];
}

// حساب نسبة التقدم
$progressPercent = ($request['goal'] > 0) ? round(($request['progress'] / $request['goal']) * 100) : 0;
if ($progressPercent > 100) $progressPercent = 100;

// تحديد لون شارة الأولوية بناءً على قيمة الأولوية
$priorityClass = '';
switch ($request['priority']) {
    case 'عاجلة': 
        $priorityClass = 'urgent'; 
        break;
    case 'متوسطة': 
        $priorityClass = 'medium'; 
        break;
    case 'عادية': 
        $priorityClass = 'normal'; 
        break;
    default: 
        $priorityClass = 'normal';
}

$stmt->close();
$stmt_donors->close();
$conn->close();
?>
