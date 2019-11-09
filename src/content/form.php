<?php
  $emailError = $phoneError = $messageError = $checkboxError = "";
  $userName = $userTitle = $userEmail = $countryCode = $userPhone = $userMessage = "";
  
  require 'PHPMailerAutoload.php';
  require 'credentials.php';
  $mail = new PHPMailer;
  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
  
  if(isset($_POST['submit'])){

    // NAME VALIDATION
    if (empty($_POST['userName'])) {
      $userName = "User";
    } else {
      $userName = test_input($_POST['userName']);
    }
    // TITLE VALIDATION
    if (empty($_POST['userTitle'])) {
      $userTitle = "Inquiry";
    } else {
      $userTitle = test_input($_POST['userTitle']);
    }
    // E-MAIL VALIDATION
    if (empty($_POST['userEmail'])) {
      $emailError = "Please provide your e-mail address";
    } else {
      $userEmail = test_input($_POST['userEmail']);
      if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
        $emailError = "Invalid e-mail format";
      }
    }
    // COUNTRY CODE VALIDATION
    $countryCode = test_input($_POST['userCountryCode']);
    if ( !preg_match("/^(\+?\d{1,3}|\d{1,4})$/", $countryCode) and $countryCode != "" ) {
      $phoneError = "Invalid phone format";
    }
    // PHONE VALIDATION
    $userPhone = test_input($_POST['userPhone']);
    if ( !preg_match("/^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{3}$/i", $userPhone) and $userPhone != "" ) {
      $phoneError = "Invalid phone format";
    }
    // DESCRIPTION VALIDATION
    if (empty($_POST['userMessage'])) {
      $messageError = "Please type your message";
    } else {
      $userMessage = test_input($_POST['userMessage']);
    }
    // CHECKBOX VALIDATION
    if (!$_POST['checkboxAccept']) {
      $checkboxError = "Verification failed";
    }
    // SENDING FORM
    if ($emailError == "" and $phoneError == "" and $messageError == "" and $checkboxError == "") {
      try {
        $mail->SMTPDebug = 1;
        $mail->isSMTP();
        $mail->Host = 's75.linuxpl.com';
        $mail->SMTPAuth = true;
        $mail->Username = EMAIL;
        $mail->Password = PASSWORD;
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom(EMAIL, 'Jakub');
        $mail->addAddress(EMAIL, $userName);
        //$mail->addReplyTo(EMAIL);
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');
        // Add attachments
        //$mail->addAttachment('/var/tmp/file.tar.gz');
        // Optional name  
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');

        $body = '
        <p>Message sent from: <strong>' . $userEmail . '</strong></p>
        <p>Hello Jakub!</p>
        <p>My name is ' . $userName . '</p>
        <p>' . $userMessage . '</p>
        <p>My phone number is: ' . $userPhone . '</p>';

        $mail->isHTML(true);
        $mail->Subject = $userTitle;
        $mail->Body    = $body;
        $mail->AltBody = strip_tags($body);

        $mail->send();
        $userName = $userTitle = $userEmail = $userPhone = $userMessage = "";

      } catch (Exception $e) {
        //$failure = "Message could not be sent! Mailer Error: {$mail->ErrorInfo}";
      }
    } else {
      $data = array(
        'emailError'=>$emailError,
        'phoneError'=>$phoneError,
        'messageError'=>$messageError,
        'checkboxError'=>$checkboxError
      );
      echo json_encode($data);
      exit;
    }
  }
?>