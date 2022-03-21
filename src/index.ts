import app from './app.js';
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.clear();
  console.info(`API Running on: ${port} ============================`);
});
