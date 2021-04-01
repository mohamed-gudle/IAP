<?php
include 'account.php';
 class User implements Account
{        //properties  

     protected $username;
    protected $password;
    protected $fullName;
    protected $cityOfResidence;
    protected $profilePhoto;
    //class constructor       
    function __construct($user)
    {
        $this->username = $user;
    }
  
    //full name setter       
    public function setFullName($name)
    {
        $this->fullName = $name;
    }
    public function setPassword($pass){
        $this->password=$pass;
    }
    public function setProfilePhoto($photo){
        $this->profilePhoto=$photo;
    }
    public function setCityOfResidence($cityOfResidence)
    {
        $this->cityOfResidence = $cityOfResidence;
    }
    
    //full name getter    
    public function getFullName()
    {
        return $this->fullName;
    }
    public function getCityOfResidence()
    {
        return $this->cityOfResidence;
    }
    /**        * Create a new user        * @param Object PDO Database connection handle        * @return String success or failure message        */      
      public function register($pdo)
    {
       
        $passwordHash = password_hash($this->password, PASSWORD_DEFAULT);
        try {
            $stmt = $pdo->prepare('INSERT INTO user (full_name,Username,password,city_of_residence,profile_photo) VALUES(?,?,?,?,?)');
            $stmt->execute([$this->getFullName(), $this->username, $passwordHash,$this->cityOfResidence,$this->profilePhoto]);
            $user=array('registered'=>true);
            $json_object=json_encode($user);
            return $json_object;
        } catch (PDOException $e) {
            $user=array('registered'=>false,'errorMessage'=>$e->getMessage());
            $json_object=json_encode($user);
            return $json_object;
        }
    }
    /**        * Check if a user entered a correct username and password        * @param Object PDO Database connection handle        * @return String success or failure message        */     
       public function login($pdo)
    {
        try {

            $stmt = $pdo->prepare("SELECT * FROM user WHERE username=?");
            $stmt->execute([$this->username]);
            $row = $stmt->fetch();
            if ($row == null) {
                return "This account does not exist";
            }
            if (password_verify($this->password, $row['password'])) {
                $_SESSION['username']=$row['username'];
                $user=array('username'=>$row['username'],'fullName'=>$row['full_name'],'verified'=>true,'profilePhoto'=>$row['profile_photo']);
                $json_object=json_encode($user);
                return $json_object;
            }
            else{
            $user=array('verified'=>false,'errorMessage'=>"wrong password");
            $json_object=json_encode($user);
            return $json_object;
            }
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
    public function logout($pdo){
        $_SESSION=array();
        return "logged out";

    }
    public function changePassword($pdo,$newPassword){
        
            $this->password=$newPassword;
            $passwordHash = password_hash($this->password, PASSWORD_DEFAULT);
            try{
            $stmt=$pdo->prepare("UPDATE user SET password=? where username=?");
            $stmt->execute([$passwordHash,$_SESSION['username']]);
            return "password successfully changed";
            }
            catch(PDOException $e){
                return $e->getMessage();
            }

        

    }
}
