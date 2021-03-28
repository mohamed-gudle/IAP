
<?php include_once 'user.php';
header("Access-Control-Allow-Origin: *");
include_once 'db.php';
$con = new DBConnector();
$pdo = $con->connectToDB();
$event = $_POST['event'];
if ($event == "register") {
    //register   
    $fullName = $_POST['fullName'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $user = new User($username);
    $user->setPassword($password);
    $user->setFullName($fullName);
    echo $user->register($pdo);
} else if ($event == "login") {
    //login 
    session_start();
    $username = $_POST['username'];
    $password = $_POST['password'];
    $user = new User($username);
    $user->setPassword($password);
    echo $user->login($pdo);
} else if ($event == "logout") {
    session_start();
    if (isset($_SESSION['username'])) {
        $user = new User($_SESSION['username']);

        $user->logout($pdo);
        session_unset();
        echo "session ended";
        sleep(10);
    } else {
        echo "not logged in";
    }

} 
else if ($event == "changePassword") {
    session_start();
    echo "starting changing process";
    if (isset($_SESSION['username'])) {
        echo "username is not set";
        $oldPassword = $_POST["oldPassword"];
        $newPassword = $_POST["newPassword"];
        if (isset($_SESSION['username'])) {
            
            $user = new User($_SESSION['username']);
            $user->setPassword($oldPassword);
            $verifyOldPassword = $user->login($pdo);
            if ($verifyOldPassword==true) {
                $user->changePassword($pdo, $newPassword);
                echo "password changed successfully";
            } else {
                echo "old password doesnot match record";
            }
        } 
        else {
            echo "you are not logged in mate";
        }
    }
}
else if($event == "changePassword"){
    
}
?>
