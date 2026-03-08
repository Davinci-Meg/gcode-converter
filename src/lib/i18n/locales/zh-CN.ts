/** Simplified Chinese translations (简体中文) */
import type { Translations } from "./ja";

const zhCN: Translations = {
  // -- Language metadata --
  _meta: {
    name: "简体中文",
    flag: "🇨🇳",
    aiTranslated: true,
  },

  // -- Header --
  header: {
    guide: "指南",
    about: "关于",
    switchToLight: "切换到浅色模式",
    switchToDark: "切换到深色模式",
  },

  // -- Footer --
  footer: {
    copyright: "与 Bambu Lab 无关。",
    disclaimer: "使用转换后的G-code风险自负。打印前请务必检查输出结果。",
    aiTranslationNote: "日语以外的翻译由AI生成。",
  },

  // -- File Upload --
  upload: {
    dropHere: "将G-code文件拖放到此处",
    dropOrBrowse: "将G-code文件拖放到此处，或",
    browse: "选择文件",
    supportedFormats: "支持 .gcode, .gc, .g 文件（最大50MB）",
    unsupportedExtension: "不支持的文件扩展名「{ext}」。请上传 .gcode, .gc, .g 文件。",
    fileTooLarge: "文件过大（{size}）。最大支持50MB。",
    readError: "文件读取失败。请重试。",
    invalidType: "无效的文件格式。请上传 .gcode, .gc, .g 文件。",
    unsupportedType: "不支持的文件格式",
    parsing: "解析中...",
    ready: "准备就绪",
    parseFailed: "解析失败",
    removeFile: "删除文件",
  },

  // -- Settings Tabs --
  settings: {
    filamentTab: "耗材",
    printTab: "打印",
    advancedTab: "高级",
  },

  // -- Filament Settings --
  filament: {
    type: "耗材类型",
    selectPlaceholder: "选择耗材",
    presetHint: "选择预设后将自动设置温度和速度",
    nozzleTemp: "喷嘴温度",
    bedTemp: "热床温度",
    recommended: "推荐: {min}-{max}°C ({type})",
  },

  // -- Print Settings --
  print: {
    printerModel: "打印机型号",
    selectPrinter: "选择打印机",
    maxSpeed: "最大打印速度",
    speedUnit: "mm/s",
    speedHint: "根据耗材类型应用速度限制",
    speedFactor: "速度系数",
    speedFactorHint: "将所有进给速度乘以该系数（100% = 不变）",
    nozzleDiameter: "喷嘴直径",
    selectNozzle: "选择喷嘴直径",
    bedOffset: "热床偏移",
    autoCenter: "自动居中",
    previewTitle: "偏移后的坐标范围",
    width: "宽度",
    fitsInVolume: "在构建体积范围内",
    exceedsVolume: "超出构建体积",
    buildVolume: "构建体积",
    buildVolumeSpec: "Bambu Lab A1: 256 x 256 x 256 mm",
  },

  // -- Advanced Settings --
  advanced: {
    customStartGCode: "自定义起始 G-code",
    customEndGCode: "自定义结束 G-code",
    reset: "重置",
    startPlaceholder: "使用默认的起始 G-code...",
    endPlaceholder: "使用默认的结束 G-code...",
    hint: "留空时将使用所选打印机的默认 G-code。输入自定义 G-code 将覆盖默认模板。",
  },

  // -- Convert / Download --
  convert: {
    converting: "转换中...",
    reconvert: "重新转换",
    convertForBambu: "转换为 Bambu 格式",
    download: "下载",
  },

  // -- Safety Warnings --
  warnings: {
    title: "安全警告",
    error: "错误",
    warning: "警告",
    info: "信息",
    nErrors: "{n}个错误",
    nWarnings: "{n}个警告",
    nInfo: "{n}条信息",
    showAll: "显示全部{n}条警告",
    showFewer: "收起警告",
    line: "第 {n} 行",
  },

  // -- 3D Preview --
  preview: {
    parsingGCode: "正在解析G-code...",
    failedToParse: "G-code解析失败",
    noGCodeLoaded: "未加载G-code",
    uploadToPreview: "上传文件以查看3D预览",
    layer: "层",
    layers: "{n} 层",
    previewError: "3D预览错误",
    previewErrorMessage: "3D预览渲染失败。",
    retry: "重试",
  },

  // -- Status Bar --
  status: {
    parsing: "解析中...",
    converted: "已转换",
    parsed: "解析完成（{n} 层）",
    ready: "准备就绪",
    nErrors: "{n}个错误",
    nWarnings: "{n}个警告",
    noWarnings: "无警告",
  },

  // -- Error Page --
  errorPage: {
    title: "发生错误",
    tryAgain: "重试",
  },

  // -- Guide Page --
  guide: {
    title: "使用指南",
    subtitle: "介绍如何将gcoordinator的G-code转换为Bambu Lab A1可用的格式。",
    step1Title: "在gcoordinator中准备G-code",
    step1Desc: "在gcoordinator中设计模型并导出G-code文件（.gcode）。gcoordinator输出的标准G-code可以直接使用。",
    step2Title: "上传G-code文件",
    step2Desc: "将.gcode文件拖放到首页的上传区域，或点击选择文件。支持最大50MB的文件。文件仅在浏览器中处理，不会上传到服务器。",
    step3Title: "调整打印设置",
    step3Desc: "在「耗材」选项卡中设置耗材类型和温度，在「打印」选项卡中调整速度和层高。「高级」选项卡可以进行风扇和回抽等详细设置。",
    step4Title: "查看预览和警告",
    step4Desc: "在右侧的3D预览中查看工具路径。使用层滑块逐层查看，如果出现安全警告，请在转换前确认其内容。",
    step5Title: "转换并下载",
    step5Desc: "点击「转换为 Bambu A1 格式」按钮，将G-code转换为Bambu Lab A1兼容格式。转换完成后，点击下载按钮保存文件。",
    step6Title: "传输到SD卡并打印",
    step6Desc: "将下载的文件复制到microSD卡，插入Bambu Lab A1开始打印。详情请参阅下方的SD卡注意事项。",
    sdCardTitle: "SD卡注意事项",
    sdTip1: "microSD卡请使用<b>FAT32</b>格式化。exFAT和NTFS格式可能无法被Bambu Lab A1识别。",
    sdTip2: "请将G-code文件放在SD卡的<b>根目录</b>下。放在子文件夹中可能无法被识别。",
    sdTip3: "文件名请仅使用<b>半角英文字母、数字和下划线</b>。请避免使用中文或特殊字符。",
    sdTip4: "建议使用<b>32GB及以下</b>容量的SD卡。大容量SD卡的FAT32格式化存在限制。",
    safetyTitle: "安全注意事项",
    safety1: "使用转换后的G-code<b>首次打印时，请务必在打印机旁监控</b>。如发现异常动作或声音，请立即停止。",
    safety2: "本工具并非Bambu Lab官方软件。对转换结果<b>不提供任何保证</b>。使用风险自负。",
    safety3: "温度设置过高可能导致喷嘴堵塞或耗材劣化。请确认所用耗材的<b>推荐温度范围</b>。",
    safety4: "在打印大型模型之前，强烈建议先用小型测试件<b>验证转换结果</b>。",
    startConverting: "开始转换",
  },

  // -- About Page --
  about: {
    title: "About",
    subtitle: "关于 G-code Converter",
    projectOverview: "项目概述",
    projectDesc: "连接gcoordinator与Bambu Lab A1的转换工具",
    projectP1: "<b>gcoordinator</b>是一款基于坐标变换的独特方法生成3D打印G-code的工具。与传统切片软件不同，它利用数学坐标变换来实现复杂的造型模式。",
    projectP2: "然而，gcoordinator输出的G-code无法直接在<b>Bambu Lab A1</b>上正常运行。因为Bambu Lab A1需要特定的G-code格式和初始化序列。",
    projectP3: "本工具解析gcoordinator的G-code，并将其转换为Bambu Lab A1所需的格式。自动完成头部和尾部的添加、温度控制命令的转换、风扇控制和回抽设置的优化等操作。",
    techStack: "技术栈",
    frontend: "前端",
    libraries: "库",
    libThreejs: "Three.js / React Three Fiber（3D预览）",
    libZustand: "Zustand（状态管理）",
    libShadcn: "shadcn/ui（UI组件）",
    libSonner: "Sonner（通知）",
    browserNote: "所有G-code处理均在浏览器中执行。文件不会被发送到服务器。",
    relatedLinks: "相关链接",
    gcoordinatorDesc: "基于坐标变换的G-code生成工具",
    bambuWikiDesc: "Bambu Lab A1的规格与文档",
    disclaimer: "免责声明",
    disclaimerP1: "本工具<b>并非Bambu Lab公司的官方产品</b>。与Bambu Lab公司没有任何合作或关联关系。",
    disclaimerP2: "使用转换后的G-code需<b>自行承担风险</b>。对于因使用本工具而造成的任何损失，开发者不承担任何责任。",
    disclaimerP3: "使用转换后的G-code打印时，请务必监控打印机运行状态，如发现异常请立即停止打印。",
    credits: "致谢",
    creditsIntro: "本项目得益于开源社区众多工具和库的支持。",
    creditGcoordinator: "基于坐标变换的G-code生成工具",
    creditNextjs: "Vercel开发的React框架",
    creditShadcn: "精美的UI组件库",
    creditThreejs: "WebGL 3D渲染库",
    backToConverter: "返回转换页面",
  },
} as const;

export default zhCN;
