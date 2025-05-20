<?php
session_start();
$loginMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];

    $conn = new mysqli('localhost', 'root', '', 'wesal');
    if ($conn->connect_error) {
        die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['username'] = $user['username'];
            header("Location: landing.php");
            exit;
        } else {
            $loginMessage = "<p style='color:red;'>كلمة المرور غير صحيحة.</p>";
        }
    } else {
        $loginMessage = "<p style='color:red;'>البريد الإلكتروني غير مسجل.</p>";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل دخول</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Open+Sans:wdth,wght@75..100,300..800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="css/header&footer.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/headerBtns.css">
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>
<body>
<header class="auth-header">
  <div class="logo-box">
    <a class="logo" href="">
        <img src="img/Group.png" alt="logo">
        <h3>وصال</h3>
    </a>
    <div class="top-buttons">
        <a href="landing.htm" class="main-btn">الرئيسية</a>
        <a href="login.php" class="auth-btn">تسجيل الدخول</a>
        <a href="sign-up.htm" class="auth-btn secondary">إنشاء حساب</a>
    </div>
  </div>
  <div class="text">
    <h1 class="welcome-message">أهلًا بك في منصتنا الإنسانية 💙</h1>
    <p class="sub-message">نرافقك بخطوة بخطوة نحو الأمل</p>
  </div>
</header>

<div class="container">
    <div class="con-logo">
        <div class="logo">
            <img src="img/Group.png" alt="logo">
        </div>
        <div class="text">
            <h2>وصال</h2>
            <p>جسر التواصل والمساعدة بين القلوب المحتاجة والمتبرعين</p>
        </div>
    </div>
    <div class="con-text">
        <p>تسجيل الدخول</p>
        <p>سعيدين بتواجدك مرة اخرى هنا!</p>
    </div>
    <div class="container-form">
        <?php if (!empty($loginMessage)) echo "<div class='login-msg'>$loginMessage</div>"; ?>

        <form action="" method="POST" target="_self">
            <input type="email" id="email" name="email" placeholder="البريد الالكتروني" required>
            <input type="password" name="password" id="password" placeholder="كلمة المرور" required>
            <a class="forget" id="forget" href="#">هل نسيت كلمة المرور؟</a>
            <input type="submit" value="تسجيل الدخول">
            <div class="other-way">
                <p>أو تسجيل الدخول باستخدام</p>
                <div id="google-button-container"></div>
            </div>
        </form>
        <div class="new-acount">ليس لديك حساب؟ <a href="sign-up.htm">قم بإنشاء حسابك الآن</a></div>
    </div>
</div>

<!-- Modal for Forget Password -->
<div id="forgetModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h3>استعادة كلمة المرور</h3>
        <p>أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين</p>
        <input type="email" placeholder="البريد الإلكتروني" class="modal-input" required>
        <button class="modal-button">إرسال</button>
    </div>
</div>

<!-- Toast Message For Forget -->
<div id="toast-pass" class="toast-pass"></div>

<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script src="js/login.js"></script>
<script src="js/forgetpasss.js"></script>
</body>
</html>
<?php
session_start();
$loginMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];

    $conn = new mysqli('localhost', 'root', '', 'wesal');
    if ($conn->connect_error) {
        die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['username'] = $user['username'];
            header("Location: landing.php");
            exit;
        } else {
            $loginMessage = "<p style='color:red;'>كلمة المرور غير صحيحة.</p>";
        }
    } else {
        $loginMessage = "<p style='color:red;'>البريد الإلكتروني غير مسجل.</p>";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل دخول</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Open+Sans:wdth,wght@75..100,300..800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="css/header&footer.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/headerBtns.css">
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>
<body>
<header class="auth-header">
  <div class="logo-box">
    <a class="logo" href="">
        <img src="img/Group.png" alt="logo">
        <h3>وصال</h3>
    </a>
    <div class="top-buttons">
        <a href="landing.htm" class="main-btn">الرئيسية</a>
        <a href="login.php" class="auth-btn">تسجيل الدخول</a>
        <a href="sign-up.htm" class="auth-btn secondary">إنشاء حساب</a>
    </div>
  </div>
  <div class="text">
    <h1 class="welcome-message">أهلًا بك في منصتنا الإنسانية 💙</h1>
    <p class="sub-message">نرافقك بخطوة بخطوة نحو الأمل</p>
  </div>
</header>

<div class="container">
    <div class="con-logo">
        <div class="logo">
            <img src="img/Group.png" alt="logo">
        </div>
        <div class="text">
            <h2>وصال</h2>
            <p>جسر التواصل والمساعدة بين القلوب المحتاجة والمتبرعين</p>
        </div>
    </div>
    <div class="con-text">
        <p>تسجيل الدخول</p>
        <p>سعيدين بتواجدك مرة اخرى هنا!</p>
    </div>
    <div class="container-form">
        <?php if (!empty($loginMessage)) echo "<div class='login-msg'>$loginMessage</div>"; ?>

        <form action="" method="POST" target="_self">
            <input type="email" id="email" name="email" placeholder="البريد الالكتروني" required>
            <input type="password" name="password" id="password" placeholder="كلمة المرور" required>
            <a class="forget" id="forget" href="#">هل نسيت كلمة المرور؟</a>
            <input type="submit" value="تسجيل الدخول">
            <div class="other-way">
                <p>أو تسجيل الدخول باستخدام</p>
                <div id="google-button-container"></div>
            </div>
        </form>
        <div class="new-acount">ليس لديك حساب؟ <a href="sign-up.htm">قم بإنشاء حسابك الآن</a></div>
    </div>
</div>

<!-- Modal for Forget Password -->
<div id="forgetModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h3>استعادة كلمة المرور</h3>
        <p>أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين</p>
        <input type="email" placeholder="البريد الإلكتروني" class="modal-input" required>
        <button class="modal-button">إرسال</button>
    </div>
</div>

<!-- Toast Message For Forget -->
<div id="toast-pass" class="toast-pass"></div>

<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script src="js/login.js"></script>
<script src="js/forgetpasss.js"></script>
</body>
</html>
<?php
session_start();
$loginMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];

    $conn = new mysqli('localhost', 'root', '', 'wesal');
    if ($conn->connect_error) {
        die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['username'] = $user['username'];
            header("Location: landing.php");
            exit;
        } else {
            $loginMessage = "<p style='color:red;'>كلمة المرور غير صحيحة.</p>";
        }
    } else {
        $loginMessage = "<p style='color:red;'>البريد الإلكتروني غير مسجل.</p>";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل دخول</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Open+Sans:wdth,wght@75..100,300..800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="css/header&footer.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/headerBtns.css">
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>
<body>
<header class="auth-header">
  <div class="logo-box">
    <a class="logo" href="">
        <img src="img/Group.png" alt="logo">
        <h3>وصال</h3>
    </a>
    <div class="top-buttons">
        <a href="landing.htm" class="main-btn">الرئيسية</a>
        <a href="login.php" class="auth-btn">تسجيل الدخول</a>
        <a href="sign-up.htm" class="auth-btn secondary">إنشاء حساب</a>
    </div>
  </div>
  <div class="text">
    <h1 class="welcome-message">أهلًا بك في منصتنا الإنسانية 💙</h1>
    <p class="sub-message">نرافقك بخطوة بخطوة نحو الأمل</p>
  </div>
</header>

<div class="container">
    <div class="con-logo">
        <div class="logo">
            <img src="img/Group.png" alt="logo">
        </div>
        <div class="text">
            <h2>وصال</h2>
            <p>جسر التواصل والمساعدة بين القلوب المحتاجة والمتبرعين</p>
        </div>
    </div>
    <div class="con-text">
        <p>تسجيل الدخول</p>
        <p>سعيدين بتواجدك مرة اخرى هنا!</p>
    </div>
    <div class="container-form">
        <?php if (!empty($loginMessage)) echo "<div class='login-msg'>$loginMessage</div>"; ?>

        <form action="" method="POST" target="_self">
            <input type="email" id="email" name="email" placeholder="البريد الالكتروني" required>
            <input type="password" name="password" id="password" placeholder="كلمة المرور" required>
            <a class="forget" id="forget" href="#">هل نسيت كلمة المرور؟</a>
            <input type="submit" value="تسجيل الدخول">
            <div class="other-way">
                <p>أو تسجيل الدخول باستخدام</p>
                <div id="google-button-container"></div>
            </div>
        </form>
        <div class="new-acount">ليس لديك حساب؟ <a href="sign-up.htm">قم بإنشاء حسابك الآن</a></div>
    </div>
</div>

<!-- Modal for Forget Password -->
<div id="forgetModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h3>استعادة كلمة المرور</h3>
        <p>أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين</p>
        <input type="email" placeholder="البريد الإلكتروني" class="modal-input" required>
        <button class="modal-button">إرسال</button>
    </div>
</div>

<!-- Toast Message For Forget -->
<div id="toast-pass" class="toast-pass"></div>

<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script src="js/login.js"></script>
<script src="js/forgetpasss.js"></script>
</body>
</html>
