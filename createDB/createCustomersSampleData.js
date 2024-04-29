db.createCollection('Customers')
customersCollection = db.getCollection("Customers")
customersCollection.insertMany([
{
	address: {
		city: "generic city",
		country: "United States",
		state: "Washington",
		street: "Generic street",
		zipCode: "1234"
	},
	email: "email@email.com",
	firstName: "John", 
	lastName: "Doe",
	password: "password1",
	username: "jdoe" ,
},

{
	address: {
		city: "Seattle",
		country: "United States",
		state: "Washington",
		street: "1700 1st Ave S",
		zipCode: "98134"
	},
	email: "showbox@sodo.com",
	firstName: "Showbox", 
	lastName: "SoDo",
	password: "password2",
	username: "ShowboxSoDo" ,
},

{
	address: {
		city: "Seattle",
		country: "United States",
		state: "Washington",
		street: "387 Wilkinson Cliffs",
		zipCode: "97558"
	},
	email: "kaci45@yahoo.com",
	firstName: "Jane", 
	lastName: "Doe",
	password: "Doe123",
	username: "Jane456" ,
},
{
    address: {
      city: "Emerald City",
      country: "United States",
      state: "Kansas",
      street: "Yellow Brick Road",
      zipCode: "54321"
    },
    email: "frank.baum@email.com",
    firstName: "Frank",
    lastName: "Baum",
    password: "ozWizard1",
    username: "fbaum"
  },
  {
    address: {
      city: "Springfield",
      country: "United States",
      state: "Illinois",
      street: "Evergreen Terrace",
      zipCode: "62558"
    },
    email: "homer.simpson@email.com",
    firstName: "Homer",
    lastName: "Simpson",
    password: "doh12345",
    username: "hsimpson"
  },
  {
    address: {
      city: "Gotham",
      country: "United States",
      state: "New Jersey",
      street: "Wayne Manor",
      zipCode: "07097"
    },
    email: "bruce.wayne@email.com",
    firstName: "Bruce",
    lastName: "Wayne",
    password: "b4tmanSecret",
    username: "bwayne"
  },
  {
    address: {
      city: "Metropolis",
      country: "United States",
      state: "New York",
      street: "Daily Planet",
      zipCode: "10001"
    },
    email: "clark.kent@email.com",
    firstName: "Clark",
    lastName: "Kent",
    password: "superman77",
    username: "ckent"
  },
  {
    address: {
      city: "Star City",
      country: "United States",
      state: "California",
      street: "Queen Mansion",
      zipCode: "90001"
    },
    email: "oliver.queen@email.com",
    firstName: "Oliver",
    lastName: "Queen",
    password: "greenArrow88",
    username: "oqueen"
  }
])

