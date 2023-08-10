/* Valid XPath as of:
    08/08/2023
   Update me to keep track of breaking Glassdoor changes 
*/
const JobsList = '//*[@id="MainCol"]/div[1]/ul'

function findHTML(XPath, ContextNode=document) {
    return document.evaluate(XPath, ContextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
}
/*
    This code should execute on every Glassdoor page visit.
*/
const JobsFound = findHTML(JobsList)

if (JobsFound) {
    /* TODO: 
        Add some check mechanism to safely handle incorrect assumption
        Refactor plugin to use seperate interface, chrome extension API and TypeScript
    */
    jobs = JobsFound.getElementsByTagName("li")
    ids = [].slice.call(jobs).map(job => job.getAttribute("data-id"))
    /* Async
    chrome.storage.session.get(ids, (results) => {
        for (id of ids) {
            if (typeof results[id] !== 'undefined') {
                job = document.querySelector('[data-id="'+id+'"]')
                background = findHTML('.//div/div/a', job)
                background.style.background = '#ff00004a'
            }
            else {
                chrome.storage.session.set({id: true})
            }
        }
    })
    */
    for (id of ids) {
        result = window.localStorage.getItem(id)
        if (result !== null) {
            job = document.querySelector('[data-id="'+id+'"]')
            background = findHTML('.//div/div/a', job)
            background.style.background = '#ff00004a'
        }
        else {
            window.localStorage.setItem(id, "true")
        }
    }

}