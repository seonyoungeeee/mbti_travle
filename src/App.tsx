import React, { useMemo, useState } from "react";

type Answers = {
  q1: number | null;
  q2: number | null;
  q3: number | null;
  q4: number | null;
};

type DataItem = {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  mbti: string;
  place: string;
  desc: string;
};

export default function App() {
  const questions = [
    {
      id: "q1",
      title: "여행지에서 낯선 사람과 대화하는 게 재미있어??",
      left: "YES",
      right: "NO",
    },
    {
      id: "q2",
      title: "여행 정보는 구체적 리뷰가 좋아, 전체 분위기가 좋아?",
      left: "구체적 리뷰",
      right: "전체 분위기",
    },
    {
      id: "q3",
      title: "관광지 선택 기준은 시간 효율이야, 마음 끌림이야?",
      left: "시간 효율",
      right: "마음 끌림",
    },
    {
      id: "q4",
      title: "여행 일정은 확정하는 편이야, 유연한 편이야?",
      left: "일정 확정",
      right: "유연하게",
    },
  ] as const;

  const dataset: DataItem[] = [
    { q1: 1, q2: 1, q3: 1, q4: 1, mbti: "ESTJ", place: "오죽헌", desc: "역사와 학습을 좋아하는 계획형 여행자" },
    { q1: 1, q2: 1, q3: 1, q4: 0, mbti: "ESTP", place: "정동진 레일바이크", desc: "활동적이고 바로 체험하는 걸 좋아하는 타입" },
    { q1: 1, q2: 1, q3: 0, q4: 1, mbti: "ESFJ", place: "강릉 중앙시장", desc: "사람들과 함께 즐기는 따뜻한 여행 타입" },
    { q1: 1, q2: 1, q3: 0, q4: 0, mbti: "ESFP", place: "경포해변", desc: "신나고 눈앞의 즐거움을 좋아하는 타입" },
    { q1: 1, q2: 0, q3: 1, q4: 1, mbti: "ENTJ", place: "시간박물관", desc: "새롭고 의미 있는 장소를 찾는 리더형" },
    { q1: 1, q2: 0, q3: 1, q4: 0, mbti: "ENTP", place: "아르떼뮤지엄", desc: "아이디어와 새로운 자극을 좋아하는 타입" },
    { q1: 1, q2: 0, q3: 0, q4: 1, mbti: "ENFJ", place: "허균허난설헌 기념공원", desc: "감성도 챙기고 의미도 찾는 타입" },
    { q1: 1, q2: 0, q3: 0, q4: 0, mbti: "ENFP", place: "안반데기", desc: "자유롭고 분위기 있는 여행을 좋아하는 타입" },
    { q1: 0, q2: 1, q3: 1, q4: 1, mbti: "ISTJ", place: "통일공원", desc: "차분하고 정돈된 장소를 좋아하는 타입" },
    { q1: 0, q2: 1, q3: 1, q4: 0, mbti: "ISTP", place: "주문진 방파제", desc: "조용하지만 직접 보고 느끼는 걸 좋아하는 타입" },
    { q1: 0, q2: 1, q3: 0, q4: 1, mbti: "ISFJ", place: "강릉시립미술관", desc: "편안하고 안정적인 여행을 좋아하는 타입" },
    { q1: 0, q2: 1, q3: 0, q4: 0, mbti: "ISFP", place: "솔향수목원", desc: "자연 속에서 쉬는 감성형 여행자" },
    { q1: 0, q2: 0, q3: 1, q4: 1, mbti: "INTJ", place: "과학관", desc: "생각할 거리와 배움을 좋아하는 타입" },
    { q1: 0, q2: 0, q3: 1, q4: 0, mbti: "INTP", place: "녹색도시체험센터", desc: "호기심 많고 탐구를 좋아하는 타입" },
    { q1: 0, q2: 0, q3: 0, q4: 1, mbti: "INFJ", place: "한옥스테이", desc: "조용하고 깊이 있는 시간을 좋아하는 타입" },
    { q1: 0, q2: 0, q3: 0, q4: 0, mbti: "INFP", place: "경포호수 산책길", desc: "몽글몽글한 분위기의 힐링 여행자" },
  ];

  const [answers, setAnswers] = useState<Answers>({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const allAnswered = Object.values(answers).every((v) => v !== null);

  const result = useMemo(() => {
    if (!allAnswered) return null;

    return (
      dataset.find(
        (d) =>
          d.q1 === answers.q1 &&
          d.q2 === answers.q2 &&
          d.q3 === answers.q3 &&
          d.q4 === answers.q4
      ) || null
    );
  }, [answers, allAnswered]);

  const handleSelect = (id: keyof Answers, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setSubmitted(false);
  };

  const reset = () => {
    setAnswers({ q1: null, q2: null, q3: null, q4: null });
    setSubmitted(false);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="hero">
          <div className="badge">데이터 어드벤처! 여행을 부탁해</div>
          <h1>강릉 여행 MBTI 추천</h1>
          <p>
            질문 4개에 답하면 나와 어울리는 강릉 관광지를 추천해줘요.
          </p>
        </div>

        <div className="grid">
          <div className="left">
            {questions.map((q, index) => (
              <div className="card" key={q.id}>
                <div className="questionHeader">
                  <div className="number">{index + 1}</div>
                  <h2>{q.title}</h2>
                </div>

                <div className="buttonRow">
                  <button
                    className={`choice ${answers[q.id] === 1 ? "selected" : ""}`}
                    onClick={() => handleSelect(q.id, 1)}
                  >
                    {q.left}
                  </button>
                  <button
                    className={`choice ${answers[q.id] === 0 ? "selected" : ""}`}
                    onClick={() => handleSelect(q.id, 0)}
                  >
                    {q.right}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="right">
            <div className="card sticky">
              <h3>나의 선택 상태</h3>
              <div className="statusList">
                {questions.map((q) => (
                  <div className="statusItem" key={q.id}>
                    <div className="statusTitle">{q.title}</div>
                    <div className="statusValue">
                      {answers[q.id] === null
                        ? "아직 선택 안 함"
                        : answers[q.id] === 1
                        ? q.left
                        : q.right}
                    </div>
                  </div>
                ))}
              </div>

              <div className="actionRow">
                <button
                  className="mainButton"
                  disabled={!allAnswered}
                  onClick={() => setSubmitted(true)}
                >
                  결과 보기
                </button>
                <button className="subButton" onClick={reset}>
                  초기화
                </button>
              </div>

              {submitted && result && (
                <div className="resultCard">
                  <div className="resultLabel">추천 결과</div>
                  <div className="resultMbti">{result.mbti}</div>
                  <div className="resultPlace">{result.place}</div>
                  <p className="resultDesc">{result.desc}</p>
                </div>
              )}

              {submitted && !result && (
                <div className="emptyResult">
                  결과를 찾지 못했어요. 다시 선택해보세요.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
