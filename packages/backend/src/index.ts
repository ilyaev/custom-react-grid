import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.NODE_ENV === "prod" ? 80 : 5001;

app.use(cors());

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

app.get("/api/users", (req: Request, res: Response) => {
  const users = [
    {
      id: 4,
      name: "Bob Brown",
      url: "BobBrown.png",
    },
    {
      id: 5,
      name: "Charlie Davis",
      url: "CharlieDavis.png",
    },
    {
      id: 6,
      name: "Diana Evans",
      url: "DianaEvans.png",
    },
    {
      id: 7,
      name: "Eve Foster",
      url: "EveFoster.png",
    },
    {
      id: 8,
      name: "Frank Green",
      url: "FrankGreen.png",
    },
    {
      id: 9,
      name: "Grace Harris",
      url: "GraceHarris.png",
    },
    {
      id: 10,
      name: "Henry Irving",
      url: "HenryIrving.png",
    },
    {
      id: 11,
      name: "Ivy Johnson",
      url: "IvyJohnson.png",
    },
    {
      id: 12,
      name: "Jack King",
      url: "JackKing.png",
    },
    {
      id: 13,
      name: "Karen Lee",
      url: "KarenLee.png",
    },
    {
      id: 14,
      name: "Leo Martin",
      url: "LeoMartin.png",
    },
    {
      id: 15,
      name: "Mia Nelson",
      url: "MiaNelson.png",
    },
    {
      id: 16,
      name: "Nina Owens",
      url: "NinaOwens.png",
    },
    {
      id: 17,
      name: "Oscar Perez",
      url: "OscarPerez.png",
    },
    {
      id: 18,
      name: "Paul Quinn",
      url: "PaulQuinn.png",
    },
    {
      id: 19,
      name: "Quincy Roberts",
      url: "QuincyRoberts.png",
    },
    {
      id: 20,
      name: "Rachel Scott",
      url: "RachelScott.png",
    },
    {
      id: 21,
      name: "Sam Taylor",
      url: "SamTaylor.png",
    },
    {
      id: 22,
      name: "Tina Underwood",
      url: "TinaUnderwood.png",
    },
    {
      id: 23,
      name: "Uma Vance",
      url: "UmaVance.png",
    },
  ];
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
