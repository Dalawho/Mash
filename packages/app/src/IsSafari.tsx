export const IsSafari = () => {
    const userAgentString = window.navigator.userAgent;
    const chromeAgent = userAgentString.indexOf("Chrome") > -1;
    const safariAgent = userAgentString.indexOf("Safari") > -1;
    if ((chromeAgent) && (safariAgent)) return false;
    return safariAgent;
}