window.addEventListener("load", function () {
    init();
});

function init() {
    console.log("Init");

    document.tradeSearch.lookup.addEventListener("click", function (event) {
        event.preventDefault();

        var tradeId = document.tradeSearch.tradeId.value;
        if (!isNaN(tradeId) && tradeId > 0) {
            getTrade(tradeId);
        }
    });

    document.newTrade.addTrade.addEventListener("click", function (event) {
        event.preventDefault();
        createTradeToTrack();
    });

    getAllList();

}


function createTradeToTrack() {
    let newForm = document.newTrade;
    let trade = {};
    trade.referenceId = newForm.referenceId.value;
    trade.tradeDate = newForm.tradeDate.value;
    trade.timeOfTrade = newForm.timeOfTrade.value;
    trade.underlying = newForm.underlying.value;
    trade.expirationDate = newForm.expirationDate.value;
    trade.strikePrice = newForm.strikePrice.value;
    trade.tradeType = newForm.tradeType.value;
    trade.openInterest = newForm.openInterest.value;
    trade.ind = newForm.ind.value;
    trade.exchangeCode = newForm.exchangeCode.value;
    trade.spread = newForm.spread.value;
    trade.premiumPrice = newForm.premiumPrice.value;
    trade.size = newForm.size.value;
    trade.bidSize = newForm.bidSize.value;
    trade.bidPrice = newForm.bidPrice.value;
    trade.askPrice = newForm.askPrice.value;
    trade.askSize = newForm.askSize.value;
    trade.edge = newForm.edge.value;
    trade.leanSize = newForm.leanSize.value;
    trade.sizeRatio = newForm.sizeRatio.value;
    trade.delta = newForm.delta.value;
    trade.theta = newForm.theta.value;
    trade.vega = newForm.vega.value;
    trade.gamma = newForm.gamma.value;
    trade.sigma = newForm.sigma.value;
    trade.rho = newForm.rho.value;

    let tradeJson = JSON.stringify(trade);
    let xhr = new XMLHttpRequest();
    let uri = 'api/trades';

    xhr.open("POST", uri);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                let createdTrade = JSON.parse(xhr.responseText);
                getAllList();
            } else {
                if (xhr.status === 400) {
                    displayError("Invalid trade data, unable to create trade form ${tradeJson}");
                } else {
                    displayError("Unknown error creating log")
                }
            }
        }
    };
    xhr.send(tradeJson);
}

function retrieveUpdate(trade) {
    var updateDiv = document.getElementById("tradeEdit");

    let updateForm = document.createElement("form");
    updateForm.setAttribute("referenceId", "updateIdForm");

    let input1 = document.createElement("input");
    input1.setAttribute("type", "hidden");
    input1.setAttribute("name", "id");
    input1.setAttribute("value", trade.id);
    updateForm.appendChild(input1);

    let input2 = document.createElement("input");
    input2.setAttribute("type", "text");
    input2.setAttribute("name", "referenceId");
    input2.setAttribute("label", "Reference Id");;
//input2.setAttribute("value");
    input2.textContent = trade.referenceId;
    updateForm.appendChild(input2);

    let input3 = document.createElement("input");
    input3.setAttribute("type", "text");
    input3.setAttribute("name", "tradeDate");
//input3.setAttribute("value");
    input3.textContent = trade.tradeDate;
    updateForm.appendChild(input3);

    let input4 = document.createElement("input");
    input4.setAttribute("type", "text");
    input4.setAttribute("name", "timeOfTrade");
//input4.setAttribute("value");
    input4.textContent = trade.timeOfTrade;
    updateForm.appendChild(input4);

    let input5 = document.createElement("input");
    input5.setAttribute("type", "text");
    input5.setAttribute("name", "underlying");
//input5.setAttribute("value");
    input5.textContent = trade.underlying;
    updateForm.appendChild(input5);

    let input6 = document.createElement("input");
    input6.setAttribute("type", "text");
    input6.setAttribute("name", "expirationDate");
    first.appendChild(opt1);
//first.setAttribute("value");
    updateForm.appendChild(input6);


    var input8 = document.createElement("input");
    input8.setAttribute("type", "submit")
    input8.setAttribute("name", "updateTrade");
    input8.setAttribute("value", "Update It");
    updateForm.appendChild(input8);


    updateDiv.appendChild(updateForm);

    var tradeToUpdate = {};
    tradeToUpdate.id = updateForm.id.value;
    tradeToUpdate.referenceId = updateForm.referenceId.value;
    tradeToUpdate.timeOfTrade = updateForm.timeOfTrade.value;

    document.updateIdForm.updateTrade.addEventListener('click', function(event){
        event.preventDefault();
        updateTrade(tradeToUpdate);
    });
}

