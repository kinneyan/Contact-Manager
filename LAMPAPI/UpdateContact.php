<?php
$inData = getRequestInfo();

$userId = $inData["userId"];
$contactId = $inData["contactId"];
$firstName = $inData["firstName"];
$lastName = $inData["lastName"];
$phone = $inData["phone"];
$email = $inData["email"];
$location = $inData["location"];
$hairColor = $inData["hairColor"];
$eyeColor = $inData["eyeColor"];
$height = $inData["height"];

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=?, Location=?, HairColor=?, EyeColor=?, HeightCM=? WHERE UserID=? AND ID=?");
    $stmt->bind_param("ssssssssii", $firstName, $lastName, $phone, $email, $location, $hairColor, $eyeColor, $height, $userId, $contactId);
    $stmt->execute();
    
    if ($stmt->affected_rows === 0) {
        returnWithError("No contact found for the provided ID.");
    } else {
        returnWithError("");
    }
    
    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err)
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}
?>
