<div id="coverflow"></div>

<?php
echo('<link href="' . $REX['HTDOCS_PATH'] . 'files/addons/qp_coverflow/qp_coverflow.css" rel="stylesheet" type="text/css">');
echo('<script src="' . $REX['HTDOCS_PATH'] . 'files/addons/qp_coverflow/qp_coverflow02.jquery.js" type="text/javascript"></script>');
?>

<script type="text/javascript">
$(function(){
    $('#coverflow').qpCoverflow();
});
</script>