"use client";

import { useState, useMemo } from "react";
import Timeline from "../../components/Timeline/Timeline";

export default function ExperienceClient({ experiences }) {
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();

  const yearsList = useMemo(
    () => experiences.map((item) => item.year),
    [experiences],
  );

  const selectedExperiences = useMemo(() => {
    if (!selectedYear) return null;
    return experiences.find((item) =>
      selectedYear === "Present"
        ? item.year === String(currentYear)
        : item.year === selectedYear,
    );
  }, [experiences, selectedYear, currentYear]);

  const handleClick = (ev) => {
    const clickedYear = ev.currentTarget.textContent || "";
    document
      .querySelectorAll(".timeline-content")
      .forEach((item) => item.classList.remove("active-tl"));
    if (selectedYear === clickedYear) {
      setSelectedYear("");
    } else {
      setSelectedYear(clickedYear);
      ev.currentTarget.classList.add("active-tl");
    }
  };

  return (
    <Timeline
      yearsList={yearsList}
      clickHandler={handleClick}
      selectedExperiences={selectedExperiences}
    />
  );
}
