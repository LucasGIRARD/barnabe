<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

$error = 0;

if (isset($_POST['nom']) && isset($_POST['tel']) && isset($_POST['email']) && isset($_POST['demande']) && isset($_POST['g-recaptcha-response'])) {

	$recaptcha = new \ReCaptcha\ReCaptcha("6LcMoW0UAAAAAMWPNsaYH73YFcm0ytL899p90tHc");
	$resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);

	if ($resp->isSuccess()) {

		$ip = $_SERVER['REMOTE_ADDR'];

		$consentement = "";
		if (isset($_POST['obligation'])) {
			if (count($_POST['obligation']) > 1) {
				foreach ($_POST['obligation'] as $value) {
					$consentement = $value."<br>";
				}
			} else {
				$consentement = $_POST['obligation'];
			}

		} else {
			$consentement = "Aucun";
		}

		$to = "contact@barnabe-aperovan.fr";
		//$to = "girard.lucas1@gmail.com";

		$from = "siteweb@barnabe-aperovan.fr";

		$subject = 'Prise de contact : '.$_POST['nom'];
		$message = '<br><br><br><br>Nom: '.$_POST['nom'].'<br><br>Tel: '.$_POST['tel'].'<br><br>Adresse Email: '.$_POST['email'].'<br><br>Demande: '.$_POST['demande'].'<br><br><br><br>Consentement:<br>'.$consentement.'<br>Ip'.$ip;

		// Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n";

		// En-têtes additionnels
		$headers .= "To: " . $to . "\r\n";
		$headers .= "From: " . $from . "\r\n";
		$headers .= "Reply-To: " . $from . "\r\n";
		$headers .= "Subject: $subject" . "\r\n";
		$headers .= "X-Mailer: PHP/" . phpversion();

		if (!mail($to, $subject, $message, $headers, "-f" . $from)) {
			$error = 3;
		}

	} else {
		$errors = $resp->getErrorCodes();
		$error = 2;
	}

} else {
	$error = 1;
}

echo $error;

?>