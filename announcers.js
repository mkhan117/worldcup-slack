const _ = require('lodash');
const moment = require('moment-timezone');
const {get} = require('./request');
const {teams} = require('./config');
const {vs, vsScore, score} = require('./format');
const {announce, slackLink} = require('./slack');

const announceMatchStart = matchData => announce(`Game Started: ${vs(matchData)} -- Location: ${_.get(matchData, 'location')}`);
const announceMatchComplete = matchData => announce(`Game Ended: ${vsScore(matchData)}`);
const announceScore = matchData => announce(`Score Update: ${vsScore(matchData)}`);

const events = {
	goal: 'Goal!',
	'goal-own': 'Own goal!'
};

const announceEvent = (event, team, matchData) => {
	const type = _.get(event, 'type_of_event', 'Unknown event');
	const name = events[type] || type.replace(/^[a-z]/, c => c.toUpperCase()).replace(/-/g, ' ');

	const title = `${name}${name.includes('!') ? '' : ':'}`;

	const country = _.get(team, 'country');
	const player = _.get(event, 'player');
	const time = `${_.get(event, 'time')}`;
	const flagIcon = _.get(teams, `${country.toLowerCase()}.flagIcon`);
	const color = _.get(teams, `${country.toLowerCase()}.color`);

	const fields = [
		{short: true, title: 'Team:', value: `${country} ${flagIcon}`},
		{short: true, title: 'Player:', value: player},
		{short: true, title: 'Current Score:', value: vsScore(matchData)},
		{short: true, title: 'Time:', value: time}

	];

	if (type === 'goal' || type === 'goal-own' || name === 'Goal!' || name === 'Own goal!') {
		return announce(title, color, fields);
	}
};

const todayUpcoming = async () => {
	const matches = await get('/matches/today');
	const fields = matches.map(m => ({
		short: false,
		title: vs(m),
		value: moment(m.datetime).tz('America/New_York').format('h:mm A (z)')
	}));
	return announce('Upcoming Matches Today:', null, fields);
};

const todaySummary = async () => {
	const matchesToday = await get('/matches/today');
	const fieldsToday = matchesToday.map(m => ({
		short: false,
		title: vs(m),
		value: vsScore(m)
	}));
	await announce('Matches Played Today:', null, fieldsToday);

	const matchesTomorrow = await get('/matches/tomorrow');
	const fieldsTomorrow = matchesTomorrow.map(m => ({
		short: false,
		title: vs(m),
		value: moment(m.datetime).tz('America/New_York').format('h:mm A (z)')
	}));
	return announce('Upcoming Matches Tomorrow:', null, fieldsTomorrow);
};

module.exports = {
	start: announceMatchStart,
	end: announceMatchComplete,
	vsScore: announceScore,
	event: announceEvent,
	todayUpcoming,
	todaySummary
};
