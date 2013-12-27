<button class="qpClick">click (AJAX)</button>
<button class="qpClickJSON">click (JSON)</button>

<pre>
	<?php
		echo(dirname($_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']));
		//print_r($REX);
		//print_r($_SERVER);
	?>
</pre>
<script type="text/javascript">
(function($){
	jQuery.extend({
		myTolleFunc: function(){
			console.log('myTolleFunc');
		}
	});

	$(function(){
		$('.qpClick').on('click', function(){
			console.log('http://<?php echo($_SERVER["HTTP_HOST"]) ?>' + window.location.pathname + '/redaxo/index.php');
			//console.log(window.location.pathname, 'redaxo/include/addons/adressen/output/adressen.inc.php');
			console.log(window.location);


			$.ajax({
			  //url: 'redaxo/include/addons/adressen/output/adressen.inc.php', //window.location,
			  //url: window.location.pathname, // + '?function=updateslicestatus&mode=ajax&new_status=' + newStatus + '&slice_id=' + sliceID + '&article_id=' + articleID + '&clang=' + cLang + '',
			  //url: '<?php echo(dirname($_SERVER['HTTP_REFERER'])); ?>/redaxo/include/addons/qp_coverflow/output/ajax.inc.php',
			  //url: '<?php echo(dirname($_SERVER['HTTP_REFERER'])); ?>/redaxo/index.php',
			  //url: 'http://<?php echo(dirname($_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'])) ?>' + '/redaxo/index.php',
			  url: 'index.php', // 'index.php?meinaddon=qp_coverflow',
			  method: 'POST',
			  data: {
			  	meinaddon: 'qp_coverflow',
			    page: 'qp_coverflow',
			    func: 'ajax',
			    subpage: 'gruppen'
			  },
			  success: function(msg, type, xhr){
			    //console.log(arguments);
			    console.log(msg);
			    jQuery.myTolleFunc();
			  }
			});


		});

		$('.qpClickJSON').on('click', function(){
			$.ajax({
			  url: 'index.php',
			  method: 'POST',
			  dataType: 'json',
			  data: {
			  	addon: 'qp_coverflow',
			    page: 'qp_coverflow',
			    func: 'json',
			    subpage: 'gruppen'
			  },
			  success: function(msg, type, xhr){
			    //console.log(arguments);
			    console.log(msg);
			  },
			  error: function(){
			    console.log("ERROR: ", arguments);
			  }
			});


		});
	});
})(jQuery);
</script>