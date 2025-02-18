let cart = [];
function renderCart() {

  const cartContainer = document.getElementById('cartContainer');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Il carrello è vuoto.</p>';
    return;
  }

  cart.forEach(book => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');
    itemDiv.innerHTML = `
      <span>${book.title} - ${book.price}€</span>
      <button class="btn btn-danger btn-sm" onclick="removeFromCart('${book.asin}')">Rimuovi</button>
    `;
    cartContainer.appendChild(itemDiv);
  });
}

function addToCart(bookId, card) {
  console.log("Aggiunto libro: " + bookId);
  // Cerca il libro in allBooks e lo aggiunge all'array cart, se non è già presente (a seconda della logica che preferisci)
  const book = allBooks.find(b => b.asin === bookId);
  if (book && !cart.find(b => b.asin === bookId)) {
    cart.push(book);
  }
  card.classList.add("selected");
  renderCart(); // Aggiorna la visualizzazione del carrello
}



//  per rimuovere libro dal carrello
function removeFromCart(bookId) {
  const index = cart.findIndex(book => book.asin === bookId);
  if (index !== -1) {
    cart.splice(index, 1);
    console.log("Libro rimosso dal carrello:", bookId);
    renderCart();
  }
}
