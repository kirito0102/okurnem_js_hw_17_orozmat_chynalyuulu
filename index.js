function addCountryCard() {
  const countryInput = document.getElementById('countryInput');
  const countryName = countryInput.value.trim();

  if (countryName === '') {
    
    return;
  }

  const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,flags';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const country = data.find(c => c.name.common.toLowerCase() === countryName.toLowerCase());
      if (!country) {
        alert('Страна не найдена. Пожалуйста, введите корректное название страны.');
        return;
      }

      const countryCard = createCountryCard(country);
      const container = document.getElementById('countryCardsContainer');
      container.insertBefore(countryCard, container.firstChild); 
      countryInput.value = ''; 
    })
    .catch(error => console.error('Ошибка при загрузке данных о странах:', error));
}

function createCountryCard(country) {
  const countryCard = document.createElement('div');
  countryCard.classList.add('country-card');

  const countryNameElement = document.createElement('h3');
  countryNameElement.textContent = country.name.common;
  countryCard.appendChild(countryNameElement);

  const countryFlag = document.createElement('img');
  countryFlag.classList.add('country-flag');
  countryFlag.src = country.flags.svg;
  countryCard.appendChild(countryFlag);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Удалить';
  deleteButton.onclick = function() {
    countryCard.remove();
  };
  countryCard.appendChild(deleteButton);

 
  const currentDate = new Date().toLocaleDateString();
  const dateParagraph = document.createElement('p');
  dateParagraph.textContent = 'Дата: ' + currentDate;
  countryCard.appendChild(dateParagraph);

  return countryCard;
}






