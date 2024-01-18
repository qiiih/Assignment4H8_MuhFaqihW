const btnGet = document.getElementById("btn-get")
const inputCountry = document.getElementById("input-country")
const statActiveCase = document.getElementById("active-case-stat")
const statNewCase = document.getElementById("new-case-stat")
const statRecoveredCase = document.getElementById("recovered-case-stat")
const statTotalCase = document.getElementById("total-case-stat")
const statTotalDeath = document.getElementById("total-death-stat")
const statTotalTest = document.getElementById("total-test-stat")
const alertMain = document.getElementById("alert-main")
const contentMain = document.getElementById("content-main")

btnGet.addEventListener("click", (ev) => {
    const country = inputCountry.value.replace(/ /,"")
    getData(country)
})

const getData = (country) => {
    const url = `https://covid-193.p.rapidapi.com/statistics?country=${country}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8f04f2a0ddmsh4c5495f6ab55960p187adajsn3299e68b98a7',
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(res => {
            return res.json()
        })
        .then(data => {
            if(data.response.length === 0) {
                throw "Data tidak ditemukan"
            } else {
                displayStats(data.response[0])
            }
        })
        .catch(err => {
            displayErr(err)
        })
}

const displayStats = (stats) => {
    alertMain.style.display = "none"
    contentMain.style.display = "block"
    statActiveCase.innerText = stats.cases.active ? stats.cases.active : 0
    statNewCase.innerText = stats.cases.new ? stats.cases.new : 0
    statRecoveredCase.innerText = stats.cases.recovered ? stats.cases.recovered : 0
    statTotalCase.innerText = stats.cases.total ? stats.cases.total : 0
    statTotalDeath.innerText = stats.deaths.total ? stats.deaths.total : 0
    statTotalTest.innerText = stats.tests.total ? stats.tests.total : 0
}

const displayErr = (errMsg) => {
    alertMain.style.display = "block"
    contentMain.style.display = "none"
    alertMain.innerText = errMsg
}