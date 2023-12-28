"use client"

import Timeline from "../../components/Timeline/Timeline";
import workExperienceData from '../../data/work_experience.json';
import { MouseEventHandler, useEffect, useState } from "react";

export default function Experience() {
    const [years, setYears] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>('');

    useEffect(() => {
        const yearsFromData = workExperienceData.data.map(item => item.year);
        setYears(yearsFromData);
    }, []);

    const handleClick: MouseEventHandler<HTMLElement> = (ev) => {
        const clickedYear = ev.currentTarget.textContent ? ev.currentTarget.textContent : "";

        const listItems = document.querySelectorAll('.timeline-content');
        listItems.forEach((item) => {
            item.classList.remove('active-tl');
        });

        if (selectedYear === clickedYear)
            setSelectedYear('');
        else {
            setSelectedYear(clickedYear);
            ev.currentTarget.classList.add('active-tl');
        }
    };

    const selectedExperiences = selectedYear ? workExperienceData.data.find(item => item.year === selectedYear) : null;

    return (
        <section id="Experience">
            <h1>Experience</h1>

            <Timeline
                yearsList={years}
                clickHandler={handleClick}
                selectedExperiences={selectedExperiences}
            />
        </section>
    )
}