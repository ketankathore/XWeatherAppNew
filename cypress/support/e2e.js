// Support file for Cypress tests
// Add custom commands or global configurations here

// Disable unhandled exception handling for alert tests
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
