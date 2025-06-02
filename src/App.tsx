import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />}>
                    <Route index element={<Home />} />
                    <Route path="/crear" element={<Crear />}>
                        <Route
                            index
                            element={<Navigate to="reserva" replace />}
                        />
                        <Route path="reserva" element={<ReservaForm />} />
                        <Route path="huespedes" element={<HuespedForm />} />
                    </Route>
                    <Route path="/listar/" element={<Listar />} />
                    <Route
                        path="/listar/reserva/:id"
                        element={<ReservaDetalle />}
                    />
                    <Route
                        path="/listar/reserva/:id/huesped/:IDHuesped"
                        element={<HuespedDetalle />}
                    />
                    <Route path="/editar/:id" element={<Editar />}>
                        <Route
                            index
                            element={<Navigate to="reserva" replace />}
                        />
                        <Route path="reserva" element={<ReservaForm />} />
                        <Route path="huespedes" element={<HuespedForm />} />
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
