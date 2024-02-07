<?php
	$inData = getRequestInfo();
	
	$userId = $inData["userId"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$location = $inData["location"];
	$hairColor = $inData["hairColor"];
	$eyeColor = $inData["eyeColor"];
	$height = $inData["height"];


	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (FirstName, LastName, Phone, Email, UserID, Location, HairColor, EyeColor,HeightCM) VALUES(?,?,?,?,?,?,?,?,?)");
		$stmt->bind_param("sssssssss", $firstName, $lastName, $phone, $email, $userId, $location , $hairColor, $eyeColor, $height);
		$stmt->execute();
		$contactId = $stmt->insert_id;
		$stmt->close();
		$conn->close();
		returnWithError("", $contactId);
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err, $id)
	{
		$retValue = '{"contactId":' . $id . ',"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>