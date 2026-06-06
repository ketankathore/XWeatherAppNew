describe('Weather Application Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('UI State Tests', () => {
    it('Display Loading State During Data Fetch', () => {
      // Intercept and delay the API call to see loading state
      cy.intercept('GET', '**/weatherapi.com/**', (req) => {
        req.reply((res) => {
          res.delay(2000);
        });
      }).as('weatherFetch');

      // Type city name
      cy.get('#cityInput').type('Pune');

      // Click search button
      cy.get('#searchBtn').click();

      // Check for loading message
      cy.get('p').should('contain', 'Loading data…');
    });

    it('Display Weather Data After Fetch', () => {
      // Mock successful API response
      cy.intercept('GET', '**/weatherapi.com/**', {
        statusCode: 200,
        body: {
          location: {
            name: 'Pune',
            country: 'India',
          },
          current: {
            temp_c: 28,
            humidity: 65,
            condition: {
              text: 'Partly cloudy',
            },
            wind_kph: 15,
          },
        },
      }).as('weatherFetch');

      // Type city name
      cy.get('#cityInput').type('Pune');

      // Click search button
      cy.get('#searchBtn').click();

      // Wait for API response
      cy.wait('@weatherFetch');

      // Check for weather card
      cy.get('.weather-card').should('be.visible');

      // Verify weather data is displayed
      cy.get('.weather-card').should('contain', 'Pune, India');
      cy.get('.weather-card').should('contain', '28');
      cy.get('.weather-card').should('contain', '65');
      cy.get('.weather-card').should('contain', 'Partly cloudy');
      cy.get('.weather-card').should('contain', '15');
    });

    it('Display Error Message for Invalid City', () => {
      // Mock failed API response
      cy.intercept('GET', '**/weatherapi.com/**', {
        statusCode: 400,
        body: {
          error: {
            message: 'No matching location found.',
          },
        },
      }).as('weatherFetch');

      // Type invalid city name
      cy.get('#cityInput').type('InvalidCityXYZ123');

      // Click search button
      cy.get('#searchBtn').click();

      // Wait for API response
      cy.wait('@weatherFetch');

      // Check for error alert
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Failed to fetch weather data');
      });
    });

    it('Clear Input After Successful Search', () => {
      // Mock successful API response
      cy.intercept('GET', '**/weatherapi.com/**', {
        statusCode: 200,
        body: {
          location: {
            name: 'Mumbai',
            country: 'India',
          },
          current: {
            temp_c: 30,
            humidity: 70,
            condition: {
              text: 'Sunny',
            },
            wind_kph: 12,
          },
        },
      }).as('weatherFetch');

      // Type city name
      cy.get('#cityInput').type('Mumbai');

      // Click search button
      cy.get('#searchBtn').click();

      // Wait for API response
      cy.wait('@weatherFetch');

      // Check that input field is cleared
      cy.get('#cityInput').should('have.value', '');
    });

    it('Search on Enter Key Press', () => {
      // Mock successful API response
      cy.intercept('GET', '**/weatherapi.com/**', {
        statusCode: 200,
        body: {
          location: {
            name: 'Delhi',
            country: 'India',
          },
          current: {
            temp_c: 32,
            humidity: 60,
            condition: {
              text: 'Clear',
            },
            wind_kph: 8,
          },
        },
      }).as('weatherFetch');

      // Type city name
      cy.get('#cityInput').type('Delhi{enter}');

      // Wait for API response
      cy.wait('@weatherFetch');

      // Check for weather card
      cy.get('.weather-card').should('be.visible');
      cy.get('.weather-card').should('contain', 'Delhi, India');
    });
  });
});
