export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
        login: string;
        id: number;
        avatar_url: string;
    };
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    language: string;
}