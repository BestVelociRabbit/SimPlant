const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const PERENUAL_KEY = process.env.ERICPERENUAL_KEY;
console.log(PERENUAL_KEY)

//read file? store in object
// const list = JSON.parse(fs.readFileSync('speciesList.json'));
//list = [ {label: 'Aloe vera'}, {label: 'Monstera'} ]
const list = [];
async function updateList(start, end) {
  //already saved 1-60
  for(let i = start; i <= end; i++){
    console.log(`Page ${i}`)
    let results = await fetch(`https://perenual.com/api/species-list?key=${PERENUAL_KEY}&page=${i}`)
    let parsedResults = await results.json();
    for(const plant of parsedResults.data){
      list.push({common: plant.common_name, scientific: plant.scientific_name[0]})
    }
  }

  //write object to speciesList.json
  fs.writeFile('speciesList.json', JSON.stringify(list, null, 2) , function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

//updateList(1,200);



