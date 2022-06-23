const Compiler = require('./compiler');
const options = require('../simple-webpack.config');

new Compiler(options).run();