import React, { Component } from "react";

export function createGameUrlSlug(game_slug){
	return game_slug.replace("_", "-");
}

export function	createResultLink(game){
	return "/"+createGameUrlSlug(game.slug)+"/draw-"+( (game.results && game.results.length)? game.results[0].draw_id:"" ) 
}

export function	renderDividends(dividends, type = 'lotto_dividends'){
	if( dividends ){
		dividends = JSON.parse(dividends);
		return (
			<div className="dividends-table" dangerouslySetInnerHTML={{ __html: dividends[type]}}></div>
		)
	}
}

export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
}


export function buyNowUrl(game_slug) {
  try {
    let support = "";
      switch(game_slug) {
      case "lotto":
          support = "https://www.national-lottery.co.uk/games/lotto";
          break;
      case "hotpicks":
          support = "https://www.national-lottery.co.uk/games/lotto-hotpicks";
          break;
      case "euro_millions":
           support = "https://www.national-lottery.co.uk/games/euromillions";
          break;
      case "euromillions_hotpick":
           support = "https://www.national-lottery.co.uk/games/euromillions-hotpicks";
          break;
      case "thunderball":
           support = "https://www.national-lottery.co.uk/games/thunderball";
          break;
      case "49lottery":
            support = "http://www.49s.co.uk/";          
          break;
      case "postcode_daily":
          support = "https://www.postcodelottery.co.uk/play";
          break;
      case "postcode_weekly":
         support = "https://www.postcodelottery.co.uk/play";
          break;
      case "postcode_monthly":
          support = "https://www.postcodelottery.co.uk/play";
          break;
      case "health_lottery":
          support = "https://www.healthlottery.co.uk/play-now/";
          break;           
      default:
           break;
    } 
    return   support;
  } catch (e) {
    console.log(e)
  }
};

