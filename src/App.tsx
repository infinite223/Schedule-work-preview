import Background from './components/Background';
import Content from './components/Content';
import Nav from './components/Nav';
import './styles/appStyles.scss'

function App() {
  return (
    <div className="App" style={{position:'relative'}}>
      <Nav/>
      <Content/>
      <Background/>
    </div>
  );
}

export default App;
