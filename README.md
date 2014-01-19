[REDAXO]: http://www.redaxo.org/
[jQuery]: http://jquery.com/
[jQueryUI]: http://jqueryui.com/

# qpCoverflow fuer REDAXO

qpCoverflow ist ein AddOn für das CMS [REDAXO] Version 4.4.1.

## Voraussetzung _Frontend_
Es müssen [jQuery] und [jQueryUI] im Frontend eingebunden sein.

## Installation
- ZIP downloaden
- in AddOn-Verzeichnis der REDAXO-Installation (`REDAXO/include/addons/`) entpacken
- Verzeichnis in `qp_coverflow` umbenennen
- Verzeichnisstruktur unterhalb `qp_coverflow`  
/extensions/  
/files/  
/functions/  
/module/  
/output/  
/pages/  
README.md  
config.inc.php  
help.inc.php  
install.inc.php  
install.sql  
uninstall.inc.php

Eventuell muss diese Verzeichnisstruktur aus einem untergordneten Verzeichnis nach `REDAXO/include/addons/qp_coverflow/` verschoben werden
- Backend von REDAXO starten
- Menupunkt `AddOn` wählen
- `qp_coverflow` installieren
- `qp_coverflow` aktivieren

## Verwenden des AddOns
- Im gewünschten Artikel unter `Block hinzufügen` das Modul `qpCoverflow` wählen und konfigurieren

### Konfigurations-Parameter
- __Bilder__ (array):  
	FileList mit Bildquellen

- __Breite__ (integer, string):  
	Breite des Coverflows (z.B. 400, '90%', 'auto')  
	Default: 'auto'

- __Höhe__ (integer):  
	Höhe des Coverflows (>=50)  
	Default: 300

- __Start__ (integer, string):  
	Index des Bildes, das initial in der Mitte angezeigt werden soll (auto = Anzahl Bilder/2)  
	Default: 'auto'

- __Items__ (integer):  
	Anzahl ungekippter Bilder im Coverflow (von 2 .. 10)  
	Default: 3

- __Margin__ (integer):  
	Abstand zwischen den Bildern (von 0 .. 20)  
	Default: 5

- __Kipp-Winkel__ (integer):  
	Kipp-Winkel (von 0 .. 75 Grad)  
	Default: 60

- __Schrittweite__ (integer):  
	Schrittweite beim Kippen (Kipp-Funktion) (von 1 .. 20)  
	(Je kleiner der Wert, je genauer die Darstellung, aber umso rechenaufwändiger und langsamer die Animation)  
	Default: 5

- __jQuery__ (boolean):  
	Das jQuery-Framework ist notwendig, dass das Coverflow-AddOn funktioniert. Wird im Frontend gar nichts angezeigt, muss der Haken für diese Option gesetzt werden.  
	- Sollten __mehr__ Coverflows auf einer Seite eingebunden sein, reicht es, den Haken bei __einem Block__ zu setzen.
	- Fehlen jQuery und jQueryUI, so müssen die Haken für __beide__ Frameworks im __gleichen__ Block gesezt werden.
	Default: false

- __jQueryUI__ (boolean):  
	Das jQueryUI-Framework ist notwendig, dass das Coverflow-AddOn funktioniert. Wird im Frontend nur ein Bild statt des Coverflows angezeigt oder eine Meldung, dass das jQueryUI-Framework fehlt, sollte der Haken gesetzt werden.  
	- Sollten __mehr__ Coverflows auf einer Seite eingebunden sein, reicht es, den Haken bei __einem Block__ zu setzen.
	- Fehlen jQuery und jQueryUI, so müssen die Haken für __beide__ Frameworks im __gleichen__ Block gesezt werden.
	Default: false

## De-Installation
- Bevor mit der De-Installation begonnen wird, müssen alle qpCoverflow-Module aus den Artikeln entfernt werden
- Menupunkt `AddOn` wählen
- `qp_coverflow` deinstallieren
- Menupunkt `Module` wählen
- Modul `qpCoverflow` löschen
  

---

# Entwicklung
Nachstehend einige Tipps und Vorgehensweisen die während der Entwicklung beachtet werden sollten. Ausserdem folgt eine ToDo-Liste und Ideensammlung.

## Entwicklung (Modul qpCoverflow)
Waehrend der Entwicklung koennen die Aenderungen direkt in das Modul (Eingabe-/Ausgabefenster) eingetragen werden.

Soll das Modul nach der Installation mit den Aenderungen zur Verfuegung stehen, so muss folgendes beachtet werden:
- ins REDAXO-Backend wechseln
- Modul `qpCoverflow` in allen Artikeln loeschen
- `qp_coverflow` unter AddOns deinstallieren
- `qp_coverflow` unter AddOns mit geaenderter `install.sql` (siehe unter Eingabe- und Ausgabetexte fuer qpCoverflow-Modul) erneut installieren


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
- Prüfen, ob `jQueryUI` schon im Dokument eingebunden ist und falls nicht, mit JavaScript einbinden (`qp_coverflow/output/frontend.inc.php`)  
FRAGE: Wie kann ermittelt werden, ob UI geladen ist? (jQuery.widget)  
ANTWORT: Besser Prüfung mit `jQuery.ui`  
ANTWORT 2: Ist so nicht trivial lösbar.  
LOESUNG: Stattdessen wird im qpCoverflow eine weitere Option (Checkbox) angeboten, mit der das jQueryUI eingebunden werden kann.
- Modul-Handling: Beim De-Installieren Eintrag zu `qpCoverflow` aus Tabelle `rex_module` loeschen  
(Besteht eine Möglichkeit wie bei install.sql?)
- Bei Installation Updaten der Artikel, die `qpCoverflow-Modul` enthalten  
(schon möglich, siehe install.sql  
ABER: Wie verfahren mit Artikeln, die Modul bereits enthalten? In welchen Tabellen sind diese zu finden? (rex_article_slice)  
ANMERKUNG: Bei einem Update der `modultyp_id` in der Tabelle `rex_article_slice` auf die aktuelle `qpCoverflow-Modul-ID` werden bereits eingefügte Coverflows in Artikeln nicht mehr angezeigt  
TESTEN: Stimmt ANMERKUNG noch, nachdem das AddOn fertig gestellt ist?)
- Code aufräumen
- (done) ~~Modul-/Ausgabe-Handling: `/qp_coverflow/output/frontend.inc.php` => ist `custom.qpCoverflow` nicht vorhanden => Ersatz anzeigen (z.B. Bild, Nachricht zu fehlender jQueryUI ...)~~
- (done) ~~Bilder in Modul-Eingabe einfuegen (REX_FILE?)~~
- (done) ~~Bilder-Array (images) in Modul-Ausgabe übergeben~~
- Testen bzw. Anpassen für Versionen grösser 4.4.1
- Mittleres Bild im Coverflow mit Link versehen

## Ideen
- Bei Klick auf mittleres Bild folgende Möglichkeiten
  * Verlinkung auf andere Seite
  * Vergrösserung des Bildes
- Beschreibung zu den Bilder oder nur zum Mittleren Bild anzeigen
  * Text als zusätzlichen Konfigurationsparameter zu den Bildern
