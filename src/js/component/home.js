import React, { useState, useEffect } from "react";

export function ToDo() {
	const [userInput, setUserInput] = useState(""); //input del user
	const [task, setTask] = useState([]); //array donde guardo el input del user - mas abajo le meto el input del user
	//const [count, setCount] = useState(0); contador de tasks pendientes - empieza en 3 porque ya hay 3 tasks guardados en el array

	// aqui le meto el input del user al array
	const handleInfo = () => {
		if (userInput != "") {
			let newArray = [...task, { label: userInput, done: true }];
			setTask(newArray);
			setUserInput("");
			updateList();
			// setCount(count + 1);
		}
	};
	// function para borrar tareas
	const deleteTask = id => {
		task.splice(id, 1);
		setTask([...task]);
		updateList();
		// if (flag) {
		// obtenerInfo();
		// }
		// setCount(count - 1);
	};

	useEffect(() => {
		obtenerInfo();
	}, []);
	const obtenerInfo = async () => {
		await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			}
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(miJson) {
				setTask(miJson);
			});
	};

	let url = "https://assets.breatheco.de/apis/fake/todos/user/FedericoBeeche";
	let info = {
		method: "PUT",
		body: JSON.stringify(task),
		headers: {
			"Content-Type": "application/json"
		}
	};

	// let flag = false;
	const updateList = async () => {
		await fetch(url, info)
			.then(resp => {
				if (resp.status >= 200 && resp.status < 300) {
					console.log("Todo va super");
					// flag = true;
					return resp.json();
				} else {
					console.log(
						`Oh no! Hubo el siguiente error: ${resp.status}!`
					);
				}
			})
			.then(body => {
				console.log("Esta es la info que recibimos", body);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<div className="card" id="mainCard">
			<h1 id="header" className="card-header">
				Todo List
			</h1>
			<input
				className="mb-2 inputClass"
				type="text"
				required
				value={userInput}
				onChange={e => setUserInput(e.target.value)}
				onKeyPress={e => (e.key === "Enter" ? handleInfo() : "")}
			/>
			{task.map((final, id) => (
				<span className="card-subtitle mb-4 claseTask" key={id}>
					{final.label}
					<button id="botonDelete" onClick={() => deleteTask(id)}>
						<i className="far fa-times-circle"></i>
					</button>
				</span>
			))}
			{/* <p id="counter" className="ml-1">
				{count} item(s) left{" "}
			</p> */}
		</div>
	);
}
