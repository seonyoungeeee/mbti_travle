import React, { useMemo, useState } from "react";

export default function App() {
  const questions = [
    { id: "q1", title: "낯선 사람과 대화하는 게 좋아?", left: "YES", right: "NO" },
    { id: "q2", title: "리뷰 vs 분위기?", left: "리뷰", right: "분위기" },
    { id: "q3", title: "효율 vs 감성?", left: "효율", right: "감성" },
    { id: "q4", title: "계획 vs 자유?", left: "계획", right: "자유" },
  ];

  const dataset = [
    { q1: 1, q2: 1, q3: 1, q4: 1, mbti: "ESTJ", place: "오죽헌" },
    { q1: 1, q2: 0, q3: 0, q4: 0, mbti: "ENFP", place: "안반데기" },
    { q1: 0, q2: 1, q3: 0, q4: 0, mbti: "ISFP", place: "수목원" },
    { q1: 0, q2: 0, q3: 0, q4: 0, mbti: "INFP", place: "호수산책" },
  ];

  const [answers, setAnswers] = useState({
    q1: null as number | null,
    q2: null as number | null,
    q3: null as number | null,
    q4: null as number | null,
  });

  const [submitted, setSubmitted] = useState(false);

  const allAnswered = Object.values(answers).every((v) => v !== null);

  const result = useMemo(() => {
    if (!allAnswered) return null;

    const match = dataset.find(
      (d) =>
        d.q1 === answers.q1 &&
        d.q2 === answers.q2 &&
        d.q3 === answers.q3 &&
        d.q4 === answers.q4
    );

    return match || null;
  }, [answers, allAnswered]);

  const select = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setSubmitted(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>여행 MBTI 추천</h1>

      {questions.map((q) => (
        <div key={q.id}>
          <p>{q.title}</p>
          <button onClick={() => select(q.id, 1)}>{q.left}</button>
          <button onClick={() => select(q.id, 0)}>{q.right}</button>
        </div>
      ))}

      <button disabled={!allAnswered} onClick={() => setSubmitted(true)}>
        결과 보기
      </button>

      {submitted && result && (
        <div>
          <h2>{result.mbti}</h2>
          <p>{result.place}</p>
        </div>
      )}
    </div>
  );
}
