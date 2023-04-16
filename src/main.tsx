import ReactDOM from 'react-dom/client'
import Game from './pages/Game'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/play" element={<Game />}/>
			</Route>
		</Routes>
	</BrowserRouter>
);