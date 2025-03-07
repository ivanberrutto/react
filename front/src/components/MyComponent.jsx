
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import useCounter from "../hooks/useCounter.jsx";
import styled from "styled-components";
import axios from "axios";
import process from "prop-types/prop-types.js";

const Button = styled.button`
  background: blue;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: darkblue;
  }
`;

function MyComponent({ message }) {
    const { count, increment, decrement, reset } = useCounter();




    const items = ['Apple', 'Banana', 'Cherry'];
    return (
        <div>
            <p>Count: {count}</p>
            <Button onClick={increment}>Increment</Button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
            <h1>{message}</h1>
            <Form></Form>
            <ApiMessage></ApiMessage>
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
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = 'Bearer AAAAAAAAAAAAAAAAAAAAAIsMzgEAAAAAAOu%2FjItvgHU3JQ42zG6Gh7IMFfg%3DM83PDVfw3gOJ3Fa02T46gT1c2kVi8YmIaTQ4oiS7iBGYh4ZlPG';

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await axios.get(
                    'https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/tweets/search/recent?query=reactjs&max_results=10',
                    {
                        headers: {
                            Authorization: token, // Reemplaza con tu Bearer Token
                        },
                    }
                );

                setTweets(response.data.data); // Guarda los tweets en el estado
                setLoading(false); // Indica que la carga ha terminado
            } catch (error) {
                console.log('Límite total:', error.response.headers['x-rate-limit-limit']);
                console.log('Solicitudes restantes:', error.response.headers['x-rate-limit-remaining']);
                console.log('Tiempo de reinicio:', error.response.headers['x-rate-limit-reset']);
                setError(error); // Guarda el error en el estado
                setLoading(false); // Indica que la carga ha terminado
                console.error('Error al obtener tweets:', error);
            }
        };

        fetchTweets();
    }, []);

    if (loading) {
        return <p>Cargando tweets...</p>;
    }

    if (error) {
        return <p>Error al cargar los tweets: {error.message}</p>;
    }

    return (
        <div>
            <h1>Tweets recientes sobre ReactJS</h1>
            <ul>
                {tweets.map(tweet => (
                    <li key={tweet.id}>{tweet.text}</li>
                ))}
            </ul>
        </div>
    );
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