const UserModel = require("./../database/models/user_model");
const faker = require("faker");

// Seeds admin users
const adminUserPromises = [];
function setUpAdminUser(i) {
    
    return UserModel.create({ 
        email: `admin+${i}@test.com`,
        firstName: "Admin", 
        lastName: `#${i}`,
        password: "admintest",
        admin: true
    });
}

for(let i = 1; i <= 2; i++) {
    adminUserPromises.push(setUpAdminUser(i));
    console.log(`Created admin ${i}`);
}

const testUserPromises = [];
function setUpTestUser(i) {
    
    return UserModel.create({ 
        email: `user+${i}@test.com`,
        firstName: faker.name.firstName(), 
        lastName: faker.name.lastName(),
        password: "usertest",
        admin: false
    });
}

for(let i = 1; i <= 10; i++) {
    testUserPromises.push(setUpTestUser(i));
    console.log(`Created user ${i}`);
}


Promise.all([...adminUserPromises, ...testUserPromises])
    .then(user => {
        console.log(`Seeds file successful, created ${user.length} admin users`);
    })
    .catch(error => {
        if (error.message.includes("E11000")) {
            console.log("*** Users already seeded. ***");
        } else {
            console.log(`Seeds file had an Error: ${error}`);
        }
    });
