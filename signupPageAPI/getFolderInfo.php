<?php 
  include_once './databaseConnection.php';
  $database = new Database();
  $dbconnect = $database->getConnection();
	$query = "select * from signupinfo where userName=$userName";
	$query_result = mysqli_query($dbconnect,$query);
  if (!$query_result) {
    die("Could not successfully run query ($sql) from DB: " . mysqli_error());
  }
  if (mysqli_num_rows($query_result) == 0) {
    echo "No rows found";
    exit;
  }
  $_response=[];
  while ($row = mysqli_fetch_assoc($query_result)) {
    extract($row);
    $response_item=array(
      "name" => $name,
      "userName" => $userName,
      "email" => $email,
      "age" => $age,
      "password"=>$password,
      "isLogin"=>$isLogin,
      "id" => $id
    );
    array_push($_response,$response_item);
  }
	mysqli_close($dbconnect);
	$_response = json_encode($_response);
	echo $_response;
?>