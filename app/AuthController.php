<?php 
  
    include 'connectionController.php';
    $action = $_POST['action'];

    if($action == 'login'){

        $username = $_POST['username'];
		$password = $_POST['password'];
        $email = $_POST['email'];

		$auth = new AuthController();
		$auth->login($username,$password,$email);

    }

    class AuthController{ 

        private $connection;

        public function __construct() {
            $this->connection = new ConnectionController();
        }

        function login($username,$password,$email){

            $conn = $this->connection->connect();
            if (!$conn->connect_error) {
                
                $query = "select * from usuarios where username = ?, email = ? and password = ?";

                $prepared_query = $conn->prepare($query);

                $prepared_query->bind_param('ss', $username, $password);

                $prepared_query->execute();

                $results = $prepared_query->get_result();
                $users = $results->fetch_all(MYSQLI_ASSOC);

                if (count($users)>0) {
                    
                    header('Location: ../home.html');

                }else
                    header('Location: ../registro/registro.html');
                
            }else
                header('Location: ../registro/registro.html');
        } 

    }

?>