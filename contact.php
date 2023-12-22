<?php
//get data from form  
$name = $_POST['Name'];
$email= $_POST['eMail'];
$subject= $_POST['Subject'];
$message= $_POST['message'];

$to = "hrsimman1011@gmail.com";
// $subject = "Mail For You";

$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n  Subject = " . $subject . "\r\n Message =" . $message;
$headers = "From: noreply@yoursite.com" . "\r\n" .
"CC: somebodyelse@example.com";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:thankyou.html");
?>