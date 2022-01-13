import consoleLogger from 'node-color-log';

consoleLogger.setDate(() => new Date().toLocaleTimeString());
export default consoleLogger;
