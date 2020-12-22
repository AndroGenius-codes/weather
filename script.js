/*jshint esversion: 6 */

window.addEventListener('load', () => {
  let latitude;
  let longitude;
  let weatherDescription = document.querySelector('.weather-description');
  let degree = document.querySelector('.degree');
  let currentTimezone = document.querySelector('.timezone');
  let currentDateAndTime = document.querySelector('.date');
  let fahrenheit_celsius = document.querySelector('.temperature');
  let span = document.querySelector('.temperature span');
   
  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location =>{
         latitude = location.coords.latitude;
         longitude = location.coords.longitude; 
         const api = `https://api.weatherbit.io/v2.0/current?&lat=${latitude}&lon=${longitude}&key=8162363b083f4b108bbd5a0663276d92`/*https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=9585ea120e76360267fb4c24cbc602ff*/;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temp, timezone, ob_time } = data.data[0];
                const { description} = data.data[0].weather;

                degree.textContent = temp;
                weatherDescription.textContent = description;
                currentTimezone.textContent = timezone;
                currentDateAndTime.textContent = ob_time;

                //toggle between celsius and fahrenheit
                let celsius = (temp - 32) * (5 / 9);
                fahrenheit_celsius.addEventListener('click', function(){
                    if(span.textContent === "F") {
                        span.textContent = "C";
                        degree.textContent = Math.floor(celsius);
                    } else{
                        span.textContent = "F"
                        degree.textContent = temp;
                    };

                });
                
            });
      });
    } 
    
});