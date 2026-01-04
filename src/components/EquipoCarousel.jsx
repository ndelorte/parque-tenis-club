import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'


const equipos = [
  { id: 1, nombre: 'Liga Intercountry Damas +25 Primera', foto: '/inter+25p.jpeg' },
  { id: 2, nombre: 'Liga Intercountry Damas +25 Tercera', foto: '/inter+25t.jpeg' },
  { id: 3, nombre: 'Liga Intercountry Caballeros +40', foto: '/inter+40c.jpeg' },
  { id: 4, nombre: 'Interclubes Club de Veteranas Damas +40', foto: '/equipoveteranas.jpeg' },
  { id: 5, nombre: 'Interclubes Club de Veteranas Damas +50', foto: '/veteranas+50.jpeg' },
  { id: 6, nombre: 'Copa Amistad Mixto +14 A', foto: '/+14am.jpeg' },
  { id: 7, nombre: 'Copa Amistad Damas +14 A', foto: '/+14ad.jpeg' },
  { id: 8, nombre: 'Copa Amistad Caballeros +14 A', foto: '/+14ac.jpeg' },
  { id: 9, nombre: 'Copa Amistad Caballeros +14 B1', foto: '/+14b1c.jpeg' },
  { id: 10, nombre: 'Copa Amistad Damas +25 B1', foto: '/+25b1d.jpeg' },
  { id: 11, nombre: 'Copa Amistad Damas +25 B2', foto: '/+25b2d.jpeg' },
  { id: 12, nombre: 'Copa Amistad Damas +25 B2', foto: '/+50ds.jpeg' },
  { id: 13, nombre: 'Copa Amistad Caballeros +30 B1', foto: '/+30b1c.jpeg' },
  { id: 14, nombre: 'Copa Amistad Caballeros +30 B2', foto: '/+30b2c.jpeg' },
  { id: 15, nombre: 'Copa Amistad Mixto +30 B1', foto: '/+30b1m.jpeg' },
  { id: 16, nombre: 'Copa Amistad Damas +40 A FS', foto: '/+50ds.jpeg' },//
  { id: 17, nombre: 'Copa Amistad Damas +40 A DS', foto: '/+40ads.jpeg' },
  { id: 18, nombre: 'Copa Amistad Damas +40 A DS', foto: '/+40ads2.jpeg' },
  { id: 19, nombre: 'Copa Amistad Caballeros +40 B2', foto: '/+40b2c.jpeg' },//
  { id: 20, nombre: 'Copa Amistad Damas +50 A', foto: '/+50ads.jpeg' },

]

export default function EquipoCarousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
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