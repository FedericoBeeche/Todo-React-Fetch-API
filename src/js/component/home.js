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
		}
	};
	// function para borrar tareas
	const deleteTask = id => {
		task.splice(id, 1);
		setTask([...task]);
		setCount(count - 1);
	};
	// aqui recibo el API y se ve en la consola, ahora tengo que seguir con https://www.youtube.com/watch?v=27f3B1qndW8 y ademas seguir las instrucciones de la tarea
	const getApi = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user")
			.then(response => response.json())
			.then(json => console.log(json));
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
			<button onClick={getApi}>Get API</button>
		</div>
	);
}

///// HINT CODE FROM THE LESSON /////
// fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
//       method: "PUT",
//       body: JSON.stringify(todos),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     .then(resp => {
//         console.log(resp.ok); // will be true if the response is successfull
//         console.log(resp.status); // the status code = 200 or code = 400 etc.
//         console.log(resp.text()); // will try return the exact result as string
//         return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
//     })
//     .then(data => {
//         //here is were your code should start after the fetch finishes
//         console.log(data); //this will print on the console the exact object received from the server
//     })
//     .catch(error => {
//         //error handling
//         console.log(error);
//     });
