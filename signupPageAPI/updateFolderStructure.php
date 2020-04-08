<?php 
	include_once './databaseConnection.php';
  $database = new Database();
  $dbconnect = $database->getConnection();
  $entityBody = file_get_contents('php://input');
  $entityBody = json_decode($entityBody,true );
  $folder = $entityBody->folder;
	$file = $entityBody->file;
	$folderChain = $entityBody->folderChain;
	$view = $entityBody->view;
	$userName = $entityBody->userName;
  $query = "update  signupinfo set folder=
	'".$folder."', file='".$file."', 
	folderChain= '".$folderChain."',view='".$view."' where userName=
	$userName";
  $is_query_executed = mysqli_query($dbconnect,
	$query);
	if ($is_query_executed) {
		echo "New record updated successfully. Last updated ID is: " . $id;
	} else {
		echo "Error " . mysqli_error($dbconnect);
	}
	mysqli_close($dbconnect);
?>