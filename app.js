//
// Basic methods
//
function redirect(url)
{
	window.location.href=url;
}

//
// Database
//
var db = null;
var objectStore;
function CreateDBConnection(afterOpen){
    if(db == null){
        request = window.indexedDB.open("db_diceapp",1);

        request.onerror = function(event) {
			console.log("DB error!");
        };

        request.onsuccess = function(event) {
			console.log("DB open!");
			
			db = request.result; 
			afterOpen();
        };

        request.onupgradeneeded = function(event) {
			console.log("DB onupgradeneeded");
			db = event.target.result;
			objectStore = db.createObjectStore("db_diceapp", {  keyPath: "id", autoIncrement: true });
			
			objectStore.add({ id: 0, color: "blue", dices: "4", customroll : true });
        };
    }
    else
    {
        afterOpen();
    }
}

function loadSettings()
{
	objectStore=db.transaction(["db_diceapp"], "readwrite").objectStore("db_diceapp"); 
    var res = objectStore.get(0);
    res.onsuccess = function(event) {
        if(res.result) {
			color = res.result["color"];
			numberOfDices = res.result["dices"];
			customRoll = res.result["customroll"];
        }
		else
		{
			// if db connection failed
			alert("Can not load data from DB!");
			color = "blue";
			numberOfDices = 1;
			customRoll = false;
		}
		
    };
}

function loadSettingsAndGenerate()
{
	objectStore=db.transaction(["db_diceapp"], "readwrite").objectStore("db_diceapp"); 
    var res = objectStore.get(0);
    res.onsuccess = function(event) {
        if(res.result) {
			color = res.result["color"];
			numberOfDices = res.result["dices"];
			customRoll = res.result["customroll"];
        }
		else
		{
			// if db connection failed
			alert("Can not load data from DB!");
			color = "blue";
			numberOfDices = 1;
			customRoll = false;
		}
		generate();
    };
}

function save(){
    objectStore=db.transaction(["db_diceapp"], "readwrite").objectStore("db_diceapp"); 
    var res = objectStore.get(0);
    res.onsuccess = function(event) {
        if(res.result) {
			objectStore.put({ id: 0, color: document.getElementById("color").value, dices: res.result["dices"] = document.getElementById("numberofdices").value, customroll : res.result["customroll"] = document.getElementById("customroll").value });
        }
    };
}