import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

console.log(process.env);
dotenv.config();
console.log(process.env);
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // 현재 디렉토리 주소 __dirname 에 저장
const mod = {
  mode: process.env.NODE_ENV,
  entry: {
    index: './src/javascripts/entry/index.js',
    eventList: './src/javascripts/entry/eventList.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: '[name]_bundle.js',
  },
};
export default mod;
