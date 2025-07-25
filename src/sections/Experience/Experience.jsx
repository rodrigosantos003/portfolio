"use client";

import Timeline from "../../components/Timeline/Timeline";
import { useEffect, useState, useMemo } from "react";
import { groupExperiencesByYear } from "@/helpers";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    setExperiences(groupExperiencesByYear());

    // Clean up
    return () => {
      setExperiences([]);
    };
  }, []);

  const yearsList = useMemo(() => {
    return experiences.map((item) => item.year);
  }, [experiences]);

  const selectedExperiences = useMemo(() => {
    return selectedYear
      ? experiences.find((item) => item.year === selectedYear)
      : null;
  }, [experiences, selectedYear]);

  const handleClick = (ev) => {
    const clickedYear = ev.currentTarget.textContent
      ? ev.currentTarget.textContent
      : "";

    const listItems = document.querySelectorAll(".timeline-content");
    listItems.forEach((item) => {
      item.classList.remove("active-tl");
    });

    if (selectedYear === clickedYear) setSelectedYear("");
    else {
      setSelectedYear(clickedYear);
      ev.currentTarget.classList.add("active-tl");
    }
  };

  return (
    <section id="Experience">
      <h1>Experience</h1>

      <Timeline
        yearsList={yearsList}
        clickHandler={handleClick}
        selectedExperiences={selectedExperiences}
      />
    </section>
  );
};

export default Experience;
