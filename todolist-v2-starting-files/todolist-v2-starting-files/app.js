const express = require("express");
const bodyParser = require("body-parser");
const mongoose = new require('mongoose');
const app = express();
const _ = require("lodash");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');


const itemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to your todolist"
});
const item2 = new Item({
    name: "Hit the + button to add a new item"
});
const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemSchema]
}

const List = mongoose.model("List", listSchema);


app.get("/", function (req, res) {

    Item.find({}).then(function (foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems).then(function () {

            }).catch(function (error) {
                console.log(error)      // Failure
            });
            res.redirect("/");
        } else {
            res.render("list", {listTitle: "Today", newListItems: foundItems});
        }

    }).catch(function (error) {
        console.log(error)
    })


});

app.post("/", function (req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    })


    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName}).then(function (foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        })
    }

});

app.post("/delete", function (req, res) {

    const listName = req.body.listName;
    const checkbox = req.body.checkbox

    if (listName === "Today") {
        Item.deleteOne({_id: checkbox}).then(function () {

        }).catch(function (error) {
            console.log(error)
        });
        res.redirect("/");
    } else {
        List.findOneAndUpdate({name: listName}, {
            $pull: {
                items: {
                    _id: checkbox
                }
            }
        }).then(function (foundList) {

            res.redirect("/" + listName);
        }).catch(function (error) {
            console.log(error);
        });
    }

});

app.get("/:listName", function (req, res) {

//what
    let listName = _.capitalize(req.params.listName);
    List.findOne({name: listName}).then(function (found) {
        if (!found) {
            let list = new List({
                name: listName,
                items: defaultItems
            });
            list.save();
            res.redirect("/" + listName);
        } else
            res.render("list", {listTitle: listName, newListItems: found.items});
    }).catch(function (error) {
        console.log(error);
    })

});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
