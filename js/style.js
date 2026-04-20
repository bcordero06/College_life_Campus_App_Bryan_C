console.log("script,js connected!");
/*
Shows weather
fetches the current weather for Chicago IL
using the open-Meteo Api
*/

async function getweather() {
    const resultEl = document.getElementById('weather-result')
    const displayEl = document.getElementById('weather-display');
    const tempEl = document.getElementById('temp');
    const condEl = document.getElementById('condition');
    const humEl = document.getElementById('humidity');
    const windEl = document.getElementById('wind');
    const btnEL = document.getElementById('weather-btn');

    if (!tempEl) return;

    displayEl.style.display = "none";

    resultEl.style.display = 'block';
    resultEl.innerHTML = `
      <div class="d-flex align-items-center justify-content-center gap-2" 
           style="color:var(--text-muted); font-size:0.9rem;">
        <div class="spinner-border spinner-border-sm text-warning" role="status"></div>
        Fetching weather data…
      </div>
    `;

    btnEL.disabled = true;

    // weather North Park university Chicago IL
    const url = "https://api.open-meteo.com/v1/forecast?latitude=41.9795&longitude=-87.7087&current_weather=true&temperature_unit=fahrenheit&timezone=America/Chicago";

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        const curr = data.current_weather;

        tempEl.textContent = curr.temperature + "°F";
        condEl.textContent = "Weather Code: " + curr.weathercode;
        humEl.textContent  = "Humidity: N/A";
        windEl.textContent = "Wind: " + curr.windspeed + " mph";

        // Clear loading spinner
        resultEl.innerHTML = "";
        displayEl.style.display = "block";

    } catch (err) {
        resultEl.innerHTML = `
          <div style="color:#ff6b6b; font-size:0.9rem;">
            ⚠️ Unable to load weather data.<br>
            <span style="color:var(--text-muted);font-size:0.8rem;">${err.message}</span>
          </div>`;
    } finally {
        btnEL.disabled = false;
    }
}

if (document.getElementById("temp")){
    getweather()
}