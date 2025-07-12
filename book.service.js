'use strict'

const BOOK_KEY = 'bookDB'
var gBooks = []

_createBooks()

function _createBooks() {
    const books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        gBooks = [
            _createBook('Harry Potter', 120),
            _createBook('Lord of the Rings', 140),
            _createBook('The Alchemist', 100)
        ]
        _saveBooks()
    } else {
        gBooks = books
    }
}

function _createBook(title, price) {
    return {
        id: makeId(),
        title,
        price,
        rating: getRandomIntInclusive(1, 5)
    }
}

function _saveBooks() {
    saveToStorage(BOOK_KEY, gBooks)
}

function getBooks(filterBy) {
    if (!filterBy) return gBooks

    return gBooks.filter(book =>
        book.title.toLowerCase().includes(filterBy.txt.toLowerCase()) &&
        book.rating >= filterBy.minRating
    )
}

function addBook(title, price) {
    const book = {
        id: makeId(),
        title,
        price
    }
    gBooks.push(book)
    _saveBooks()
}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    if (idx !== -1) gBooks.splice(idx, 1)
    _saveBooks()
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    if (book) {
        book.price = newPrice
        _saveBooks()
    }
}

function getBook(bookId) {
    return gBooks.find(book => book.id === bookId)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}
