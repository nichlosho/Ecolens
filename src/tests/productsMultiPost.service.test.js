var chai = require("chai");
var chaiHttp = require("chai-http");
var async = require("async");
var expect = chai.expect;


chai.use(chaiHttp);

var baseUrl = "https://ecolens.azurewebsites.net/";

describe("Test Post Multiple Products API call result", function () {
  var requestResult;
  var response;

  var products = [
    {
      _id: '665cc6673dc7feb078bef02f',
     
      name: "Black Eyeglasses",
      description: "This is a wooden based, black frame and gray lens eyeglasses",
      price: 29.99,
      quantity: 100,
      inventoryStatus: "In Stock",
      category: "Eyeglasses",
      glassesInfo: {
        material: "Wood",
        frameColor: "Black",
        lensColor: "Gray",
        prescriptionType: "None"
      },
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRXTtDcoA7HCiOXMIaGLlaOO467K_NpGQzU5e3PxY2Rpz2EsznAtnONLmdp-g7vqRVRs4aNciZcK3ZG618vUsJwtqXuCAP3L6sNW8V-LAosCG-if_uVA5Xj5nk-WMo"
    },
    {
      _id: '665cc6673dc7feb078bef030',
      name: "Blue Light Glasses",
      description: "Designed to filter and block blue light, these glasses help reduce eye strain",
      price: 49.99,
      quantity: 150,
      inventoryStatus: "In Stock",
      category: "Blue Light Glasses",
      glassesInfo: {
        material: "Plastic",
        frameColor: "Blue",
        lensColor: "Clear",
        prescriptionType: "None"
      },
      image: "https://media.istockphoto.com/id/1190208287/photo/blue-light-blocking-glasses-with-yellow-lenses-and-modern-trendy-stile-on-white-background.jpg?s=1024x1024&w=is&k=20&c=lfecZUIOHTl7zyJJublog7sowGvxA0tzuSH_hwolZbc="
      
   
    },
    {
      _id:'665cc6673dc7feb078bef031',
      name: "Sunglasses",
      description: "Classic aviator sunglasses with UV protection for outdoor use",
      price: 39.99,
      quantity: 80,
      inventoryStatus: "Low Stock",
      category: "Sunglasses",
      glassesInfo: {
        material: "Metal",
        frameColor: "Silver",
        lensColor: "Dark Green",
        prescriptionType: "None"
      },
      image: "https://media.istockphoto.com/id/1177608611/photo/isolated-image-of-two-blue-light-blocking-glasses-on-a-white-background-health-good-sleeping.jpg?s=612x612&w=0&k=20&c=Ivh4LUGbM32azp9JRwHPtuA-prFz9wIlww7U0dnVMNA="
      
    }
  ];

  
  before(function (done) {
    this.timeout(30000);
    // Delete existing products before re-insertion
    async.each(products, function (product, callback) {
      chai.request(baseUrl)
        .delete('/products/'+ product._id) 
        .end(function (error, res) {
          if (error) {
            console.error("Error during DELETE request:", error); // Log error
            return callback(error);
          }
          callback();
        });
    }, function (err) {
      if (err) {
        console.error("Error during product deletion:", err); // Log error
        return done(err);
      }

      chai.request(baseUrl)
        .post("/products")
        .send(products)
        .end(function (error, res) {
          if (error) {
            console.error("Error during POST request:", error); // Log error
          } else {
            requestResult = res.body;
            response = res;
          }
          done();
        });
    });
  });

  it("Should return a success status", function () {
    expect(response).to.have.status(200);
  });

  it("The elements in the array have the expected properties", function () {
    expect(response.body).to.satisfy(function (body) {
      for (var i = 0; i < body.length; i++) {
        expect(body[i]).to.have.property("name");
        expect(body[i]).to.have.property("description");
        expect(body[i]).to.have.property("glassesInfo");
      }
      return true;
    });
  });


  // Ensure correct types for specific attributes
  it("The elements in the array have the expected properties with correct types", function () {
    expect(response.body).to.satisfy(function (body) {
      for (var i = 0; i < body.length; i++) {
        expect(body[i].name).to.be.a("string");
        expect(body[i].description).to.be.a("string");
        expect(body[i].glassesInfo).to.be.a("object");
      }
      return true;
    });
  });
});
