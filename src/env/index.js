let env = process.env.NODE_ENV || 'development';

let envSettings = {
	development: require('./development'),
	production: require('./production')
};
let common = {
	ENDPOINT: {
		BASE: 'https://ops-staging-mob.hostmaker.co',
		AUTH: {
			CREATE: { url: '/api/v1/auth.json', method: 'POST' }
		},
		EVENTS: {
			LIST: { url: '/api/v1/events/:id', method: 'GET' },
			UPDATE_LOCATION: { url: '/api/v1/events/:id', method: 'PUT' },
			START_END_EVENT :{url: '/api/v1/me/events/:id.json', method: 'PUT'}
		}
	},
	google: {
		clientId: '681345616712-lnndn8m04fsfg4v4ihcn6dook25cul8u.apps.googleusercontent.com'
	}
};

module.exports = Object.assign({}, common, envSettings[env]);