import type { Translations } from "./ja";

/** French translations (Français) */
const fr: Translations = {
  // -- Language metadata --
  _meta: {
    name: "Français",
    flag: "🇫🇷",
    aiTranslated: true,
  },

  // -- Header --
  header: {
    guide: "Guide",
    about: "À propos",
    switchToLight: "Passer en mode clair",
    switchToDark: "Passer en mode sombre",
  },

  // -- Footer --
  footer: {
    copyright: "Non affilié à Bambu Lab.",
    disclaimer: "L'utilisation du G-code converti est à vos propres risques. Vérifiez toujours le résultat avant d'imprimer.",
    aiTranslationNote: "Les traductions autres que le japonais ont été générées par IA.",
  },

  // -- File Upload --
  upload: {
    dropHere: "Déposez votre fichier G-code ici",
    dropOrBrowse: "Déposez votre fichier G-code ici, ou",
    browse: "Parcourir les fichiers",
    supportedFormats: "Fichiers .gcode, .gc, .g pris en charge (50 Mo max.)",
    unsupportedExtension: "Extension de fichier non prise en charge : « {ext} ». Veuillez importer un fichier .gcode, .gc ou .g.",
    fileTooLarge: "Le fichier est trop volumineux ({size}). La taille maximale est de 50 Mo.",
    readError: "Échec de la lecture du fichier. Veuillez réessayer.",
    invalidType: "Type de fichier invalide. Veuillez importer un fichier .gcode, .gc ou .g.",
    unsupportedType: "Type de fichier non pris en charge",
    parsing: "Analyse en cours...",
    ready: "Prêt",
    parseFailed: "Échec de l'analyse",
    removeFile: "Supprimer le fichier",
  },

  // -- Settings Tabs --
  settings: {
    filamentTab: "Matériau",
    printTab: "Impression",
    advancedTab: "Avancé",
  },

  // -- Filament Settings --
  filament: {
    type: "Type de filament",
    selectPlaceholder: "Sélectionnez un filament",
    presetHint: "La sélection d'un préréglage configure automatiquement la température et la vitesse",
    nozzleTemp: "Température de la buse",
    bedTemp: "Température du plateau",
    recommended: "Recommandé : {min}-{max}°C ({type})",
  },

  // -- Print Settings --
  print: {
    maxSpeed: "Vitesse d'impression maximale",
    speedUnit: "mm/s",
    speedHint: "Applique une limite de vitesse adaptée au type de filament",
    nozzleDiameter: "Diamètre de la buse",
    selectNozzle: "Sélectionnez le diamètre de la buse",
    bedOffset: "Décalage du plateau",
    autoCenter: "Centrage automatique",
    previewTitle: "Plage de coordonnées après application du décalage",
    width: "Largeur",
    fitsInVolume: "Dans les limites du volume d'impression",
    exceedsVolume: "Dépasse le volume d'impression",
    buildVolume: "Volume d'impression",
    buildVolumeSpec: "Bambu Lab A1 : 256 x 256 x 256 mm",
  },

  // -- Advanced Settings --
  advanced: {
    customStartGCode: "G-code de démarrage personnalisé",
    customEndGCode: "G-code de fin personnalisé",
    reset: "Réinitialiser",
    startPlaceholder: "Utilise le G-code de démarrage par défaut...",
    endPlaceholder: "Utilise le G-code de fin par défaut...",
    hint: "Si laissé vide, le G-code par défaut pour Bambu Lab A1 sera utilisé. Un G-code personnalisé remplacera le modèle par défaut.",
  },

  // -- Convert / Download --
  convert: {
    converting: "Conversion en cours...",
    reconvert: "Reconvertir",
    convertForBambu: "Convertir pour Bambu A1",
    download: "Télécharger",
  },

  // -- Safety Warnings --
  warnings: {
    title: "Avertissements de sécurité",
    error: "Erreur",
    warning: "Avertissement",
    info: "Information",
    nErrors: "{n} erreur(s)",
    nWarnings: "{n} avertissement(s)",
    nInfo: "{n} information(s)",
    showAll: "Afficher les {n} avertissements",
    showFewer: "Réduire les avertissements",
    line: "Ligne {n}",
  },

  // -- 3D Preview --
  preview: {
    parsingGCode: "Analyse du G-code en cours...",
    failedToParse: "Échec de l'analyse du G-code",
    noGCodeLoaded: "Aucun G-code chargé",
    uploadToPreview: "Importez un fichier pour afficher l'aperçu 3D",
    layer: "Couche",
    layers: "{n} couches",
    previewError: "Erreur de l'aperçu 3D",
    previewErrorMessage: "Échec du rendu de l'aperçu 3D.",
    retry: "Réessayer",
  },

  // -- Status Bar --
  status: {
    parsing: "Analyse en cours...",
    converted: "Converti",
    parsed: "Analysé ({n} couches)",
    ready: "Prêt",
    nErrors: "{n} erreur(s)",
    nWarnings: "{n} avertissement(s)",
    noWarnings: "Aucun avertissement",
  },

  // -- Error Page --
  errorPage: {
    title: "Une erreur est survenue",
    tryAgain: "Réessayer",
  },

  // -- Guide Page --
  guide: {
    title: "Guide d'utilisation",
    subtitle: "Découvrez comment convertir le G-code de gcoordinator pour Bambu Lab A1.",
    step1Title: "Préparer le G-code dans gcoordinator",
    step1Desc: "Concevez votre modèle dans gcoordinator et exportez le fichier G-code (.gcode). Le G-code standard généré par gcoordinator peut être utilisé tel quel.",
    step2Title: "Importer le fichier G-code",
    step2Desc: "Glissez-déposez votre fichier .gcode dans la zone d'importation de la page d'accueil, ou cliquez pour sélectionner un fichier. La taille maximale est de 50 Mo. Le fichier est traité uniquement dans votre navigateur et n'est jamais envoyé à un serveur.",
    step3Title: "Ajuster les paramètres d'impression",
    step3Desc: "Dans l'onglet « Matériau », configurez le type de filament et les températures. Dans l'onglet « Impression », ajustez la vitesse et la hauteur de couche. L'onglet « Avancé » permet de régler le ventilateur, la rétraction et d'autres paramètres détaillés.",
    step4Title: "Vérifier l'aperçu et les avertissements",
    step4Desc: "Vérifiez le parcours d'outil dans l'aperçu 3D à droite. Utilisez le curseur de couche pour inspecter chaque couche individuellement. Si des avertissements de sécurité apparaissent, examinez-les avant de procéder à la conversion.",
    step5Title: "Convertir et télécharger",
    step5Desc: "Cliquez sur le bouton « Convertir pour Bambu A1 » pour générer le G-code compatible Bambu Lab A1. Une fois la conversion terminée, cliquez sur le bouton de téléchargement pour enregistrer le fichier.",
    step6Title: "Transférer sur carte SD et imprimer",
    step6Desc: "Copiez le fichier téléchargé sur une carte microSD et insérez-la dans votre Bambu Lab A1 pour lancer l'impression. Consultez les conseils ci-dessous concernant la carte SD pour plus de détails.",
    sdCardTitle: "Conseils pour la carte SD",
    sdTip1: "Formatez votre carte microSD en <b>FAT32</b>. Les formats exFAT et NTFS peuvent ne pas être reconnus par la Bambu Lab A1.",
    sdTip2: "Placez les fichiers G-code dans le <b>répertoire racine</b> de la carte SD. Les fichiers dans des sous-dossiers peuvent ne pas être détectés.",
    sdTip3: "Utilisez uniquement des <b>caractères alphanumériques et des underscores</b> dans les noms de fichiers. Évitez les caractères spéciaux ou non-ASCII.",
    sdTip4: "Une carte SD de <b>32 Go ou moins</b> est recommandée. Les cartes de grande capacité peuvent présenter des limitations avec le formatage FAT32.",
    safetyTitle: "Consignes de sécurité",
    safety1: "Lors de la <b>première impression avec un G-code converti, surveillez impérativement l'imprimante</b>. En cas de mouvement ou de bruit anormal, arrêtez immédiatement l'impression.",
    safety2: "Cet outil n'est pas un logiciel officiel de Bambu Lab. <b>Aucune garantie de fonctionnement n'est fournie</b>. Utilisez-le à vos propres risques.",
    safety3: "Des températures trop élevées peuvent provoquer un bouchage de la buse ou une dégradation du filament. Vérifiez la <b>plage de température recommandée</b> pour votre filament.",
    safety4: "Avant d'imprimer des modèles volumineux, il est fortement recommandé de <b>valider la conversion</b> avec une petite pièce de test.",
    startConverting: "Commencer la conversion",
  },

  // -- About Page --
  about: {
    title: "About",
    subtitle: "À propos de G-code Converter",
    projectOverview: "Aperçu du projet",
    projectDesc: "Un outil de conversion reliant gcoordinator à Bambu Lab A1",
    projectP1: "<b>gcoordinator</b> est un outil qui génère du G-code pour l'impression 3D grâce à une approche unique basée sur la transformation de coordonnées. Contrairement aux trancheurs traditionnels, il exploite des transformations mathématiques pour réaliser des motifs de fabrication complexes.",
    projectP2: "Cependant, le G-code généré par gcoordinator ne fonctionne pas directement avec la <b>Bambu Lab A1</b>, car celle-ci nécessite un format G-code spécifique et des séquences d'initialisation propres.",
    projectP3: "Cet outil analyse le G-code de gcoordinator et le convertit au format attendu par la Bambu Lab A1. Il ajoute automatiquement les en-têtes et pieds de page, convertit les commandes de contrôle de température, et optimise le contrôle du ventilateur et les réglages de rétraction.",
    techStack: "Stack technique",
    frontend: "Frontend",
    libraries: "Bibliothèques",
    libThreejs: "Three.js / React Three Fiber (aperçu 3D)",
    libZustand: "Zustand (gestion d'état)",
    libShadcn: "shadcn/ui (composants d'interface)",
    libSonner: "Sonner (notifications)",
    browserNote: "L'ensemble du traitement du G-code s'effectue dans le navigateur. Aucun fichier n'est envoyé à un serveur.",
    relatedLinks: "Liens utiles",
    gcoordinatorDesc: "Outil de génération de G-code basé sur la transformation de coordonnées",
    bambuWikiDesc: "Spécifications et documentation de la Bambu Lab A1",
    disclaimer: "Clause de non-responsabilité",
    disclaimerP1: "Cet outil <b>n'est pas un produit officiel de Bambu Lab</b>. Il n'est en aucun cas affilié à ou associé avec Bambu Lab.",
    disclaimerP2: "L'utilisation du G-code converti se fait <b>à vos propres risques</b>. Le développeur décline toute responsabilité pour les dommages résultant de l'utilisation de cet outil.",
    disclaimerP3: "Lors de l'impression avec du G-code converti, surveillez toujours le fonctionnement de l'imprimante et arrêtez immédiatement l'impression en cas d'anomalie.",
    credits: "Crédits",
    creditsIntro: "Ce projet s'appuie sur de nombreux outils et bibliothèques de la communauté open source.",
    creditGcoordinator: "Outil de génération de G-code basé sur la transformation de coordonnées",
    creditNextjs: "Framework React par Vercel",
    creditShadcn: "Bibliothèque de composants d'interface élégants",
    creditThreejs: "Bibliothèque de rendu 3D WebGL",
    backToConverter: "Retour au convertisseur",
  },
} as const;

export default fr;
