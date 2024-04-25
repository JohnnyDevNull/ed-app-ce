import { getDrinkItemDetails, getDrinkListItem } from '../support/page-objects/drinks.po';
import { getPagerActions, getPagerInfo } from '../support/page-objects/pagination.po';
import { getSearchAlcohol, getSearchIngredient, getSearchName } from '../support/page-objects/search.po';
import {
  getToolbarActionBack,
  getToolbarActions,
  getToolbarActionSearch,
  getToolbarBrand
} from '../support/page-objects/toolbar.po';

describe('e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should navigate through the app', () => {
    getToolbarBrand().should('be.visible').and('contain.text', 'Drinks App CE');
    getToolbarActions().should('be.visible');
    getToolbarActionBack().should('not.exist');
    getToolbarActionSearch().should('be.visible');

    getSearchName().should('not.exist');
    getSearchIngredient().should('not.exist');
    getSearchAlcohol().should('not.exist');

    getDrinkListItem().should('have.length', 8);
    getDrinkListItem().contains('Apello').click({force: true});

    getToolbarActionSearch().should('not.exist');
    getDrinkItemDetails().should('be.visible');
    getDrinkItemDetails().find('h2').should('contain.text', 'Apello');
    getDrinkItemDetails().find('img').should('have.attr', 'alt', 'Apello');

    getDrinkItemDetails().find('h3').contains('Category:').scrollIntoView().should('be.visible');
    getDrinkItemDetails().find('p').contains('Other / Unknown / Non alcoholic').should('be.visible');
    getDrinkItemDetails().find('h3').contains('Glass:').scrollIntoView().should('be.visible');
    getDrinkItemDetails().find('p').contains('Collins Glass').should('be.visible');
    getDrinkItemDetails().find('h3').contains('Instructions:').scrollIntoView().should('be.visible');
    getDrinkItemDetails().find('p').contains('Stirr. Grnish with maraschino cherry.').should('be.visible');
    getDrinkItemDetails().find('h3').contains('Ingredients:').scrollIntoView().should('be.visible');
    getDrinkItemDetails().find('li').contains('Orange juice 4 cl').should('be.visible');
    getDrinkItemDetails().find('li').contains('Grapefruit juice 3 cl').should('be.visible');
    getDrinkItemDetails().find('li').contains('Apple juice 1 cl').should('be.visible');
    getDrinkItemDetails().find('li').contains('Maraschino cherry 1').should('be.visible');

    getToolbarActionBack().should('be.visible').click();
    getToolbarActionBack().should('not.exist');
    getToolbarActionSearch().should('be.visible').click();
    getSearchName().should('be.visible');
    getSearchIngredient().should('be.visible');
    getSearchAlcohol().should('be.visible');

    getPagerInfo().contains('0 - 8 / 58').should('be.visible');

    getSearchAlcohol().click();
    getDrinkListItem().contains('110 in the shade').scrollIntoView().should('be.visible');
    getPagerInfo().contains('0 - 8 / 100').should('be.visible');
    getPagerActions().contains('Next').click();
    getPagerInfo().contains('8 - 16 / 100').should('be.visible');
    getDrinkListItem().contains('50/50').scrollIntoView().should('be.visible');
    getPagerActions().contains('Prev').click();
    getPagerInfo().contains('0 - 8 / 100').should('be.visible');
  });
});
