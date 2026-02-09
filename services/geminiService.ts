import { ChocolateCreation, GeneratedContent } from "../src/types";

// --- Sample Data Library ---

const POEMS = [
    "Though miles may lie between us two,\nMy heart beats only just for you.\nThis chocolate holds a secret kiss,\nTo fill your day with endless bliss.",
    "Across the map, my love flies free,\nA sweet embrace from you to me.\nClose your eyes and take a bite,\nI'm dreaming of you every night.",
    "Distance is just a test to show,\nHow far our love can really go.\nSweet as sugar, strong as gold,\nYou're the one I want to hold.",
    "No matter where you are today,\nMy love for you will find a way.\nThrough every mile and every space,\nI long to see your lovely face."
];

const NAMING_PATTERNS = [
    (c: ChocolateCreation) => `The ${c.base.name.split(' ')[0]} ${c.filling.name.split(' ')[0]} Dream`,
    (c: ChocolateCreation) => `${c.partnerName}'s ${c.topping.name.split(' ')[0]} Delight`,
    (c: ChocolateCreation) => `The ${c.senderName} & ${c.partnerName} Special`,
    (c: ChocolateCreation) => `Midnight ${c.filling.name} Serenade`,
    (c: ChocolateCreation) => `The Distant ${c.base.name.split(' ')[0]} Embrace`,
    (c: ChocolateCreation) => `${c.topping.name} Love Letter`
];

const DESCRIPTION_TEMPLATES = [
    (c: ChocolateCreation) => `A masterpiece beginning with ${c.base.description.toLowerCase()} It hides a core of ${c.filling.description.toLowerCase()} Finally, it is crowned with ${c.topping.name.toLowerCase()} to represent ${c.topping.meaning}.`,
    (c: ChocolateCreation) => `Crafted specifically for ${c.partnerName}, this chocolate merges the ${c.base.name} with ${c.filling.name}. It symbolizes ${c.base.meaning} and ${c.filling.meaning}, finished with a touch of ${c.topping.name}.`,
    (c: ChocolateCreation) => `An edible love letter. The ${c.base.name} brings the comfort, while the ${c.filling.name} adds the spark. Topped with ${c.topping.name} because ${c.topping.meaning}.`,
    (c: ChocolateCreation) => `A complex flavor profile for a complex love. ${c.base.name} meets ${c.filling.name} in a dance of flavors, accented by ${c.topping.name} to remind you of ${c.senderName}.`
];

const NOTES_BY_TOPIC: Record<string, string[]> = {
    'why I love you': [
        "I love you because you make me laugh even when I'm miles away.",
        "Your voice is my favorite sound in the world.",
        "I love how you support my dreams from afar.",
        "You are the most beautiful part of my every day.",
        "I love you for your kindness and your warm heart.",
        "I love the way you understand me without words.",
        "You are my home, no matter where I am."
    ],
    'our future together': [
        "One day, we won't have to say goodbye, only goodnight.",
        "I'm building a future where every morning starts with you.",
        "Our reunion will be the sweetest chapter of our lives.",
        "I can't wait to travel the world with you by my side.",
        "Every day apart is just one day closer to forever.",
        "I see us growing old and happy together.",
        "Soon, the distance will just be a memory."
    ],
    'a promise for when we meet': [
        "I promise to hold you and never let go for the first hour.",
        "I promise to take you to that place we always talk about.",
        "I promise the biggest hug you've ever felt.",
        "I promise to make you breakfast in bed.",
        "I promise to look into your eyes and tell you I love you.",
        "I promise to make up for every second we missed."
    ],
    'a sweet compliment': [
        "You look absolutely stunning today.",
        "Your smile lights up my entire world.",
        "You are smarter and stronger than you know.",
        "You have the most beautiful soul I've ever known.",
        "You are simply perfect to me.",
        "You radiate kindness and beauty.",
        "There is no one else like you."
    ],
    'a spicy thought': [
        "I had a dream about you last night... I'll tell you later.",
        "Missing your touch more than usual today.",
        "I can't wait to feel your skin against mine.",
        "You look incredible in that photo you sent.",
        "Thinking about our last kiss...",
        "I wish you were in this bed with me right now."
    ],
    'a hug sent from afar': [
        "Sending you a giant bear hug right now!",
        "Wrap your arms around yourself and squeeze - that's from me.",
        "Imagine me holding you tight.",
        "A warm, fuzzy hug just for you.",
        "If I could fly to you for just one hug, I would.",
        "Feel my arms around you, keeping you safe."
    ]
};

// --- Service Functions ---

export const generateChocolateProfile = async (creation: ChocolateCreation): Promise<GeneratedContent> => {
    // Simulate "thinking" delay for the UI effect
    await new Promise(resolve => setTimeout(resolve, 2000));

    const nameGen = NAMING_PATTERNS[Math.floor(Math.random() * NAMING_PATTERNS.length)];
    const descGen = DESCRIPTION_TEMPLATES[Math.floor(Math.random() * DESCRIPTION_TEMPLATES.length)];
    const poem = POEMS[Math.floor(Math.random() * POEMS.length)];

    return {
        name: nameGen(creation),
        description: descGen(creation),
        poem: poem
    };
};

export const generateSweetNote = async (partnerName: string, topic: string): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const messages = NOTES_BY_TOPIC[topic] || NOTES_BY_TOPIC['why I love you'];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    // Occasionally personalize with name
    if (Math.random() > 0.7) {
        return `${partnerName}, ${randomMsg.charAt(0).toLowerCase() + randomMsg.slice(1)}`;
    }
    return randomMsg;
};
