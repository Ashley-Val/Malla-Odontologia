const malla = document.getElementById("malla");

// Definición de materias por semestre y prerrequisitos
const materias = [
  // Semestres 1–3 (aprobadas)
  { id: "anatomia1", nombre: "Anatomía Humana I", semestre: 1 },
  { id: "histologia1", nombre: "Histología y Embriología", semestre: 1 },
  { id: "quimica", nombre: "Química General", semestre: 1 },
  { id: "psicologia", nombre: "Psicología General", semestre: 1 },
  { id: "anatomia2", nombre: "Anatomía Humana II", semestre: 2, prereq: ["anatomia1"] },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 2, prereq: ["quimica"] },
  { id: "histologia2", nombre: "Histología Bucodental", semestre: 2, prereq: ["histologia1"] },
  { id: "microbiologia", nombre: "Microbiología", semestre: 2 },
  { id: "fisiologia", nombre: "Fisiología Humana", semestre: 3 },
  { id: "propedeutica", nombre: "Propedéutica Clínica", semestre: 3 },
  { id: "odontologia1", nombre: "Odontología Preventiva I", semestre: 3 },
  { id: "imagenologia", nombre: "Imagenología", semestre: 3 },

  // Semestre 4
  { id: "patologia1", nombre: "Patología General", semestre: 4, prereq: ["microbiologia", "fisiologia"] },
  { id: "materiales1", nombre: "Materiales Dentales I", semestre: 4 },
  { id: "odontologia2", nombre: "Odontología Preventiva II", semestre: 4, prereq: ["odontologia1"] },
  { id: "protesis1", nombre: "Prótesis Parcial Removible", semestre: 4 },

  // Semestre 5
  { id: "farmacologia1", nombre: "Farmacología General", semestre: 5, prereq: ["microbiologia", "patologia1", "bioquimica"] },
  { id: "semiologia", nombre: "Semiología Estomatológica", semestre: 5, prereq: ["patologia1", "imagenologia"] },
  { id: "cariologia", nombre: "Cariología", semestre: 5, prereq: ["imagenologia"] },
  { id: "odontopediatria1", nombre: "Odontopediatría I", semestre: 5 },

  // Semestre 6
  { id: "endodoncia1", nombre: "Endodoncia I", semestre: 6, prereq: ["farmacologia1", "cariologia"] },
  { id: "oclusion", nombre: "Oclusión", semestre: 6, prereq: ["imagenologia", "materiales1"] },
  { id: "periodoncia1", nombre: "Periodoncia I", semestre: 6 },
  { id: "clinica1", nombre: "Clínica Integral I", semestre: 6 },

  // Semestre 7
  { id: "protesis2", nombre: "Prótesis Fija y Parcial II", semestre: 7, prereq: ["oclusion", "protesis1"] },
  { id: "clinica2", nombre: "Clínica Integral II", semestre: 7, prereq: ["clinica1"] },
  { id: "psicologia2", nombre: "Psicología en Odontología", semestre: 7 },
  { id: "patologiabucal", nombre: "Patología Dentomaxilar", semestre: 7 },

  // Semestre 8
  { id: "medicina_interna", nombre: "Medicina Interna", semestre: 8 },
  { id: "bioetica", nombre: "Bioética y Odontología Legal", semestre: 8 },
  { id: "odontopediatria2", nombre: "Odontopediatría II", semestre: 8, prereq: ["odontopediatria1"] },
  { id: "protesis_total1", nombre: "Prótesis Total I", semestre: 8, prereq: ["oclusion", "imagenologia", "materiales1"] },
  { id: "clinica3", nombre: "Clínica Integral III", semestre: 8, prereq: ["clinica2"] },

  // Semestre 9
  { id: "clinica4", nombre: "Clínica Integral IV", semestre: 9, prereq: ["clinica3"] },
  { id: "ortodoncia", nombre: "Ortodoncia y Ortopedia", semestre: 9 },
  { id: "protesis_total2", nombre: "Prótesis Total II", semestre: 9, prereq: ["protesis_total1"] },
  { id: "casos_clinicos", nombre: "Casos Clínicos", semestre: 9 },
  { id: "urgencias", nombre: "Urgencias en Odontología", semestre: 9, prereq: ["endodoncia1", "periodoncia1", "clinica3"] },
];

// Aprobadas hasta semestre 3
const aprobadas = materias.filter(m => m.semestre <= 3).map(m => m.id);

// Generación dinámica de semestres y materias
for (let s = 1; s <= 9; s++) {
  const cont = document.createElement("div");
  cont.className = "bg-white rounded-2xl p-4 shadow-lg";

  const h2 = document.createElement("h2");
  h2.className = "text-xl font-semibold text-indigo-700 mb-3";
  h2.textContent = `${s}° Semestre`;
  cont.appendChild(h2);

  materias.filter(m => m.semestre === s).forEach(m => {
    const d = document.createElement("div");
    d.dataset.id = m.id;
    d.textContent = m.nombre;
    d.className = "cursor-pointer px-3 py-2 mb-2 rounded-lg transition";

    const aprobado = aprobadas.includes(m.id) || localStorage.getItem(m.id) === "true";
    const prereqs = m.prereq || [];
    const ok = prereqs.every(id => aprobadas.includes(id) || localStorage.getItem(id) === "true");

    if (!ok) {
      d.classList.add("bg-gray-300", "text-gray-600", "line-through", "pointer-events-none");
    } else if (aprobado) {
      d.classList.add("bg-indigo-600", "text-white", "line-through");
    } else {
      d.classList.add("bg-pink-400", "text-gray-900", "hover:bg-pink-500");
    }

    d.addEventListener("click", () => {
      localStorage.setItem(m.id, !aprobado);
      location.reload();
    });

    cont.appendChild(d);
  });

  malla.appendChild(cont);
}
