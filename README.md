#dibs
A simple wrapper for the [DIBS Payment Services](http://www.dibspayment.com/) API.

## Installation

```
$ npm install dibs
```

## Docs

**Please note the following**: 

 - a basic understanding of the DIBS API is required to use this library
 - the DIBS payment services gateway is NOT a free service and this library is useless
  without a DIBS account - please see [www.dibspayment.com](www.dibspayment.com) for further information.
 - an HMAC key is used to encode the requests. That key can be found on the DIBS account adminstration page under ***Integration > HMAC Key***.

#### Usage

```
var dibs = require('dibs');
```

#### hmacKey

The HMAC key can be set per request or globally. To set a default HMAC Key use:

```
dibs.hmacKey = '355a26 . . . 35c48d';
```

### Methods

With the exception of pingSatellite, all methods recieve the same arguments and a callback function.

```
dibs.[methodName](options, hmacKey, callback);
```

`options` - object with the request parameters.

 * check [http://tech.dibs.dk/dibs_api/dibs_payment_window/](http://tech.dibs.dk/dibs_api/dibs_payment_window/) for a list of mandatory and optional parameters to use in the `options` object, for each of the available methods.
 * the parameter types **must** be followed or a MAC error will be returned. 
 * **please note**: the MAC string should not be included. It is calculated internally by the module.

`hmacKey` - the HMAC key to encode the request or ***null*** (if set globally).

`callback` - a callback funtion that receives an `err` and a `data` object. The `data` object contains the answer from DIBS.

#### authorizeCard
This service performs the first part of a credit card transaction (the authorisation). The authorisation includes credit and debit card control and reservation of the required amount for later capture.

```
dibs.authorizeCard(options, hmacKey, function (err, data){ ... });
```
***Please note:*** the `cvc`, `expMonth` and `expYear` are mandatory fields in the `options` object, despite being listed as optional in the API docs.

#### createTicket
This service performs a credit and debit card check and saves the credit card information for recurring payments.

```
dibs.createTicket(options, hmacKey, function (err, data){ ... });
```

***Please note:*** the `cvc`, `expMonth` and `expYear` are mandatory fields in the `options` object, despite being listed as optional in the API docs.

#### authorizeTicket
Make a recurring payment using a ticket previously created via the createTicket service.

```
dibs.authorizeTicket(options, hmacKey, function (err, data){ ... });
```

#### captureTransaction
The second part of any transaction is the capture process. Usually this take place at the time of shipping the goods to the customer.

```
dibs.captureTransaction(options, hmacKey, function (err, data){ ... });
```

#### cancelTransaction
The cancelTransaction service cancels an authorization. If the acquirer used supports reversals, the system automatically sends one such along and thereby releasing any reserved amounts.

```
dibs.cancelTransaction(options, hmacKey, function (err, data){ ... });
```

#### refundTransaction
The refundTransaction service refunds a captured transaction and transfers the money back to the card holders account.

```
dibs.refundTransaction(options, hmacKey, function (err, data){ ... });
```

#### pingSatellite
The ping service checks if the satellite system is up and running. 

```
dibs.pingSatellite(function (err, data){ ... });
```

### Promises
`dibs` uses the `mpromise` library. It allows the following syntax:

```
dibs.authorizeCard(cardInfo)
.then(function(data){
	...
	return dibs.captureTransaction(transInfo);
})
.then(function onSuccess(data){
	...
}, function onError(err){
	...
});
```

To know more about promises and the `mpromise` library check [https://npmjs.org/package/mpromise](https://npmjs.org/package/mpromise).

## License

[MIT](https://github.com/front/dibs/blob/master/LICENSE)
