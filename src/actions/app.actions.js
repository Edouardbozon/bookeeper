export const handleDrawerToggle = () => {
    return {
        type: '@@drawer:HANDLE_TOGGLE'
    }
}

export const detectMobile = () => {
    let check = false;
    if ((window.innerWidth <= 800 && window.innerHeight <= 600) ||
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    ){
        check = true;
    } else {
        check = false;
    };
    return {
        type: '@@app:DETECT-MOBILE',
        payload: check
    };
}
