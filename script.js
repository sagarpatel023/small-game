const dialogue = document.getElementById("dialogue");
const choices = document.getElementById("choices");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const sceneImg = document.getElementById("sceneImg");
const modalImg = document.getElementById("modalImg");

let scene = 0;

function setBackground(bg) {
  document.body.style.background = bg;
}

const scenes = {
  0: {
    bg: "#4facfe",
    img: "anz.jpg",
    text: "You just finished a hard day of work at ANZ, picking up calls and dealing with broke customers.\n\nHow do you feel?",
    options: [
      { text: "Tired", next: 1 },
      { text: "Happy", next: 1 },
      { text: "Annoyed", next: 1 },
      { text: "Proud", next: 1 }
    ]
  },

  1: {
    bg: "linear-gradient(135deg, #fbc2eb, #a6c1ee, #fddb92)",
    img: "pie.jpg",
    text: "You're super hungry and you have mug waiting for you.\n\nWhat food do you decide to get instead?",
    options: [
      { text: "Creamy chicken pie", next: 2 },
      { text: "Taco Bell", next: 2 },
      { text: "KFC", next: 2 },
      { text: "Moustache cookies", next: 2 }
    ]
  },

  2: {
    bg: "linear-gradient(180deg, #a8e063, #56ab2f)",
    img: "in-car.jpg",
    text: "You're walking back to your car. As you approach, you notice a baby orangutan sitting inside.",
    options: [
      { text: "Panic and run", fail: "You left a baby orangutan alone in your car." },
      { text: "Try to scare it out", fail: "That probably made it more scared." },
      { text: "Stay calm and observe", next: "3a" },
      { text: "Call for help", next: "3b" }
    ]
  },

  "3a": {
    bg: "linear-gradient(180deg, #a8e063, #56ab2f)",
    text: "You stay calm. The orangutan watches you carefully.",
    img: "happy.jpg",
    options: [
      { text: "Talk softly", next: 4 },
      { text: "Yell for help", fail: "Sudden noise scared it." },
      { text: "Try to touch it", fail: "Too soon." },
      { text: "Leave immediately", fail: "It needed reassurance." }
    ]
  },

  "3b": {
    bg: "linear-gradient(180deg, #a8e063, #56ab2f)",
    text: "You call for help. The orangutan relaxes slightly.",
    img: "happy.jpg",
    options: [
      { text: "Wait patiently", next: 4 },
      { text: "Try to grab it", fail: "It got overstimulated." },
      { text: "Panic", fail: "The orangutan senses chaos." },
      { text: "Leave", fail: "You abandoned the baby." }
    ]
  },

  4: {
    bg: "linear-gradient(135deg, #fddb92, #d1fdff)",
    text: "The orangutan climbs out and gently offers you a card.\n\nDo you accept it?",
    img: "orangutan.jpg",
    options: [
      { text: "Yes", next: 5 },
      { text: "Ask where it's from", next: 5 },
      { text: "Smile and accept", next: 5 },
      { text: "No", fail: "It was trying to give you something important." }
    ]
  },

  5: {
    bg: "linear-gradient(135deg, #ff9a9e, #fecfef)",
    img: "sagar.jpg",
    text: "You open the letter.\n\n\It's a card from Sagar",
    options: [
      { text: "Continue", next: 6 }
    ]
  },

  6: {
    bg: "linear-gradient(180deg, #df072bff, #ff7eb3)",
    img: "bear.gif",
    text: "Would you like to be my Valentine?",
    options: [
      { text: "Yes", action: "yes" },
      { text: "No", action: "no" }
    ]
  },

  7: {
    bg: "linear-gradient(135deg, #ff9a9e, #fecfef)",
    img: "handheld.gif",
    text: "Pick a day",
    options: [
        { text: "Feb 14", next: 8 },
        { text: "Feb 15", next: 8  },
        { text: "Oi idk", next: 8  },
        { text: "FUCK KNOWS W THE PARENTS", next: 8  }
    ]
    },
    8: {
    bg: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    img: "huggie.gif",
    text: "I love you",
    options: [] 
    }


};

function renderScene() {
  const current = scenes[scene];

  setBackground(current.bg);
  dialogue.innerText = current.text;

  sceneImg.src = current.img;  
  sceneImg.alt = "Scene image";

  choices.innerHTML = "";

  current.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.text;

    if (opt.fail) {
      btn.onclick = () => showFail(opt.fail);
    } else if (opt.action === "yes") {
      btn.onclick = () => {
        scene = 7;
        renderScene()
      }
    } else if (opt.action === "no") {
      btn.id = "noBtn";
      btn.onclick = moveNo;
      btn.addEventListener("touchstart", moveNo);
    } else {
      btn.onclick = () => {
        scene = opt.next;
        renderScene();
      };
    }

    choices.appendChild(btn);
  });
}


function showFail(message) {
  modalText.innerText = message;
  modalImg.src = "sad.jpg";
  modalImg.style.display = "block";
  modal.style.display = "flex";
}


function closeModal() {
  modal.style.display = "none";
  modalImg.style.display = "none";   
  scene = 0;
  renderScene();
}


function moveNo(e) {
  e.preventDefault();
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 120 - 60;
  e.target.style.transform = `translate(${x}px, ${y}px)`;
}

function win() {
  dialogue.innerText = "YAY I love you ";
  choices.innerHTML = "";
}

renderScene();