function updateTrade(trade) {
    let idToUpdate = trade.id;
    let xhr = new XMLHttpRequest();
    let uri = "api/trades/" + idToUpdate;
    xhr.open("PUT", uri);
    xhr.setRequestHeader("Content-type", "application/json");
    let currentUpdate = JSON.stringify(trade);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status < 300) {
                let updatedTrade = xhr.responseText;
                getAllList();
            } else {
                displayError("Update Error");
            }
        }
    }
    xhr.send(currentUpdate);
}

function deleteTrade(trade) {
    let idToDelete = trade.id;
    let xhr = new XMLHttpRequest();
    let uri = "api/trades/" + idToDelete;
    xhr.open("DELETE", uri);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200 || xhr.status == 204) {
                getAllList();
                var dataDiv = document.getElementById("tradeData");
                dataDiv.textContent = '';
            } else {
                displayError("Error deleting: " + xhr.status + ":" + xhr.responseText);
            }
        }
    }
    xhr.send();
}

function getTrade(tradeId) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "api/trades/" + tradeId);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let dataJSON = xhr.responseText;
                let data = JSON.parse(dataJSON);
                console.log(data);
                displayTrade(data); // calls method below to actually display data

            } else {
                if (xhr.status === 404) {
                    let dataDiv = document.getElementById('tradeData');
                    dataDiv.textContent = '';
                    displayError('Record not found');
                } else {
                    displayError('Error retrieving cycle record ' + tradeId);
                }
            }

        }
        ;

    }
    xhr.send(null);
}

