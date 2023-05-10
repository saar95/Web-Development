const fs = require("fs");

var superheroes = require("superheroes");

var supervillians = require("supervillains")

var mysuperhero = superheroes.random();

var myVillian = supervillians.random();

console.log("hero " +mysuperhero+" fight vs " +myVillian);

