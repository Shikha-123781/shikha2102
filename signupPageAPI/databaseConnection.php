<?php
  class Database{

  	public function getConnection(){

		  header("Acess-Control-Allow-Origin: *");
			header("Content-Type: application/json");
			header("Access-Control-Allow-Headers: *");
			header("Access-Control-Allow-Methods: PUT,GET,DELETE,POST,PATCH");
			$dbconnect = mysqli_connect("localhost","root","", "signupDetails");
		 	if (!$dbconnect) {
		    die("Connection failed: " . mysqli_connect_error());
		  }
		  return $dbconnect;
		}
	}
?>