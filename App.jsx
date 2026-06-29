import { useState } from "react";

const SCENARIOS = [
  {
    id: 1,
    title: "Мем в классном чате",
    setup: "Кто-то прислал в общий чат унизительный мем про одноклассника Алима. Уже 12 человек поставили смеющийся смайлик.",
    roles: {
      spreader: { name: "Распространитель", desc: "Ты первым переслал этот мем из другого чата." },
      witness: { name: "Свидетель", desc: "Ты видишь мем и реакцию одноклассников." },
      victim: { name: "Жертва", desc: "Ты — Алим. Тебе уже написали несколько человек со скриншотом." }
    },
    actions: {
      spreader: [
        { id: "a", text: "Удалить сообщение и извиниться", impact: +2, effect: "Ты взял ответственность. Часть людей увидела твой поступок." },
        { id: "b", text: "Промолчать — пусть само забудется", impact: -1, effect: "Мем продолжает расходиться. Алим нашёл его у чужих людей." },
        { id: "c", text: "Написать, что это была шутка", impact: -2, effect: "Алим видит твоё сообщение. Ему не смешно." }
      ],
      witness: [
        { id: "a", text: "Написать в чате, что это некрасиво", impact: +2, effect: "Несколько человек убрали смайлики. Атмосфера изменилась." },
        { id: "b", text: "Написать Алиму лично, что ты на его стороне", impact: +1, effect: "Алим почувствовал поддержку. Ему стало чуть легче." },
        { id: "c", text: "Поставить смайлик вместе со всеми", impact: -2, effect: "Алим видит тебя в списке. Он думал, вы друзья." },
        { id: "d", text: "Просто закрыть чат", impact: -1, effect: "Ты промолчал. Для Алима ты стал частью толпы." }
      ],
      victim: [
        { id: "a", text: "Написать в чате, что тебе больно", impact: +1, effect: "Некоторые люди замолчали. Кто-то написал тебе извинение." },
        { id: "b", text: "Пожаловаться классному руководителю", impact: +1, effect: "Ситуацию заметили взрослые. Виновный получил беседу." },
        { id: "c", text: "Выйти из чата и не отвечать никому", impact: 0, effect: "Мем продолжает жить без тебя. Но ты сохранил себя." },
        { id: "d", text: "Написать обидчику напрямую", impact: +1, effect: "Он не ожидал. Разговор получился неловким, но честным." }
      ]
    }
  },
  {
    id: 2,
    title: "Вирусный слух",
    setup: "В Telegram-канале появилась новость: известный певец якобы совершил что-то ужасное. Источника нет, но уже 50к репостов.",
    roles: {
      spreader: { name: "Распространитель", desc: "Ты поделился этой новостью в трёх чатах, не проверив источник." },
      witness: { name: "Свидетель", desc: "Ты видишь эту новость у нескольких друзей и в общем чате." },
      victim: { name: "Жертва", desc: "Ты — менеджер певца. Телефон разрывается. Новость — ложь." }
    },
    actions: {
      spreader: [
        { id: "a", text: "Удалить репосты и написать опровержение", impact: +2, effect: "Люди увидели твою честность. Часть репостов остановилась." },
        { id: "b", text: "Оставить как есть — все репостят", impact: -2, effect: "Новость дошла до работодателя певца. Начато расследование." },
        { id: "c", text: "Написать 'не знаю правда ли'", impact: -1, effect: "Неопределённость усиливает слух. Люди склонны верить плохому." }
      ],
      witness: [
        { id: "a", text: "Проверить источник и написать друзьям результат", impact: +2, effect: "Трое друзей удалили репосты. Цепочка прервалась." },
        { id: "b", text: "Не репостить, но и не опровергать", impact: 0, effect: "Ты не навредил, но и не помог. Слух живёт дальше." },
        { id: "c", text: "Репостнуть — это же все обсуждают", impact: -2, effect: "Ещё 200 человек увидели ложь от тебя лично." }
      ],
      victim: [
        { id: "a", text: "Выпустить официальное опровержение", impact: +2, effect: "Несколько крупных каналов удалили новость. Но скриншоты остались." },
        { id: "b", text: "Подать жалобу в Telegram", impact: +1, effect: "Канал заблокировали через сутки. Но новость уже разошлась." },
        { id: "c", text: "Ждать — само утихнет", impact: -1, effect: "Через неделю появилась вторая волна. С добавленными деталями." }
      ]
    }
  },
  {
    id: 3,
    title: "Слитая переписка",
    setup: "В общем чате появился скриншот личной переписки Дины с её парнем. Очень личные вещи. Скриншот сделал кто-то из их общих знакомых.",
    roles: {
      spreader: { name: "Распространитель", desc: "Ты переслал скриншот подруге 'просто так, она всё равно узнает'." },
      witness: { name: "Свидетель", desc: "Ты видишь скриншот в чате. Дина — твоя знакомая." },
      victim: { name: "Жертва", desc: "Ты — Дина. Тебе уже прислали свой скриншот твоего же скриншота." }
    },
    actions: {
      spreader: [
        { id: "a", text: "Попросить всех удалить и больше не пересылать", impact: +1, effect: "Часть людей удалила. Но интернет не забывает." },
        { id: "b", text: "Написать Дине и извиниться", impact: +2, effect: "Дина была в шоке. Но твоя честность дала ей что-то важное." },
        { id: "c", text: "Сделать вид, что не ты переслал", impact: -2, effect: "Дина узнала правду от другого человека. Теперь она знает и это." }
      ],
      witness: [
        { id: "a", text: "Написать в чате, что так делать нельзя", impact: +2, effect: "Несколько человек согласились. Атмосфера изменилась." },
        { id: "b", text: "Написать Дине — предупредить её", impact: +2, effect: "Дина смогла хотя бы подготовиться. Ты стал её поддержкой." },
        { id: "c", text: "Посмотреть и закрыть", impact: -1, effect: "Ты не участвовал. Но для Дины все, кто молчал — соучастники." }
      ],
      victim: [
        { id: "a", text: "Потребовать удалить у всех, кто переслал", impact: +1, effect: "Часть людей удалила. Некоторые — нет." },
        { id: "b", text: "Обратиться за юридической помощью", impact: +2, effect: "Это нарушение закона о приватности. Юрист подтвердил." },
        { id: "c", text: "Исчезнуть из всех чатов", impact: -1, effect: "Ты защитила себя. Но виновный так и не понёс ответственности." }
      ]
    }
  }
];

