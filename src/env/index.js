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
		clientId: '204576878451-islrpv87igisea6tdce0ag5mh8rnq367.apps.googleusercontent.com'
	}
};

module.exports = Object.assign({}, common, envSettings[env]);