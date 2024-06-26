// search button -> <a class="search-btn">
const btn = document.querySelector('.search-btn');
// search user input -> <input class="search-txt" type="text" id='submit' placeholder="sök-ord"/>
const search_request = document.getElementById('submit');
const userInput = document.querySelector('.outData');
// select file button -> <input type="file" id="file-selector" multiple/>
const fileSelector = document.getElementById('file-selector');
// output table -> <table id="table">
const table = document.getElementById('table');


/*
File selection handler
fileList, contains the selected files.
 */
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    /*
    Calling a function to process the promise as well as the contents of the files
    and search for a match with user input.
     */
    renderPromises(fileList);
});

/*
Making a promise, then reading the contents of the files, the contents of the files will be contained in an array
in order to process the content in the renderPromise() function
 */
function makePromises(file_list) {
    let promises = [];
    for (let file of file_list) {
        let filePromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(filePromise);
    }
    return promises;
}

/*
Processing the promise as well as the contents of the files.
Calling the button handler to validate user input, user input cannot be empty.
We pass the contents of the files to the getData() function to search for matches in the files.
 */
function renderPromises(file_list) {
    const promises = makePromises(file_list);
    Promise.all(promises).then(fileContents => {
        btn.onclick = () => {
            userInput.innerHTML = search_request.value;
            if (search_request.value === '') {
                alert(`Search field can't be empty`);
            } else {
                getData(fileContents, search_request.value);
                // fileContents will be an array containing
            }
        }
    });
}

/*

file content processing function, the function iterates - keys, values - until it reaches the required information.
then checks if files contain user input
then we call the renderFound() function to display the found matches.

you can use this recursive function for nested objects, (if you need it)

 function getProp(obj) {
    for(let prop in obj) {
       if(typeof(obj[prop]) === 'object') {
        getProp(obj[prop]);
         } else {
          console.log('Values:',obj[prop])
        }
    }
 }
     getProp(object)
*/
function getData(data, value) {
    // Clearing the contents of the table, after the first requested matches
    // the table will be cleared on the next search.
    clearTable()
    const json = Object.values(data);
    json.forEach(elements => {
        const json_obj = JSON.parse(elements);
        // key === obj[key], json_obj[key] === obj[value].
        for (let key in json_obj) {
            /*
          this regular expression does the following.
          1.replaces double spaces with single spaces.
          3.replaces single spaces with commas
          4.removes special characters
          5.separate lines with a comma
           */
            const str = json_obj[key].toString().replace(/ +/g, " ").replace(/ /g, ',').replace(/!/g, '').split(',')
            for (let word of str) {
                if (word.toLowerCase().includes(value.toLowerCase()) && word.length === value.length) {
                    renderFound(json_obj, key);
                }
            }
        }
    });
}

/*
processing and displaying the necessary information received from getData() function in the form of a table.
the use of the rest operator is optional.
instead, you can use the following construct.
renderFound =(item, cached) => {
<td>${item.firstname} {item.lastname}</td>
}
see the readme.md for a clearer example
 */
const renderFound = ({
                         firstname,
                         lastname,
                         belongsTo,
                         discord,
                         github,
                         personalityType,
                         skills,
                         positiveExperience,
                         explanation,
                         ...item
                     }, cached) => {
    // visibility of the table true, when displaying information.
    table.style.visibility = 'visible';
    const search = userInput.textContent || userInput.innerText;
    // select the output section <tbody id="data-output"></tbody>
    let place = document.querySelector("#data-output");
    place.innerHTML += `<tr>
                        <td>${firstname} ${lastname} </td>
                        <td class="matched">${cached} ${search}</td>
                        <td>${belongsTo}</td>
                        <td>${discord}</td>
                        <td>${github}</td>
                        <td>${personalityType}</td>
                        <td>${skills}</td>
                        <td>${positiveExperience}</td>
                        <td>${explanation}</td>
                        
                        </tr>`;
    // updating user input in the search box.
    search_request.value = '';
}

/*
The function of cleaning the table after re-search for matches.
 */
const clearTable = () => {
    table.style.visibility = 'hidden';
    let place = document.querySelector("#data-output");
    place.innerHTML = '';
}

