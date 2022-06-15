/// <reference types='Cypress' />

describe('POST /character', function () {

    before(function () {
        cy.back2ThePast()
        cy.setToken()
    })


    it('Deve cadastrar um personagem', function () {

        const character = {
            name: "Charles Xavier",
            alias: "Professr X",
            team:
                ["xmen", "illuminatis"],
            active: true
        }
        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)
                expect(response.body.character_id.length).to.eql(24)
            })

    })


    context('Quando o personagem já existe', function () {

        const character = {
            name: "Pietro Maximoff",
            alias: "Mercurio",
            team:
                ["Vingadores", "Irmandade de Mutantes"],
            active: true
        }

        before(function () {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body.character_id.length).to.eql(24)
                })
        })

        it('Não deve cadastrar duplicado', function () {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')
                })
        })
    })

})


