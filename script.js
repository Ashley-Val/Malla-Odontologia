const malla = document.getElementById("malla");

// Define tu estructura: materias, semestres, prerrequisitos
const materias = [
  // 1er semestre
  { id: "anatomia1", nombre: "Anatomía Humana I", semestre: 1 },
  { id: "histologia1", nombre: "Histología y Embriología", semestre: 1 },
  { id: "quimica", nombre: "Química General", semestre: 1 },
  { id: "psicologia", nombre: "Psicología General", semestre: 1 },

  // 2º semestre
  { id: "anatomia2", nombre: "Anatomía Humana II", semestre: 2, prereq: ["anatomia1"] },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 2, prereq: ["quimica"] },
  { id: "histologia2", nombre: "Histología Bucodental", semestre: 2, prereq: ["histologia1"] },
  { id: "microbiologia", nombre: "Microbiología", semestre: 2 },

  // 3º semestre
  { id: "fisiologia", nombre: "Fisiología Humana", semestre: 3 },
  { id: "propedeutica", nombre: "Propedéutica Clínica", semestre: 3 },
  { id: "odontologia1", nombre: "Odontología Preventiva I", semestre: 3 },
  { id: "imagenologia", nombre: "Imagenología", semestre: 3 },

  // 4º semestre
  { id: "patologia1", nombre: "Patología General", semestre: 4, prereq: ["microbiologia", "fisiologia"] },
  { id: "protesis1", nombre: "Prótesis Parcial Removible", semestre: 4 },
  { id: "materiales1", nombre: "Materiales Dentales", semestre: 4 },
  { id: "odontologia2", nombre: "Odontología Preventiva II", semestre: 4, prereq: ["odontologia1"] },

  // ... (continúa hasta 10º semestre si deseas, o dime y lo completo)
];

// Materias aprobadas hasta 3er semestre
const aprobadas = [
  "anatomia1", "histologia1", "quimica", "psicologia",
  "anatomia2", "bioquimica", "histologia2", "microbiologia",
  "fisiologia", "propedeutica", "odontologia1", "imagenologia"
];

// Crear los cuadros por semestre
for (let semestre = 1; semestre <= 10; semestre++) {
  const contenedor = document.createElement("div");
  contenedor.className = "bg-white rounded-2xl p-4 shadow-md";

  const titulo = document.createElement("h2");
  titulo.className = "text-xl font-bold mb-4 text-purple-700";
  titulo.textContent = `${semestre}° Semestre`;
  contenedor.appendChild(titulo);

  const materiasSemestre = materias.filter((m) => m.semestre === semestre);

  materiasSemestre.forEach((materia) => {
    const div = document.createElement("div");
    div.className =
      "cursor-pointer px-4 py-2 mb-2 rounded-xl transition-colors duration-200 font-medium";

    div.dataset.id = materia.id;
    div.textContent = materia.nombre;

    const aprobado = localStorage.getItem(materia.id) === "true" || aprobadas.includes(materia.id);

    const tienePrerrequisitos = materia.prereq && materia.prereq.length > 0;
    const prerrequisitosCumplidos = !tienePrerrequisitos || materia.prereq.every((id) =>
      localStorage.getItem(id) === "true" || aprobadas.includes(id)
    );

    if (!prerrequisitosCumplidos) {
      div.classList.add("bg-gray-300", "text-gray-500", "line-through");
      div.classList.add("pointer-events-none");
    } else if (aprobado) {
      div.classList.add("bg-purple-600", "text-white", "line-through");
    } else {
      div.classList.add("bg-pink-300", "text-black", "hover:bg-pink-400");
    }

    div.addEventListener("click", () => {
      const nuevoEstado = !(localStorage.getItem(materia.id) === "true");
      localStorage.setItem(materia.id, nuevoEstado);
      location.reload(); // Refresca para actualizar colores y desbloqueos
    });

    contenedor.appendChild(div);
  });

  malla.appendChild(contenedor);
}
