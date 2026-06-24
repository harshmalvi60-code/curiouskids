// All world/mission content lives here as typed data — add worlds without touching app logic.

export type LessonCard = { e: string; h: string; p: string; wow?: string };
export type Lesson = { title: string; cards: LessonCard[] };
export type QuizQ = { q: string; opts: string[]; a: number; why: string };

export type World = {
  id: string;
  title: string;
  emoji: string;
  accent: string;
  grad: string;
  blurb: string;
  lessons: Lesson[];
  facts: string[];
  quiz: QuizQ[];
  challenge: { title: string; prompt: string };
};

// missions per world = lessons + quiz + challenge
export const worldTotal = (w: World) => w.lessons.length + 2;
export const worldById = (id: string) => WORLDS.find((w) => w.id === id);

export const WORLDS: World[] = [
  {
    id: "space",
    title: "Space Explorer",
    emoji: "🪐",
    accent: "#8B6CFF",
    grad: "linear-gradient(135deg,#3a2a8f,#8B6CFF)",
    blurb: "Blast past planets and stars and find out what makes the universe glow.",
    lessons: [
      {
        title: "What is a Star?",
        cards: [
          { e: "⭐", h: "Stars are giant balls of fire", p: "A star is a huge ball of glowing hot gas, floating in space. It makes its own light and heat!" },
          { e: "☀️", h: "Our Sun is a star", p: "The Sun is the closest star to us. It looks bigger only because it is much, much nearer than the others." },
          { e: "🌌", h: "There are TOO many to count", p: "There are more stars in the sky than grains of sand on every beach on Earth.", wow: "Did you know? Some stars you see at night may have already burned out — their light just took years to reach you!" },
        ],
      },
      {
        title: "Our Solar System",
        cards: [
          { e: "🪐", h: "8 planets, 1 Sun", p: "Eight planets travel around the Sun in big circles called orbits. Earth is one of them — that's our home!" },
          { e: "🌍", h: "Earth is the special one", p: "Earth is the only planet we know that has water, air and life. That's why YOU can live here." },
          { e: "🔴", h: "Mars is the red planet", p: "Mars looks red because its ground is full of rusty iron — like an old, rusty nail!", wow: "Fun fact: Jupiter is so big that all the other planets could fit inside it!" },
        ],
      },
      {
        title: "Why Day and Night?",
        cards: [
          { e: "🌗", h: "Earth spins like a top", p: "Earth slowly spins around. The side facing the Sun has daytime. The other side has night." },
          { e: "⏰", h: "One spin = one day", p: "It takes 24 hours for Earth to spin all the way around. That's why a day is 24 hours long!", wow: "The Sun never actually 'sets' — it's us turning away from it!" },
        ],
      },
      {
        title: "Rockets & Astronauts",
        cards: [
          { e: "🚀", h: "Rockets beat gravity", p: "Rockets burn fuel super fast to push themselves up and escape Earth's pull into space." },
          { e: "👩‍🚀", h: "Astronauts float!", p: "In space there is almost no gravity, so astronauts float around inside their spaceship.", wow: "Astronauts can grow up to 5 cm taller in space because their spine stretches out!" },
        ],
      },
    ],
    facts: [
      "A day on Venus is longer than its whole year!",
      "The footprints on the Moon will stay there for millions of years — there's no wind to blow them away.",
      "Saturn would float in water if you found a bathtub big enough.",
      "Space is completely silent because there is no air to carry sound.",
    ],
    quiz: [
      { q: "What is a star made of?", opts: ["Rock and ice", "Glowing hot gas", "Water", "Metal"], a: 1, why: "Stars are giant balls of glowing hot gas that make their own light!" },
      { q: "How many planets orbit our Sun?", opts: ["6", "8", "12", "100"], a: 1, why: "There are 8 planets in our solar system — Earth is the third one!" },
      { q: "Why do we have day and night?", opts: ["The Sun moves", "Earth spins around", "Clouds cover the Sun", "The Moon hides it"], a: 1, why: "Earth spins like a top — the side facing the Sun gets day!" },
      { q: "Which planet is called the 'red planet'?", opts: ["Earth", "Jupiter", "Mars", "Venus"], a: 2, why: "Mars looks red because its soil is full of rusty iron." },
    ],
    challenge: { title: "Planet Challenge", prompt: "Can you name all 8 planets in order from the Sun? (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune!)" },
  },
  {
    id: "animals",
    title: "Animal Kingdom",
    emoji: "🦁",
    accent: "#FFB23C",
    grad: "linear-gradient(135deg,#7a4a12,#FFB23C)",
    blurb: "Meet the strongest, fastest and weirdest creatures on the planet.",
    lessons: [
      {
        title: "Super Animal Powers",
        cards: [
          { e: "🐆", h: "The fastest runner", p: "A cheetah can run as fast as a car on the highway — but only for a short burst!" },
          { e: "🐘", h: "Elephants never forget", p: "Elephants have amazing memories and can remember friends even after many years apart.", wow: "A group of lions is called a 'pride', and the females do most of the hunting!" },
        ],
      },
      {
        title: "Homes in the Wild",
        cards: [
          { e: "🐝", h: "Tiny builders", p: "Bees build perfect six-sided rooms in their hive — a shape that uses the least wax for the most space!" },
          { e: "🦫", h: "Animal engineers", p: "Beavers build dams across rivers using sticks and mud, creating safe ponds for their homes.", wow: "Some birds weave nests so well they can hold water like a cup!" },
        ],
      },
    ],
    facts: ["Octopuses have THREE hearts and blue blood!", "A snail can sleep for up to 3 years.", "Flamingos are pink because of the shrimp they eat.", "A group of flamingos is called a 'flamboyance'."],
    quiz: [
      { q: "Which animal is the fastest land runner?", opts: ["Lion", "Cheetah", "Elephant", "Horse"], a: 1, why: "The cheetah is the fastest — as fast as a car for short bursts!" },
      { q: "How many hearts does an octopus have?", opts: ["1", "2", "3", "5"], a: 2, why: "Octopuses have three hearts and even blue blood!" },
      { q: "What shape are the rooms bees build?", opts: ["Circle", "Square", "Six sides", "Triangle"], a: 2, why: "Bees build six-sided cells — the most space for the least wax!" },
    ],
    challenge: { title: "Animal Challenge", prompt: "Find 3 animals at home or in pictures and say one super-power each one has!" },
  },
  {
    id: "ocean",
    title: "Ocean Mysteries",
    emoji: "🌊",
    accent: "#34E1B6",
    grad: "linear-gradient(135deg,#0e5a73,#34E1B6)",
    blurb: "Dive into the deep blue and discover the secrets hiding under the waves.",
    lessons: [
      {
        title: "The Deep Blue",
        cards: [
          { e: "🐋", h: "The biggest animal ever", p: "The blue whale is bigger than any dinosaur that ever lived — its heart is as big as a small car!" },
          { e: "🌊", h: "We've barely explored it", p: "We've explored more of space than the deep ocean! Most of it is still a mystery.", wow: "Some deep-sea fish make their own light to find food in the dark — like living torches!" },
        ],
      },
      {
        title: "Ocean Helpers",
        cards: [
          { e: "🐠", h: "Coral reefs are cities", p: "Coral reefs are home to thousands of sea creatures — like a busy underwater city!" },
          { e: "🫧", h: "The ocean helps us breathe", p: "Tiny ocean plants make most of the oxygen on Earth — more than all the forests combined.", wow: "Every second breath you take comes from the ocean!" },
        ],
      },
    ],
    facts: ["The ocean covers more than 70% of Earth.", "Most of the oxygen we breathe comes from the ocean, not trees!", "There are underwater waterfalls in the sea.", "The deepest part of the ocean could swallow Mount Everest."],
    quiz: [
      { q: "What is the biggest animal on Earth?", opts: ["Elephant", "Blue whale", "Shark", "T-Rex"], a: 1, why: "The blue whale is the biggest animal that has ever lived!" },
      { q: "How much of Earth is covered by ocean?", opts: ["About 30%", "About 50%", "About 70%", "About 90%"], a: 2, why: "Oceans cover over 70% of our planet!" },
      { q: "Where does most of our oxygen come from?", opts: ["The ocean", "Cars", "Mountains", "The Moon"], a: 0, why: "Tiny ocean plants make most of the oxygen we breathe!" },
    ],
    challenge: { title: "Ocean Challenge", prompt: "Draw your own deep-sea creature and give it a special glowing power!" },
  },
  {
    id: "dinosaurs",
    title: "Dinosaur Age",
    emoji: "🦕",
    accent: "#A8E10A",
    grad: "linear-gradient(135deg,#4a6b0c,#A8E10A)",
    blurb: "Travel back in time and walk with the giants that once ruled the Earth.",
    lessons: [
      {
        title: "Walking With Giants",
        cards: [
          { e: "🦖", h: "The king of dinosaurs", p: "T-Rex had teeth as long as bananas and a bite stronger than any animal alive today!" },
          { e: "🦴", h: "We learn from fossils", p: "Fossils are dinosaur bones turned to stone over millions of years. They tell us their secrets!", wow: "Birds are actually living dinosaurs — the chicken is a cousin of the T-Rex!" },
        ],
      },
      {
        title: "Big, Small & Spiky",
        cards: [
          { e: "🦕", h: "The gentle giants", p: "Long-necked dinosaurs like Brachiosaurus were as tall as a 4-storey building and ate only plants!" },
          { e: "🛡️", h: "Built-in armour", p: "Some dinosaurs had spikes, plates and clubs on their tails to protect themselves from attackers.", wow: "Stegosaurus had a brain the size of a walnut, even though its body was as big as a bus!" },
        ],
      },
    ],
    facts: ["Some dinosaurs were as small as chickens.", "Dinosaurs lived on Earth for over 160 million years.", "The word 'dinosaur' means 'terrible lizard'.", "T-Rex could not actually see things that stood very still… probably!"],
    quiz: [
      { q: "How do we know about dinosaurs today?", opts: ["Photos", "Fossils", "Videos", "Letters"], a: 1, why: "Fossils are bones turned to stone that teach us about dinosaurs!" },
      { q: "Which animal today is related to dinosaurs?", opts: ["Birds", "Cats", "Fish", "Frogs"], a: 0, why: "Birds are living dinosaurs — even chickens!" },
      { q: "What did the long-necked giants eat?", opts: ["Meat", "Plants", "Rocks", "Fish"], a: 1, why: "Long-necked dinosaurs were gentle plant-eaters!" },
    ],
    challenge: { title: "Dino Challenge", prompt: "Invent your own dinosaur — what would it eat and how big would it be?" },
  },
  {
    id: "body",
    title: "Human Body",
    emoji: "🫀",
    accent: "#FF6B9D",
    grad: "linear-gradient(135deg,#7a1840,#FF6B9D)",
    blurb: "Explore the amazing machine inside YOU — and how all its parts work.",
    lessons: [
      {
        title: "The Amazing Machine",
        cards: [
          { e: "🫀", h: "Your heart never stops", p: "Your heart beats about 100,000 times every single day to pump blood all around your body!" },
          { e: "🧠", h: "Your brain is the boss", p: "Your brain controls everything — moving, thinking, feeling — even while you sleep!", wow: "You have enough blood vessels in your body to wrap around the Earth twice!" },
        ],
      },
      {
        title: "Bones & Senses",
        cards: [
          { e: "🦴", h: "Your bony frame", p: "You have 206 bones holding you up — a baby is born with even more, but some join together as you grow!" },
          { e: "👀", h: "Five super senses", p: "Sight, sound, smell, taste and touch send messages to your brain so you can understand the world.", wow: "Your nose can remember 50,000 different smells!" },
        ],
      },
    ],
    facts: ["Your bones are stronger than steel of the same size!", "You blink about 20,000 times a day.", "Your nose can remember 50,000 different smells.", "Your body has enough iron to make a small nail."],
    quiz: [
      { q: "How many times does your heart beat each day?", opts: ["100", "1,000", "100,000", "1 million"], a: 2, why: "Your heart beats around 100,000 times a day — non-stop!" },
      { q: "Which body part is the 'boss' of everything?", opts: ["Heart", "Brain", "Stomach", "Hand"], a: 1, why: "The brain controls your whole body, even in your sleep!" },
      { q: "How many bones does an adult have?", opts: ["50", "100", "206", "1,000"], a: 2, why: "Adults have 206 bones holding the body up!" },
    ],
    challenge: { title: "Body Challenge", prompt: "Put your hand on your chest — can you feel your heartbeat? Count the beats in 10 seconds!" },
  },
  {
    id: "nature",
    title: "Nature Explorer",
    emoji: "🌿",
    accent: "#5BD66B",
    grad: "linear-gradient(135deg,#1f6b2a,#5BD66B)",
    blurb: "Uncover the secret life of plants, weather and our incredible planet.",
    lessons: [
      {
        title: "The Living Planet",
        cards: [
          { e: "🌳", h: "Trees are oxygen factories", p: "Trees breathe in the air we don't need and breathe out the oxygen we DO need to live!" },
          { e: "🌧️", h: "Rain goes in circles", p: "Water rises into clouds, falls as rain, flows to the sea, and rises again — forever! It's called the water cycle.", wow: "A single big tree can give enough oxygen for two people for a whole day!" },
        ],
      },
      {
        title: "Weather Wonders",
        cards: [
          { e: "🌈", h: "Rainbows are sunlight", p: "A rainbow appears when sunlight passes through raindrops and splits into seven colours!" },
          { e: "⚡", h: "Thunder follows lightning", p: "We see lightning first, then hear thunder, because light travels much faster than sound.", wow: "Lightning is hotter than the surface of the Sun!" },
        ],
      },
    ],
    facts: ["Some plants can eat insects to get their food!", "Bees help grow most of the fruits we eat.", "Lightning is hotter than the surface of the Sun.", "The tallest tree on Earth is taller than a 30-storey building."],
    quiz: [
      { q: "What do trees give us that we need to breathe?", opts: ["Water", "Oxygen", "Sugar", "Light"], a: 1, why: "Trees make the oxygen we breathe — they're nature's air machines!" },
      { q: "What is the journey of water called?", opts: ["Water cycle", "Rain race", "Sea spin", "Cloud hop"], a: 0, why: "The water cycle moves water from sea to sky and back forever!" },
      { q: "Why do we see lightning before we hear thunder?", opts: ["Light is faster", "Sound is faster", "They happen apart", "Thunder is shy"], a: 0, why: "Light travels much faster than sound, so we see it first!" },
    ],
    challenge: { title: "Nature Challenge", prompt: "Go find a leaf outside. Look closely — can you see the tiny lines (veins) carrying its food?" },
  },
];
