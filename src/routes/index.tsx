import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Camera, RotateCcw, Share2, ChevronRight, Sparkles, Upload } from "lucide-react";
import resultHero from "@/assets/result-hero.jpg";
import capriPouch from "@/assets/capri-sun-pouch.png";
import capriLogo from "@/assets/capri-sun-logo.png";
import { QUESTIONS, RESULTS, calculateResult, type Choice } from "@/lib/quiz-data";
import { Bubbles } from "@/components/Bubbles";

export const Route = createFileRoute("/")({
  component: Index,
});

type Stage = "intro" | "quiz" | "upload" | "loading" | "result";

function Index() {
  const [stage, setStage] = useState<Stage>("intro");
  const [photo, setPhoto] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(Choice | null)[]>(Array(QUESTIONS.length).fill(null));
  const [selected, setSelected] = useState<Choice | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stage === "loading") {
      const t = setTimeout(() => setStage("result"), 2600);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPhoto(URL.createObjectURL(f));
  };

  const start = () => {
    setStage("quiz");
    setStep(0);
    setSelected(answers[0]);
  };

  const next = () => {
    if (!selected) return;
    const newAnswers = [...answers];
    newAnswers[step] = selected;
    setAnswers(newAnswers);
    if (step === QUESTIONS.length - 1) {
      setStage("upload");
    } else {
      setStep(step + 1);
      setSelected(newAnswers[step + 1]);
    }
  };

  const back = () => {
    if (step === 0) {
      setStage("intro");
      return;
    }
    setStep(step - 1);
    setSelected(answers[step - 1]);
  };

  const restart = () => {
    setStage("intro");
    setPhoto(null);
    setStep(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSelected(null);
  };

  if (stage === "intro") return <IntroScreen onStart={start} />;
  if (stage === "quiz") return <QuizScreen step={step} selected={selected} onSelect={setSelected} onNext={next} onBack={back} />;
  if (stage === "upload")
    return (
      <UploadScreen
        photo={photo}
        onPick={() => fileRef.current?.click()}
        onFile={handleFile}
        onContinue={() => setStage("loading")}
        onSkip={() => setStage("loading")}
        fileRef={fileRef}
      />
    );
  if (stage === "loading") return <LoadingScreen photo={photo} />;
  return <ResultScreen answers={answers.filter(Boolean) as Choice[]} photo={photo} onRestart={restart} />;
}

/* ─────────── INTRO ─────────── */
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="relative min-h-screen bg-sky-gradient overflow-hidden flex flex-col">
      <div
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 15%, white 0%, transparent 40%), radial-gradient(ellipse at 80% 25%, white 0%, transparent 35%), radial-gradient(ellipse at 60% 70%, white 0%, transparent 30%)",
        }}
      />

      <div className="relative mx-auto max-w-md px-6 pt-16 pb-10 flex flex-col items-center flex-1 justify-between">
        <div className="flex flex-col items-center">
          <p className="text-xs tracking-[0.3em] text-primary/80 font-semibold">CAPRI-SUN</p>
          <p className="text-xs tracking-[0.3em] text-primary/80 font-semibold mt-1">PERSONALITY TEST</p>

          <h2 className="mt-10 text-lg text-foreground/70">AI가 보여주는</h2>
          <h1 className="mt-3 text-4xl text-foreground text-center leading-tight">
            2016년, 여러분의 <span className="underline-scribble text-primary">모습!</span>
            <Sparkles className="inline ml-1 text-yellow-400" size={22} />
          </h1>

          <p className="mt-8 text-sm text-center text-foreground/70 leading-relaxed">
            카프리썬과 함께했던 그때 그 시절,<br />
            AI가 추억 속 여러분의 모습을<br />보여드릴게요!
          </p>

          <div className="mt-10 text-handwritten text-2xl text-primary text-center">
            10개의 질문에 답하고<br />당신의 카프리썬 타입을 찾아보세요
          </div>
        </div>

        <button
          onClick={onStart}
          className="mt-10 w-full rounded-full bg-primary text-primary-foreground py-4 text-base font-semibold shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2"
        >
          테스트 시작하기 <ChevronRight size={18} />
        </button>
      </div>
    </main>
  );
}

