import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, "../.env") })

console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✓ Cargada" : "✗ No encontrada")

import Team from "../models/team.js"
import Match from "../models/Match.js"

const equiposPorCategoria = {
  caballeros_a: [
    "Extraordinario equipo",
    "Hay equipo",
    "Fincas de Iraola 2",
    "Los de siempre",
    "Desconocidos",
    "Los Arizu",
    "Parque tenis",
    "Los pibes del super",
  ],
  caballeros_b: [
    "Team Goat",
    "Finito Tenis Club",
    "Mostrame el pique",
    "Los muchachos",
    "Prado Kai",
    "Team Torres",
    "Truchon",
  ],
  damas_a: [
    "Gin Tonic",
    "Fifteen love",
    "No es ese el pique",
    "Ducilo",
    "Say no more",
    "Cooperarios Damas",
    "El rejunte",
  ],
  damas_b: [
    "Hudson Tenis",
    "Juan Carlas Tennis Club",
    "Las liebres",
    "Bikinipoen",
    "Las Old G",
    "Old Georgian",
    "Dream team",
    "La red de amigas",
  ],
  mixto_a: ["Cande y Co", "Mezcladito", "Parque Mixto", "After Set", "C toma team", "Matrimonios y algo mas"],
  mixto_b: ["C toma team", "Five Star Team", "Saque y red", "Doble Falta"],
}

