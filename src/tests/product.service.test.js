var chai = require("chai");
var chaiHttp = require("chai-http");
var async = require("async");

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require("http");
chai.use(chaiHttp);

describe("Test Get All Products API call result", function () {
    var requestResult;
    var response;

    before(function (done) {
        chai.request("http://localhost:3000")
            .get("/products")
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it("Should return an array object with more than 2 objects", function () {
        expect(response).to.have.status(200);
        expect(response.body).to.have.length.above(0);
        expect(response).to.have.headers;
    });

    it("The first entry in the array has known properties", function () {
        expect(requestResult[0]).to.include.keys("name");
        expect(requestResult[0]).to.have.property("_id");
        expect(response.body).to.not.be.a.string;
    });

    it("The elements in the array have the expected properties", function () {
        expect(response.body).to.have.length.above(0);
        expect(response.body).to.satisfy(function (body) {
            for (var i = 0; i < body.length; i++) {
                expect(body[i]).to.have.property("name");
                expect(body[i]).to.have.property("description");
            }
            return true;
        });
    });
});
