<?php
session_start();
$_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];
$_SESSION['date'] = new date('d/m/Y H:i:s T');

?>