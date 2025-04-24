<?php
//https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=300&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=jvri2jl7g00hspk9mufe995shk%40group.calendar.google.com&amp;color=%238D6F47&amp;ctz=Europe%2FParis
$url='https://calendar.google.com/calendar/embed?src=jvri2jl7g00hspk9mufe995shk%40group.calendar.google.com&ctz=Europe%2FParis';
$calendar = file_get_contents($url);

//echo $calendar;

$calendar = str_replace('</head>','<link rel="stylesheet" href="http://localhost/sd/bar_N_B/src/css/gcal.css" /></head>', $calendar);
$calendar = str_replace('</title>','</title><base href="https://www.google.com/calendar/" />', $calendar);
echo $calendar;

?>