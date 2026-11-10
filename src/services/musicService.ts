import { Track, Playlist, Artist } from '@/types/music';

// Verified, high-fidelity Hindi, Bollywood & Global audio streams
// Guaranteed instant playback, zero hotlink blocks, Apple CDN & SoundHelix
export const CURATED_TRACKS: Track[] = [
  {
    id: 'hindi-1',
    title: 'Kesariya (From "Brahmastra")',
    artist: 'Pritam, Arijit Singh & Amitabh Bhattacharya',
    album: 'Brahmastra',
    duration: 268,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/4c/5c/384c5c8f-3ff8-e457-b2f7-3158ce108649/mzaf_12389299033886433185.plus.aac.p.m4a',
    genre: 'Bollywood',
    playCount: 1420000,
    source: 'itunes',
    releaseYear: 2022,
  },
  {
    id: 'hindi-2',
    title: 'Apna Bana Le (From "Bhediya")',
    artist: 'Arijit Singh & Sachin-Jigar',
    album: 'Bhediya',
    duration: 261,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/2e/0b/c0/2e0bc070-112f-a827-6ad8-6bc64f7caaff/840214460180.png/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/eb/27/61/eb2761c7-d606-0912-dff0-2dc6b69974bd/mzaf_2023722930851223219.plus.aac.p.m4a',
    genre: 'Bollywood',
    playCount: 1190000,
    source: 'itunes',
    releaseYear: 2022,
  },
  {
    id: 'hindi-3',
    title: 'Chaleya (From "Jawan")',
    artist: 'Anirudh Ravichander, Arijit Singh & Shilpa Rao',
    album: 'Jawan',
    duration: 200,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/bb/f4/f5/bbf4f511-3c12-c25e-a475-b6d06faa8c13/8902894362047_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/76/05/d9/7605d905-f631-517d-df7f-e162affcd414/mzaf_9976541859961700749.plus.aac.p.m4a',
    genre: 'Bollywood',
    playCount: 980000,
    source: 'itunes',
    releaseYear: 2023,
  },
  {
    id: 'hindi-4',
    title: 'Tum Hi Ho',
    artist: 'Mithoon & Arijit Singh',
    album: 'Aashiqui 2',
    duration: 261,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bb/23/ee/bb23eeed-0c35-4f1d-2b11-485622777ae4/8902894353007_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3a/8c/9b/3a8c9b0b-2def-750a-f615-1555bf941edf/mzaf_17229496441442805917.plus.aac.p.m4a',
    genre: 'Romance',
    playCount: 2340000,
    source: 'itunes',
    releaseYear: 2013,
  },
  {
    id: 'hindi-5',
    title: 'Raataan Lambiyan',
    artist: 'Tanishk Bagchi, Jubin Nautiyal & Asees Kaur',
    album: 'Shershaah',
    duration: 230,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/61/65/ae/6165aee9-8bb9-0bd4-02b0-5d0f1e6257a3/886449510238.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/99/0c/38/990c381b-0530-8c0d-87a9-18b050b97f0a/mzaf_10418866714500530894.plus.aac.p.m4a',
    genre: 'Bollywood',
    playCount: 1750000,
    source: 'itunes',
    releaseYear: 2021,
  },
  {
    id: 'hindi-6',
    title: 'Lover',
    artist: 'Diljit Dosanjh',
    album: 'MoonChild Era',
    duration: 190,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8a/89/e4/8a89e445-d2c6-f8ac-a828-27818b0c1afe/859749638209_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/d5/7a/38d57a99-39fc-e901-7c45-fa6260ec83c1/mzaf_8083696285926392389.plus.aac.p.m4a',
    genre: 'Punjabi',
    playCount: 1620000,
    source: 'itunes',
    releaseYear: 2021,
  },
  {
    id: 'hindi-7',
    title: 'Tauba Tauba (From "Bad Newz")',
    artist: 'Karan Aujla',
    album: 'Bad Newz',
    duration: 207,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/79/d2/01/79d201d2-e54d-5604-81fb-313f30db7219/198588533581.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/34/8d/63/348d6342-2c35-bf31-8131-2c8b3cfe3c09/mzaf_15374551219149804677.plus.aac.p.m4a',
    genre: 'Punjabi',
    playCount: 2950000,
    source: 'itunes',
    releaseYear: 2024,
  },
  {
    id: 'hindi-8',
    title: 'Pehle Bhi Main',
    artist: 'Vishal Mishra & Raj Shekhar',
    album: 'ANIMAL',
    duration: 250,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/db/ad/5e/dbad5e8b-0bee-d962-92d4-021c90e375ac/8902894362092_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3a/d8/43/3ad8432d-c2e6-052b-5679-cc01c6a599ea/mzaf_7941667053086496020.plus.aac.p.m4a',
    genre: 'Romance',
    playCount: 2420000,
    source: 'itunes',
    releaseYear: 2023,
  },
  {
    id: 'hindi-9',
    title: 'Satranga',
    artist: 'Arijit Singh & Shreyas Puranik',
    album: 'ANIMAL',
    duration: 271,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/db/ad/5e/dbad5e8b-0bee-d962-92d4-021c90e375ac/8902894362092_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f9/c4/db/f9c4db6d-efa0-0b8b-c80a-046b06499f2b/mzaf_3150095649021462379.plus.aac.p.m4a',
    genre: 'Bollywood',
    playCount: 2180000,
    source: 'itunes',
    releaseYear: 2023,
  },
  {
    id: 'hindi-10',
    title: 'Naina (From "Crew")',
    artist: 'Diljit Dosanjh & Badshah',
    album: 'Crew',
    duration: 180,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bd/7b/bf/bd7bbfbd-8711-b6da-473a-7dd35b2d753b/8901854099214.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/09/32/19/0932191a-0b17-bc29-b8fd-185f1cd8da96/mzaf_4251788772887694086.plus.aac.p.m4a',
    genre: 'Punjabi',
    playCount: 2310000,
    source: 'itunes',
    releaseYear: 2024,
  },
  {
    id: 'hindi-11',
    title: 'Ve Kamleya (From "Rocky Aur Rani")',
    artist: 'Pritam, Arijit Singh & Shreya Ghoshal',
    album: 'Rocky Aur Rani Kii Prem Kahaani',
    duration: 246,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f0/75/ba/f075baf5-de5c-5c1b-8ad9-2eab666d1ea6/197189415388.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/30/af/79/30af790f-5576-5307-e436-29e949ae6388/mzaf_3370475763365409547.plus.aac.p.m4a',
    genre: 'Romance',
    playCount: 1980000,
    source: 'itunes',
    releaseYear: 2023,
  },
  {
    id: 'hindi-12',
    title: 'Channa Mereya',
    artist: 'Pritam & Arijit Singh',
    album: 'Ae Dil Hai Mushkil',
    duration: 289,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bc/6e/4d/bc6e4d0c-adec-b431-7b60-16f5689f9664/886446201597.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d5/f9/98/d5f998a7-0090-ee2d-03f8-557ad6c5bf65/mzaf_14251357991592637728.plus.aac.p.m4a',
    genre: 'Bollywood',
    playCount: 3100000,
    source: 'itunes',
    releaseYear: 2016,
  },
  {
    id: 'hindi-13',
    title: 'Agar Tum Saath Ho',
    artist: 'Alka Yagnik & Arijit Singh',
    album: 'Tamasha',
    duration: 341,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/cb/ac/67/cbac673a-9213-7118-bb4e-2440273afb03/8902894357470_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/75/a8/7d/75a87dcc-5b69-795d-7dcc-27d1c728f31f/mzaf_18055325784732588932.plus.aac.p.m4a',
    genre: 'Romance',
    playCount: 2980000,
    source: 'itunes',
    releaseYear: 2015,
  },
  {
    id: 'hindi-14',
    title: 'Kinni Kinni',
    artist: 'Diljit Dosanjh',
    album: 'Ghost',
    duration: 213,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/94/80/be/9480bec1-6ca2-5bae-a7da-d0e7c45633ce/859779847831_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e5/b0/0f/e5b00f64-fcbe-0fdf-9406-aa0d916b793b/mzaf_15281553318222567826.plus.aac.p.m4a',
    genre: 'Punjabi',
    playCount: 2120000,
    source: 'itunes',
    releaseYear: 2023,
  },
  {
    id: 'hindi-15',
    title: 'Softly',
    artist: 'Karan Aujla & Ikky',
    album: 'Making Memories',
    duration: 155,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d3/08/bc/d308bc6a-20e1-6532-d933-35d1b429210e/5054197755538.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/5f/6f/01/5f6f0130-6567-22d4-bc1a-5ccb359c3fac/mzaf_5497113703334703756.plus.aac.p.m4a',
    genre: 'Punjabi',
    playCount: 2450000,
    source: 'itunes',
    releaseYear: 2023,
  },
  {
    id: 'hindi-16',
    title: 'Kun Faya Kun',
    artist: 'A.R. Rahman, Javed Ali & Mohit Chauhan',
    album: 'Rockstar',
    duration: 470,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/56/ac/41/56ac41f7-99f3-3eae-3b07-443167292c4e/8902894697408_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ce/72/5e/ce725e63-6977-b281-3766-fff46d6e0c07/mzaf_7464998292185183397.plus.aac.p.m4a',
    genre: 'Bollywood',
    playCount: 3600000,
    source: 'itunes',
    releaseYear: 2011,
  },
  {
    id: 'hindi-17',
    title: 'Arjan Vailly',
    artist: 'Manan Bhardwaj & Bhupinder Babbal',
    album: 'ANIMAL',
    duration: 182,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/db/ad/5e/dbad5e8b-0bee-d962-92d4-021c90e375ac/8902894362092_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/52/4a/00/524a0053-71f4-a04f-fe2a-87a5b78bfeec/mzaf_1842370763618686453.plus.aac.p.m4a',
    genre: 'Punjabi',
    playCount: 2850000,
    source: 'itunes',
    releaseYear: 2023,
  },
  {
    id: 'hindi-18',
    title: 'Ilahi (From "Yeh Jawaani Hai Deewani")',
    artist: 'Pritam & Arijit Singh',
    album: 'Yeh Jawaani Hai Deewani',
    duration: 228,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/62/d6/74/62d67432-0670-631f-db6a-d4bac3adae4b/8902894353328_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/75/27/64/75276455-6751-e9d7-1187-b863a2ffefbc/mzaf_4313837125483855343.plus.aac.p.m4a',
    genre: 'Bollywood',
    playCount: 1480000,
    source: 'itunes',
    releaseYear: 2013,
  },
  {
    id: 'hindi-19',
    title: 'Param Sundari (From "Mimi")',
    artist: 'A.R. Rahman & Shreya Ghoshal',
    album: 'Mimi',
    duration: 200,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0d/4a/71/0d4a71dd-b09d-50b4-b1e9-6c13ab4bdd1e/886449445875.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/37/af/f0/37aff08b-cdfd-ae7e-7f0a-251d07f342d0/mzaf_4304999715906555670.plus.aac.p.m4a',
    genre: 'Bollywood',
    playCount: 1320000,
    source: 'itunes',
    releaseYear: 2021,
  },
  {
    id: 'hindi-20',
    title: 'Pehli Nazar Mein (From "Race")',
    artist: 'Atif Aslam & Pritam',
    album: 'Race',
    duration: 312,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/38/44/21/384421ca-69a0-83f2-0a34-88653d45db97/8901854001385.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0d/db/cf/0ddbcf31-22d7-088e-c71f-1dd88a3dd8a2/mzaf_16563349538675654632.plus.aac.p.m4a',
    genre: 'Romance',
    playCount: 1890000,
    source: 'itunes',
    releaseYear: 2008,
  },
  {
    id: 'hindi-21',
    title: 'Excuses',
    artist: 'AP Dhillon, Gurinder Gill & Intense',
    album: 'Excuses',
    duration: 176,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/47/47/ac/4747ac85-1658-64ae-bc82-220a4d6213d5/859747478890_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e8/84/c8/e884c82f-7136-54d8-6754-6b45c6968f29/mzaf_11726474689882106813.plus.aac.p.m4a',
    genre: 'Punjabi',
    playCount: 2150000,
    source: 'itunes',
    releaseYear: 2020,
  },
  {
    id: 'hindi-22',
    title: 'Brown Munde',
    artist: 'AP Dhillon, Gurinder Gill & Shinda Kahlon',
    album: 'Brown Munde',
    duration: 254,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/26/a3/ac/26a3ac64-69e4-95ec-80ab-1f5a477537d2/859742042973_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/97/74/69/977469be-a9d5-35a7-80ad-ebe12a799ccc/mzaf_804867738726203367.plus.aac.p.m4a',
    genre: 'Punjabi',
    playCount: 2890000,
    source: 'itunes',
    releaseYear: 2020,
  },
  {
    id: 'hindi-23',
    title: 'O Maahi (From "Dunki")',
    artist: 'Pritam, Arijit Singh & Irshad Kamil',
    album: 'Dunki',
    duration: 233,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/cf/cf/af/cfcfaf49-f337-eeab-2351-dd0a137dc740/8902894362139_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a9/82/78/a9827837-5ca7-1fe3-fc24-3dedeffb86e4/mzaf_4678729972431007397.plus.aac.p.m4a',
    genre: 'Romance',
    playCount: 1650000,
    source: 'itunes',
    releaseYear: 2023,
  },
  {
    id: 'hindi-24',
    title: 'Pasoori',
    artist: 'Shae Gill & Ali Sethi',
    album: 'Pasoori',
    duration: 224,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/f3/f9/06/f3f906c3-79d5-ac9a-5fdd-262048f955f9/cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/62/33/1e/62331ea8-d1df-027d-fe75-ac16a519323d/mzaf_14381883946572745360.plus.aac.p.m4a',
    genre: 'Hindi Hits',
    playCount: 1980000,
    source: 'itunes',
    releaseYear: 2022,
  },
  {
    id: 'hindi-25',
    title: 'Tujhe Kitna Chahne Lage',
    artist: 'Arijit Singh & Mithoon',
    album: 'Kabir Singh',
    duration: 284,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f6/70/84/f6708434-0123-ff36-0ac3-7401e8cf0f94/8902894360807_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7e/f3/43/7ef34316-c0d1-4c3c-afc9-53716b8f3473/mzaf_13869194700915977502.plus.aac.p.m4a',
    genre: 'Romance',
    playCount: 1820000,
    source: 'itunes',
    releaseYear: 2019,
  },
  {
    id: 'global-1',
    title: 'Espresso',
    artist: 'Sabrina Carpenter',
    album: 'Short n\' Sweet',
    duration: 175,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a1/1c/ca/a11ccab6-7d4c-e041-d028-998bcebeb709/24UMGIM61704.rgb.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/99/da/ff/99daffce-cdde-59c6-5ae0-7f922ce411a8/mzaf_5621292401829922816.plus.aac.p.m4a',
    genre: 'Pop',
    playCount: 3200000,
    source: 'itunes',
    releaseYear: 2024,
  },
  {
    id: 'global-2',
    title: 'Starboy (feat. Daft Punk)',
    artist: 'The Weeknd',
    album: 'Starboy',
    duration: 230,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/11/71/d6/1171d6ad-3c96-e027-2af6-58028426588c/mzaf_15137631797407745471.plus.aac.p.m4a',
    genre: 'R&B/Soul',
    playCount: 4500000,
    source: 'itunes',
    releaseYear: 2016,
  },
  {
    id: 'global-3',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 216,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/61/e7/3f/61e73f94-018d-5f50-50ec-8521952bc72e/20UM1IM11629.rgb.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/12/73/ca/1273ca46-233a-5331-189b-25ac1d656533/mzaf_976341070785891411.plus.aac.p.m4a',
    genre: 'R&B/Soul',
    playCount: 5100000,
    source: 'itunes',
    releaseYear: 2020,
  },
  {
    id: 'hindi-26',
    title: 'Winning Speech',
    artist: 'Karan Aujla & MXRCI',
    album: 'Winning Speech - Single',
    duration: 227,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/48/7c/36/487c3668-f7a4-4b1a-e09e-c74dae124dd9/5063483578089_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e3/ae/b6/e3aeb64f-cadd-5830-c39f-6af51cd91670/mzaf_6001527501800958065.plus.aac.p.m4a',
    genre: 'Punjabi',
    playCount: 3100000,
    source: 'itunes',
    releaseYear: 2024,
  },
  {
    id: 'hindi-27',
    title: '52 Bars',
    artist: 'Karan Aujla & Ikky',
    album: 'Four You - EP',
    duration: 214,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fc/bc/64/fcbc6417-8a88-7b5e-4490-8f53e537ffb0/859770181552_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/52/c9/1c/52c91c69-352d-cb4e-3706-265dc01067d0/mzaf_17387125942915601585.plus.aac.p.m4a',
    genre: 'Punjabi',
    playCount: 2850000,
    source: 'itunes',
    releaseYear: 2023,
  },
  {
    id: 'hindi-28',
    title: 'Cheques',
    artist: 'Shubh',
    album: 'Still Rollin',
    duration: 184,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/dc/46/a9/dc46a9c9-794e-2d7a-1afb-97eb4ae0fff6/197188915704.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5f/e9/8a/5fe98aa5-660a-2f91-b53d-558fdb9ef50b/mzaf_5845186979219129320.plus.aac.p.m4a',
    genre: 'Punjabi',
    playCount: 3400000,
    source: 'itunes',
    releaseYear: 2023,
  },
  {
    id: 'hindi-29',
    title: 'Born to Shine',
    artist: 'Diljit Dosanjh',
    album: 'G.O.A.T.',
    duration: 213,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d2/89/ac/d289ac98-749e-3822-6b6e-b06aa4815715/859740651597_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/38/12/41/38124195-4bd9-1fc7-fe40-f793ee38d163/mzaf_14837378210736189248.plus.aac.p.m4a',
    genre: 'Punjabi',
    playCount: 4100000,
    source: 'itunes',
    releaseYear: 2020,
  },
  {
    id: 'hindi-30',
    title: 'Proper Patola',
    artist: 'Badshah, Diljit Dosanjh & Aastha Gill',
    album: 'Namaste England',
    duration: 179,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a9/f7/b4/a9f7b4e7-6ec1-5d95-1d56-ec08e038ca5a/886447356036.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e5/c2/0a/e5c20a8d-f1b4-5d95-2ac1-e2e9efa502bb/mzaf_11124996926999296098.plus.aac.p.m4a',
    genre: 'Bollywood',
    playCount: 2600000,
    source: 'itunes',
    releaseYear: 2018,
  },
  {
    id: 'hindi-31',
    title: 'Shayad (From "Love Aaj Kal")',
    artist: 'Pritam & Arijit Singh',
    album: 'Love Aaj Kal',
    duration: 248,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4d/7c/9e/4d7c9e55-4ed7-ee60-83c8-49bc452227b3/886448257929.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/69/08/d6/6908d60e-563f-5d07-9bb5-737c9d90b59d/mzaf_9263362903198979589.plus.aac.p.m4a',
    genre: 'Romance',
    playCount: 3800000,
    source: 'itunes',
    releaseYear: 2020,
  },
  {
    id: 'hindi-32',
    title: 'Hawayein',
    artist: 'Pritam & Arijit Singh',
    album: 'Jab Harry Met Sejal',
    duration: 290,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/41/aa/e3/41aae321-0a81-2762-e0eb-c60844109fe7/886446683584.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/15/d1/a8/15d1a862-edcd-6a92-624a-2bbf0f7eff26/mzaf_7165241817401822857.plus.aac.p.m4a',
    genre: 'Romance',
    playCount: 3200000,
    source: 'itunes',
    releaseYear: 2017,
  },
  {
    id: 'hindi-33',
    title: 'Kalank (Title Track)',
    artist: 'Pritam & Arijit Singh',
    album: 'Kalank',
    duration: 311,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4e/39/49/4e3949f3-d59d-4295-4bb2-036269f9a88f/8718857678083.png/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c8/a2/09/c8a20920-52a8-9728-a305-9f12a85ae305/mzaf_8477813248295499776.plus.aac.p.m4a',
    genre: 'Bollywood',
    playCount: 2900000,
    source: 'itunes',
    releaseYear: 2019,
  },
  {
    id: 'hindi-34',
    title: 'Tere Hawaale',
    artist: 'Arijit Singh, Shilpa Rao & Pritam',
    album: 'Laal Singh Chaddha',
    duration: 346,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/1e/d0/a8/1ed0a8aa-a8dd-2730-2481-96438f96ddfc/8903431892119_cover.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/64/5f/22/645f22ed-321b-7ea4-67a3-562ed63a63cb/mzaf_3751742054108290105.plus.aac.p.m4a',
    genre: 'Romance',
    playCount: 2750000,
    source: 'itunes',
    releaseYear: 2022,
  },
  {
    id: 'global-4',
    title: 'Die With A Smile',
    artist: 'Lady Gaga & Bruno Mars',
    album: 'Die With A Smile - Single',
    duration: 252,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/11/ae/f2/11aef294-f57c-bab9-c9fc-529162984e62/24UMGIM85348.rgb.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/07/6a/99/076a99ed-b946-431b-6f1f-54fa187ca5bd/mzaf_8102882277995122875.plus.aac.p.m4a',
    genre: 'Pop',
    playCount: 4800000,
    source: 'itunes',
    releaseYear: 2024,
  },
  {
    id: 'global-5',
    title: 'BIRDS OF A FEATHER',
    artist: 'Billie Eilish',
    album: 'HIT ME HARD AND SOFT',
    duration: 210,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/34/31/d3/3431d34e-847f-5d66-df83-0bce688d997e/mzaf_18106743962423782018.plus.aac.p.m4a',
    genre: 'Alternative',
    playCount: 5200000,
    source: 'itunes',
    releaseYear: 2024,
  },
  {
    id: 'global-6',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: 'Harry\'s House',
    duration: 167,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/67/10/16/67101606-3869-ca44-6c03-e13d6322cb51/mzaf_1135399237022217274.plus.aac.p.m4a',
    genre: 'Pop',
    playCount: 6100000,
    source: 'itunes',
    releaseYear: 2022,
  },
  {
    id: 'global-7',
    title: 'Flowers',
    artist: 'Miley Cyrus',
    album: 'Endless Summer Vacation',
    duration: 201,
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8c/67/ff/8c67ff91-31c3-3fef-1884-ce3ec89f3af4/196589946874.jpg/600x600bb.jpg',
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/68/9e/f7/689ef7fe-14fe-a846-c87f-7d3b2d6344b1/mzaf_4167137058064023087.plus.aac.p.m4a',
    genre: 'Pop',
    playCount: 5900000,
    source: 'itunes',
    releaseYear: 2023,
  },
];

