const _ = require('lodash');
const { teams } = require('./config');

const getCountry = (matchData, country) => _.get(matchData, country);
const getFlagIcon = (matchData, country) => {
	const currentCountry = 	getCountry(matchData, country) && getCountry(matchData, country).toLowerCase() || '';

	if (teams && currentCountry !== '') {
		return teams[currentCountry] ? teams[currentCountry].flagIcon : '';
	}

	return '';
};

const vs = matchData => `${getFlagIcon(matchData, 'home_team.country')} ${_.get(matchData, 'home_team.country')} vs ${_.get(matchData, 'away_team.country')} ${getFlagIcon(matchData, 'away_team.country')}`;
const vsTime = matchData => `${vs(matchData)} (${new Date(matchData.datetime)})`;
const vsScore = matchData => `${getFlagIcon(matchData, 'home_team.country')} ${_.get(matchData, 'home_team.country')} ${_.get(matchData, 'home_team.goals')} : ${_.get(matchData, 'away_team.goals')} ${_.get(matchData, 'away_team.country')} ${getFlagIcon(matchData, 'away_team.country')}`;
const score = matchData => `${_.get(matchData, 'home_team.goals')} : ${_.get(matchData, 'away_team.goals')}`;

module.exports = {
	vs,
	vsTime,
	vsScore,
	score
};
