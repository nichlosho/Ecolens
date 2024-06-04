var chai = require("chai");
var chaiHttp = require("chai-http");
var async = require("async");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var http = require("http");

chai.use(chaiHttp);

var baseUrl = "https://ecolens.onrender.com";

describe("Test Get All Products API call result", function () {
    var requestResult;
    var response;

    before(function (done) {
        chai.request(baseUrl)
            .get("/products")
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    // Ensures returned value is an array & ensures API call is successful
    it("Should return an array object with more than 2 objects", function () {
        expect(response).to.have.status(200);
        expect(response.body).to.have.length.above(0);
        expect(response).to.have.headers;
    });

    // Ensures that expected attributes in first entry
    it("The first entry in the array has known properties", function () {
        expect(requestResult[0]).to.include.keys("name");
        expect(requestResult[0]).to.have.property("_id");
        expect(response.body).to.not.be.a.string;
    });

    // Ensures that each object has specific attributes
    it("The elements in the array have the expected properties", function () {
        expect(response.body).to.have.length.above(0);
        expect(response.body).to.satisfy(function (body) {
            for (var i = 0; i < body.length; i++) {
                expect(body[i]).to.have.property("name");
                expect(body[i]).to.have.property("description");
                expect(body[i]).to.have.property("glassesInfo");
            }
            return true;
        });
    });

    // Ensures that correct type for specific attributes
    it("The elements in the array have the expected properties with correct types", function () {
        expect(response.body).to.have.length.above(0);
        expect(response.body).to.satisfy(function (body) {
            for (var i = 0; i < body.length; i++) {
                expect(body[i].name).to.be.a("string");
                expect(body[i].description).to.be.a("string");
                expect(body[i].glassesInfo).to.be.a("object");
            }
            return true;
        });
    });

    // Ensures that a json is returned
    it("Should have Content-Type header set to application/json", function () {
        expect(response).to.have.header(
            "content-type",
            "application/json; charset=utf-8"
        );
    });
});
