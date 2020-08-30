const Page = require('./page');
const chalk = require('chalk');


class LoginPage extends Page {

    get mailSummary() {return $("(//div[@class = 'SummaryPassengersContact__ItemWrapper-sc-1dsvx02-0 fgMgDf'])[1]")}
    get phoneSummary() {return $("(//div[@class = 'SummaryPassengersContact__ItemWrapper-sc-1dsvx02-0 fgMgDf'])[2]")}
    get passPortSummary() {return $(".SummaryPassenger__DocumentWrapper-sc-181qt14-3.gkrcqA p")}

 

    waitForReservationFormsAvailable(){
        const elementToBeVisible = $(".ReservationPassengers")
        elementToBeVisible.waitForDisplayed({ timeout: 5000 });
    }
    
    fillMail(parameters){
        const mailInput = $('[name="email"]')
        mailInput.setValue(parameters.email)
    }

    fillPhone(parameters){
        const phoneInput = $('[name="phone"]')
        phoneInput.setValue(parameters.phone)
    }

    fillFirstName(parameters){
        const FirstNameInput = $('[name="firstname"]')
        FirstNameInput.setValue(parameters.firstname)
    }

    fillLastName(parameters){
        const LastNameInput = $('[name="lastname"]')
        LastNameInput.setValue(parameters.lastname)
    }

    fillPasspordID(parameters){
        const passportIdInput = $('[name="idNumber"]')
        passportIdInput.setValue(parameters.passpordId)
    }

    selectNacionality(parameters){
        const nacionalityInput = $("[data-test = 'ReservationPassenger-nationality']")
        const nacionality = parameters.nacionality
        const nacionalityDropDownOption = $("//select[@data-test = 'ReservationPassenger-nationality']/option[@value='"+nacionality+"']")
        nacionalityInput.click()
        nacionalityDropDownOption.click()
    }

    selectGender(parameters){
        const genderDropDown = $("//div[@class='PassengerForm__GenderWrapper-sc-2xde17-5 eZqUld']")
        const gender = parameters.gender
        const genderDropDownOption = $("//div[@class='PassengerForm__GenderWrapper-sc-2xde17-5 eZqUld']//option[@value='"+gender+"']")
        genderDropDown.click()
        genderDropDownOption.click()
    }

    selectDateOfBirth(parameters){
        const month = parameters.month
        const day = parameters.day
        const year = parameters.year
        const monthDropDown = $("[data-testid = 'month']")
        const monthDropDownOption = $("//select[@data-testid = 'month']//option[@value='"+month+"']")
        monthDropDown.click()
        monthDropDownOption.click()
        const birthDayInput = $('[name="birthDay"]')
        birthDayInput.setValue(day)
        const birthYearInput = $('[name="birthYear"]')
        birthYearInput.setValue(year)
    }

    selectDoesNotExpire(){
        const noExpirationCheckBox = $('.Checkbox__IconContainer-sc-1x6twh3-0.Smkul')
        noExpirationCheckBox.click()
    }

    clickContinue(){
        const continueButton = $("[data-test = 'StepControls-passengers-next']")
        continueButton.click()
    }

    goToCheckout(){
        $(".ButtonPrimitiveContent__StyledButtonPrimitiveContent-g7vhys-0.BxtAk").click()
        $("[data-test = 'fareTypesSaverModalContinue']").click()
        $("[data-test = 'servicePackagesBasicButton']").click()
        const lastButton = $("[data-test = 'StepControls-AdditionalService-next']")
        lastButton.waitForDisplayed({ timeout: 5000 });
        lastButton.click()
        lastButton.click()
    }


}


module.exports = new LoginPage();
