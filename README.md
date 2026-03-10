## Testing
1. Install npm packages `npm install`
2. Start development server `npm run dev`

This project is a logger for OpenDTU as well as for the Shelly 3M. It consists out of 4 devices, which work together. 
1. OpenDTU
2. Shelly 3M
3. A python server running at your home
4. A public (or private) server for viewing your data inside the App or on the web interface.

How it works:
The python script in your local network polls the date of the OpenDTU API as well as the Shelly 3M power meter api.
Both of the live data are send to the nextjs server, which hosts the website as well and are stored and visualized there. 
When opening the app or the website a socket server updates all the clients accordingly with the updated data. 
So far for the live part.

Then there is the actual loggin part. The live power and solar data are stored inside a file every 10 seconds (only 24 hours long). After 24 hours the data is broken down in 10 minute intervals and properly stored inside the database. The second part is the daily OpenDTU data. Using the live solar data, the peak as well as the peak temperature for that day is calculated and stored, including the time of the Peak value. The power exported to the grid, imported from the grid, total power consumption of the day, autarky ratio and the self used percent are then stored on daily basis. When opening the website, a dashboard with charts is shown to you. You can see the exact power draw per day for every day, yearly comparison of data. Monthly peak comparisons and a lot more.

All of this can be self hosted by you.

A little [demo](https://solar.frozenassassine.de) of mine.
