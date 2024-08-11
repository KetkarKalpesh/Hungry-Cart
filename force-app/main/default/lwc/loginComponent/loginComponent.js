import { LightningElement, track } from 'lwc';
import checkEmailAndSend from '@salesforce/apex/LoginController.checkEmailAndSend';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LoginComponent extends LightningElement {
    @track userName = '';
    @track userEmail = '';
    @track isLoading = false;

    handleInputChange(event) {
        const field = event.target.name;
        if (field === 'userName') {
            this.userName = event.target.value;
        } else if (field === 'userEmail') {
            this.userEmail = event.target.value;
        }
    }

    handleLogin() {
        this.isLoading = true;

        checkEmailAndSend({ email: this.userEmail })
            .then((result) => {
                this.isLoading = false; 
                if (result) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'OTP sent successfully!',
                            variant: 'success',
                        })
                    );

                    this.navigateToOtpPage();
                } else {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: 'Email not found!',
                            variant: 'error',
                        })
                    );
                }
            })
            .catch((error) => {
                this.isLoading = false;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'An error occurred during login: ' + error.body.message,
                        variant: 'error',
                    })
                );
            });
    }

    navigateToOtpPage() {
        const navigateEvent = new CustomEvent('navigate', {
            detail: {
                page: 'otpPage'
            }
        });
        this.dispatchEvent(navigateEvent);
    }
}