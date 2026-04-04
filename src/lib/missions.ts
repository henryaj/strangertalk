export interface Mission {
  id: string;
  name: string;
  instruction: string;
}

export const missions: Mission[] = [
  { id: 'al-fresco', name: 'Al Fresco', instruction: 'Find someone outdoors, and talk to them for a few minutes.' },
  { id: 'all-smiles', name: 'All Smiles', instruction: 'Find someone who seems friendly and talk to them for a few minutes.' },
  { id: 'artsy', name: 'Artsy', instruction: 'Find someone who looks artistic and talk to them for a few minutes.' },
  { id: 'blue-mood', name: 'Blue Mood', instruction: 'Find someone who looks sad and talk to them for a few minutes.' },
  { id: 'bossy-pants', name: 'Bossy Pants', instruction: 'Find someone who looks like a leader and talk to them for a few minutes.' },
  { id: 'caffeination-station', name: 'Caffeination Station', instruction: 'Find a barista or server and talk to them for a few minutes.' },
  { id: 'coffee-break', name: 'Coffee Break', instruction: "Find someone who's drinking a coffee and talk to them for a few minutes." },
  { id: 'do-gooder', name: 'Do Gooder', instruction: 'Find someone who seems like a nice or kind person and talk to them for a few minutes.' },
  { id: 'fashionista', name: 'Fashionista', instruction: "Find someone who's accessorizing (e.g., wearing a scarf, hat...) and talk to them for a few minutes." },
  { id: 'fun-fabric', name: 'Fun Fabric', instruction: 'Find someone wearing a stand-out print (e.g., stripes, animal-print) and talk to them for a few minutes.' },
  { id: 'graphic-tee', name: 'Graphic Tee', instruction: 'Find someone who is wearing an interesting shirt and talk to them for a few minutes.' },
  { id: 'hot', name: 'Hot', instruction: 'Find someone whom you find attractive and talk to them for a few minutes.' },
  { id: 'hungry', name: 'Hungry', instruction: "Find someone who's eating and talk to them for a few minutes." },
  { id: 'inked-up', name: 'Inked Up', instruction: 'Find someone who has a tattoo and talk to them for a few minutes.' },
  { id: 'inside', name: 'Inside', instruction: 'Find someone indoors and talk to them for a few minutes.' },
  { id: 'jock', name: 'Jock', instruction: 'Find someone sporty and talk to them for a few minutes.' },
  { id: 'kickin-it', name: "Kickin' It", instruction: 'Find someone who is wearing interesting shoes and talk to them for a few minutes.' },
  { id: 'line-up', name: 'Line Up', instruction: "Find someone who's waiting in a queue or line and talk to them for a few minutes." },
  { id: 'manscape', name: 'Manscape', instruction: 'Find someone who has a beard, goatee, or similar and talk to them for a few minutes.' },
  { id: 'minion', name: 'Minion', instruction: 'Find someone who is wearing a uniform and talk to them for a few minutes.' },
  { id: 'nailed-it', name: 'Nailed It', instruction: 'Find someone who has funky nails (e.g., unusual shade, fancy design) and talk to them for a few minutes.' },
  { id: 'next-gen', name: 'Next Gen', instruction: "Find someone who's from a different generation than you and talk to them for a few minutes." },
  { id: 'on-top', name: 'On Top', instruction: 'Find someone who is wearing a hat and talk to them for a few minutes.' },
  { id: 'ray-of-sunshine', name: 'Ray of Sunshine', instruction: 'Find someone who looks happy and talk to them for a few minutes.' },
  { id: 'sexy', name: 'Sexy', instruction: 'Find someone whose gender differs from yours and talk to them for a few minutes.' },
  { id: 'skin-deep', name: 'Skin Deep', instruction: 'Find someone whose skin tone is different from yours and talk to them for a few minutes.' },
  { id: 'twins', name: 'Twins', instruction: 'Find someone wearing the same thing as you (hair style, shirt, shoes, etc.) and talk to them for a few minutes.' },
  { id: 'unicorn', name: 'Unicorn', instruction: 'Find someone who has eye-catching hair (e.g., pink tips, dyed hair, or a cool hair style) and talk to them for a few minutes.' },
  { id: 'wild-card', name: 'Wild Card', instruction: 'Find anyone of your choosing and talk to them for a few minutes.' },
];
