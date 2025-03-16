"use client"

import React from "react";
import HomeHeader from "./HomeHeader";
import HomeBio from "./Bio";
import BentoGrid from "./BentoGrid";

const bentoData: BentoGridProps = {
    currentTrack: {
      name: "Song Name",
      artist: "Artist Name",
      albumArt: "/path/to/album-art.jpg"
    },
    socialMedia: [
      { name: "GitHub", url: "https://github.com/username" },
      { name: "Twitter", url: "https://twitter.com/username" },
      { name: "LinkedIn", url: "https://linkedin.com/in/username" },
      { name: "Discord", url: "https://discord.gg/yourdiscord" },
      { name: "YouTube", url: "https://youtube.com/@yourchannel" }
    ],
    techStacks: {
      "Frontend": {
        color: "linear-gradient(to bottom, #f59e0b, #d97706)",
        techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React JS", "Next JS", "Tailwind CSS", "ShadCN"]
      },
      "Backend": {
        color: "linear-gradient(to bottom, #3b82f6, #2563eb)",
        techs: ["Node", "Express", "Prisma"]
      },
      "Database": {
        color: "linear-gradient(to bottom, #10b981, #059669)",
        techs: ["MongoDB", "PostgreSQL", "Firebase", "SQL"]
      },
      "DevOps": {
        color: "linear-gradient(to bottom, #8b5cf6, #7c3aed)",
        techs: ["Docker", "AWS"]
      }
    }
  };
const HomePage = () => {
    return (
        <div className="flex flex-col items-center w-full">
            <HomeHeader />
            <HomeBio />
            <BentoGrid {...bentoData} />        
        </div>
    )
}

export default HomePage;
