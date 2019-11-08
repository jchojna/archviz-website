<?php
  $emailError = $phoneError = $messageError = "";
  $userName = $title = $email = $phone = $message = $success = $failure = "";
  
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
      $title = "Inquiry";
    } else {
      $title = test_input($_POST['userTitle']);
    }
    // E-MAIL VALIDATION
    if (empty($_POST['userEmail'])) {
      $emailError = "Please provide your e-mail address";
    } else {
      $email = test_input($_POST['userEmail']);
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailError = "Invalid e-mail format";
      }
    }
    // PHONE VALIDATION
    $phone = test_input($_POST['userPhone']);
    if ( !preg_match("/^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{3}$/i", $phone) and $phone != "" ) {
      $phoneError = "Invalid phone format";
    }
    // DESCRIPTION VALIDATION
    if (empty($_POST['userMessage'])) {
      $messageError = "Please type your message";
    } else {
      $message = test_input($_POST['userMessage']);
    }
    // SENDING FORM
    if ($emailError == "" and $phoneError == "" and $messageError == "") {
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
        <p>Message sent from: <strong>' . $email . '</strong></p>
        <p>Hello Jakub!</p>
        <p>My name is ' . $userName . '</p>
        <p>' . $message . '</p>
        <p>My phone number is: ' . $phone . '</p>';

        $mail->isHTML(true);
        $mail->Subject = $title;
        $mail->Body    = $body;
        $mail->AltBody = strip_tags($body);

        $mail->send();
        $success = 'Message has been sent!';
        $userName = $title = $email = $phone = $message = "";

      } catch (Exception $e) {
        $failure = "Message could not be sent! Mailer Error: {$mail->ErrorInfo}";
      }
    }
    echo json_encode([
      'emailError'=>$emailError,
      'phoneError'=>$phoneError,
      'messageError'=>$messageError,
      'success'=>$success,
      'failure'=>$failure
    ]);
    exit;
  }
?>