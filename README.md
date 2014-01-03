qpCoverflow fuer REDAXO
======================

Eingabe- und Ausgabetext fuer qpCoverflow-Modul
-----------------------------------------------
- Erstellt werden kann der Quellcode in `/qp_coverflow/module/qpCoverflow.input.module` und `/qp_coverflow/module/qpCoverflow.output.module`
- qpCoverflow-Modul im REDAXO-Backend oeffnen
- Eingabe- und Ausgabetext einfuegen
- Modul speichern
- Datenbankinhalt anzeigen (z.B. mit HeidiSQL)
- Dump der Tabelle `rex_module` erstellen (oder der gesamten Datenbank)
- INSERT-Bereich der Tabelle `rex_module` suchen
- Bereich mit qpCoverflow kopieren
- Wert fuer `id` durch `NULL` ersetzen
- Wert fuer `createdate` und `updatedate` durch `UNIX_TIMESTAMP(NOW())` ersetzen
- INSERT-Anweisung an die entsprechende Stelle in `/qp_coverflow/install.sql` einfuegen
