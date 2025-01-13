// event listeners
document.querySelector("#roll").addEventListener("click", rolldice);
document.querySelector("#refreshbutton").addEventListener("click", refresh);

// global variables
let dollar = 20;
let rolls = 0;
let sides = [1, 2, 3, 4, 5, 6]
let gainloss = [-1, -.6, -.2, .2, .6, 1];
let highscore = 20;

let shopb1 = true;
let shopb2 = true;
let poorwarning = false;


// functions
function refresh() {
  window.location.reload("Refresh")
}

// item 1
function shopped1() {
  let cost = 50;
  if (shopb1) {
    if (dollar < cost) {
      toopoor();
    } else {
      // changes button from solid to unfilled
      document.querySelector("#shop1").className = "btn btn-outline-danger";
      // add a 4 to side array
      sides.push(4);
      // test if sides array has extra 4
      console.log(sides);
      // subtract $cost
      addtodollar(-cost);

      // strike-through the text
      document.querySelector("#tshop1").className += " shopused "
      // testing
      console.log("first shop option bought");

      shopb1 = false;
    }
  }
}

// item 2
function shopped2() {
  let cost = 69;
  if (shopb2) {
    if (dollar < cost) {
      toopoor();
    } else {
      // changes button from solid to unfilled
      document.querySelector("#shop2").className = "btn btn-outline-danger";
      // add 6.9% to each gain in gain/loss array
      for (let i = 4; i <= 6; i++) {
        gainloss[i - 1] += .069;
      }
      document.querySelector(`#gain1`).innerHTML = "26.9% gain";
      document.querySelector(`#gain2`).innerHTML = "66.9% gain";
      document.querySelector(`#gain3`).innerHTML = "106.9% gain";
      // test if gains got added
      console.log(gainloss);
      // subtract $cost
      addtodollar(-cost);

      // strike-through the text
      document.querySelector("#tshop2").className += " shopused "
      // testing
      console.log("first shop option bought");

      shopb2 = false;
    }
  }
}

function toopoor() {
  document.querySelector(`#rollFeedback`).className = "bg-warning text-white";
  document.querySelector("#rollFeedback").innerHTML = "you're too poor for that";
  poorwarning = true;
}


function rolldice() {
  if (poorwarning) {
    document.querySelector("#rollFeedback").innerHTML = "";
    poorwarning = false;
  }

  // rolls the die, rng based on # of sides
  console.log("dice rolled");
  let diceface = sides[Math.floor(Math.random() * sides.length)];
  document.querySelector("#totalAttempts").innerHTML = ++rolls;

  // loads die picture

  document.querySelector("#dicepicture").src = `img/${diceface}.png`;
  //innitiate user's input
  let betting = document.querySelector("#bet").value;
  //if user puts negative value
  if (betting < 0) betting = 0;
  // testing
  console.log("betting " + betting);

  // if the user's betting input is more than the money they have,
  // betting becomes all the money they have
  if (betting > dollar) {
    betting = dollar;
  }
  let gambled = betting * gainloss[diceface - 1];
  // testing
  console.log("stuff gained/lost is " + gambled);

  addtodollar(gambled)
}

function addtodollar(adding) {
  // adds to dollar
  dollar += adding;
  // saves highscore
  if (highscore < dollar) {
    highscore = dollar;
  }
  // shows the change
  let gamled_string = adding.toFixed(2);
  document.querySelector("#money").innerHTML = dollar.toFixed(2);
  if (adding < 0) {
    document.querySelector(`#gainloss_text`).className = "loss";
    document.querySelector(`#gainloss_text`).innerHTML = " " + gamled_string;
  } else if (adding > 0) {
    document.querySelector(`#gainloss_text`).className = "gain";
    document.querySelector(`#gainloss_text`).innerHTML = " +" + gamled_string;
  } else {
    document.querySelector(`#gainloss_text`).className = "nonprofit";
    document.querySelector(`#gainloss_text`).innerHTML = " +" + gamled_string;
  }

  // sees if person won or lose
  if (dollar < .01) {
    document.querySelector(`#rollFeedback`).className = "bg-danger text-white";
    document.querySelector("#rollFeedback").innerHTML = "you lost! highest saved: $" + highscore.toFixed(2);
  }

  if (dollar >= 1000) {
    document.querySelector(`#rollFeedback`).className = "bg-success text-white";
    document.querySelector("#rollFeedback").innerHTML = `you won! <img src="https://compote.slate.com/images/926e5009-c10a-48fe-b90e-fa0760f82fcd.png?crop=680%2C453%2Cx0%2Cy0" alt="Computer man" style="width:48px;height:48px;">`;
  }
}


// end of script