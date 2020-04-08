<?php 
  include_once './databaseConnection.php';
  $database = new Database();
  $dbconnect = $database->getConnection();
  $entityBody = file_get_contents('php://input');
  $entityBody = "shikha2102";
  $query = "select * from signupinfo where userName='".$entityBody."'";
	$query_result = mysqli_query($dbconnect,$query);
  if (!$query_result) {
    die('error'.mysqli_error($dbconnect));
  }
  if (mysqli_num_rows($query_result) == 0) {
    echo 'no rows';
    exit;
  }
  $response_item = array();
  $row = mysqli_fetch_assoc($query_result);
    extract($row);
    $response_item=array(
      "folder" => $folder,
      "file" => $file,
      "folderChain" => $folderChain,
      "view" => $view,
      "id" => $id
    );
	mysqli_close($dbconnect);
	$response_item = json_encode($response_item);
	echo $response_item;
?>