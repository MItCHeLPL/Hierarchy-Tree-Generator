var generations = 
[
    [//X1
        ["Parent", null], //Y1 //Y Name, Y in X-1 as Parent
    ],
    [//X2
        ["Child", "0"], //Y1
    ]
];

/* 
    HOW TO USE generations Array:

    X - Generation
    Y - Object in Generation

    STRUCTURE:
    var generations = 
    [
        [//X1
            ["test1", null], //Y1 //Y Name, x-1 Parent
            ["test2", null] //Y2
        ],
        [//X2
            ["test3", 1], //Y1
            ["test4", 2] //2
        ]
    ];

    READING:
    generations[X][Y][value to read];
    value: 0 - Y Name, 1 - Y in X-1 as Parent.

    generations.length - X count,
    generations[X].length - Y in X count
*/

//Save name when typing
function SaveObject(id, X, Y)
{
    //Get value from input
    var value = document.getElementById(id).value;

    //name object
    generations[X-1][Y-1][0] = value;

    //Update children options
    UpdateSelect(X+1);
}

function UpdateSelect(X)
{
    //Get all selects from this generation
    var selectClass = document.getElementsByClassName("select" + (X-1) + "GenerationParent");
    var options = "";

    //Prepare options for all parents
    for(var i=0; i<generations[X-2].length; i++)
    {
        options += "<option value=" + i + ">" + generations[X-2][i][0] + "</option>";
    }
    
    //Put options from parent generation into all children in this generation
    for(var j=0; j<selectClass.length; j++)
    {
        selectClass[j].innerHTML = options;
    }
}

//When changed parent
function ChangeParent(option, X, Y)
{
    //Set parent to chosen parent (-1 because array starts from 0)
    generations[X-1][Y-1][1] = option.value;
}

function AddInput(X, Y, where, addSelect)
{

    /*TEMP
    Add when addSelect is false into div id="X GenerationInputs", 
        <div id="X Generation Y Input">
            <input type="text" id=" X Generation Y Object" onchange="SaveObject('X Generation Y Object')" /><br />
        </div>

    When addSelect is true into div id="X GenerationInputs"
        <div id="X Generation Y Input">
            <select name="select X-1 GenerationParent" id="select X-1 GenerationParent">
                <option value="X-1 GenerationObject Y">X-1 GenerationObject Y value</option>
            </select><br />
            <input type="text" id="X Generation Y Object" onchange="SaveObject('X Generation Y Object')" />
        </div>
    */

    //Create structure
    var newStructure = document.createElement("div");

    //Give ID to the structure
    newStructure.id = X + "Generation" + Y + "Input";

    //Fill structure with elements
    if(addSelect)
    {
        //Add select
        newStructure.innerHTML += "<select name='select" + (X-1) + "GenerationParent' class='select" + (X-1) + "GenerationParent' onchange='ChangeParent(this, " + X + ", " + Y + ")'>";
        newStructure.innerHTML += "</select><br />"
    }
    var idNameToString = '"' + X + 'Generation' + Y + 'Object"'; //Separate to avoid " ' errors
    //Add input
    newStructure.innerHTML += "<input type='text' id='" + X + "Generation" + Y + "Object' onchange='SaveObject(" + idNameToString + ", " + X + ", " + Y + ")' />";

    //insert structure into page
    document.getElementById(where).appendChild(newStructure);

    //Change Add button function
    document.getElementById(X + "GenerationAddInputButton").setAttribute("onClick", "AddInput(" + X + ", " + parseInt(Y+1) + ", '" + X + "GenerationInputs', " + addSelect + ")");

    //Update all selects in this generation
    if(addSelect)
    {
        UpdateSelect(X);
    }

    //Expand array
    if(addSelect)
    {
        generations[X-1].push(["", generations[X-2][0]]); //If child then default parent to first parent
    }
    else
    {
        generations[X-1].push(["", null]); //if parent then default parent to null
    }
}

function RemoveInput()
{
    //TEMP If Y in this X is > 1
}

function AddGeneration()
{

    /*TEMP
    Add into div id="generationsBox",
        <div id="X GenerationBox" class="GenerationBox">
            <h3>X Generation</h3>

            <div id="X GenerationInputs">
                
                AddInput("X GenerationInputs", true);

            </div>

            <input type="button" id="X GenerationAddInputButton" value="Add Object" onclick="AddInput('X GenerationInputs')" />
            <input type="button" id="X GenerationRemoveInputButton" value="Remove Object" onclick="RemoveInput('X Generation Y Input')" />
        </div>
    */

}

function RemoveGeneration()
{
    //TEMP If X > 2
}


function GenerateTree()
{
    //TEMP manipulate svg
}