var chai = require("chai");
var chaiHttp = require("chai-http");
var async = require("async");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var http = require("http");

chai.use(chaiHttp);
var baseUrl = "https://ecolens.onrender.com";

describe("Test Get Single Customer API call result", function () {
    var requestResult;
    var response;
    var customerId;

    before(function (done) {
        chai.request(baseUrl)
            .get("/users")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.length.above(0);
                customerId = res.body[0]._id;
                expect(customerId).to.be.a("string");
                done();
            });
    });

    it("Should return a single customer object", function (done) {
        chai.request(baseUrl)
            .get("/users/" + customerId)
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(response.body).to.be.an("object");
                done();
            });
    });

    it("The returned customer should have the expected properties", function () {
        expect(requestResult).to.include.keys("email");
        expect(requestResult).to.have.property("_id");
        expect(requestResult).to.have.property("firstName");
        expect(requestResult).to.have.property("email");
    });

    it("The returned customer should have the expected property types", function () {
        expect(requestResult.firstName).to.be.a("string");
        expect(requestResult.email).to.be.a("string");
    });
});
