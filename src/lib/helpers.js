import data from './data.json';

function monthDiff(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    let months = (d2.getFullYear() - d1.getFullYear()) * 12 + 1;
    months += d2.getMonth() - d1.getMonth();

    // Optional: adjust if day of month makes partial month not count as full
    if (d2.getDate() < d1.getDate()) {
        months--;
    }

    return months;
};

function getDateYear(dateString) {
    const date = new Date(dateString);

    return date.getFullYear().toString();
}

export function calculateExperience() {

    const months = data.experiences.map((item) => {
        let count = 0;
        const endDate = item.end ? item.end : Date.now();

        count += monthDiff(item.start, endDate);

        return count;
    });

    var sum = months.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    return Math.ceil(sum / 12);
};

export function getCurrentRole() {
    return data.experiences[0].role;
}

export function getCurrentCompany() {
    return data.experiences[0].company;
}

export function groupExperiencesByYear() {
    const currentYear = new Date().getFullYear();

    const experiencesWithDates = data.experiences.filter(exp => exp.start);

    const groupedByYear = experiencesWithDates.reduce((acc, experience) => {
        const year = getDateYear(experience.start);

        if (!acc[currentYear]) {
            acc[currentYear] = [];
        }

        if (!acc[year]) {
            acc[year] = [];
        }

        if (!('end' in experience)) {
            acc[currentYear].push(experience);
        } else {
            acc[year].push(experience);
        }

        return acc;
    }, {});

    // Sort years in descending order (most recent first)
    const sortedYears = Object.keys(groupedByYear).sort((a, b) => parseInt(b) - parseInt(a));

    // Return as an array of year objects with their experiences
    return sortedYears.map(year => ({
        year: year,
        experiences: groupedByYear[year].sort((a, b) => new Date(b.start) - new Date(a.start))
    }));
}