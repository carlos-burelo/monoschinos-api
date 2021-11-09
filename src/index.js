import app from './app.js';

app.listen(process.env.PORT || 5000, () => {
  console.clear();
  console.info(`API Running on: 5000 ============================`);
});
