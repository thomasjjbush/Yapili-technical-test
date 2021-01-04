export default {
    collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    preset: 'ts-jest',
    roots: ['./../src'],
    setupFiles: ['./jest.setup.env.ts'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testRegex: '((\\.|/)(test|spec))\\.(js|ts|tsx)?$',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)?$': 'ts-jest',
    },
};
