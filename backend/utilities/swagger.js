import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';

const swaggerDocs = express.Router();
const doc = yaml.load(fs.readFileSync('./docs/docs.yaml', 'utf8'));

swaggerDocs.use(swaggerUi.serve, swaggerUi.setup(doc));

export default swaggerDocs;
