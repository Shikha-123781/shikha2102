<?php 
	include_once './databaseConnection.php';
  $database = new Database();
  $dbconnect = $database->getConnection();
	$entityBody = file_get_contents('php://input');
  $entityBody = json_decode($entityBody);
	$firstname = $entityBody->firstName;
	$lastname = $entityBody->lastName;
	$email = $entityBody->email;
	$password = $entityBody->password;
	$gender = $entityBody->gender;
	$dbconnect = mysqli_connect("localhost","root","", "signupDetails");
	$arr = explode('/', $_SERVER['REQUEST_URI']);
	$count = count($arr);
	$id = $arr[$count - 1];
	$query = "update  signupinfo set firstname=
	'"+$firstname+"', lastname='"+$lastname+"', 
	gender= '"+$gender+"',email='"+$email+"', password='"+$password+"' where id=$id";
  $is_query_executed = mysqli_query($dbconnect,
	$query);
	if ($is_query_executed) {
		echo "New record updated successfully. Last updated ID is: " . $id;
	} else {
		echo "Error " . mysqli_error($dbconnect);
	}
	mysqli_close($dbconnect);
?>