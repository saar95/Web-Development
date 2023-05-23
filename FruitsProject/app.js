const mongoose = new require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');


const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please give a name."]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);


const pineapple = new Fruit({
    name: "Pineapple",
    rating: 10,
    review: "sweeeeet"
})

//pineapple.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const john = new Person({
    name: "John",
    age: 27,
});

//john.save();
//SAVE MANY
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 8,
    review: "green"
});
const orange = new Fruit({
    name: "Orange",
    rating: 8,
    review: "orange"
});
const banana = new Fruit({
    name: "Banana",
    rating: 3,
    review: "yellow"
});
//Fruit.insertMany([kiwi, orange, banana]);

//READ
Fruit.find({}).then(function (FoundItems) {
        FoundItems.forEach(function (fruit) {

            console.log(fruit.name);

        });

    }
);

//update
Person.updateOne({_id: "646a0753243558122a51e1c5"}, {favFruit: orange}).then(function (err) {
    if (err) {
        console.log(err);
        console.log("what");
    } else {
        console.log("YAY");
    }
});

//delete
// Fruit.deleteOne({name: "Melon"}).then(function (err) {
//     console.log(err);
// });
//
// Person.deleteMany({name: "Saar"}).then(function (err) {
//     console.log(err);
// });

