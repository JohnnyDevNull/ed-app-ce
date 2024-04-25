/// <reference types="cypress" />

/* eslint-disable @typescript-eslint/no-explicit-any */

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    getByTestId<E extends Node = HTMLElement>(testId: string, ...args: any[]): Cypress.Chainable<JQuery<E>>;
  }
}

Cypress.Commands.add('getByTestId', (testId, ...args) => {
  return cy.get(`[data-testid="${testId}"]`);
});
