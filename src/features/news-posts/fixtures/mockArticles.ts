import { toKebabCase } from '@/utils/format-text';
import { ArticleToDisplay } from '../types/ArticlesToDisplay';

export const mockPosts = [
  {
    _id: '1',
    author: 'Author 1',
    title: 'Title 1',
    subtitle: 'Subtitle 1',
    url: '/title-1',
    featured_image: '/image1.jpg',
    date: '2024-01-01',
    body: { raw: 'Content 1', html: 'Content 1' },
    type: 'Post',
    topics: ['News'],
    urlsegment: 'title-1',
    original_url: 'http://example.com/title-1',
    _raw: {},
  },
  {
    _id: '2',
    author: 'Author 2',
    title: 'Title 2',
    subtitle: 'Subtitle 2',
    url: '/title-2',
    featured_image: '/image2.jpg',
    date: '2024-01-02',
    body: { raw: 'Content 2', html: 'Content 2' },
    type: 'Post',
    topics: ['News'],
    urlsegment: 'title-2',
    original_url: 'http://example.com/title-2',
    _raw: {},
  },
];

export const mockArticles: ArticleToDisplay[] = [
  {
    id: 1,
    created_at: '2023-07-09T00:00:00.000Z',
    title: 'Title 1',
    subtitle: 'Subtitle 1',
    date: '2023-07-09',
    featured_image: '/images/whispers-and-wonders-shop.jpeg',
    topics: ['Reviews', 'test'],
    author: 'Author 1',
    body_raw:
      'In the bustling streets of Diagon Alley, amidst the magic and enchantment, a humble shop stood tucked away, unnoticed by many. "Whispers and Wonders" was its name, a haven for those seeking unique curiosities and rare magical artifacts.\n\nAt the heart of the shop was its proprietor, Mr. Edgar Whitlock. With a long white beard and twinkling eyes, he was a kind old man, well-versed in the secrets of the wizarding world. While he may not have been a central figure in the stories of Harry Potter, he had his own tale to tell.\n\nMr. Whitlock possessed a remarkable ability – he could hear the secrets that objects whispered. When a customer brought an item into his shop, he would hold it gently, closing his eyes as he listened to the faint murmurings. The objects would share their stories with him, tales of their origins and the lives they had touched.\n\nOne day, a young witch named Amelia stumbled upon "Whispers and Wonders" while exploring Diagon Alley. Intrigued by the cozy shop, she entered and was immediately captivated by the array of fascinating objects adorning the shelves.\n\nAs Amelia browsed, her gaze fell upon an ornate silver locket. Mr. Whitlock, sensing her curiosity, handed her the locket with a knowing smile. As she held it, Amelia felt a surge of warmth and heard the soft whispers of love and longing embedded within.\n\nWith every object she encountered, Amelia uncovered stories of joy, heartbreak, and resilience. Each item had witnessed extraordinary moments and held the essence of those who had possessed them. It was a testament to the rich tapestry of human experiences, both magical and mundane.\n\nDeeply moved by the tales whispered to her by the objects, Amelia felt a newfound appreciation for the connections that bind us all. She left "Whispers and Wonders" with a heart full of wonder and a determination to cherish the stories hidden within everyday objects.\n\nAnd so, the unassuming Mr. Edgar Whitlock continued to run his shop, listening to the whispers of the objects, sharing their tales with those who were willing to listen. In a world of epic battles and extraordinary adventures, his quiet presence served as a reminder that even the smallest stories have the power to touch hearts and ignite imaginations.\n\n_This is an article generated with [ChatGPT](https://chat.openai.com/). Image generated with [Bing Image Creator](https://www.bing.com/create)._',
    urlsegment: 'title-1',
    original_url: '',
    generated_ai_content:
      "In the bustling streets of Diagon Alley, amidst the magic and enchantment, a humble shop stood tucked away, unnoticed by many. 'Whispers and Wonders' was its name, a haven for those seeking unique curiosities and rare magical artifacts. The shop was a treasure trove of wonders, filled with items that held secrets and stories waiting to be discovered. At the heart of the shop was its proprietor, Mr. Edgar Whitlock. With a long white beard and twinkling eyes, he was a kind old man, well-versed in the secrets of the wizarding world. While he may not have been a central figure in the stories of Harry Potter, he had his own tale to tell. Mr. Whitlock possessed a remarkable ability – he could hear the secrets that objects whispered. When a customer brought an item into his shop, he would hold it gently, closing his eyes as he listened to the faint murmurings. The objects would share their stories with him, tales of their origins and the lives they had touched. One day, a young witch named Amelia stumbled upon 'Whispers and Wonders' while exploring Diagon Alley. Intrigued by the cozy shop, she entered and was immediately captivated by the array of fascinating objects adorning the shelves. As Amelia browsed, her gaze fell upon an ornate silver locket. Mr. Whitlock, sensing her curiosity, handed her the locket with a knowing smile. As she held it, Amelia felt a surge of warmth and heard the soft whispers of love and longing embedded within. With every object she encountered, Amelia uncovered stories of joy, heartbreak, and resilience. Each item had witnessed extraordinary moments and held the essence of those who had possessed them. It was a testament to the rich tapestry of human experiences, both magical and mundane. Deeply moved by the tales whispered to her by the objects, Amelia felt a newfound appreciation for the connections that bind us all. She left 'Whispers and Wonders' with a heart full of wonder and a determination to cherish the stories hidden within everyday objects. And so, the unassuming Mr. Edgar Whitlock continued to run his shop, listening to the whispers of the objects, sharing their tales with those who were willing to listen. In a world of epic battles and extraordinary adventures, his quiet presence served as a reminder that even the smallest stories have the power to touch hearts and ignite imaginations. The shop became a sanctuary for those seeking solace and a deeper understanding of the world around them. It was a place where the past and present intertwined, where the mundane became magical, and where every object had a story to tell.",
    questions_and_answers: [
      {
        question: 'What is the name of the shop?',
        answer: 'Whispers and Wonders',
      },
      {
        question: 'Who is the proprietor of the shop?',
        answer: 'Mr. Edgar Whitlock',
      },
    ],
  },
  {
    id: 2,
    created_at: 'January 1, 2024',
    title: 'Title 2',
    subtitle: 'Subtitle 2',
    date: '2023-08-10',
    featured_image: '/images/secret-garden.jpeg',
    topics: ['Nature', 'test'],
    author: 'NSt Writer',
    body_raw:
      "In a quiet corner of Hogwarts Castle, nestled behind a concealed door, lay a hidden gem known as the Secret Garden. This is the tale of the garden and the enchantment it bestowed upon those who discovered its secluded beauty.\n\n## The Whispers of Nature\n\nThe Secret Garden, with its lush foliage and vibrant blooms, remained a secret known only to a select few. It beckoned to those with an affinity for nature, whispering promises of tranquility and connection.\n\n## A Curious Encounter\n\nOne day, as Luna Lovegood wandered the corridors of Hogwarts, her dreamy eyes caught sight of a peculiar door. Drawn by an inexplicable curiosity, she opened it, revealing the hidden oasis that lay beyond.\n\n## Nature's Serenade\n\nAs Luna stepped into the Secret Garden, a symphony of melodies filled the air. The soft rustle of leaves, the delicate chirping of birds, and the gentle babbling of a nearby stream blended harmoniously, enveloping her in a chorus of natural wonders.\n\n## The Magic of Blossoms\n\nWithin the garden, Luna discovered an abundance of magical flowers, each with its own unique power. Some blossoms granted visions of the past, while others imbued the beholder with an overwhelming sense of joy and serenity.\n\n## The Language of Plants\n\nLuna realized that the Secret Garden was not merely a place of beauty, but a realm where nature communicated in its own language. She learned to interpret the whispers of the flowers, understanding their needs and tending to them with care.\n\n## Sharing the Magic\n\nOver time, Luna invited kindred spirits to experience the enchantment of the Secret Garden. Together, they reveled in the delicate dance of petals, formed unbreakable bonds with the garden's inhabitants, and learned to harmonize with the rhythms of nature.\n\n## A Timeless Haven\n\nAs the years passed, the Secret Garden became a sanctuary for students seeking solace and rejuvenation. It stood as a testament to the enduring magic of the natural world, reminding all who entered that even within the confines of stone walls, the beauty and serenity of the outdoors could be found.\n\n_And so, the Secret Garden's story continues to unfold, its subtle magic hidden within the hearts of those who embraced its whispers. It remains a cherished haven, a testament to the wondrous bond between wizards and the enchanting realms of nature._\n\n_This is an article generated with [ChatGPT](https://chat.openai.com/). Image generated with [Bing Image Creator](https://www.bing.com/create)._",
    urlsegment: toKebabCase('The Secret Garden'),
    original_url: '',
    generated_ai_content:
      "In a quiet corner of Hogwarts Castle, nestled behind a concealed door, lay a hidden gem known as the Secret Garden. This is the tale of the garden and the enchantment it bestowed upon those who discovered its secluded beauty. The Secret Garden, with its lush foliage and vibrant blooms, remained a secret known only to a select few. It beckoned to those with an affinity for nature, whispering promises of tranquility and connection. One day, as Luna Lovegood wandered the corridors of Hogwarts, her dreamy eyes caught sight of a peculiar door. Drawn by an inexplicable curiosity, she opened it, revealing the hidden oasis that lay beyond. As Luna stepped into the Secret Garden, a symphony of melodies filled the air. The soft rustle of leaves, the delicate chirping of birds, and the gentle babbling of a nearby stream blended harmoniously, enveloping her in a chorus of natural wonders. Within the garden, Luna discovered an abundance of magical flowers, each with its own unique power. Some blossoms granted visions of the past, while others imbued the beholder with an overwhelming sense of joy and serenity. Luna realized that the Secret Garden was not merely a place of beauty, but a realm where nature communicated in its own language. She learned to interpret the whispers of the flowers, understanding their needs and tending to them with care. Over time, Luna invited kindred spirits to experience the enchantment of the Secret Garden. Together, they reveled in the delicate dance of petals, formed unbreakable bonds with the garden's inhabitants, and learned to harmonize with the rhythms of nature. As the years passed, the Secret Garden became a sanctuary for students seeking solace and rejuvenation. It stood as a testament to the enduring magic of the natural world, reminding all who entered that even within the confines of stone walls, the beauty and serenity of the outdoors could be found. And so, the Secret Garden's story continues to unfold, its subtle magic hidden within the hearts of those who embraced its whispers. It remains a cherished haven, a testament to the wondrous bond between wizards and the enchanting realms of nature.",
    questions_and_answers: [
      {
        question: 'What is the name of the garden?',
        answer: 'The Secret Garden',
      },
      {
        question: 'Who discovered the garden?',
        answer: 'Luna Lovegood',
      },
    ],
  },
  {
    id: 3,
    created_at: '2023-09-15T00:00:00.000Z',
    title: 'Title 3',
    subtitle: 'Subtitle 3',
    date: '2023-09-15',
    featured_image: '/images/painted-portal.jpeg',
    topics: ['Art', 'Magic'],
    author: 'NSt Writer',
    body_raw:
      'In the quiet town of Ottery St. Catchpole, there stood an unassuming art gallery known as **Whispering Canvas**. It held a secret within its walls, a subtle tale waiting to be discovered.\n\nThe centerpiece of the gallery was a mesmerizing painting called **_"The Painted Portal."_** It depicted a serene countryside scene with rolling hills, vibrant flowers, and a shimmering river. But there was something more to this artwork than met the eye.\n\nWhispers spread among art enthusiasts about the painting\'s mysterious power—a hidden portal that transported those who truly believed into the world captured on the canvas.\n\nOne day, a young aspiring artist named Emily stepped into **Whispering Canvas**. Drawn to the captivating allure of **_"The Painted Portal,"_** she couldn\'t resist the urge to explore the painting\'s secrets.\n\nWith wide-eyed curiosity, Emily reached out and touched the canvas. As her fingers made contact, a gentle breeze tickled her skin, and before she knew it, she found herself standing amidst the very landscape she had admired.\n\nThe colors seemed more vibrant, the scents more fragrant, and the sounds more alive. Emily wandered through the painted world, her senses overwhelmed by the beauty that surrounded her.\n\nBut she soon discovered that the magic of the painting was not limited to its aesthetics. Within this painted realm, she encountered characters brought to life from her own imagination—heroes and villains, mythical creatures, and ordinary people with extraordinary stories.\n\nEmily became a part of their adventures, joining them on quests, witnessing their triumphs and tribulations, and learning profound lessons along the way. The painted world became her refuge, a place where her artistic visions came to life in ways she never thought possible.\n\nAs time passed, Emily began to understand that the magic of **_"The Painted Portal"_** was not confined to the physical canvas alone. It had awakened her own creative powers, igniting a passion for art and storytelling within her.\n\nShe returned to the real world, carrying the inspiration and wisdom she gained from her painted journeys. The gallery visitors, unknowing of the painting\'s true magic, marveled at the emotions and stories that Emily\'s subsequent artwork conveyed.\n\n**_"The Painted Portal"_** remained a secret known only to those who believed. It continued to captivate the hearts and minds of those who dared to imagine beyond the confines of the canvas.\n\nAnd so, **Whispering Canvas** stood as a haven for dreamers and artists, its hidden tale echoing through the strokes of paint and the imaginations it sparked. It whispered to all who entered, reminding them that art has the power to transport us to worlds unseen, awakening the magic within our own souls.\n\n_This is an article generated with [ChatGPT](https://chat.openai.com/). Image generated with [Bing Image Creator](https://www.bing.com/create)._',
    urlsegment: toKebabCase('The Painted Portal'),
    original_url: '',
    generated_ai_content:
      "In the quiet town of Ottery St. Catchpole, there stood an unassuming art gallery known as Whispering Canvas. It held a secret within its walls, a subtle tale waiting to be discovered. The centerpiece of the gallery was a mesmerizing painting called The Painted Portal. It depicted a serene countryside scene with rolling hills, vibrant flowers, and a shimmering river. But there was something more to this artwork than met the eye. Whispers spread among art enthusiasts about the painting's mysterious power—a hidden portal that transported those who truly believed into the world captured on the canvas. One day, a young aspiring artist named Emily stepped into Whispering Canvas. Drawn to the captivating allure of The Painted Portal, she couldn't resist the urge to explore the painting's secrets. With wide-eyed curiosity, Emily reached out and touched the canvas. As her fingers made contact, a gentle breeze tickled her skin, and before she knew it, she found herself standing amidst the very landscape she had admired. The colors seemed more vibrant, the scents more fragrant, and the sounds more alive. Emily wandered through the painted world, her senses overwhelmed by the beauty that surrounded her. But she soon discovered that the magic of the painting was not limited to its aesthetics. Within this painted realm, she encountered characters brought to life from her own imagination—heroes and villains, mythical creatures, and ordinary people with extraordinary stories. Emily became a part of their adventures, joining them on quests, witnessing their triumphs and tribulations, and learning profound lessons along the way. The painted world became her refuge, a place where her artistic visions came to life in ways she never thought possible. As time passed, Emily began to understand that the magic of The Painted Portal was not confined to the physical canvas alone. It had awakened her own creative powers, igniting a passion for art and storytelling within her. She returned to the real world, carrying the inspiration and wisdom she gained from her painted journeys. The gallery visitors, unknowing of the painting's true magic, marveled at the emotions and stories that Emily's subsequent artwork conveyed. The Painted Portal remained a secret known only to those who believed. It continued to captivate the hearts and minds of those who dared to imagine beyond the confines of the canvas. And so, Whispering Canvas stood as a haven for dreamers and artists, its hidden tale echoing through the strokes of paint and the imaginations it sparked. It whispered to all who entered, reminding them that art has the power to transport us to worlds unseen, awakening the magic within our own souls.",
    questions_and_answers: [
      {
        question: 'What is the name of the painting?',
        answer: 'The Painted Portal',
      },
      {
        question: "Who discovered the painting's secret?",
        answer: 'Emily',
      },
    ],
  },
];
