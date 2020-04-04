<?php 
	header("Acess-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	header("Access-Control-Allow-Headers: *");
	header("Access-Control-Allow-Methods: PUT");
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
	$dbconnect = mysqli_connect("localhost","root","", "signupDetails");
 	if (!$dbconnect) {
    die("Connection failed: " . mysqli_connect_error());
  }
	$query = "update  signupinfo set firstname=
	'"+$firstname+"', lastname='"+$lastname+"', 
	gender= '"+$gender+"',email='"+$email+"', password='"+$password+"' where id=$id";
  $is_query_executed = mysqli_query($dbconnect,
	$query);
	if ($is_query_executed) {
		echo "New record updated successfully. Last inserted ID is: " . $id;
	} else {
		echo "Error " . mysqli_error($dbconnect);
	}
	mysqli_close($dbconnect);
?>