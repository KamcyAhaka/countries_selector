const countriesSelectElement = document.querySelector('.countries-select');

const stateSelectElement = document.querySelector('.state-select');

let selectedCountry;

const createOptionElement = (text, className, parent) => {
  // Create a new option element
  const optionElement = document.createElement('option');

  // Update the text and value of the option
  optionElement.textContent = text;
  optionElement.value = text;

  // Add a class name to the option element you created. This is useful for styling
  optionElement.classList.add(className);

  parent.appendChild(optionElement);
};

const getCountries = async () => {
  try {
    const response = await (
      await fetch('https://countriesnow.space/api/v0.1/countries')
    ).json();

    const countriesData = response.data;

    countriesData.forEach((countryData) => {
      createOptionElement(
        countryData.country,
        'country',
        countriesSelectElement
      );
    });
  } catch (error) {}
};

countriesSelectElement.addEventListener('input', (ev) => {
  const eventTarget = ev.target;

  selectedCountry = eventTarget.value;

  getStates();
});

const getStates = async () => {
  try {
    const response = await (
      await fetch('https://countriesnow.space/api/v0.1/countries/states', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: selectedCountry,
        }),
      })
    ).json();

    const statesData = response.data;

    const states = statesData.states;

    states.forEach((state) => {
      createOptionElement(state.name, 'state', stateSelectElement);
    });
    stateSelectElement.disabled = false;
  } catch (error) {}
};

getCountries();
