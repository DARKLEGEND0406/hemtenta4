import React, { useState, useEffect } from "react";
import AvailableSlotsForm from "./availableSlotsForm";
import BookedSlotsList from "./bookedSlotsList";
import axios from "axios";

const Admin = () => {
	const [availableSlots, setAvailableSlots] = useState([]);
	const [bookedSlots, setBookedSlots] = useState([]);
	const [status, setStatus] = useState("");

	useEffect(() => {
		fetchAvailableSlots();
		fetchBookedSlots();
		fetchStatus();
	}, []);

	const fetchAvailableSlots = () => {
		axios
			.get("/available-slots")
			.then((response) => {
				const availableSlots = response.data;

				axios
					.get("/booked-slots")
					.then((response) => {
						const bookedSlots = response.data.map((slot) => slot.date);
						const filteredAvailableSlots = availableSlots.filter(
							(slot) => !bookedSlots.includes(slot.date),
						);
						setAvailableSlots(filteredAvailableSlots);
					})
					.catch((error) => {
						console.error("Error fetching booked slots:", error);
					});
			})
			.catch((error) => {
				console.error("Error fetching available slots:", error);
			});
	};

	const fetchBookedSlots = () => {
		axios
			.get("/booked-slots")
			.then((response) => {
				setBookedSlots(response.data);
			})
			.catch((error) => {
				console.error("Error fetching booked slots:", error);
			});
	};

	const fetchStatus = () => {
		axios
			.get("/availability")
			.then((response) => {
				setStatus(response.data.status);
			})
			.catch((error) => {
				console.error("Error fetching availability:", error);
			});
	};

	const changeStatus = () => {
		const newStatus = status === "ledig" ? "upptagen" : "ledig";
		console.log("Changing status to:", newStatus); // Logga den nya statusen
		axios
			.put("/availability", { status: newStatus })
			.then((response) => {
				setStatus(newStatus);
			})
			.catch((error) => {
				console.error("Error updating availability:", error);
			});
	};

	const addSlot = (date, status) => {
		axios
			.post("/available-slots", { start_time: date, end_time: date, status })
			.then((response) => {
				fetchAvailableSlots();
			})
			.catch((error) => {
				console.error("Error adding slot:", error);
			});
	};

	return (
		<div>
			<h1>Admin</h1>
			<AvailableSlotsForm addSlot={addSlot} />
			<BookedSlotsList bookedSlots={bookedSlots} />
		</div>
	);
};

export default Admin;
