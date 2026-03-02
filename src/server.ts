import { app } from './app';
import { logger } from './logger';

const port = Number(process.env.PORT) || 3000;

app.listen(port, '0.0.0.0', () => {
  logger.info(`md-to-docs service listening on port ${port}`);
});
