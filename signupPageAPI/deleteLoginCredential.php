<?php 
	include_once './databaseConnection.php';
  $database = new Database();
  $dbconnect = $database->getConnection();
	$entityBody = file_get_contents('php://input');
	$arr = explode('/', $_SERVER['REQUEST_URI']);
	$count = count($arr);
	$id = $arr[$count - 1];
	$query = "update  signupinfo set folderChain=null, isLogin=false where id=$id";
	$is_query_executed = mysqli_query($dbconnect,$query);
	if ($is_query_executed) {
		echo " record deleted successfully. Last deleted ID is: " . $id;
	} else {
		 	echo "Error " . mysqli_error($dbconnect);
	}
	mysqli_close($dbconnect);
?>