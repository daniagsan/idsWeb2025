<?php 
  
    include 'connectionController.php';
    
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $username = $_POST['username'];
		$password = $_POST['password'];
        $email = $_POST['email'];

		$auth = new AuthController();
		$auth->register($username, $email, $password);

    }

    class AuthController{ 

        private $connection;

        public function __construct() {
            $this->connection = new ConnectionController();
        }

        public function register($username, $email, $password){

            

            $conn = $this->connection->connect();
            if ($conn && !$conn->connect_error) {

                $hashed_password = password_hash($password, PASSWORD_BCRYPT);
                
                $query = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";

                $prepared_query = $conn->prepare($query);

                $prepared_query->bind_param('sss', $username, $email, $hashed_password);

                if($prepared_query->execute()){
                    header('Location: ../home.html');
                } else {
                    echo "Error: " . $prepared_query->error;
                }

            } else {
                echo "Database connection error";
            }
        } 

    }

?>