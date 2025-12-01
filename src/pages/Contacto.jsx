// Contacto.jsx
"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, Instagram } from 'lucide-react'

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)

    // Crear el mailto link con los datos del formulario
    const subject = encodeURIComponent(`[Web PTC] ${formData.asunto}`)
    const body = encodeURIComponent(
      `Nombre: ${formData.nombre}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\n\nMensaje:\n${formData.mensaje}`,
    )

    window.location.href = `mailto:parquetenisclub23@gmail.com?subject=${subject}&body=${body}`

    setEnviando(false)
    setEnviado(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setEnviado(false)
      setFormData({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2d4a35] to-[#1a2e1f] text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Estamos para ayudarte. Escribinos por cualquier consulta sobre el club, entrenamientos, torneos o alquiler
            de canchas.
          </p>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Columna Izquierda - Info de Contacto */}
            <div className="space-y-8">
              {/* Tarjeta de Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-[#2d4a35] mb-6">Información del Club</h2>

                <div className="space-y-6">
                  {/* Dirección */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2d4a35]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#2d4a35]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Dirección</h3>
                      <p className="text-gray-600">Primera Junta 726, Quilmes</p>
                      <p className="text-gray-500 text-sm">Buenos Aires, Argentina</p>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2d4a35]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#2d4a35]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Teléfono</h3>
                      <a href="tel:+5491157287851" className="text-[#2d4a35] hover:text-[#c4632a] transition">
                        11 5728-7851
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2d4a35]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#2d4a35]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <a
                        href="mailto:parquetenisclub23@gmail.com"
                        className="text-[#2d4a35] hover:text-[#c4632a] transition break-all"
                      >
                        parquetenisclub23@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Horarios */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2d4a35]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#2d4a35]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Horarios</h3>
                      <p className="text-gray-600">Lunes a Viernes: 8 a 24hs</p>
                      <p className="text-gray-600">Sábados y Domingos: 8 a 20hs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta de Instagram */}
              <a
                href="https://www.instagram.com/parquetenisclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] rounded-2xl shadow-lg p-8 text-white hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Instagram className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Seguinos en Instagram</p>
                    <h3 className="text-2xl font-bold">@parquetenisclub</h3>
                  </div>
                </div>
                <p className="text-white/90">
                  Enterate de todas las novedades, fotos de torneos y actividades del club.
                </p>
              </a>

              {/* Mapa */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.1247322578806!2d-58.240086!3d-34.7272502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32e5223b0926f%3A0x468799f47d90418a!2sParque%20Tenis!5e0!3m2!1ses!2sar!4v1753202958638!5m2!1ses!2sar"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Parque Tenis Club"
                />
              </div>
            </div>

            {/* Columna Derecha - Formulario */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#2d4a35] mb-2">Envianos un mensaje</h2>
              <p className="text-gray-600 mb-8">Completá el formulario y te responderemos a la brevedad.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a35] focus:border-transparent transition outline-none"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email y Teléfono */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a35] focus:border-transparent transition outline-none"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a35] focus:border-transparent transition outline-none"
                      placeholder="11 1234-5678"
                    />
                  </div>
                </div>

                {/* Asunto */}
                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-2">
                    Asunto *
                  </label>
                  <select
                    id="asunto"
                    required
                    value={formData.asunto}
                    onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a35] focus:border-transparent transition outline-none bg-white"
                  >
                    <option value="">Seleccioná un asunto</option>
                    <option value="Consulta general">Consulta general</option>
                    <option value="Entrenamientos">Entrenamientos / Escuelita</option>
                    <option value="Alquiler de canchas">Alquiler de canchas</option>
                    <option value="Torneos">Torneos / Competencias</option>
                    <option value="Liga">Liga de Verano/Invierno</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    required
                    rows={5}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a35] focus:border-transparent transition outline-none resize-none"
                    placeholder="Escribí tu mensaje acá..."
                  />
                </div>

                {/* Botón Enviar */}
                <button
                  type="submit"
                  disabled={enviando}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-semibold text-white transition ${
                    enviado ? "bg-green-600" : "bg-[#c4632a] hover:bg-[#a85220]"
                  } disabled:opacity-70`}
                >
                  {enviando ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : enviado ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Se abrió tu cliente de email
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar mensaje
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Al hacer clic se abrirá tu aplicación de correo con el mensaje pre-cargado.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}