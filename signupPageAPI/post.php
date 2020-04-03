<?php 
	$firstname=null;
	$lastname=null;
	$email=null;
	$password=null;
	$gender=null;
	header("Acess-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	$entityBody = file_get_contents('php://input');
	if($_POST['firstname'])
	{
		$firstname=$_POST['firstname'];
	}
	if($_POST['lastname']) {
	 $lastname=$_POST['lastname'];
	} 
	if($_POST['email']) {
	 $email=$_POST['email'];;
	} 
	if($_POST['password']) {
	  $password=$_POST['password'];
	}
	if($_POST['gender']) {
	  $gender=$_POST['gender'];
	}  
	echo $_SERVER['QUERY_STRING'];
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