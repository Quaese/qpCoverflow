<?php
// ID Variable
$strCoverflowId = "coverflow" . ((isset($REXVALUE[1]) && $REXVALUE[1]!="")? "_".$REXVALUE[1] : "");

echo('<div id="'.$strCoverflowId.'"></div>');
echo('<link href="' . $REX['HTDOCS_PATH'] . 'files/addons/qp_coverflow/qp_coverflow.css" rel="stylesheet" type="text/css">');
echo('<script src="' . $REX['HTDOCS_PATH'] . 'files/addons/qp_coverflow/qp_coverflow02.jquery.js" type="text/javascript"></script>');
?>

<script type="text/javascript">
if(jQuery){
    (function($){
		$(function(){
			if($.custom && $.custom.qpCoverflow){
		    	$('#<?php echo($strCoverflowId); ?>').qpCoverflow();
			}
		});
    })(jQuery);
}
</script>