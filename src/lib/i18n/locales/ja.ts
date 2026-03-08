/** Japanese translations (原文) */
const ja = {
  // -- Language metadata --
  _meta: {
    name: "日本語",
    flag: "🇯🇵",
    aiTranslated: false,
  },

  // -- Header --
  header: {
    guide: "ガイド",
    about: "概要",
    switchToLight: "ライトモードに切り替え",
    switchToDark: "ダークモードに切り替え",
  },

  // -- Footer --
  footer: {
    copyright: "Bambu Lab とは無関係です。",
    disclaimer: "変換されたG-codeの使用は自己責任です。印刷前に必ず出力を確認してください。",
    aiTranslationNote: "日本語以外の翻訳はAIによるものです。",
  },

  // -- File Upload --
  upload: {
    dropHere: "G-codeファイルをここにドロップ",
    dropOrBrowse: "G-codeファイルをここにドロップ、または",
    browse: "ファイルを選択",
    supportedFormats: ".gcode, .gc, .g ファイルに対応（最大50MB）",
    unsupportedExtension: "非対応のファイル拡張子「{ext}」です。.gcode, .gc, .g ファイルをアップロードしてください。",
    fileTooLarge: "ファイルが大きすぎます（{size}）。最大50MBです。",
    readError: "ファイルの読み込みに失敗しました。もう一度お試しください。",
    invalidType: "無効なファイル形式です。.gcode, .gc, .g ファイルをアップロードしてください。",
    unsupportedType: "非対応のファイル形式",
    parsing: "解析中...",
    ready: "準備完了",
    parseFailed: "解析失敗",
    removeFile: "ファイルを削除",
  },

  // -- Settings Tabs --
  settings: {
    filamentTab: "素材",
    printTab: "印刷",
    advancedTab: "詳細",
  },

  // -- Filament Settings --
  filament: {
    type: "フィラメント種類",
    selectPlaceholder: "フィラメントを選択",
    presetHint: "プリセットを選択すると温度と速度が自動設定されます",
    nozzleTemp: "ノズル温度",
    bedTemp: "ベッド温度",
    recommended: "推奨: {min}-{max}°C ({type})",
  },

  // -- Print Settings --
  print: {
    printerModel: "プリンターモデル",
    selectPrinter: "プリンターを選択",
    maxSpeed: "最大印刷速度",
    speedUnit: "mm/s",
    speedHint: "フィラメント種類に応じた速度制限を適用します",
    speedFactor: "速度倍率",
    speedFactorHint: "全ての移動速度に倍率をかけます（100% = 変更なし）",
    nozzleDiameter: "ノズル径",
    selectNozzle: "ノズル径を選択",
    bedOffset: "ベッドオフセット",
    autoCenter: "自動センタリング",
    previewTitle: "オフセット適用後の座標範囲",
    width: "幅",
    fitsInVolume: "ビルドボリューム内に収まっています",
    exceedsVolume: "ビルドボリュームを超えています",
    buildVolume: "ビルドボリューム",
    buildVolumeSpec: "Bambu Lab A1: 256 x 256 x 256 mm",
  },

  // -- Advanced Settings --
  advanced: {
    customStartGCode: "カスタム開始 G-code",
    customEndGCode: "カスタム終了 G-code",
    reset: "リセット",
    startPlaceholder: "デフォルトの開始 G-code を使用します...",
    endPlaceholder: "デフォルトの終了 G-code を使用します...",
    hint: "空欄のままにすると、選択したプリンターのデフォルト G-code が使用されます。カスタム G-code を入力すると、デフォルトのテンプレートが上書きされます。",
  },

  // -- Convert / Download --
  convert: {
    converting: "変換中...",
    reconvert: "再変換",
    convertForBambu: "Bambu用に変換",
    download: "ダウンロード",
  },

  // -- Safety Warnings --
  warnings: {
    title: "安全性の警告",
    error: "エラー",
    warning: "警告",
    info: "情報",
    nErrors: "{n}件のエラー",
    nWarnings: "{n}件の警告",
    nInfo: "{n}件の情報",
    showAll: "すべての{n}件の警告を表示",
    showFewer: "警告を折りたたむ",
    line: "行 {n}",
  },

  // -- 3D Preview --
  preview: {
    parsingGCode: "G-codeを解析中...",
    failedToParse: "G-codeの解析に失敗しました",
    noGCodeLoaded: "G-codeが読み込まれていません",
    uploadToPreview: "ファイルをアップロードして3Dプレビューを表示",
    layer: "レイヤー",
    layers: "{n} レイヤー",
    previewError: "3Dプレビューエラー",
    previewErrorMessage: "3Dプレビューの描画に失敗しました。",
    retry: "再試行",
  },

  // -- Status Bar --
  status: {
    parsing: "解析中...",
    converted: "変換済み",
    parsed: "解析完了 ({n} レイヤー)",
    ready: "準備完了",
    nErrors: "{n}件のエラー",
    nWarnings: "{n}件の警告",
    noWarnings: "警告なし",
  },

  // -- Error Page --
  errorPage: {
    title: "エラーが発生しました",
    tryAgain: "もう一度試す",
  },

  // -- Guide Page --
  guide: {
    title: "使い方ガイド",
    subtitle: "gcoordinatorのG-codeをBambu Lab A1用に変換する手順を解説します。",
    step1Title: "gcoordinatorでG-codeを準備する",
    step1Desc: "gcoordinatorでモデルを設計し、G-codeファイル（.gcode）をエクスポートしてください。gcoordinatorが出力する標準的なG-codeがそのまま使えます。",
    step2Title: "G-codeファイルをアップロードする",
    step2Desc: "トップページのアップロードエリアに.gcodeファイルをドラッグ＆ドロップするか、クリックしてファイルを選択します。最大50MBまで対応しています。ファイルはブラウザ上でのみ処理され、サーバーには送信されません。",
    step3Title: "印刷設定を調整する",
    step3Desc: "「素材」タブでフィラメントの種類と温度を設定し、「印刷」タブで速度やレイヤー高さを調整します。「詳細」タブではファンやリトラクションなどの細かい設定が可能です。",
    step4Title: "プレビューと警告を確認する",
    step4Desc: "右側の3Dプレビューでツールパスを確認できます。レイヤースライダーで各層を個別に確認し、安全性の警告が表示された場合は内容を確認してから変換してください。",
    step5Title: "変換してダウンロードする",
    step5Desc: "「Bambu A1 用に変換」ボタンを押すと、Bambu Lab A1対応のG-codeに変換されます。変換が完了したらダウンロードボタンでファイルを保存してください。",
    step6Title: "SDカードに転送して印刷する",
    step6Desc: "ダウンロードしたファイルをmicroSDカードにコピーし、Bambu Lab A1に挿入して印刷を開始します。詳しくは下のSDカードの注意点をご確認ください。",
    sdCardTitle: "SDカードに関する注意点",
    sdTip1: "microSDカードは<b>FAT32</b>でフォーマットしてください。exFATやNTFSはBambu Lab A1で認識されない場合があります。",
    sdTip2: "G-codeファイルはSDカードの<b>ルートディレクトリ</b>に配置してください。サブフォルダに入れると認識されないことがあります。",
    sdTip3: "ファイル名は<b>半角英数字とアンダースコア</b>のみを使用してください。日本語や特殊文字を含むファイル名は避けてください。",
    sdTip4: "SDカードの容量は<b>32GB以下</b>を推奨します。大容量カードではFAT32フォーマットに制限があります。",
    safetyTitle: "安全に関する注意事項",
    safety1: "変換されたG-codeで<b>初めて印刷する際は、必ずプリンターの側で監視してください</b>。異常な動きや音がした場合はすぐに停止してください。",
    safety2: "本ツールはBambu Lab公式のソフトウェアではありません。変換結果について<b>動作保証はいたしません</b>。自己責任でご使用ください。",
    safety3: "温度設定が高すぎるとノズル詰まりやフィラメント劣化の原因になります。使用するフィラメントの<b>推奨温度範囲</b>を確認してください。",
    safety4: "大きなモデルを印刷する前に、小さなテストピースで<b>変換結果を検証</b>することを強くお勧めします。",
    startConverting: "変換を始める",
  },

  // -- About Page --
  about: {
    title: "About",
    subtitle: "G-code Converterについて",
    projectOverview: "プロジェクト概要",
    projectDesc: "gcoordinatorとBambu Lab A1をつなぐ変換ツール",
    projectP1: "<b>gcoordinator</b>は、座標変換ベースの独自アプローチで3Dプリント用のG-codeを生成するツールです。従来のスライサーとは異なり、数学的な座標変換を活用して複雑な造形パターンを実現します。",
    projectP2: "しかし、gcoordinatorが出力するG-codeはそのままでは<b>Bambu Lab A1</b>では正しく動作しません。Bambu Lab A1は独自のG-codeフレーバーや初期化シーケンスを必要とするためです。",
    projectP3: "本ツールは、gcoordinatorのG-codeを解析し、Bambu Lab A1が期待する形式に変換します。ヘッダー・フッターの追加、温度制御コマンドの変換、ファン制御、リトラクション設定の最適化などを自動的に行います。",
    techStack: "技術スタック",
    frontend: "フロントエンド",
    libraries: "ライブラリ",
    libThreejs: "Three.js / React Three Fiber (3Dプレビュー)",
    libZustand: "Zustand (状態管理)",
    libShadcn: "shadcn/ui (UIコンポーネント)",
    libSonner: "Sonner (通知)",
    browserNote: "すべてのG-code処理はブラウザ上で実行されます。ファイルがサーバーに送信されることはありません。",
    relatedLinks: "関連リンク",
    gcoordinatorDesc: "座標変換ベースのG-code生成ツール",
    bambuWikiDesc: "Bambu Lab A1の仕様とドキュメント",
    disclaimer: "免責事項",
    disclaimerP1: "本ツールは<b>Bambu Lab社の公式製品ではありません</b>。Bambu Lab社とは一切の提携・関係はありません。",
    disclaimerP2: "変換されたG-codeの使用は<b>自己責任</b>で行ってください。本ツールの使用により生じたいかなる損害についても、開発者は責任を負いません。",
    disclaimerP3: "変換されたG-codeで印刷する際は、必ずプリンターの動作を監視し、異常が見られた場合は直ちに印刷を停止してください。",
    credits: "クレジット",
    creditsIntro: "本プロジェクトはオープンソースコミュニティの多くのツールやライブラリに支えられています。",
    creditGcoordinator: "座標変換ベースのG-code生成ツール",
    creditNextjs: "VercelによるReactフレームワーク",
    creditShadcn: "美しいUIコンポーネントライブラリ",
    creditThreejs: "WebGL 3Dレンダリングライブラリ",
    backToConverter: "変換ページに戻る",
  },
} as const;

// Derive a "widened" type where all leaf string literals become `string`
// and booleans become `boolean`, so other locale files can satisfy it.
type Widen<T> = T extends string
  ? string
  : T extends boolean
    ? boolean
    : T extends number
      ? number
      : { [K in keyof T]: Widen<T[K]> };

export type Translations = Widen<typeof ja>;
export default ja;
