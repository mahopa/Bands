//Array to hold the bands
var Bands = [];
var rev = -1;
//Band Constructor
var Band = function (name, genre) {
    this.name = name;
    this.genre = genre;
    this.volume = 5;
};
Band.prototype.playLouder = function () {
    if (this.volume < 11) {
        this.volume++;
        return "We're playing at" + this.volume;
    }
    else {
        return "It goes all the way to" + this.volume;
    }
};
var WritePage = function (array) {
    if (!array) {
        array = Bands;
    }
    var holder = "<table>";
    //for (var x in Bands) {
    //    holder += "<tr>";
    //    holder += "<td>";
    //    holder += Bands[x].name;
    //    //holder += Bands[x]['name'];
    //    holder += "</td>";
    //    holder += "<td>";
    //    holder += Bands[x].genre;
    //    holder += "</td>";
    //    holder += "</tr>";
    //}
    for (var i = 0; i < array.length; i++) {
        holder += "<tr>";
        for (var j in array[i]) {
            if (j === "name" || j == "genre") {
                holder += "<td>";
                holder += array[i][j];
                // alert(i + ": " + j);
                holder += "</td>";
            }
        }
        holder += "</tr>";
    }
    holder += "</table>";
    document.getElementById("Bands").innerHTML = holder;
};
//Add Band Function
var AddBand = function () {
    //Extract Elements
    var name = document.getElementById("Name").value;
    var genre = document.getElementById("Genre").value;
    //Constrct Object
    var band = new Band(name, genre);
    //Firebase
    var request = new XMLHttpRequest();
    request.open("POST", "https://domo.firebaseio.com/bands/.json");
    //This runs when the response returns
    request.onload = function () {
        //Checks is it worked based on the response codes
        if (this.status >= 200 && this.status < 400) {
            //This is success
            var data = JSON.parse(this.response);
            alert(this.response);
            band.key = data.name;
            Bands.push(band);
            Sort();
        }
        else {
          //This is the error but server responded  
        }
    };
    //This runs no response or communication error
    request.onerror = function () {
        //this is a comm error
    };
    request.send(JSON.stringify(band));
    //Push into Array
    
    //Write Page
   
};
var Search = function () {
    var output = [];
    var search = document.getElementById("search").value;
    if (!search) {
        WritePage();
    }
    else {
        for (var b in Bands) {
            for (var p in Bands[b]) {
                if (Bands[b][p].toString().indexOf(search) != -1) {
                    output.push(Bands[b]);
                }
            }
        }
        WritePage(output);
    }
};
var Sort = function (sort) {
    if (!sort) {
        sort = 'name';
    }
    if (rev === -1) {
        rev = 1;
    }
    else {
        rev = -1;
    }
    Bands.sort(
        function (a, b) {
            if (a[sort] > b[sort]) {
                return 1 * rev;
            }
            else if (a[sort] < b[sort]) {
                return -1 * rev;
            }
            else {
                return 0;
            }
        });
    WritePage();
};

var Seeder = function () {
    Bands.push(new Band("Beatles", "Rock"));
    Bands.push(new Band("FleetwoodMac", "Rock"));
    Bands.push(new Band("Journey", "Rock"));
    Bands.push(new Band("Pearl Jam", "Rock"));
    Bands.push(new Band("Simon and Garfunkel", "Folk"));
    Bands.push(new Band("KC and the Sunshine Band", "Disco"));
    Bands.push(new Band("The Doors", "Classic Rock"));
    Bands.push(new Band("Brittany Spears", "music?"));
    Bands.push(new Band("TransSiberan Orcestra", "Instrumental"));
    Bands.push(new Band("Kool and the Gang", "R&B/Pop"));
    Bands.push(new Band("Led Zepplin", "Classic Rock"));
    Sort();
};
Seeder();