const API = 
`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&sparkline=false`;

const API_ADDRESS_INFO =
`https://api.ethplorer.io/getAddressInfo/`;

const API_ADDRESS_HISTORY =
`https://api.ethplorer.io/getAddressTransactions/`;

const API_TOKENS_DATA =
`https://api.ethplorer.io/getTop?apiKey=freekey`;

const API_NETWORK_DATA =
`https://api.ethermine.org/networkStats`;


function loadMarketToPage (coins){
	var mainDiv = document.getElementById("marketPrice");

	for (const coin of coins){
		var divWrapper = document.createElement("div");
		divWrapper.setAttribute("class", "main-header__coin");

		var imgCoin = document.createElement("img");
		imgCoin.setAttribute("class", "main-header__coin-img");
		imgCoin.setAttribute("src", coin.image)
		imgCoin.style.width = '50px';
		imgCoin.style.height = '50px';


		var divDescWrapper = document.createElement("div");
		divDescWrapper.setAttribute("class", "main-header__coin-desc-box");


		var titleCoin = document.createElement("h3");
		titleCoin.setAttribute("class", "main-header__coin-title");

		titleCoin.append(document.createTextNode(coin.name + " price"));

		var priceCoin = document.createElement("p");
		priceCoin.setAttribute("class", "main-header__coin-price");

		var spanCoinChange = document.createElement("span");
		if (coin.price_change_percentage_24h >= 0){
			spanCoinChange.setAttribute("class", "main-header__coin-price-changes-green");
		} else {
			spanCoinChange.setAttribute("class", "main-header__coin-price-changes-red");		
		}

		spanCoinChange.append(document.createTextNode(coin.price_change_percentage_24h + " %"))
		priceCoin.append(document.createTextNode("$ " + coin.current_price + " / "));
		priceCoin.append(spanCoinChange);


		divDescWrapper.append(titleCoin);
		divDescWrapper.append(priceCoin);
		divWrapper.append(imgCoin);
		divWrapper.append(divDescWrapper);

		mainDiv.append(divWrapper)

	}
}

function loadNetworkStatsToPage (stats) {
	var mainDiv = document.getElementById("first-data");
	var networkDataDiv = document.createElement("div");
	networkDataDiv.setAttribute("class", "main-content__network-data-wrapper")

	var networkDivTitle = document.createElement("h2");
	networkDivTitle.setAttribute("class", "main-content__network-data-title");
	networkDivTitle.append(document.createTextNode("ethereum network stats"));	

	var imgSource = new Map();
	imgSource.set("blockTime", "assets/img/time-left.svg");
	imgSource.set("difficulty", "assets/img/plugin.png");
	imgSource.set("hashrate", "assets/img/fire-flame.svg");
	imgSource.set("btc", "assets/img/bitcoin.png");

	for (const value in stats.data){
		if (value !== 'time' && value !== 'usd'){
			var divWrapper = document.createElement("div");
			divWrapper.setAttribute("class", "main-content__network-item-wrapper");


			var divNetworkDescTitle = document.createElement("h3");
			divNetworkDescTitle.setAttribute("class", "main-content__network-title");
			let titleStats = (value === 'blockTime') ? (
				'block time'
				):(
				(value === 'btc') ? "btc / eth" : value);
			divNetworkDescTitle.append(document.createTextNode(titleStats));


			var divValue = document.createElement("div");
			divValue.setAttribute("class","main-content__value-wrapper")

			var valueTitle = document.createElement("p");
			valueTitle.setAttribute("class", "main-content__stats-value");


			let valueStats = (value === 'difficulty' || value === 'hashrate') ? (
				(stats.data[value].toString().length === 16) ? ( 
					stats.data[value] / 1000000000000000).toFixed(2) + ' Ph/s': 
					(stats.data[value] / 1000000000000).toFixed(2) + ' Th/s'
				):(
					(value === 'blockTime') ? stats.data[value].toFixed(2) + ' s' : stats.data[value]
				);

			valueTitle.append(document.createTextNode(valueStats));

			var imgValue = document.createElement("img");
			imgValue.setAttribute("class", "main-content__value-img");
			let source = imgSource.get(value);
			imgValue.setAttribute("src", source)
			imgValue.style.width = '40px';
			imgValue.style.height = '40px';

			divValue.append(imgValue);
			divValue.append(valueTitle);

			divWrapper.append(divNetworkDescTitle);
			divWrapper.append(divValue);

			networkDataDiv.append(divWrapper);
		}
		mainDiv.append(networkDivTitle);
		mainDiv.append(networkDataDiv);
	}
}


