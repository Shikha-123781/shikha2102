<?php 
	header("Acess-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	header("Access-Control-Allow-Headers: *");
	$entityBody = file_get_contents('php://input');
    $entityBody = json_decode($entityBody);
	$firstname = $entityBody->firstName;
	$lastname = $entityBody->lastName;
	$email = $entityBody->email;
	$password = $entityBody->password;
	$gender = $entityBody->gender;
	$dbconnect = mysqli_connect("localhost","root","", "signupDetails");
	if (!$dbconnect) {
	  die("Connection failed: " . mysqli_connect_error());
	}
	$query = "insert into signupInfo (
	firstname,lastname,email,password, gender) values ('".$firstname."','".$lastname."','".$email."','".$password."','".$gender."')";
	$is_query_executed = mysqli_query($dbconnect,$query);
  if ($is_query_executed) {
		$last_id = mysqli_insert_id($dbconnect);
		  echo "New record created successfully. Last inserted ID is: " . $last_id;
	} else {
		echo "Error " . mysqli_error($dbconnect);
	}
	mysqli_close($dbconnect);
?>