<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		
		$searchParam = "%" . $inData["searchParam"] . "%";
		$searchuserId = "%" . $inData["userId"] . "%";
		
		if (strpos($inData["searchParam"], ' ') !== false) {
			// Search by both first name and last name
			$stmt = $conn->prepare("SELECT FirstName, LastName, Phone, Email, ID, Location, HairColor, EyeColor, HeightCM FROM Contacts WHERE (UserID LIKE ?) AND (FirstName LIKE ? AND LastName LIKE ?)");
			$splitTerms = explode(' ', $searchParam);
			$searchfirst = $splitTerms[0];
			$searchlast = $splitTerms[1];
		} else {
			// Search only by first name or last name
			$stmt = $conn->prepare("SELECT FirstName, LastName, Phone, Email, ID, Location, HairColor, EyeColor, HeightCM FROM Contacts WHERE (UserID LIKE ?) AND (FirstName LIKE ? OR LastName LIKE ?)");
			$searchfirst = $searchParam;
			$searchlast = $searchParam;
		}
		
		
		$stmt->bind_param("sss", $searchuserId, $searchfirst, $searchlast);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"firstName":"' . $row["FirstName"] . '", "lastName":"' . $row["LastName"] . '", "phone":"' . $row["Phone"] . '","email":"' . $row["Email"] . '","location":"' . $row["Location"] . '","hairColor":"' . $row["HairColor"] . '","eyeColor":"' . $row["EyeColor"] . '","height":"' . $row["HeightCM"] .'","contactId":"' . $row["ID"] . '" }';
		}
		$searchResults = rtrim($searchResults, ',');
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
		$stmt->close();
		$conn->close();
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
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
