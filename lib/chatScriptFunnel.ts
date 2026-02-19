// 병원장 x 마케팅전문가 대화 스크립트
// 2중 퍼널 마케팅 (70%) + RAG 챗봇 (30%) 통합 소개

export type Speaker = 'hospital' | 'expert'

export interface ChatChoice {
    label: string
    nextMessageId: number
}

export interface ScriptMessage {
    id: number
    speaker: Speaker
    text: string
    choices?: ChatChoice[]  // 선택지가 있으면 자동 진행 중단, 사용자 선택 대기
}

// =============================================
// Part 1: 문제 제기 + 2중 퍼널 소개 (70%)
// =============================================
export const chatScript: ScriptMessage[] = [
    // --- 도입: 병원장의 고민 ---
    {
        id: 1,
        speaker: 'hospital',
        text: '병원을 운영하면서 상담 문의량이 더 늘어나질 않아. 왜 그런거야?',
    },
    {
        id: 2,
        speaker: 'expert',
        text: '안녕하세요, 병원 상담 문의량은 콘텐츠 방향, 상담 관리 시스템, 콘텐츠 차별화 등 다양한 문제로부터 시작될 수 있습니다.\n\n괜찮으시다면 제가 솔루션을 하나 제안 해드려도 될까요?',
    },

    // --- 2중 퍼널 솔루션 설명 ---
    {
        id: 3,
        speaker: 'hospital',
        text: '어떤 내용이야?',
    },
    {
        id: 4,
        speaker: 'expert',
        text: '새로운 상담 방식인 AI 2중 퍼널 솔루션입니다.\n\n24/365 동안 상담에 대해 즉각적인 응답을 제공하고, 반복적인 단순 질문은 챗봇이 처리, 전문 상담 인력은 고도화 된 문의만 처리하니 당연히 업무 효율이 상승하겠죠?',
    },
    {
        id: 5,
        speaker: 'expert',
        text: '챗봇이 수집하는 데이터를 분석해서 주요 관심 분야/FAQ/전환율 등을 보다 정확하게 파악 가능하니 문제 해결도 손쉬워집니다.',
    },
    {
        id: 6,
        speaker: 'expert',
        text: '[상담 → 예약 → 방문] 혹은 [상담 → 전문 인력 상담 → 예약 → 방문]\n\n어떤 형태로든 기존보다 더 높은 예약 전환율을 보이고 있는 솔루션입니다!',
    },
    {
        id: 7,
        speaker: 'expert',
        text: '문의량 증가 + 예약 전환율 상승 + 운영 효율성 강화가 핵심 효과인 AI 2중 퍼널 솔루션은 어떠실까요?',
        choices: [
            { label: '환자들이 믿고 예약할 수 있을까?', nextMessageId: 8 },
            { label: '비용은 얼마 정도야?', nextMessageId: 12 },
        ],
    },

    // --- 신뢰성 설명 ---
    {
        id: 8,
        speaker: 'hospital',
        text: '처음 들어보는데 환자들이 그 솔루션을 믿고 예약할 수 있을까?',
    },
    {
        id: 9,
        speaker: 'expert',
        text: '환자들의 행동이 바뀌는 만큼 콘텐츠도 앞서나가야 합니다!\n\n단순한 병원 소개/시술 설명보다 \'궁금증을 풀어주는 콘텐츠/빠르고 정확하게 응답하는 콘텐츠/필요한 답변을 대기 없이 즉시 수령\' 다양한 이점이 있는 솔루션입니다.',
    },
    {
        id: 10,
        speaker: 'expert',
        text: '전문 상담 인력이 모든 문의를 직접 처리하던 시대는 지났습니다. 단순 반복 문의는 챗봇이, 고부가가치 상담은 전문 인력이 — 이 구조가 환자 만족도와 예약률을 동시에 올립니다.',
    },

    // =============================================
    // Part 2: RAG 챗봇 소개 (30%)
    // =============================================
    {
        id: 11,
        speaker: 'expert',
        text: '그리고 여기서 한 가지 더 중요한 게 있습니다.\n\n2중 퍼널로 환자를 유입시키더라도, 환자가 궁금한 걸 바로 해결 못하면 이탈합니다. 그래서 저희는 병원 전용 RAG 챗봇도 함께 제공합니다.',
        choices: [
            { label: 'RAG 챗봇이 뭐야?', nextMessageId: 13 },
            { label: '일반 챗봇이랑 뭐가 달라?', nextMessageId: 13 },
        ],
    },

    // --- 비용 문의 분기 (선택지에서 "비용은 얼마야?" 선택 시) ---
    {
        id: 12,
        speaker: 'hospital',
        text: '비용은 얼마 정도야?',
    },
    // 12 → 아래에서 이어짐 (id 12.5 역할)
    // 비용 분기 후 다시 RAG 챗봇 소개로 합류

    // --- RAG 챗봇 설명 ---
    {
        id: 13,
        speaker: 'hospital',
        text: 'RAG 챗봇이 뭐야?',
    },
    {
        id: 14,
        speaker: 'expert',
        text: '쉽게 말하면, 원장님 병원의 진료과목, 의료진, 진료시간, 시술 가격 등을 학습한 전용 챗봇입니다.\n\n일반 ChatGPT와 다르게 우리 병원 정보로만 답변하니까 엉뚱한 답변을 할 위험이 없습니다.',
    },
    {
        id: 15,
        speaker: 'expert',
        text: '24시간 환자 문의에 즉시 응답하고, 의료법에 저촉되는 표현은 자동으로 필터링됩니다.\n\n할루시네이션(거짓 정보 생성) 제로, 의료법 100% 준수가 핵심입니다.',
    },
    {
        id: 16,
        speaker: 'hospital',
        text: '그럼 2중 퍼널이랑 챗봇을 같이 쓰면 어떤 효과가 있어?',
    },
    {
        id: 17,
        speaker: 'expert',
        text: '2중 퍼널이 환자를 끌어오고, RAG 챗봇이 환자를 잡아둡니다.\n\n유입된 환자가 궁금한 점을 즉시 해결하고, 자연스럽게 예약으로 이어지는 구조입니다.',
    },
    {
        id: 18,
        speaker: 'expert',
        text: '실제로 이 두 가지를 함께 도입한 병원은 예약 전환율이 47% 향상되었습니다.\n\n문의 → 상담 → 예약, 이 흐름이 24시간 자동으로 돌아가는 겁니다.',
    },
    {
        id: 19,
        speaker: 'expert',
        text: '데모시연과 상세 상담을 원하시면 아래에서 신청해주세요!\n상담은 무료이며, 24시간 내 담당자가 연락드립니다.',
    },
]

// 비용 문의 분기 스크립트 (id 12 선택 시 삽입되는 추가 대화)
export const costBranchMessages: ScriptMessage[] = [
    {
        id: 120,
        speaker: 'expert',
        text: '병원 규모와 필요한 기능에 따라 맞춤 견적을 제공하고 있습니다.\n\n상담 신청을 해주시면 상세한 단가 안내가 가능합니다. 그 전에 솔루션에 대해 좀 더 설명 드릴게요!',
    },
]

// 타이핑 속도 설정 (ms)
export const TYPING_SPEED = {
    normal: 30,
    fast: 15,
}

// 메시지 간 딜레이 (ms)
export const MESSAGE_DELAY = {
    normal: 900,
    fast: 450,
}

// 타이핑 인디케이터 표시 시간 (ms)
export const TYPING_INDICATOR_DELAY = 500
