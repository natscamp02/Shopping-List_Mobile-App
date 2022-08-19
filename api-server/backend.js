const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');

const PORT = process.env.PORT || 4000;

const itemRoute = require('./routes/item.route');
const categoryRoute = require('./routes/category.route');

var corsOptions = {
	origin: ['http://localhost:4200', 'http://localhost:8100'],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to the database!');
	})
	.catch((err) => {
		console.log('Cannot connect to the database!', err);
		process.exit();
	});

// Setting Route middleware
app.use('/api/v1/items', itemRoute);
app.use('/api/v1/categories', categoryRoute);

// set port, listen for requests
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
