<?php
// echo("Ajax-Request");
// echo("<pre>");
// print_r($_REQUEST);
// //print_r($REX);
// echo("</pre>");

// Alle Bilder aus der BilderTabelle der DB holen
function fetchImages() {
    global $REX;

    $fetchedImages = array();

    // alle Datensaetze
    $sqlStatement = 'SELECT file_id, filetype, filename FROM ' . $REX['TABLE_PREFIX'] . 'file WHERE filetype LIKE "image%"';
    $sql = rex_sql::factory();
    $sql->setQuery($sqlStatement);

    // check for status db field
    if ($sql->getRows() == 0) {
		return array();
    }

    // fetch status array
    for($i=0; $i<$sql->getRows(); $i++) {

		//if(ereg("^image",  $sql->getValue('filetype'))){
			//$fetchedImages[$sql->getValue('file_id')] = $sql->getValue('filename');
    		$fetchedImages[$sql->getValue('file_id')] = array("name" => $sql->getValue('filename'), "type" => $sql->getValue('filetype'));
		//}

		$sql->next();
    }

    return $fetchedImages;
}



$func = rex_request('func', 'string', '');

if($func == "ajax"){
	$myImages = fetchImages();
	//echo("Ajax Request - " . count($myImages));
	echo(json_encode($myImages));
}else if($func == "json"){
	//echo('{"success": true}');
	echo(json_encode(fetchImages()));
}
?>