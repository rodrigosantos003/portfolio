import { ExperiencePageStrings } from '../../data/PageStrings';
import Timeline from '../../components/Timeline/Timeline';
import { MouseEventHandler, useEffect, useState } from "react";

interface ExperienceProps {
    pageStrings: ExperiencePageStrings;
}

const Experience = ({ pageStrings }: ExperienceProps) => {
    const [years, setYears] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>('');

    useEffect(() => {
        const yearsFromData = pageStrings.data.map(item => item.year);
        setYears(yearsFromData);

        // Clean up
        return () => {
            setYears([]);
        }
    }, [])

    const handleClick: MouseEventHandler<HTMLElement> = (ev) => {
        const clickedYear = ev.currentTarget.textContent ? ev.currentTarget.textContent : '';

        const listItems = document.querySelectorAll('.timeline-content');
        listItems.forEach((item) => {
            item.classList.remove('active-tl');
        })

        if (selectedYear === clickedYear)
            setSelectedYear('');
        else {
            setSelectedYear(clickedYear);
            ev.currentTarget.classList.add('active-tl');
        }
    }

    const selectedExperiences = selectedYear ? pageStrings.data.find(item => item.year === selectedYear) : null;


    return (
        <section id={pageStrings.title}>
            <h1>{pageStrings.title}</h1>

            <Timeline
                yearsList={years}
                clickHandler={handleClick}
                selectedExperiences={selectedExperiences}
            />
        </section>
    )
}

export default Experience;