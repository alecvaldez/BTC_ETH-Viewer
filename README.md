# Coin Viewer

https://coin-viewer-avaldez.herokuapp.com/

Displays BTC and Ethereum Prices on Binance and Coinbase and Recommends where to buy and sell.
The Application shows price graphs for BTC and ETH for Coinbase and Binance aswell as displays and orderbooks for each coin and exchange pairing.


## Build and Deploy with Maven
* In a new terminal run `git clone https://github.com/alecvaldez/BTC_ETH-Viewer/`
* CD into the folder with `cd BTC_ETH-Viewer`
* Run the build with `mvn clean install`
* Deploy with `java -jar target/coin.viewer-0.0.1-SNAPSHOT.jar`
* Visit application on any browser at `localhost:8080`

## Build and Deploy with NPM
* In a new terminal run `git clone https://github.com/alecvaldez/BTC_ETH-Viewer/`
* CD into the folder with `cd BTC_ETH-Viewer/src/main/frontend/`
* Run `npm install`
* Deploy with `npm run start`
* Visit application on any browser at `localhost:3000`

## Questionnaire
### Are there any sub-optimal choices( or shortcuts taken due to limited time ) in your implementation?
Yes. I originally wanted to implement a backend java application that would act as a poller to fetch all price and order endpoints. This would be separate from the frontend Typescript application and would persist data to a database of some sort (ie. MongoDB). If you initially start the application, there is a 20-second window where the graphs have weird behavior due to initial price values of 0. After 20 seconds, the graph will show a more visually pleasing line. This can be fixed by having a backend that can persist data points. Finally, the application works best in 1440p but can also be viewed on any size.
### Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)
I overdesigned the graph and order book components. They were additions I added to make the application more informative.
### If you have to scale your solution to 100 users/second traffic what changes would you make, if any?
I would have a persistent database and would include load balancing implemented with NGINX or any other load balancing service. There would be one single java application persisting this data to the database and the frontend would access this posted data. If this data had to be instant, I would use WebSockets and would subscribe to each exchange's WebSocket channel to receive the data much quicker.
### What are some other enhancements you would have made if you had more time to do this implementation?
Definitely would implement the backend and database. I would simply add all of the polling or WebSocket as Spring boot controllers and have it posted to the backend.
