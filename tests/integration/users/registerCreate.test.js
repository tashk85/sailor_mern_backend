require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../../app");

beforeAll(() => {
    mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    mongoose.connection.on("error", err => console.log(err));
});


afterAll(() => {
    mongoose.connection.close();
});


describe("The user signs up to app", () => {
    test("POST /auth/signup with valid req body", async () => {
        const response = await supertest(app)
            .post("/auth/signup")
            .send({
                firstName: "Jest",
                lastName: "Supertest",
                email: "jest7@test.com",
                password: "supertest",
                admin: false
            })
            .expect(200);

        expect.objectContaining({
            token: expect.any(String)
        });
    });
});