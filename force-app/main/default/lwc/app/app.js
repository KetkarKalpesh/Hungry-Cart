import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track showLogin = true;
    @track showOtpPage = false;

    handleNavigation(event) {
        const page = event.detail.page;
        if (page === 'otpPage') {
            this.showLogin = false;
            this.showOtpPage = true;
        }
    }
}