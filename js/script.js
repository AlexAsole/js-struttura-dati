const fieldCodes = [
  'W', 'U', 'B', 'R', 'G'
]

const cardTypes = [
  'terre',
  'creature',
  'incantesimi',
  'artefatti',
  'instantanei',
  'stregonerie'
]

const artists = [
  'Greg Staples',
  'Ottavio Fogliata',
  'Ken Sugimori',
  'Masami Kuramada'
]

// Abbiamo creato un oggetto di oggetti, come riferimento
// di una edizione. Se ad esempio scrivo editions['SP']
// allora otterrò tutto un oggetto che descrive
// con più dettagli l'edizione.
// come oggetto di oggetti, può essere navigato solo con il for-in
const editions = {

  'BL': {
      edition: 'Boolean',
      rarity: 'blue',
      manyCards: 100,
  },

  'SP': {
      edition: 'Special',
      rarity: 'red',
      manyCards: 60,
  },
  'PM': {
    edition: 'Pokémon',
    rarity: 'yellow',
    manyCards: 151
  },
  'SS': {
    edition: 'Saint Seiya',
    rarity: 'gold',
    manyCards: 75
  }

}


const cards = [{

  cardName: 'Grizzly Bears',

  cost: {
    genericCostNumber: 1,
    costFields: [ // colors array con riferimento a fieldCodes
      fieldCodes[0],  // 'W',  - un suo riferimento
      fieldCodes[2]   // 'B'
    ],
  },

  picture: 'images/bear.png',
  cardType: cardTypes[1],
  cardObject: 'Bear',

  editionType: editions['SP'],

  description: 'Lorem ipsum',
  story: 'Naltro Lorem Ipsum',

  artist: artists[0],

  collectionNumber: {
    thisNumber: 1,
    maxNumber: editions['SP']['manyCards']
  },

  score: {
    power: 4,  // filtrarlo per power
    toughness: 10
  }

  },
  {

    cardName: 'Sviluppatore guerriero',

    cost: {
      genericCostNumber: 3,
      costFields: [ // colors array con riferimento a fieldCodes
        fieldCodes[2],
        fieldCodes[3]
      ],
    },

    picture: 'images/developer.png',  // da inserire immagine
    cardType: cardTypes[1],
    cardObject: 'warrior',

    editionType: editions['BL'],

    description: 'Lo sviluppatore guerriero spezza i byte in bit!',
    story: 'Lo sviluppatore guerriero è una forma di essere umano evoluto.',

    artist: artists[1],

    collectionNumber: {
      thisNumber: 27,
      maxNumber: editions['BL']['manyCards']
    },

    score: {
      power: 6,  // r
      toughness: 6
    }

    },
      {

        cardName: 'Pikachù',

        cost: {
          genericCostNumber: 3,
          costFields: [ // colors array con riferimento a fieldCodes
            fieldCodes[0],
            fieldCodes[4],
          ],
        },

        picture: 'images/pokémon.png',  // da inserire immagine
        cardType: cardTypes[1],
        cardObject: 'pokémon',

        editionType: editions['PM'],

        description: 'Scarica fulmini intorno a se per difendersi ',
        story: 'Accumula elettricità nelle guancie',

        artist: artists[3],

        collectionNumber: {
          thisNumber: 25,
          maxNumber: editions['PM']['manyCards']
        },

        score: {
          power: 4,  // r
          toughness: 1
        }

        },
        {

          cardName: 'Seiya',

          cost: {
            genericCostNumber: 6,
            costFields: [ // colors array con riferimento a fieldCodes
              fieldCodes[0],
              fieldCodes[0],
              fieldCodes[0],
            ],
          },

          picture: 'images/seiya.png',  // da inserire immagine
          cardType: cardTypes[1],
          cardObject: 'saint',

          editionType: editions['SS'],

          description: 'Pegasus Ryusei Ken: fulmine di Pegasus',
          story: 'Il cavaliere di bronzo più famoso, protettore della dea Atena',

          artist: artists[4],

          collectionNumber: {
            thisNumber: 60,
            maxNumber: editions['SS']['manyCards']
          },

          score: {
            power: 6,  // r
            toughness: 10
          }

          },
          {

            cardName: 'MewTwo',

            cost: {
              genericCostNumber: 8,
              costFields: [ // colors array con riferimento a fieldCodes
                fieldCodes[1],
                fieldCodes[1],
                fieldCodes[1],
                fieldCodes[3],
                fieldCodes[3],
              ],
            },

            picture: 'images/mewtwo.png',  // da inserire immagine
            cardType: cardTypes[1],
            cardObject: 'pokémon',

            editionType: editions['PM'],

            description: 'Il potere della mente più forte del mondo',
            story: 'Il pokèmon clonato dalla leggenda di Mew',

            artist: artists[3],

            collectionNumber: {
              thisNumber: 151,
              maxNumber: editions['PM']['manyCards']
            },

            score: {
              power: 12,
              toughness: 12
            }

            },
]

const powerSelect = document.getElementById('power-select');
const typeSelect = document.getElementById('type-select');
const cardsContainer = document.getElementById('cards-container');

function powerValue(array) {
  const powerArray = [];
  array.forEach((item) => {
    if (!powerArray.includes(item.score.power)) {
      powerArray.push(item.score.power)
    }
  });
  return powerArray;
}
const powerArray = powerValue(cards);

function filterPower(array, valuePower) {
  return array.filter((item) => {
    return item.score.power === valuePower
  })
}
function filterType(array, valueType) {
  return array.filter((item) => {
    return item.cardType === valueType
  })
}

function populateSelect(array, app) {
  array.forEach((item) => {
    app.innerHTML += `
    <option value="${item}">${item}</option>
    `
  });
}

function populateHTML(array, app) {
  app.innerHTML = '';
  array.forEach((item) => {
    app.innerHTML += `
    <div>
      <h1>${item.cardName}</h1>
    </div>
    `
  });
}


console.log(cards);
console.log(powerArray);

populateSelect(powerArray, powerSelect);
populateSelect(cardTypes, typeSelect)
populateHTML(cards, cardsContainer);

powerSelect.addEventListener('change', function() {
  const valueSelected = parseInt(this.value);
  if(isNaN(valueSelected)) {
    populateHTML(cards, cardsContainer);
  } else {
    const filteredArray = filterPower(cards,valueSelected);
    populateHTML(filteredArray, cardsContainer)
  }
});

typeSelect.addEventListener('change', function() {
  const valueSelected = this.value;
  if(valueSelected === 'base') {
    populateHTML(cards, cardsContainer);
  } else {
    const filteredArray = filterType(cards,valueSelected);
    populateHTML(filteredArray, cardsContainer)
  }
});