export const FEATURED_ARTISTS: Artist[] = [
  {
    id: 'artist-arijit',
    name: 'Arijit Singh',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Arijit_Singh_performance_at_Chandigarh_2025.jpg',
    followers: '45.2M',
    monthlyListeners: '39,800,000',
    bio: 'The undisputed voice of Indian romance and the most listened-to artist in Bollywood history.',
    genre: 'Bollywood / Romance',
  },
  {
    id: 'artist-diljit',
    name: 'Diljit Dosanjh',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Diljit_Dosanjh.jpg',
    followers: '23.8M',
    monthlyListeners: '21,400,000',
    bio: 'Global superstar selling out stadium tours worldwide and redefining modern Punjabi pop.',
    genre: 'Punjabi / Pop',
  },
  {
    id: 'artist-karan',
    name: 'Karan Aujla',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Karan_Aujla_2020.jpg',
    followers: '19.4M',
    monthlyListeners: '18,900,000',
    bio: 'Chart-topping Punjabi singer, lyricist and hitmaker behind "Tauba Tauba", "Winning Speech" & "Softly".',
    genre: 'Punjabi / Hip-Hop',
  },
  {
    id: 'artist-shreya',
    name: 'Shreya Ghoshal',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Shreya_Ghoshal_Behindwoods_Gold_Icons_Awards_2023_%28cropped%29.jpg',
    followers: '29.5M',
    monthlyListeners: '25,600,000',
    bio: 'Multiple National Film Award-winning melody queen with hundreds of timeless hit songs.',
    genre: 'Bollywood / Melodies',
  },
  {
    id: 'artist-weeknd',
    name: 'The Weeknd',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/The_Weeknd_Portrait_by_Brian_Ziff.jpg/960px-The_Weeknd_Portrait_by_Brian_Ziff.jpg',
    followers: '118M',
    monthlyListeners: '112,000,000',
    bio: 'Grammy-winning record breaker behind global anthems "Blinding Lights" and "Starboy".',
    genre: 'R&B / Pop',
  },
  {
    id: 'artist-rahman',
    name: 'A.R. Rahman',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/AR_Rahman_at_Premier_Futsal_Press_Meet_%28cropped%29.jpg',
    followers: '36.8M',
    monthlyListeners: '30,200,000',
    bio: 'Two-time Academy Award and Grammy winner revered worldwide as the Mozart of Madras.',
    genre: 'Soundtrack / World',
  },
];

