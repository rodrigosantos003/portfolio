import ReactGA from 'react-ga4';

export const initGA = () => {
    ReactGA.initialize('G - 3728W3QDVY');
}

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.send({
        hitType: 'pageview', page: '/', title: 'Home'
    });
}