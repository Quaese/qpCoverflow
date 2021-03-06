<?php
// $REXVALUE[i] wurde in der Ausgabe des Moduls qpCoverflow gesetzt
// $REXVALUE[i] = 'REX_VALUE[i]';

// $REXFILELIST[i] wurde in der Ausgabe des Moduls qpCoverflow gesetzt
// $REXFILELIST[i] = 'REX_MEDIALIST[i]';
// hier:  $REXFILELIST[1] = ("REX_MEDIALIST[1]" != "") ? explode(',', 'REX_MEDIALIST[1]') : array();

// Variablen vorbelegen
$height = $width = $cssWidth = $start = $items = $itemMargin = $angle = $grid = $images = false;


// --- [Auswertung der Konfigurations-Parameter fuer Coverflow] ---------------------------------------------------------
// ID Variable
$strCoverflowId = "coverflow" . ((isset($REXVALUE[1]) && $REXVALUE[1]!="")? "_".$REXVALUE[1] : "");
// Breite
if(isset($REXVALUE[2]) && $REXVALUE[2]!=""){
	// Falls ein Prozentzeichen oder "auto" gefunden wird -> (string)
	if(preg_match('/(%|^auto$)/', $REXVALUE[2], $treffer)){
		//echo("treffer: " . $treffer[0]);
		$width = "'" . $REXVALUE[2] . "'";
		$cssWidth = $width;
	// Sonst (integer)
	}else{
		$width = (int)$REXVALUE[2];
		$cssWidth = $width . "px";
	}
}
// Hoehe
$height = (isset($REXVALUE[3]) && $REXVALUE[3]!="")? (int)$REXVALUE[3] : false;
// Start-Index
if(isset($REXVALUE[4]) && $REXVALUE[4]!=""){
	// Falls 'auto' als Wert gefunden wird -> (string)
	if(preg_match('/(^auto$)/', $REXVALUE[4], $treffer)){
		$start = "'" . $REXVALUE[4] . "'";
	// Sonst (integer)
	}else{
		$start = (int)$REXVALUE[4];
	}
}
// Anzahl ungekippter Bilder
$items = (isset($REXVALUE[5]) && $REXVALUE[5]!="")? (int)$REXVALUE[5] : false;
// Abstand der Bilder voneinander
$itemMargin = (isset($REXVALUE[6]) && $REXVALUE[6]!="")? (int)$REXVALUE[6] : false;
// Kipp-Winkel
$angle = (isset($REXVALUE[7]) && $REXVALUE[7]!="")? (int)$REXVALUE[7] : false;
// Schrittweite fuer Kipp-Funktion
$grid = (isset($REXVALUE[8]) && $REXVALUE[8]!="")? (int)$REXVALUE[8] : false;

// jQueryUI einbinden
$incUI = (isset($REXVALUE[9]) && $REXVALUE[9]!="")? true : false;
// jQueryUI einbinden
$incJQuery = (isset($REXVALUE[10]) && $REXVALUE[10]!="")? true : false;

// Bisher nicht genutzt
// $REXVALUE[10];
// $REXVALUE[11];
// $REXVALUE[12];
// $REXVALUE[13];
// $REXVALUE[14];


// --- [Auswertung der FileList fuer Coverflow-Bilder] -------------------------------------------------------------------
if(count($REXFILELIST[1]) > 0){
	$images = "[";

	for($i=0; $i<count($REXFILELIST[1]); $i++){
		$images .= "'" . $REX['HTDOCS_PATH'] . (substr($REX['HTDOCS_PATH'], -1) != '/' ? '/' : '') . 'files/' . $REXFILELIST[1][$i] . "'";
		$images .= ($i < (count($REXFILELIST[1])-1)) ? "," : "";
	}

	$images .= "]";
}


// --- [Optionen-Objekt fuer Coverflow-Widget erstellen] -------------------------------------------------------------------
$strOptions = "{\n";
$strOptions .= "\tdummy: 1";
if($width) $strOptions .= ",\n\twidth: " . $width . "";
if($height) $strOptions .= ",\n\theight: " . $height . "";
if($start) $strOptions .= ",\n\tstart: " . $start . "";
if($items) $strOptions .= ",\n\titems: " . $items . "";
if($itemMargin) $strOptions .= ",\n\titemMargin: " . $itemMargin . "";
if($angle) $strOptions .= ",\n\tangle: " . $angle . "";
if($grid) $strOptions .= ",\n\tgrid: " . $grid . "";
if($images) $strOptions .= ",\n\timages: " . $images . "";
$strOptions .= "\n}";


// ---- [HTML-Ausgabe] --------------------------------------------------------------------------------------

// HTML-Element zur Aufnahme des Coverflows einbinden
echo('<div id="'.$strCoverflowId.'"></div>');

// jQueryUI-Sources nur einmal einbinden (falls Flag gesetzt wurde)
if(!isset($REX['jQueryFlag']) && $incUI){
	echo('<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js" type="text/javascript"></script>');
	$REX['jQueryFlag'] = 1;
}

// jQueryUI-Sources nur einmal einbinden (falls Flag gesetzt wurde)
if(!isset($REX['jQueryUiFlag']) && $incUI){
	echo('<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js" type="text/javascript"></script>');
	$REX['jQueryUiFlag'] = 1;
}

// Coverflow-Sources nur einmal einbinden
if(!isset($REX['qpCoverflowFlag'])){
	echo('<link href="' . $REX['HTDOCS_PATH'] . (substr($REX['HTDOCS_PATH'], -1) != '/' ? '/' : '') . 'files/addons/qp_coverflow/qp_coverflow.css" rel="stylesheet" type="text/css">');
	echo('<script src="' . $REX['HTDOCS_PATH'] . (substr($REX['HTDOCS_PATH'], -1) != '/' ? '/' : '') . 'files/addons/qp_coverflow/qp_coverflow.jquery.js" type="text/javascript"></script>');
	$REX['qpCoverflowFlag'] = 1;
}

?>

<script type="text/javascript">
if(typeof jQuery != "undefined"){
	//console.log(jQuery.ui);
    (function($){
		$(function(){
			// Falls das Coverflow-Widget zur Verfügung steht
			if($.custom && $.custom.qpCoverflow){
		    	$('#<?php echo($strCoverflowId); ?>').qpCoverflow(<?php echo($strOptions); ?>);
			}else{
				$('#<?php echo($strCoverflowId); ?>').css({
					'background': "#111 url(<?php echo($REX['HTDOCS_PATH'] . (substr($REX['HTDOCS_PATH'], -1) != '/' ? '/' : '')); ?>files/addons/qp_coverflow/coverflow_placeholder_400x300.jpg) 50% 50% no-repeat",
					'max-width' : '725px',
					'width': "<?php echo($cssWidth); ?>",
					'height': "<?php echo(($height?$height:300) . 'px'); ?>"
				});
			}
		});
    })(jQuery);
}
</script>
