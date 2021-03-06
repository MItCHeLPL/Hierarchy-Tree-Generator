//Generation array
var generations = 
[
    [//X1
        ["Parent1 Gen1", null], //Y1 //Y Name, Y in X-1 as Parent
    ],
    [//X2
        ["Child1 Gen2", 0], //Y1
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

        //Preserve previously chosen parent
        selectClass[j].selectedIndex = generations[X-1][j][1];
    }
}

//When changed parent
function ChangeParent(option, X, Y)
{
    //Set parent to chosen parent (-1 because array starts from 0)
    generations[X-1][Y-1][1] = document.getElementById("select"+X+"Generation"+Y+"Object").options.selectedIndex;
}

function AddInput(X, Y, where, addSelect)
{
    //Create structure
    var newStructure = document.createElement("div");

    //Give ID to the structure
    newStructure.id = X + "Generation" + Y + "Input";

    //Separate to avoid " ' errors
    var idNameToString = '"' + X + 'Generation' + Y + 'Object"'; 

    //Fill structure with elements
    if(addSelect)
    {
        //Add select
        newStructure.innerHTML += "<select name='select" + (X-1) + "GenerationParent' class='select" + (X-1) + "GenerationParent' id='select"+X+"Generation"+Y+"Object' onchange='ChangeParent(this, " + X + ", " + Y + ")'></select><br />";

        //Add input
        newStructure.innerHTML += "<input type='text' id='" + X + "Generation" + Y + "Object' placeholder='Child" + Y + " Gen" + X + "' onchange='SaveObject(" + idNameToString + ", " + X + ", " + Y + ")' />";
    }
    else
    {
        //Add input
        newStructure.innerHTML += "<input type='text' id='" + X + "Generation" + Y + "Object' placeholder='Parent" + Y + " Gen" + X + "' onchange='SaveObject(" + idNameToString + ", " + X + ", " + Y + ")' />";
    }

    //insert structure into page
    document.getElementById(where).appendChild(newStructure);

    //Change Add button function
    document.getElementById(X + "GenerationAddInputButton").setAttribute("onClick", "AddInput(" + X + ", " + parseInt(Y+1) + ", '" + X + "GenerationInputs', " + addSelect + ")");

    //Show remove button
    document.getElementById(X + "GenerationRemoveInputButton").style.display = "inline";
    //Change Remove button function
    document.getElementById(X + "GenerationRemoveInputButton").setAttribute("onClick", "RemoveInput(" + X + ", " + parseInt(Y) + ", '" + X + "Generation" + parseInt(Y) + "Input', " + addSelect + ")");

    //Expand array
    if(addSelect)
    {
        generations[X-1].push(["Child" + Y + " Gen" + X + "", 0]); //If child then default parent to first parent
    }
    else
    {
        generations[X-1].push(["Parent" + Y + " Gen" + X + "", null]); //if parent then default parent to null
    }

    //Update all selects in this generation
    if(addSelect)
    {
        UpdateSelect(X);
    }

    //Update all selects in next generation
    if(generations.length != X-1)
    {
        UpdateSelect(X+1);
    }

    //Find Highest generation
    var maxHeight = 1;
    var maxHeightId = 1;

    for(var i=0; i<generations.length; i++)
    {
        if(parseInt(generations[i].length) > parseInt(maxHeight))
        {
            maxHeight = generations[i].length;
            maxHeightId = i;
        }
    }

    //Get hight of highest generation
    var highest = document.getElementById((maxHeightId+1) + "GenerationBox").scrollHeight;

    //Resize height of other generations
    for(var i=0; i<generations.length; i++)
    {
        document.getElementById((i+1) + "GenerationBox").setAttribute("style", "height: " + highest + "px;");
    }
}

