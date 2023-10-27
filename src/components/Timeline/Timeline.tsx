"use client"

import React, { MouseEventHandler, useEffect, useState } from 'react';
import './Timeline.css';
import workExperience from '../../data/work_experience.json';

const Timeline: React.FC = () => {
	const [years, setYears] = useState([""]);
	const [selectedYear, setSelectedYear] = useState("");

	useEffect(() => {
		const yearsFromData = workExperience.data.map(item => item.year);
		setYears(yearsFromData);
	}, []);

	const handleClick: MouseEventHandler<HTMLElement> = (ev) => {
		const clickedYear = ev.currentTarget.textContent ? ev.currentTarget.textContent : "";
		setSelectedYear(clickedYear);

		const listItems = document.querySelectorAll('.timeline li');
		listItems.forEach((item) => {
			item.classList.remove('active-tl');
		});
		ev.currentTarget.classList.add('active-tl');
	};

	// Find the job description for the selected year
	const selectedExperiences = workExperience.data.find(
		(item) => item.year === selectedYear
	);

	return (
		<>
			<div className="container">
				<ul className="timeline">
					{years.map((year, index) => {
						return (
							<li onClick={handleClick} key={`${year}_${index}`}>
								{year}
							</li>
						);
					})}
				</ul>
			</div>

			<div className="job-description">
				{selectedExperiences?.experiences.map((experience, expIndex) => {
					return (
						<div key={`${selectedYear}_${expIndex}`}>
							<h2>{experience.company}</h2>
							<h3>{experience.role}</h3>
							<ul>
								{experience.description.split(";").map((bullet, bulletIndex) => {
									return <li key={`${selectedYear}_${expIndex}_${bulletIndex}`}>{bullet}</li>;
								})}
							</ul>
						</div>
					);
				})}

			</div>
		</>
	);
};

export default Timeline;
