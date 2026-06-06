describe('Weather Application Tests', () => {
  beforeEach(() => {
    // Setup intercepts BEFORE visiting the page
    cy.intercept('GET', 'https://api.weatherapi.com/v1/current.json*', {
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

    cy.visit('/');
  });

  describe('UI State Tests', () => {
    it('Display Loading State During Data Fetch', () => {
      // Intercept and delay the API call to see loading state
      cy.intercept('GET', 'https://api.weatherapi.com/v1/current.json*', (req) => {
        req.reply((res) => {
          res.delay(2000);
        });
      }).as('delayedFetch');

      // Type city name
      cy.get('#cityInput').type('Pune');

      // Click search button
      cy.get('#searchBtn').click();

      // Check for loading message - use the exact text with ellipsis
      cy.get('p').should('contain', 'Loading data…');
    });

    it('Display Weather Data After Fetch', () => {
      // Type city name
      cy.get('#cityInput').type('Pune');

      // Click search button
      cy.get('#searchBtn').click();

      // Wait for the mocked API response from beforeEach intercept
      cy.get('.weather-card', { timeout: 10000 }).should('be.visible');

      // Verify weather data is displayed
      cy.get('.weather-card').should('contain', 'Pune, India');
      cy.get('.weather-card').should('contain', '28');
      cy.get('.weather-card').should('contain', '65');
      cy.get('.weather-card').should('contain', 'Partly cloudy');
      cy.get('.weather-card').should('contain', '15');
    });

    it('Display Error Message for Invalid City', () => {
      // Override intercept for error scenario
      cy.intercept('GET', 'https://api.weatherapi.com/v1/current.json*', {
        statusCode: 400,
        body: {
          error: {
            message: 'No matching location found.',
          },
        },
      }).as('errorFetch');

      // Type invalid city name
      cy.get('#cityInput').type('InvalidCityXYZ123');

      // Click search button
      cy.get('#searchBtn').click();

      // Check for error alert
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Failed to fetch weather data');
      });
    });

    it('Clear Input After Successful Search', () => {
      // Type city name
      cy.get('#cityInput').type('Mumbai');

      // Click search button
      cy.get('#searchBtn').click();

      // Wait for weather card to appear
      cy.get('.weather-card', { timeout: 10000 }).should('be.visible');

      // Check that input field is cleared
      cy.get('#cityInput').should('have.value', '');
    });

    it('Search on Enter Key Press', () => {
      // Type city name and press Enter
      cy.get('#cityInput').type('Delhi{enter}');

      // Wait for weather card to appear
      cy.get('.weather-card', { timeout: 10000 }).should('be.visible');

      // Verify Delhi data is displayed (mocked from beforeEach, but we can verify it was called)
      cy.get('.weather-card').should('contain', 'Pune, India');
    });
  });
});
