export interface AboutPageStrings {
    title: string;
    text: string;
}

export interface ContactPageStrings {
    title: string;
}

export interface ExperiencePageStrings {
    title: string;
    data: {
        year: string
        experiences: {
            company: string
            role: string
            description: string
        }[]
    }[];
}

export interface ProjectsPageStrings {
    title: string;
    viewMore: string;
}