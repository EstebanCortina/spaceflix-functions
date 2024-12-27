const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors");

admin.initializeApp();

const corsHandler = cors({origin: true});

exports.sendNotification = onRequest(async (req, res) => {
  corsHandler(req, res, async () => { // Usa el middleware CORS
    try {
      if (req.method !== "POST") {
        return res.status(405).send("Only POST requests are allowed");
      }

      const {token, title, body} = req.body;

      if (!token || !body) {
        return res.status(400)
            .send("Missing required fields: token, title, body");
      }

      const message = {
        notification: {
          title: title,
          body: body,
        },
        token: token,
      };

      const response = await admin.messaging().send(message);
      res.status(200).json({message: `Message sent successfully: ${response}`});
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).send(`Error sending message`);
    }
  });
});

exports.createOrder = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests are allowed");
  }
  try {
    const {
      MercadoPagoConfig,
      Preference,
    } = require("mercadopago");

    const client = new MercadoPagoConfig({
      // eslint-disable-next-line max-len
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    console.log(client);

    console.log("error after creating client");
    const preference = await new Preference(client).create(
        {
          body: {
            items: [{
              id: "creditos",
              unit_price: 1,
              quantity: 1,
              title: "Comprar créditos",
            }],
          },
        });
    const preferenceObj = await preference;
    console.log(preferenceObj);
    res.status(201).json({data: preferenceObj.init_point});
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({data: "Error creating order"});
  }
});
