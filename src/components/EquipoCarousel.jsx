import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const equipos = [
  { id: 1, nombre: 'Copa Amistad +14 A Caballeros', foto: '/equipo14cab.jpg' },
  { id: 2, nombre: 'Copa Amistad +14 A Damas', foto: '/equipo14damas.jpg' },
  { id: 3, nombre: 'Copa Amistad +25 B1 Damas', foto: '/equipo25damas.jpg' },
  { id: 4, nombre: 'Copa Amistad +25 B2 Damas', foto: '/equipo25damas2.jpg' },
  { id: 5, nombre: 'Intercountry +45 Caballeros', foto: '/equipointercab.jpg' },
  { id: 6, nombre: 'Torneo de Veteranas', foto: '/equipoveteranas.jpg' },
  
]

export default function EquipoCarousel() {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      loop
      className="pb-10"
    >
      {equipos.map((e) => (
        <SwiperSlide key={e.id}>
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <img
              src={e.foto}
              alt={e.nombre}
              className="w-full h-56 object-cover"
            />
            <div className="p-3 text-center">
              <h3 className="text-lg font-semibold text-primary">{e.nombre}</h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}