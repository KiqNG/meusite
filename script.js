function selectColor(color) {
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`.color-option.${color}`).classList.add('selected');
}

function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantidade');
    let quantity = parseInt(quantityInput.value);
    quantity = isNaN(quantity) ? 1 : quantity;
    quantity = quantity + delta;
    quantity = quantity < 1 ? 1 : quantity;
    quantityInput.value = quantity;
}

function addToCart() {
    const tamanho = document.getElementById('tamanho').value;
    const quantidade = document.getElementById('quantidade').value;
    const selectedColor = document.querySelector('.color-option.selected');
    const cor = selectedColor ? selectedColor.classList[1] : null;

    if (!cor || !tamanho) {
        alert('Por favor, selecione a cor e o tamanho.');
        return;
    }

    const cartItemsList = document.getElementById('cart-items-list');
    let existingItem = Array.from(cartItemsList.children).find(item => 
        item.textContent.includes(cor) && item.textContent.includes(tamanho)
    );

    if (existingItem) {
        const quantitySpan = existingItem.querySelector('span');
        const currentQuantity = parseInt(quantitySpan.textContent.split('x')[0].trim());
        const newQuantity = currentQuantity + parseInt(quantidade);
        quantitySpan.textContent = `${newQuantity}x Camiseta (${cor}, Tamanho: ${tamanho})`;
        existingItem.querySelector('.price').textContent = `R$ ${(35.00 * newQuantity).toFixed(2)}`;
    } else {
        const newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.innerHTML = `
            <span>${quantidade}x Camiseta (${cor}, Tamanho: ${tamanho})</span>
            <span class="price">R$ ${(35.00 * quantidade).toFixed(2)}</span>
            <button onclick="removeFromCart(this, false)" class="remove-less">Remover menos</button>
            <button onclick="removeFromCart(this, true)">Remover</button>
        `;
        cartItemsList.appendChild(newItem);
    }
}

function removeFromCart(button, removeAll) {
    const item = button.parentElement;
    const quantitySpan = item.querySelector('span');
    const currentQuantity = parseInt(quantitySpan.textContent.split('x')[0].trim());

    if (removeAll) {
        item.remove();
    } else {
        const newQuantity = currentQuantity - 1;
        if (newQuantity > 0) {
            quantitySpan.textContent = `${newQuantity}x Camiseta (${quantitySpan.textContent.match(/\(([^)]+)\)/)[1].split(',')[0].trim()}, Tamanho: ${quantitySpan.textContent.match(/Tamanho: ([^)]*)/)[1].trim()})`;
            item.querySelector('.price').textContent = `R$ ${(35.00 * newQuantity).toFixed(2)}`;
        } else {
            item.remove();
        }
    }
}
function proceedToNextStep() {
    // Redireciona para a página de identificação
    window.location.href = 'identificacao.html';
}
