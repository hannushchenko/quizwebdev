// butt.onclick = function () {
//     var value = document.getElementById("elem").value;
//     document.getElementById("str").innerHTML = "Відповідь: " + value;

//     elem.classList.add("hidden");
//     butt.classList.add("hidden");
// };

// let buttons = document.querySelectorAll(".butt");
// buttons.forEach((item) =>
//     item.addEventListener("click", (item) => {
//         var value = document.getElementById("elem").value;
//         document.getElementById("str").innerHTML = "Відповідь: " + value;

//         elem.classList.add("hidden");
//         butt.classList.add("hidden");
//     })
// );

let quizes = document.querySelectorAll(".quiz");
let quizContainer = document.querySelector(".quiz__container");
let mark = 0;
let id = 0;
let checked = 0;
const correctAnswers = [
  "A", //1
  "B", //2
  "B", //3
  "D", //4
  "A", //5
  "D", //6
  "C", //7
  "B", //8
  "B", //9
  "D", //10
  "C", //11
  "A", //12
  "B", //13
  "A", //14
  "A", //15
  "D", //16
  "D", //17
  "C", //18
  "B", //19
  "D", //20
  "D", //21
  "B", //22
  "B", //23
  "C", //24
];
const STARTBTN = document.querySelector(".startBtn");
const MARKBTN = document.querySelector(".markBtn");
const TIMER = document.querySelector(".timer");
const SCALE = document.querySelector(".scale");
let time = 0;
let endTime;
let intervalStart;

/*SCALE */

let oldWidthNum = 0;
let newWidthNum;
SCALE.style.width = oldWidthNum + "%";
/* */

STARTBTN.addEventListener("click", () => {
  STARTBTN.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  intervalStart = setInterval(() => {
    TIMER.innerHTML = "Час виконання: " + ++time;
  }, 1000);
});

quizes.forEach((item) => {
  item.id = id++;
  let button = item.querySelector(".button");
  let answer = item.querySelector(".answer");
  let elem = item.querySelector(".elem");

  button.addEventListener("click", () => {
    let value = elem.value;
    if (
      value === "a" ||
      value === "A" ||
      value === "b" ||
      value === "B" ||
      value === "C" ||
      value === "c" ||
      value === "D" ||
      value === "d"
    ) {
      answer.innerHTML = "Відповідь: " + value;

      elem.classList.add("hidden");
      button.classList.add("hidden");

      newWidthNum = oldWidthNum + 100 / correctAnswers.length;
      oldWidthNum = newWidthNum;
      SCALE.style.width = newWidthNum + "%";

      console.log(oldWidthNum);
      console.log(newWidthNum);
      console.log(SCALE.style.width);

      checked++;

      if (elem.value.toUpperCase() === correctAnswers[item.id]) {
        mark++;
      }

      if (checked === correctAnswers.length) {
        MARKBTN.classList.remove("hidden");
        endTime = time;
        console.log(endTime);
        clearInterval(intervalStart);
      }
    } else {
      elem.value = "";
    }
  });
});

MARKBTN.addEventListener("click", () => {
  const markEl = document.createElement("div");
  const timeEl = document.createElement("div");
  markEl.classList.add("endDiv");
  timeEl.classList.add("endDiv");
  let markStr =
    "Ваша оцінка: " +
    Math.round(mark / 2) +
    ". Кількість правильних відповідей:" +
    mark;

  let minutes;
  let seconds;
  if (endTime >= 60) {
    seconds = endTime % 60;
    minutes = (endTime - seconds) / 60;
  } else {
    seconds = endTime;
    minutes = 0;
  }
  let timeStr = "Ваш час: " + minutes + " хвилин " + seconds + " секунд";
  markEl.innerHTML = markStr;
  timeEl.innerHTML = timeStr;
  document.body.append(markEl);
  document.body.append(timeEl);
  MARKBTN.classList.add("hidden");
});
