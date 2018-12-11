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
  const { id } = request.params;
  return db.getDoctor(id);
}

hospital.addDoctor = (request) => {
  const { firstname, lastname, salary, birth, address, dep_id, room} = request.payload;
  return db.addDoc(firstname, lastname, salary, birth, address, dep_id, room);
};

hospital.deleteDoctor = (request) => {
  const { id } = request.params;
  return db.deleteDoc(id);
}

///////////////////////////////// departments

hospital.getAllDepart = () => {
  console.log('---ekav hasav')
  return db.getAllDepart();
} 

///////////////////////////////// Treatments

hospital.getAllTreatByBoth =(request) => {
  const { pat_id, doc_id } = request.params;
  return db.getAllTreatByBoth(pat_id, doc_id);
}

hospital.getAllTreatByDoc =(request) => {
  const { id } = request.params;
  console.log('---oarams', id);
  return db.getAllTreatByDoc(id);
}

hospital.getAllTreatByPat =(request) => {
  const { id } = request.params;
  return db.getAllTreatByPat(id);
}

hospital.updateDoc = (request) => {
  const { id } = request.params;
  return db.updateDoc(id, request.payload);
};

////////////////////////////////

// todo.update = (request) => {
//   const { id, value } = request.payload;
//   return db.update(id, value);
// };

// todo.delete = (request) => {
//   const { id } = request.payload;
//   return db.delete(id);
// };