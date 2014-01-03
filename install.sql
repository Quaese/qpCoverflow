-- install.sql ---
-- ID des Coverflow-Moduls ermitteln
SELECT @module_id:=id from `%TABLE_PREFIX%module` where name="qpCoverflow";
-- Bisheriges Coverflow-Modul loeschen
DELETE FROM `%TABLE_PREFIX%module` WHERE name="qpCoverflow";
-- Neues Coverflow-Modul installieren
INSERT INTO `%TABLE_PREFIX%module` (`id`, `name`, `category_id`, `ausgabe`, `eingabe`, `createuser`, `updateuser`, `createdate`, `updatedate`, `attributes`, `revision`) VALUES
(NULL, 'qpCoverflow', 0, '<?php\r\n$REXVALUE = array();\r\n$REXVALUE[1] = \'REX_VALUE[1]\';\r\n\r\ninclude($REX["INCLUDE_PATH"].\'/addons/qp_coverflow/output/frontend.inc.php\');\r\n?>', '<?php \r\ninclude_once($REX[\'INCLUDE_PATH\'].\'/addons/qp_coverflow/functions/qp_coverflow-module.inc.php\');\r\n\r\n$timestamp = microtime_string();\r\n\r\n$REXVALUE = array();\r\n$REXVALUE[1] = \'REX_VALUE[1]\';\r\n\r\n$REXVALUE[1] = (isset($REXVALUE[1]) && $REXVALUE[1]!="")? $REXVALUE[1] : $timestamp;\r\n\r\n//echo($timestamp . " - " . $REXVALUE[1] . "</br>");\r\necho(\'<input type="text" class="text" id="text_VALUE[1]" name="VALUE[1]" value="\' . $REXVALUE[1] . \'">\');\r\n\r\n?>', 'Quaese', '', UNIX_TIMESTAMP(NOW()), 0, '', 0);
-- -- IDs bereits eingebundener Coverflow-Module aktualisieren
-- SET @last_id=LAST_INSERT_ID();
-- -- SET @SQL = CONCAT('SELECT * FROM `%TABLE_PREFIX%article_slice` WHERE modultyp_id=', @last_id);
-- SET @SQL = CONCAT('UPDATE `%TABLE_PREFIX%article_slice` SET modultyp_id=', @last_id ,' WHERE modultyp_id=', @module_id);
-- PREPARE stmt FROM @SQL;
-- EXECUTE stmt;