const _ = require('lodash');

const vs = matchData => `${_.get(matchData, 'home_team.country')} vs ${_.get(matchData, 'away_team.country')}`;
const vsTime = matchData => `${vs(matchData)} (${new Date(matchData.datetime)})`;
const vsScore = matchData => `${_.get(matchData, 'home_team.country')} ${_.get(matchData, 'home_team.goals')} : ${_.get(matchData, 'away_team.goals')} ${_.get(matchData, 'away_team.country')}`;
const score = matchData => `${_.get(matchData, 'home_team.goals')} : ${_.get(matchData, 'away_team.goals')}`;

module.exports = {
	vs,
	vsTime,
	vsScore,
	score
};
