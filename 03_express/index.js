import express from "express";
import morgan from "morgan";
import logger from "./logger.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let teaData = [];
let teaId = 1;
// add the tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: teaId++, name, price };
  teaData.push(newTea);
  res.status(200).send(newTea);
});

// get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//update the tea
app.put("/teas/:id", (req, res) => {
  const { name, price } = req.body;
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//delete the tea
app.delete("/teas/:id", (req, res) => {
  const Index = teaData.findIndex((tea) => tea.id === parseInt(req.params.id));
  if (Index === -1) return res.status(404).send("tea not found");

  teaData.splice(Index, 1);
  res.status(201).send("deleted");
});

app.listen(port, () => {
  console.log(`server is listening at port http://127.0.0.1:${port}`);
});
