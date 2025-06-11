import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './pages/Root';
import NoMatch from './pages/NoMatch';
import Home from './pages/Home';
import Crear from './pages/ReservasCrear';
import ReservaForm from './components/form/ReservaForm';
import HuespedForm from './components/form/HuespedForm';
import Listar from './pages/ReservasListar';
import Editar from './pages/ReservasEditar';
import ReservaDetalle from './pages/ReservaDetalle';
import HuespedDetalle from './pages/HuespedDetalle';
import CreationModeSelection from './components/form/CreationModeSelection';

function App() {
    const subroutes = (
        <>
            <Route index element={<CreationModeSelection />} />
            <Route path="reserva" element={<ReservaForm />} />
            <Route path="huespedes" element={<HuespedForm />} />
        </>
    );
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />}>
                    <Route index element={<Home />} />
                    <Route path="crear" element={<Crear />}>
                        {subroutes}
                    </Route>
                    <Route path="editar/:id" element={<Editar />}>
                        {subroutes}
                    </Route>
                    <Route path="listar" element={<Listar />} />
                    <Route
                        path="listar/reserva/:id"
                        element={<ReservaDetalle />}
                    />
                    <Route
                        path="listar/reserva/:id/huesped/:idHuesped"
                        element={<HuespedDetalle />}
                    />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