/* ─────────── QUIZ ─────────── */
function QuizScreen({
  step, selected, onSelect, onNext, onBack,
}: {
  step: number;
  selected: Choice | null;
  onSelect: (c: Choice) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const q = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <main className="relative min-h-screen bg-ocean-gradient overflow-hidden pb-40">
      <Bubbles />

      <div className="relative px-6 pt-12">
        <div className="flex items-center justify-between gap-4">
          <button onClick={onBack} className="text-2xl font-extrabold text-white tracking-tight">
            <span className="text-white">{String(step + 1).padStart(2, "0")}</span>
            <span className="text-white/60 text-lg font-bold">/{String(QUESTIONS.length).padStart(2, "0")}</span>
          </button>
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h1 className="mt-8 text-3xl font-bold text-white">
          <span className="underline-scribble">{q.title}</span>
        </h1>
      </div>

      <div key={q.id} className="relative mt-6 px-5 grid grid-cols-2 gap-3 animate-pop">
        {(["A", "B"] as const).map((choice) => {
          const opt = choice === "A" ? q.optionA : q.optionB;
          const isSelected = selected === choice;
          return (
            <button
              key={choice}
              onClick={() => onSelect(choice)}
              className={`bg-white rounded-3xl overflow-hidden text-left transition-all duration-300 shadow-lg ${
                isSelected ? "ring-4 ring-white scale-[1.02] shadow-2xl" : "opacity-95 hover:opacity-100"
              }`}
            >
              <div className="p-2">
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <img src={opt.image} alt={opt.label} className="w-full h-full object-cover" loading="lazy" width={640} height={640} />
                </div>
              </div>
              <div className="px-3 pb-4 pt-1 text-center">
                <div className="text-base font-bold text-primary">{choice}</div>
                <p className="text-[13px] mt-1 text-foreground leading-snug min-h-[4.5rem] whitespace-pre-line">
                  {renderHighlighted(opt.label)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="relative mt-6 px-6">
        <button
          onClick={onNext}
          disabled={!selected}
          className="w-full rounded-full bg-white text-foreground py-4 font-bold shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {step === QUESTIONS.length - 1 ? "결과 보기" : "다음"}
          <ChevronRight size={18} />
        </button>
      </div>

      <img
        src={capriPouch}
        alt=""
        aria-hidden
        className="absolute left-4 bottom-10 w-20 h-20 object-contain drop-shadow-lg pointer-events-none select-none"
        width={512}
        height={512}
      />
      <img
        src={capriLogo}
        alt="Capri-Sun"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 h-8 w-auto object-contain pointer-events-none select-none"
      />
    </main>
  );
}

function renderHighlighted(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((p, i) =>
    p.startsWith("*") && p.endsWith("*") ? (
      <span key={i} className="text-primary font-bold">{p.slice(1, -1)}</span>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

/* ─────────── UPLOAD (after quiz) ─────────── */
function UploadScreen({
  photo, onPick, onFile, onContinue, onSkip, fileRef,
}: {
  photo: string | null;
  onPick: () => void;
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
  onSkip: () => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <main className="relative min-h-screen bg-sky-gradient overflow-hidden">
      <div
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 15%, white 0%, transparent 40%), radial-gradient(ellipse at 80% 25%, white 0%, transparent 35%)",
        }}
      />

      <div className="relative mx-auto max-w-md px-6 pt-14 pb-10 flex flex-col items-center">
        <p className="text-xs tracking-[0.3em] text-primary/80 font-semibold">STEP FINAL</p>

        <h1 className="mt-6 text-3xl text-foreground text-center leading-tight">
          내 <span className="underline-scribble text-primary">추억 사진</span>을<br />넣어주세요!
        </h1>

        <p className="mt-4 text-sm text-center text-foreground/70 leading-relaxed">
          결과 화면에 함께 들어갈<br />
          2016년의 나를 담은 사진이에요.
        </p>

        <div className="mt-8 w-full glass-card rounded-3xl p-6 border-2 border-dashed border-primary/40 animate-pop">
          <div className="flex flex-col items-center text-center">
            {photo ? (
              <img src={photo} alt="업로드된 사진" className="w-40 h-40 rounded-2xl object-cover mb-4 ring-4 ring-white shadow-lg" />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
            )}
            <h3 className="text-lg font-semibold">
              {photo ? "잘 나온 사진이에요!" : "얼굴이 잘 보이는 사진"}
            </h3>
            <p className="text-xs text-foreground/60 mt-2">
              {photo ? "다른 사진으로 바꿔도 좋아요" : "카프리썬 마시던 그 시절 사진이면 더 좋아요!"}
            </p>
            <input ref={fileRef} onChange={onFile} type="file" accept="image/*" className="hidden" />
            <button
              onClick={onPick}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium shadow-md hover:shadow-lg transition"
            >
              <Camera size={18} className="text-primary" />
              {photo ? "다른 사진 선택" : "사진 선택하기"}
            </button>
          </div>
        </div>

        <button
          onClick={onContinue}
          disabled={!photo}
          className="mt-8 w-full rounded-full bg-primary text-primary-foreground py-4 text-base font-semibold shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          결과 확인하기 <ChevronRight size={18} />
        </button>

        <button
          onClick={onSkip}
          className="mt-3 text-sm text-foreground/60 underline underline-offset-4 hover:text-foreground/80"
        >
          사진 없이 볼래요
        </button>
      </div>
    </main>
  );
}

/* ─────────── LOADING ─────────── */
function LoadingScreen({ photo }: { photo: string | null }) {
  return (
    <main className="relative min-h-screen bg-sky-gradient flex flex-col items-center justify-center px-6 overflow-hidden">
      <Bubbles />
      <div className="relative flex flex-col items-center gap-6">
        {photo && (
          <img src={photo} alt="" className="w-36 h-36 rounded-full object-cover ring-8 ring-white/70 shadow-2xl animate-pulse" />
        )}
        <h2 className="text-3xl text-primary text-center">AI가 분석 중이에요...</h2>
        <p className="text-handwritten text-xl text-foreground/70">✨ 2016년의 나를 찾는 중 ✨</p>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </main>
  );
}

/* ─────────── RESULT ─────────── */
function ResultScreen({ answers, photo, onRestart }: { answers: Choice[]; photo: string | null; onRestart: () => void }) {
  const type = calculateResult(answers);
  const r = RESULTS[type];

  const share = async () => {
    const shareData = {
      title: "Capri-Sun Personality Test",
      text: `나의 2016년은 "${r.title}" 타입! 추천 카프리썬은 ${r.flavor}(${r.english}) ${r.fruitEmoji}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert("링크가 복사되었어요!");
    }
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden pb-12"
      style={{ background: `linear-gradient(180deg, ${r.bgFrom} 0%, ${r.bgTo} 100%)` }}
    >
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 15% 10%, white 0%, transparent 45%), radial-gradient(ellipse at 85% 20%, white 0%, transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-md px-6 pt-12">
        <p className="text-xs tracking-[0.3em] font-semibold text-center" style={{ color: r.color }}>CAPRI-SUN</p>
        <p className="text-xs tracking-[0.3em] font-semibold text-center mt-1" style={{ color: r.color }}>PERSONALITY TEST</p>

        <p className="mt-6 text-center text-sm text-foreground/70">
          AI가 분석한 당신의 <span className="font-semibold" style={{ color: r.color }}>2016년</span> 모습은...
        </p>

        <h1 className="mt-3 text-3xl text-foreground text-center leading-tight">
          <span className="text-4xl mr-2">{r.number}</span>
          <span className="underline-scribble">{r.title}</span>
          <span className="ml-2">{r.emoji}</span>
        </h1>

        <p className="mt-3 text-center text-sm font-medium" style={{ color: r.color }}>
          {r.subtitle}
        </p>

        <div className="mt-6 relative rounded-3xl overflow-hidden shadow-2xl animate-pop">
          <img src={photo ?? resultHero} alt="추억 사진" className="w-full aspect-[4/5] object-cover" />
          <div
            className="absolute top-4 right-4 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white text-center shadow-xl"
            style={{ background: `radial-gradient(circle, ${r.color} 0%, ${r.color}dd 100%)`, transform: "rotate(8deg)" }}
          >
            <span className="text-[10px] tracking-widest opacity-90">YOUR TYPE</span>
            <span className="text-xs font-bold mt-1 leading-tight px-1">{r.title.split(" ")[0]}</span>
            <span className="text-sm font-bold mt-0.5">100%</span>
          </div>
        </div>

        <p className="mt-6 text-center text-foreground/80 text-sm leading-relaxed whitespace-pre-line">
          {r.description}
        </p>

        <div className="mt-6 glass-card rounded-3xl p-5 animate-pop flex items-center gap-4">
          <img
           src={r.flavorImage}
           alt={`${r.flavor} 카프리썬`}
           className="w-20 h-auto object-contain drop-shadow-lg -rotate-6"
          />


          <div className="flex-1"></div>
          <span
            className="inline-block text-[10px] px-2 py-1 rounded-full text-white font-semibold"
            style={{ backgroundColor: r.color }}
          >
            추천 카프리썬
          </span>
          <h2 className="mt-2 text-xl leading-tight">
            {r.flavor} <span className="text-base" style={{ color: r.color }}>({r.english})</span> {r.fruitEmoji}
          </h2>
          <p className="text-sm text-foreground/70 mt-3 whitespace-pre-line leading-relaxed">
            {r.flavorDescription}
          </p>
        </div>

        <p className="text-handwritten text-center mt-5 text-lg" style={{ color: r.color }}>
          "{r.quote}"
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={onRestart}
            className="rounded-full glass-card py-3.5 text-sm font-semibold flex items-center justify-center gap-2 hover:brightness-105 transition"
          >
            <RotateCcw size={16} /> 다시 테스트하기
          </button>
          <button
            onClick={share}
            className="rounded-full text-white py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition"
            style={{ backgroundColor: r.color }}
          >
            결과 공유하기 <Share2 size={16} />
          </button>
        </div>

        <p className="text-handwritten text-center mt-8 text-lg text-foreground/70">
          카프리썬과 함께, 오늘도 <span className="italic" style={{ color: r.color }}>Free</span> 하게! ✨
        </p>
      </div>
    </main>
  );
}
