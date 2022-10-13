require('dotenv').config({ path: 'variables.env' });
const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const AxiosWrapper = require.main.require('./wrappers/AxiosWrapper');

function notifyTextMessage() {
    twilioClient.messages
      .create({
         body: 'NVIDIA 4090 AVAILABLE',
         from: process.env.TWILIO_PHONE_NUMBER,
         to: process.env.PHONE_NUMBER
       })
      .then(message => console.log(message.sid));
}

function checkProductStock() {
    const method = 'get';
    const url = `https://www.bestbuy.ca/ecomm-api/availability/products?accept=application%2Fvnd.bestbuy.standardproduct.v1%2Bjson&skus=${process.env.BEST_BUY_SKU}`;
    AxiosWrapper.request(method, url).then((response) => {
        const isAvailableByShipping = response.data.availabilities[0].shipping.purchasable;
        if (isAvailableByShipping) {
            notifyTextMessage();
            console.log('=AVAILABLE=AVAILABLE=AVAILABLE=AVAILABLE=AVAILABLE=AVAILABLE==AVAILABLE=AVAILABLE==AVAILABLE=AVAILABLE=');
        }
        console.log(new Date(), `https://www.bestbuy.ca/en-ca/product/${process.env.BEST_BUY_SKU}`, 'Purchasable:', isAvailableByShipping);
        return response;
    }, (error) => {
        console.log(error);
        throw error;
    });
}
checkProductStock();
setInterval(checkProductStock, 5 * 1000);
