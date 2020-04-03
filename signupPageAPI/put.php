<?php 
	$firstname = null;
	$lastname = null;
	$email = null;
	$password = null;
	$gender = null;
	header("Acess-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	parse_str($_SERVER["QUERY_STRING"]);
	if ($_REQUEST['firstname'])
	{
		$firstname=$_POST['firstname'];
	}
	if ($_POST['lastname']) {
	 $lastname=$_POST['lastname'];
	} 
	if ($_POST['email']) {
	 $email=$_POST['email'];;
	} 
	if ($_POST['password']) {
	  $password=$_POST['password'];
	}
	if ($_POST['gender']) {
	  $gender=$_POST['gender'];
	}  
	echo $_SERVER['QUERY_STRING'];
	$dbconnect = mysqli_connect("localhost","root","", "signupDetails");
 	if (!$dbconnect) {
    die("Connection failed: " . mysqli_connect_error());
  }
	$query = "update  signupinfo set firstname=
	'$firstname', lastname='$lastname', 
	gender= '$gender',email='$email', password=
	'$password' where id=$id";
  $is_query_executed = mysqli_query($dbconnect,
	$query);
	if ($is_query_executed) {
		echo "New record updated successfully. Last inserted ID is: " . $id;
	} else {
		echo "Error " . mysqli_error($dbconnect);
	}
	mysqli_close($dbconnect);
?>