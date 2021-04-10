import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocs = express.Router();
const doc = yaml.load(fs.readFileSync(__dirname + '/backend/docs/docs.yaml', 'utf8'));

swaggerDocs.use(swaggerUi.serve, swaggerUi.setup(doc));

export default swaggerDocs;