const fixturesPorCategoria = {
  caballeros_a: [
    {
      instancia: "Fecha 1",
      fecha: "1-12-2025",
      horario: "21:00",
      local: "Extraordinario equipo",
      visitante: "Fincas de Iraola 2",
    },
    { instancia: "Fecha 1", fecha: "3-12-2025", horario: "21:00", local: "Hay equipo", visitante: "Los de siempre" },
    { instancia: "Fecha 1", fecha: "5-12-2025", horario: "21:00", local: "Desconocidos", visitante: "Parque tenis" },
    {
      instancia: "Fecha 1",
      fecha: "5-12-2025",
      horario: "14:00",
      local: "Los Arizu",
      visitante: "Los pibes del super",
    },
    {
      instancia: "Fecha 2",
      fecha: "19-12-2025",
      horario: "14:00",
      local: "Extraordinario equipo",
      visitante: "Los de siempre",
    },
    {
      instancia: "Fecha 2",
      fecha: "20-12-2025",
      horario: "21:00",
      local: "Los pibes del super",
      visitante: "Fincas de Iraola 2",
    },
    { instancia: "Fecha 2", fecha: "21-12-2025", horario: "21:00", local: "Hay equipo", visitante: "Parque tenis" },
    { instancia: "Fecha 2", fecha: "22-12-2025", horario: "21:00", local: "Los Arizu", visitante: "Desconocidos" },
    {
      instancia: "Fecha 3",
      fecha: "5-01-2026",
      horario: "14:00",
      local: "Extraordinario equipo",
      visitante: "Los pibes del super",
    },
    { instancia: "Fecha 3", fecha: "7-01-2026", horario: "21:00", local: "Hay equipo", visitante: "Los Arizu" },
    { instancia: "Fecha 3", fecha: "8-01-2026", horario: "21:00", local: "Parque tenis", visitante: "Los de siempre" },
    {
      instancia: "Fecha 3",
      fecha: "8-01-2026",
      horario: "14:00",
      local: "Desconocidos",
      visitante: "Fincas de Iraola 2",
    },
    {
      instancia: "Fecha 4",
      fecha: "14-01-2026",
      horario: "21:00",
      local: "Extraordinario equipo",
      visitante: "Los Arizu",
    },
    {
      instancia: "Fecha 4",
      fecha: "16-01-2026",
      horario: "21:00",
      local: "Los pibes del super",
      visitante: "Fincas de Iraola 2",
    },
    { instancia: "Fecha 4", fecha: "17-01-2026", horario: "14:00", local: "Hay equipo", visitante: "Desconocidos" },
    {
      instancia: "Fecha 4",
      fecha: "26-01-2026",
      horario: "21:00",
      local: "Extraordinario equipo",
      visitante: "Desconocidos",
    },
    {
      instancia: "Fecha 5",
      fecha: "27-01-2026",
      horario: "21:00",
      local: "Los pibes del super",
      visitante: "Los de siempre",
    },
    { instancia: "Fecha 5", fecha: "29-01-2026", horario: "21:00", local: "Los Arizu", visitante: "Hay equipo" },
    {
      instancia: "Fecha 5",
      fecha: "31-01-2026",
      horario: "14:00",
      local: "Extraordinario equipo",
      visitante: "Hay equipo",
    },
    { instancia: "Fecha 6", fecha: "11-02-2026", horario: "21:00", local: "Desconocidos", visitante: "Hay equipo" },
    {
      instancia: "Fecha 6",
      fecha: "11-02-2026",
      horario: "21:00",
      local: "Parque tenis",
      visitante: "Fincas de Iraola 2",
    },
    {
      instancia: "Fecha 6",
      fecha: "18-02-2026",
      horario: "14:00",
      local: "Los pibes del super",
      visitante: "Los de siempre",
    },
    { instancia: "Fecha 7", fecha: "18-02-2026", horario: "21:00", local: "Los Arizu", visitante: "Hay equipo" },
    {
      instancia: "Fecha 7",
      fecha: "19-02-2026",
      horario: "14:00",
      local: "Fincas de Iraola 2",
      visitante: "Desconocidos",
    },
    { instancia: "Fecha 7", fecha: "20-02-2026", horario: "21:00", local: "Parque tenis", visitante: "Los de siempre" },
    { instancia: "CUARTOS", fecha: "23-02-2026", horario: "21:00", local: "1ro", visitante: "8vo" },
    { instancia: "CUARTOS", fecha: "26-02-2026", horario: "21:00", local: "2do", visitante: "7mo" },
    { instancia: "CUARTOS", fecha: "27-02-2026", horario: "21:00", local: "3ro", visitante: "6to" },
    { instancia: "CUARTOS", fecha: "28-02-2026", horario: "14:00", local: "4to", visitante: "5to" },
    { instancia: "SEMIFINAL", fecha: "05-03-2026", horario: "21:00", local: "Ganador A", visitante: "Ganador C" },
    { instancia: "SEMIFINAL", fecha: "04-03-2026", horario: "21:00", local: "Ganador B", visitante: "Ganador D" },
    { instancia: "TERCER PUESTO", fecha: "07-03-2026", horario: "18:00", local: "", visitante: "" },
    { instancia: "FINAL", fecha: "08-03-2026", horario: "18:00", local: "", visitante: "" },
  ],
  caballeros_b: [
    {
      instancia: "Fecha 1",
      fecha: "2-12-2025",
      horario: "21:00",
      local: "Finito Tenis Club",
      visitante: "Team Torres",
    },
    { instancia: "Fecha 1", fecha: "8-12-2025", horario: "9:00", local: "Mostrame el pique", visitante: "Truchon" },
    { instancia: "Fecha 1", fecha: "4-12-2025", horario: "21:00", local: "Los muchachos", visitante: "Prado Kai" },
    { instancia: "Fecha 2", fecha: "26-12-2025", horario: "21:00", local: "Team Goat", visitante: "Team Torres" },
    { instancia: "Fecha 2", fecha: "28-12-2025", horario: "18:00", local: "Finito Tenis Club", visitante: "Prado Kai" },
    {
      instancia: "Fecha 2",
      fecha: "29-12-2025",
      horario: "14:00",
      local: "Mostrame el pique",
      visitante: "Los muchachos",
    },
    { instancia: "Fecha 2", fecha: "10-01-2026", horario: "21:00", local: "Team Goat", visitante: "Truchon" },
    { instancia: "Fecha 3", fecha: "09-01-2026", horario: "21:00", local: "Team Torres", visitante: "Prado Kai" },
    {
      instancia: "Fecha 3",
      fecha: "06-01-2026",
      horario: "14:00",
      local: "Finito Tenis Club",
      visitante: "Mostrame el pique",
    },
    { instancia: "Fecha 3", fecha: "19-01-2026", horario: "14:00", local: "Team Goat", visitante: "Los muchachos" },
    { instancia: "Fecha 4", fecha: "24-01-2026", horario: "14:00", local: "Los muchachos", visitante: "Truchon" },
    {
      instancia: "Fecha 4",
      fecha: "22-01-2026",
      horario: "21:00",
      local: "Team Torres",
      visitante: "Mostrame el pique",
    },
    { instancia: "Fecha 4", fecha: "30-01-2026", horario: "21:00", local: "Prado Kai", visitante: "Mostrame el pique" },
    { instancia: "Fecha 5", fecha: "31-01-2026", horario: "21:00", local: "Truchon", visitante: "Mostrame el pique" },
    { instancia: "Fecha 5", fecha: "02-02-2026", horario: "21:00", local: "Team Goat", visitante: "Finito Tenis Club" },
    {
      instancia: "Fecha 6",
      fecha: "07-02-2026",
      horario: "14:00",
      local: "Los muchachos",
      visitante: "Finito Tenis Club",
    },
    { instancia: "Fecha 6", fecha: "08-02-2026", horario: "21:00", local: "Truchon", visitante: "Team Torres" },
    { instancia: "Fecha 7", fecha: "18-02-2026", horario: "21:00", local: "Team Goat", visitante: "Finito Tenis Club" },
    { instancia: "Fecha 7", fecha: "15-02-2026", horario: "14:00", local: "Los muchachos", visitante: "Team Torres" },
    { instancia: "Fecha 7", fecha: "14-02-2026", horario: "21:00", local: "Prado Kai", visitante: "Truchon" },
    { instancia: "CUARTOS", fecha: "21-02-2026", horario: "18:00", local: "3ro", visitante: "6to" },
    { instancia: "CUARTOS", fecha: "22-02-2026", horario: "18:00", local: "4to", visitante: "5to" },
    { instancia: "SEMIFINAL", fecha: "01-03-2026", horario: "18:00", local: "1ro", visitante: "Ganador A" },
    { instancia: "SEMIFINAL", fecha: "01-03-2026", horario: "18:00", local: "2do", visitante: "Ganador B" },
    { instancia: "TERCER PUESTO", fecha: "06-03-2026", horario: "21:00", local: "", visitante: "" },
    { instancia: "FINAL", fecha: "08-03-2026", horario: "18:00", local: "", visitante: "" },
  ],
  damas_a: [
    { instancia: "Fecha 1", fecha: "6-12-2025", horario: "18:00", local: "Gin Tonic", visitante: "Fifteen love" },
    { instancia: "Fecha 1", fecha: "5-12-2025", horario: "19:30", local: "No es ese el pique", visitante: "Ducilo" },
    {
      instancia: "Fecha 1",
      fecha: "8-12-2025",
      horario: "11:00",
      local: "Say no more",
      visitante: "Cooperarios Damas",
    },
    { instancia: "Fecha 2", fecha: "23-12-2025", horario: "19:30", local: "Gin Tonic", visitante: "Ducilo" },
    {
      instancia: "Fecha 2",
      fecha: "27-12-2025",
      horario: "18:00",
      local: "Say no more",
      visitante: "No es ese el pique",
    },
    { instancia: "Fecha 2", fecha: "30-12-2025", horario: "19:30", local: "El rejunte", visitante: "Fifteen love" },
    { instancia: "Fecha 3", fecha: "11-01-2026", horario: "21:00", local: "Gin Tonic", visitante: "Say no more" },
    { instancia: "Fecha 3", fecha: "10-01-2026", horario: "14:00", local: "Ducilo", visitante: "Fifteen love" },
    {
      instancia: "Fecha 3",
      fecha: "15-01-2026",
      horario: "19:30",
      local: "Cooperarios Damas",
      visitante: "El rejunte",
    },
    { instancia: "Fecha 4", fecha: "18-01-2026", horario: "9:00", local: "Fifteen love", visitante: "Say no more" },
    { instancia: "Fecha 4", fecha: "18-01-2026", horario: "11:00", local: "Ducilo", visitante: "El rejunte" },
    {
      instancia: "Fecha 4",
      fecha: "20-01-2026",
      horario: "19:30",
      local: "No es ese el pique",
      visitante: "Cooperarios Damas",
    },
    {
      instancia: "Fecha 5",
      fecha: "01-02-2026",
      horario: "16:00",
      local: "No es ese el pique",
      visitante: "El rejunte",
    },
    { instancia: "Fecha 5", fecha: "08-02-2026", horario: "11:00", local: "Say no more", visitante: "Ducilo" },
    { instancia: "Fecha 5", fecha: "05-02-2026", horario: "19:30", local: "Cooperarios Damas", visitante: "Gin Tonic" },
    { instancia: "Fecha 6", fecha: "07-02-2026", horario: "18:00", local: "El rejunte", visitante: "Say no more" },
    {
      instancia: "Fecha 6",
      fecha: "08-02-2026",
      horario: "18:00",
      local: "No es ese el pique",
      visitante: "Gin Tonic",
    },
    {
      instancia: "Fecha 6",
      fecha: "08-02-2026",
      horario: "16:00",
      local: "Cooperarios Damas",
      visitante: "Fifteen love",
    },
    { instancia: "Fecha 7", fecha: "16-02-2026", horario: "16:00", local: "El rejunte", visitante: "Gin Tonic" },
    {
      instancia: "Fecha 7",
      fecha: "17-02-2026",
      horario: "18:00",
      local: "No es ese el pique",
      visitante: "Fifteen love",
    },
    { instancia: "Fecha 7", fecha: "13-02-2026", horario: "19:30", local: "Ducilo", visitante: "Cooperarios Damas" },
    { instancia: "CUARTOS", fecha: "21-02-2026", horario: "16:00", local: "7mo", visitante: "2do" },
    { instancia: "CUARTOS", fecha: "22-02-2026", horario: "9:00", local: "3ro", visitante: "6to" },
    { instancia: "CUARTOS", fecha: "21-02-2026", horario: "14:00", local: "4to", visitante: "5to" },
    { instancia: "SEMIFINAL", fecha: "01-03-2026", horario: "11:00", local: "1ro", visitante: "Ganador A" },
    { instancia: "SEMIFINAL", fecha: "27-02-2026", horario: "19:30", local: "Ganador C", visitante: "Ganador B" },
    { instancia: "TERCER PUESTO", fecha: "05-03-2026", horario: "19:30", local: "", visitante: "" },
    { instancia: "FINAL", fecha: "08-03-2026", horario: "11:00", local: "", visitante: "" },
  ],
  damas_b: [
    { instancia: "Fecha 1", fecha: "2-12-2025", horario: "19:30", local: "Hudson Tenis", visitante: "Las liebres" },
    {
      instancia: "Fecha 1",
      fecha: "9-12-2025",
      horario: "19:30",
      local: "Juan Carlas Tennis Club",
      visitante: "Bikinipoen",
    },
    { instancia: "Fecha 1", fecha: "7-12-2025", horario: "11:00", local: "Las Old G", visitante: "Old Georgian" },
    { instancia: "Fecha 1", fecha: "4-12-2025", horario: "19:30", local: "Dream team", visitante: "La red de amigas" },
    { instancia: "Fecha 2", fecha: "21-12-2025", horario: "12:00", local: "Hudson Tenis", visitante: "Bikinipoen" },
    {
      instancia: "Fecha 2",
      fecha: "26-12-2025",
      horario: "19:30",
      local: "Juan Carlas Tennis Club",
      visitante: "La red de amigas",
    },
    { instancia: "Fecha 2", fecha: "21-12-2025", horario: "11:00", local: "Las Old G", visitante: "Dream team" },
    { instancia: "Fecha 3", fecha: "02-01-2026", horario: "14:00", local: "Hudson Tenis", visitante: "Old Georgian" },
    { instancia: "Fecha 3", fecha: "04-01-2026", horario: "12:00", local: "Bikinipoen", visitante: "Dream team" },
    { instancia: "Fecha 3", fecha: "06-01-2026", horario: "19:30", local: "Las liebres", visitante: "Dream team" },
    {
      instancia: "Fecha 3",
      fecha: "09-01-2026",
      horario: "19:30",
      local: "Juan Carlas Tennis Club",
      visitante: "Las Old G",
    },
    { instancia: "Fecha 3", fecha: "13-01-2026", horario: "19:30", local: "Old Georgian", visitante: "Dream team" },
    { instancia: "Fecha 4", fecha: "16-01-2026", horario: "19:30", local: "Bikinipoen", visitante: "Las Old G" },
    {
      instancia: "Fecha 4",
      fecha: "11-01-2026",
      horario: "9:00",
      local: "Las liebres",
      visitante: "Juan Carlas Tennis Club",
    },
    { instancia: "Fecha 5", fecha: "27-01-2026", horario: "18:00", local: "Hudson Tenis", visitante: "Dream team" },
    { instancia: "Fecha 5", fecha: "29-01-2026", horario: "14:00", local: "La red de amigas", visitante: "Las Old G" },
    { instancia: "Fecha 5", fecha: "31-01-2026", horario: "12:00", local: "Bikinipoen", visitante: "Las liebres" },
    { instancia: "Fecha 6", fecha: "02-02-2026", horario: "19:30", local: "Hudson Tenis", visitante: "Las Old G" },
    {
      instancia: "Fecha 6",
      fecha: "08-02-2026",
      horario: "19:30",
      local: "Dream team",
      visitante: "Juan Carlas Tennis Club",
    },
    {
      instancia: "Fecha 6",
      fecha: "06-02-2026",
      horario: "14:00",
      local: "La red de amigas",
      visitante: "Las liebres",
    },
    { instancia: "Fecha 7", fecha: "07-02-2026", horario: "21:00", local: "Old Georgian", visitante: "Bikinipoen" },
    {
      instancia: "Fecha 7",
      fecha: "14-02-2026",
      horario: "16:00",
      local: "Hudson Tenis",
      visitante: "Juan Carlas Tennis Club",
    },
    { instancia: "Fecha 7", fecha: "16-02-2026", horario: "12:00", local: "Las Old G", visitante: "Las liebres" },
    { instancia: "Fecha 7", fecha: "16-02-2026", horario: "18:00", local: "Dream team", visitante: "Bikinipoen" },
    {
      instancia: "Fecha 7",
      fecha: "16-02-2026",
      horario: "12:00",
      local: "La red de amigas",
      visitante: "Old Georgian",
    },
    { instancia: "CUARTOS", fecha: "21-02-2026", horario: "12:00", local: "1ro", visitante: "8vo" },
    { instancia: "CUARTOS", fecha: "22-02-2026", horario: "11:00", local: "2do", visitante: "7mo" },
    { instancia: "CUARTOS", fecha: "22-02-2026", horario: "18:30", local: "3ro", visitante: "6to" },
    { instancia: "CUARTOS", fecha: "28-02-2026", horario: "9:30", local: "4to", visitante: "5to" },
    { instancia: "SEMIFINAL", fecha: "28-02-2026", horario: "12:00", local: "Ganador A", visitante: "Ganador C" },
    { instancia: "SEMIFINAL", fecha: "01-03-2026", horario: "9:00", local: "Ganador B", visitante: "Ganador D" },
    { instancia: "TERCER PUESTO", fecha: "06-03-2026", horario: "21:00", local: "", visitante: "" },
    { instancia: "FINAL", fecha: "08-03-2026", horario: "9:00", local: "", visitante: "" },
  ],
  mixto_a: [
    { instancia: "Fecha 1", fecha: "8-12-2025", horario: "15:00", local: "Cande y Co", visitante: "C toma team" },
    {
      instancia: "Fecha 1",
      fecha: "20-12-2025",
      horario: "12:00",
      local: "Mezcladito",
      visitante: "Matrimonios y algo mas",
    },
    { instancia: "Fecha 1", fecha: "14-12-2025", horario: "13:00", local: "Parque Mixto", visitante: "After Set" },
    { instancia: "Fecha 2", fecha: "27-12-2025", horario: "14:00", local: "Mezcladito", visitante: "After Set" },
    {
      instancia: "Fecha 2",
      fecha: "28-12-2025",
      horario: "11:00",
      local: "C toma team",
      visitante: "Matrimonios y algo mas",
    },
    { instancia: "Fecha 2", fecha: "19-12-2025", horario: "19:30", local: "Parque Mixto", visitante: "Cande y Co" },
    { instancia: "Fecha 3", fecha: "10-01-2026", horario: "18:00", local: "Mezcladito", visitante: "C toma team" },
    { instancia: "Fecha 3", fecha: "08-01-2026", horario: "19:30", local: "Cande y Co", visitante: "After Set" },
    {
      instancia: "Fecha 3",
      fecha: "11-01-2026",
      horario: "19:30",
      local: "Parque Mixto",
      visitante: "Matrimonios y algo mas",
    },
    { instancia: "Fecha 4", fecha: "24-01-2026", horario: "18:00", local: "Cande y Co", visitante: "Mezcladito" },
    { instancia: "Fecha 4", fecha: "20-01-2026", horario: "21:00", local: "Parque Mixto", visitante: "C toma team" },
    {
      instancia: "Fecha 4",
      fecha: "22-01-2026",
      horario: "19:30",
      local: "After Set",
      visitante: "Matrimonios y algo mas",
    },
    { instancia: "Fecha 5", fecha: "17-02-2026", horario: "16:00", local: "Mezcladito", visitante: "Parque Mixto" },
    { instancia: "Fecha 5", fecha: "12-02-2026", horario: "21:00", local: "C toma team", visitante: "After Set" },
    {
      instancia: "Fecha 5",
      fecha: "10-02-2026",
      horario: "19:30",
      local: "Cande y Co",
      visitante: "Matrimonios y algo mas",
    },
    { instancia: "CUARTOS", fecha: "20-02-2026", horario: "21:00", local: "6to", visitante: "3ro" },
    { instancia: "CUARTOS", fecha: "17-02-2026", horario: "14:00", local: "4to", visitante: "5to" },
    { instancia: "SEMIFINAL", fecha: "26-02-2026", horario: "21:00", local: "1ro", visitante: "Ganador A" },
    { instancia: "SEMIFINAL", fecha: "22-02-2026", horario: "16:00", local: "2do", visitante: "Ganador B" },
    { instancia: "TERCER PUESTO", fecha: "28-02-2026", horario: "18:00", local: "", visitante: "" },
    { instancia: "FINAL", fecha: "07-03-2026", horario: "18:00", local: "", visitante: "" },
  ],
  mixto_b: [
    { instancia: "Fecha 1", fecha: "7-12-2025", horario: "16:00", local: "C toma team", visitante: "Five Star Team" },
    { instancia: "Fecha 1", fecha: "7-12-2025", horario: "18:00", local: "Saque y red", visitante: "Doble Falta" },
    { instancia: "Fecha 2", fecha: "20-12-2025", horario: "18:00", local: "C toma team", visitante: "Saque y red" },
    { instancia: "Fecha 2", fecha: "28-12-2025", horario: "16:00", local: "Five Star Team", visitante: "Doble Falta" },
    { instancia: "Fecha 3", fecha: "03-01-2026", horario: "18:00", local: "C toma team", visitante: "Doble Falta" },
    { instancia: "Fecha 3", fecha: "04-01-2026", horario: "18:00", local: "Five Star Team", visitante: "Saque y red" },
    { instancia: "Fecha 4", fecha: "15-01-2026", horario: "21:00", local: "Five Star Team", visitante: "C toma team" },
    { instancia: "Fecha 4", fecha: "17-01-2026", horario: "12:00", local: "Doble Falta", visitante: "Saque y red" },
    { instancia: "Fecha 5", fecha: "24-01-2026", horario: "14:00", local: "Saque y red", visitante: "C toma team" },
    { instancia: "Fecha 5", fecha: "21-01-2026", horario: "21:00", local: "Doble Falta", visitante: "Five Star Team" },
    { instancia: "Fecha 6", fecha: "14-02-2026", horario: "14:00", local: "Doble Falta", visitante: "C toma team" },
    { instancia: "Fecha 6", fecha: "14-02-2026", horario: "18:00", local: "Saque y red", visitante: "Five Star Team" },
    { instancia: "SEMIFINAL", fecha: "19-02-2026", horario: "19:30", local: "1ro", visitante: "4to" },
    { instancia: "SEMIFINAL", fecha: "20-02-2026", horario: "19:30", local: "2do", visitante: "3ro" },
    { instancia: "TERCER PUESTO", fecha: "01-03-2026", horario: "16:00", local: "", visitante: "" },
    { instancia: "FINAL", fecha: "07-03-2026", horario: "14:00", local: "", visitante: "" },
  ],
}

