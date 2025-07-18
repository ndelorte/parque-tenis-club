export default function ColorCard() {
  return (
    <div className="bg-beige min-h-screen flex items-center justify-center p-8">
      <div className="bg-primary text-white rounded-xl shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Parque Tenis Club</h2>
        <p className="text-accent mb-4">
          Esta tarjeta usa tu paleta personalizada con Tailwind CSS.
        </p>
        <button className="bg-secondary text-white py-2 px-4 rounded hover:bg-accent hover:text-neutral transition">
          Ver más
        </button>
      </div>
    </div>
  );
}