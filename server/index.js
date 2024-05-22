const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyParser.json());

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "Hemtenta4",
});

connection.connect((err) => {
	if (err) {
		console.error("Error connecting to the database:", err.stack);
		return;
	}
	console.log("Connected to database");
});

app.put("/availability", (req, res) => {
	const { status } = req.body;
	console.log("Received status:", status); // Logga statusen som tas emot
	connection.query(
		"UPDATE StatusTable SET status = ? WHERE id = 1",
		[status],
		(error, results) => {
			if (error) {
				console.error("Error updating status:", error.stack);
				res.status(500).json({ error: "Något gick fel" });
				return;
			}
			res.json({ message: "Status updated successfully" });
		},
	);
});

// Uppdatera och hämta status
app
	.route("/availability")
	.get((req, res) => {
		connection.query(
			"SELECT status FROM StatusTable WHERE id = 1",
			(error, results) => {
				if (error) {
					console.error("Error fetching status:", error.stack);
					res.status(500).json({ error: "Något gick fel" });
					return;
				}
				res.json({ status: results[0].status });
			},
		);
	})
	.put((req, res) => {
		const { status } = req.body;
		connection.query(
			"UPDATE StatusTable SET status = ? WHERE id = 1",
			[status],
			(error, results) => {
				if (error) {
					console.error("Error updating status:", error.stack);
					res.status(500).json({ error: "Något gick fel" });
					return;
				}
				res.json({ message: "Status updated successfully" });
			},
		);
	});

// Fetch available slots
app.get("/available-slots", (req, res) => {
	connection.query(
		'SELECT * FROM AvailableSlots WHERE status = "ledig"',
		(error, results) => {
			if (error) {
				console.error("Error fetching available slots:", error.stack);
				res.status(500).json({ error: "Något gick fel" });
				return;
			}
			res.json(results);
		},
	);
});

app.post("/available-slots", (req, res) => {
	const { start_time, end_time, status } = req.body;
	const formattedStartTime = new Date(start_time)
		.toISOString()
		.slice(0, 19)
		.replace("T", " ");
	const formattedEndTime = new Date(end_time)
		.toISOString()
		.slice(0, 19)
		.replace("T", " ");
	connection.query(
		"INSERT INTO AvailableSlots (start_time, end_time, status) VALUES (?, ?, ?)",
		[formattedStartTime, formattedEndTime, status],
		(error, results) => {
			if (error) {
				console.error("Error adding available slot:", error.stack);
				res.status(500).json({ error: "Något gick fel" });
				return;
			}
			res.json(results);
		},
	);
});

// Book a slot
app.post("/book-slot", (req, res) => {
	const {
		start_time,
		end_time,
		customer_name,
		customer_email,
		customer_phone,
	} = req.body;
	connection.beginTransaction((err) => {
		if (err) {
			res.status(500).json({ error: "Transaction error" });
			return;
		}
		connection.query(
			'UPDATE AvailableSlots SET status = "upptagen" WHERE start_time = ? AND end_time = ?',
			[start_time, end_time],
			(error, results) => {
				if (error) {
					return connection.rollback(() => {
						console.error("Error booking slot:", error.stack);
						res.status(500).json({ error: "Något gick fel" });
					});
				}
				connection.query(
					"INSERT INTO BookedSlots (start_time, end_time, customer_name, customer_email, customer_phone) VALUES (?, ?, ?, ?, ?)",
					[start_time, end_time, customer_name, customer_email, customer_phone],
					(error, results) => {
						if (error) {
							return connection.rollback(() => {
								console.error("Error inserting booked slot:", error.stack);
								res.status(500).json({ error: "Något gick fel" });
							});
						}
						connection.commit((err) => {
							if (err) {
								return connection.rollback(() => {
									console.error("Transaction commit error:", err.stack);
									res.status(500).json({ error: "Något gick fel" });
								});
							}
							res.json(results);
						});
					},
				);
			},
		);
	});
});

// Fetch booked slots
app.get("/booked-slots", (req, res) => {
	connection.query("SELECT * FROM BookedSlots", (error, results) => {
		if (error) {
			console.error("Error fetching booked slots:", error.stack);
			res.status(500).json({ error: "Något gick fel" });
			return;
		}
		res.json(results);
	});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
