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
    [80, 3],
    [30, 2],
  ];
  levels.map((level) => {
    if (value + add > level[0] && value <= level[0]) {
      console.log(level[1]);
      return level[1];
    }
  });
};
