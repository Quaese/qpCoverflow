# qpCoverflow fuer REDAXO

## Entwicklung (Modul qpCoverflow)
Waehrend der Entwicklung koennen die Aenderungen direkt in das Modul (Eingabe-/Ausgabefenster) eingetragen werden.

Soll das Modul nach der Installation mit den Aenderungen zur Verfuegung stehen, so muss folgendes beachtet werden:
- ins REDAXO-Backend wechseln
- Modul `qpCoverflow` in allen Artikeln loeschen
- `qp_coverflow` unter Addons deinstallieren
- `qp_coverflow` unter Addons mit geaenderter `install.sql` (siehe unter Eingabe- und Ausgabetexte fuer qpCoverflow-Modul) erneut installieren


## Eingabe- und Ausgabetext fuer qpCoverflow-Modul

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


## ToDo
- Modul-Handling: Eintrag zu `qpCoverflow` aus Tabelle `rex_module` loeschen
- Modul-/Ausgabe-Handling: `/qp_coverflow/output/frontend.inc.php` => ist `custom.qpCoverflow` nicht vorhanden => Ersatz anzeigen (z.B. Bild, Nachricht zu fehlender jQueryUI ...)