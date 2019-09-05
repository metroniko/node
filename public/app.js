
const toCurrency = curre => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(curre)
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent)

  
})

const $card = document.querySelector('#card')
if ($card) {
$card.addEventListener('click', event => {
  if (event.target.classList.contains('js-remove')) {
    const id = event.target.dataset.id
    fetch('/card/remove/'+ id, {
      method: 'delete'
    }).then(res => res.json())
    .then(card => {
      console.log(card);
      if (card.courses.length) {
        const html = card.courses.map(cour => {
          const {title, count, id} = cour
          
        return `
              <tr>
                <td>${title}</td>
                <td>${count}</td>
                <td><button class="btn btn-small js-remove" data-id="${id}">Удалить</button></td>
              </tr>
            `
        } ).join('')
        console.log(html);
        
        $card.querySelector('tbody').innerHTML = html
        $card.querySelector('.price').innerHTML = toCurrency(card.price)
      } else {
        $card.innerHTML = `<p>Корзина пуста</p>`
      }
      
    })
  }
})
}