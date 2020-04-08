<?php 
	include_once './databaseConnection.php';
  $database = new Database();
  $dbconnect = $database->getConnection();
	$entityBody = file_get_contents('php://input');
  $entityBody = json_decode($entityBody,true);
	$name = $entityBody->name;
	$userName = $entityBody->userName;
	$email = $entityBody->email;
	$password = $entityBody->password;
	$age = $entityBody->age;
	$query = "insert into signupInfo (
	name,userName,email,password, age) values ('".$name."','".$userName."','".$email."','".$password."','".$age."')";
	$is_query_executed = mysqli_query($dbconnect,$query);
  if ($is_query_executed) {
		$last_id = mysqli_insert_id($dbconnect);
		  echo "New record created successfully. Last inserted ID is: " . $last_id;
	} else {
		echo "Error " . mysqli_error($dbconnect);
	}
	mysqli_close($dbconnect);
?>