#!/usr/bin/env node

// SECTION: 모듈 import

import http from 'http';
import debug from 'debug';
import app from '../app.js';

const debugServer = debug('our42vent:server');

// SECTION: 포트 연결 및 서버 세팅

// 환경변수에서 port 받아서 express 에 저장
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// HTTP 서버 생성
const server = http.createServer(app);

// 포트 listen
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// SECTION: 함수 정의

// 포트 인자 number || string || false 로 분류
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // 포트 번호
    return port;
  }

  return false;
}

// HTTP 서버 listener
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debugServer(`Listening on ${bind}`);
}

// HTTP 서버 에러 발생 시 listener
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = `Pipe ${port}`;

  // 에러 메시지
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
