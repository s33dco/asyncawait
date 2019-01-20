const users = [ {id :1, name: 'frank', schoolId: 101},
                {id :2, name: 'benny', schoolId: 999} ];

const grades = [{id:1, schoolId: 101, grade: 86},
                {id:2, schoolId: 999, grade: 100},
                {id:3, schoolId: 101, grade: 80}
                ];

// functions with promises

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
}

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      resolve(user);
    } else {
      reject(`unable to find user with id of ${id}`);
    }
    });
  };

const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser)=>{
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    // average
    // return string
    let average = 0;

    if (grades.length > 0) {
      average = grades.map((grade) => grade.grade).reduce((a, b) =>  a + b)/ grades.length
    }
    return `${user.name} has an average of ${average}% in the class.`
  })
};



// standard promises


getStatus(1).then((status) => {
  console.log(status);
  }).catch((e) => {
  console.log(e);
  })

getGrades(101).then((grades) => {
    console.log(grades);
  }).catch((e) => {
    console.log(e);
  })

getUser(1).then((user) => {
    console.log(user);
  }).catch((e) => {
    console.log(e);
  })


// async await



// async functions

const getStatusAlt = async (userId) => {
  const user = await getUser(userId); // promise to come back
  const grades = await getGrades(user.schoolId);
  let average = 0;
  if (grades.length > 0) {
    average = grades.map((grade) => grade.grade).reduce((a, b) =>  a + b)/ grades.length
  }
  return `${user.name} has an average of ${average}% in the class.`
};





getStatusAlt(99).then((summary)=> {
  console.log(summary);
}).catch((e) => {
  console.log(e);
});
