// 대화 스크립트 데이터
// 대화 스크립트 MD파일.md 기반

export interface ChatMessage {
    id: number
    speaker: 'hospital' | 'company'
    text: string
}

export const chatMessages: ChatMessage[] = [
    { id: 1, speaker: 'hospital', text: '요즘 마케팅을 뭘 해야 할지 모르겠습니다.' },
    { id: 2, speaker: 'hospital', text: '블로그도 예전처럼 잘 안 뜨고, 플레이스도 유입이 줄었습니다.' },
    { id: 3, speaker: 'hospital', text: '광고비만 계속 나갑니다.' },
    { id: 4, speaker: 'company', text: '네, 지금 원장님만 그런 게 아닙니다.' },
    { id: 5, speaker: 'company', text: '요즘은 예전처럼 "올리면 뜨는" 흐름이 아니라서, 노출만 기다리면 예약이 늘기 어렵습니다.' },
    { id: 6, speaker: 'hospital', text: '그럼 지금은 뭘 해야 하나요?' },
    { id: 7, speaker: 'company', text: '방법은 생각보다 단순합니다.' },
    { id: 8, speaker: 'company', text: '"찾아오길 기다리는" 방식이 아니라, "문의가 남게 만드는" 방식으로 바꾸는 겁니다.' },
    { id: 9, speaker: 'hospital', text: '문의가 남게 만든다는 게 무슨 말이죠?' },
    { id: 10, speaker: 'company', text: '환자가 병원 페이지를 눌러 들어오면, 그냥 나가지 않게 채팅으로 먼저 말을 걸어주는 방식입니다.' },
    { id: 11, speaker: 'company', text: '예를 들면 이렇게요.' },
    { id: 12, speaker: 'company', text: '"어디가 제일 불편하세요?"\n"언제부터 그러셨어요?"\n"지금 가장 걱정되는 건 뭐예요?"' },
    { id: 13, speaker: 'company', text: '이런 대화가 30초만 이어져도, 그 사람은 그냥 \'구경\'이 아니라 \'상담 가능한 사람\'이 됩니다.' },
    { id: 14, speaker: 'hospital', text: '단순히 챗봇 아닌가요?' },
    { id: 15, speaker: 'company', text: '좋은 질문입니다. 겉모습만 보면 챗봇처럼 보일 수 있습니다.' },
    { id: 16, speaker: 'company', text: '그런데 원장님이 지금 힘든 이유는, "답변"이 없어서가 아니라 문의가 안 쌓이고, 예약으로 연결이 안 되기 때문이잖아요.' },
    { id: 17, speaker: 'company', text: '일반 챗봇은 질문에 답하고 끝나는 경우가 많아서, 결국 "좋은 말만 하고" 환자는 나가버립니다.' },
    { id: 18, speaker: 'company', text: '우리는 반대로 이렇게 합니다.' },
    { id: 19, speaker: 'company', text: '환자가 무엇이 걱정인지 짧게 정리해주고, 상담할 사람인지 아닌지 구분하고, 상담이 필요한 분은 연락처가 남게 만들고, 그 다음에 상담/예약으로 이어지게 합니다.' },
    { id: 20, speaker: 'company', text: '그래서 "챗봇"이 아니라, 원장님 입장에서는 상담 접수 직원 한 명을 더 둔 느낌에 가깝습니다.' },
    { id: 21, speaker: 'hospital', text: '그럼 예약이 바로 늘어요?' },
    { id: 22, speaker: 'company', text: '예약이 당장 확 늘진 않을 수 있습니다.' },
    { id: 23, speaker: 'company', text: '하지만 확실히 달라지는 게 있습니다.' },
    { id: 24, speaker: 'company', text: '문의가 쌓이고, 연락처가 남고, 한 번 들어온 분이 다시 찾아오게 됩니다.' },
    { id: 25, speaker: 'company', text: '즉, 광고비가 "사라지는 돈"이 아니라 환자를 다시 오게 만드는 자산이 됩니다.' },
    { id: 26, speaker: 'company', text: '이 구조로만 바꿔도, 원장님이 느끼는 답답함이 현실적으로 풀리기 시작합니다.' },
]

// 타이핑 속도 설정 (ms) - 기본값을 느리게 설정
export const TYPING_SPEED = {
    normal: 50,  // 기본 속도 (느림)
    fast: 25,    // 2배속 보기
}

// 메시지 간 딜레이 (ms)
export const MESSAGE_DELAY = {
    normal: 1500,  // 기본 속도 (느림)
    fast: 750,     // 2배속 보기
}
