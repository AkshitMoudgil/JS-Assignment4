document.addEventListener("DOMContentLoaded", async function () {
  // Dynamically obtaining and displaying student information
  const studentInfo = document.getElementById("student-info");
  const userMagnitudeInfo = document.getElementById("userMagnitude-info");
  const apiData = document.getElementById("api-data");

  //Adding an ongoing event listener for the button click to display student information
  const showStudentInfoBtn = document.getElementById("showStudentInfoBtn");
  showStudentInfoBtn.addEventListener("click", function () {
    studentInfo.innerHTML = `Student ID: 200535888 | Name: Akshit Moudgil`;
  });

  // Prompting the user for current magnitude input
  const userMagnitude = prompt(
    "Enter a magnitude value to fetch Earthquake Details (0 to 9):"
  );

  // Validating the user's ongoing input (additional robust validation can be implemented)
  if (userMagnitude !== null && !isNaN(userMagnitude)) {
    // Displaying the ongoing user-provided magnitude information
    userMagnitudeInfo.innerHTML = `Magnitude: ${userMagnitude} (The result contains earthquakes with equal or greater magnitude)`;

    // Dynamically constructing the URL with the ongoing user-provided magnitude value
    const url = `https://everyearthquake.p.rapidapi.com/earthquakes?start=1&count=100&type=earthquake&magnitude=${userMagnitude}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ad0abe358fmsh27f9067a0d27369p16ae1ajsn195888341c8a",
        "X-RapidAPI-Host": "everyearthquake.p.rapidapi.com",
      },
    };

    try {
      // Fetching earthquake data asynchronously based on the ongoing user-provided magnitude
      const response = await fetch(url, options);
      const result = await response.json(); // Parsing the response as JSON
      const earthquakes = result.data; // Extracting the 'data' array from the response

      // Displaying specific information from each earthquake in the 'data' array
      earthquakes.forEach((earthquake) => {
        const earthquakeInfo = document.createElement("div");
        earthquakeInfo.innerHTML = `
                    <p>Title: ${earthquake.title}</p>
                    <p>Magnitude: ${earthquake.magnitude}</p>
                    <p>Latitude: ${earthquake.latitude}</p>
                    <p>Longitude: ${earthquake.longitude}</p>
                    <p>URL: <a href="${earthquake.url}" target="_blank">${earthquake.url}</a></p>
                    <hr>
                `;
        apiData.appendChild(earthquakeInfo); // Appending the earthquake information to the 'api-data' element
      });
    } catch (error) {
      // Handling ongoing errors during the API request
      console.error(error);
    }
  } else {
    // Handling ongoing invalid input
    console.log("Invalid input.");
    apiData.innerHTML = `Wrong Input! Magnitude value can only be numerical.... Reload and Try Again.`;
  }
});
