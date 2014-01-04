<?php

/**
 * Test Addon
 *
 * @author Quaese
 *
 * @package redaxo4
 * @version svn:$Id$
 */

$mypage = 'qp_coverflow';
$I18N_adressen = new i18n($REX['LANG'], $REX['INCLUDE_PATH'].'/addons/'.$mypage.'/lang/');
$REX['ADDON']['rxid'][$mypage] = '335';
$REX['ADDON']['page'][$mypage] = $mypage;
$REX['ADDON']['name'][$mypage] = 'qp_coverflow';
$REX['ADDON']['perm'][$mypage] = 'qp_coverflow[]';
$REX['PERM'][] = 'qp_coverflow[]';
$REX['ADDON']['version'][$mypage] = '1.0';
$REX['ADDON']['author'][$mypage] = 'Quaese';

// if ($REX['REDAXO']){
//   require_once $REX['INCLUDE_PATH'].'/addons/' . $mypage . '/extensions/function_extensions.inc.php';
//   rex_register_extension('PAGE_HEADER', 'rex_qpcoverflow_css_add');
// }

// Falls ein XHTTP-Request an das qp_addon gesendet wurde (AJAX-Request)
if (rex_request('addon', 'string', '') == 'qp_coverflow'){
	// z.b. include php-script und Ausgabe XML
	include($REX['INCLUDE_PATH'].'/addons/'.$mypage.'/output/ajax.inc.php');

	die;
}else{

}