function displayTrade(trade) {
    let ErrorDiv = document.getElementById('ErrorData');
    ErrorDiv.textContent = '';
    var dataDiv = document.getElementById('tradeData');
    dataDiv.textContent = '';

    let referenceId = document.createElement("h1");
    referenceId.textContent = 'Reference ID: ' + trade.referenceId;
    dataDiv.appendChild(referenceId);

    let tradeDate = document.createElement('blockquote');
    tradeDate.textContent = 'Date of Trade: ' + trade.tradeDate;
    dataDiv.appendChild(tradeDate);

    let timeOfTrade = document.createElement('blockquote');
    timeOfTrade.textContent = 'Time of Trade: ' + trade.timeOfTrade;
    dataDiv.appendChild(timeOfTrade);

    let underlying = document.createElement('blockquote');
    underlying.textContent = 'Period Duration(days): ' + trade.underlying;
    dataDiv.appendChild(underlying);

    let expirationDate = document.createElement('blockquote');
    expirationDate.textContent = 'Expiration Date: ' + trade.expirationDate;
    dataDiv.appendChild(expirationDate);

    let strikePrice = document.createElement('blockquote');
    strikePrice.textContent = 'Strike Price: ' + trade.strikePrice;
    dataDiv.appendChild(strikePrice);

    let tradeType = document.createElement('blockquote');
    tradeType.textContent = 'Trade Type: ' + trade.tradeType;
    dataDiv.appendChild(tradeType);

    let openInterest = document.createElement('blockquote');
    openInterest.textContent = 'Strike Price: ' + trade.openInterest;
    dataDiv.appendChild(openInterest);

    let ind = document.createElement('blockquote');
    ind.textContent = 'Strike Price: ' + trade.ind;
    dataDiv.appendChild(ind);

    let exchangeCode = document.createElement('blockquote');
    exchangeCode.textContent = 'Strike Price: ' + trade.exchangeCode;
    dataDiv.appendChild(exchangeCode);

    let spread = document.createElement('blockquote');
    spread.textContent = 'Strike Price: ' + trade.spread;
    dataDiv.appendChild(spread);

    let premiumPrice = document.createElement('blockquote');
    premiumPrice.textContent = 'Strike Price: ' + trade.premiumPrice;
    dataDiv.appendChild(premiumPrice);

    let size = document.createElement('blockquote');
    size.textContent = 'Strike Price: ' + trade.size;
    dataDiv.appendChild(size);

    let bidSize = document.createElement('blockquote');
    bidSize.textContent = 'Strike Price: ' + trade.bidSize;
    dataDiv.appendChild(bidSize);

    let bidPrice = document.createElement('blockquote');
    bidPrice.textContent = 'Strike Price: ' + trade.bidPrice;
    dataDiv.appendChild(bidPrice);

    let askPrice = document.createElement('blockquote');
    askPrice.textContent = 'Strike Price: ' + trade.askPrice;
    dataDiv.appendChild(askPrice);

    let askSize = document.createElement('blockquote');
    askSize.textContent = 'Strike Price: ' + trade.askSize;
    dataDiv.appendChild(askSize);

    let edge = document.createElement('blockquote');
    edge.textContent = 'Strike Price: ' + trade.edge;
    dataDiv.appendChild(edge);

    let leanSize = document.createElement('blockquote');
    leanSize.textContent = 'Strike Price: ' + trade.leanSize;
    dataDiv.appendChild(leanSize);

    let sizeRatio = document.createElement('blockquote');
    sizeRatio.textContent = 'Strike Price: ' + trade.sizeRatio;
    dataDiv.appendChild(sizeRatio);

    let delta = document.createElement('blockquote');
    delta.textContent = 'Strike Price: ' + trade.delta;
    dataDiv.appendChild(delta);

    let theta = document.createElement('blockquote');
    theta.textContent = 'Strike Price: ' + trade.theta;
    dataDiv.appendChild(theta);

    let vega = document.createElement('blockquote');
    vega.textContent = 'Strike Price: ' + trade.vega;
    dataDiv.appendChild(vega);

    let gamma = document.createElement('blockquote');
    gamma.textContent = 'Strike Price: ' + trade.gamma;
    dataDiv.appendChild(gamma);

    let sigma = document.createElement('blockquote');
    sigma.textContent = 'Strike Price: ' + trade.sigma;
    dataDiv.appendChild(sigma);

    let rho = document.createElement('blockquote');
    rho.textContent = 'Strike Price: ' + trade.rho;
    dataDiv.appendChild(rho);

    let updateBtn = document.createElement('button');
    updateBtn.name = 'updateBtn';
    updateBtn.id = 'updateBtn';
    updateBtn.textContent = 'Update Trade';
    dataDiv.appendChild(updateBtn);
    updateBtn.addEventListener('click', function () {
        retrieveUpdate(trade);
    });

    let deleteBtn = document.createElement('button');
    deleteBtn.referenceId = 'deleteBtn';
    deleteBtn.id = 'deleteBtn';
    deleteBtn.textContent = 'Delete';
    dataDiv.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', function () {
        deleteTrade(trade);
    });
}

function displayError(message) {
    let div = document.getElementById('ErrorData');
    div.style.color = 'red';
    div.style.fontFamily = 'American Typewriter';
    div.textContent = message;
}

function getAllList() {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/trades/');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let tradeJSON = xhr.responseText;
                let data = JSON.parse(tradeJSON);

                displayAll(data);
            } else if (xhr.status === 404) {
                displayError('Invalid trading log ' + tradeJSON);
            } else {
                displayError('error: ' + xhr.status)
            }
        }
    };
    xhr.send();
}

