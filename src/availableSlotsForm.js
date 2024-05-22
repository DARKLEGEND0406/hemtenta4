import React, { useState } from "react";

const AvailableSlotsForm = ({ addSlot }) => {
	const [date, setDate] = useState("");
	const [status, setStatus] = useState("ledig");

	const handleSubmit = (e) => {
		e.preventDefault();
		addSlot(date, status);
		setDate("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="datetime-local"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				required
			/>
			<select
				value={status}
				onChange={(e) => setStatus(e.target.value)}
				required
			>
				<option value="ledig">Ledig</option>
				<option value="upptagen">Upptagen</option>
			</select>
			<button type="submit">Lägg till tid</button>
		</form>
	);
};

export default AvailableSlotsForm;
