const Handlers = require('../handlers/hospital.js');

const routes = [];
module.exports = routes;

routes.push({
  method: 'GET',
  path: '/',
  handler: Handlers.renderPage,
  config: {
    tags: ['api'],
    description: 'Render index.html',
  },
});

routes.push({
  method: 'GET',
  path: '/adding',
  handler: Handlers.renderPageAdd,
  config: {
    tags: ['api'],
    description: 'Render adding.html',
  },
});

routes.push({
  method: 'GET',
  path: '/treatment',
  handler: Handlers.renderPageTreat,
  config: {
    tags: ['api'],
    description: 'Render treatment.html',
  },
});

//////////////////////////////////////// doctors
routes.push({
  method: 'GET',
  path: '/api/doctors',
  handler: Handlers.getAllDocs,
  config: {
    tags: ['api'],
    description: 'to get all doctors',
  },
});

routes.push({
  method: 'GET',
  path: '/api/doctors/count',
  handler: Handlers.getAllDocsCount,
  config: {
    tags: ['api'],
    description: 'to get count of all doctors',
  },
});

routes.push({
  method: 'GET',
  path: '/api/doctors/max',
  handler: Handlers.getMaxSalary,
  config: {
    tags: ['api'],
    description: 'to get max salary',
  },
});

routes.push({
  method: 'GET',
  path: '/api/doctors/{id}',
  handler: Handlers.getDoctor,
  config: {
    tags: ['api'],
    description: 'to get one doctor by id',
  },
});

routes.push({
  method: 'POST',
  path: '/api/doctors',
  handler: Handlers.addDoctor,
  config: {
    tags: ['api'],
    description: 'to add a doctor',
  },
});

routes.push({
  method: 'DELETE',
  path: '/api/doctors/{id}',
  handler: Handlers.deleteDoctor,
  config: {
    tags: ['api'],
    description: 'delete doc by id',
  },
});

routes.push({
  method: 'PUT',
  path: '/api/doctors/{id}',
  handler: Handlers.updateDoc,
  config: {
    tags: ['api'],
    description: 'update Doctor by given index',
  },
});

//////////////////////////////////// department

routes.push({
  method: 'GET',
  path: '/api/departments',
  handler: Handlers.getAllDepart,
  config: {
    tags: ['api'],
    description: 'to get all departments',
  },
});

//////////////////////////////////// treatment 

routes.push({
  method: 'GET',
  path: '/api/treatments/{pat_id}/{doc_id}',
  handler: Handlers.getAllTreatByBoth,
  config: {
    tags: ['api'],
    description: 'to get treatments by patient and doc',
  },
});

routes.push({
  method: 'GET',
  path: '/api/treatments/doctor/{id}',
  handler: Handlers.getAllTreatByDoc,
  config: {
    tags: ['api'],
    description: 'to get treatment by doc_id',
  },
});

routes.push({
  method: 'GET',
  path: '/api/treatments/patient/{id}',
  handler: Handlers.getAllTreatByPat,
  config: {
    tags: ['api'],
    description: 'to get treatments by patient id',
  },
});
