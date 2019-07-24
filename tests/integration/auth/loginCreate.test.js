require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../../app");

beforeAll(() => {
    mongoose.connect(process.env.DB_HOST_TEST, { useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    mongoose.connection.on("error", err => console.log(err));
});


afterAll(() => {
    mongoose.connection.close();
});


describe("The user logs in to app", () => {
    test("POST /auth/login with valid req body", async () => {
        const response = await supertest(app)
            .post("/auth/login")
            .send({
                email: "user+1@test.com",
                password: "usertest",
            })
            .expect(200);

        expect.objectContaining({
            token: expect.any(String)
        });
    });
});