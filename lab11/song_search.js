document.observe("dom:loaded", function() {
    $("b_xml").observe("click", function(){
    	//construct a Prototype Ajax.request object
    	new Ajax.Request("songs_xml.php",{
    		method: "GET",
    		parameters: {top:$F("top")},
    		onSuccess: showSongs_XML,
    		onFailure: ajaxFailed,
    		onException: ajaxFailed
    	});
    });
    $("b_json").observe("click", function(){
        //construct a Prototype Ajax.request object
        new Ajax.Request("songs_json.php",{
    		method: "GET",
    		parameters: {top:$F("top")},
    		onSuccess: showSongs_JSON,
    		onFailure: ajaxFailed,
    		onException: ajaxFailed
    	});
    });
});

//Clear All songs OL
function clearSongs(){
	var ol = $$("#songs>li");
	while(ol.length){
		ol.pop().remove();
	}
}

//Add One Song to songs OL
function addSong(title,artist,genre,time){
	var li = document.createElement("li");
	var text = document.createTextNode(title+" - "+artist+" ["+genre+"] ("+time+")");
	li.appendChild(text);
	$("songs").appendChild(li);
}

function showSongs_XML(ajax) {
	clearSongs();
	//title - artist [genre] (time)
	var xmldata = ajax.responseXML;
	var songs = xmldata.getElementsByTagName("song");
	var len = songs.length;
	for(var i=0;i<len;i++){
		var song = songs[i];
		var title = song.getElementsByTagName("title")[0].innerHTML;
		var artist = song.getElementsByTagName("artist")[0].innerHTML;
		var genre = song.getElementsByTagName("genre")[0].innerHTML;
		var time = song.getElementsByTagName("time")[0].innerHTML;
		addSong(title, artist, genre, time);
	}
}

function showSongs_JSON(ajax) {
	clearSongs();
	var jsondata = JSON.parse(ajax.responseText);
	var songs = jsondata.songs;
	var len = songs.length;
	for(var i=0;i<len;i++){
		var song = songs[i];
		var title = song["title"];
		var artist = song["artist"];
		var genre = song["genre"];
		var time = song["time"];
		addSong(title, artist, genre, time);
	}
}

function ajaxFailed(ajax, exception) {
	var errorMessage = "Error making Ajax request:\n\n";
	if (exception) {
		errorMessage += "Exception: " + exception.message;
	} else {
		errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
		                "\n\nServer response text:\n" + ajax.responseText;
	}
	alert(errorMessage);
}
