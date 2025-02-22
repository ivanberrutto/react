import MyComponent, {Card} from "../components/MyComponent.jsx";

function Home() {
    return (

        <div>
            <h1>Welcome to Home</h1>
            <MyComponent message="Hello from App!"/>
            <Card title="Hello from App!" content="leo cagon"/>
        </div>
    )
        ;
}

export default Home;