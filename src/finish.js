import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Finish = () => {
	const location = useLocation();
	const { date } = location.state;
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		date: date,
	});

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const bookingData = {
			start_time: formData.date,
			end_time: formData.date, // Justeras om sluttid behövs
			customer_name: `${formData.firstName} ${formData.lastName}`,
			customer_email: formData.email,
			customer_phone: formData.phone,
		};

		axios
			.post("/book-slot", bookingData)
			.then((response) => {
				console.log("Booking successful:", response.data);
			})
			.catch((error) => {
				console.error("Error booking slot:", error);
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="firstName">Name</label>
				<input
					type="text"
					name="firstName"
					id="firstName"
					onChange={handleChange}
				/>
				<label htmlFor="lastName">Last name</label>
				<input
					type="text"
					name="lastName"
					id="lastName"
					onChange={handleChange}
				/>
				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" onChange={handleChange} />
				<label htmlFor="phone">Phone</label>
				<input type="text" name="phone" id="phone" onChange={handleChange} />
				<input type="submit" value="Book Time" />
			</form>
		</div>
	);
};

export default Finish;
