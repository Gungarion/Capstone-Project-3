import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));

let postGame = [
  {
    id: 1,
    title: "Elden Ring",
    rating: 5,
    genre: "RPG",
    review:
      "Elden Ring is an open-world masterpiece that blends incredible freedom of exploration with brutal yet rewarding combat. Its world, the Lands Between, feels vibrantly alive yet deeply haunting, filled with giant monsters and a dark, oppressive atmosphere. To be honest, the game is also pretty scary—from the grotesque and eerie enemy designs to the pitch-black caves that keep you on edge at every turn.",
  },
  {
    id: 2,
    title: "Hollow Knight: Silksong",
    rating: 5,
    genre: "Adventure",
    review:
      "Hollow Knight: Silksong is a masterclass in fluid motion, trading the original’s methodical pace for Hornet’s blistering, acrobatic combat. Exploring the verticality of Pharloom feels incredible because her kit is so much more agile, making every parry and silk-thread strike feel deeply impactful. It’s a punishingly beautiful experience that refines exploration and crafting into a true next-gen Metroidvania—proving it was absolutely worth the agonizing wait.",
  },
  {
    id: 3,
    title: "Cookie Run Kingdom",
    rating: 5,
    genre: "Strategy",
    review:
      "Cookie Run: Kingdom looks all sweet and colorful, but it’s secretly wild. The kingdom-building is addictive, but the lore gets surprisingly dark and pretty scary once you meet those twisted cake monsters and realize what’s actually happening to the cookies. It’s a total vibe, but definitely creepier than it looks!.",
  },
  {
    id: 4,
    title: "Genshin Impact",
    rating: 5,
    genre: "RPG",
    review:
      "Genshin Impact is a breathtaking open-world action RPG that mesmerizes with its anime-style visuals, seamless exploration across vast regions, and an epic, ongoing story packed with lore and emotional depth. What truly sets it apart is its revolutionary elemental reaction system—Vaporize for massive damage amps, Melt for frozen fiery blasts, Swirl for elemental spread, and unique Dendro combos like Bloom—that delivers strategic, physics-inspired combos unmatched in any other game. Generous for F2P players😇, it's an addictive masterpiece of adventure and team-building bliss.",
  },
];

// routes
app.get("/", (req, res) => {

    res.render("index", {theReview: postGame});
});

app.get("/new-post", (req, res) => {
    res.render("new-post");
});

app.get("/about", (req, res) => {
    res.render("about");
});


// posting new post
app.post("/new-post", (req, res) => {

  const newPost = {
    id: postGame.length + 1,
    title: req.body.title,
    rating: Number(req.body.rating),
    genre: req.body.genre,
    review: req.body.review,
  };

  postGame.push(newPost);
  res.redirect("/");
});


// edit-post
app.get("/edit/:id", (req, res) => {
    const postId = Number(req.params.id);

    const post = postGame.find(p => p.id === postId);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit", { post });
});


// POST /edit/:id
app.post("/edit/:id", (req, res) => {
    const postId = Number(req.params.id);

    const { title, rating, genre, review } = req.body;

    const postIndex = postGame.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).send("Post not found");
    }

    // update
    postGame[postIndex] = {
        ...postGame[postIndex],
        title,
        rating: Number(rating),
        genre,
        review,
    };

    res.redirect("/");
});

// delete-post

app.post("/delete", (req, res) => {
const deleteId = req.body.id;

postGame = postGame.filter(game => game.id != deleteId);

  res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});