function loadTokensDataToPage (data){
	var mainDiv = document.getElementById("second-data");

	var divWrapper = document.createElement("div");
	divWrapper.setAttribute("class", "main-content__top-token-list-desc");

	var tokensDivTitle = document.createElement("h2");
	tokensDivTitle.setAttribute("class", "main-content__top-tokens-main-title");
	tokensDivTitle.append(document.createTextNode("Top Tokens by Trade Volume"));	

	var divEmpty = document.createElement("div");

	var tokenNameTitle = document.createElement("p");
	tokenNameTitle.setAttribute("class", "main-content__top-token-name");
	tokenNameTitle.append(document.createTextNode("Name: "));	

	var tokenSymbolTitle = document.createElement("p");
	tokenSymbolTitle.setAttribute("class", "main-content__top-token-symbol");
	tokenSymbolTitle.append(document.createTextNode("Symbol: "));	

	var tokenVolumeTitle = document.createElement("p");
	tokenVolumeTitle.setAttribute("class", "main-content__top-token-volume");
	tokenVolumeTitle.append(document.createTextNode("Volume 24h: "));	

	var tokenPriceTitle = document.createElement("p");
	tokenPriceTitle.setAttribute("class", "main-content__top-token-price");
	tokenPriceTitle.append(document.createTextNode("Price: "));

	var tokenChangesTitle = document.createElement("p");
	tokenChangesTitle.setAttribute("class", "main-content__top-token-changes");
	tokenChangesTitle.append(document.createTextNode("Changes in 24h: "));

	divWrapper.append(divEmpty);
	divWrapper.append(tokenNameTitle);
	divWrapper.append(tokenSymbolTitle);
	divWrapper.append(tokenVolumeTitle);
	divWrapper.append(tokenPriceTitle);	
	divWrapper.append(tokenChangesTitle);

	var topTokensData = document.createElement("div");
	topTokensData.setAttribute("class", "main-content__top-tokens-data-wrapper");

	
	topTokensData.append(tokensDivTitle);
	topTokensData.append(divWrapper);

	for (const value in data.tokens){
		var divWrapper = document.createElement("div");
		divWrapper.setAttribute("class", "main-content__top-token-wrapper");

		var imgToken = document.createElement("img");
		imgToken.setAttribute("class", "main-content__top-token-img");
		let source = (data.tokens[value].symbol === 'ETH') ? "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880" 
			: "https://ethplorer.io/" + data.tokens[value].image;
		imgToken.setAttribute("src", source);
		imgToken.style.width = '40px';
		imgToken.style.height = '40px';

		var tokenName = document.createElement("h4");
		tokenName.setAttribute("class", "main-content__top-token-name");
		tokenName.append(data.tokens[value].name);

		var tokenSymbol = document.createElement("p");
		tokenSymbol.setAttribute("class", "main-content__top-token-symbol")
		tokenSymbol.append(data.tokens[value].symbol);

		var tokenVolume = document.createElement("p");
		tokenVolume.setAttribute("class", "main-content__top-token-volume");
		tokenVolume.append("$ " + (data.tokens[value].volume / 1000000000).toFixed(2) + " M");

		var tokenPrice = document.createElement("p");
		tokenPrice.setAttribute("class", "main-content__top-token-price");
		tokenPrice.append("$ " + data.tokens[value].price.rate.toFixed(2));


		var tokenDifference = document.createElement("p");
		if (data.tokens[value].price.volDiff1 >= 0){
			tokenDifference.setAttribute("class", "main-content__top-token-price-diff24-greeen");
		} else {
			tokenDifference.setAttribute("class", "main-content__top-token-price-diff24-red");		
		}
		tokenDifference.append(data.tokens[value].price.volDiff1.toFixed(1) + " %");


		divWrapper.append(imgToken);
		divWrapper.append(tokenName);
		divWrapper.append(tokenSymbol);
		divWrapper.append(tokenVolume);
		divWrapper.append(tokenPrice);
		divWrapper.append(tokenDifference);
		topTokensData.append(divWrapper);
	}
	mainDiv.append(topTokensData);
}


function loadAdressHistoryToPage (data){
	var mainDiv = document.getElementById("second-data");
	mainDiv.innerHTML = '';

	var networkDivTitle = document.createElement("h2");
	networkDivTitle.setAttribute("class", "main-content__address-info-title");
	networkDivTitle.append(document.createTextNode("Address history"));

	mainDiv.append(networkDivTitle);

	var addressHistoryDiv = document.createElement("div");
	addressHistoryDiv.setAttribute("class", "main-content__address-history-wrapper")


	var divWrapper = document.createElement("div");
	divWrapper.setAttribute("class", "main-content__address-transaction-wrapper");

	var hashTitle = document.createElement("p");
	hashTitle.setAttribute("class", "main-content__address-history-hash");
	hashTitle.append(document.createTextNode("Hash of tx"));

	var dateTitle = document.createElement("p");
	dateTitle.setAttribute("class", "main-content__address-transaction-date");
	dateTitle.append(document.createTextNode("Date"));


	var fromTitle = document.createElement("p");
	fromTitle.setAttribute("class", "main-content__from-address");
	fromTitle.append(document.createTextNode("From"));

	var toTitle = document.createElement("p");
	toTitle.setAttribute("class", "main-content__to-address");
	toTitle.append(document.createTextNode("To"));

	var valueTitle = document.createElement("p");
	valueTitle.setAttribute("class", "main-content__value-transaction");
	valueTitle.append(document.createTextNode("Value"));

	divWrapper.append(hashTitle);
	divWrapper.append(dateTitle);
	divWrapper.append(fromTitle);
	divWrapper.append(toTitle);
	divWrapper.append(valueTitle);

	addressHistoryDiv.append(divWrapper);

	mainDiv.append(addressHistoryDiv);

	for (const value of data){
		var divWrapper = document.createElement("div");
		divWrapper.setAttribute("class", "main-content__address-transaction-wrapper");

		var hashTitle = document.createElement("p");
		hashTitle.setAttribute("class", "main-content__address-history-hash");
		hashTitle.append(document.createTextNode(value.hash));

		var dateTitle = document.createElement("p");
		dateTitle.setAttribute("class", "main-content__address-transaction-date");
		let date = new Date(value.timestamp * 1000).toLocaleDateString("en-US");
		let time = new Date(value.timestamp * 1000).toLocaleTimeString("en-US");
		console.log(date + time);

		dateTitle.append(document.createTextNode(date + " " + time));

		var fromTitle = document.createElement("p");
		fromTitle.setAttribute("class", "main-content__from-address");
		fromTitle.append(value.from);

		var toTitle = document.createElement("p");
		toTitle.setAttribute("class", "main-content__to-address");
		toTitle.append(value.to);

		var valueTitle = document.createElement("p");
		valueTitle.setAttribute("class", "main-content__value-transaction");
		valueTitle.append(value.value.toFixed(2) + " ETH");

		divWrapper.append(hashTitle);
		divWrapper.append(dateTitle);
		divWrapper.append(fromTitle);
		divWrapper.append(toTitle);
		divWrapper.append(valueTitle);

		addressHistoryDiv.append(divWrapper);
	}
	mainDiv.append(addressHistoryDiv);
}

