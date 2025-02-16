const urlBooks = "https://striveschool-api.herokuapp.com/books"
    let allBooks = []

    function fetchBooks() {
      fetch(urlBooks)
        .then(response => response.json())
        .then(books => {
          console.log("Libri:", books)
          allBooks = books
          renderBooks(books)
        })
        .catch(err => console.error(err))
    }

    function renderBooks(books) {
      const container = document.querySelector('.row.row-cols-1.row-cols-md-4.g-4.mt-3')
      container.innerHTML = ''
      books.forEach(book => {
        const col = document.createElement('div')
        col.classList.add('col')
    
        const card = document.createElement('div')
        card.classList.add('card', 'h-100')
    
        const img = document.createElement('img')
        img.src = book.img
        img.classList.add('card-img-top')
        img.alt = "Copertina Libro"
    
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
    
        const title = document.createElement('h5')
        title.classList.add('card-title')
        title.textContent = book.title
    
        const category = document.createElement('p')
        category.classList.add('card-text')
        category.textContent = "Categoria: " + book.category
    
        const price = document.createElement('p')
        price.classList.add('card-text')
        price.textContent = "Prezzo: " + book.price + "€"
    
        cardBody.appendChild(title)
        cardBody.appendChild(category)
        cardBody.appendChild(price)
    
        const cardFooter = document.createElement('div')
        cardFooter.classList.add('card-footer', 'd-flex', 'gap-2')
    
        
        const buttonCart = document.createElement('button')
        buttonCart.type = 'button'
        buttonCart.classList.add('btn', 'btn-primary')
        buttonCart.textContent = "Aggiungi al carrello"
        buttonCart.addEventListener('click', () => {
          addToCart(book.asin, card)
        })
    
        
        const buttonDetails = document.createElement('button')
        buttonDetails.type = 'button'
        buttonDetails.classList.add('btn', 'btn-secondary')
        buttonDetails.textContent = "salta"
        buttonDetails.addEventListener('click', () => {
          console.log("Salta: " + book.title)
        })
    
        cardFooter.appendChild(buttonCart)
        cardFooter.appendChild(buttonDetails)
    
        card.appendChild(img)
        card.appendChild(cardBody)
        card.appendChild(cardFooter)
        col.appendChild(card)
        container.appendChild(col)
      })
    }
    

    function addToCart(bookId, card) {
      console.log("Aggiunto libro: " + bookId)
      card.classList.add("selected")
    }

    document.addEventListener('DOMContentLoaded', () => {
      fetchBooks()
      const searchInput = document.getElementById('searchInput')
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase()
        const filteredBooks = allBooks.filter(book =>
          book.title.toLowerCase().includes(query) ||
          book.category.toLowerCase().includes(query)
        )
        renderBooks(filteredBooks)
      })
    })
