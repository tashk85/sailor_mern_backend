const UserModel = require("./../database/models/user_model");

// Seeds admin users
const adminUserPromises = [];
function setUpAdminUser(i) {
    
    return UserModel.create({ 
        email: `admin${i}@test.com`,
        firstName: "admin", 
        lastName: "first",
        password: "admintest",
        admin: true
    });
}

for(let i = 0; i < 2; i++) {
    adminUserPromises.push(setUpAdminUser(i));
    console.log(`Created admin ${i}`);
}


Promise.all(adminUserPromises)
    .then(user => {
        console.log(`Seeds file successful, created ${user.length} users`);
    })
    .catch(err => console.log(`Seeds file had an error: ${err}`))