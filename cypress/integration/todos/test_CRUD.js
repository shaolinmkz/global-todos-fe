/* eslint-disable no-undef */
/// <reference types="cypress" />

// for production =>  https://global-todo.netlify.app/
// for development =>  http://localhost:3000/

/**
 * Swicth URL's to test the environment
 */
const FONTEND_BASE_URL = "http://localhost:3000/";
// const FONTEND_BASE_URL = "https://global-todo.netlify.app/";

describe("CRUD operation for a todo", () => {

  describe("Vist page", () => {
    it("should load the todo screen", () => {
      cy.intercept("/api/v1/todos").as("getTodos");
      cy.visit(FONTEND_BASE_URL).get("h1.heading").contains("Global Todo");

      cy.wait("@getTodos").then(() => {
        cy.get("h1.heading").contains("Global Todo");
      });
    });
  });

  describe("Creating", () => {
    it("should enter a todo and submit it", () => {
      cy.get('.create-form input[name="todoText"]')
        .type("Go for a sky dive", { delay: 100 })
        .should("have.value", "Go for a sky dive")
        .get(".create-form button.add__todo")
        .click();
    });
  });

  describe("Updating", () => {
    it("should edit a todo activity", () => {
      cy.wait(2000);
      cy.get("ul > li")
        .first()
        .find(".button__container button#edit")
        .click({ force: true })
        .get('.edit-form input[name="todoText"]')
        .should("have.value", "Go for a sky dive")
        .type("{selectall}{backspace}", { delay: 200 })
        .type("Go for a sky dive, swim and car race", { delay: 100 })
        .get(".edit-form button")
        .click();
    });

    it("should mark a todo as completed", () => {
      cy.get("ul > li")
        .first()
        .find(".button__container button#mark__complete")
        .click({ force: true });
    });
  });

  describe("Deleting", () => {
    it("should delete a todo", () => {
      cy.get("ul > li")
        .first()
        .find(".button__container button#delete")
        .click({ force: true })
        .get(':nth-child(2) > .swal-button')
        .click();
    });
  });
});
