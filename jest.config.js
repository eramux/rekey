module.exports = {
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.ts$': 'ts-jest'
	},
	testMatch: ['**/__tests__/**/*.spec.[jt]s'],
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	verbose: true
};
