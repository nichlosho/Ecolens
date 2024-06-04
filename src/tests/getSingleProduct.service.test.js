var chai = require("chai");
var chaiHttp = require("chai-http");
var async = require("async");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var http = require("http");

chai.use(chaiHttp);

var baseUrl = "https://ecolens.onrender.com";

describe("Test Get Single Product API call result", function () {
    var requestResult;
    var response;
    var productId; // Variable to store the product ID

    before(function (done) {
        chai.request(baseUrl)
            .get("/products")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                productId = res.body[0]._id; // Assuming the first product ID is used for the test
                done();
            });
    });

    it("Should return a single product object", function (done) {
        chai.request(baseUrl)
            .get("/products/" + productId)
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(response.body).to.be.an("object");
                done();
            });
    });

    it("The returned product should have the expected properties", function () {
        expect(requestResult).to.include.keys("name");
        expect(requestResult).to.have.property("_id");
        expect(requestResult).to.have.property("description");
        expect(requestResult).to.have.property("glassesInfo");
    });

    it("The returned product should have the expected property types", function () {
        expect(requestResult.name).to.be.a("string");
        expect(requestResult.description).to.be.a("string");
        expect(requestResult.glassesInfo).to.be.a("object");
    });
});