function RemoveInput(X, Y, id, addSelect)
{
    if(generations[X-1].length > 1)
    {
        //Get structure
        var structure = document.getElementById(id);

        //Remove structure from page
        structure.parentNode.removeChild(structure);

        //Change Add button function
        document.getElementById(X + "GenerationAddInputButton").setAttribute("onClick", "AddInput(" + X + ", " + parseInt(Y) + ", '" + X + "GenerationInputs', " + addSelect + ")");

        //Change Remove button function
        document.getElementById(X + "GenerationRemoveInputButton").setAttribute("onClick", "RemoveInput(" + X + ", " + parseInt(Y-1) + ", '" + X + "Generation" + parseInt(Y-1) + "Input', " + addSelect + ")");
        //Hide remove button if 1 child left
        if(Y-1 == 1)
        {
            document.getElementById(X + "GenerationRemoveInputButton").style.display = "none";
        }

        //Update all selects in this generation
        if(addSelect)
        {
            UpdateSelect(X);
        }

        //Shrink array
        generations[X-1].pop();

        //Change parent in children if parent was deleted
        if(generations.length > X)
        {
            for(var i=0; i<generations[X].length; i++)
            {
                //If Child had selected deleted parent
                if(generations[X][i][1] == Y-1)
                {
                    //Newest alive parent
                    generations[X][i][1] = Y-2;
                }
            }

            //Refresh select
            UpdateSelect(X+1);
        }
    }
}

function AddGeneration(X)
{
    //Create structure
    var newStructure = document.createElement("div");

    //Give ID and class to the structure
    newStructure.id = X + "GenerationBox";
    newStructure.classList += "GenerationBox";

    //Fill Generation box
    newStructure.innerHTML += "<h3>" + X + " Generation</h3>";
    newStructure.innerHTML += "<div id='" + X + "GenerationInputs'></div>";

    newStructure.innerHTML += "<input type='button' style='display: none;' id='" + X + "GenerationRemoveInputButton' value='Remove Object' onclick='RemoveInput(" + X + ", 1, '" + X + "Generation1Input', true)' /><br />";
    newStructure.innerHTML += "<input type='button' id='" + X + "GenerationAddInputButton' value='Add Object' onclick='AddInput(" + X + ", 2, '" + X + "GenerationInputs', true)' />"

    //insert structure into page
    document.getElementById("generationsBox").appendChild(newStructure);

    //Expand array
    generations.push([]);

    //Add first object
    AddInput(X, 1, X + "GenerationInputs", true);

    //Hide remove input button
    document.getElementById(X + "GenerationRemoveInputButton").style.display = "none";

    //Change Add button function
    document.getElementById("addGenerationButton").setAttribute("onClick", "AddGeneration(" + (X+1) + ")");

    //Show remove button
    document.getElementById("RemoveGenerationButton").style.display = "inline";
    //Change Remove button function
    document.getElementById("RemoveGenerationButton").setAttribute("onClick", "RemoveGeneration(" + X + ")");
}

function RemoveGeneration(X)
{
    if(generations.length > 2)
    {
        //Get structure
        var structure = document.getElementById(X + "GenerationBox");

        //Remove structure from page
        structure.parentNode.removeChild(structure);

        //Change Add button function
        document.getElementById("addGenerationButton").setAttribute("onClick", "AddGeneration(" + X + ")");

        //Change Remove button function
        document.getElementById("RemoveGenerationButton").setAttribute("onClick", "RemoveGeneration(" + (X-1) + ")");
        
        //Hide remove button if 1 child left
        if(X-1 == 2)
        {
            document.getElementById("RemoveGenerationButton").style.display = "none";
        }

        //Shrink array
        generations.pop();
    }
}


//SVG
var svg = document.getElementById("svgOutput");

//How deep down are you, start from 50 so objects can fit
var svgCurrentY = 50;

//Y offset between generations
var generationYOffset = 50;

var xMargin = 50;

//Rect
var rectWidth = 150;
var rectHeight = 30;

