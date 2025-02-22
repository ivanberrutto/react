
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';

function MyComponent({ message }) {
    const [count, setCount] = useState(0); // Declare state

    const increment = () => setCount(count + 1); // Update state

    const decrement = () => setCount(count - 1);





    const items = ['Apple', 'Banana', 'Cherry'];
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <h1>{message}</h1>
            <Form></Form>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>


    );
}

MyComponent.propTypes = {
    message: PropTypes.string,
};

function ApiMessage(){
    const [data, setData] = useState(null);

    // Llamada a una API cuando el componente se monta
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setData(data));
    }, []); // El arreglo vacío significa que solo se ejecuta una vez al montar el componente

    return(
        <div>
            <h1>Fetched Data</h1>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    )
}

function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Name: ${name}, Email: ${email}`);
    };
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Actualiza el estado con el valor del input
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <div>
                {isLoggedIn ? (
                    <p>Welcome back, user!</p>
                ) : (
                    <button onClick={() => setIsLoggedIn(true)}>Log in</button>
                )}
            </div>

        </div>

    );
}


function Card({title, content}) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
}

export default MyComponent;
export { Card , Form };