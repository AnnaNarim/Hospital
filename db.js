const { Client } = require('pg');

const Database = {};

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5432,
});

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

////////////////////// get All 
Database.getAllDepart = () => new Promise((resolve, reject) => {
  client.query(
    `Select doctor.* , t1.name, t1.budget
    from doctor, ( select d.* , h.doct_id from department d, head_doctors h
     where d.dep_id = h.dep_id) t1 
    where doctor.doct_id = t1.doct_id`, 
    (err, res) => {
    if (err) return reject(err);
    return resolve(res.rows);
  })
});

Database.getAllDocs = () => new Promise((resolve, reject) => {
  client.query('Select * from doctor', (err, res) => {
    if (err) return reject(err);
    return resolve(res.rows);
  })
});

Database.getAllDocsCount = () => new Promise((resolve, reject) => {
  client.query('Select count(*) from doctor', (err, res) => {
    if(err) return reject(err);
    return resolve(res.rows);
  })
});

Database.getMaxSalary = () => new Promise((resolve, reject) => {
  client.query('Select max(salary) from doctor', (err, res) => {
    if(err) return reject(err);
    return resolve(res.rows);
  })
});

// Database.getAllPatients = () => new Promise((resolve, reject) => {
//   client.query('Select * from patient', (err, res) => {
//     if (err) return reject(err);
//     return resolve(res.rows);
//   })
// });

// Database.getAllNurses = () => new Promise((resolve, reject) => {
//   client.query('Select * from nurse', (err, res) => {
//     if (err) return reject(err);
//     return resolve(res.rows);
//   })
// });

// Database.getAllTreatments = () => new Promise((resolve, reject) => {
//   client.query('Select * from treatment', (err, res) => {
//     if (err) return reject(err);
//     return resolve(res.rows);
//   })
// });

////////////////////////////////////////



///////////////////////// get SPECIFIC ITEM

// Database.getDepart = (id) => new Promise((resolve, reject) => {
//   client.query(`Select * from department where dep_id = ${id}`, (err, res) => {
//     if (err) return reject(err);
//     return resolve(res.rows);
//   })
// });

Database.getDoctor = (id) => new Promise((resolve, reject) => {
  client.query(`Select * from doctor where doct_id = ${id}`, (err, res) => {
    if (err) return reject(err);
    return resolve(res.rows);
  })
});

///////////////////////////////////////////////



/////////////////////// ADD
Database.addDoc = (firstname, lastname, salary, birth, address, dep_id, room) => {
  return new Promise((resolve, reject) => {
    client.query(`insert into doctor
      (first_name, last_name, salary, birth, dep_id, address, room)
      values('${firstname}', '${lastname}', '${salary}', '${birth}', '${dep_id}', '${address}', '${room}')`,
      (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    })
  });
};
////////////////////////////////


////////////////////Delete
Database.deleteDoc = (id) => {
  return new Promise((resolve, reject) => {
    client.query(`delete from doctor where doct_id=${id}`, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  })
};
///////////////////////////////////


///////////////////// UPDATE ??????????

Database.updateDoc = (id, payload) => {
  return new Promise((resolve, reject) => {
    client.query(`update doctor
      set first_name='${payload.first_name}',
        last_name='${payload.last_name}',
        address='${payload.address}',
        birth='${payload.birth}',
        room=${payload.room},
        salary=${payload.salary},
        dep_id=${payload.dep_id}
      where doct_id=${id}`, 
      (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    })
  })
};

///////////////////////////////////////


Database.getAllTreatByDoc = (id) => {
  return new Promise((resolve, reject) => {
    client.query(`select * 
      from doctor, treatment
      where doctor.doct_id = treatment.doct_id and doctor.doct_id = ${id}`, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    })
  })
};

Database.getAllTreatByPat = (id) => {
  return new Promise((resolve, reject) => {
    client.query(`select * 
      from patient, treatment
      where patient.pat_id = treatment.pat_id and patient.pat_id = ${id}`, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    })
  })
};

Database.getAllTreatByBoth = (pat_id, doc_id) => {
  return new Promise((resolve, reject) => {
    client.query(`
      select * 
      from patient, (
        select * from doctor, treatment where treatment.doct_id = ${doc_id} and  doctor.doct_id = treatment.doct_id) t
      where patient.pat_id = t.pat_id and patient.pat_id = ${pat_id};
      `,
      (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    })
  })
};

module.exports = Database;