'use strict'

var gFilterBy = {
    txt: '',
    minRating: 0
}

function onSetFilter(value) {
    gFilterBy = value
    renderBooks()
}


function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooks(gFilterBy)
    const elTbody = document.querySelector('.books-table')

    const strHTMLs = books.map(book => {
        return `
      <tr>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td>${book.rating}</td>
        <td>
          <button onclick="onReadBook('${book.id}')">Read</button>
          <button onclick="onUpdateBook('${book.id}')">Update</button>
          <button onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
      </tr>
    `
    })

    elTbody.innerHTML = strHTMLs.join('')
}


function onAddBook() {
    const title = prompt('Enter book title')
    const price = +prompt('Enter book price')

    if (!title || !price || isNaN(price)) {
        alert('Both title and price are required')
        return
    }

    addBook(title, price)
    renderBooks()
    showMsg('Book added!')
}



function onRemoveBook(bookId) {
    const isSure = confirm('Are you sure you want to delete this book?')
    if (!isSure) return

    removeBook(bookId)
    renderBooks()
    showMsg('Book removed!')
}

function onUpdateBook(bookId) {
    const newPrice = +prompt('Enter new price')
    if (!newPrice) return alert('Price is required')

    updateBook(bookId, newPrice)
    renderBooks()
    showMsg('Book updated!')
}

function onReadBook(bookId) {
    const book = getBook(bookId)
    alert(`Title: ${book.title}\nPrice: ${book.price}\nRating: ${book.rating} ⭐`)
}

function onSetFilterTxt(value) {
    gFilterBy.txt = value
    renderBooks()
}

function onResetFilter() {
    gFilterBy = {
        txt: '',
        minRating: 0
    }
    renderBooks()

    document.querySelector('input[type="text"]').value = ''
    document.querySelector('select').value = '0'
}


function showMsg(msg) {
    const elMsg = document.querySelector('.user-msg')
    elMsg.innerText = msg
    elMsg.classList.remove('hide')

    setTimeout(() => {
        elMsg.classList.add('hide')
    }, 2000)
}

function onSetMinRating(value) {
    gFilterBy.minRating = +value
    renderBooks()
}