function loadAddressBalanceToPage (data){
	var mainDiv = document.getElementById("first-data");
	mainDiv.innerHTML = '';


	var dashboardDivTitle = document.createElement("h2");
	dashboardDivTitle.setAttribute("class", "main-content__address-dashboard-title");
	dashboardDivTitle.append(document.createTextNode("Address info"));

	mainDiv.append(dashboardDivTitle);

	var addressInfoDiv = document.createElement("div");
	addressInfoDiv.setAttribute("class", "main-content__address-info-wrapper");	

	var infoWrapperDiv = document.createElement("div");
	infoWrapperDiv.setAttribute("class", "main-content__info-wrapper");


	var leftDiv = document.createElement("div");
	leftDiv.setAttribute("class", "main-content__dashboard-left-side");

	var balanceTitle = document.createElement("p");
	balanceTitle.setAttribute("class", "main-content__dashboard-balance-eth");
	balanceTitle.append(document.createTextNode("Balance: " + data.ETH.balance + " Ether"));

	var balanceToUsdTitle = document.createElement("p");
	balanceToUsdTitle.setAttribute("class", "main-content__dashboard-balance-usd");
	balanceToUsdTitle.append(document.createTextNode("Ether Value: " + (data.ETH.balance * data.ETH.price.rate).toFixed(2) + " $"));

	leftDiv.append(balanceTitle);
	leftDiv.append(balanceToUsdTitle);


	var rightDiv = document.createElement("div");
	rightDiv.setAttribute("class", "main-content__dashboard-right-side");

	var totalInTitile = document.createElement("p");
	totalInTitile.setAttribute("class", "main-content__dashboard-total-in-eth");
	totalInTitile.append(document.createTextNode("Total in:  " + data.ETH.totalIn));

	var totalOutTitle = document.createElement("p");
	totalOutTitle.setAttribute("class", "main-content__dashboard-balance-usd");
	totalOutTitle.append(document.createTextNode("Total out:  " + data.ETH.totalOut));

	rightDiv.append(totalInTitile);
	rightDiv.append(totalOutTitle);


	infoWrapperDiv.append(leftDiv);
	infoWrapperDiv.append(rightDiv);

	addressInfoDiv.append(infoWrapperDiv);

	mainDiv.append(addressInfoDiv);

}

function getMarketData (){
	fetch(API)
		.then((res) => res.json())
		.then((data) => {loadMarketToPage(data)});
}

function getTokensDataByVolume (){
	fetch(API_TOKENS_DATA)
		.then((res) => res.json())
		.then((data) => {loadTokensDataToPage(data)});
}

function getNetworkData (){
	fetch(API_NETWORK_DATA)
		.then((res) => res.json())
		.then((data) => {loadNetworkStatsToPage(data)});
}


function getAddressInfoData (address){
	let requestLink = API_ADDRESS_INFO + address + `?apiKey=freekey&showETHTotals=true`;
	fetch(requestLink)
		.then((res) => res.json())
		.then((data) => {loadAddressBalanceToPage(data)});
}

function getAddressHistoryData (address){
	let requestLink = API_ADDRESS_HISTORY + address + `?apiKey=freekey&limit=50`;
	fetch(requestLink)
		.then((res) => res.json())
		.then((data) => {loadAdressHistoryToPage(data, address)});
}

async function getAddressInfo (){
	let address = document.getElementById("address-search").value;
	await getAddressInfoData(address);
	await getAddressHistoryData(address);
}

async function main(){
	await getMarketData();
	await getNetworkData();
	await getTokensDataByVolume();
}

main();
