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

## Setup guide with docker compose:

1. Create a folder to start in, the name is up to you.
2. Create a file named docker-compose.yml and put the following content inside it:

```docker
services:
  webinterface:
    build: ./WebsiteNextJS
    ports:
      - "127.0.0.1:5454:5454" # HOST_PORT:CONTAINER_PORT
    restart: always
    environment:
      - TZ=Europe/Berlin #change accordingly
    volumes:
      - ./WebsiteNextJS/data:/app/data
    deploy:
      resources:
        limits:
          cpus: "0.2"
          memory: "420M"

```

3. Clone this repo: `git clone https://github.com/OpenDTU-Shelly-Logger/WebsiteNextJS`
4. Go into the cloned folder: `cd WebsiteNextJS`
5. Copy the .env.example file and name it .env
6. Open the .env file and set the api key `UPLOAD_API_KEY=whateverAPIKeyYouLike` Set the api key to the same api key set in the python server .env file
7. Start the container: `docker compose up -d`

### If you want to expose the webinterface through nginx you can continue here:

1. Edit the nginx.conf: `sudo nano /etc/nginx/nginx.conf`
2. Put this inside, or add only the server part to your existing setup:

```nginx
events {}

http {
    server {
        listen: 80;
        server_name yourdomain.com;

        location / {
            proxy_pass: http://localhost:5454;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }
}
```

3. Test nginx conf for syntax issues: `sudo nginx -t` If it does not say Ok, you did something wrong, maybe check brackets and semicolons.
4. If it says Ok, then type: `sudo systemctl nginx restart`
5. Your webinterface should be available.
