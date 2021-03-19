import React, { useState } from "react";

export function ToDo() {
	const [userInput, setUserInput] = useState(""); //input del user
	const [task, setTask] = useState([
		"Comer",
		"Estudiar",
		"Hacer bien mis tareas de React"
	]); //array donde guardo el input del user - mas abajo le meto el input del user
	const [count, setCount] = useState(3); //contador de tasks pendientes - empieza en 3 porque ya hay 3 tasks guardados en el array

	// aqui le meto el input del user al array
	const handleInfo = () => {
		if (userInput != "") {
			let newArray = [...task, userInput];
			setTask(newArray);
			setUserInput("");
			setCount(count + 1);
			updateList(task); //aqui actualizo la lista con la funcion del fetch.
		}
	};
	// function para borrar tareas
	const deleteTask = id => {
		task.splice(id, 1);
		setTask([...task]);
		setCount(count - 1);
	};

	///// codigo del ejercicio /////
	const updateList = () => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/FedericoBeeche",
			{
				method: "PUT",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
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
					{final}
					<button id="botonDelete" onClick={() => deleteTask(id)}>
						<i className="far fa-times-circle"></i>
					</button>
				</span>
			))}
			<p id="counter" className="ml-1">
				{count} item(s) left{" "}
			</p>
		</div>
	);
}

// ///// sacar el API y meterlo a la consola /////
// // aqui recibo el API y se ve en la consola, ahora tengo que seguir con https://www.youtube.com/watch?v=27f3B1qndW8 y ademas seguir las instrucciones de la tarea
// const getApi = () => {
// 	fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr")
// 		.then(response => response.json())
// 		.then(json => console.log(json));
// };

// <button onClick={getApi}>Get API</button>;
