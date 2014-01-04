<?php

/**
 * Fügt die benötigen Stylesheets ein
 *
 * @param $params Extension-Point Parameter
 */
function rex_qpcoverflow_css_add($params){
	global $REX;

	$addon = 'qp_coverflow';

	$params['subject'] .= "\n  ". '<link href="' . $REX['HTDOCS_PATH'] . 'files/addons/' . $addon . '/qp_coverflow.css" rel="stylesheet" type="text/css">';

	return $params['subject'];
}
