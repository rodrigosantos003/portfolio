import React from 'react';
import './Timeline.css';

interface TimelineProps {
	yearsList: string[];
	clickHandler: React.MouseEventHandler<HTMLElement>;
	selectedExperiences: {
		year: string;
		experiences: {
			company: string;
			role: string;
			description: string;
		}[];
	} | undefined
}

const Timeline: React.FC<TimelineProps> = ({ yearsList, clickHandler, selectedExperiences }) => {
	return <>
		<div className="timeline">
			{yearsList.map((year, index) => {
				return (<div className="timeline-content" onClick={clickHandler} key={`${year}_${index}`}>
					<h2>{year}</h2>
				</div>)
			})}
		</div >

		{selectedExperiences ?
			<div className="job-description">
				{selectedExperiences?.experiences.map((experience, expIndex) => {
					return <div key={`${selectedExperiences.year}_${expIndex}`}>
						<h2>{experience.company}</h2>
						<h3>{experience.role}</h3>
						<ul>
							{experience.description.split(';').map((bullet, bulletIndex) => (
								<li key={`${selectedExperiences.year}_${expIndex}_${bulletIndex}`}>{bullet}</li>
							))}
						</ul>
						{expIndex < selectedExperiences.experiences.length - 1 && <hr className="job-separator" />}
					</div>
				})}
			</div>
			: ""}
	</>
};

export default Timeline;
