
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import useCounter from "../hooks/useCounter.jsx";
import styled from "styled-components";
import axios from "axios";
import useSWR from "swr";

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
    const fetcher = (url) => axios.get(url).then((res) => res.data);
    const { data, error, isLoading } = useSWR(
        "https://jsonplaceholder.typicode.com/posts",
        fetcher
    );

    if (isLoading) return <p>🔄 Loading...</p>;
    if (error) return <p>❌ Error</p>;

    return (
        <div>
            <h2>Posts</h2>
            {data.map((post) => (
                <p key={post.id}>{post.title}</p>
            ))}
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