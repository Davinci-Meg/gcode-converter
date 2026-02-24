/** Korean translations (한국어) */
import type { Translations } from "./ja";

const ko: Translations = {
  // -- Language metadata --
  _meta: {
    name: "한국어",
    flag: "🇰🇷",
    aiTranslated: true,
  },

  // -- Header --
  header: {
    guide: "가이드",
    about: "소개",
    switchToLight: "라이트 모드로 전환",
    switchToDark: "다크 모드로 전환",
  },

  // -- Footer --
  footer: {
    copyright: "gcode2bambu. Bambu Lab과는 무관합니다.",
    disclaimer: "변환된 G-code의 사용은 본인 책임입니다. 인쇄 전에 반드시 출력을 확인하세요.",
    aiTranslationNote: "일본어 이외의 번역은 AI에 의해 생성되었습니다.",
  },

  // -- File Upload --
  upload: {
    dropHere: "G-code 파일을 여기에 놓으세요",
    dropOrBrowse: "G-code 파일을 여기에 놓거나",
    browse: "파일 선택",
    supportedFormats: ".gcode, .gc, .g 파일 지원 (최대 50MB)",
    unsupportedExtension: "지원하지 않는 파일 확장자 \"{ext}\"입니다. .gcode, .gc, .g 파일을 업로드해 주세요.",
    fileTooLarge: "파일이 너무 큽니다 ({size}). 최대 50MB입니다.",
    readError: "파일을 읽지 못했습니다. 다시 시도해 주세요.",
    invalidType: "잘못된 파일 형식입니다. .gcode, .gc, .g 파일을 업로드해 주세요.",
    unsupportedType: "지원하지 않는 파일 형식",
    parsing: "분석 중...",
    ready: "준비 완료",
    parseFailed: "분석 실패",
    removeFile: "파일 삭제",
  },

  // -- Settings Tabs --
  settings: {
    filamentTab: "소재",
    printTab: "인쇄",
    advancedTab: "고급",
  },

  // -- Filament Settings --
  filament: {
    type: "필라멘트 종류",
    selectPlaceholder: "필라멘트 선택",
    presetHint: "프리셋을 선택하면 온도와 속도가 자동으로 설정됩니다",
    nozzleTemp: "노즐 온도",
    bedTemp: "베드 온도",
    recommended: "권장: {min}-{max}°C ({type})",
  },

  // -- Print Settings --
  print: {
    maxSpeed: "최대 인쇄 속도",
    speedUnit: "mm/s",
    speedHint: "필라멘트 종류에 따른 속도 제한을 적용합니다",
    nozzleDiameter: "노즐 직경",
    selectNozzle: "노즐 직경 선택",
    bedOffset: "베드 오프셋",
    autoCenter: "자동 센터링",
    previewTitle: "오프셋 적용 후 좌표 범위",
    width: "너비",
    fitsInVolume: "빌드 볼륨 내에 있습니다",
    exceedsVolume: "빌드 볼륨을 초과합니다",
    buildVolume: "빌드 볼륨",
    buildVolumeSpec: "Bambu Lab A1: 256 x 256 x 256 mm",
  },

  // -- Advanced Settings --
  advanced: {
    customStartGCode: "사용자 정의 시작 G-code",
    customEndGCode: "사용자 정의 종료 G-code",
    reset: "초기화",
    startPlaceholder: "기본 시작 G-code를 사용합니다...",
    endPlaceholder: "기본 종료 G-code를 사용합니다...",
    hint: "비워 두면 기본 Bambu Lab A1 G-code가 사용됩니다. 사용자 정의 G-code를 입력하면 기본 템플릿이 덮어씌워집니다.",
  },

  // -- Convert / Download --
  convert: {
    converting: "변환 중...",
    reconvert: "재변환",
    convertForBambu: "Bambu A1용으로 변환",
    download: "다운로드",
  },

  // -- Safety Warnings --
  warnings: {
    title: "안전 경고",
    error: "오류",
    warning: "경고",
    info: "정보",
    nErrors: "{n}건의 오류",
    nWarnings: "{n}건의 경고",
    nInfo: "{n}건의 정보",
    showAll: "모든 {n}건의 경고 표시",
    showFewer: "경고 접기",
    line: "줄 {n}",
  },

  // -- 3D Preview --
  preview: {
    parsingGCode: "G-code 분석 중...",
    failedToParse: "G-code 분석에 실패했습니다",
    noGCodeLoaded: "G-code가 로드되지 않았습니다",
    uploadToPreview: "파일을 업로드하여 3D 미리보기를 표시하세요",
    layer: "레이어",
    layers: "{n} 레이어",
    previewError: "3D 미리보기 오류",
    previewErrorMessage: "3D 미리보기 렌더링에 실패했습니다.",
    retry: "재시도",
  },

  // -- Status Bar --
  status: {
    parsing: "분석 중...",
    converted: "변환 완료",
    parsed: "분석 완료 ({n} 레이어)",
    ready: "준비 완료",
    nErrors: "{n}건의 오류",
    nWarnings: "{n}건의 경고",
    noWarnings: "경고 없음",
  },

  // -- Error Page --
  errorPage: {
    title: "오류가 발생했습니다",
    tryAgain: "다시 시도",
  },

  // -- Guide Page --
  guide: {
    title: "사용 가이드",
    subtitle: "gcoordinator의 G-code를 Bambu Lab A1용으로 변환하는 절차를 안내합니다.",
    step1Title: "gcoordinator에서 G-code 준비하기",
    step1Desc: "gcoordinator에서 모델을 설계하고 G-code 파일(.gcode)을 내보내세요. gcoordinator가 출력하는 표준 G-code를 그대로 사용할 수 있습니다.",
    step2Title: "G-code 파일 업로드하기",
    step2Desc: "메인 페이지의 업로드 영역에 .gcode 파일을 드래그 앤 드롭하거나 클릭하여 파일을 선택하세요. 최대 50MB까지 지원됩니다. 파일은 브라우저에서만 처리되며 서버로 전송되지 않습니다.",
    step3Title: "인쇄 설정 조정하기",
    step3Desc: "\"소재\" 탭에서 필라멘트 종류와 온도를 설정하고, \"인쇄\" 탭에서 속도와 레이어 높이를 조정하세요. \"고급\" 탭에서는 팬 및 리트랙션 등 세부 설정이 가능합니다.",
    step4Title: "미리보기 및 경고 확인하기",
    step4Desc: "오른쪽의 3D 미리보기에서 툴패스를 확인할 수 있습니다. 레이어 슬라이더로 각 층을 개별적으로 확인하고, 안전 경고가 표시되면 내용을 확인한 후 변환하세요.",
    step5Title: "변환 후 다운로드하기",
    step5Desc: "\"Bambu A1용으로 변환\" 버튼을 누르면 Bambu Lab A1 호환 G-code로 변환됩니다. 변환이 완료되면 다운로드 버튼으로 파일을 저장하세요.",
    step6Title: "SD 카드로 전송하여 인쇄하기",
    step6Desc: "다운로드한 파일을 microSD 카드에 복사하고 Bambu Lab A1에 삽입하여 인쇄를 시작하세요. 자세한 내용은 아래 SD 카드 주의사항을 확인하세요.",
    sdCardTitle: "SD 카드 관련 주의사항",
    sdTip1: "microSD 카드는 <b>FAT32</b>로 포맷하세요. exFAT이나 NTFS는 Bambu Lab A1에서 인식되지 않을 수 있습니다.",
    sdTip2: "G-code 파일은 SD 카드의 <b>루트 디렉토리</b>에 배치하세요. 하위 폴더에 넣으면 인식되지 않을 수 있습니다.",
    sdTip3: "파일 이름은 <b>영문, 숫자, 밑줄</b>만 사용하세요. 한국어나 특수 문자가 포함된 파일 이름은 피해 주세요.",
    sdTip4: "SD 카드 용량은 <b>32GB 이하</b>를 권장합니다. 대용량 카드에서는 FAT32 포맷에 제한이 있습니다.",
    safetyTitle: "안전 관련 주의사항",
    safety1: "변환된 G-code로 <b>처음 인쇄할 때는 반드시 프린터 옆에서 지켜보세요</b>. 비정상적인 움직임이나 소리가 나면 즉시 중지하세요.",
    safety2: "본 도구는 Bambu Lab 공식 소프트웨어가 아닙니다. 변환 결과에 대해 <b>동작을 보증하지 않습니다</b>. 본인 책임하에 사용하세요.",
    safety3: "온도 설정이 너무 높으면 노즐 막힘이나 필라멘트 열화의 원인이 됩니다. 사용하는 필라멘트의 <b>권장 온도 범위</b>를 확인하세요.",
    safety4: "큰 모델을 인쇄하기 전에 작은 테스트 조각으로 <b>변환 결과를 검증</b>하는 것을 강력히 권장합니다.",
    startConverting: "변환 시작하기",
  },

  // -- About Page --
  about: {
    title: "About",
    subtitle: "gcoordinator → Bambu Lab A1 Converter에 대하여",
    projectOverview: "프로젝트 개요",
    projectDesc: "gcoordinator와 Bambu Lab A1을 연결하는 변환 도구",
    projectP1: "<b>gcoordinator</b>는 좌표 변환 기반의 독자적인 접근 방식으로 3D 프린트용 G-code를 생성하는 도구입니다. 기존 슬라이서와 달리 수학적 좌표 변환을 활용하여 복잡한 조형 패턴을 구현합니다.",
    projectP2: "그러나 gcoordinator가 출력하는 G-code는 그대로는 <b>Bambu Lab A1</b>에서 정상적으로 작동하지 않습니다. Bambu Lab A1은 고유한 G-code 플레이버와 초기화 시퀀스를 필요로 하기 때문입니다.",
    projectP3: "본 도구는 gcoordinator의 G-code를 분석하여 Bambu Lab A1이 요구하는 형식으로 변환합니다. 헤더 및 푸터 추가, 온도 제어 명령 변환, 팬 제어, 리트랙션 설정 최적화 등을 자동으로 수행합니다.",
    techStack: "기술 스택",
    frontend: "프론트엔드",
    libraries: "라이브러리",
    libThreejs: "Three.js / React Three Fiber (3D 미리보기)",
    libZustand: "Zustand (상태 관리)",
    libShadcn: "shadcn/ui (UI 컴포넌트)",
    libSonner: "Sonner (알림)",
    browserNote: "모든 G-code 처리는 브라우저에서 실행됩니다. 파일이 서버로 전송되는 일은 없습니다.",
    relatedLinks: "관련 링크",
    gcoordinatorDesc: "좌표 변환 기반 G-code 생성 도구",
    bambuWikiDesc: "Bambu Lab A1 사양 및 문서",
    disclaimer: "면책 조항",
    disclaimerP1: "본 도구는 <b>Bambu Lab사의 공식 제품이 아닙니다</b>. Bambu Lab사와는 어떠한 제휴 및 관계도 없습니다.",
    disclaimerP2: "변환된 G-code의 사용은 <b>본인 책임</b>으로 이루어져야 합니다. 본 도구의 사용으로 인해 발생한 어떠한 손해에 대해서도 개발자는 책임을 지지 않습니다.",
    disclaimerP3: "변환된 G-code로 인쇄할 때는 반드시 프린터의 작동을 감시하고, 이상이 발견되면 즉시 인쇄를 중지하세요.",
    credits: "크레딧",
    creditsIntro: "본 프로젝트는 오픈소스 커뮤니티의 다양한 도구와 라이브러리의 지원을 받고 있습니다.",
    creditGcoordinator: "좌표 변환 기반 G-code 생성 도구",
    creditNextjs: "Vercel의 React 프레임워크",
    creditShadcn: "아름다운 UI 컴포넌트 라이브러리",
    creditThreejs: "WebGL 3D 렌더링 라이브러리",
    backToConverter: "변환 페이지로 돌아가기",
  },
} as const;

export default ko;
