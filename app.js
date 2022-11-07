import { stories } from "./story.js";

const p1 = document.getElementById("p1")
const label1 = document.getElementById("label1")
const startReading = document.getElementById("start-reading")
const readAgain = document.getElementById("read-again")
let speedDom = document.getElementById("speed")

p1.style.fontSize = "50px"

let index = Math.floor(Math.random() * stories.length)
let story = stories[index]
let tmp = story
let storyArray = story.split(" ")
localStorage.setItem("storyArray", JSON.stringify(storyArray))

function* getStory() {
  for (let i = 0; i < storyArray.length; i++) {
    yield storyArray[i];
  }
}

let sto = getStory();
let result;
let counter = 0;

const runReading = () => {
  let speed = parseInt(speedDom.value)
  if (isNaN(speed)) {
    speed = 500
  }
  label1.style.visibility = "hidden"
  startReading.style.visibility = "hidden"
  speedDom.style.visibility = "hidden"
  readAgain.style.visibility = "hidden"

  const interval = setInterval(() => {
    result = sto.next();
    result.done === false ? p1.innerHTML += " " + result.value : clearInterval(interval);
    counter++
    if (counter == storyArray.length) {
      p1.innerHTML = "Tell me about the story..."
      label1.style.visibility = "visible"
      startReading.style.visibility = "visible"
      speedDom.style.visibility = "visible"
      readAgain.style.visibility = "visible"
    }
  }, speed);
}
startReading.onclick = runReading


const readAgainFunc = () => {
  storyArray = JSON.parse(localStorage.getItem('storyArray'))
  runReading()
}
readAgain.onclick = readAgainFunc


function pageScroll() {
  window.scrollBy(0, 1);
  scrolldelay = setTimeout(pageScroll, 10);
}
pageScroll()