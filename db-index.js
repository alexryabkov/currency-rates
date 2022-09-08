const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Fake currencies data
const setRatesData = () => {
  const success = true;
  const timestamp = Date.now();
  const date = new Date(timestamp).toISOString().split("T")[0];
  const base = "RUB";
  const result = {
    USD: Math.random() * (0.015 - 0.017) + 0.017,
    EUR: Math.random() * (0.015 - 0.017) + 0.017,
    GBP: Math.random() * (0.014 - 0.015) + 0.015,
    CNY: Math.random() * (0.112 - 0.115) + 0.115,
    JPY: Math.random() * (1.35 - 2.55) + 2.55,
    TRY: Math.random() * (0.25 - 0.35) + 0.35,
  };

  return { success, timestamp, date, base, result };
};

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/currencies", (req, res) => {
  res.jsonp(setRatesData());
});

server.listen(5000, () => {
  console.log("JSON Server is running");
});