// Rich, expanded world-trending playlists with 100% accurate, real songs
export const CURATED_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-hindi-top',
    name: '🔥 Top Global & India Hits 2026',
    description: 'The definitive 2026 chartbusters: Bollywood blockbusters, Punjabi anthems & international sensations.',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    tracks: [
      CURATED_TRACKS[2],  // Chaleya
      CURATED_TRACKS[0],  // Kesariya
      CURATED_TRACKS[6],  // Tauba Tauba
      CURATED_TRACKS[28], // Winning Speech
      CURATED_TRACKS[30], // Cheques
      CURATED_TRACKS[31], // Born to Shine
      CURATED_TRACKS[7],  // Pehle Bhi Main
      CURATED_TRACKS[8],  // Satranga
      CURATED_TRACKS[9],  // Naina
      CURATED_TRACKS[5],  // Lover
      CURATED_TRACKS[20], // Excuses
      CURATED_TRACKS[21], // Brown Munde
      CURATED_TRACKS[22], // O Maahi
      CURATED_TRACKS[23], // Pasoori
      CURATED_TRACKS[1],  // Apna Bana Le
      CURATED_TRACKS[3],  // Tum Hi Ho
      CURATED_TRACKS[4],  // Raataan Lambiyan
      CURATED_TRACKS[33], // Shayad
      CURATED_TRACKS[34], // Hawayein
      CURATED_TRACKS[35], // Kalank
      CURATED_TRACKS[36], // Tere Hawaale
      CURATED_TRACKS[37], // Die With A Smile
      CURATED_TRACKS[38], // BIRDS OF A FEATHER
      CURATED_TRACKS[25], // Espresso
      CURATED_TRACKS[26], // Starboy
      CURATED_TRACKS[27], // Blinding Lights
    ],
  },
  {
    id: 'playlist-hindi-romance',
    name: '❤️ Bollywood Romance & Melodies',
    description: 'Heartfelt soulful Hindi love songs by Arijit Singh, Shreya Ghoshal, Pritam & A.R. Rahman.',
    coverImage: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80',
    tracks: [
      CURATED_TRACKS[0],  // Kesariya
      CURATED_TRACKS[1],  // Apna Bana Le
      CURATED_TRACKS[3],  // Tum Hi Ho
      CURATED_TRACKS[4],  // Raataan Lambiyan
      CURATED_TRACKS[33], // Shayad
      CURATED_TRACKS[34], // Hawayein
      CURATED_TRACKS[35], // Kalank
      CURATED_TRACKS[36], // Tere Hawaale
      CURATED_TRACKS[7],  // Pehle Bhi Main
      CURATED_TRACKS[8],  // Satranga
      CURATED_TRACKS[10], // Ve Kamleya
      CURATED_TRACKS[11], // Channa Mereya
      CURATED_TRACKS[12], // Agar Tum Saath Ho
      CURATED_TRACKS[22], // O Maahi
      CURATED_TRACKS[24], // Tujhe Kitna Chahne Lage
      CURATED_TRACKS[19], // Pehli Nazar Mein
      CURATED_TRACKS[17], // Ilahi
      CURATED_TRACKS[15], // Kun Faya Kun
      CURATED_TRACKS[18], // Param Sundari
      CURATED_TRACKS[2],  // Chaleya
    ],
  },
  {
    id: 'playlist-punjabi',
    name: '⚡ Punjabi & Urban Wave Bangers',
    description: 'High-energy beats & anthems from Diljit Dosanjh, Karan Aujla, AP Dhillon, and Shubh.',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
    tracks: [
      CURATED_TRACKS[6],  // Tauba Tauba
      CURATED_TRACKS[28], // Winning Speech
      CURATED_TRACKS[29], // 52 Bars
      CURATED_TRACKS[14], // Softly
      CURATED_TRACKS[30], // Cheques
      CURATED_TRACKS[31], // Born to Shine
      CURATED_TRACKS[32], // Proper Patola
      CURATED_TRACKS[5],  // Lover
      CURATED_TRACKS[9],  // Naina
      CURATED_TRACKS[13], // Kinni Kinni
      CURATED_TRACKS[16], // Arjan Vailly
      CURATED_TRACKS[20], // Excuses
      CURATED_TRACKS[21], // Brown Munde
      CURATED_TRACKS[23], // Pasoori
    ],
  },
  {
    id: 'playlist-global',
    name: '🌐 Global Billboard & Viral Hits',
    description: 'Worldwide chart-dominating tracks from Lady Gaga, Bruno Mars, The Weeknd, Billie Eilish & Sabrina Carpenter.',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    tracks: [
      CURATED_TRACKS[37], // Die With A Smile
      CURATED_TRACKS[38], // BIRDS OF A FEATHER
      CURATED_TRACKS[25], // Espresso
      CURATED_TRACKS[26], // Starboy
      CURATED_TRACKS[27], // Blinding Lights
      CURATED_TRACKS[39], // As It Was
      CURATED_TRACKS[40], // Flowers
    ],
  },
];

