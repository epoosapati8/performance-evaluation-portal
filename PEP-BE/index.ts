import App from './src/providers/app';
import * as path from 'path';
import * as express from 'express';
const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
App.loadDatabase();
App.loadServer();