var generations = 
[
    [//X1
        ["", null], //Y1 //Y Name, x-1 Parent
    ],
    [//X2
        ["", 1], //Y1
    ]
];

/* 
    HOW TO USE generations Array:

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
    generations[X][Y][value to read]);
    value: 0 - Y Name, 1 - (X-1) parent.
*/

function SaveObject(id, X, Y)
{
    var value = document.getElementById(id).value;

    generations[X][Y][0] = value;

    UpdateSelect(X+1);
}

function UpdateSelect(X)
{

}

function AddInput(where, addSelect)
{

    /*Add when addSelect is false into div id="X GenerationInputs", 
        <div id="X Generation Y Input">
            <input type="text" id=" X Generation Y Object" onchange="SaveObject('X Generation Y Object')" /><br />
        </div>

    When addSelect is true into div id="X GenerationInputs"
        <div id="X Generation Y Input">
            <select name="select X-1 GenerationParent" id="select X-1 GenerationParent">
                <option value="X-1 GenerationObject Y">X-1 GenerationObject Y value</option>
            </select><br />
            <input type="text" id="X Generation Y Object" onchange="SaveObject('X Generation Y Object')" /><br />
        </div>
    */

}

function RemoveInput()
{
    //If Y in this X is > 1
}

function AddGeneration()
{

    /*Add into div id="generationsBox",
        <div id="X GenerationBox" class="GenerationBox">
            <h3>X Generation</h3>

            <div id="X GenerationInputs">
                
                AddInput("X GenerationInputs", true);

            </div>

            <input type="button" id="X GenerationAddInputButton" value="Add Object" onclick="AddInput('X GenerationInputs')" />
            <input type="button" id="X GenerationRemoveInputButton" value="Remove Object" onclick="RemoveInput('X GenerationInputs')" />
        </div>
    */

}

function RemoveGeneration()
{
    //If X > 2
}


function GenerateTree()
{
    //manipulate svg
}