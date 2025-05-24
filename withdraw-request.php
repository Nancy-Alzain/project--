<?php
// الاتصال بقاعدة البيانات
$conn = new mysqli("localhost", "db_user", "db_pass", "db_name");
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "فشل الاتصال بقاعدة البيانات."]));
}


$amount = $_POST['amount'] ?? 0;
$method = $_POST['method'] ?? '';
$bankName = $_POST['bankName'] ?? null;
$accountNumber = $_POST['accountNumber'] ?? null;
$accountHolder = $_POST['accountHolder'] ?? null;
$walletType = $_POST['walletType'] ?? null;
$walletNumber = $_POST['walletNumber'] ?? null;
$userId = $_POST['user_id'] ?? 1; // مثال ثابت

// التحقق من أن هناك مبلغ وطريقة سحب
if ($amount <= 0 || empty($method)) {
    echo json_encode(["status" => "error", "message" => "الرجاء إدخال المبلغ واختيار طريقة السحب."]);
    exit;
}

// حفظ الطلب في قاعدة البيانات
$stmt = $conn->prepare("INSERT INTO withdrawal_requests 
(user_id, amount, method, bank_name, account_number, account_holder, wallet_type, wallet_number, status, created_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'معلق', NOW())");

$stmt->bind_param("idssssss", $userId, $amount, $method, $bankName, $accountNumber, $accountHolder, $walletType, $walletNumber);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "تم إرسال طلب السحب بنجاح."]);
} else {
    echo json_encode(["status" => "error", "message" => "فشل في إرسال الطلب: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>

