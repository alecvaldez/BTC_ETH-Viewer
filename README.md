# Coin Viewer

https://coin-viewer-avaldez.herokuapp.com/

Displays BTC and Ethereum Prices on Binance and Coinbase and Recommends where to buy and sell.
The Application shows price graphs for BTC and ETH for Coinbase and Binance aswell as displays and orderbooks for each coin and exchange pairing.


## Build and Deploy with Maven
* In a new terminal run `git clone https://github.com/alecvaldez/BTC_ETH-Viewer/`
* CD into the folder with `cd BTC_ETH-Viewer`
* Run the build with `mvn clean install`
* Deploy with `java -c target/coin.viewer-0.0.1-SNAPSHOT.jar`
* Visit application on any browser at `localhost:8080`

## Build and Deploy with NPM
* In a new terminal run `git clone https://github.com/alecvaldez/BTC_ETH-Viewer/`
* CD into the folder with `cd BTC_ETH-Viewer/src/main/frontend/`
* Run `npm install`
* Deploy with `npm run start`
* Visit application on any browser at `localhost:3000`
