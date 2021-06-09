const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).send(err.message || 'Internal server error');
	console.error(err);
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Time to get cracking!');
});
