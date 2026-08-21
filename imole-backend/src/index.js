require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const challengeRoutes = require('./routes/challenge');
const profileRoutes = require('./routes/profile');
const askRoutes = require('./routes/ask');
const parentRoutes = require('./routes/parent');
const schoolRoutes = require('./routes/school');
const audioRoutes = require('./routes/audio');
const memoryRoutes = require('./routes/memory');
const leaderboardRoutes = require('./routes/leaderboard');
const aiRoutes = require('./routes/ai');
const docsRoutes = require('./routes/docs');
const { initSchema } = require('./db');

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(
  cors(process.env.FRONTEND_ORIGIN ? { origin: process.env.FRONTEND_ORIGIN } : undefined),
);
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use(rateLimiter);

app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/docs', docsRoutes);
app.use('/ai', aiRoutes);

app.use('/auth', authRoutes);
app.use('/challenge', challengeRoutes);
app.use('/profile', profileRoutes);
app.use('/ask', askRoutes);
app.use('/parent', parentRoutes);
app.use('/school', schoolRoutes);
app.use('/audio', audioRoutes);
app.use('/memory', memoryRoutes);
app.use('/leaderboard', leaderboardRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  initSchema()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`\n  Imole API ready on http://localhost:${PORT}\n`);
      });
    })
    .catch((err) => {
      console.error('Failed to initialize database:', err.message);
      process.exit(1);
    });
}

module.exports = app;
