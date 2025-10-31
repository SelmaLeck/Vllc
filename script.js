const questions = [
  { q:"Wer war der ZWEITE Streamer dem du auf Twitch gefolgt bist?", a:["Basti","Rewi","Knossi","Kevin"], correct:2 },
  { q:"Wie vielen Streamern folgst du auf Twitch?", a:["84","103","67","118"], correct:3 },
  { q:"Wie viele davon sind weiblich?", a:["39","67","16","8"], correct:2 },
  { q:"Wer hat über 900 Nachrichten bei dir?", a:["JoxoTV","Neneli_","t_son_","TrNeru"], correct:1 },
  { q:"Wie viele aktive Mods hast du?", a:["2","5","0","3"], correct:2 },
  { q:"Wie viel Modgehalt erhalten deine Mods?", a:["50","5","0","80"], correct:2 },
  { q:"Wann kam das Album ''WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?'' von Billie Eillish raus?", a:["2019","2018","2020","2021"], correct:0 },
  { q:"Wer hat die MEISTEN Chatnachrichten bei dir?", a:["f7zzy_","its_si135","isavllc","rrxm3o"], correct:1 },
  { q:"Wie viele total hours hast du gestreamt?", a:["2013","1200","1121","1324"], correct:2 },
  { q:"Wie viele Games hast du schon gestreamt?", a:["21","25","29","19"], correct:1 },
  { q:"Welches ist Olivia Rodrigos bekanntestes Lied?", a:["vampire","traitor","good 4 u","drivers license"], correct:3 },
  { q:"Wie viele Minecraft items gibt es?", a:["1643","1402","986","678"], correct:0 },
  { q:"Wie lange ging dein erster Stream (2024)?", a:["2,9h","1,4h","2,4h","1,7h"], correct:1 },
  { q:"Wie viele VIPS hast du?", a:["6","4","5","7"], correct:0 },
  { q:"Wie viele deiner Founder sind aktuell noch sub?", a:["5","2","3","1"], correct:1 },
];

let currentQ = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const ladderEl = document.getElementById("money-ladder");

// Ladder erstellen: unten 1, oben 15
ladderEl.innerHTML = "";
questions.slice().reverse().forEach((q,i)=>{
  const li = document.createElement("li");
  li.id = "ladder-"+(questions.length-1-i);
  li.innerText = questions.length-i; // Zahlen statt Geld
  ladderEl.appendChild(li);
});

function showQuestion(){
  if(currentQ >= questions.length) return showEnd();
  const q = questions[currentQ];
  questionEl.innerText = q.q;
  answersEl.innerHTML = "";

  q.a.forEach((ans,i)=>{
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.disabled = false;
    btn.addEventListener("click", ()=>checkAnswer(i));
    answersEl.appendChild(btn);
  });

  // Ladder Highlight
  ladderEl.querySelectorAll("li").forEach(li => li.classList.remove("current"));
  const currentLi = document.getElementById("ladder-"+currentQ);
  currentLi.classList.add("current");
}

function checkAnswer(i){
  const q = questions[currentQ];
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach(btn=>btn.disabled=true);

  if(i===q.correct){ buttons[i]?.classList.add("correct"); }
  else { if(i>=0) buttons[i]?.classList.add("wrong"); buttons[q.correct]?.classList.add("correct"); }

  setTimeout(()=>{
    currentQ++;
    showQuestion();
  },1200);
}

function showEnd(){
  questionEl.innerText = "SPIEL VORBEI... DU HAST ES GESCHAFFT!!";
  answersEl.innerHTML = `<p>Glückwunsch! Weitere Anweisungen erhälst du per discord DM... </p>`;
}

showQuestion();
