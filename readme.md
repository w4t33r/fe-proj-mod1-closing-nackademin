# Nackademin frontend-1 Individual work

##  Definition of the task & problems

<b>Task:</b> The task is to output matches in one, multiple, or more JSON files.<br>
Matches should be equal given user input.<br>
Then Process the data, find all matches in the files and display them in a html template by displaying
a simple list, table, or any other convenient method.

<h3>File upload problem / work with multiple files</h3>
**(node:fs)**
The problem with working with files is that initially I tried to solve the problem using
node fs, to work with directories, it was quite simple to process several files until I started including the html template
I soon realized that there was a problem between the node and the web in js. After reading the documentation, I realized that this method is simply impossible to use when working with the web,
due to the fact that it is extremely unsafe and browsers do not allow this.<br></br>
**(fetch)**
I started trying to solve the problem of using several files thanks to fetch, but nothing worked out here either, 
this method of such a solution is possible only if you specifically launch your server for this which will store the directory with incoming files.<br></br>
**(File API)**
As a result I found a solution that met my needs, this is a File API solution, with which I solved the problem of loading many files.

<h3>Multiply file reading problem</h3>
processing one incoming file when selecting files is not a problem, but what if there are several of them, 
I ran into the problem that when uploading files, they literally took priority from each other, i.e. (only the file that was uploaded last was processed) they took turns replacing each other.
I didn't think of anything better than using promises and putting all the files content in an array, so I solved the problem.
<h3>The problem of finding matches</h3>
The problem of finding matches, with a basic condition <b>{  if(json[value] === userInput_value) }</b>
that if the value of the key contains multiple values, the value of the user input will never be equal to the value of the key.
When comparing two json files, a similar condition could work, in extreme cases, you can call JSON.stringify or isEqual()
But comparing an object with a string is another matter, so I solved it in the following way,
I converted the object to a string and called the method(.includes) this allows you to match any user input or character
Like any method, it has its own conventions, but if we consider that we are purposefully looking for "matches", 
this method is suitable for solving the problem, because it all depends on what the user enters.

## Description
To get started, just run the html file.
<br>This project is a search for matches on user input criteria (any).</br>
This can be used, for example, to parse a large number of files and display matches for a key input word.
My application looks for matches on any keyword, character, number, the actual keyword can be anything.
You do not need to store JSON files in a certain place for the script to work, you choose which files to upload yourself
after you click on the file upload button, the number of files is also not limited.
<br>Structure:</br>
```
index.html
script.js
```


## How to use
Select the json files you want to use by clicking on the file selection button

<a href="https://imgbb.com/"><img src="https://i.ibb.co/q9hVMC9/selected.png" alt="selected" border="0"></a>

Then hover over the search button and enter the word you want to find in all files.

<a href="https://imgbb.com/"><img src="https://i.ibb.co/Ybmzby3/search.png" alt="search" border="0"></a>

Then click on the search button (magnifying glass) and you will get the result, if no matches are found, the table will not be created.

<a href="https://ibb.co/y8k6XfC"><img src="https://i.ibb.co/Xz57b2P/Result.png" alt="Result" border="0"></a>


## How to optimize the code for your needs.
You need JSON files with data, and from that data you can choose which type of values you want to base your search on.
To correct work, you need to change the properties by which the data is output, in order to do this you need to change the "keys" by which you will display the data you need.
The data output function is called renderFound() 
[...] is rest operator on JavaScript.
```
const renderFound = ({firstname, lastname, belongsTo, discord, github, personalityType, skills, positiveExperience, explanation, ...item}, catched) => {
    place.innerHTML += `<tr>
                        <td>${firstname} ${lastname}</td>
                        <td>${catched} ${search}</td>
                        <td>${belongsTo}</td>
                        <td>${discord}</td>
                        <td>${github}</td>
                        <td>${personalityType}</td>
                        <td>${skills}</td>
                        <td>${positiveExperience}</td>
                        <td>${explanation}</td>
                        </tr>`;
```
example:
Suppose you have several json files that contain keys = "name" and you want to display all name matches in these files, in that case, do the following.
```
const renderFound = ({name, ...item}, catched) => {
    place.innerHTML += `<tr>
                        <td>${name}</td>
                        <td>${catched} ${search}</td>
                        </tr>`;
```
OR without rest operator:
```
const renderFound = (item, catched) => {
    place.innerHTML += `<tr>
                        <td>${item.name}</td>
                        <td>${catched} ${search}</td>
                        </tr>`;
```
You can also change the names of the tables to fit your data.
```
<form class="table_container" name="table_create">
    <table id="table">
        <thead>
        <tr>
            <th>Match</th>
            <th>Matched by</th>
            <th>Grupp</th>
            <th>Discord</th>
            <th>Github</th>
            <th>PersonalityType</th>
            <th>Skills</th>
            <th>PositiveExperience</th>
            <th>Explanation</th>
        </tr>
        </thead>
```



## Technical documentation

Koden består av funktioner:
```
fileSelector.addEventListener() // File selection selector

makePromises(file_list)
Creating a promise, then reading the contents of the files, the contents of the files will be contained in an array

renderPromises(file_list)
processing the promise as well as the contents of the files.


getData(data, value)
file content processing function, the function iterates - keys, values until it reaches the necessary information.
then checks to see if the files contain user input

renderFound()
processing and displaying the necessary information in a table.

clearTable()
Clearing the contents of the table, after the first requested matches, the table will be cleared on the next search.

Note: 
For more information, see the script.js
the code is well commented out.
```
