
import './App.css'
import MyComponent from './components/MyComponent';
import { Card } from './components/MyComponent';

function App() {
    return (
        <div>
            <MyComponent message="Hello from App!" />
            <Card title="Hello from App!" content="leo cagon" />
        </div>
    );
}

export default App;
