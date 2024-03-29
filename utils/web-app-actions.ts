import { WebApp as WebAppTypes } from "@twa-dev/types";

function sendTextMessage(app: WebAppTypes) {
    const botUrl = `https://tgbotdev.info/sendToUserFromWebApp?query_id=${app.initDataUnsafe.query_id}`;
    const options = {
        method: 'GET',
    };
      
    fetch(botUrl, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(responseData => {
        console.log('POST request successful:', responseData);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
      
};

function sendInvoiceMessage(app: WebAppTypes) {
  let id = app.initDataUnsafe.query_id;
  if (app.initDataUnsafe.chat_instance) {
    id = app.initDataUnsafe.chat_instance;
  }
  const botUrl = `https://tgbotdev.info/generateInvoice?query_id=${id}`;
  console.log(botUrl);
  const options = {
      method: 'GET',
  };
    
  fetch(botUrl, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(responseData => {
      app.openInvoice(responseData.data.invoiceLink);
      console.log('POST request successful:', responseData);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
    
};

export { sendTextMessage, sendInvoiceMessage };
