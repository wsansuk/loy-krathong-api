const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const { connectDatabase } = require('./config/database');
const krathongRoutes = require('./routes/krathong.routes');

const app = express();

// Middleware
app.use(cors({ origin: '*', methods: ['GET','POST'], allowedHeaders: ['Origin','Content-Type','Authorization'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (config.app.env === 'dev') app.use(morgan('dev'));

// Health check
app.get('/', (req,res)=> res.json({ message: 'Loy Krathong API 2025', version:'1.0.0', status:'running'}));

// Routes
app.use('/api/v1', krathongRoutes);

// 404 & error handler
app.use((req,res)=> res.status(404).json({response_code:'0404', response_message:'Route not found'}));
app.use((err,req,res,next)=> res.status(500).json({response_code:'0500', response_message:'Internal server error'}));

// For Vercel serverless
if (process.env.VERCEL) {
  connectDatabase().catch(console.error);
  module.exports = (req,res) => app(req,res);
} else {
  // Local dev
  const startServer = async () => {
    try {
      await connectDatabase();
      const PORT = config.app.port;
      app.listen(PORT,()=> console.log(`Server running on port ${PORT}, env: ${config.app.env}`));
    } catch (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
  };
  startServer();
}
