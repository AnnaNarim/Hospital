const Handlers = require('../handlers/hospital.js');

const routes = [];
module.exports = routes;

routes.push({
  method: 'GET',
  path: '/',
  handler: Handlers.renderPage,
  config: {
    tags: ['api'],
    description: 'Page to render form.html',
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
    description: 'to get all departments',
  },
});

routes.push({
  method: 'GET',
  path: '/api/treatments/doctor/{id}',
  handler: Handlers.getAllTreatByDoc,
  config: {
    tags: ['api'],
    description: 'to get all departments',
  },
});

routes.push({
  method: 'GET',
  path: '/api/treatments/patient/{id}',
  handler: Handlers.getAllTreatByPat,
  config: {
    tags: ['api'],
    description: 'to get all departments',
  },
});



////////////////////////////////////////
// routes.push({
//   method: 'POST',
//   path: '/api/todos',
//   handler: Handlers.add,
//   config: {
//     tags: ['api'],
//     description: 'to add todo',
//   },
// });

// routes.push({
//   method: 'GET',
//   path: '/api/todos',
//   handler: Handlers.getTodos,
//   config: {
//     tags: ['api'],
//     description: 'to get all todos',
//   },
// });

// routes.push({
//   method: 'PUT',
//   path: '/api/todos/{id}',
//   handler: Handlers.update,
//   config: {
//     tags: ['api'],
//     description: 'update todo at given index',
//   },
// });

// routes.push({
//   method: 'DELETE',
//   path: '/api/todos/{id}',
//   handler: Handlers.delete,
//   config: {
//     tags: ['api'],
//     description: 'delete todo at given index (change active to 0)',
//   },
// });