import express from 'express';
import dns from 'node:dns/promises';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import shopsRouter from './routes/shopsRoutes.js';

dns.setServers(['1.1.1.1']);

const app = express();

app.use(logger);
app.use(express.json({ limit: '5mb' }));
app.use(cors({ methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] }));
app.use(helmet());

app.use('/api', shopsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const startApp = async () => {
  try {
    await connectMongoDB();

    const PORT = process.env.PORT || 3030;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start the application:', error);
    process.exit(1);
  }
};

startApp();
