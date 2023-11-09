<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = $_POST["fullName"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $to = "m123jeleniewski@gmail.com";
    $subject = "Nowa wiadomość z formularza kontaktowego";
    $messageBody = "Od: $fullName\nE-mail: $email\nWiadomość: $message";

    $headers = "From: admin@michaljeleniewski.pl";

    if (mail($to, $subject, $messageBody, $headers)) {
        echo "Wiadomość została wysłana!";
    } else {
        echo "Wystąpił problem podczas wysyłania wiadomości.";
    }
}
?>
