<?php

/**
 * Test Addon
 *
 * @author Quaese
 *
 * @package redaxo4
 * @version svn:$Id$
 */



// jQuery.ajax({
//   url: window.location,
//   method: 'POST',
//   data: {
//     page: 'qp_coverflow',
//     subpage: 'gruppen'
//   },
//   success: function(){
//     console.log(arguments);
//   }
// });


$Basedir = dirname(__FILE__);

$page = rex_request("page", "string");
$subpage = rex_request("subpage", "string");
$func = rex_request("func", "string");
if($func == 'ajax'){
	echo('Hier kommt AJAX');
}else{
	include_once $REX["INCLUDE_PATH"]."/layout/top.php";

	rex_title("Adressliste", $subpages);

	switch($subpage) {
		case "gruppen":
			echo $Basedir;
			break;
		default:
			echo "Default: " . $Basedir;
	}

	if ($func == '') {
		$list = rex_list::factory('SELECT id, name from '.$REX['TABLE_PREFIX'].'template order by id');

		$imgHeader = '<a href="'. $list->getUrl(array('func' => 'add')) .'"><img src="media/metainfo_plus.gif" alt="add" title="add" /></a>';

		$list->addColumn(
			$imgHeader,
			'<img src="media/metainfo.gif" alt="field" title="field" />',
			0,
			array( '<th class="rex-icon">###VALUE###</th>', '<td class="rex-icon">###VALUE###</td>' )
		);

		$list->setColumnLabel('id', 'ID');
		$list->setColumnLabel('name', 'Name');
		$list->setColumnParams('name', array('func' => 'edit', 'id' => '###id###'));

		$list->show();
	}

	include_once $REX["INCLUDE_PATH"]."/layout/bottom.php";
}

?>