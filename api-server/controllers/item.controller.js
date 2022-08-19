const db = require('../models');
const Item = db.Items;

// Create and Save a new Item
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).json({ message: 'Content can not be empty!' });
		return;
	}

	// Create an Item
	const item = new Item({
		name: req.body.name,
		category: req.body.category,
		amount: req.body.amount,
		price: req.body.price,
		bought: !!req.body.bought,
	});

	// Save an Item in the database
	item.save()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message || 'Some errors occurred while creating this item',
			});
		});
};

// Retrieve all Items from the database.
exports.findAll = (req, res) => {
	const name = req.query.name;
	var condition = name ? { name: { $regex: new RegExp(name), $options: 'i' } } : {};

	Item.find(condition)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message || 'Some errors occurred while retrieving the items.',
			});
		});
};

// Find a single Item with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Item.findById(id)
		.then((data) => {
			if (!data) res.status(404).json({ message: 'Not found Item with id ' + id });
			else res.json(data);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error retrieving Item with id=' + id });
		});
};

// Update an Item by the id in the request
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).json({
			message: 'Data to update cannot be empty!',
		});
	}

	const id = req.params.id;

	Item.findByIdAndUpdate(id, req.body)
		.then((data) => {
			if (!data) {
				res.status(404).json({
					message: `Cannot update Item with id=${id}. Maybe Item was not found!`,
				});
			} else res.json({ message: 'Item was updated successfully.' });
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Error updating Item with id=' + id,
			});
		});
};

// Delete an Item with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Item.findByIdAndRemove(id, { useFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).json({
					message: `Cannot delete Item with id=${id}. Maybe Item was not found!`,
				});
			} else {
				res.json({
					message: 'Item was deleted successfully!',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Could not delete Item with id=' + id,
			});
		});
};

// Delete all Items from the database.
exports.deleteAll = (req, res) => {
	Item.deleteMany({})
		.then((data) => {
			res.json({
				message: `${data.deletedCount} All Items were deleted successfully!`,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message || 'Some errors occurred while removing all items.',
			});
		});
};

// Find all Bought Items
exports.findAllBought = (req, res) => {
	Item.find({ registered: true })
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message || 'Some errors occurred while retrieving all bought items.',
			});
		});
};
