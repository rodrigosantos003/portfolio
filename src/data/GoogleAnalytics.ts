// ga.ts
import ReactGA from 'react-ga';

export const initGA = () => {
    ReactGA.initialize('G-XQ1QJC60E2'); // Replace with your tracking code
};

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category: string, action: string, label?: string) => {
    ReactGA.event({
        category,
        action,
        label,
    });
};

export const logException = (description: string) => {
    ReactGA.exception({
        description,
    });
};
