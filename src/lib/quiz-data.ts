import q1a from "@/assets/q1a.jpg";
import q1b from "@/assets/q1b.jpg";
import q2a from "@/assets/q2a.jpg";
import q2b from "@/assets/q2b.jpg";
import q3a from "@/assets/q3a.jpg";
import q3b from "@/assets/q3b.jpg";
import q4a from "@/assets/q4a.jpg";
import q4b from "@/assets/q4b.jpg";
import q5a from "@/assets/q5a.jpg";
import q5b from "@/assets/q5b.jpg";
import q6a from "@/assets/q6a.jpg";
import q6b from "@/assets/q6b.jpg";
import q7a from "@/assets/q7a.jpg";
import q7b from "@/assets/q7b.jpg";
import q8a from "@/assets/q8a.jpg";
import q8b from "@/assets/q8b.jpg";
import q9a from "@/assets/q9a.jpg";
import q9b from "@/assets/q9b.jpg";
import q10a from "@/assets/q10a.jpg";
import q10b from "@/assets/q10b.jpg";
import applePouch from "@/assets/capri-apple.png";
import orangePouch from "@/assets/capri-orange.png";
import multiPouch from "@/assets/capri-multivitamin.png";
import zeroOrangePouch from "@/assets/capri-zero-orange.png";

export type Choice = "A" | "B";
export type ResultType = "window" | "chatty" | "curious" | "keeper";

export interface Option {
  emoji: string;
  label: string;
  image: string;
  type: ResultType;
}

export interface Question {
  id: number;
  title: string;
  optionA: Option;
  optionB: Option;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "소풍 버스에서 나는?",
    optionA: { emoji: "\n", label: "창가 자리\n*사수*하다", image: q1a, type: "window" },
    optionB: { emoji: "\n", label: "친구들이랑 떠들다가\n선생님한테\n*조용히* 하라는 말 듣는다", image: q1b, type: "chatty" },
  },
  {
    id: 2,
    title: "쉬는 시간마다 나는?",
    optionA: { emoji: "\n", label: "자리에서 친구랑 이야기하거나\n낙서한다.", image: q2a, type: "window" },
    optionB: { emoji: "\n", label: "운동장으로 뛰어나가 논다.", image: q2b, type: "curious" },
  },
  {
    id: 3,
    title: "급식 시간엔?",
    optionA: { emoji: "\n", label: "좋아하는 반찬부터 먹는다.", image: q3a, type: "keeper" },
    optionB: { emoji: "\n", label: "우유나 디저트부터 챙긴다.", image: q3b, type: "curious" },
  },
  {
    id: 4,
    title: "반에서 나는?",
    optionA: { emoji: "\n", label: "조용히 관찰하는 편이다.", image: q4a, type: "keeper" },
    optionB: { emoji: "\n", label: "분위기를 이끄는 편이다.", image: q4b, type: "chatty" },
  },
  {
    id: 5,
    title: "수학여행 숙소에서는?",
    optionA: { emoji: "\n", label: "늦게까지 수다 떨다가 안 잔다.", image: q5a, type: "chatty" },
    optionB: { emoji: "\n", label: "피곤해서 제일 먼저 잔다.", image: q5b, type: "keeper" },
  },
  {
    id: 6,
    title: "체육시간에는?",
    optionA: { emoji: "\n", label: "적극적으로 참여한다.", image: q6a, type: "curious" },
    optionB: { emoji: "\n", label: "응원하거나 쉬는 게 좋다.", image: q6b, type: "keeper" },
  },
  {
    id: 7,
    title: "매점에 가면?",
    optionA: { emoji: "\n", label: "항상 먹던 최애를 산다.", image: q7a, type: "keeper" },
    optionB: { emoji: "\n", label: "신상 간식부터 도전한다.", image: q7b, type: "curious" },
  },
  {
    id: 8,
    title: "사진 찍을 때 나는?",
    optionA: { emoji: "\n", label: "브이하고 활짝 웃는다.", image: q8a, type: "window" },
    optionB: { emoji: "\n", label: "장난스러운 포즈를 한다.", image: q8b, type: "chatty" },
  },
  {
    id: 9,
    title: "친구들과 놀 때 나는?",
    optionA: { emoji: "\n", label: "같이 게임하거나\n액티비티를 한다.", image: q9a, type: "curious" },
    optionB: { emoji: "\n", label: "앉아서 수다 떠는 게 더 좋다.", image: q9b, type: "chatty" },
  },
  {
    id: 10,
    title: "그 시절의 나를 한마디로?",
    optionA: { emoji: "\n", label: "잔잔하지만 행복했던 하루들", image: q10a, type: "window" },
    optionB: { emoji: "\n", label: "정신없이 웃고 떠들던 매일", image: q10b, type: "chatty" },
  },
];

