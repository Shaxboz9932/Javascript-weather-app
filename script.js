
const api = {
    key: '5c12c76377d5dccbf118e5359a569888',
    baseUrl: 'https://api.openweathermap.org/data/2.5/'
};

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode == 13){
        getResults(searchBox.value)
        console.log(searchBox.value)

        let h2 = document.querySelector('h2')
        h2.textContent = ''
    }
}

function getResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    
    .then(function data(weather){     //.then(weather => {return weather.json()})
        return weather.json()
    })

    .then(displayResults) // funksiya parametr bilan chaqirib buldi
    .catch(
        function(){
            let h2 = document.querySelector('h2')
            h2.textContent = "Siz mavjud bo'lmagan hududni kiritingiz...."
        }
    )
}

function displayResults(data){
    console.log(data)

    day = [
        'Sunday', 'Monday', 
        'Tuesday', 'Wednesday', 
        'Thursday', 'Friday', 'Saturday']
    
    month = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ]


    let city = document.querySelector('.location .city')
    city.innerHTML = `${data.name}, ${data.sys.country}`
    let temp = document.querySelector('.temp')
    temp.innerHTML = Math.round(data.main.temp) + ' °C'
    let weatherLoc = document.querySelector('.weather')
    weatherLoc.innerHTML = `${data.weather[0].main}`
    let high_low = document.querySelector('.higth-low')
    high_low.innerHTML = `${Math.round(data.main.temp_min)} °C / ${Math.round(data.main.temp_max)} °C`

    let dateTime = new Date()
    let date = document.querySelector('.date')

    date.innerHTML = `${day[dateTime.getDay()]}, ${dateTime.getDate()} - ${month[dateTime.getMonth()]}.${dateTime.getFullYear()}`//Monday, 10 - June.2021
}

//displayResults(data) // buyerda esa xato yani "data" yuq deydi
