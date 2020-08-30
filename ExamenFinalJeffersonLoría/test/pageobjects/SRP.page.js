const Page = require('./page');
const chalk = require('chalk'); 

class LoginPage extends Page {

    get resultCard() {return $$("[data-test = 'ResultCardWrapper']")}
    get noResultsErrorMessage() {return $(" .NoResultsstyled__NoResultsFiltersWrapper-sc-9bkg22-5 div.Heading__StyledHeading-sc-1b8cso5-0")}
    

    selectFilter (filterType, browser) {
        const trainSelector = $("//input[@data-test = 'TransportOptionCheckbox-train']/../div/*[@class='Icon__StyledIcon-sc-1pnzn3g-0 eTbxni']")
        const busSelector = $("//input[@data-test = 'TransportOptionCheckbox-bus']/../div/*[@class='Icon__StyledIcon-sc-1pnzn3g-0 eTbxni']")
        const planeSelector = $("//input[@data-test = 'TransportOptionCheckbox-aircraft']/../div/*[@class='Icon__StyledIcon-sc-1pnzn3g-0 eTbxni']")
       
        switch(filterType){
            case "train":
                busSelector.click()
                browser.pause(5000)
                planeSelector.click()
            break
            case "bus":
                trainSelector.click()
                browser.pause(5000)
                planeSelector.click()
            break
            case "flight":
                busSelector.click()
                browser.pause(5000)
                trainSelector.click()
            break
        }
    }

    clearFilters(){
        $("(//a[@data-test ='HeaderLink'])[1]").click()
    }

    book(){
       const bookButton =  $("(//div[@data-test = 'BookingButton'])[1]")
       bookButton.waitForExist({ timeout: 5500 });
       bookButton.click()
    }
}

module.exports = new LoginPage();
