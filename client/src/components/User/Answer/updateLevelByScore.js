//update the level of the user according to the score
export const updateLevelByScore = (value, add) => {
  console.log("calling into update level", value);
  console.log("points", add);
  const levels = [
    [500, 10],
    [410, 9],
    [330, 8],
    [230, 7],
    [200, 6],
    [150, 5],
    [110, 4],
    [50, 3],
    [30, 2],
  ];

  levels.map((level) => {
    if (value + add > level[0] && value <= level[0]) {
      localStorage.setItem("userLevel", level[1]);
    }
    if (value + add <= 30 && value <= 30) {
      localStorage.setItem("userLevel", 1);
    }
  });
  return localStorage.getItem("userLevel");
};

//getting the message that assess our guess
export const getGuessAssessment = (levelsAns, choice, score, id) => {
  let guessAns = "";
  let answersArray = [
    ["Perfect Guess, 10 marks added \n", "10"],
    ["Almost there, 5 marks added \n", "5"],
    ["No marks added \n", "0"],
    ["Second Farest answer, 5 marks deducted \n", "-5"],
    ["Farest answer, 10 marks deducted \n", "-10"],
  ];

  console.log(choice);
  const startLevel = localStorage.getItem("userLevel") || 1;
  for (let count = 0; count < levelsAns.length; count++) {
    if (levelsAns[count].includes(choice)) {
      const newLevel = updateLevelByScore(
        score,
        Number(answersArray[count][1])
      );
      if (startLevel !== newLevel) {
        answersArray[count].push(newLevel);
        answersArray[count].push(true);
        console.log(answersArray[count]);
        return answersArray[count];
      }
      answersArray[count].push(localStorage.getItem("userLevel"));
      answersArray[count].push(false);
      return answersArray[count];
      break;
    }
  }
};
export const mostPeopleAnswered = (levelsAns, guessAns) => {
  guessAns += " Most people answered ";
  levelsAns[0].map((el) => {
    switch (el) {
      case 0:
        guessAns += "Never ";
        break;
      case 1:
        guessAns += "Rarely ";
        break;
      case 2:
        guessAns += "Sometimes ";
        break;
      case 3:
        guessAns += "Usually ";
        break;
      case 4:
        guessAns += "Always ";
        break;
    }
  });

  return guessAns;
};
