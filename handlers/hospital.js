const db = require('../db.js');

const hospital = {};
module.exports = hospital;

hospital.renderPage = (request, h) => h.file('./index.html');

hospital.renderPageAdd = (request, h) => h.file('./adding.html');

hospital.renderPageTreat = (request, h) => h.file('./treatment.html');


////////////////////////////////// doctors

hospital.getAllDocs = () => db.getAllDocs();

hospital.getAllDocsCount = () => db.getAllDocsCount();

hospital.getMaxSalary = () => db.getMaxSalary();

hospital.getDoctor = (request) => {
  const { id } = request.payload;
  return db.getDoctor(id);
}

hospital.addDoctor = (request) => {
  const { text } = request.payload;
  return db.addDoc(text);
};

hospital.deleteDoctor = (request) => {
  const { id } = request.payload;
  return db.deleteDoc(id);
}

///////////////////////////////// departments

hospital.getAllDepart = () => db.getAllDepart();

///////////////////////////////// Treatments

hospital.getAllTreatByBoth =(request) => {
  const { pat_id, doc_id } = request.payload;
  return db.getAllTreatByBoth(pat_id, doc_id);
}

hospital.getAllTreatByDoc =(request) => {
  const { id } = request.payload;
  return db.getAllTreatByDoc(id);
}

hospital.getAllTreatByPat =(request) => {
  const { id } = request.payload;
  return db.getAllTreatByPat(id);
}

////////////////////////////////

// todo.update = (request) => {
//   const { id, value } = request.payload;
//   return db.update(id, value);
// };

// todo.delete = (request) => {
//   const { id } = request.payload;
//   return db.delete(id);
// };