<?php
$SONGS_FILE = "songs_shuffled.txt";

if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] != "GET") {
	header("HTTP/1.1 400 Invalid Request");
	die("ERROR 400: Invalid request - This service accepts only GET requests.");
}

$top = "";

if (isset($_REQUEST["top"])) {
	$top = preg_replace("/[^0-9]*/", "", $_REQUEST["top"]);
}

if (!file_exists($SONGS_FILE)) {
	header("HTTP/1.1 500 Server Error");
	die("ERROR 500: Server error - Unable to read input file: $SONGS_FILE");
}

header("Content-type: application/xml");

print "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
print "<songs>\n";


$lines = file($SONGS_FILE);
$songs = array();
for ($i = 0; $i < count($lines); $i++) {
	//title artist rank genre time
	$list = explode("|", trim($lines[$i]));
	$songs[intval($list[2])] = $list;
}
krsort($songs);
while($top--){
	$song = array_pop($songs);
	print "\t<song rank=\"".$song[2]."\">\n";
	print "\t\t<title>".$song[0]."</title>\n";
	print "\t\t<artist>".$song[1]."</artist>\n";
	print "\t\t<genre>".$song[3]."</genre>\n";
	print "\t\t<time>".$song[4]."</time>\n";
	print "\t</song>\n";		
}
print "</songs>";

?>
