const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Movies' },
    { name: 'Books' },
    { name: 'Video Games' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Halo Fall Of Reach (movie)',
      description:
        `Relive the origin of the legendary Master Chief and the Spartan program in this three-part animated adaptation of one of Halo's most beloved stories.`,
      image: 'haloMovie.jpg',
      category: categories[0]._id,
      price: 5.99
    },
    {
      name: `Assassin's Creed (movie)`,
      description:
        `Michael Fassbender stars in this action-adventure film based on the acclaimed video game franchise about a man who discovers he's a descendant of an ancient line of Assassins.`,
      image: 'acMovie.jpg',
      category: categories[0]._id,
      price: 14.99 
    },
    {
    name: 'Halo: Fall of Reach (book)',
    description:
      'The legend of Master Chief begins here! Under the threat of civil war, the United Nations Space Command initiates a clandestine military program to create super-soldiers. One recruit, a boy named John, swiftly rises above the rest - using his superior speed, intelligence and adaptability to become the most legendary warrior the galaxy has ever known! Then: When the UNSC encounters the Covenant, an alien race bent on obliterating humanity, they send in Master Chief and his Spartans. But when the relentless Covenant begins invading the planet Reach, the UNSC is rapidly pushed to its breaking point - and Master Chief must decide between saving the planet or the fleet!',
    image: 'haloFallOfReach.jpg',
    category: categories[1]._id,
    price: 13.99
    },
    {
      name: 'HALO: Shadows of Reach (book)',
      description:
        'A Master Chief story and original full-length novel set in the Halo universe - based on the New York Times best-selling video game series!',
      image: 'haloShodowOfReach.jpg',
      category: categories[1]._id,
      price: 13.99
    },
    {
      name: 'HALO The Flood (book)',
      description:
        `It's 2552. Having barely escaped the final battle for Reach against the vast alien alliance known as the Covenant, the crew of the Pillar of Autumn, including Spartan John-117 - the Master Chief - and his AI companion Cortana, is forced to make a desperate escape into slipspace. But their destination brings them to an ancient mystery and an even greater struggle. In this far-flung corner of the universe floats a magnificently massive, artificial ringworld. The crew’s only hope of survival is to crash-land on its surface and take the battle opposing the Covenant to the ground.`,
      image: 'haloTheFlood.jpg',
      category: categories[1]._id,
      price: 9.99
    },
    {
      name: 'Uncharted: The Lost Legacy PlayStation Hits (PS4)',
      description:
        `order to recover a fabled ancient Indian artifact and keep it out of the hands of a ruthless war profiteer, Chloe Frazer must enlist the aid of renowned mercenary Nadine Ross (from Uncharted 4: A Thief's End) venturing deep into India's Western Ghats mountain range, Chloe and Nadine must learn to work together to unearth the artefact and fight their way through fierce opposition to prevent the region from falling into chaos`,
      image: 'uncharted.jpg',
      category: categories[2]._id,
      price: 17.28
    },
    {
      name: 'Bloodborne (PS4)',
      description:
        `Bloodborne is from the acclaimed studio behind Demons Souls and Dark Souls. It is a new 3rd person action RPG, exclusively on PS4 and brimming with unforgiving, unrelenting terrorFace your fears as you search for answers to a deadly mystery in the ancient city of Yharnam, now cursed with a strange endemic illness spreading through the streets like wildfire. Danger, death and madness lurk around every corner of this horrific forsaken world, and you must discover its darkest secrets in order to survive.Experience a deep, action RPG where the fear of the unexpected drives you forward. Engage in intelligent, strategic combat with both guns and blades, and develop your skills and character as you brave the journey alone, or join forces with others to tackle the challenge in co-op multiplayer.Key Features`,
      image: 'bloodborne.jpg',
      category: categories[2]._id,
      price: 18.89 
    },
    {
      name: `Assassin's Creed Origins (PS4)`,
      description:
        `Ancient Egypt – home of colossal pyramids, gilded tombs, tyrannical god-kings, and the origin story of the Assassins.
         As Cleopatra’s empire crumbles, the birth of the Assassin's Brotherhood will lead to an extraordinary shift of the world order. Along your journey, the mysteries of Ancient Egypt will be revealed.`,
      image: 'assassinCreedOrigins.jpg',
      category: categories[2]._id,
      price: 22.72 
    },
    {
      name: `Assassin's Creed Odyssey (PS4)`,
      description:
        `Write your own legendary Odyssey and live epic adventures in a world where every choice matters. Sentenced to death by your family, embark on an epic journey from outcast mercenary to legendary Greek hero, and uncover the truth about your past. Forge your path through a war-torn world shaped by gods and men, where mountains and sea collide. Meet Ancient Greece's famous figures and interact with them during a pivotal point in history that shaped western civilization.`,
        image: 'assassinCreedOdyssey.jpg',
        category: categories[2]._id,
      price: 25.99 
    },
    {
      name: `Mafia III (PS4)`,
      description:
        `Write your own legendary Odyssey and live epic adventures in a world where every choice matters. Sentenced to death by your family, embark on an epic journey from outcast mercenary to legendary Greek hero, and uncover the truth about your past. Forge your path through a war-torn world shaped by gods and men, where mountains and sea collide. Meet Ancient Greece's famous figures and interact with them during a pivotal point in history that shaped western civilization.`,
        image: 'mofia-III.jpg',
        category: categories[2]._id,
      price: 29.43 
    },
    {
      name: `Watch Dogs 2 (PS4)`,
      description:
        `Use hacking as a weapon in the massive & dynamic open world of Watch Dogs 2.
        Play as Marcus Holloway, a brilliant young hacker living in the birthplace of the tech revolution, the San Francisco Bay Area. Team up with Dedsec, a notorious group of hackers, and expose the hidden dangers of ctOS 2.0, which, in the hands of corrupt corporations, is being wrongfully used to monitor and manipulate citizens on a massive scale.`,
        image: 'watchDog2.jpg',
        category: categories[2]._id,
      price: 21.90 
    },
    {
      name: `Dark Souls 3 The Fire Fades (PS4)`,
      description:
        `DARK SOULS™ III – The Fire Fades™ Edition includes the full game & the Season Pass. Expand your experience with the Season Pass featuring new maps, bosses, enemies and additional weapon and armor sets.
        As fires fade and the world falls into ruin, journey once more into a universe filled with more colossal enemies and environments. Fans and newcomers alike will get lost in the games hallmark rewarding gameplay and immersive graphics. Now only embers remain…`,
        image: 'darkSouls3.jpg',
        category: categories[2]._id,
      price: 29.89 
    },
    {
      name: 'Sekiro Shadows Die Twice (PS4)',
      description:
        `Carve your own clever path to vengeance in an all-new adventure from developer FromSoftware, creators of Bloodborne and the Dark Souls series
        In Sekiro: Shadows Die Twice you are the “one-armed wolf”, a disgraced and disfigured warrior rescued from the brink of death. Bound to protect a young lord who is the descendant of an ancient bloodline, you become the target of many vicious enemies, including the dangerous Ashina clan. When the young lord is captured, nothing will stop you on a perilous quest to regain your honor, not even death itself.;Number of Players: 1 player; ESRB Content: Blood and gore|Violence; Genre: Action and Adventure
        Explore late 1500s Sengoku Japan, a brutal period of constant life and death conflict, as you come face to face with larger than life foes in a dark and twisted world. Unleash an arsenal of deadly prosthetic tools and powerful ninja abilities while you blend stealth, vertical traversal, and visceral head to head combat in a bloody confrontation.
        Take Revenge. Restore your honor. Kill Ingeniously.`,
      image: 'sekiro.jpg',
      category: categories[2]._id,
      price: 34.98 
    }
  ]);

  console.log('products seeded');

  process.exit();
});