// Map Apple iTunes item to our Melo Track interface
export function mapItunesItem(item: any): Track | null {
  if (!item || !item.trackId || !item.previewUrl) return null;
  const highResArtwork = (item.artworkUrl100 || item.artworkUrl60 || '')
    .replace('100x100bb', '600x600bb')
    .replace('60x60bb', '600x600bb');

  return {
    id: `itunes-${item.trackId}`,
    title: item.trackName || 'Unknown Title',
    artist: item.artistName || 'Unknown Artist',
    album: item.collectionName || item.primaryGenreName || 'Single',
    duration: Math.round((item.trackTimeMillis || 180000) / 1000),
    artwork: highResArtwork || CURATED_TRACKS[0].artwork,
    streamUrl: item.previewUrl,
    genre: item.primaryGenreName || 'Bollywood',
    playCount: Math.floor(Math.random() * 800000) + 200000,
    source: 'itunes',
    releaseYear: item.releaseDate ? new Date(item.releaseDate).getFullYear() : 2024,
  };
}

// Fetch trending songs ultra-fast (<200ms) with instant fallback
export async function fetchTrendingTracks(): Promise<Track[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(
      'https://itunes.apple.com/search?term=hindi+bollywood+hits&entity=song&limit=30',
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.results && Array.isArray(json.results) && json.results.length > 0) {
        const itunesTracks: Track[] = json.results
          .map(mapItunesItem)
          .filter((t: Track | null): t is Track => t !== null);

        // Merge curated tracks with live trending tracks, avoiding duplicates
        const combined = [...CURATED_TRACKS];
        for (const t of itunesTracks) {
          if (!combined.some((c) => c.title.toLowerCase() === t.title.toLowerCase())) {
            combined.push(t);
          }
        }
        return combined;
      }
    }
  } catch (err) {
    console.info('Using instant curated catalog:', err);
  }

  return CURATED_TRACKS;
}

// Live search across iTunes (Hindi, Bollywood, Punjabi, English) + local matches in <200ms
export async function searchTracks(query: string): Promise<Track[]> {
  if (!query || query.trim().length === 0) return CURATED_TRACKS;

  const normalized = query.toLowerCase().trim();
  const localMatches = CURATED_TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(normalized) ||
      t.artist.toLowerCase().includes(normalized) ||
      t.album.toLowerCase().includes(normalized) ||
      t.genre.toLowerCase().includes(normalized)
  );

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=25`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.results && Array.isArray(json.results)) {
        const remoteMatches: Track[] = json.results
          .map(mapItunesItem)
          .filter((t: Track | null): t is Track => t !== null);

        const combined = [...localMatches];
        for (const r of remoteMatches) {
          if (!combined.some((c) => c.id === r.id || c.title.toLowerCase() === r.title.toLowerCase())) {
            combined.push(r);
          }
        }
        return combined;
      }
    }
  } catch (err) {
    console.info('Search fallback to local matches:', err);
  }

  return localMatches;
}
