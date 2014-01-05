/* ****************************************************************************************** *
 * Das Script kann frei verwendet werden, dieser Kommentar sowie die Nennung des Nicks
 * und der URL müssen jedoch erhalten bleiben.
 *
 *                                                           (c) Quaese (www.quaese.de), 2014
 * ****************************************************************************************** */

if(jQuery){
    (function($){

        $(function() {

            if($.widget===undefined) return;

            $.widget( "custom.qpCoverflow", {
                //coverflow: undefined,     // Wrapper für Coverflow
                //list: undefined,          // Unsortierte Liste (UL) zur Aufnahme der Coverflow-Canvas'
                //oldIndex: undefined,      // Index des bisher gewählten Bildes
                //newIndex: undefined,      // Index des aktuell gewählten Bildes
                //canvasStack: {},
                //imageStack: [],
                //img: [],
                //wrapper:{halfWidth: 0, halfHeight: 0},

                canvasHeight: 300,
                canvasWidth: 400,


                timer: {
                    waitDelay: 250,
                    animDelay: 20
                },

                animStep: 3,

                opacity: {
                    start: 0.8,
                    end: 0.0
                },
                reflexion: {
                    start: 0.0,
                    end: 0.8
                },

                // default options
                options: {
                    start: 'auto',      // (integer) Index des Bildes, das initial in der Mitte sein soll (auto = Anzahl Bilder/2)
                    width: "auto",      // (integer, string) Breite des Coverflows (z.B. 400, '90%', 'auto')
                    height: 300,        // (integer) Höhe des Coverflows (>=50)
                    items: 3,           // (integer) Anzahl ungekippter Bilder im Coverflow (von 2 .. 10)
                    itemMargin: 5,      // (integer) Abstand zwischen den Bildern (von 0 .. 20)
                    angle: 60,          // (integer) Kipp-Winkel (von 0 .. 75 Grad)
                    grid: 5,            // (integer) Schrittweite der Skew-Funktion (Kipp-Funktion) (von 1 .. 20)
                    images: [
                    //     'http://canvas.quaese.de/bilder/content/canvas_startbild_1.jpg', 'http://www.zeichentrickserien.de/isnogud2.jpg', 'http://canvas.quaese.de/bilder/content/stack.gif', 'http://canvas.quaese.de/bilder/content/drawimagescale.jpg', 'http://canvas.quaese.de/bilder/content/imagedata.gif',
                    //     'http://canvas.quaese.de/bilder/content/canvas_startbild_1.jpg', 'http://www.zeichentrickserien.de/isnogud2.jpg', 'http://canvas.quaese.de/bilder/content/stack.gif', 'http://canvas.quaese.de/bilder/content/drawimagescale.jpg', 'http://canvas.quaese.de/bilder/content/imagedata.gif',
                    //     'http://canvas.quaese.de/bilder/content/canvas_startbild_1.jpg', 'http://www.zeichentrickserien.de/isnogud2.jpg', 'http://canvas.quaese.de/bilder/content/stack.gif', 'http://canvas.quaese.de/bilder/content/drawimagescale.jpg', 'http://canvas.quaese.de/bilder/content/imagedata.gif'
                        'http://canvas.quaese.de/bilder/content/canvas_startbild_1.jpg', 'http://canvas.quaese.de/bilder/content/7-segment-anzeige.gif', 'http://canvas.quaese.de/bilder/content/stack.gif', 'http://canvas.quaese.de/bilder/content/drawimagescale.jpg', 'http://canvas.quaese.de/bilder/content/imagedata.gif',
                        'http://canvas.quaese.de/bilder/content/canvas_startbild_1.jpg', 'http://canvas.quaese.de/bilder/content/7-segment-anzeige.gif', 'http://canvas.quaese.de/bilder/content/stack.gif', 'http://canvas.quaese.de/bilder/content/drawimagescale.jpg', 'http://canvas.quaese.de/bilder/content/imagedata.gif',
                        'http://canvas.quaese.de/bilder/content/canvas_startbild_1.jpg', 'http://canvas.quaese.de/bilder/content/7-segment-anzeige.gif', 'http://canvas.quaese.de/bilder/content/stack.gif', 'http://canvas.quaese.de/bilder/content/drawimagescale.jpg', 'http://canvas.quaese.de/bilder/content/imagedata.gif'
                    ]
                },

                // the constructor
                _create: function() {
                    var self = this,
                        elem = self.element,
                        o = self.options;

                    // Coverflow-Objekte setzen
                    self.canvasStack = {};
                    self.imageStack = [];
                    self.img = [];
                    self.wrapper = {halfWidth: 0, halfHeight: 0};

                    // Items
                    o.items = (o.items!==undefined && !isNaN(o.items) && (o.items>=2) && (o.items<=10)) ? parseInt(o.items) : 3;
                    // Margin
                    o.itemMargin = (o.itemMargin!==undefined && !isNaN(o.itemMargin) && (o.itemMargin>=0) && (o.itemMargin<=20)) ? parseInt(o.itemMargin) : 5;

                    // Kippwinkel
                    self.angle = (o.angle!==undefined && !isNaN(o.angle) && (o.angle>=0) && (o.angle<=75)) ? parseInt(o.angle) : 60;
                    // Schrittweite fuer Kipp-Funktion
                    o.grid = (o.grid!==undefined && !isNaN(o.grid) && (o.grid>=1) && (o.grid<=20)) ? parseInt(o.grid) : 5;

                    // Höhe
                    o.height = (o.height!==undefined && !isNaN(o.height) && (o.height>=50))? parseInt(o.height) : self.canvasHeight;
                    // Breite
                    if(o.width!==undefined){
                        // Falls es sich um eine Zahl handelt
                        if(!isNaN(o.width)){
                            o.width = parseInt(o.width);
                        // Falls es sich um einen Prozentwert handelt
                        }else if(/%$/.test(String(o.width)) && elem.width()){
                            o.width = parseInt(elem.width() * parseInt(o.width)/100);
                        // Falls es sich um den String "auto" handelt
                        }else if(String(o.width).toLowerCase()==="auto" && elem.width()){
                            o.width = elem.width();
                        // Sonst
                        }else{
                            o.width = self.canvasWidth;
                        }
                    // Falls es sich um keinen gültigen wert handelt
                    }else{
                        o.width = self.canvasWidth;
                    }

                    // Aktueller Index
                    self.oldIndex = self.newIndex = o.start = (o.start==='auto') ? Math.floor(o.images.length/2) : o.start;

                    // Dimensionen festlegen
                    self.canvasHeight = 0.9 * o.height;
                    self.canvasWidth = Math.floor(o.width/o.items) - 2*o.itemMargin;

                    // Image-Stack erstellen
                    for(var i=0; i<o.images.length; i++){
                        self.imageStack[i] = $('<img />');
                        self.imageStack[i][0].src = o.images[i];// + "?" + new Date().getTime();

                        // auf load Event des Bildes reagieren
                        self.imageStack[i].on('load', $.proxy(self._onload, self, self.imageStack[i], i));
                    }
                },

                _onload: function(image, index){
                    var self = this,
                        o = self.options;

                    self._buildCanvas(image, index);

                    // Bild in Testarray
                    self.img.push(image[0].src);

                    // Falls alle Bilder im Testarray sind
                    if(self.img.length === o.images.length){
                        // Testarray und imageStack wieder löschen und Funktion aufrufen, die nach dem Laden erforderlich ist
                        self.img = undefined;
                        self.imageStack = undefined;

                        // Liste zum Anzeigen der Canvas-Elemente erstellen
                        self._buildList();
                        // Coverflow rendern
                        self._renderFirst();
                    }
                },

                _renderFirst: function(){
                    var self = this,
                        elem = self.element,
                        o = self.options,
                        sgn,
                        left = 0,
                        skewed;

                    // Über alle Elemente des CanvasStacks interieren
                    for(var _key in self.canvasStack){
                        sgn = (_key < self.newIndex) ? 1 : ((_key > self.newIndex) ? -1 : 0);
                        skewed = !!sgn;

                        if(sgn === 1){
                            left += self.canvasStack[_key].skewWidth + 2*o.itemMargin;
                        }

                        // Setze die Dimensionen des RenderCanvas
                        self._setSkewWidth(self.canvasStack[_key], self.canvasStack[_key][skewed? 'skewWidth' : 'imgWidth']);
                        //self._setSkewWidthDynamic(self.canvasStack[_key], 0);

                        // Zeichne den Inhalt des BufferCanvas (Orginal+Spiegelung) um den Winkel self.angle gekippt in den Ausgabe(Render)Canvas
                        self._skew(self.canvasStack[_key].renderCanvas.context, self.canvasStack[_key].bufferCanvas.canvas[0], sgn*self.angle);
                    }

                    // Halbe Breite des nicht gekippten Bildes addieren und halbe Breite des Wrappers subtrahieren
                    left += parseInt(self.canvasStack[self.newIndex].imgWidth/2) - self.wrapper.halfWidth + o.itemMargin;

                    self.list
                        .css({
                            'left': -left + 'px'
                        })
                        .fadeIn(800);
                },

                _buildList: function(){
                    var self = this,
                        elem = self.element,
                        o = self.options,
                        li;

                    // Wrapper für Coverflow-Slider setzen
                    self.coverflow = $('<div class="qpCoverflow" />');
                    self.coverflow.css({
                        'position': 'relative',
                        'width': o.width + 'px',
                        'height': o.height + 'px',
                        'overflow': 'hidden',
                        'width': o.width + 'px'
                    });

                    // Hilfsgrössen für Wrapper berechnen
                    self.wrapper.halfWidth = parseInt(o.width/2);
                    self.wrapper.halfHeight = parseInt(o.height/2);

                    self.list = $('<ul class="qpCoverflowList" />');
                    self.list.css({
                        'position': 'absolute',
                        'list-style': 'none',
                        'white-space': 'nowrap',
                        'display': 'none'
                    });

                    for(var i=0; i<o.images.length; i++){
                        li = $('<li class="qpCanvasListItem_' + i + '" />');
                        li.css({
                            display: 'inline',
                            'margin-left': o.itemMargin + 'px',
                            'margin-right': o.itemMargin + 'px'
                        });
                        li.append(self.canvasStack[i].renderCanvas.canvas);

                        self.canvasStack[i].renderCanvas.canvas.css({
                            'position': 'relative',
                            'top': (self.wrapper.halfHeight - parseInt(self.canvasStack[i].imgHeight)) + 'px'
                        });

                        self.list.append(li);
                    }

                    self.coverflow.append(self.list);
                    elem.append(self.coverflow);
                },

                _buildCanvas: function(image, index){
                    var self = this,
                        elem = self.element,
                        o = self.options,
                        canvasStack,
                        bufferContext,
                        objGradient;

                    // DOM-Objekt des Bildes
                    image = image[0];

                    // Neuen Eintrag (Objekt) für das aktuelle Bild-/Canvas-Objekt im canvasStack erstellen
                    canvasStack = self.canvasStack[index] = {};
                    canvasStack.image = image;

                    // Bild so skalieren, dass es in den Canvas passt
                    self._scale(index);

                    // Buffer-Canvas zum Vor-Rendern des Bildes mit Reflexion
                    canvasStack.bufferCanvas = {};
                    canvasStack.bufferCanvas.canvas = $('<canvas />');
                    canvasStack.bufferCanvas.canvas.css({
                        //border: "1px solid grey",
                        width: canvasStack.imgWidth + "px",
                        height: 2*canvasStack.imgHeight + "px"
                    });
                    canvasStack.bufferCanvas.canvas[0].width = canvasStack.imgWidth;
                    canvasStack.bufferCanvas.canvas[0].height = 2*canvasStack.imgHeight;


                    // Context des Buffer-Canvas
                    bufferContext = canvasStack.bufferCanvas.context = canvasStack.bufferCanvas.canvas[0].getContext('2d');


                    // GESPIEGELTES BILD IN CANVAS RENDERN
                    // Kontext-Zustand sichern
                    bufferContext.save();
                    // Um doppelte Bildhöhe nach unten verschieben
                    bufferContext.translate(0, 2*canvasStack.imgHeight);
                    // Bild nach oben spiegeln = negative Skalierung um negative Ausgangsgrösse
                    bufferContext.scale(1, -1);
                    // Vertikal gespiegeltes Bild in Kontext zeichnen
                    bufferContext.drawImage(image, 0, 0, canvasStack.imgWidth, canvasStack.imgHeight);
                    // Zustand des Kontextes wiederherstellen
                    bufferContext.restore();


                    // AUSBLEND-GRADIENT FÜR GESPIEGELTES BILD IN CANVAS RENDERN
                    // Kontext-Zustand speichern
                    bufferContext.save();
                    // Um Bildhöhe verschieben
                    bufferContext.translate(0, canvasStack.imgHeight);
                    // Verknüpfungseigenschaft festlegen
                    bufferContext.globalCompositeOperation = "destination-in";
                    // Veritkalen linearen Verlauf für Bildhöhe instanziieren
                    objGradient = bufferContext.createLinearGradient(0, 0, 0, canvasStack.imgHeight);
                    // Verlaufspunkte setzen
                    objGradient.addColorStop(self.reflexion.start, "rgba(0,0,0," + self.opacity.start + ")");         // Anfangswerte: Farbe/Transparenz
                    objGradient.addColorStop(self.reflexion.end, "rgba(0,0,0," + self.opacity.end + ")");             // Endwerte: Farbe/Transparenz
                    // Verlaufsobjekt an Füllstyle zuweisen
                    bufferContext.fillStyle = objGradient;
                    // Rechteck mit Verlauf zeichnen (wg. Verknüpfung wird nur nicht transparenter Bereich angezeigt)
                    bufferContext.fillRect(0, 0, canvasStack.imgWidth, canvasStack.imgHeight);
                    // Zustandn wiederherstellen
                    bufferContext.restore();


                    // ORGINAL-BILD IN CANVAS RENDERN
                    bufferContext.drawImage(image, 0, 0, canvasStack.imgWidth, canvasStack.imgHeight);

                    // RENDER-CANVAS
                    // Objekt für Render-Canvas im Canvas-Stack
                    canvasStack.renderCanvas = {};
                    canvasStack.renderCanvas.canvas = $('<canvas />');
                    canvasStack.renderCanvas.context = canvasStack.renderCanvas.canvas[0].getContext('2d');

                    // Berechne die Breite für einen Winkel
                    canvasStack.skewWidth = self._skewWidth(canvasStack.renderCanvas.context, canvasStack.bufferCanvas.canvas[0], self.angle);

                    // Index des Render-Canvas
                    canvasStack.renderCanvas.canvas.data({
                        index: index
                    });

                    //, $.proxy(self._onload, self, self.imageStack[i], i));
                    canvasStack.renderCanvas.canvas.on('click', function(){
                        self._onCanvasClick(self, $(this));
                    });
                    //canvasStack.renderCanvas.canvas.on('click', $.proxy(self._onCanvasClick, self, this));
                },

                _scale: function(index){
                    var self = this,
                        elem = self.element,
                        o = self.options,
                        canvasStack = self.canvasStack[index],
                        image = canvasStack.image,
                        factor;

                    canvasStack.imgWidth = image.width;
                    canvasStack.imgHeight = image.height;

                    // Falls die Höhe grösser als die Hälfte des Canvas ist
                    if(canvasStack.imgHeight > self.canvasHeight/2){
                        factor = (self.canvasHeight/2) / canvasStack.imgHeight;
                        canvasStack.imgHeight = (self.canvasHeight/2);
                        canvasStack.imgWidth = factor * canvasStack.imgWidth;
                    }

                    // Falls die Breite grösser als die des Canvas ist
                    if(canvasStack.imgWidth > self.canvasWidth){
                        factor = self.canvasWidth / canvasStack.imgWidth;
                        canvasStack.imgWidth = self.canvasWidth;
                        canvasStack.imgHeight = factor * canvasStack.imgHeight;
                    }
                },

                _onCanvasClick: function(self, element){
                    if(self.timer.hAnim !== undefined){
                        window.clearTimeout(self.timer.hAnim);
                    }

                    self.timer.hAnim = window.setTimeout(function(){
                        // Timerhandle löschen
                        self.timer.hAnim = undefined;
                        // Neuen Index speichern
                        self.newIndex = element.data('index');
                        // Animation starten
                        self._startAnimation();
                    }, self.timer.waitDelay);


                },

                _startAnimation: function(){
                    var self = this,
                        o = self.options,
                        sgn = 0,
                        left = 0,
                        cssLeft,
                        absCssLeft,
                        absLeft,
                        diff = 0,
                        leftDiff,
                        steps,
                        stepWidth,
                        index;

                    if(self.newIndex !== self.oldIndex){
                        sgn = (self.newIndex < self.oldIndex) ? -1 : 1;


                        diff = Math.abs(self.oldIndex - self.newIndex);
                        for(var i=1; i<diff; i++){
                            index = self.oldIndex + sgn*i;

                            // Setze die Dimensionen des RenderCanvas
                            self._setSkewWidth(self.canvasStack[index], self.canvasStack[index].skewWidth);
                            // Zeichne den Inhalt des BufferCanvas (Orginal+Spiegelung) um den Winkel self.angle gekippt in den Ausgabe(Render)Canvas
                            self._skew(self.canvasStack[index].renderCanvas.context, self.canvasStack[index].bufferCanvas.canvas[0], sgn*self.angle);
                        }


                        // Über alle Elemente bis zum aktuell gewählten interieren
                        for(var _key in self.canvasStack){
                            if(_key >= self.newIndex) break;

                            left += self.canvasStack[_key].skewWidth + 2*o.itemMargin;
                        }

                        // Halbe Breite des nicht gekippten Bildes addieren und halbe Breite des Wrappers subtrahieren
                        left += parseInt(self.canvasStack[self.newIndex].imgWidth/2) - self.wrapper.halfWidth + o.itemMargin;
                        absLeft = Math.abs(left);

                        cssLeft = parseInt(self.list.css('left'));
                        absCssLeft = Math.abs(cssLeft);

                        // Strecke des zu animierenden Weges
                        if(cssLeft<0 && left>0){
                            leftDiff = absCssLeft - absLeft;
                        }else if(cssLeft<0 && left<0){
                            leftDiff = absCssLeft + absLeft;
                        }else if(cssLeft>0 && left<0){
                            leftDiff = absLeft - cssLeft;
                        }else{
                            leftDiff = -absCssLeft - absLeft;
                        }

                        // Anzahl der Schritte, die für die Animation des Hauptbildes (angle self.angle .. 0) benötigt werden
                        steps = self.angle/self.animStep;
                        // Schrittweite für die Animation der Streckenänderung
                        stepWidth = leftDiff/steps;

                        self._animCoverflow(0, sgn, {
                            stepWidth: stepWidth,
                            left: cssLeft,
                            end: -left
                        });

                    }
                },


                _animCoverflow: function(angle, sgn, translation){
                    var self = this,
                        o = self.options,
                        left = 0,
                        diff = 0,
                        index;

                        // Setze die Dimensionen des RenderCanvas
                        self._setSkewWidthByAngle(self.canvasStack[self.oldIndex], sgn*angle);


                        // !!! TODO: ANIMIEREN (setTimeout => drittes Argument: Winkel von 0 bis self.angle) !!!
                        // Zeichne den Inhalt des BufferCanvas (Orginal+Spiegelung) um den Winkel self.angle gekippt in den Ausgabe(Render)Canvas
                        self._skew(self.canvasStack[self.oldIndex].renderCanvas.context, self.canvasStack[self.oldIndex].bufferCanvas.canvas[0], sgn*angle);

                        translation.left += translation.stepWidth;
                        // Streckenänderung animieren
                        self.list.css({
                            'left': translation.left + 'px'
                        });

                        // Setze die Dimensionen des RenderCanvas
                        self._setSkewWidthByAngle(self.canvasStack[self.newIndex], sgn*self.angle - sgn*angle);

                        // !!! TODO: ANIMIEREN (setTimeout => drittes Argument: Winkel von self.angle bis 0) !!!
                        // Zeichne den Inhalt des BufferCanvas (Orginal+Spiegelung) um den Winkel self.angle gekippt in den Ausgabe(Render)Canvas
                        self._skew(self.canvasStack[self.newIndex].renderCanvas.context, self.canvasStack[self.newIndex].bufferCanvas.canvas[0], -sgn*self.angle - -sgn*angle);


                        angle += self.animStep;

                        if(angle <= self.angle){
                            self.timer.hCoverflow = window.setTimeout(function(){
                                self._animCoverflow(angle, sgn, translation);
                            }, self.timer.animDelay);
                        }else{
                            if(angle > self.angle){
                                // Setze die Dimensionen des RenderCanvas
                                self._setSkewWidthByAngle(self.canvasStack[self.oldIndex], sgn*self.angle);

                                // Zeichne den Inhalt des BufferCanvas (Orginal+Spiegelung) um den Winkel self.angle gekippt in den Ausgabe(Render)Canvas
                                self._skew(self.canvasStack[self.oldIndex].renderCanvas.context, self.canvasStack[self.oldIndex].bufferCanvas.canvas[0], sgn*self.angle);
                            }

                            // Letzter Schritt
                            self.list.css({
                                'left': translation.end + 'px'
                            });

                            // Setze die Dimensionen des RenderCanvas
                            self._setSkewWidth(self.canvasStack[self.newIndex], self.canvasStack[self.newIndex].imgWidth);

                            // !!! TODO: ANIMIEREN (setTimeout => drittes Argument: Winkel von self.angle bis 0) !!!
                            // Zeichne den Inhalt des BufferCanvas (Orginal+Spiegelung) um den Winkel self.angle gekippt in den Ausgabe(Render)Canvas
                            self._skew(self.canvasStack[self.newIndex].renderCanvas.context, self.canvasStack[self.newIndex].bufferCanvas.canvas[0], 0);


                            self.oldIndex = self.newIndex;
                        }

                },

                _skewWidth: function(context, img, angle){
                    var cos = Math.cos(angle * Math.PI / 180);
                    if (cos <= 0) return img.width;

                    var self = this,
                        o = self.options,
                        w = img.width,
                        w2 = w * cos;

                    if (w2 < 1) return w;

                    var sliceNum = w2 / o.grid,
                        sliceWidthOrigin = w / sliceNum,
                        sliceWidthDest = sliceWidthOrigin * w2 / w;

                    return parseInt(sliceWidthDest*sliceNum);
                },

                _setSkewWidth: function(currentStackElem, skewWidth){
                    var self = this;
                        //,skewWidth = skewed ? currentStackElem.skewWidth : currentStackElem.imgWidth;

                    // Dimensionen für Render-Canvas
                    currentStackElem.renderCanvas.canvas.css({
                        //border: '1px solid grey',
                        width: skewWidth + "px",
                        //width: currentStackElem.imgWidth + "px",
                        height: self.canvasHeight + "px"
                    });

                    currentStackElem.renderCanvas.canvas[0].width = skewWidth;
                    //currentStackElem.renderCanvas.canvas[0].width = currentStackElem.imgWidth;
                    currentStackElem.renderCanvas.canvas[0].height = self.canvasHeight;
                },

                _setSkewWidthByAngle: function(currentStackElem, angle){
                    var self = this,
                        skewWidth = self._skewWidth(currentStackElem.renderCanvas.context, currentStackElem.bufferCanvas.canvas[0], angle);

                    self._setSkewWidth(currentStackElem, skewWidth);
                },

                _skew: function (context, img, angle) {
                    var cos = Math.cos(angle * Math.PI / 180);
                    if (cos <= 0) return;

                    var self = this,
                        o = self.options,
                        w = img.width,
                        h = img.height,
                        w2 = w * cos;

                    if (w2 < 1) return;

                    var scalingFactor = 0.6 + 0.4 * cos,
                        sliceNum = w2 / o.grid,
                        sliceWidthOrigin = w / sliceNum,
                        sliceWidthDest = sliceWidthOrigin * w2 / w,
                        heightDelta = h * ((1 - scalingFactor) / sliceNum);

                    for(var n = 0; n < sliceNum; n++) {
                        sx = Math.floor(sliceWidthOrigin * n);
                        sy = 0;
                        sw = Math.floor(sliceWidthOrigin);
                        sh = h;

                        dx = n * sliceWidthDest;
                        dy = (angle > 0) ? ((heightDelta * n) / 3) : heightDelta * sliceNum / 3 - heightDelta * n /3;
                        dw = sliceWidthDest;
                        dh = (angle > 0) ? h - (heightDelta * n) : h * scalingFactor + heightDelta * n;

                        try {
                            context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
                        } catch (e) {}
                    }
                },

                // called when created, and later when changing options
                _refresh: function() {
                },

                // events bound via _on are removed automatically
                // revert other modifications here
                _destroy: function() {
                    // remove generated elements
                    this.changer.remove();
                },

                // _setOptions is called with a hash of all options that are changing
                // always refresh when changing options
                _setOptions: function() {
                    // _super and _superApply handle keeping the right this-context
                    this._superApply(arguments);
                    this._refresh();
                },

                // _setOption is called for each individual option that is changing
                _setOption: function(key, value) {
                    // // prevent invalid color values
                    // if ( /red|green|blue/.test(key) && (value < 0 || value > 255) ) {
                    //   return;
                    // }
                    // this._super( key, value );
                }
            });
        });

    })(jQuery);
}