const ROLE_COLORS = {
  spreader: { bg: "#FF6B6B", light: "#FFE8E8", text: "#C0392B", icon: "📤" },
  witness: { bg: "#F39C12", light: "#FEF9E7", text: "#D68910", icon: "👁" },
  victim: { bg: "#3498DB", light: "#EBF5FB", text: "#2471A3", icon: "💙" }
};

const ROLE_NAMES = {
  spreader: "Распространитель",
  witness: "Свидетель",
  victim: "Жертва"
};

export default function ThreadGame() {
  const [screen, setScreen] = useState("intro");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [assignedRoles, setAssignedRoles] = useState([]);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showEffect, setShowEffect] = useState(false);
  const [totalImpact, setTotalImpact] = useState(0);

  const scenario = SCENARIOS[scenarioIndex];

  const startGame = () => {
    const roles = Object.keys(scenario.roles);
    const shuffled = [...roles].sort(() => Math.random() - 0.5);
    setAssignedRoles(shuffled);
    setCurrentRoleIndex(0);
    setChoices([]);
    setSelectedAction(null);
    setShowEffect(false);
    setScreen("role");
  };

  const currentRole = assignedRoles[currentRoleIndex];
  const currentRoleData = currentRole ? scenario.roles[currentRole] : null;
  const currentActions = currentRole ? scenario.actions[currentRole] : [];

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    setShowEffect(true);
    setTotalImpact(prev => prev + action.impact);
    setChoices(prev => [...prev, { role: currentRole, action, scenarioTitle: scenario.title }]);
  };

  const nextRole = () => {
    if (currentRoleIndex < assignedRoles.length - 1) {
      setCurrentRoleIndex(prev => prev + 1);
      setSelectedAction(null);
      setShowEffect(false);
      setScreen("role");
    } else {
      if (scenarioIndex < SCENARIOS.length - 1) {
        setScreen("scenario_end");
      } else {
        setScreen("final");
      }
    }
  };

  const nextScenario = () => {
    setScenarioIndex(prev => prev + 1);
    startGame();
  };

  const getImpactLabel = (impact) => {
    if (impact >= 6) return { label: "Агент перемен", color: "#27AE60", desc: "Твои решения защищали людей и останавливали вред." };
    if (impact >= 2) return { label: "Осознанный участник", color: "#F39C12", desc: "Ты старался делать правильно, но не всегда решался." };
    if (impact >= 0) return { label: "Молчаливый свидетель", color: "#E67E22", desc: "Ты избегал вреда, но и не останавливал его." };
    return { label: "Часть цепочки", color: "#E74C3C", desc: "Твои действия усиливали вред, даже если ты не хотел этого." };
  };

  const impactResult = getImpactLabel(totalImpact);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "#F0F0F0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>

      {screen === "intro" && (
        <div style={{ maxWidth: 560, textAlign: "center" }}>
          <div style={{ fontSize: 13, letterSpacing: "0.3em", color: "#888", textTransform: "uppercase", marginBottom: 16 }}>UNESCO Youth Hackathon 2026</div>
          <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 8, background: "linear-gradient(135deg, #FF6B6B 0%, #F39C12 50%, #3498DB 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>THREAD</div>
          <div style={{ fontSize: 14, color: "#888", letterSpacing: "0.15em", marginBottom: 40, textTransform: "uppercase" }}>Every action leaves a trace</div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#BBBBBB", marginBottom: 16 }}>Ты побываешь в трёх ролях: распространителя, свидетеля и жертвы. Каждое твоё решение оставляет след.</p>
          <p style={{ fontSize: 14, color: "#777", marginBottom: 48 }}>3 сценария · смена ролей · карта последствий</p>
          <button onClick={startGame} style={{ background: "linear-gradient(135deg, #FF6B6B, #F39C12)", border: "none", borderRadius: 12, padding: "16px 48px", fontSize: 16, fontWeight: 700, color: "#fff", cursor: "pointer", letterSpacing: "0.05em" }}>Начать игру</button>
          <div style={{ marginTop: 48, display: "flex", gap: 32, justifyContent: "center" }}>
            {["📤 Распространитель", "👁 Свидетель", "💙 Жертва"].map(r => (
              <div key={r} style={{ fontSize: 13, color: "#666" }}>{r}</div>
            ))}
          </div>
        </div>
      )}

      {screen === "role" && currentRoleData && (
        <div style={{ maxWidth: 600, width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 13, color: "#666" }}>Сценарий {scenarioIndex + 1}/{SCENARIOS.length}</div>
            <div style={{ display: "flex", gap: 6 }}>
              {assignedRoles.map((r, i) => (
                <div key={r} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= currentRoleIndex ? ROLE_COLORS[r].bg : "#333", opacity: i <= currentRoleIndex ? 1 : 0.3 }} />
              ))}
            </div>
          </div>
          <div style={{ background: "#14141A", borderRadius: 16, padding: 24, marginBottom: 24, borderLeft: `4px solid ${ROLE_COLORS[currentRole]?.bg}` }}>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.15em" }}>Сценарий</div>
            <div style={{ fontSize: 15, lineHeight: 1.6, color: "#CCC" }}>{scenario.setup}</div>
          </div>
          <div style={{ background: "#14141A", border: `1px solid ${ROLE_COLORS[currentRole]?.bg}33`, borderRadius: 16, padding: 24, marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{ROLE_COLORS[currentRole]?.icon}</span>
              <div>
                <div style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: "0.15em" }}>Твоя роль</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: ROLE_COLORS[currentRole]?.bg }}>{currentRoleData.name}</div>
              </div>
            </div>
            <div style={{ fontSize: 15, color: "#CCC", lineHeight: 1.6 }}>{currentRoleData.desc}</div>
          </div>
          {!showEffect && (
            <>
              <div style={{ fontSize: 13, color: "#777", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>Что ты делаешь?</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {currentActions.map(action => (
                  <button key={action.id} onClick={() => handleActionSelect(action)} style={{ background: "#14141A", border: "1px solid #2A2A35", borderRadius: 12, padding: "16px 20px", textAlign: "left", color: "#DDD", fontSize: 15, lineHeight: 1.5, cursor: "pointer" }}>
                    {action.text}
                  </button>
                ))}
              </div>
            </>
          )}
          {showEffect && selectedAction && (
            <div style={{ background: "#14141A", border: `1px solid ${selectedAction.impact >= 1 ? "#27AE60" : selectedAction.impact === 0 ? "#F39C12" : "#E74C3C"}44`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: selectedAction.impact >= 1 ? "#27AE60" : selectedAction.impact === 0 ? "#F39C12" : "#E74C3C", marginBottom: 8 }}>Последствие</div>
              <div style={{ fontSize: 15, color: "#CCC", lineHeight: 1.7, marginBottom: 8 }}>«{selectedAction.text}»</div>
              <div style={{ fontSize: 15, color: "#AAA", lineHeight: 1.6, marginBottom: 24 }}>{selectedAction.effect}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <div style={{ padding: "4px 12px", borderRadius: 20, background: selectedAction.impact >= 1 ? "#27AE6022" : selectedAction.impact === 0 ? "#F39C1222" : "#E74C3C22", color: selectedAction.impact >= 1 ? "#27AE60" : selectedAction.impact === 0 ? "#F39C12" : "#E74C3C", fontSize: 13, fontWeight: 700 }}>
                  {selectedAction.impact > 0 ? "+" : ""}{selectedAction.impact} к индексу ответственности
                </div>
              </div>
              <button onClick={nextRole} style={{ background: ROLE_COLORS[currentRole]?.bg, border: "none", borderRadius: 10, padding: "12px 32px", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                {currentRoleIndex < assignedRoles.length - 1 ? "Следующая роль →" : scenarioIndex < SCENARIOS.length - 1 ? "Следующий сценарий →" : "Увидеть итог →"}
              </button>
            </div>
          )}
        </div>
      )}

      {screen === "scenario_end" && (
        <div style={{ maxWidth: 560, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🧵</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Нить сплетена</div>
          <div style={{ fontSize: 15, color: "#AAA", lineHeight: 1.7, marginBottom: 40 }}>Сценарий «{scenario.title}» завершён. Каждое твоё решение стало частью общей нити. Следующий сценарий — другая ситуация, другие роли.</div>
          <button onClick={nextScenario} style={{ background: "linear-gradient(135deg, #F39C12, #3498DB)", border: "none", borderRadius: 12, padding: "14px 40px", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Следующий сценарий →</button>
        </div>
      )}

      {screen === "final" && (
        <div style={{ maxWidth: 620, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 13, letterSpacing: "0.2em", color: "#666", textTransform: "uppercase", marginBottom: 12 }}>Итог игры</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: impactResult.color, marginBottom: 8 }}>{impactResult.label}</div>
            <div style={{ fontSize: 16, color: "#AAA", lineHeight: 1.6, marginBottom: 8 }}>{impactResult.desc}</div>
            <div style={{ fontSize: 14, color: "#666" }}>Индекс ответственности: <span style={{ color: impactResult.color, fontWeight: 700 }}>{totalImpact > 0 ? "+" : ""}{totalImpact}</span></div>
          </div>
          <div style={{ background: "#14141A", borderRadius: 16, padding: 24, marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: "#666", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 20 }}>Твоя нить решений</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {choices.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: ROLE_COLORS[c.role]?.bg + "22", border: `2px solid ${ROLE_COLORS[c.role]?.bg}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{ROLE_COLORS[c.role]?.icon}</div>
                    {i < choices.length - 1 && <div style={{ width: 2, height: 40, background: `linear-gradient(${ROLE_COLORS[c.role]?.bg}, ${ROLE_COLORS[choices[i + 1].role]?.bg})`, opacity: 0.4 }} />}
                  </div>
                  <div style={{ paddingTop: 4, paddingBottom: i < choices.length - 1 ? 24 : 0 }}>
                    <div style={{ fontSize: 11, color: "#666", marginBottom: 2 }}>{c.scenarioTitle} · {ROLE_NAMES[c.role]}</div>
                    <div style={{ fontSize: 14, color: "#CCC", marginBottom: 2 }}>{c.action.text}</div>
                    <div style={{ fontSize: 12, color: c.action.impact >= 1 ? "#27AE60" : c.action.impact === 0 ? "#F39C12" : "#E74C3C" }}>{c.action.impact > 0 ? "+" : ""}{c.action.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#14141A", borderRadius: 16, padding: 20, marginBottom: 32, textAlign: "center", borderTop: `3px solid ${impactResult.color}` }}>
            <div style={{ fontSize: 14, color: "#AAA", lineHeight: 1.7 }}>В реальной жизни эти нити не исчезают. Каждый репост, каждое молчание, каждое решение заступиться — остаётся частью чьей-то истории.</div>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => { setScreen("intro"); setScenarioIndex(0); setTotalImpact(0); setChoices([]); }} style={{ background: "transparent", border: "1px solid #333", borderRadius: 10, padding: "12px 28px", color: "#AAA", fontSize: 14, cursor: "pointer" }}>Сыграть снова</button>
          </div>
          <div style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: "#444" }}>THREAD · UNESCO Youth Hackathon 2026 · Nurbibi Kabdyl & Aida Syzdykova</div>
        </div>
      )}
    </div>
  );
}
