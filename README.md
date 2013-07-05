#dibs
==========
A simple wrapper for the DIBS Payment Services [API](http://tech.dibs.dk/dibs_api/dibs_payment_window/).

## Installation

```
$ npm install dibs
```

## Docs

```
var dibs = require('dibs');
```

#### testMode
Set the requests to test mode

```
dibs.testMode = true;
```

#### hmacKey
Set the default HMAC Key to encode the requests

```
dibs.hmacKey = '3552687064253 . . . 35a48402a7627';
```

### Methods

#### pingSatellite
The ping service checks if the satellite system is up and running.

#### authorizeCard
The service performs the first part of a credit card transaction (the authorisation). The authorisation includes e.g. credit- and debit-card control and reservation of the required amount for later capture.

#### authorizeTicket
Make a recurring payment using a ticket previously created either via the Payment Window or using the authorizeCard service.

#### createTicket
The service performs a credit- and debit-card check and saves the credit card information for recurring payments.

#### captureTransaction
The second part of any transaction is the capture process. Usually this take place at the time of shipping the goods to the customer, and is normally accessed via the DIBS administration interface.

#### cancelTransaction
The cancelTransaction service cancels an authorization. If the acquirer used supports reversals, the system automatically sends one such along and thereby releasing any reserved amounts.
   

#### refundTransaction
The refundTransaction service refunds a captured transaction and transfers the money back to the card holders account.
   

### Further documentation
For more ideas check the [DIBS API Documentation](http://tech.dibs.dk/dibs_api/dibs_payment_window/).

## License

[MIT](https://github.com/aheckmann/mpromise/blob/master/LICENSE)