export interface ResultProfile {
  type: ResultType;
  number: string;
  emoji: string;
  heartEmoji: string;
  title: string;
  subtitle: string;
  description: string;
  flavor: string;
  english: string;
  fruitEmoji: string;
  flavorImage: string;
  flavorDescription: string;
  quote: string;
  color: string;
  bgFrom: string;
  bgTo: string;
}

export const RESULTS: Record<ResultType, ResultProfile> = {
  window: {
    type: "window",
    emoji: "🌤️",
    heartEmoji: "💛",
    title: "창가 감성러",
    subtitle: "작은 순간도 오래 기억하는 추억 수집가",
    description: "그때도 지금도 사소한 순간에서\n행복을 찾는 당신.\n버스 창밖 풍경을 바라보거나\n하늘 사진을 찍는 걸 좋아했던 감성파였어요.",
    flavor: "사과",
    english: "Apple",
    fruitEmoji: "🍏",
    flavorImage: applePouch,
    flavorDescription: "은은하고 편안한 달콤함처럼,\n잔잔한 추억을 오래 간직하는 당신과\n가장 잘 어울리는 맛.",
    quote: "오늘도 여유롭게, 추억 한 팩.",
    color: "#8fbf5a",
    bgFrom: "#f0f8e8",
    bgTo: "#c8e2a0",
  },
  chatty: {
    type: "chatty",
    emoji: "🍃",
    heartEmoji: "🩷",
    title: "수다 에너지 100%",
    subtitle: "웃음이 끊이지 않는 분위기 메이커",
    description: "친구들과 함께라면 어디든\n즐거웠던 당신.\n언제나 웃음소리의 중심에는\n당신이 있었어요.",
    flavor: "오렌지",
    english: "Orange",
    fruitEmoji: "🍊",
    flavorImage: orangePouch,
    flavorDescription: "상큼하고 활기찬 오렌지처럼\n주변까지 기분 좋게 만드는\n에너지를 가진 타입!",
    quote: "톡톡 터지는 웃음처럼, 상큼한 한 모금!",
    color: "#ff8c1a",
    bgFrom: "#fff1de",
    bgTo: "#ffd9a8",
  },
  curious: {
    type: "curious",
    emoji: "🍀",
    heartEmoji: "💚",
    title: "호기심 탐험대",
    subtitle: "새로운 것을 보면 그냥 지나치지 못하는 타입",
    description: "새로운 간식도, 새로운 놀이도,\n\"이거 한번 해볼까?\"를 가장 먼저\n말했던 당신.",
    flavor: "멀티비타민",
    english: "Multivitamin",
    fruitEmoji: "🍍🥭🍊",
    flavorImage: multiPouch,
    flavorDescription: "여러 과일이 하나로 어우러진 것처럼\n호기심 많고 다채로운 매력을 가진\n사람에게 딱!",
    quote: "매일 새로운 재미를 찾는 당신에게!",
    color: "#3ab569",
    bgFrom: "#e8f8ec",
    bgTo: "#b0e0be",
  },
  keeper: {
    type: "keeper",
    emoji: "✉",
    heartEmoji: "🧡",
    title: "추억 지킴이",
    subtitle: "조용하지만 가장 따뜻한 기억을 남기는 사람",
    description: "말은 많지 않았지만,\n친구들과 함께한 평범한 하루를\n가장 오래 기억하는 당신.",
    flavor: "제로 오렌지",
    english: "Orange Zero",
    fruitEmoji: "🍊",
    flavorImage: zeroOrangePouch,
    flavorDescription: "부담 없이 오래 즐길 수 있는 맛처럼,\n편안하고 따뜻한 매력을 가진\n당신에게 추천!",
    quote: "가볍지만 오래 남는 행복.",
    color: "#e07a3a",
    bgFrom: "#fdece0",
    bgTo: "#f5c69a",
  },
};

export function calculateResult(answers: Choice[]): ResultType {
  const scores: Record<ResultType, number> = { window: 0, chatty: 0, curious: 0, keeper: 0 };
  answers.forEach((choice, i) => {
    const q = QUESTIONS[i];
    if (!q) return;
    const opt = choice === "A" ? q.optionA : q.optionB;
    scores[opt.type] += 1;
  });
  // pick highest, tiebreak order: chatty > curious > window > keeper (matches example)
  const priority: ResultType[] = ["chatty", "curious", "window", "keeper"];
  let best: ResultType = "window";
  let bestScore = -1;
  for (const t of priority) {
    if (scores[t] > bestScore) {
      best = t;
      bestScore = scores[t];
    }
  }
  return best;
}
