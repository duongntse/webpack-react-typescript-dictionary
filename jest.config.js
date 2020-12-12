// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
// const { defaults: tsjPreset } = require('ts-jest/presets');
// const { jsWithTs: tsjPreset } = require('ts-jest/presets');
const { jsWithBabel: tsjPreset } = require( 'ts-jest/presets' );
module.exports = {
    // testEnvironment: 'node',
    // testEnvironment: 'jsdom',
    setupFiles: [
        '<rootDir>/tests/setup/test-shim.js',
        '<rootDir>/tests/setup/test-setup.js'
    ],
    roots: ['<rootDir>/src'],
    moduleDirectories: ['<rootDir>/src', 'node_modules'],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest'
    },
    clearMocks: true,
    verbose: false,
    coverageDirectory: 'coverage',
    moduleFileExtensions: [
        'js',
        'json',
        'jsx',
        'ts',
        'tsx',
        'node',
        'spec.ts',
        'spec.tsx'
    ],

    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^root/(.*)$': '<rootDir>/$1',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/tests/setup/fileMock.js',
        '\\.(css|less)$': '<rootDir>/tests/setup/styleMock.js'
    },
    preset: 'ts-jest/presets/js-with-ts',
    transform: {
        // '^.+\\.[t|j]sx?$': 'babel-jest',
        ...tsjPreset.transform,
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
            'jest-transform-stub'
    },
    transformIgnorePatterns: ['/node_modules/(?!@babel/runtime)'],
    setupFilesAfterEnv: ["<rootDir>/tests/setup/test-setup.js"]
};
