<!DOCTYPE html>
<html>
<head>
    <title>Dictionary</title>
    <meta charset="utf-8" />
    <link href="dictionary.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>My Dictionary</h1>
<!-- Ex. 1: File of Dictionary -->
	<?php
		$filename = "dictionary.tsv";
		$dic = fopen($filename,"r");
		$len = filesize($filename);
		$cnt = 0;
		$dictionary = array();
	    while($line = fgets($dic)){
			$cnt++;
			$line=explode("\t",$line);
			$dictionary[$line[0]]=$line[1];
		}
		fclose($dic);
	?>
    <p>
        My dictionary has <?=$cnt?> total words
        and
        size of <?=$len?> bytes.
    </p>
</div>
<div class="article">
    <div class="section">
        <h2>Today's words</h2>
<!-- Ex. 2: Today’s Words & Ex 6: Query Parameters -->
        <?php
            function getWordsByNumber($listOfWords, $numberOfWords){
                $resultArray = array();
//                implement here.
				foreach($listOfWords as $key=>$value)
					array_push($resultArray,array($key,$value));
				shuffle($resultArray);
				$r = array_slice($resultArray,0,$numberOfWords);
                return $r;
            }
			$numberOfWords = $_GET["number_of_words"];
			if(!isset($numberOfWords) || strlen($numberOfWords)==0)
				$numberOfWords = 3;
			$todaysWords=getWordsByNumber($dictionary,$numberOfWords);
        ?>
        <ol>
			<?php
				foreach($todaysWords as $tWord){
					?>
					<li><?=$tWord[0]?> - <?=$tWord[1]?></li>
					<?
				}
			?>
        </ol>
    </div>
    <div class="section">
        <h2>Searching Words</h2>
<!-- Ex. 3: Searching Words & Ex 6: Query Parameters -->
        <?php
            function getWordsByCharacter($listOfWords, $startCharacter){
                $resultArray = array();
//                implement here.
				foreach($listOfWords as $key=>$value)
					if($key[0]==$startCharacter)
						array_push($resultArray,array($key,$value));
                return $resultArray;
            }
			$startCharacter = $_GET["character"];
			if(!isset($startCharacter) || strlen($startCharacter)==0)
				$startCharacter = "C";
			$searchedWords=getWordsByCharacter($dictionary,$startCharacter);
        ?>
        <p>
            Words that started by <strong>'<?=$startCharacter?>'</strong> are followings :
        </p>
        <ol>
			<?php
				foreach($searchedWords as $sWord){
				?>
					<li><?=$sWord[0]?> - <?=$sWord[1]?></li>
				<?php
				}
			?>
        </ol>
    </div>
    <div class="section">
        <h2>List of Words</h2>
<!-- Ex. 4: List of Words & Ex 6: Query Parameters -->
        <?php
            function getWordsByOrder($listOfWords, $orderby){
                $resultArray = $listOfWords;
//                implement here.
				ksort($resultArray);
				if($orderby)
					krsort($resultArray);
                return $resultArray;
            }
			$orderby = $_GET["orderby"];
			if(!isset($orderby) || strlen($orderby)==0)
				$orderby = 0;
			$orderedWords = getWordsByOrder($dictionary, $orderby);
        ?>
        <p>
            All of words ordered by <strong><?=$orderby?"alphabet reverse order":"alphabet order"?></strong> are followings :
        </p>
        <ol>
			<?php
				$longer = 6;
				foreach($orderedWords as $key=>$value){
					$cnt = strlen($key);
					?>
						<li<?=$cnt>$longer?" class=\"long\"":""?>><?=$key?> - <?=$value?>
					<?php
				}
			?>
        </ol>
    </div>
    <div class="section">
        <h2>Adding Words</h2>
<!-- Ex. 5: Adding Words & Ex 6: Query Parameters -->
		<p>
		<?php
			$newWord=$_GET["new_word"];
			$meaning=$_GET["meaning"];
			if(!(isset($newWord)&&isset($meaning)))
				print "Input word or meaning of the word doesn't exist.";
			else{
				$line = "\n".$newWord."\t".$meaning;
				if(file_put_contents($filename,$line,FILE_APPEND))
					print "Adding a word is success!";
				else
					print "Adding a word is failed!";
			}
		?>
		</p>
    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>
