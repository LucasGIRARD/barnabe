<?php

$useragent="PHP 5.2";
$header=array(  "GET /accounts/AuthSubSessionToken HTTP/1.1",
	"Content-Type: application/x-www-form-urlencoded",
	"Authorization: AuthSub token=".$_GET['token'],
	"User-Agent: PHP/5.2",
	"Host: https://www.google.com",
	"Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2",
	"Connection: keep-alive"
);

$url='https://calendar.google.com/calendar/embed?src=jvri2jl7g00hspk9mufe995shk%40group.calendar.google.com&ctz=Europe%2FParis';

$curl_connection = curl_init($url);
curl_setopt($curl_connection, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl_connection, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl_connection, CURLOPT_FOLLOWLOCATION, true);
$calendar = curl_exec($curl_connection);

$dom = new DOMDocument;
$dom->loadHTML($calendar);
$calendar_css = $dom->getElementsByTagName('style');
$calendar_js = $dom->getElementsByTagName('script');
$calendar_body = $dom->getElementsByTagName('body')->item(0)->nodeValue;

?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<?php
	foreach ($calendar_css as $key => $value) {
		echo '<script type="text/javascript">'.$value->nodeValue.'</script>';
	}
	?>
</head>
<body>

	<?php
	foreach ($calendar_js as $key => $value) {
		echo '<script type="text/javascript">'.$value->nodeValue.'</script>';
	}
	?>
</body>
</html>