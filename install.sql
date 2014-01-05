-- install.sql ---
-- ID des Coverflow-Moduls ermitteln
SELECT @module_id:=id from `%TABLE_PREFIX%module` where name="qpCoverflow";
-- Bisheriges Coverflow-Modul loeschen
DELETE FROM `%TABLE_PREFIX%module` WHERE name="qpCoverflow";
-- Neues Coverflow-Modul installieren
INSERT INTO `%TABLE_PREFIX%module` (`id`, `name`, `category_id`, `ausgabe`, `eingabe`, `createuser`, `updateuser`, `createdate`, `updatedate`, `attributes`, `revision`) VALUES
(NULL, 'qpCoverflow', 0, '<?php\r\n$REXVALUE = array();\r\n$REXVALUE[1] = \'REX_VALUE[1]\';\r\n$REXVALUE[2] = \'REX_VALUE[2]\';\r\n$REXVALUE[3] = \'REX_VALUE[3]\';\r\n$REXVALUE[4] = \'REX_VALUE[4]\';\r\n$REXVALUE[5] = \'REX_VALUE[5]\';\r\n$REXVALUE[6] = \'REX_VALUE[6]\';\r\n$REXVALUE[7] = \'REX_VALUE[7]\';\r\n$REXVALUE[8] = \'REX_VALUE[8]\';\r\n$REXVALUE[9] = \'REX_VALUE[9]\';\r\n$REXVALUE[10] = \'REX_VALUE[10]\';\r\n$REXVALUE[11] = \'REX_VALUE[11]\';\r\n$REXVALUE[12] = \'REX_VALUE[12]\';\r\n$REXVALUE[13] = \'REX_VALUE[13]\';\r\n$REXVALUE[14] = \'REX_VALUE[14]\';\r\n\r\n$REXFILELIST = array();\r\n$REXFILELIST[1] = ("REX_MEDIALIST[1]" != "") ? explode(\',\', \'REX_MEDIALIST[1]\') : array();\r\n\r\ninclude($REX["INCLUDE_PATH"].\'/addons/qp_coverflow/output/frontend.inc.php\');\r\n?>\r\n', '<style type="text/css">\r\n.qp{}\r\n.qp h2{\r\n	font-size: 1.2em;\r\n	padding-bottom: 6px;\r\n	margin-bottom: 9px;\r\n	border-bottom: 1px solid #aaa;\r\n}\r\n.qp p.descrP{\r\n	padding-bottom: 24px;\r\n}\r\n\r\n.qp dl {\r\n	clear: both;\r\n	margin: 0 0 12px;\r\n	padding: 6px 0;\r\n	border-bottom: 1px solid #ddd;\r\n}\r\n.qp dl dt {\r\n	float: left;\r\n	text-align: right;\r\n	width: 100px;\r\n	font-weight: bold;\r\n}\r\n/*.qp dl dt::after {\r\n	content: \':\';\r\n}*/\r\n.qp dl dd {\r\n	margin-left: 120px;\r\n}\r\n.qp dl dd .descr {\r\n	padding: 6px 0 0;\r\n	font-size: 0.95em;\r\n}\r\n</style>\r\n\r\n<div class="qp">\r\n\r\n	<?php\r\n	include_once($REX[\'INCLUDE_PATH\'].\'/addons/qp_coverflow/functions/qp_coverflow-module.inc.php\');\r\n\r\n	$timestamp = microtime_string();\r\n\r\n	$REXVALUE = array();\r\n\r\n	// REX_VALUE muss als String übergeben werden,\r\n	// da es Platzhalter sind, die anschliessend\r\n	// ersetzt werden.\r\n	$REXVALUE[1] = \'REX_VALUE[1]\';\r\n	$REXVALUE[1] = (isset($REXVALUE[1]) && $REXVALUE[1]!="")? $REXVALUE[1] : $timestamp;\r\n\r\n	echo(\'  <h2>qpCoverflow - Konfiguration</h2>\');\r\n	echo(\'  <p class="descrP">Im nachstehenden Formular kann das Coverflow-Addon konfiguriert werden.<br />Für nicht gesetzte Optionen werden deren Default-Werte genommen.</p>\');\r\n	// echo(\'  <div>qpCoverflow-ID: coverflow_\' . $REXVALUE[1] . \'</div>\');\r\n	// echo(\'  <input type="hidden" class="text" name="VALUE[1]" value="\' . $REXVALUE[1] . \'">\');\r\n\r\n	echo(\'	<dl>\');\r\n	echo(\'		<dt>Coverflow-ID</dt>\');\r\n	echo(\'		<dd>\');\r\n	echo(\'			coverflow_\' . $REXVALUE[1] . \'<input type="hidden" class="text" name="VALUE[1]" value="\' . $REXVALUE[1] . \'">\');\r\n	echo(\'		</dd>\');\r\n	echo(\'	</dl>\');\r\n\r\n	?>\r\n	<dl>\r\n		<dt>Bilder</dt>\r\n		<dd>\r\n			<div>\r\n				Bilder für Coverflow auswählen.\r\n			</div>\r\n			<div>REX_MEDIALIST_BUTTON[1]</div>\r\n		</dd>\r\n	</dl>\r\n	<dl>\r\n		<dt>Breite</dt>\r\n		<dd>\r\n			<div><input type="text" class="text" name="VALUE[2]" value="REX_VALUE[2]"></div>\r\n			<div class="descr">\r\n				(integer, string) - Breite des Coverflows (z.B. 400, 90%, auto)<br />\r\n				Default: auto\r\n			</div>\r\n		</dd>\r\n	</dl>\r\n	<dl>\r\n		<dt>Höhe</dt>\r\n		<dd>\r\n			<div><input type="text" class="text" name="VALUE[3]" value="REX_VALUE[3]"></div>\r\n			<div class="descr">\r\n				(integer) - Höhe des Coverflows<br />\r\n				Default: 300\r\n			</div>\r\n		</dd>\r\n	</dl>\r\n	<dl>\r\n		<dt>Start</dt>\r\n		<dd>\r\n			<div><input type="text" class="text" name="VALUE[4]" value="REX_VALUE[4]"></div>\r\n			<div class="descr">\r\n				(integer, string) - Index des Bildes, das zuerst in der Mitte angezeigt werden soll (auto = Bild in der Mitte des Arrays)<br />\r\n				Default: auto\r\n			</div>\r\n		</dd>\r\n	</dl>\r\n	<dl>\r\n		<dt>items</dt>\r\n		<dd>\r\n			<div><input type="text" class="text" name="VALUE[5]" value="REX_VALUE[5]"></div>\r\n			<div class="descr">\r\n				(integer) - Anzahl ungekippter Bilder<br />\r\n				Default: 3\r\n			</div>\r\n		</dd>\r\n	</dl>\r\n	<dl>\r\n		<dt>Margin</dt>\r\n		<dd>\r\n			<div><input type="text" class="text" name="VALUE[6]" value="REX_VALUE[6]"></div>\r\n			<div class="descr">\r\n				(integer) - Abstand zwischen den Bildern (von 0 .. 20)<br />\r\n				Default: 5\r\n			</div>\r\n		</dd>\r\n	</dl>\r\n	<dl>\r\n		<dt>Kipp-Winkel</dt>\r\n		<dd>\r\n			<div><input type="text" class="text" name="VALUE[7]" value="REX_VALUE[7]"></div>\r\n			<div class="descr">\r\n				(integer) - Kipp-Winkel von 0 .. 75 Grad<br />\r\n				Default: 60\r\n			</div>\r\n		</dd>\r\n	</dl>\r\n	<dl>\r\n		<dt>Schrittweite</dt>\r\n		<dd>\r\n			<div><input type="text" class="text" name="VALUE[8]" value="REX_VALUE[8]"></div>\r\n			<div class="descr">\r\n				(integer) - Schrittweite beim Kippen der Bilder (von 1 .. 20)<br /> <small>(Je kleiner der Wert, desto genauer die Darstellung, aber umso rechenaufwändiger)</small><br />\r\n				Default: 5\r\n			</div>\r\n		</dd>\r\n	</dl>\r\n</div>\r\n', 'Quaese', 'Quaese', UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW()), '', 0);
-- -- IDs bereits eingebundener Coverflow-Module aktualisieren
-- SET @last_id=LAST_INSERT_ID();
-- -- SET @SQL = CONCAT('SELECT * FROM `%TABLE_PREFIX%article_slice` WHERE modultyp_id=', @last_id);
-- SET @SQL = CONCAT('UPDATE `%TABLE_PREFIX%article_slice` SET modultyp_id=', @last_id ,' WHERE modultyp_id=', @module_id);
-- PREPARE stmt FROM @SQL;
-- EXECUTE stmt;
