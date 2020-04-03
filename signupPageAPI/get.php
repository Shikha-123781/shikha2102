<?php 
  header("Acess-Control-Allow-Origin: *");
  header("Content-Type: application/json");
	$dbconnect = mysqli_connect("localhost","root","","signupdetails");
 	if (!$dbconnect) {
    die("Unable to connect to DB: " . mysqli_error());
  }
	$query = "select * from signupinfo";
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
      "firstname" => $firstname,
      "lastname" => $lastname,
      "email" => $email,
      "gender" => $gender,
      "id" => $id
    );
    array_push($_response,$response_item);
  }
	mysqli_close($dbconnect);
	$_response = json_encode($_response);
	echo $_response;
?>