const _ = require('lodash');
const { teams } = require('./config');

const flagIcon = (matchData, country) => teams[_.get(matchData, country).toLowerCase()] && teams[_.get(matchData, country).toLowerCase()].flagIcon || '';
const vs = matchData => `${flagIcon(matchData, 'home_team.country')} ${_.get(matchData, 'home_team.country')} vs ${flagIcon(matchData, 'away_team.country')} ${_.get(matchData, 'away_team.country')}`;
const vsTime = matchData => `${vs(matchData)} (${new Date(matchData.datetime)})`;
const vsScore = matchData => `${flagIcon(matchData, 'home_team.country')} ${_.get(matchData, 'home_team.country')} ${_.get(matchData, 'home_team.goals')} : ${_.get(matchData, 'away_team.goals')} ${_.get(matchData, 'away_team.country')} ${flagIcon(matchData, 'away_team.country')}`;
const score = matchData => `${_.get(matchData, 'home_team.goals')} : ${_.get(matchData, 'away_team.goals')}`;

module.exports = {
	vs,
	vsTime,
	vsScore,
	score
};
