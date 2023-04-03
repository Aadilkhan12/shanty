const author = document.getElementById("author")
const crypto = document.querySelector(".crypto-top")
const quote = document.querySelector(".quote")

// Unsplash API
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full})`
    document.getElementById("author").textContent = `By ${data.user.name}`
  })
  .catch((err) => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
    document.getElementById("author").textContent = `By Dodi Achmad`
  })

//    Crypto Prices
fetch(
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Csolana%2Cdogecoin&vs_currencies=usd"
)
  .then((res) => res.json())
  .then((data) => {
    crypto.innerHTML = `
    <span> <img class="crypto-img"src="Images/bitcoin.png"/>$${data.bitcoin.usd}</span>
    <span> <img class="crypto-img"src="Images/ethereum.png"/>$${data.ethereum.usd}</span>
`
  })

//     Timer
function currentTime() {
  time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
  document.querySelector(".time").innerHTML = time.toUpperCase()
}

setInterval(currentTime, 1000)
// Motivation Quote

fetch("https://api.quotable.io/random?tags=inspirational")
  .then((res) => res.json())
  .then((data) => {
    quote.innerHTML = `
      <p>${data.content}</p>
      <p>${data.author}</p>
      `
  })
  .catch((err) => console.log(err))

// weather API

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available")
      }
      return res.json()
    })
    .then((data) => {
      console.log(data)
      document.querySelector(".weather").innerHTML = `
      <span> 
        <img src= "http://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>
        <p>${data.main.temp} °C</p>
        </span>        
        `
    })
    .catch((err) => console.log(err))
})
