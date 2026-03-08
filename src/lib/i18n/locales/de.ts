/** German translations (Deutsch) */
import type { Translations } from "./ja";

const de: Translations = {
  // -- Language metadata --
  _meta: {
    name: "Deutsch",
    flag: "\u{1F1E9}\u{1F1EA}",
    aiTranslated: true,
  },

  // -- Header --
  header: {
    guide: "Anleitung",
    about: "\u00DCber",
    switchToLight: "Zum hellen Modus wechseln",
    switchToDark: "Zum dunklen Modus wechseln",
  },

  // -- Footer --
  footer: {
    copyright: "Nicht mit Bambu Lab verbunden.",
    disclaimer: "Die Verwendung von konvertiertem G-code erfolgt auf eigene Gefahr. Bitte \u00FCberpr\u00FCfen Sie die Ausgabe vor dem Drucken.",
    aiTranslationNote: "\u00DCbersetzungen au\u00DFer Japanisch wurden von KI erstellt.",
  },

  // -- File Upload --
  upload: {
    dropHere: "G-code-Datei hierher ziehen",
    dropOrBrowse: "G-code-Datei hierher ziehen oder",
    browse: "Datei ausw\u00E4hlen",
    supportedFormats: ".gcode, .gc, .g Dateien unterst\u00FCtzt (max. 50\u202FMB)",
    unsupportedExtension: "Nicht unterst\u00FCtzte Dateierweiterung \u201E{ext}\u201C. Bitte laden Sie eine .gcode, .gc oder .g Datei hoch.",
    fileTooLarge: "Die Datei ist zu gro\u00DF ({size}). Maximal 50\u202FMB.",
    readError: "Die Datei konnte nicht gelesen werden. Bitte versuchen Sie es erneut.",
    invalidType: "Ung\u00FCltiges Dateiformat. Bitte laden Sie eine .gcode, .gc oder .g Datei hoch.",
    unsupportedType: "Nicht unterst\u00FCtztes Dateiformat",
    parsing: "Wird analysiert\u2026",
    ready: "Bereit",
    parseFailed: "Analyse fehlgeschlagen",
    removeFile: "Datei entfernen",
  },

  // -- Settings Tabs --
  settings: {
    filamentTab: "Material",
    printTab: "Druck",
    advancedTab: "Erweitert",
  },

  // -- Filament Settings --
  filament: {
    type: "Filamenttyp",
    selectPlaceholder: "Filament ausw\u00E4hlen",
    presetHint: "Bei Auswahl einer Vorlage werden Temperatur und Geschwindigkeit automatisch eingestellt",
    nozzleTemp: "D\u00FCsentemperatur",
    bedTemp: "Betttemperatur",
    recommended: "Empfohlen: {min}\u2013{max}\u202F\u00B0C ({type})",
  },

  // -- Print Settings --
  print: {
    printerModel: "Druckermodell",
    selectPrinter: "Drucker auswählen",
    maxSpeed: "Maximale Druckgeschwindigkeit",
    speedUnit: "mm/s",
    speedHint: "Wendet eine Geschwindigkeitsbegrenzung basierend auf dem Filamenttyp an",
    speedFactor: "Geschwindigkeitsfaktor",
    speedFactorHint: "Multipliziert alle Vorschübe mit diesem Faktor (100% = keine Änderung)",
    nozzleDiameter: "D\u00FCsendurchmesser",
    selectNozzle: "D\u00FCsendurchmesser ausw\u00E4hlen",
    bedOffset: "Bett-Offset",
    autoCenter: "Automatisch zentrieren",
    previewTitle: "Koordinatenbereich nach Offset-Anwendung",
    width: "Breite",
    fitsInVolume: "Passt in den Bauraum",
    exceedsVolume: "Bauraum wird \u00FCberschritten",
    buildVolume: "Bauraum",
    buildVolumeSpec: "Bambu Lab A1: 256 x 256 x 256 mm",
  },

  // -- Advanced Settings --
  advanced: {
    customStartGCode: "Benutzerdefinierter Start-G-code",
    customEndGCode: "Benutzerdefinierter End-G-code",
    reset: "Zur\u00FCcksetzen",
    startPlaceholder: "Standard-Start-G-code wird verwendet\u2026",
    endPlaceholder: "Standard-End-G-code wird verwendet\u2026",
    hint: "Wenn leer gelassen, wird der Standard-G-code des ausgewählten Druckers verwendet. Benutzerdefinierter G-code überschreibt die Standardvorlage.",
  },

  // -- Convert / Download --
  convert: {
    converting: "Wird konvertiert\u2026",
    reconvert: "Erneut konvertieren",
    convertForBambu: "Für Bambu konvertieren",
    download: "Herunterladen",
  },

  // -- Safety Warnings --
  warnings: {
    title: "Sicherheitswarnungen",
    error: "Fehler",
    warning: "Warnung",
    info: "Info",
    nErrors: "{n} Fehler",
    nWarnings: "{n} Warnungen",
    nInfo: "{n} Hinweise",
    showAll: "Alle {n} Warnungen anzeigen",
    showFewer: "Warnungen einklappen",
    line: "Zeile {n}",
  },

  // -- 3D Preview --
  preview: {
    parsingGCode: "G-code wird analysiert\u2026",
    failedToParse: "G-code-Analyse fehlgeschlagen",
    noGCodeLoaded: "Kein G-code geladen",
    uploadToPreview: "Laden Sie eine Datei hoch, um die 3D-Vorschau anzuzeigen",
    layer: "Schicht",
    layers: "{n} Schichten",
    previewError: "3D-Vorschaufehler",
    previewErrorMessage: "Die 3D-Vorschau konnte nicht gerendert werden.",
    retry: "Erneut versuchen",
  },

  // -- Status Bar --
  status: {
    parsing: "Wird analysiert\u2026",
    converted: "Konvertiert",
    parsed: "Analysiert ({n} Schichten)",
    ready: "Bereit",
    nErrors: "{n} Fehler",
    nWarnings: "{n} Warnungen",
    noWarnings: "Keine Warnungen",
  },

  // -- Error Page --
  errorPage: {
    title: "Ein Fehler ist aufgetreten",
    tryAgain: "Erneut versuchen",
  },

  // -- Guide Page --
  guide: {
    title: "Bedienungsanleitung",
    subtitle: "Hier wird erkl\u00E4rt, wie Sie G-code von gcoordinator f\u00FCr Bambu Lab A1 konvertieren.",
    step1Title: "G-code in gcoordinator vorbereiten",
    step1Desc: "Entwerfen Sie Ihr Modell in gcoordinator und exportieren Sie eine G-code-Datei (.gcode). Der von gcoordinator ausgegebene Standard-G-code kann direkt verwendet werden.",
    step2Title: "G-code-Datei hochladen",
    step2Desc: "Ziehen Sie die .gcode-Datei per Drag\u202F&\u202FDrop in den Upload-Bereich auf der Startseite oder klicken Sie, um eine Datei auszuw\u00E4hlen. Es werden Dateien bis 50\u202FMB unterst\u00FCtzt. Die Datei wird ausschlie\u00DFlich im Browser verarbeitet und nicht an einen Server gesendet.",
    step3Title: "Druckeinstellungen anpassen",
    step3Desc: "Stellen Sie im Tab \u201EMaterial\u201C den Filamenttyp und die Temperaturen ein und passen Sie im Tab \u201EDruck\u201C Geschwindigkeit und Schichth\u00F6he an. Im Tab \u201EErweitert\u201C k\u00F6nnen Sie Feineinstellungen wie L\u00FCfter- und Retraktionsparameter vornehmen.",
    step4Title: "Vorschau und Warnungen pr\u00FCfen",
    step4Desc: "In der 3D-Vorschau auf der rechten Seite k\u00F6nnen Sie den Werkzeugpfad \u00FCberpr\u00FCfen. Verwenden Sie den Schichtregler, um einzelne Schichten zu inspizieren. Falls Sicherheitswarnungen angezeigt werden, \u00FCberpr\u00FCfen Sie diese vor der Konvertierung.",
    step5Title: "Konvertieren und herunterladen",
    step5Desc: "Klicken Sie auf \u201EF\u00FCr Bambu A1 konvertieren\u201C, um den G-code in ein Bambu Lab A1-kompatibles Format umzuwandeln. Nach Abschluss der Konvertierung speichern Sie die Datei \u00FCber den Download-Button.",
    step6Title: "Auf SD-Karte \u00FCbertragen und drucken",
    step6Desc: "Kopieren Sie die heruntergeladene Datei auf eine microSD-Karte und setzen Sie diese in den Bambu Lab A1 ein, um den Druck zu starten. Beachten Sie die unten stehenden Hinweise zur SD-Karte.",
    sdCardTitle: "Hinweise zur SD-Karte",
    sdTip1: "Formatieren Sie die microSD-Karte mit <b>FAT32</b>. exFAT und NTFS werden m\u00F6glicherweise vom Bambu Lab A1 nicht erkannt.",
    sdTip2: "Legen Sie die G-code-Datei im <b>Stammverzeichnis</b> der SD-Karte ab. Dateien in Unterordnern werden m\u00F6glicherweise nicht erkannt.",
    sdTip3: "Verwenden Sie f\u00FCr Dateinamen nur <b>ASCII-Zeichen und Unterstriche</b>. Vermeiden Sie Sonderzeichen und Umlaute im Dateinamen.",
    sdTip4: "Es wird eine SD-Karte mit <b>maximal 32\u202FGB</b> empfohlen. Bei gr\u00F6\u00DFeren Karten gibt es Einschr\u00E4nkungen bei der FAT32-Formatierung.",
    safetyTitle: "Sicherheitshinweise",
    safety1: "Beim <b>ersten Druck mit konvertiertem G-code sollten Sie den Drucker stets beaufsichtigen</b>. Stoppen Sie den Druck sofort bei ungew\u00F6hnlichen Bewegungen oder Ger\u00E4uschen.",
    safety2: "Dieses Tool ist keine offizielle Software von Bambu Lab. Es wird <b>keine Funktionsgarantie</b> f\u00FCr die Konvertierungsergebnisse gegeben. Die Nutzung erfolgt auf eigene Gefahr.",
    safety3: "Zu hohe Temperatureinstellungen k\u00F6nnen zu D\u00FCsenverstopfungen oder Filamentsch\u00E4den f\u00FChren. \u00DCberpr\u00FCfen Sie den <b>empfohlenen Temperaturbereich</b> Ihres Filaments.",
    safety4: "Es wird dringend empfohlen, vor dem Druck gro\u00DFer Modelle die <b>Konvertierungsergebnisse mit einem kleinen Testdruck zu \u00FCberpr\u00FCfen</b>.",
    startConverting: "Konvertierung starten",
  },

  // -- About Page --
  about: {
    title: "About",
    subtitle: "\u00DCber den G-code Converter",
    projectOverview: "Projekt\u00FCbersicht",
    projectDesc: "Ein Konvertierungstool, das gcoordinator und Bambu Lab A1 verbindet",
    projectP1: "<b>gcoordinator</b> ist ein Tool, das G-code f\u00FCr den 3D-Druck mithilfe eines einzigartigen, auf Koordinatentransformation basierenden Ansatzes generiert. Im Gegensatz zu herk\u00F6mmlichen Slicern nutzt es mathematische Koordinatentransformationen, um komplexe Druckmuster zu erm\u00F6glichen.",
    projectP2: "Der von gcoordinator ausgegebene G-code funktioniert jedoch nicht direkt mit dem <b>Bambu Lab A1</b>, da dieser einen eigenen G-code-Dialekt und eine spezielle Initialisierungssequenz ben\u00F6tigt.",
    projectP3: "Dieses Tool analysiert den G-code von gcoordinator und konvertiert ihn in das vom Bambu Lab A1 erwartete Format. Es f\u00FCgt automatisch Header und Footer hinzu, wandelt Temperatursteuerbefehle um und optimiert L\u00FCftersteuerung sowie Retraktionseinstellungen.",
    techStack: "Technologie-Stack",
    frontend: "Frontend",
    libraries: "Bibliotheken",
    libThreejs: "Three.js / React Three Fiber (3D-Vorschau)",
    libZustand: "Zustand (Zustandsverwaltung)",
    libShadcn: "shadcn/ui (UI-Komponenten)",
    libSonner: "Sonner (Benachrichtigungen)",
    browserNote: "Die gesamte G-code-Verarbeitung erfolgt im Browser. Es werden keine Dateien an einen Server gesendet.",
    relatedLinks: "Verwandte Links",
    gcoordinatorDesc: "Koordinatentransformation-basiertes G-code-Generierungstool",
    bambuWikiDesc: "Spezifikationen und Dokumentation des Bambu Lab A1",
    disclaimer: "Haftungsausschluss",
    disclaimerP1: "Dieses Tool ist <b>kein offizielles Produkt von Bambu Lab</b>. Es besteht keinerlei Partnerschaft oder Verbindung mit Bambu Lab.",
    disclaimerP2: "Die Verwendung des konvertierten G-codes erfolgt <b>auf eigene Gefahr</b>. Der Entwickler \u00FCbernimmt keine Haftung f\u00FCr Sch\u00E4den, die durch die Nutzung dieses Tools entstehen.",
    disclaimerP3: "Beim Drucken mit konvertiertem G-code \u00FCberwachen Sie bitte stets den Drucker und stoppen Sie den Druck sofort, wenn Unregelm\u00E4\u00DFigkeiten auftreten.",
    credits: "Credits",
    creditsIntro: "Dieses Projekt wird von zahlreichen Tools und Bibliotheken der Open-Source-Community unterst\u00FCtzt.",
    creditGcoordinator: "Koordinatentransformation-basiertes G-code-Generierungstool",
    creditNextjs: "React-Framework von Vercel",
    creditShadcn: "Elegante UI-Komponentenbibliothek",
    creditThreejs: "WebGL-3D-Rendering-Bibliothek",
    backToConverter: "Zur\u00FCck zur Konvertierung",
  },
} as const;

export default de;
