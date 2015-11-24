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

header("Content-type: application/json");

print "{\n  \"songs\": [\n";

// write a code to : 
// 1. read the "songs.txt" (or "songs_shuffled.txt" for extra mark!)
// 2. search all the songs that are under the given top rank 
// 3. generate the result in JSON data format 
// title|artist|rank|genre|time
$text = file_get_contents($SONGS_FILE);
$list = explode("\n",trim($text));
$songs = array();
while(count($list)){
	$song = explode("|", trim(array_pop($list)));
	$songs[intval($song[2])]=$song;
}
krsort($songs);
$jsonlines = array();
while($top--){
	$song = array_pop($songs);
	$line = sprintf("{\"rank\":\"%s\", \"title\":\"%s\", \"artist\":\"%s\", \"genre\":\"%s\", \"time\":\"%s\"}",
			$song[2],$song[0],$song[1],$song[3],$song[4]);
	array_push($jsonlines,$line);
}
print "    ";
print join(",\n    ",$jsonlines);
print "\n  ]\n}\n";

?>
