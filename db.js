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
    'Select * from doctor, ( select * from department d, head_doctors h where d.dept_id = h.dept_id) t1 where doctor.doct_id = t1.doct_id', 
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
Database.addDoc = (text) => {
  const fn = text.fn;
  const ln = text.ln; 
  const salary= text.salary;
  const birth= text.birth;
  const dep_id= text.dep_id;
  const address= text.address;
  const room= text.room;

  return new Promise((resolve, reject) => {
    client.query(`insert into listoftodos
      (first_name, last_name, salary, birth, dep_id, address, room)
      values('${fn}', '${ln}', '${salary}', '${birth}', '${dep_id}', '${address}', '${room}')`,
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
    client.query(`delete from doctor where id=${id}`, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  })
};
///////////////////////////////////


///////////////////// UPDATE ??????????

Database.updateDoc = (id, name, value) => {
  return new Promise((resolve, reject) => {
    client.query(`update doctor set todo='${value}' where id=${id}`, (err, res) => {
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
      where doctor.doc_id = treatment.doc_id and doctor.doc_id = ${id}`, (err, res) => {
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
      (select * from doctor, (select * 
        from treatment
        where treatment.pat_id = ${pat_id}
          and treatment.doc_id = ${doc_id}) t1
      where doctor.doc_id = t1.doc_id)
      union 
      (select * from patient, (select * 
        from treatment
        where treatment.pat_id = ${pat_id}
          and treatment.doc_id = ${doc_id}) t1
      where patient.pat_id = t1.pat_id)
      `,
      (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    })
  })
};

module.exports = Database;