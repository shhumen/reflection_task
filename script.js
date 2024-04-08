document.getElementById('file').addEventListener('change', function () {
  const file = this.files[0]
  const reader = new FileReader()

  reader.onload = function () {
    const data = reader.result
    processData(data)
  }

  reader.readAsText(file)
})

class Person {
  constructor(name, surname, age) {
    this.name = name
    this.surname = surname
    this.age = age
  }
}

function processData(data) {
  const lines = data.split('\n').slice(1)
  const people = lines.map((line) => {
    const [name, surname, age] = line.trim().split(',')
    return new Person(name, surname, age)
  })

  fillTable(people)
}

function fillTable(data) {
  const tableBody = document.querySelector('#table tbody')
  tableBody.innerHTML = ''

  data.forEach((person) => {
    const row = document.createElement('tr')
    Object.values(person).forEach((value) => {
      const cell = document.createElement('td')
      cell.textContent = value
      row.appendChild(cell)
    })
    tableBody.appendChild(row)
  })

  document.getElementById('save_button').style.display = 'block'

  document.getElementById('save_button').addEventListener('click', function () {
    const data = Array.from(document.querySelectorAll('#table tbody tr')).map(
      (row) => {
        const [name, surname, age] = Array.from(row.querySelectorAll('td')).map(
          (td) => td.textContent
        )
        return { name, surname, age }
      }
    )

    console.log(data)

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Veri kaydedilemedi.')
        }
        alert('Veri başarıyla kaydedildi.')
      })
      .catch((error) => {
        console.error('Hata:', error)
        alert('Bir hata oluştu.')
      })
  })
}
