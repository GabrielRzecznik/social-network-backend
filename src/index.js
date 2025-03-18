import express from 'express';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.routes.js';
import PostRoutes from './routes/post.routes.js';
import FollowRoutes from './routes/follow.routes.js';
import MessageRoutes from './routes/message.routes.js';
import ChatRoutes from './routes/chat.routes.js';
import CommentRoutes from './routes/comment.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

app.use('/api/user', UserRoutes);
app.use('/api/post', PostRoutes);
app.use('/api/follow', FollowRoutes);
app.use('/api/message', MessageRoutes);
app.use('/api/chat', ChatRoutes);
app.use('/api/comment', CommentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});