import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import NAME from '@salesforce/messageChannel/Name__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AgentScreen extends LightningElement {
    subscription = null;

    @wire (MessageContext)
    messageConext;

    customerFirstName = '';
    customerLastName = '';

    connectedCallback() {
        this.handleSubscription();
    }

    handleSubscription() {
        this.subscription = subscribe(this.messageConext, NAME, (message) => {
            this.customerFirstName = message.firstName;
            this.customerLastName = message.lastName;
            this.showToast('Success', 'Customer Data Published', 'success');
        });
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title : title,
            message : message,
            variant : variant
        });
        this.dispatchEvent(evt);
    }
}