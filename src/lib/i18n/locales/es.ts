/** Spanish translations (Español) */
import type { Translations } from "./ja";

const es: Translations = {
  // -- Language metadata --
  _meta: {
    name: "Español",
    flag: "🇪🇸",
    aiTranslated: true,
  },

  // -- Header --
  header: {
    guide: "Guía",
    about: "Acerca de",
    switchToLight: "Cambiar a modo claro",
    switchToDark: "Cambiar a modo oscuro",
  },

  // -- Footer --
  footer: {
    copyright: "No afiliado con Bambu Lab.",
    disclaimer: "El uso del G-code convertido es bajo su propia responsabilidad. Verifique siempre la salida antes de imprimir.",
    aiTranslationNote: "Las traducciones fuera del japonés son generadas por IA.",
  },

  // -- File Upload --
  upload: {
    dropHere: "Suelte el archivo G-code aquí",
    dropOrBrowse: "Suelte el archivo G-code aquí, o",
    browse: "Seleccionar archivo",
    supportedFormats: "Compatible con archivos .gcode, .gc, .g (máximo 50 MB)",
    unsupportedExtension: "Extensión de archivo no compatible: \"{ext}\". Suba un archivo .gcode, .gc o .g.",
    fileTooLarge: "El archivo es demasiado grande ({size}). El máximo es 50 MB.",
    readError: "No se pudo leer el archivo. Inténtelo de nuevo.",
    invalidType: "Formato de archivo no válido. Suba un archivo .gcode, .gc o .g.",
    unsupportedType: "Formato de archivo no compatible",
    parsing: "Analizando...",
    ready: "Listo",
    parseFailed: "Error en el análisis",
    removeFile: "Eliminar archivo",
  },

  // -- Settings Tabs --
  settings: {
    filamentTab: "Material",
    printTab: "Impresión",
    advancedTab: "Avanzado",
  },

  // -- Filament Settings --
  filament: {
    type: "Tipo de filamento",
    selectPlaceholder: "Seleccionar filamento",
    presetHint: "Al seleccionar un preajuste, la temperatura y la velocidad se configuran automáticamente",
    nozzleTemp: "Temperatura de la boquilla",
    bedTemp: "Temperatura de la cama",
    recommended: "Recomendado: {min}-{max}°C ({type})",
  },

  // -- Print Settings --
  print: {
    printerModel: "Modelo de impresora",
    selectPrinter: "Seleccionar impresora",
    maxSpeed: "Velocidad máxima de impresión",
    speedUnit: "mm/s",
    speedHint: "Aplica un límite de velocidad según el tipo de filamento",
    speedFactor: "Factor de velocidad",
    speedFactorHint: "Multiplica todas las tasas de avance por este factor (100% = sin cambio)",
    nozzleDiameter: "Diámetro de la boquilla",
    selectNozzle: "Seleccionar diámetro de boquilla",
    bedOffset: "Desplazamiento de la cama",
    autoCenter: "Centrado automático",
    previewTitle: "Rango de coordenadas después del desplazamiento",
    width: "Ancho",
    fitsInVolume: "Cabe dentro del volumen de construcción",
    exceedsVolume: "Excede el volumen de construcción",
    buildVolume: "Volumen de construcción",
    buildVolumeSpec: "Bambu Lab A1: 256 x 256 x 256 mm",
  },

  // -- Advanced Settings --
  advanced: {
    customStartGCode: "G-code de inicio personalizado",
    customEndGCode: "G-code de fin personalizado",
    reset: "Restablecer",
    startPlaceholder: "Se utilizará el G-code de inicio predeterminado...",
    endPlaceholder: "Se utilizará el G-code de fin predeterminado...",
    hint: "Si se deja en blanco, se utilizará el G-code predeterminado de la impresora seleccionada. Al ingresar un G-code personalizado, se sobrescribirá la plantilla predeterminada.",
  },

  // -- Convert / Download --
  convert: {
    converting: "Convirtiendo...",
    reconvert: "Reconvertir",
    convertForBambu: "Convertir para Bambu",
    download: "Descargar",
  },

  // -- Safety Warnings --
  warnings: {
    title: "Advertencias de seguridad",
    error: "Error",
    warning: "Advertencia",
    info: "Información",
    nErrors: "{n} errores",
    nWarnings: "{n} advertencias",
    nInfo: "{n} informaciones",
    showAll: "Mostrar todas las {n} advertencias",
    showFewer: "Contraer advertencias",
    line: "Línea {n}",
  },

  // -- 3D Preview --
  preview: {
    parsingGCode: "Analizando G-code...",
    failedToParse: "Error al analizar el G-code",
    noGCodeLoaded: "No se ha cargado ningún G-code",
    uploadToPreview: "Suba un archivo para ver la vista previa 3D",
    layer: "Capa",
    layers: "{n} capas",
    previewError: "Error de vista previa 3D",
    previewErrorMessage: "No se pudo renderizar la vista previa 3D.",
    retry: "Reintentar",
  },

  // -- Status Bar --
  status: {
    parsing: "Analizando...",
    converted: "Convertido",
    parsed: "Análisis completo ({n} capas)",
    ready: "Listo",
    nErrors: "{n} errores",
    nWarnings: "{n} advertencias",
    noWarnings: "Sin advertencias",
  },

  // -- Error Page --
  errorPage: {
    title: "Ha ocurrido un error",
    tryAgain: "Intentar de nuevo",
  },

  // -- Guide Page --
  guide: {
    title: "Guía de uso",
    subtitle: "Explicación del proceso para convertir G-code de gcoordinator al formato Bambu Lab A1.",
    step1Title: "Preparar el G-code en gcoordinator",
    step1Desc: "Diseñe su modelo en gcoordinator y exporte el archivo G-code (.gcode). El G-code estándar generado por gcoordinator se puede utilizar directamente.",
    step2Title: "Subir el archivo G-code",
    step2Desc: "Arrastre y suelte el archivo .gcode en el área de carga de la página principal, o haga clic para seleccionar el archivo. Se admiten archivos de hasta 50 MB. Los archivos se procesan únicamente en el navegador y no se envían a ningún servidor.",
    step3Title: "Ajustar la configuración de impresión",
    step3Desc: "Configure el tipo de filamento y la temperatura en la pestaña \"Material\", y ajuste la velocidad y la altura de capa en la pestaña \"Impresión\". En la pestaña \"Avanzado\" puede configurar ajustes detallados como el ventilador y la retracción.",
    step4Title: "Revisar la vista previa y las advertencias",
    step4Desc: "Verifique las trayectorias de la herramienta en la vista previa 3D del lado derecho. Utilice el deslizador de capas para revisar cada capa individualmente. Si aparecen advertencias de seguridad, revíselas antes de proceder con la conversión.",
    step5Title: "Convertir y descargar",
    step5Desc: "Pulse el botón \"Convertir para Bambu A1\" para convertir el G-code al formato compatible con Bambu Lab A1. Una vez completada la conversión, guarde el archivo con el botón de descarga.",
    step6Title: "Transferir a la tarjeta SD e imprimir",
    step6Desc: "Copie el archivo descargado a una tarjeta microSD e insértela en la Bambu Lab A1 para iniciar la impresión. Consulte las notas sobre la tarjeta SD a continuación para más detalles.",
    sdCardTitle: "Notas sobre la tarjeta SD",
    sdTip1: "Formatee la tarjeta microSD en <b>FAT32</b>. Los formatos exFAT y NTFS podrían no ser reconocidos por la Bambu Lab A1.",
    sdTip2: "Coloque los archivos G-code en el <b>directorio raíz</b> de la tarjeta SD. Es posible que no se reconozcan si están dentro de subcarpetas.",
    sdTip3: "Utilice únicamente <b>caracteres alfanuméricos y guiones bajos</b> en el nombre del archivo. Evite nombres de archivo con caracteres especiales.",
    sdTip4: "Se recomienda utilizar tarjetas SD de <b>32 GB o menos</b>. Las tarjetas de mayor capacidad tienen limitaciones con el formato FAT32.",
    safetyTitle: "Precauciones de seguridad",
    safety1: "Al imprimir por primera vez con G-code convertido, <b>supervise siempre la impresora de cerca</b>. Si observa movimientos o sonidos anormales, detenga la impresión de inmediato.",
    safety2: "Esta herramienta no es un producto oficial de Bambu Lab. <b>No se garantiza el funcionamiento</b> del resultado de la conversión. Úsela bajo su propia responsabilidad.",
    safety3: "Las temperaturas demasiado altas pueden causar obstrucciones en la boquilla o degradación del filamento. Verifique el <b>rango de temperatura recomendado</b> para el filamento que esté utilizando.",
    safety4: "Antes de imprimir modelos grandes, se recomienda encarecidamente <b>verificar el resultado de la conversión</b> con una pieza de prueba pequeña.",
    startConverting: "Comenzar a convertir",
  },

  // -- About Page --
  about: {
    title: "About",
    subtitle: "Acerca de G-code Converter",
    projectOverview: "Descripción del proyecto",
    projectDesc: "Herramienta de conversión que conecta gcoordinator con Bambu Lab A1",
    projectP1: "<b>gcoordinator</b> es una herramienta que genera G-code para impresión 3D mediante un enfoque único basado en transformaciones de coordenadas. A diferencia de los laminadores convencionales, utiliza transformaciones matemáticas de coordenadas para lograr patrones de modelado complejos.",
    projectP2: "Sin embargo, el G-code generado por gcoordinator no funciona correctamente en la <b>Bambu Lab A1</b> sin modificaciones, ya que la Bambu Lab A1 requiere un formato de G-code propio y una secuencia de inicialización específica.",
    projectP3: "Esta herramienta analiza el G-code de gcoordinator y lo convierte al formato esperado por la Bambu Lab A1. Realiza automáticamente la adición de encabezados y pies de página, la conversión de comandos de control de temperatura, el control del ventilador y la optimización de la configuración de retracción.",
    techStack: "Tecnologías utilizadas",
    frontend: "Frontend",
    libraries: "Bibliotecas",
    libThreejs: "Three.js / React Three Fiber (vista previa 3D)",
    libZustand: "Zustand (gestión de estado)",
    libShadcn: "shadcn/ui (componentes de interfaz)",
    libSonner: "Sonner (notificaciones)",
    browserNote: "Todo el procesamiento de G-code se ejecuta en el navegador. Los archivos nunca se envían a un servidor.",
    relatedLinks: "Enlaces relacionados",
    gcoordinatorDesc: "Herramienta de generación de G-code basada en transformaciones de coordenadas",
    bambuWikiDesc: "Especificaciones y documentación de Bambu Lab A1",
    disclaimer: "Aviso legal",
    disclaimerP1: "Esta herramienta <b>no es un producto oficial de Bambu Lab</b>. No tiene ninguna afiliación ni relación con Bambu Lab.",
    disclaimerP2: "El uso del G-code convertido es <b>bajo su propia responsabilidad</b>. El desarrollador no se hace responsable de ningún daño causado por el uso de esta herramienta.",
    disclaimerP3: "Al imprimir con G-code convertido, supervise siempre el funcionamiento de la impresora y detenga la impresión de inmediato si observa alguna anomalía.",
    credits: "Créditos",
    creditsIntro: "Este proyecto se apoya en numerosas herramientas y bibliotecas de la comunidad de código abierto.",
    creditGcoordinator: "Herramienta de generación de G-code basada en transformaciones de coordenadas",
    creditNextjs: "Framework de React desarrollado por Vercel",
    creditShadcn: "Elegante biblioteca de componentes de interfaz",
    creditThreejs: "Biblioteca de renderizado 3D WebGL",
    backToConverter: "Volver al convertidor",
  },
} as const;

export default es;
