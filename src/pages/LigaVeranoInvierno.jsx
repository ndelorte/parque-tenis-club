// Liga.jsx
"use client"

import { useState, useEffect } from "react"

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000"

// Datos de equipos y fixtures
const equiposPorCategoria = {
  caballeros_a: [
    { nombre: "Extraordinario equipo", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Hay equipo", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Fincas de Iraola 2", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Los de siempre", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Desconocidos", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Los Arizu", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Parque tenis", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Los pibes del super", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
  ],
  caballeros_b: [
    { nombre: "Team Goat", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Finito Tenis Club", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Mostrame el pique", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Los muchachos", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Prado Kai", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Team Torres", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Truchon", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
  ],
  damas_a: [
    { nombre: "Gin Tonic", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Fifteen love", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "No es ese el pique", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Ducilo", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Say no more", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Cooperarios Damas", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "El rejunte", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
  ],
  damas_b: [
    { nombre: "Hudson Tenis", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Juan Carlas Tennis Club", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Las liebres", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Bikinipoen", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Las Old G", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Old Georgian", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Dream team", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "La red de amigas", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
  ],
  mixto_a: [
    { nombre: "Cande y Co", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Mezcladito", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Parque Mixto", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "After Set", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "C toma team", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Matrimonios y algo mas", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
  ],
  mixto_b: [
    { nombre: "C toma team", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Five Star Team", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Saque y red", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
    { nombre: "Doble Falta", pts: 0, pj: 0, pg: 0, pp: 0, np: 0, sf: 0, sc: 0, gf: 0, gc: 0 },
  ],
}

// Planteles por categoria y equipo
const plantelesPorCategoria = {
  caballeros_a: {
    "Extraordinario equipo": [
      "Martin Di Perna",
      "Alejo Aranzetti",
      "Camilo Aranzetti",
      "Franco Romero",
      "Nicolas Estigarribia",
      "Matias Scagliarini",
      "Tomas Carballo",
      "Matias Comellini",
      "Matias Pijuan",
      "Leandro Patane",
    ],
    Desconocidos: [
      "Nicolas Delorte",
      "Nicolas Testore",
      "Gustavo Dominguez",
      "Eduardo Goyhenespe",
      "Christian Tapia",
      "Pablo Ferrari",
      "Martin Veltri",
      "Jeronimo Villalba",
      "Nicolas Morrone",
      "Lucas Arce",
    ],
    "Hay equipo": [
      "Claudio Gonzalez",
      "Rodolfo Schenone",
      "Guillermo Alcaraz",
      "Diego Abate",
      "Rodrigo Dieguez",
      "Omar Michel",
      "Jeronimo Llanos Boscato",
      "Sebastian Llanos",
    ],
    "Los Arizu": [
      "Nicolas Arriola",
      "Guillermo Giambelluca",
      "Javier Kagerer",
      "Tomas Matta",
      "Sebastian Villagra",
      "Gonzalo Tapia",
      "Daniel Barravino",
      "Mariano Mastandrea",
      "Julian Navarro",
      "Diego Peralta",
      "Nahuel Saurina",
      "Julian Contrera",
    ],
    "Los de siempre": [
      "Juan Pablo Molina",
      "Sebastian Serralonga",
      "Marcelo Prekajac",
      "Fernando Castro",
      "Francisco Otero",
      "Daniel Tajes",
      "Ivan Gomez",
    ],
    "Los pibes del super": [
      "Diego Da Silva",
      "Farid Espindola",
      "Manuel Abdusteir",
      "Federico Krassevich",
      "Lucas Mallo",
      "Franco Rimoldi",
      "Gustavo Telez",
      "Pablo Olmedo",
    ],
    "Fincas de Iraola 2": [
      "Duncan Andres Paterson",
      "Pablo Helm",
      "Roberto Lisvnoscky",
      "Sebastian Hernandez",
      "Lucas Brizuela",
      "Ricardo Morales",
      "Fabian Leiter",
      "Juan Trevino",
      "Juan Manuel Rivera",
    ],
    "Parque tenis": [
      "Javier Delorte",
      "Facundo Centurion",
      "Guido Ongarelli",
      "Mateo Giordano",
      "Diego Giordano",
      "German Driemel",
      "Leandro Mancuso",
      "Jonatan Pizzi",
      "Ignacio Ciarlantini",
    ],
  },
  caballeros_b: {
    Truchon: [
      "Victorio Enrique Tebe",
      "Cesar Mario Penen Pardo",
      "Gustavo Miguel Di Giacomo",
      "Marcelo Centurion",
      "Andres De Tray",
      "Nestor Sanchez",
      "Alberto Blanco",
      "Jose Luis Elena",
      "Hector Barrere",
      "Gustavo Brizuela",
      "Agustin Marcos Penen",
    ],
    "Prado Kai": [
      "Mauricio Floccari",
      "Charly Loza",
      "Martin Alejandro Gomez",
      "Horacio Rimoldi",
      "Nicolas Lucio",
      "Miguel Yufra",
      "Walter Dominguez",
    ],
    "Mostrame el pique": [
      "Mauro Caraballo",
      "Fernando Chazarreta",
      "Luca Zanette",
      "Damian Scaricaciottoli",
      "German Vega",
      "Leonardo Fernandez",
      "Hernan De Crecchio",
      "Carlos Vara",
      "Carlos Zanette",
      "Lucas Lobo",
      "Leonardo Alvarez",
    ],
    "Finito Tenis Club": [
      "Lautaro Piricullo",
      "Alex Rao",
      "Eric Rao",
      "Nicolas Seguin",
      "Gonzalo Terni",
      "Lucas Blanco",
      "Guido Tiriduzzi",
      "Facundo Covian",
      "Gonzalo Clerici",
      "Jorge Gustavo Piricullo",
    ],
    "Team Goat": [
      "Agustin Ayala",
      "Hernan Ayala",
      "Ignacio Bernardi",
      "Diego Busto",
      "Nicolas Cieri",
      "Santiago de la Iglesia",
      "Roberto Federico",
      "Juan Pablo Giminski",
      "Marcelo Leguiza",
      "Pablo Mosiul",
    ],
    "Team Torres": [
      "Hector Adrian Alarcon",
      "Hector Alejandro Torres",
      "Diego Manuel Pascual",
      "Carlos Barrientos",
      "Ariel Martinez",
      "Leonardo Torres",
      "Marcelo Mesisca",
      "Emanuel Achar",
      "Miguel Alfredo Torres",
      "Alejandro Bednarik",
      "Matias Barrientos",
      "Carlos Enciso",
    ],
    "Los muchachos": [
      "Santiago Menga",
      "Cesar Ramon Zacaria",
      "Rodolfo Diaz",
      "Nestor Javier Davalos",
      "Lucas Marcos",
      "Juan Loaiza",
      "Alejandro Rupic",
      "Fernando Ortino",
      "Facundo Giudicatti",
      "Fernando Rupic",
    ],
  },
  damas_a: {
    "Gin Tonic": [
      "Angeles Andrenacci",
      "Candela Avgustin",
      "Luciana Durante",
      "Carina Fuentes",
      "Maria Martha Gimenez",
      "Ana Machelett",
      "Lucia Machelett",
      "Silvana Martinez",
      "Veronica Mazzini",
      "Laura Griselda Palla",
      "Guadalupe Rebollo Prats",
      "Laura Staffolani",
      "Carolina Zacchi",
    ],
    "El rejunte": [
      "Silvia Pallas",
      "Aniela Elizondo",
      "Cecilia Minguillon",
      "Celina Reincke",
      "Maria Laura Eseiza",
      "Daniela Eseiza",
      "Karina Moreno",
      "Liliana Longo",
      "Gisela Porroni",
      "Elizabeth Frade",
      "Silvina Resta",
      "Mercedes Bussola",
      "Andrea Jaurechi",
      "Natalia Wanrooy",
      "Fabiana Federico",
      "Andrea Torres",
    ],
    "Say no more": [
      "Maria Eugenia Miranda",
      "Angie Enciso",
      "Cecilia Rodriguez",
      "Nerina Luciani",
      "Adriana Veronica Boscato",
      "Fernanda Baum",
      "Mariana Toro",
      "Martina Candio",
      "Ambar Noelia Sansone",
      "Alejandra Bottari",
      "Julia Udaquiola",
      "Marcela Romero",
      "Silvia Miriam Mucci",
    ],
    Ducilo: [
      "Roxana Ayala",
      "Sofia Capdevila",
      "Juliana Capdevila",
      "Mariana Pomares",
      "Juliana Rodriguez",
      "Roxana Jara",
      "Luciana Guzmerini",
      "Janine Spelzini",
      "Paola Grozo",
      "Laura Betancur",
      "Noelia Roman",
      "Laura Vazquez",
      "Noelia Gamarra",
    ],
    "No es ese el pique": [
      "Andrea Carabajal",
      "Brenda Schaerer",
      "Carla Gerez",
      "Eliana Kosiorek",
      "Laura Feininger",
      "Gabriela Tardivo",
      "Paula Mira",
      "Laura Alonso",
      "Laura Morales",
      "Mirian Cosentino",
      "Monica Toschisi",
      "Cecilia Zanetti",
      "Patricia Rugero",
      "Lorena Accorimboni",
    ],
    "Cooperarios Damas": [
      "Susana Elsa Carzoglio",
      "Marcela Alejandra Goffi",
      "Silvia Marta Fernandez",
      "Myrian Veronica Pino",
      "Maria Marta Ghersinich",
      "Patricia Botta",
      "Norma Beatriz Vilanova",
      "Liliana Zapiola",
      "Silvia Di Tada",
      "Silvana Garavaglia",
      "Maria Alba Cabrera",
    ],
    "Fifteen love": [
      "Virginia Lazzari",
      "Karina Moreno",
      "Romina Zilmmermann",
      "Margarita Schaffer",
      "Laura Dela Place",
      "Miriam Pena",
      "Patricia Lampmann",
      "Victoria Silvestri",
      "Gabriela Mesaglio",
      "Hilda Correa",
      "Andrea Morvin",
      "Soledad Andrea Santagati",
    ],
  },
  damas_b: {
    "Hudson Tenis": [
      "Maria Eugenia Pardo",
      "Maria Sol Cersosimo",
      "Vanina Senlle",
      "Valeria Cersosimo",
      "Carolina Fernandez",
      "Cecilia De Rosso",
      "Victoria Spinelli",
      "Corina Grimmer",
      "Maria Sol Cresta",
      "Lia Bechelli",
      "Veronica Sbarbati",
      "Romina Gargano",
    ],
    "Juan Carlas Tennis Club": [
      "Pamela Sabatin",
      "Tiziana Gonzalez",
      "Florencia Barreiro",
      "Mijal Belotte",
      "Daiana Banegas",
      "Yamila Pacalay",
      "Griselda Gauna",
      "Paula Escobar",
      "Carola Guiliano",
      "Lucia Machelett",
      "Natalia Ojeda",
    ],
    "Las Old G": [
      "Maria Dolores De Carli",
      "Moira Novelletto",
      "Fernanda Laria",
      "Maria de los Angeles Acuna",
      "Ana Gardiman",
      "Vanesa Castro Borda",
      "Marta Proto",
      "Maria Jose Barreiro",
      "Liliana Renda",
      "Silvia Pallas",
      "Gladis Ermelinda Ricci",
      "Cintia Rivero",
      "Agustina Fernandez",
      "Monica Renda",
      "Maria Laura Rodriguez",
      "Silvia Lopez",
    ],
    "Dream team": [
      "Patricia Cortave",
      "Cecilia Mari",
      "Soledad Grimaldi",
      "Maria Cambarieri",
      "Celina Reincke",
      "Florencia Meizner",
      "Felicitas Hernandez",
      "Julia Marquez",
      "Milagros Palomba",
      "Anabel Zicarelli",
      "Nora Caceres",
      "Ana Antonia Cabrera",
      "Maria Cristina Burzminski",
    ],
    "La red de amigas": [
      "Maria Paula Cesar",
      "Daniela Andrea Siangiacomo",
      "Georgina Pollini",
      "Norma Cartagena",
      "Alejandra Pereyra",
      "Sandra Bosco",
      "Gisele Glenda Riveiro",
      "Maria Valeria Cianciullo",
      "Adriana Paola Benitez",
      "Cecilia Garbarino",
      "Julieta Garbarino",
      "Anabella Schab",
    ],
    "Old Georgian": [
      "Marta Castro",
      "Liliana Anacondia",
      "Patricia Capece",
      "Maria Del Pilar Valenzuela",
      "Ester Andrade",
      "Silvia Broglia",
      "Denise Gibaut",
      "Susana Lucas",
      "Alicia Vai",
      "Silvana Castellano",
      "Virginia Parisi",
      "Graciela Redaelle",
    ],
    Bikinipoen: [
      "Mariana Coraglio",
      "Iris Bejarano",
      "Fabiana Uriel",
      "Victoria Moreno",
      "Alicia Pizzo",
      "Veronica Di Fonzo",
      "Yamila Segovia",
      "Flavia Pallares",
      "Belen Badano",
      "Susana Badano",
      "Maria Paz",
      "Elsa Fabiola Valdez",
    ],
    "Las liebres": [
      "Melina Diez",
      "Manuela Gonzalez",
      "Araceli Lotes",
      "Laura Mahle",
      "Fernanda Peralta",
      "Laura Acosta",
      "Gabriela",
      "Laura Bajko",
      "Karina Parada",
      "Silvina Resta",
      "Morena Esperon",
    ],
  },
  mixto_a: {
    "After Set": [
      "Fernanda Daniela Roa",
      "Cecilia Rodriguez",
      "Daniel Albanese",
      "Diego Daniel Del Corral",
      "Jonatan Pizzi",
      "Mariana Laura Persico",
      "Ignacio Agustin Ciarlantini",
      "Cecilia Zanetti",
      "Gonzalo Seoane",
      "Natalia Betiana Alvarez",
      "Cesar Zacaria",
      "Lucas Guillermo Brizuela",
      "Eliana Kosiorek",
      "Vanesa Mariel Guarnieri",
    ],
    "Parque Mixto": [
      "Maria Victoria Nunez",
      "Olga Rolon",
      "Ariel Martinez",
      "Sebastian Llanos",
      "Paula Mira",
      "Diego Giordano",
      "Laura Alonso",
      "Adriana Boscato",
      "Noelia Gamarra",
      "Mariana Giannini",
      "Maria Mercedes Cordoba",
      "Juan Pablo Molina",
      "Javier Delorte",
      "Agustin Penen",
      "Pablo Quattrocchi",
    ],
    "Cande y Co": [
      "Candela Avgustin",
      "Martin Di Perna",
      "Victoria Bruzera",
      "Franco Romero",
      "Juliana Di Santo",
      "Carina Fuentes",
      "Axel Romeo",
      "Melina Sanabria",
      "Nicolas Estigarribia",
      "Lautaro Coria",
      "Alejo Aranzetti",
      "Facundo Centurion",
      "Karina Larriba",
    ],
    "C toma team": [
      "Gisela Becchio",
      "Damian Maffei",
      "Fabio Carlo",
      "Nestor Cardaci",
      "Tatiana Pintos",
      "Maria Julieta Rozas",
      "Daniela Vallejo",
      "Sandra Suarez",
      "Cristian Andre",
      "Alejandro Bednarik",
      "Claudio Tomaselli",
    ],
    Mezcladito: [
      "Nicolas Delorte",
      "Pablo Ferrari",
      "Tiziana Gonzalez",
      "Pamela Yanina Sabattini",
      "Ana Machelett",
      "Lucia Machelett",
      "Claudia Fuentes",
      "Juan Loaiza",
      "Florencia Barreiro",
      "Juan Manuel Abdusteir",
      "Carola Giuliano",
      "Nicolas Fulop",
      "Nicolas Testore",
    ],
    "Matrimonios y algo mas": [
      "Martin Veltri",
      "Monica Feltrinelli",
      "Mariel Siri",
      "Cristian Maier",
      "Leticia Cimino",
      "Martin Campo",
      "Matias Gargiulo",
      "Florencia Martinez",
      "Carolina Montes Cornejo",
      "Mariela Gallego",
      "Sonia Sevilla",
      "Sergio Pezzi",
      "Bernardo Pedrazzini",
      "Florencia Carbone",
      "Patricio Mingrone",
    ],
  },
  mixto_b: {
    "Doble Falta": [
      "Maria Paula Cesar",
      "Norma Cartagena",
      "Alejandra Pereyra",
      "Gisele Glenda Riveiro",
      "Maria Valeria Cianciullo",
      "Adriana Paola Benitez",
      "Rosa Sanchez Raverta",
      "Lucas Gaston Mottin",
      "Maximiliano Anibal Acosta",
      "Fabian Gustavo Leiter",
      "Juan Ignacio Drago",
      "Juan Cruz Drago",
      "Martin Julian Sala",
      "Diego Roberto Busto",
      "Santiago de la Iglesia",
      "Anabela Schab",
    ],
    "Saque y red": [
      "Agustina Iribas",
      "Roman Cisneros",
      "Marcos Kilmunda",
      "Maria Andrea Muro",
      "Gabriel David Samudio",
      "Mijal Belotte",
      "Yamila Pacalay",
      "Paula Escobar",
      "Facundo Basualdo",
      "Ariel Orrino",
    ],
    "Five Star Team": [
      "Patricia Cortave",
      "Cecilia Mari",
      "Celina Reincke",
      "Soledad Grimaldi",
      "Florencia Meizner",
      "Felicita Hernandez",
      "Julia Marquez",
      "Maria Cambarieri",
      "Marcel Vannier",
      "Ricardo Adrian Nodar",
      "Luciano Pajon",
      "Rodolfo Diaz",
      "Augusto Bianchi",
      "Elias",
      "Claudio Perez",
    ],
    "C toma team": [
      "Gisela Becchio",
      "Damian Maffei",
      "Fabio Carlo",
      "Nestor Cardaci",
      "Tatiana Pintos",
      "Maria Julieta Rozas",
      "Daniela Vallejo",
      "Sandra Suarez",
      "Cristian Andre",
      "Alejandro Bednarik",
      "Claudio Tomaselli",
    ],
  },
}

// Fixtures por categoria
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
      local: "Los Arizu",
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
    { instancia: "Fecha 5", fecha: "29-01-2026", horario: "21:00", local: "Los Arizu", visitante: "Hay Equipo" },
    {
      instancia: "Fecha 5",
      fecha: "31-01-2026",
      horario: "14:00",
      local: "Extraordinario equipo",
      visitante: "Hay equipo",
    },
    { instancia: "Fecha 6", fecha: "11-02-2026", horario: "21:00", local: "Desconocidos", visitante: "Hay Equipo" },
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
    { instancia: "Fecha 7", fecha: "18-02-2026", horario: "21:00", local: "Los Arizu", visitante: "Hay Equipo" },
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
    { instancia: "Fecha 7", fecha: "14-02-2026", horario: "21:00", local: "Prado kai", visitante: "Truchon" },
    { instancia: "CUARTOS", fecha: "21-02-2026", horario: "18:00", local: "3ro", visitante: "6to" },
    { instancia: "CUARTOS", fecha: "22-02-2026", horario: "18:00", local: "4to", visitante: "5to" },
    { instancia: "SEMIFINAL", fecha: "01-03-2026", horario: "18:00", local: "", visitante: "Ganador A" },
    { instancia: "SEMIFINAL", fecha: "01-03-2026", horario: "18:00", local: "", visitante: "Ganador B" },
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
    { instancia: "Fecha 3", fecha: "04-01-2026", horario: "12:00", local: "Bikinipoen", visitante: "Doble Falta" },
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
      local: "Dream Team",
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
    { instancia: "Fecha 7", fecha: "16-02-2026", horario: "18:00", local: "Dream Team", visitante: "Bikinipoen" },
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
    { instancia: "Fecha 1", fecha: "27-12-2025", horario: "14:00", local: "Mezcladito", visitante: "After Set" },
    {
      instancia: "Fecha 2",
      fecha: "28-12-2025",
      horario: "11:00",
      local: "C toma Team",
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
      local: "After set",
      visitante: "Matrimonios y algo mas",
    },
    { instancia: "Fecha 5", fecha: "17-02-2026", horario: "16:00", local: "Mezcladito", visitante: "Parque mixto" },
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
    { instancia: "Fecha 4", fecha: "17-01-2026", horario: "12:00", local: "Doble falta", visitante: "Saque y red" },
    { instancia: "Fecha 5", fecha: "24-01-2026", horario: "14:00", local: "Saque y red", visitante: "C toma team" },
    { instancia: "Fecha 5", fecha: "21-01-2026", horario: "21:00", local: "Doble falta", visitante: "Five Star Team" },
    { instancia: "Fecha 6", fecha: "14-02-2026", horario: "14:00", local: "Doble falta", visitante: "C toma team" },
    { instancia: "Fecha 6", fecha: "14-02-2026", horario: "18:00", local: "Saque y red", visitante: "Five Star Team" },
    { instancia: "SEMIFINAL", fecha: "19-02-2026", horario: "19:30", local: "1ro", visitante: "4to" },
    { instancia: "SEMIFINAL", fecha: "20-02-2026", horario: "19:30", local: "2do", visitante: "3ro" },
    { instancia: "TERCER PUESTO", fecha: "01-03-2026", horario: "16:00", local: "", visitante: "" },
    { instancia: "FINAL", fecha: "07-03-2026", horario: "14:00", local: "", visitante: "" },
  ],
}

const categoriasInfo = {
  mixto_a: { nombre: "Mixto A", equipos: 8 },
  mixto_b: { nombre: "Mixto B", equipos: 6 },
  damas_a: { nombre: "Damas A", equipos: 7 },
  damas_b: { nombre: "Damas B", equipos: 8 },
  caballeros_a: { nombre: "Caballeros A", equipos: 8 },
  caballeros_b: { nombre: "Caballeros B", equipos: 7 },
}

// Componente de reloj de arena animado
function AnimatedHourglass() {
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Reloj de arena SVG con animacion */}
      <svg viewBox="0 0 100 120" className="w-full h-full">
        {/* Marco del reloj */}
        <rect x="15" y="5" width="70" height="8" rx="2" fill="#1a3a4a" />
        <rect x="15" y="107" width="70" height="8" rx="2" fill="#1a3a4a" />

        {/* Vidrio del reloj */}
        <path d="M25 13 L25 45 Q50 60 50 60 Q50 60 75 45 L75 13 Z" fill="#e0f2fe" stroke="#1a3a4a" strokeWidth="2" />
        <path d="M25 107 L25 75 Q50 60 50 60 Q50 60 75 75 L75 107 Z" fill="#e0f2fe" stroke="#1a3a4a" strokeWidth="2" />

        {/* Arena arriba - con animacion de vaciado */}
        <path
          d="M30 18 L30 40 Q50 52 50 52 Q50 52 70 40 L70 18 Z"
          fill="#c4632a"
          className="origin-bottom"
          style={{
            animation: "sandEmpty 3s ease-in-out infinite",
          }}
        />

        {/* Arena cayendo */}
        <line
          x1="50"
          y1="52"
          x2="50"
          y2="68"
          stroke="#c4632a"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            animation: "sandFall 3s ease-in-out infinite",
          }}
        />

        {/* Arena abajo - con animacion de llenado */}
        <path
          d="M35 102 L35 85 Q50 75 50 75 Q50 75 65 85 L65 102 Z"
          fill="#c4632a"
          className="origin-bottom"
          style={{
            animation: "sandFill 3s ease-in-out infinite",
          }}
        />

        {/* Soportes laterales */}
        <rect x="20" y="10" width="4" height="100" rx="2" fill="#1a3a4a" />
        <rect x="76" y="10" width="4" height="100" rx="2" fill="#1a3a4a" />
      </svg>

      {/* Estilos de animacion */}
      <style jsx>{`
        @keyframes sandEmpty {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(0.3); opacity: 0.7; }
        }
        @keyframes sandFill {
          0%, 100% { transform: scaleY(0.3); opacity: 0.7; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes sandFall {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

// Componente de copos de nieve
function Snowflakes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white/40 text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            animation: `snowfall ${5 + Math.random() * 5}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          *
        </div>
      ))}
      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default function Liga() {
  const [tipoLiga, setTipoLiga] = useState("verano")
  const [categoriaActiva, setCategoriaActiva] = useState("caballeros_a")
  const [seccionActiva, setSeccionActiva] = useState("posiciones")

  const [equipos, setEquipos] = useState([])
  const [fixtures, setFixtures] = useState([])
  const [loading, setLoading] = useState(true)

  const temporada = tipoLiga === "verano" ? "verano-2025" : "invierno-2025"

  useEffect(() => {
    fetchLeagueData()
  }, [categoriaActiva, tipoLiga])

  const fetchLeagueData = async () => {
    setLoading(true)
    try {
      console.log("[v0] Cargando datos para:", { categoriaActiva, temporada })

      const [equiposRes, fixturesRes] = await Promise.all([
        fetch(`${API_BASE}/api/league/standings/${categoriaActiva}?temporada=${temporada}`),
        fetch(`${API_BASE}/api/league/matches/${categoriaActiva}?temporada=${temporada}`),
      ])

      console.log("[v0] Respuestas:", {
        equiposStatus: equiposRes.status,
        fixturesStatus: fixturesRes.status,
      })

      const equiposData = await equiposRes.json()
      const fixturesData = await fixturesRes.json()

      console.log("[v0] Datos recibidos:", {
        equipos: equiposData.length,
        fixtures: fixturesData.length,
      })

      setEquipos(equiposData)
      setFixtures(fixturesData)
    } catch (err) {
      console.error("Error al cargar datos de liga:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-16">
      {/* Hero */}
      <section
        className={`relative py-12 px-4 ${tipoLiga === "verano" ? "bg-gradient-to-br from-[#3d6b4a] to-[#2d4a35]" : "bg-gradient-to-br from-[#1a3a4a] to-[#0d2030]"}`}
      >
        {tipoLiga === "invierno" && <Snowflakes />}
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <img
                src={tipoLiga === "verano" ? "/logoligaverano.png" : "/logoligadeinvierno.png"}
                alt={`Liga de ${tipoLiga === "verano" ? "Verano" : "Invierno"}`}
                className="h-32 md:h-40 drop-shadow-lg"
              />
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Liga de {tipoLiga === "verano" ? "Verano" : "Invierno"}
                </h1>
                <p className="text-white/80 text-lg">Temporada 2025/26</p>
              </div>
            </div>

            <div className="flex gap-2 bg-white/10 p-1 rounded-lg">
              <button
                onClick={() => setTipoLiga("verano")}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  tipoLiga === "verano" ? "bg-[#c4632a] text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Verano
              </button>
              <button
                onClick={() => setTipoLiga("invierno")}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  tipoLiga === "invierno"
                    ? "bg-[#c4632a] text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Invierno
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Descripcion breve - Solo para verano */}
      {tipoLiga === "verano" && (
        <section className="bg-white py-8 px-4 border-b">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-gray-700 leading-relaxed">
              La Liga de Verano es una competencia por equipos donde cada serie se define al mejor de 3 canchas jugadas
              simultaneamente. El equipo que gana 2 de las 3 canchas se lleva la serie. Cada partido de dobles se juega
              al mejor de 3 sets (los dos primeros con tie-break y el tercero super tie-break).
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>Ganar serie: 2 pts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span>Perder serie: 1 pt</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span>No presentarse: 0 pts</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Navegacion de secciones - Solo mostrar si es verano */}
      {tipoLiga === "verano" && (
        <nav className="bg-[#2d4a35] sticky top-16 z-40 shadow-md">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center gap-2 md:gap-8 py-3 text-sm md:text-base overflow-x-auto">
              {[
                { key: "posiciones", label: "Posiciones" },
                { key: "fixture", label: "Fixture" },
                { key: "planteles", label: "Planteles" },
                { key: "reglamento", label: "Reglamento" },
              ].map((seccion) => (
                <li key={seccion.key}>
                  <button
                    onClick={() => setSeccionActiva(seccion.key)}
                    className={`px-4 py-2 rounded transition whitespace-nowrap ${
                      seccionActiva === seccion.key ? "bg-[#c4632a] text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    {seccion.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/* Selector de Categoria - Solo mostrar si es verano */}
      {tipoLiga === "verano" && (
        <div className="bg-gray-100 py-4 px-4 border-b">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(categoriasInfo).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaActiva(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    categoriaActiva === cat
                      ? "bg-[#2d4a35] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200 border"
                  }`}
                >
                  {categoriasInfo[cat].nombre}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Mensaje de Proximamente para Liga de Invierno */}
        {tipoLiga === "invierno" ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#1a3a4a] to-[#2d5a6a] text-white p-6 text-center relative overflow-hidden">
                <Snowflakes />
                <h2 className="text-2xl font-bold relative z-10">Liga de Invierno 2026</h2>
                <p className="text-white/70 mt-1 relative z-10">Preparate para el frio</p>
              </div>
              <div className="p-8 md:p-12 text-center">
                <AnimatedHourglass />

                <h3 className="text-3xl font-bold text-[#1a3a4a] mt-8 mb-4">Proximamente...</h3>

                <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                  La Liga de Invierno 2026 esta en preparacion. Mientras tanto, seguí la Liga de Verano que se esta
                  jugando ahora mismo.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => setTipoLiga("verano")}
                    className="bg-[#c4632a] hover:bg-[#a85220] text-white font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105 shadow-md"
                  >
                    Ver Liga de Verano
                  </button>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Inscripciones abiertas a partir de Abril 2026</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Tabla de Posiciones */}
            {seccionActiva === "posiciones" && (
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6">
                  {categoriasInfo[categoriaActiva].nombre} - Tabla de Posiciones
                </h2>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600"></div>
                  </div>
                ) : equipos.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No hay datos de posiciones disponibles</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200 text-left">
                          <th className="pb-3 px-2 text-sm font-semibold">Pos</th>
                          <th className="pb-3 px-2 text-sm font-semibold">Equipo</th>
                          <th className="pb-3 px-2 text-sm font-semibold text-center">Pts</th>
                          <th className="pb-3 px-2 text-sm font-semibold text-center">PJ</th>
                          <th className="pb-3 px-2 text-sm font-semibold text-center">PG</th>
                          <th className="pb-3 px-2 text-sm font-semibold text-center">PP</th>
                          <th className="pb-3 px-2 text-sm font-semibold text-center">SF</th>
                          <th className="pb-3 px-2 text-sm font-semibold text-center">SC</th>
                          <th className="pb-3 px-2 text-sm font-semibold text-center">DS</th>
                          <th className="pb-3 px-2 text-sm font-semibold text-center">GF</th>
                          <th className="pb-3 px-2 text-sm font-semibold text-center">GC</th>
                          <th className="pb-3 px-2 text-sm font-semibold text-center">DG</th>
                        </tr>
                      </thead>
                      <tbody>
                        {equipos.map((equipo, index) => (
                          <tr key={equipo._id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-2 font-semibold">{index + 1}</td>
                            <td className="py-3 px-2 font-medium">{equipo.nombre}</td>
                            <td className="py-3 px-2 text-center font-bold text-green-600">{equipo.pts}</td>
                            <td className="py-3 px-2 text-center">{equipo.pj}</td>
                            <td className="py-3 px-2 text-center">{equipo.pg}</td>
                            <td className="py-3 px-2 text-center">{equipo.pp}</td>
                            <td className="py-3 px-2 text-center">{equipo.sf}</td>
                            <td className="py-3 px-2 text-center">{equipo.sc}</td>
                            <td className="py-3 px-2 text-center font-medium">{equipo.difSets}</td>
                            <td className="py-3 px-2 text-center">{equipo.gf}</td>
                            <td className="py-3 px-2 text-center">{equipo.gc}</td>
                            <td className="py-3 px-2 text-center font-medium">{equipo.difGames}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Fixture */}
            {seccionActiva === "fixture" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">{categoriasInfo[categoriaActiva].nombre} - Fixture Completo</h2>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600"></div>
                  </div>
                ) : fixtures.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No hay fixture disponible</p>
                ) : (
                  (() => {
                    const partidosPorInstancia = {}
                    fixtures.forEach((partido) => {
                      if (!partidosPorInstancia[partido.instancia]) {
                        partidosPorInstancia[partido.instancia] = []
                      }
                      partidosPorInstancia[partido.instancia].push(partido)
                    })

                    return Object.entries(partidosPorInstancia).map(([instancia, partidos]) => (
                      <div key={instancia} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-bold mb-4 text-green-600">{instancia}</h3>
                        <div className="space-y-3">
                          {partidos.map((partido) => {
                            const equipoLocal = partido.equipoLocal?.nombre || partido.nombreLocal || "TBD"
                            const equipoVisitante = partido.equipoVisitante?.nombre || partido.nombreVisitante || "TBD"

                            return (
                              <div
                                key={partido._id}
                                className="flex items-center justify-between border-b border-gray-100 pb-3"
                              >
                                <div className="flex-1 text-right pr-4">
                                  <p
                                    className={`font-semibold ${partido.jugado && partido.resultadoSerieLocal > partido.resultadoSerieVisitante ? "text-green-600" : ""}`}
                                  >
                                    {equipoLocal}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg min-w-[100px] justify-center">
                                  {partido.jugado ? (
                                    <>
                                      <span className="text-xl font-bold">
                                        {partido.resultadoSerieLocal || partido.setsLocal}
                                      </span>
                                      <span className="text-gray-400">-</span>
                                      <span className="text-xl font-bold">
                                        {partido.resultadoSerieVisitante || partido.setsVisitante}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-gray-400 font-medium">vs</span>
                                  )}
                                </div>
                                <div className="flex-1 pl-4">
                                  <p
                                    className={`font-semibold ${partido.jugado && (partido.resultadoSerieVisitante > partido.resultadoSerieLocal || partido.setsVisitante > partido.setsLocal) ? "text-green-600" : ""}`}
                                  >
                                    {equipoVisitante}
                                  </p>
                                </div>
                                <div className="text-right text-sm text-gray-500 min-w-[120px]">
                                  <p>{partido.fecha}</p>
                                  <p>{partido.horario}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))
                  })()
                )}
              </div>
            )}

            {/* Planteles */}
            {seccionActiva === "planteles" && (
              <div className="grid md:grid-cols-2 gap-6">
                {equiposPorCategoria[categoriaActiva].map((equipo) => {
                  const jugadores = plantelesPorCategoria[categoriaActiva]?.[equipo.nombre] || []
                  return (
                    <div key={equipo.nombre} className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="bg-[#2d4a35] text-white p-4 flex justify-between items-center">
                        <h3 className="text-lg font-bold">{equipo.nombre}</h3>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{jugadores.length} jugadores</span>
                      </div>
                      <div className="p-4">
                        {jugadores.length > 0 ? (
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {jugadores.map((jugador, idx) => (
                              <li key={idx} className="flex items-center gap-2 py-2 px-3 bg-gray-50 rounded-lg text-sm">
                                <span className="w-6 h-6 bg-[#2d4a35] text-white rounded-full flex items-center justify-center text-xs font-medium">
                                  {idx + 1}
                                </span>
                                <span className="text-gray-700">{jugador}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-center text-gray-500 py-4">Plantel pendiente de cargar</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Reglamento */}
            {seccionActiva === "reglamento" && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-[#2d4a35] text-white p-4">
                    <h2 className="text-xl font-bold">Reglamento Liga de Verano 2025/26</h2>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="font-bold text-lg text-[#2d4a35] mb-3">Sistema de Competencia</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>- Cada serie se disputa al mejor de 3 parciales (3 canchas simultaneas)</li>
                        <li>- Cada parcial se juega al mejor de 3 sets</li>
                        <li>- Los dos primeros sets con Tie-Break, el tercero Super Tie-Break</li>
                        <li>- Todas las categorias disputan 3 Dobles por serie</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-[#2d4a35] mb-3">Puntuacion</h3>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Partido ganado</span>
                            <span className="font-bold text-green-600">2 puntos</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Partido perdido y jugado</span>
                            <span className="font-bold text-yellow-600">1 punto</span>
                          </li>
                          <li className="flex justify-between">
                            <span>No presentarse</span>
                            <span className="font-bold text-red-600">0 puntos</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-[#2d4a35] mb-3">Desempate</h3>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700">
                        <li>Mayor cantidad de puntos</li>
                        <li>Diferencia de partidos ganados/perdidos</li>
                        <li>Diferencia de sets ganados/perdidos</li>
                        <li>Diferencia de games ganados/perdidos</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-[#2d4a35] mb-3">Inscripcion</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>- Valor inscripcion por equipo: $90.000</li>
                        <li>- Valor por serie jugada: $60.000</li>
                        <li>- Jugadores por equipo: entre 8 y 18</li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <a
                        href="/reglamento-liga.pdf"
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-[#c4632a] hover:bg-[#a85220] text-white font-semibold py-3 px-6 rounded-lg transition"
                        rel="noreferrer"
                      >
                        Descargar Reglamento Completo (PDF)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
