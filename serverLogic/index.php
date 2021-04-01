
<?php include_once 'user.php';
header("Access-Control-Allow-Origin: *");
include_once 'db.php';
session_start();
$con = new DBConnector();
$pdo = $con->connectToDB();
$event = $_POST['event'];
if ($event == "register") {
    //register   
    $fullName = $_POST['fullName'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $cityOfResidence=$_POST['cityOfResidence'];
    $filename = $_FILES['profilePhoto']['name'];
$filetmpname = $_FILES['profilePhoto']['tmp_name'];

$folder = './profilePhotos/';

move_uploaded_file($filetmpname, $folder.$filename);
    $user = new User($username);
    $user->setPassword($password);
    $user->setFullName($fullName);
    $user->setCityOfResidence($cityOfResidence);
    $user->setProfilePhoto($filename);
    $user->register($pdo);
} else if ($event == "login") {
    //login 
   
    $username = $_POST['username'];
    $password = $_POST['password'];
    $user = new User($username);
    $user->setPassword($password);
    echo $user->login($pdo);
} else if ($event == "logout") {
   
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
   
    
    if (isset($_POST['username'])) {
        
        $oldPassword = $_POST["oldPassword"];
        $newPassword = $_POST["newPassword"];
            
            $user = new User($_POST['username']);
            $user->setPassword($oldPassword);
            $verifyOldPassword = json_decode($user->login($pdo))->verified;
            if ($verifyOldPassword==true) {
                $user->changePassword($pdo, $newPassword);
                echo "password changed successfully";
            } else {
                echo "old password does not match record";
            }
        
    }
        else {
            echo "you are not logged in mate";
        }
    
}
?>
