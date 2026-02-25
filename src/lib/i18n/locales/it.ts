/** Italian translations (Italiano) */
import type { Translations } from "./ja";

const it: Translations = {
  // -- Language metadata --
  _meta: {
    name: "Italiano",
    flag: "\u{1F1EE}\u{1F1F9}",
    aiTranslated: true,
  },

  // -- Header --
  header: {
    guide: "Guida",
    about: "Informazioni",
    switchToLight: "Passa alla modalit\u00e0 chiara",
    switchToDark: "Passa alla modalit\u00e0 scura",
  },

  // -- Footer --
  footer: {
    copyright: "Non affiliato con Bambu Lab.",
    disclaimer: "L'uso del G-code convertito \u00e8 a proprio rischio e pericolo. Verificare sempre l'output prima della stampa.",
    aiTranslationNote: "Le traduzioni diverse dal giapponese sono generate dall'IA.",
  },

  // -- File Upload --
  upload: {
    dropHere: "Trascina qui il file G-code",
    dropOrBrowse: "Trascina qui il file G-code, oppure",
    browse: "Seleziona file",
    supportedFormats: "Supporta file .gcode, .gc, .g (massimo 50 MB)",
    unsupportedExtension: "Estensione file non supportata: \"{ext}\". Carica un file .gcode, .gc o .g.",
    fileTooLarge: "Il file \u00e8 troppo grande ({size}). Il massimo \u00e8 50 MB.",
    readError: "Impossibile leggere il file. Riprova.",
    invalidType: "Formato file non valido. Carica un file .gcode, .gc o .g.",
    unsupportedType: "Formato file non supportato",
    parsing: "Analisi in corso...",
    ready: "Pronto",
    parseFailed: "Analisi fallita",
    removeFile: "Rimuovi file",
  },

  // -- Settings Tabs --
  settings: {
    filamentTab: "Materiale",
    printTab: "Stampa",
    advancedTab: "Avanzate",
  },

  // -- Filament Settings --
  filament: {
    type: "Tipo di filamento",
    selectPlaceholder: "Seleziona filamento",
    presetHint: "Selezionando un preset, temperatura e velocit\u00e0 vengono impostate automaticamente",
    nozzleTemp: "Temperatura ugello",
    bedTemp: "Temperatura piatto",
    recommended: "Consigliato: {min}-{max}\u00b0C ({type})",
  },

  // -- Print Settings --
  print: {
    printerModel: "Modello stampante",
    selectPrinter: "Seleziona stampante",
    maxSpeed: "Velocit\u00e0 massima di stampa",
    speedUnit: "mm/s",
    speedHint: "Applica un limite di velocit\u00e0 in base al tipo di filamento",
    nozzleDiameter: "Diametro ugello",
    selectNozzle: "Seleziona diametro ugello",
    bedOffset: "Offset piatto",
    autoCenter: "Centratura automatica",
    previewTitle: "Intervallo coordinate dopo l'offset",
    width: "Larghezza",
    fitsInVolume: "Rientra nel volume di costruzione",
    exceedsVolume: "Supera il volume di costruzione",
    buildVolume: "Volume di costruzione",
    buildVolumeSpec: "Bambu Lab A1: 256 x 256 x 256 mm",
  },

  // -- Advanced Settings --
  advanced: {
    customStartGCode: "G-code di avvio personalizzato",
    customEndGCode: "G-code di fine personalizzato",
    reset: "Ripristina",
    startPlaceholder: "Verr\u00e0 utilizzato il G-code di avvio predefinito...",
    endPlaceholder: "Verr\u00e0 utilizzato il G-code di fine predefinito...",
    hint: "Se lasciato vuoto, verrà utilizzato il G-code predefinito della stampante selezionata. Inserendo un G-code personalizzato, il template predefinito verrà sovrascritto.",
  },

  // -- Convert / Download --
  convert: {
    converting: "Conversione in corso...",
    reconvert: "Riconverti",
    convertForBambu: "Converti per Bambu",
    download: "Scarica",
  },

  // -- Safety Warnings --
  warnings: {
    title: "Avvisi di sicurezza",
    error: "Errore",
    warning: "Avviso",
    info: "Informazione",
    nErrors: "{n} errori",
    nWarnings: "{n} avvisi",
    nInfo: "{n} informazioni",
    showAll: "Mostra tutti i {n} avvisi",
    showFewer: "Comprimi avvisi",
    line: "Riga {n}",
  },

  // -- 3D Preview --
  preview: {
    parsingGCode: "Analisi G-code in corso...",
    failedToParse: "Impossibile analizzare il G-code",
    noGCodeLoaded: "Nessun G-code caricato",
    uploadToPreview: "Carica un file per visualizzare l'anteprima 3D",
    layer: "Strato",
    layers: "{n} strati",
    previewError: "Errore anteprima 3D",
    previewErrorMessage: "Impossibile renderizzare l'anteprima 3D.",
    retry: "Riprova",
  },

  // -- Status Bar --
  status: {
    parsing: "Analisi in corso...",
    converted: "Convertito",
    parsed: "Analisi completata ({n} strati)",
    ready: "Pronto",
    nErrors: "{n} errori",
    nWarnings: "{n} avvisi",
    noWarnings: "Nessun avviso",
  },

  // -- Error Page --
  errorPage: {
    title: "Si \u00e8 verificato un errore",
    tryAgain: "Riprova",
  },

  // -- Guide Page --
  guide: {
    title: "Guida all'uso",
    subtitle: "Spiegazione della procedura per convertire il G-code di gcoordinator nel formato Bambu Lab A1.",
    step1Title: "Preparare il G-code in gcoordinator",
    step1Desc: "Progetta il tuo modello in gcoordinator ed esporta il file G-code (.gcode). Il G-code standard generato da gcoordinator pu\u00f2 essere utilizzato direttamente.",
    step2Title: "Caricare il file G-code",
    step2Desc: "Trascina e rilascia il file .gcode nell'area di caricamento della pagina principale, oppure clicca per selezionare il file. Sono supportati file fino a 50 MB. I file vengono elaborati esclusivamente nel browser e non vengono inviati ad alcun server.",
    step3Title: "Regolare le impostazioni di stampa",
    step3Desc: "Configura il tipo di filamento e la temperatura nella scheda \"Materiale\" e regola la velocit\u00e0 e l'altezza dello strato nella scheda \"Stampa\". Nella scheda \"Avanzate\" puoi configurare impostazioni dettagliate come ventola e retrazione.",
    step4Title: "Controllare l'anteprima e gli avvisi",
    step4Desc: "Verifica i percorsi utensile nell'anteprima 3D sul lato destro. Usa il cursore degli strati per controllare ogni strato singolarmente. Se compaiono avvisi di sicurezza, esaminali prima di procedere con la conversione.",
    step5Title: "Convertire e scaricare",
    step5Desc: "Premi il pulsante \"Converti per Bambu A1\" per convertire il G-code nel formato compatibile con Bambu Lab A1. Una volta completata la conversione, salva il file con il pulsante di download.",
    step6Title: "Trasferire sulla scheda SD e stampare",
    step6Desc: "Copia il file scaricato su una scheda microSD e inseriscila nella Bambu Lab A1 per avviare la stampa. Consulta le note sulla scheda SD qui sotto per maggiori dettagli.",
    sdCardTitle: "Note sulla scheda SD",
    sdTip1: "Formatta la scheda microSD in <b>FAT32</b>. I formati exFAT e NTFS potrebbero non essere riconosciuti dalla Bambu Lab A1.",
    sdTip2: "Posiziona i file G-code nella <b>directory principale</b> della scheda SD. Potrebbero non essere riconosciuti se inseriti in sottocartelle.",
    sdTip3: "Usa solo <b>caratteri alfanumerici e trattini bassi</b> nel nome del file. Evita nomi di file con caratteri speciali.",
    sdTip4: "Si consiglia di utilizzare schede SD da <b>32 GB o meno</b>. Le schede di capacit\u00e0 superiore hanno limitazioni con il formato FAT32.",
    safetyTitle: "Precauzioni di sicurezza",
    safety1: "Quando stampi per la prima volta con G-code convertito, <b>sorveglia sempre la stampante da vicino</b>. Se noti movimenti o rumori anomali, ferma immediatamente la stampa.",
    safety2: "Questo strumento non \u00e8 un prodotto ufficiale di Bambu Lab. <b>Non si garantisce il funzionamento</b> del risultato della conversione. Usalo a tuo rischio e pericolo.",
    safety3: "Temperature troppo elevate possono causare ostruzioni dell'ugello o degradazione del filamento. Verifica l'<b>intervallo di temperatura consigliato</b> per il filamento in uso.",
    safety4: "Prima di stampare modelli di grandi dimensioni, si consiglia vivamente di <b>verificare il risultato della conversione</b> con un piccolo pezzo di prova.",
    startConverting: "Inizia la conversione",
  },

  // -- About Page --
  about: {
    title: "About",
    subtitle: "Informazioni su G-code Converter",
    projectOverview: "Panoramica del progetto",
    projectDesc: "Strumento di conversione che collega gcoordinator a Bambu Lab A1",
    projectP1: "<b>gcoordinator</b> \u00e8 uno strumento che genera G-code per la stampa 3D tramite un approccio unico basato sulle trasformazioni di coordinate. A differenza degli slicer convenzionali, utilizza trasformazioni matematiche delle coordinate per realizzare pattern di modellazione complessi.",
    projectP2: "Tuttavia, il G-code generato da gcoordinator non funziona correttamente sulla <b>Bambu Lab A1</b> senza modifiche, poich\u00e9 la Bambu Lab A1 richiede un formato G-code proprietario e una sequenza di inizializzazione specifica.",
    projectP3: "Questo strumento analizza il G-code di gcoordinator e lo converte nel formato atteso dalla Bambu Lab A1. Esegue automaticamente l'aggiunta di intestazioni e pi\u00e8 di pagina, la conversione dei comandi di controllo temperatura, il controllo della ventola e l'ottimizzazione delle impostazioni di retrazione.",
    techStack: "Stack tecnologico",
    frontend: "Frontend",
    libraries: "Librerie",
    libThreejs: "Three.js / React Three Fiber (anteprima 3D)",
    libZustand: "Zustand (gestione dello stato)",
    libShadcn: "shadcn/ui (componenti UI)",
    libSonner: "Sonner (notifiche)",
    browserNote: "Tutta l'elaborazione del G-code avviene nel browser. I file non vengono mai inviati a un server.",
    relatedLinks: "Link correlati",
    gcoordinatorDesc: "Strumento di generazione G-code basato sulle trasformazioni di coordinate",
    bambuWikiDesc: "Specifiche e documentazione di Bambu Lab A1",
    disclaimer: "Avviso legale",
    disclaimerP1: "Questo strumento <b>non \u00e8 un prodotto ufficiale di Bambu Lab</b>. Non ha alcuna affiliazione o relazione con Bambu Lab.",
    disclaimerP2: "L'uso del G-code convertito \u00e8 <b>a proprio rischio e pericolo</b>. Lo sviluppatore non si assume alcuna responsabilit\u00e0 per eventuali danni causati dall'uso di questo strumento.",
    disclaimerP3: "Quando stampi con G-code convertito, sorveglia sempre il funzionamento della stampante e ferma immediatamente la stampa se noti anomalie.",
    credits: "Crediti",
    creditsIntro: "Questo progetto si basa su numerosi strumenti e librerie della comunit\u00e0 open source.",
    creditGcoordinator: "Strumento di generazione G-code basato sulle trasformazioni di coordinate",
    creditNextjs: "Framework React sviluppato da Vercel",
    creditShadcn: "Elegante libreria di componenti UI",
    creditThreejs: "Libreria di rendering 3D WebGL",
    backToConverter: "Torna al convertitore",
  },
} as const;

export default it;
