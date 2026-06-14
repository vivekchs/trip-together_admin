




import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'

import beach_vacation from './beach_vacatino.webp'
import festival_vacation from './festival_trip.webp'
import scuba_diving1 from './scuba_diving.jpg'
import forest_vaction from './forest_camping.webp'
import mountain_vaction from './mountain_trekking.jpg'
import nataure_vacation from './nature_travel.webp'
import beach from './beach.mp4'
import club from './club.mp4'
import mountains from './mountains.mp4'
import road from './road.mp4'
import scuba_diving from './scuba_diving.mp4'
import sky_diving from './sky_diving.mp4'


// about TT images
import chatting from './aboutImages/chatting.jpg'
import group from './aboutImages/group_travel.jpg'
import map from './aboutImages/map.jpg'
import planning from './aboutImages/planning.jpg'
import verified from './aboutImages/verified.jpg'


export const assets = {


    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
   

}

export const landing_clips =[
    beach,
    club,
    mountains,
    road,
    scuba_diving,
    sky_diving
]

export const vacation_list = [
    {
        vacation_name: "Beach Trip",
        vacation_image: beach_vacation
    },
    
    {
        vacation_name: "Scuba Diving",
        vacation_image: scuba_diving1
    },
     {
        vacation_name: "Forest Trip",
        vacation_image: forest_vaction
    },
     {
        vacation_name: "Mountain Trip",
        vacation_image: mountain_vaction
    },
     {
        vacation_name: "Nature Trip",
        vacation_image: nataure_vacation
    },
     {
        vacation_name: "Festival Trip",
        vacation_image: festival_vacation
    },

    ]



   export const contentData = [
  {
    heading: "Find Travel Buddies Easily",
    paragraph: "Discover companions who share your travel vibes and destinations. Whether you're going solo or in a group, find like-minded travelers heading the same way. Share your plans, sync your schedules, and build memories together. No more solo selfies — click group pictures with new friends. Let every trip become a shared story of adventure.",
    img: group // e.g., People hiking together / backpackers talking
  },
  {
    heading: "Smart Destination Suggestions",
    paragraph: "Let AI help you pick your next adventure spot effortlessly. From sunny beaches to snowy mountains, get suggestions based on your style, weather, and events. Avoid the usual confusion of where to go next. Receive intelligent insights based on festivals, trends, and travel history. Your ideal destination is just a tap away.",
    img: map // e.g., Person choosing destinations on phone/map
  },
  {
    heading: "Group Planning Made Simple",
    paragraph: "Planning with a group doesn't have to be chaotic anymore. Create shared itineraries, assign roles, and divide tasks with ease. Keep all your trip details in one organized place. Know who's booking flights, who's handling stays, and what’s on the agenda. Travel plans stay smooth when everyone’s on the same page.",
    img: planning// e.g., Group planning trip at a table / people with a map
  },
  {
    heading: "Verified & Safe Travel",
    paragraph: "Safety comes first, especially when meeting new people. Connect only with verified profiles that match your travel interests. Use filters to ensure you're comfortable with your travel group. See travel history and preferences before committing. Your journey should be exciting and secure from start to finish.",
    img: verified // e.g., Shield symbol / people checking profiles
  },
  {
    heading: "Chat & Collaborate Before You Go",
    paragraph: "Start bonding with your travel companions before the trip begins. Share your ideas, coordinate activities, and exchange packing tips. Create a positive vibe and clear expectations ahead of time. Whether through chats or video calls, communication makes all the difference. Hit the road as a team, not as strangers.",
    img: chatting // e.g., People chatting on a phone / group on video call
  }
];
export const mostVisitedData = [
  {
    name: "Manali, Himachal Pradesh",
    description: "Perfect blend of snow, adventure, and cozy cafés in the Himalayas.",
    rating: 4.8,
    visitors: "5.1k people visited this month",
    img: "/places/manali.jpg"
  },
  {
    name: "Jaipur, Rajasthan",
    description: "Historic forts, royal palaces, and vibrant culture at every turn.",
    rating: 4.7,
    visitors: "4.3k people visited this month",
    img: "/places/jaipur.jpg"
  },
  {
    name: "Goa",
    description: "Golden beaches, buzzing nightlife, and Portuguese heritage all in one.",
    rating: 4.6,
    visitors: "6.7k people visited this month",
    img: "/places/goa.jpg"
  },
  {
    name: "Rishikesh, Uttarakhand",
    description: "Yoga capital of the world with thrilling river rafting experiences.",
    rating: 4.9,
    visitors: "3.9k people visited this month",
    img: "/places/rishikesh.jpg"
  },
  {
    name: "Leh-Ladakh",
    description: "Barren beauty, motorbike adventures, and peaceful monasteries.",
    rating: 4.8,
    visitors: "2.1k people visited this month",
    img: "/places/ladakh.jpg"
  },
  {
    name: "Munnar, Kerala",
    description: "Endless tea gardens, misty hills, and calm backwaters.",
    rating: 4.5,
    visitors: "3.2k people visited this month",
    img: "/places/munnar.jpg"
  }
];




