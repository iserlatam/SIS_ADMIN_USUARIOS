import app from './src/app.js'

const port = process.env.SERVER_PORT;

app.listen(port, () => {
    console.log('Working at port:', port)
});
