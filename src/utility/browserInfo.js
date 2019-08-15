/**
 * Figure out browser and version and return this info as an object
 *
 * @see https://stackoverflow.com/questions/2400935/browser-detection-in-javascript/23950279#23950279
 * @returns {{browser: string, version: string}}
 */
export function browserInfo()
{
    let browser = '';
    let version = '';
    let majVersion = 0;
    let minVersion = 0;
    let patchVersion =0;

    const ua = navigator.userAgent;
    let tem = [];
    const M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i);

    //IE will be identified as 'Trident' and a different version number. The name must be corrected to 'Internet Explorer' and the correct version identified.
    //ie correction
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+.?\d*)/g.exec(ua) || [];
        browser = 'Internet Explorer';
        version = tem[1];
    } else if (/firefox/i.test(M[1])) {
        tem = /\brv[ :]+(\d+.?\d*)/g.exec(ua) || [];
        browser = 'Firefox';
        version = tem[1];
    } else if (/safari/i.test(M[1])) {
        tem = ua.match(/\bVersion\/(\d+.?\d*\s*\w+)/);
        browser = 'Safari';
        version = tem[1];
    } else if(M[1] === 'Chrome') {
        //opera
        const temOpr = ua.match(/\b(OPR)\/(\d+.?\d*.?\d*.?\d*)/);
        //edge
        const temEdge = ua.match(/\b(Edge)\/(\d+.?\d*)/);
        //chrome
        const temChrome = ua.match(/\b(Chrome)\/(\d+.?\d*.?\d*.?\d*)/);
        // A genuine 'Chrome' reading will result from ONLY temChrome not being null.
        const genuineChrome = temOpr == null && temEdge == null && temChrome != null;

        if (temOpr != null) {
            browser = temOpr[1].replace('OPR', 'Opera');
            version = temOpr[2];
        }

        if (temEdge != null) {
            browser = temEdge[1];
            version = temEdge[2];
        }

        if (genuineChrome) {
            browser = temChrome[1];
            version = temChrome[2];
        }
    }

    let versions = version.split('.');

    if (versions.length > 0) {
        majVersion = versions[0];

        if (versions.length > 1) {
            minVersion = versions[1]
        }

        if (versions.length > 2) {
            patchVersion = versions[2];
        }
    }

    return {
        browser: browser,
        version: version,
        majVersion: majVersion,
        minVersion: minVersion,
        patchVersion: patchVersion
    };
}
