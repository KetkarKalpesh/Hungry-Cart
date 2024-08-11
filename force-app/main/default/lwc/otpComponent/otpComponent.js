import { LightningElement, track } from 'lwc';
import validateOtp from '@salesforce/apex/LoginController.validateOtp';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OtpComponent extends LightningElement {
    @track otp = '';
    @track userEmail = ''; // This should be passed from the login component

    handleInputChange(event) {
        this.otp = event.target.value;
    }

    handleSubmitOtp() {
        validateOtp({ email: this.userEmail, enteredOtp: this.otp })
            .then((result) => {
                if (result) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'OTP verified successfully!',
                            variant: 'success',
                        })
                    );
                    // Navigate to the Category page
                    this.navigateToCategoryPage();
                } else {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: 'Invalid OTP. Please try again.',
                            variant: 'error',
                        })
                    );
                }
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'An error occurred during OTP verification: ' + error.body.message,
                        variant: 'error',
                    })
                );
            });
    }

    navigateToCategoryPage() {
        const navigateEvent = new CustomEvent('navigate', {
            detail: {
                page: 'categoryPage'
            }
        });
        this.dispatchEvent(navigateEvent);
    }
}
