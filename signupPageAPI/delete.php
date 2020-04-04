<?php 
	$firstname = null;
	$lastname = null;
	$email = null;
	$password = null;
	$gender = null;
	header("Acess-Control-Allow-Origin: *");
	header("Content-Type: application/json");
	header("Access-Control-Allow-Methods: DELETE");
	$entityBody = file_get_contents('php://input');
	$arr = explode('/', $_SERVER['REQUEST_URI']);
	$count = count($arr);
	$id = $arr[$count - 1];
	$dbconnect = mysqli_connect("localhost","root","","signupdetails");
 	if (!$dbconnect) {
    die("Connection failed: " .
      mysqli_connect_error());
    }
	$query = "delete from signupinfo where id=$id";
	$is_query_executed = mysqli_query($dbconnect,$query);
	if ($is_query_executed) {
		echo " record deleted successfully. Last deleted ID is: " . $id;
	} else {
		 	echo "Error " . mysqli_error($dbconnect);
	}
	mysqli_close($dbconnect);
?>