const Page = require('./page');
const chalk = require('chalk');


class LoginPage extends Page {

    get exploreSearchBarButton() {return $("//div[@class='ButtonPrimitiveContentChildren__StyledButtonPrimitiveContentChildren-xn0ytv-0 ljJqTc'][contains(text(),'Search')]")}
    

    fillFromToOptions (parameters, browser) {
        $("[data-test='PlacePickerInputPlace-close']").click()
        $("[data-test='SearchPlaceField-origin'] input").setValue(parameters.fromCity)
        browser.pause(2000)
        browser.keys("\uE007"); 
        $("[data-test =  'SearchPlaceField-destination'] input").setValue(parameters.toCity)
        browser.pause(2000)
        browser.keys("\uE007"); 
       
    }

    selectPassagers(parameters){
        $("[data-test = 'PassengersField']").click();  

        //Fill adults requirements
        const numberOfAdultsField = $("[data-test = 'PassengersRow-adults'] input")
        var numberOfAdults = numberOfAdultsField.getValue()
         while(numberOfAdults != parameters.numAdults){
            $("//div[@data-test = 'PassengersRow-adults']//button[@aria-label='increment']").click()
            numberOfAdults = numberOfAdultsField.getValue()
        } 

        //Fill kids requirements
        const numberOfChildrenField = $("[data-test = 'PassengersRow-children'] input")
        var numberOfChildren = numberOfChildrenField.getValue()
         while(numberOfChildren != parameters.numKids){
            $("//div[@data-test = 'PassengersRow-children']//button[@aria-label='increment']").click()
            numberOfChildren = numberOfChildrenField.getValue()
        } 

         //Fill infants requirements
         const numberOfinfantsField = $("[data-test = 'PassengersRow-infants'] input")
         var numberOfinfants = numberOfinfantsField.getValue()
          while(numberOfinfants != parameters.numInfants){
             $("//div[@data-test = 'PassengersRow-infants']//button[@aria-label='increment']").click()
             numberOfinfants= numberOfinfantsField.getValue()
         } 

         $("[data-test = 'PassengersFieldFooter-done']").click()
    }

    chooseDates(browser){
        const selectDatesButton = $("[data-test='SearchFormDoneButton']")
      
        //Select Departure
        $('div=Departure').click()
        $("[data-test = 'CalendarMoveNextButton']").click()
        browser.pause(6500)
        const availableDaysDepart = $$('.CalendarDaystyled__PriceTypography-ls4qch-6.hDPRiX')
        const maxValue = availableDaysDepart.length
        const random = Math.floor(Math.random()*maxValue -1);
        availableDaysDepart[random].click()
       
        browser.pause(6500)
        //Select Departure
        availableDaysDepart[random + 2].click()
        selectDatesButton.click()
    }

}

module.exports = new LoginPage();