async function seedDatabase() {
  try {
    console.log("Conectando a MongoDB...")
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Conectado exitosamente")

    console.log("Limpiando datos anteriores...")
    await Team.deleteMany({})
    await Match.deleteMany({})

    const temporada = "verano-2025"

    console.log("\nCreando equipos...")
    const equiposCreados = {}

    for (const [categoria, equipos] of Object.entries(equiposPorCategoria)) {
      equiposCreados[categoria] = {}
      for (const nombreEquipo of equipos) {
        const team = await Team.create({
          nombre: nombreEquipo,
          categoria,
          temporada,
          pj: 0,
          pg: 0,
          pp: 0,
          np: 0,
          pts: 0,
          sf: 0,
          sc: 0,
          gf: 0,
          gc: 0,
        })
        equiposCreados[categoria][nombreEquipo] = team._id
        console.log(`✓ ${nombreEquipo} (${categoria})`)
      }
    }

    console.log("\nCreando partidos...")
    let partidosCreados = 0

    for (const [categoria, fixtures] of Object.entries(fixturesPorCategoria)) {
      if (!equiposCreados[categoria]) continue

      for (const fixture of fixtures) {
        const equipoLocalId = equiposCreados[categoria][fixture.local]
        const equipoVisitanteId = equiposCreados[categoria][fixture.visitante]

        // Para partidos de playoffs sin equipos definidos
        if (!equipoLocalId || !equipoVisitanteId) {
          await Match.create({
            categoria,
            temporada,
            instancia: fixture.instancia,
            fecha: fixture.fecha,
            horario: fixture.horario,
            nombreLocal: fixture.local,
            nombreVisitante: fixture.visitante,
            jugado: false,
          })
        } else {
          await Match.create({
            categoria,
            temporada,
            instancia: fixture.instancia,
            fecha: fixture.fecha,
            horario: fixture.horario,
            equipoLocal: equipoLocalId,
            equipoVisitante: equipoVisitanteId,
            jugado: false,
          })
        }
        partidosCreados++
      }
      console.log(`✓ ${fixtures.length} partidos para ${categoria}`)
    }

    console.log(`\n✅ Carga completada exitosamente!`)
    console.log(
      `Total equipos: ${Object.values(equiposCreados).reduce((acc, cat) => acc + Object.keys(cat).length, 0)}`,
    )
    console.log(`Total partidos: ${partidosCreados}`)

    await mongoose.connection.close()
    console.log("Conexión cerrada")
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

seedDatabase()