function GenerateTree()
{  
    //Get SVG
    svg = document.getElementById("svgOutput");

    //Clear SVG
    svg.innerHTML = "";
    svgCurrentY = 50;

    //Set Graph height for amount of generations + 3px for stroke fill 
    svg.setAttribute("height", (generations.length * generationYOffset) + 3);

    //Generate 
    var spaceBetweenObjects;
    var currentX;

    var spaceBetweenObjectsFromPrevGen;

    var usedSpaceBetweenObjectsFromPrevGen = false;

    //X
    for(var i=0; i<generations.length; i++)
    {
        //Start from left
        currentX = 0;

        //Fixed space between objects
        spaceBetweenObjects = (svg.clientWidth / (generations[i].length + 1));

        //Get space between objects from previous generation
        if(i != 0)
        {
            //if prev gen had only one object
            if(generations[i-1].length == 1)
            {
                spaceBetweenObjectsFromPrevGen = spaceBetweenObjectsFromPrevGen * (generations[i-1][0][1]+1);
            }
            else 
            {
                spaceBetweenObjectsFromPrevGen = (svg.clientWidth / (generations[i-1].length + 1));
            }

            //If parent generation is greater than this generation
            if(generations[i-1].length > generations[i].length)
            {
                spaceBetweenObjects = spaceBetweenObjectsFromPrevGen;
        
                currentX = spaceBetweenObjectsFromPrevGen * (generations[i][0][1]);
            }
        }
        if(i > 1)
        {
            //If parents parent generation is greater than parent generation
            if(generations[i-2].length > generations[i-1].length)
            {
                spaceBetweenObjectsFromPrevGen = (svg.clientWidth / (generations[i-2].length + 1));

            }
        }
        else
        {
            spaceBetweenObjectsFromPrevGen = spaceBetweenObjects;
        }


        //Y
        for(var j=0; j<generations[i].length; j++)
        {
            usedSpaceBetweenObjectsFromPrevGen = false;

            //Generate object
            if(j != 0)
            {
                //if parent changes after previous object move this object under his parent
                if(generations[i][j-1][1] != generations[i][j][1])
                {
                    //add space after each object
                    currentX = spaceBetweenObjectsFromPrevGen * (generations[i][j][1]+1);
                    GenerateObject(spaceBetweenObjectsFromPrevGen * (generations[i][j][1]+1), generations[i][j][0]);
                    usedSpaceBetweenObjectsFromPrevGen = true;
                }
                else
                {
                    //add space after each object
                    currentX += spaceBetweenObjects;
                    GenerateObject(currentX, generations[i][j][0]);
                }
            }
            else
            {
                //if this generation has only one object move object directly under the parent
                if(generations[i].length == 1)
                {
                    //add space after each object
                    currentX = spaceBetweenObjectsFromPrevGen * (generations[i][j][1]+1);
                    GenerateObject(spaceBetweenObjectsFromPrevGen * (generations[i][j][1]+1), generations[i][j][0]);
                    usedSpaceBetweenObjectsFromPrevGen = true;
                }
                else
                {
                    //add space after each object
                    currentX += spaceBetweenObjects;
                    GenerateObject(currentX, generations[i][j][0]);
                }
            }      

            //Generate line down if any child use this object as a parent
            if(i+1 != generations.length)
            {
                for(var k=0; k<generations[i+1].length; k++)
                {
                    if(generations[i+1][k][1] == j)
                    {
                        GenerateLine(currentX, currentX, true);
                        break;
                    }
                }
            }

            //Move lower on last object from generation
            if(j == (generations[i].length-1))
            {
                svgCurrentY += generationYOffset;
            }

            //Generate line Right if object isn't last && next object has the same parent
            if(j != (generations[i].length-1))
            {
                if(generations[i][j][1] == generations[i][j+1][1])
                {
                    GenerateLine(currentX, (currentX + spaceBetweenObjects));
                }   
            }
        }
    }
}

//Generate Line
function GenerateLine(fromX, ToX, changeY)
{
    if(changeY)//When changed vertically
    {
        svg.innerHTML += "<line x1='" + fromX + "' y1='" + (svgCurrentY - 3) + "' x2='" + ToX + "' y2='" + ((svgCurrentY + generationYOffset) - 3) + "' class='svgLine' />";
    }
    else if(changeY == false || changeY == undefined) //When horizontal 
    {
        svg.innerHTML += "<line x1='" + fromX + "' y1='" + svgCurrentY + "' x2='" + ToX + "' y2='" + svgCurrentY + "' class='svgLine' />";
    }
}

//Generate Object from generations
function GenerateObject(rectX, text)
{
    rectWidth = (text.length * 10) + 10;

    svg.innerHTML += "<rect x='" + (rectX - (rectWidth/2)) + "' y='" + ((svgCurrentY - rectHeight) - 3) + "' width='" + rectWidth + "' height='" + rectHeight + "' class='svgRect' />"; //Rectangle

    svg.innerHTML += "<text x='" + (rectX - (rectWidth/2) + 5) + "' y='" + ((svgCurrentY - rectHeight) + (rectHeight/1.5)) + "' class='svgText'>" + text + "</text>" //Text
}