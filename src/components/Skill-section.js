import React from "react";
import { BrainCircuit, HandCoins, User } from "lucide-react";
//import "./Elearn-JobsSection.css"; // Import CSS file

const SkillCard = ({ Icon, title, items }) => (
  <div className="skill-card">
    <div className="icon-container">
      <Icon className="icon" />
    </div>
    <h3 className="title">{title}</h3>
    {items.map((item, index) => (
      <p key={index} className="text">{item}</p>
    ))}
  </div>
);

export default function SkillshareSection() {
  return (
    <section className="Elearn-Jobs-section">
      <div className="container">
        <h2 className="heading">At Elearn-Jobs, We Empower:</h2>

        <div className="grid">
          <SkillCard
            Icon={BrainCircuit}
            title="Members to"
            items={["Get inspired.", "Learn new skills.", "Make discoveries."]}
          />
          <SkillCard
            Icon={HandCoins}
            title="Teachers to"
            items={["Share expertise.", "Earn money.", "Give back."]}
          />
          <SkillCard
            Icon={User}
            title="Employees to"
            items={["Be curious.", "Make an impact.", "Live a full life."]}
          />
        </div>
      </div>

      {/* Decorative bottom image */}
      <div className="bottom-banner">
        <div className="overlay">
            <div className = "grid">
                <div class="skill-card">
                    <p class="text">Get inspired.</p>
                    <p class="text">Learn new skills.</p>
                    <p class="text">Make discoveries.</p>
                </div>
                <div class="skill-card">
                    <p class="text">Share expertise..</p>
                    <p class="text">Earn money.</p>
                    <p class="text">Give back.</p>
                </div>
                <div class="skill-card">
                    <p class="text">Be curious.</p>
                    <p class="text">Make an impact.</p>
                    <p class="text">Live a full life.</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
