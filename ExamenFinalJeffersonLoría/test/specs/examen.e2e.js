const Home = require('../pageobjects/homePage.page');
const SRP = require('../pageobjects/SRP.page');
const bookFly = require('../pageobjects/bookFly.page');
const fs = require('fs')
const { assert, expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-url'));


describe('Kiwi e2e tests', () => {
    const jsonString = fs.readFileSync('./test/resources/parameters.json')
    const parameters = JSON.parse(jsonString)
    const jsonStringBookData = fs.readFileSync('./test/resources/bookDataInfo.json')
    const data = JSON.parse(jsonStringBookData)
    

    before( () => {
        browser.url('https://www.kiwi.com/');
    });

    it('should let make a search using search bar', () => {
       Home.fillFromToOptions(parameters, browser)
       Home.selectPassagers(parameters)
       Home.chooseDates(browser)
       Home.exploreSearchBarButton.click()
       browser.pause(2000)
       const currentBrowser = browser.getUrl()
       expect(currentBrowser).to.contain.path(parameters.toCity);
       const numOfResults  = SRP.resultCard.length
       assert.notEqual(numOfResults, 0, 'There is not being showed results')
    });

    it('should work the page filters in SRP', () => {
       browser.url('https://www.kiwi.com/us/search/results/berlin-tegel-berlin-germany/london-united-kingdom/2020-10-01_2020-10-31/2020-10-01_2020-10-31')
       browser.pause(4500)
       const numOfResults  = SRP.resultCard.length
       assert.notEqual(numOfResults, 0, 'There is not being showed results')
       SRP.selectFilter("bus", browser)
       browser.pause(5500)
       const noResultsMessage = SRP.noResultsErrorMessage.getText()
       expect(noResultsMessage).to.have.string("Sorry, we couldn't find any results");
       SRP.clearFilters()
       browser.pause(5000)
       SRP.selectFilter("train", browser)
       browser.pause(6500)
       const numOfResultsAfterTrainFilter = SRP.resultCard.length
       assert.notEqual(numOfResultsAfterTrainFilter, 0, 'There is not being showed results')
     }); 

     it('should work the page filters in SRP', () => {
        browser.url('https://www.kiwi.com/us/search/results/berlin-tegel-berlin-germany/london-united-kingdom/2020-10-01_2020-10-31/2020-10-01_2020-10-31')
        SRP.book()
        bookFly.waitForReservationFormsAvailable();
        bookFly.fillMail(data)
        bookFly.fillPhone(data)
        bookFly.fillFirstName(data)
        bookFly.fillLastName(data)
        bookFly.selectNacionality(data)
        bookFly.selectGender(data)
        bookFly.fillPasspordID(data)
        bookFly.selectDateOfBirth(data)
        bookFly.selectDoesNotExpire()
        bookFly.clickContinue()
        bookFly.goToCheckout()
        const mailSumaryText = bookFly.mailSummary.getText()
        expect(mailSumaryText).to.have.string(data.email);
        const phoneSumaryText = bookFly.phoneSummary.getText()
        expect(phoneSumaryText).to.have.string(data.phone);
        const passPortSummaryText = bookFly.passPortSummary.getText()
        expect(passPortSummaryText).to.have.string(data.passpordId);
      });

});


