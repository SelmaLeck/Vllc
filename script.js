const questions = [
  { q:"Wie viele Minecraft items gibt es?", a:["1643","1402","986","678"], correct:0, value:100 },
  { q:"Wie lange ging dein erster Stream (2024)?", a:["2,9h","1,4h","2,4h","1,7h"], correct:1, value:200 },
  { q:"Wie viele VIPS hast du?", a:["6","4","5","7"], correct:0, value:300 },
  { q:"Wie viele deiner Founder sind aktuell noch sub?", a:["5","2","3","1"], correct:1, value:500 },
  { q:"Wer war der ZWEITE Streamer dem du auf Twitch gefolgt bist?", a:["Basti","Rewi","Knossi","Kevin"], correct:2, value:1000 },
  { q:"Wie vielen Streamern folgst du auf Twitch?", a:["84","103","67","117"], correct:3, value:2000 },
  { q:"Wie viele davon sind weiblich?", a:["39","67","16","8"], correct:2, value:4000 },
  { q:"Wer hat über 900 Nachrichten bei dir?", a:["JoxoTV","Neneli_","t_son_","TrNeru"], correct:1, value:8000 },
  { q:"Wie viele aktive Mods hast du?", a:["2","5","0","3"], correct:2, value:16000 },
  { q:"Wie viel Modgehalt erhalten deine Mods?", a:["50","5","0","80"], correct:2, value:32000 },
  { q:"Wann kam das Album ''WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?'' von Billie Eillish raus?", a:["2019","2018","2020","2021"], correct:0, value:64000 },
  { q:"Wer hat die MEISTEN Chatnachrichten bei dir?", a:["f7zzy_","its_si135","isavllc","rrxm3o"], correct:1, value:125000 },
  { q:"yx?", a:["7","8","9","10"], correct:2, value:250000 },
  { q:"xy?", a:["29","69","68","67"], correct:1, value:500000 },
  { q:"xy?", a:["x","y","Gce","e"], correct:3, value:1000000 }
];

let currentQ = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const ladderEl = document.getElementById("money-ladder");

// Geldleiter erstellen
ladderEl.innerHTML = "";
questions.slice().reverse().forEach((q,i)=>{
  const li = document.createElement("li");
  li.id = "ladder-"+(questions.length-1-i);
  li.innerText = q.value+"€";
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

  // Geldleiter Highlight
  ladderEl.querySelectorAll("li").forEach(li => li.classList.remove("current"));
  const currentLi = document.getElementById("ladder-"+currentQ);
  currentLi.classList.add("current");
  currentLi.scrollIntoView({behavior:"smooth", block:"center"});
}

function checkAnswer(i){
  const q = questions[currentQ];
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach(btn=>btn.disabled=true);

  if(i===q.correct){ buttons[i]?.classList.add("correct"); score+=q.value; }
  else { if(i>=0) buttons[i]?.classList.add("wrong"); buttons[q.correct]?.classList.add("correct"); }

  setTimeout(()=>{
    currentQ++;
    showQuestion();
  },1200);
}

function showEnd(){
  questionEl.innerText = "SPIEL VORBEI... DU HAST ES GESCHAFFT!!";
  answersEl.innerHTML = `<p>Dein Punktestand: ${score}€</p>`;
}

showQuestion();
