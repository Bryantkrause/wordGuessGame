// array of words
const words = ['Tyrannosaurus','Diplodocus','Velociraptor','Triceratops','Brontosaurus','Brachiosaurus','Pterosaur','Stegosaurus','Archaeopteryx','Gallimimus','Allosaurus','Argentinosaurus','Spinosaurus','Parasaurolophus','Iguanodon','Ankylosaurus','Protoceratops','Styracosaurus','Pachycephalosaurus','Amargasaurus','Ornithomimus','Deinonychus','Corythosaurus','Mamenchisaurus','Tuojiangosaurus','Lambeosaurus','Thecodontosaurus','Maiasaura',]

//  gets new random word
const getRandWord = function () {
    return words[Math.floor(Math.random() * words.length)].toLowerCase()
}

//  starting values
let wins = 0
let losses = 0
let guesses = 10
let lettersGuessed = []
let word = getRandWord()

// resets game to initial state
const reset =  () => {
    word = getRandWord()
    lettersGuessed = []
    guesses = 10
    displayWord()
    document.getElementById('guesses').textContent = guesses
    document.getElementById('wins').textContent = wins
    document.getElementById('losses').textContent = losses
    document.getElementById('letters').textContent = lettersGuessed.join(', ')
}

// displays word with blanks if applicable
const displayWord =  _ => {
    // string of letters and blanks
     let wordStr = ''

    //  toggle tracks if user won
     let winStatus = true

    //  loop over word and build string
     word.split('').forEach(letter => {
        //  if letter is in word And user guess letter
        if (lettersGuessed.indexOf(letter) !== -1) {
            wordStr += `${letter}`
        } else {
            //  adds blanks for letters not guessed
            wordStr += `_ `
            // blank indicates game is not won
            winStatus = false
        }
     })

    //  display current state of word string
     document.getElementById('word').textContent = wordStr

    //  if no blanks were added
     if (winStatus) {
         alert(`You have Won! : the word was ${word}`)
         wins ++
        //  reset game
         reset()
              }
     }

    //  confirm letter is or isnt in the word
const checkLetter = letter => {
    //  update letters guessed
        lettersGuessed.push(event.key)
        document.getElementById('letters').textContent = lettersGuessed.join(', ')
        //  if letter guessed is in the word
    if (word.includes(event.key)) {
        //  update word display
        displayWord()
    } else {
        // decrement guesses
        guesses --
        document.getElementById('guesses').textContent = guesses
        //  if user is out of guesses
    if (guesses <= 0) {
            alert(`You Lost! the word was ${word}`)
        losses ++
        // reset game
            reset()
            }
         }
    }

// locked to only letters not already guessed
document.onkeyup = event => event.keyCode >= 65 && event.keyCode <= 90 && lettersGuessed.indexOf(event.key) === -1 ?
checkLetter(event.key) : null

// start the game
reset()