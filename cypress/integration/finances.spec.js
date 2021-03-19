/// <reference types="cypress" />
import { format, prepareLocalStorage } from '../support/funciona'

// cy.viewport
// arquivos de config
// passar configs por linha de comando 


context('Dev Finances Agilizei', () => {
    //hookcs
    //trechos de codigos que executam antes ou depois dos testes
    //before -> antes de todos os teste
    // beforeEach -> amtes de cada teste
    // after -> depois de todos os testes
    // afterEach -> depois de cada teste
    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/', {

            onBeforeLoad: (win) => {
                prepareLocalStorage(win)

            }

        })


        //cy.get('#data-table tbody tr').should('have.length', 2);
    });

    it('Cadastrar Entradas', () => {



        cy.get('#transaction .button').click() //ide + classe
        cy.get('#description').type('Mesada') // id

        cy.get('[name = amount]').type(12) // atributos
        cy.get('[type = date]').type('2021-03-21') //atributos
        cy.get('button').contains('Salvar').click() // tipo e valor



       /cy.get('#data-table tbody tr').should('have.length', 3);

    });

    //Cadatsrar Saidas



    it('Cadastrar Saidas', () => {


        cy.get('#transaction .button').click() //ide + classe
        cy.get('#description').type('Mesada') // id

        cy.get('[name = amount]').type(-12) // atributos
        cy.get('[type = date]').type('2021-03-21') //atributos
        cy.get('button').contains('Salvar').click() // tipo e valor
        cy.get('#data-table tbody tr').should('have.length', 3);
    });
    // Remover entradss e saidas
    it('Remover entradas e Saidas', () => {
       

        // estragteria 1 voltar para o elemneto pai, e avançar para um td imagem atributo


        cy.get('td.description')
            .contains("Mesada")
            .parent()
            .find('img[onclick*=remove]')
            .click()

        // Estrategia 2 buscar todos os irmãos , e buscar img + attr
        cy.get('td.description')
            .contains('Suco Kapo')
            .siblings()
            .children('img[onclick*=remove]')
            .click()

        //cy.get('#data-table tbody tr').should('have.length', 0);

    });

    it('Validar Saldo c/ diversas transações', () => {

        //capturar linhas com as transações
        const entrada = "Mesada"
        const saida = "KinderOvo"

     


        let incomes = 0
        let expenses = 0

        cy.get('#data-table tbody tr')
            .each(($el, index, $list) => {
                cy.get($el).find('td.income, td.expense').invoke('text').then(text => {

                    if (text.includes('-')) {

                        expenses = expenses + format(text)
                    } else {
                        incomes = incomes + format(text)

                        cy.log('entradas', incomes)
                        cy.log('saidas', expenses)
                    }
                })
            })




        //formatar esses valores das linhas
        //capturar o texto do total
        // comparar o somatorio dde entrads e despesas c/ o total
        cy.get('#totalDisplay').invoke('text').then(text => {

            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses

            expect(formattedTotalDisplay).to.eq(expectedTotal)


        })


    });




});


    //entender o fluxo manualmennte
    // mapear os elementos que vamos interagir
    // descrever as interações c/ cypress
    //adcionar as assserções que a gente precisa