function displayAll(trade) {

    let dataDiv = document.getElementById('tradeList');
    dataDiv.textContent = '';

    let table = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tRow = document.createElement('tr');
    let tableH = document.createElement('th')
    tableH.textContent = 'ID';
    tRow.appendChild(tableH);
    th0 = document.createElement('th');
    th0.textContent = "Reference ID";
    tRow.appendChild(th0);
    th1 = document.createElement('th');
    th1.textContent = 'Date of Trde';
    tRow.appendChild(th1);
    th2 = document.createElement('th');
    th2.textContent = 'Time of Trade';
    tRow.appendChild(th2);
    th3 = document.createElement('th');
    th3.textContent = 'Underlying';
    tRow.appendChild(th3);
    th4 = document.createElement('th');
    th4.textContent = 'Expiration Date';
    tRow.appendChild(th4);
    th5 = document.createElement('th');
    th5.textContent = 'Strike Price';
    tRow.appendChild(th5);
    th6 = document.createElement('th');
    th6.textContent = 'Type of Trade';
    tRow.appendChild(th6);
    th7 = document.createElement('th');
    th7.textContent = 'Open Interest';
    tRow.appendChild(th7);
    th8 = document.createElement('th');
    th8.textContent = 'Ind';
    tRow.appendChild(th8);
    th9 = document.createElement('th');
    th9.textContent = 'Exchange Code';
    tRow.appendChild(th9);
    th10 = document.createElement('th');
    th10.textContent = 'Spread';
    tRow.appendChild(th10);
    th11 = document.createElement('th');
    th11.textContent = 'Premium Price';
    tRow.appendChild(th11);
    th12 = document.createElement('th');
    th12.textContent = 'Size';
    tRow.appendChild(th12);
    th13 = document.createElement('th');
    th13.textContent = 'Bid Size';
    tRow.appendChild(th13);
    th14 = document.createElement('th');
    th14.textContent = 'Bid Price';
    tRow.appendChild(th14);
    th15 = document.createElement('th');
    th15.textContent = 'Ask Price';
    tRow.appendChild(th15);
    th16 = document.createElement('th');
    th16.textContent = 'Ask Size';
    tRow.appendChild(th16);
    th17 = document.createElement('th');
    th17.textContent = 'Edge';
    tRow.appendChild(th17);
    th18 = document.createElement('th');
    th18.textContent = 'Lean Size';
    tRow.appendChild(th18);
    th19 = document.createElement('th');
    th19.textContent = 'Size Ratio';
    tRow.appendChild(th19);
    th20 = document.createElement('th');
    th20.textContent = 'Delta';
    tRow.appendChild(th20);
    th21 = document.createElement('th');
    th21.textContent = 'Theta';
    tRow.appendChild(th21);
    th22 = document.createElement('th');
    th22.textContent = 'Vega';
    tRow.appendChild(th22);
    th23 = document.createElement('th');
    th23.textContent = 'Gamma';
    tRow.appendChild(th23);
    th24 = document.createElement('th');
    th24.textContent = 'Sigma';
    tRow.appendChild(th24);
    th25 = document.createElement('th');
    th25.textContent = 'Rho';
    tRow.appendChild(th25);

    tableHead.appendChild(tRow);
    table.appendChild(tableHead);


    let tableBody = document.createElement('tbody');
    trade.forEach(element => {
        console.log(element);

        tr1 = document.createElement('tr');

        td0 = document.createElement('td')
        td0.textContent = element.id;
        tr1.appendChild(td0);

        td = document.createElement('td')
        td.textContent = element.referenceId;
        tr1.appendChild(td);

        td1 = document.createElement('td')
        td1.textContent = element.tradeDate;
        tr1.appendChild(td1);

        td2 = document.createElement('td')
        td2.textContent = element.timeOfTrade;
        tr1.appendChild(td2);

        td3 = document.createElement('td')
        td3.textContent = element.underlying;
        tr1.appendChild(td3);

        td4 = document.createElement('td')
        td4.textContent = element.expirationDate;
        tr1.appendChild(td4);

        td5 = document.createElement('td')
        td5.textContent = element.strikePrice;
        tr1.appendChild(td5);

        td6 = document.createElement('td')
        td6.textContent = element.tradeType;
        tr1.appendChild(td6);

        td7 = document.createElement('td')
        td7.textContent = element.openInterest;
        tr1.appendChild(td7)

        td8 = document.createElement('td')
        td8.textContent = element.ind;
        tr1.appendChild(td8);

        td9 = document.createElement('td')
        td9.textContent = element.exchangeCode;
        tr1.appendChild(td9);

        td10 = document.createElement('td')
        td10.textContent = element.spread;
        tr1.appendChild(td10);

        td11 = document.createElement('td')
        td11.textContent = element.premiumPrice;
        tr1.appendChild(td11);

        td12 = document.createElement('td')
        td12.textContent = element.size;
        tr1.appendChild(td12);

        td13 = document.createElement('td')
        td13.textContent = element.bidSize;
        tr1.appendChild(td13);

        td14 = document.createElement('td')
        td14.textContent = element.bidPrice;
        tr1.appendChild(td14);

        td15 = document.createElement('td')
        td15.textContent = element.askPrice;
        tr1.appendChild(td15);

        td16 = document.createElement('td')
        td16.textContent = element.askSize;
        tr1.appendChild(td16);

        td17 = document.createElement('td')
        td17.textContent = element.edge;
        tr1.appendChild(td17);

        td18 = document.createElement('td')
        td18.textContent = element.leanSize;
        tr1.appendChild(td18);

        td19 = document.createElement('td')
        td19.textContent = element.sizeRatio;
        tr1.appendChild(td19);

        td20 = document.createElement('td')
        td20.textContent = element.delta;
        tr1.appendChild(td20);

        td21 = document.createElement('td')
        td21.textContent = element.theta;
        tr1.appendChild(td21);

        td22 = document.createElement('td')
        td22.textContent = element.vega;
        tr1.appendChild(td22);

        td23 = document.createElement('td')
        td23.textContent = element.gamma;
        tr1.appendChild(td23);

        td24 = document.createElement('td')
        td24.textContent = element.sigma;
        tr1.appendChild(td24);

        td25 = document.createElement('td')
        td25.textContent = element.rho;
        tr1.appendChild(td25);

        tableBody.appendChild(tr1);

        //Add Event Listener
        tr1.addEventListener('click', function (event) {
            event.preventDefault();

            getTrade(element.id);
        });
        //**************************************** */
    });
    table.appendChild(tableBody);
    dataDiv.appendChild(table);
}
//
//
// function loadTradeList() {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "api/trades");
//
//     xhr.onreadystatechange = function () {
//         if (xhr.status === 400 && xhr.readyState === 4) {
//             var tradesToShow = JSON.parse(xhr.responseText);
//             displayTrades(tradesToShow);
//         } else if (xhr.status >= 400) {
//             console.error('Trade not found');
//             var noTrades = document.getElementById('tradeList');
//             noTrades.textContent = 'There are no trades';
//         }
//     }
//     xhr.send();
// }
//
// function displayTrade(trades) {
//     var tradeList = document.getElementById("tradeList");
//     tradeList.textContent = '';
//
//     let tradeItemsTable = document.createElement('table');
//     tradeItemsTable.id = 'tradeItemsTable';
//     let id = document.createElement('h3');
//     let referenceId = document.createElement('h3');
//     let tradeDate = document.createElement('h3');
//     let timeOfTrade = document.createElement('h3');
//     let underlying = document.createElement('h3');
//     let expirationDate = document.createElement('h3');
//     let strikePrice = document.createElement('h3');
//     let tradeType = document.createElement('h3');
//     let openInterest = document.createElement('h3');
//     let ind = document.createElement('h3');
//     let exchangeCode = document.createElement('h3');
//     let spread = document.createElement('h3');
//     let premiumPrice = document.createElement('h3');
//     let size = document.createElement('h3');
//     let bidSize = document.createElement('h3');
//     let bidPrice = document.createElement('h3');
//     let askPrice = document.createElement('h3');
//     let askSize = document.createElement('h3');
//     let edge = document.createElement('h3');
//     let leanSize = document.createElement('h3');
//     let sizeRatio = document.createElement('h3');
//     let delta = document.createElement('h3');
//     let theta = document.createElement('h3');
//     let vega = document.createElement('h3');
//     let gamma = document.createElement('h3');
//     let sigma = document.createElement('h3');
//     let rho = document.createElement('h3');
//
//     id.textContent = "ID: " + trade.id;
//     referenceId.textContent = "Reference ID: " + trade.referenceId;
//     tradeDate.textContent = "Date of Trade: " + trade.tradeDate;
//     timeOfTrade.textContent = "Time of Trade: " + trade.timeOfTrade;
//     underlying.textContent = "Underlying: " + trade.underlying;
//     expirationDate.textContent = "Expiration Date: " + trade.expirationDate;
//     strikePrice.textContent = "Strike Price: $ " + trade.strikePrice;
//     tradeType.textContent = "Type of Trade: " + trade.tradeType;
//     openInterest.textContent = "Open Interest: $ " + trade.openInterest;
//     ind.textContent = "Ind: " + trade.ind;
//     exchangeCode.textContent = "Exchange Code: " + trade.exchangeCode;
//     spread.textContent = "Spread: " + trade.spread;
//     premiumPrice.textContent = "Premium Price: $ " + trade.premiumPrice;
//     size.textContent = "Size: " + trade.size;
//     bidSize.textContent = "Bid Size: " + trade.bidSize;
//     bidPrice.textContent = "Bid Price: $ " + trade.bidPrice;
//     askPrice.textContent = "Ask Price: $ " + trade.askPrice;
//     askSize.textContent = "Ask Size: " + trade.askSize;
//     edge.textContent = "Edge: " + trade.edge;
//     leanSize.textContent = "Lean Size: " + trade.leanSize;
//     sizeRatio.textContent = "Size Ratio: " + trade.sizeRatio;
//     delta.textContent = "Delta: $ " + trade.delta;
//     theta.textContent = "Theta: $ " + trade.theta;
//     vega.textContent = "Vega: $ " + trade.vega;
//     gamma.textContent = "Gamma: $ " + trade.gamma;
//     sigma.textContent = "Sigma: $ " + trade.sigma;
//     rho.textContent = "Rho: $ " + trade.rho;
//
//     dataDiv.appendChild(id);
//     dataDiv.appendChild(referenceId);
//     dataDiv.appendChild(tradeDate);
//     dataDiv.appendChild(timeOfTrade);
//     dataDiv.appendChild(underlying);
//     dataDiv.appendChild(expirationDate);
//     dataDiv.appendChild(strikePrice);
//     dataDiv.appendChild(tradeType);
//     dataDiv.appendChild(openInterest);
//     dataDiv.appendChild(ind);
//     dataDiv.appendChild(exchangeCode);
//     dataDiv.appendChild(spread);
//     dataDiv.appendChild(premiumPrice);
//     dataDiv.appendChild(size);
//     dataDiv.appendChild(bidSize);
//     dataDiv.appendChild(bidPrice);
//     dataDiv.appendChild(askPrice);
//     dataDiv.appendChild(askSize);
//     dataDiv.appendChild(edge);
//     dataDiv.appendChild(leanSize);
//     dataDiv.appendChild(sizeRatio);
//     dataDiv.appendChild(delta);
//     dataDiv.appendChild(theta);
//     dataDiv.appendChild(vega);
//     dataDiv.appendChild(gamma);
//     dataDiv.appendChild(sigma);
//     dataDiv.appendChild(rho);
// }
//
// // window.addEventListener('load', function () {
// //     init();
// // });
// //
// // function init() {
// //     document.tradeForm.lookup.addEventListener("click", function (event) {
// //         event.preventDefault();
// //         var tradeId = document.tradeForm.tradeId.value;
// //         if (!isNaN(tradeId) && tradeId > 0) {
// //             getTrade(tradeId);
// //         }
// //     });
// //     document.newTradeForm.addTrade.addEventListener("click", function(event) {
// //
// //         event.preventDefault();
// //         addTrade();
// //     });
// //     document.tradeForm.deleteTrade.addEventListener("click", function (event) {
// //         event.preventDefault();
// //         var tradeId = document.deleteForm.tradeId.value;
// //         if (!isNaN(tradeId) && tradeId > 0) {
// //             deleteTrade(tradeId);
// //         }
// //     });
// //     document.tradeForm.updateTrade.addEventListener("click", function (event) {
// //         event.preventDefault();
// //         var tradeId = document.updateForm.tradeId.value;
// //         if (!isNaN(tradeId) && tradeId > 0) {
// //             updateTrade(tradeId);
// //         }
// //     });
// // }
// //
// //
// // function getTrade(tradeId) {
// //     console.log('getTrade called')
// //     let xhr = new XMLHttpRequest();
// //     xhr.open('GET', 'api/trades/' + tradeId);
// //     xhr.onreadystatechange = function () {
// //         if (xhr.readyState === 4) {
// //             if (xhr.status === 200) {
// //                 let tradeJson = xhr.responseText;
// //                 let trade = JSON.parse(tradeJson);
// //                 console.log(trade);
// //                 displayTrade(trade);
// //             } else {
// //                 if (xhr.status === 404) {
// //                     displayError("Trade Not Found");
// //                 } else {
// //                     displayError("Error Retrieving Trade " + tradeId);
// //                 }
// //             }
// //         }
// //     };
// //     xhr.send();
// // }
// //
//
// // function displayError(message) {
// //     var dataDiv = document.getElementById('tradeData');
// //     dataDiv.textContent = message;
// // }
// //
// // function addTrade() {
// // let form = document.newTradeForm;
// // let trade = {};
// // trade.referenceId = form.referenceId.value;
// // trade.tradeDate = form.tradeDate.value;
// // trade.timeOfTrade = form.timeOfTrade.value;
// // trade.underlying = form.underlying.value;
// // trade.expirationDate = form.expirationDate.value;
// // trade.strikePrice = form.strikePrice.value;
// // trade.tradeType = form.tradeType.value;
// // trade.openInterest = form.openInterest.value;
// // trade.ind = form.ind.value;
// // trade.exchangeCode = form.exchangeCode.value;
// // trade.spread = form.spread.value;
// // trade.premiumPrice = form.premiumPrice.value;
// // trade.size = form.size.value;
// // trade.bidSize = form.bidSize.value;
// // trade.bidPrice = form.bidPrice.value;
// // trade.askPrice = form.askPrice.value;
// // trade.askSize = form.askSize.value;
// // trade.edge = form.edge.value;
// // trade.leanSize = form.leanSize.value;
// // trade.sizeRatio = form.sizeRatio.value;
// // trade.delta = form.delta.value;
// // trade.theta = form.theta.value;
// // trade.vega = form.vega.value;
// // trade.gamma = form.gamma.value;
// // trade.sigma = form.sigma.value;
// // trade.rho = form.rho.value;
// //     console.log("createTrade(): ");
// //     console.log(trade);
// //     postTrade(trade);
// // }
// //
// // function postTrade(trade) {
// //     let tradeJson = JSON.stringify(trade);
// //     let xhr = new XMLHttpRequest();
// //     let uri = 'api/trades';
// //     xhr.open('POST', uri);
// //     xhr.setRequestHeader("Content-type", "application/json");
// //     xhr.onreadystatechange = function () {
// //         if (xhr.readyState === 4) {
// //             if (xhr.status === 400 || xhr.status === 201) {
// //                 let createdTrade = JSON.parse(xhr.responseText);
// //                 displayTrade(createdTrade);
// //             } else {
// //                 if (xhr.status === 400) {
// //                     displayError("Invalid Trade Data, Unable to Create New Trade from <pre>${tradeJson}</pre>")
// //                 } else {
// //                     displayError("Unknown error creating trade: " + xhr.status);
// //                 }
// //             }
// //         }
// //     };
// //     xhr.send(tradeJson);
// // }
// //
// // function updateTrade(tradeId) {
// //     let form = document.newTradeForm;
// //     let trade = {};
// //     trade.referenceId = form.referenceId.value;
// //     trade.tradeDate = form.tradeDate.value;
// //     trade.timeOfTrade = form.timeOfTrade.value;
// //     trade.underlying = form.underlying.value;
// //     trade.expirationDate = form.expirationDate.value;
// //     trade.strikePrice = form.strikePrice.value;
// //     trade.tradeType = form.tradeType.value;
// //     trade.openInterest = form.openInterest.value;
// //     trade.ind = form.ind.value;
// //     trade.exchangeCode = form.exchangeCode.value;
// //     trade.spread = form.spread.value;
// //     trade.premiumPrice = form.premiumPrice.value;
// //     trade.size = form.size.value;
// //     trade.bidSize = form.bidSize.value;
// //     trade.bidPrice = form.bidPrice.value;
// //     trade.askPrice = form.askPrice.value;
// //     trade.askSize = form.askSize.value;
// //     trade.edge = form.edge.value;
// //     trade.leanSize = form.leanSize.value;
// //     trade.sizeRatio = form.sizeRatio.value;
// //     trade.delta = form.delta.value;
// //     trade.theta = form.theta.value;
// //     trade.vega = form.vega.value;
// //     trade.gamma = form.gamma.value;
// //     trade.sigma = form.sigma.value;
// //     trade.rho = form.rho.value;
// //     putTrade(trade, tradeId);
// // }
// //
// //
// // function putTrade(trade, tradeId) {
// //     console.log('putTrade called')
// //     let xhr = new XMLHttpRequest();
// //     xhr.open('PUT', 'api/trades/' + tradeId);
// //     xhr.setRequestHeader("Content-type", "application/json");
// //     let tradeJSON = JSON.stringify(trade);
// //     xhr.onreadystatechange = function () {
// //         if (xhr.readyState === 4) {
// //             if (xhr.status === 200 || xhr.status === 201) {
// //                 try {
// //                     var updateTrade = JSON.parse(xhr.responseText);
// //                     loadTradeList();
// //                 }
// //                 let tradeJson = xhr.responseText;
// //                 let trade = JSON.parse(tradeJson);
// //                 console.log(trade);
// //                 displayTrade(trade);
// //             } else {
// //                 if (xhr.status === 404) {
// //                     displayError("Trade Not Found");
// //                 } else {
// //                     displayError("Error Retrieving Trade " + tradeId);
// //                 }
// //             }
// //         }
// //     };
// //     xhr.send();
// // }
// //
// // function deleteTrade(tradeId) {
// //     console.log('deleteTrade called')
// //     let xhr = new XMLHttpRequest();
// //     xhr.open('DELETE', 'api/trades/' + tradeId);
// //     xhr.onreadystatechange = function () {
// //         if (xhr.readyState === 4) {
// //             if (xhr.status === 200) {
// //                 let tradeJson = xhr.responseText;
// //                 let trade = JSON.parse(tradeJson);
// //                 console.log(trade);
// //                 displayTrade(trade);
// //             } else {
// //                 if (xhr.status === 404) {
// //                     displayError("Trade Not Found");
// //                 } else {
// //                     displayError("Error Retrieving Trade " + tradeId);
// //                 }
// //             }
// //         }
// //     };
// //     xhr.send();
// // }
// //
// //
// //
// //
// //
// //
// //
// //
//
//
//
//
//
//
//
//
//
//
//
//
//
