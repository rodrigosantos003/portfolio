import { Fragment } from "react";
import "./Timeline.css";

const Timeline = ({ yearsList, clickHandler, selectedExperiences }) => {
  return (
    <>
      <div className="timeline">
        {yearsList.map((year, index) => {
          return (
            <Fragment key={`${year}_${index}`}>
              <div className="timeline-content" onClick={clickHandler}>
                <h2>{year}</h2>
              </div>
              {index < yearsList.length - 1 && <hr className="connector" />}
            </Fragment>
          );
        })}
      </div>

      {selectedExperiences ? (
        <div className="job-description">
          {selectedExperiences?.experiences.map((experience, expIndex) => {
            return (
              <div key={`${selectedExperiences.year}_${expIndex}`}>
                <h2>{experience.company}</h2>
                <h3>{experience.role}</h3>
                <h4>
                  {experience.start} &rarr; {experience.end}
                </h4>
                <ul>
                  {experience.description
                    .split(";")
                    .map((bullet, bulletIndex) => (
                      <li
                        key={`${selectedExperiences.year}_${expIndex}_${bulletIndex}`}
                      >
                        {bullet}
                      </li>
                    ))}
                </ul>
                {expIndex < selectedExperiences.experiences.length - 1 && (
                  <hr className="job-separator" />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Timeline;
