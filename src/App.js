import './App.css';
import HeaderBar from './components/HeaderBar';
import SideBar from './components/SideBar';

export default function App()
{
    return (
        <div className="App">
            <HeaderBar />            
            <main className='page-container'>
                <SideBar />
            </main>
        </div>
    );
}