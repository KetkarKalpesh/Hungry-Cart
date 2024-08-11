public without sharing class LoginController {

    @AuraEnabled(cacheable=false)
    public static Boolean checkEmailAndSend(String email) {
        List<Contact> contacts = [SELECT Id, FirstName, Email FROM Contact WHERE Email = :email LIMIT 1];

        if (!contacts.isEmpty()) {
            Contact contact = contacts[0];
            
            OTP__c otpRecord = new OTP__c(
                Contact__c = contact.Id
            );
            insert otpRecord;

            OTP__c latestOtpRecord = [SELECT Name FROM OTP__c WHERE Contact__c = :contact.Id ORDER BY CreatedDate DESC LIMIT 1];
            String otp = latestOtpRecord.Name;
            
            String emailBody = 'Dear ' + contact.FirstName + ',\n\n' +
                               'Your OTP is: ' + otp + '\n\n' +
                               'Please use this OTP to complete your login.\n\n' +
                               'Thank you for using Hungry Cart.';
            
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setToAddresses(new String[] { email });
            mail.setSubject('Your OTP for Hungry Cart');
            mail.setPlainTextBody(emailBody);
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
            
            return true;
        } else {
            return false;
        }
    }

    @AuraEnabled(cacheable=false)
    public static Boolean validateOtp(String email, String enteredOtp) {
        List<Contact> contacts = [SELECT Id FROM Contact WHERE Email = :email LIMIT 1];

        if (!contacts.isEmpty()) {
            Contact contact = contacts[0];

            OTP__c latestOtpRecord = [SELECT Name FROM OTP__c WHERE Contact__c = :contact.Id ORDER BY CreatedDate DESC LIMIT 1];

            if (latestOtpRecord != null && latestOtpRecord.Name == enteredOtp) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}