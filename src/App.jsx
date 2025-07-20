import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Torneo from './pages/Torneo.jsx';
import Contacto from './pages/Contacto.jsx';



function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="torneo" element={<Torneo />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>
    </Routes>
  {/*boton wsp */}
    <a
  href="https://wa.me/5491157287851?text=Hola!%20Quiero%20informacion&20sobre&20"
  className="fixed bottom-6 right-6 z-50"
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src="/wsp3.png"
    alt="WhatsApp"
    className="w-14 h-14 shadow-2xl hover:scale-110 transition-transform duration-300"
    />
</a>
</>
  );
}

export default App;
