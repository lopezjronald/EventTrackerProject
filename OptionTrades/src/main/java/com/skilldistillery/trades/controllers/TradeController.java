package com.skilldistillery.trades.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.trades.entities.Trade;
import com.skilldistillery.trades.services.TradeService;

@RestController
@RequestMapping("api")
public class TradeController {

	@Autowired
	private TradeService tradeService;
	
	@GetMapping("trades")
	public List<Trade> index() {
		return tradeService.findAll();
	}
	
	@GetMapping("trades/{id}")
	public Trade show(@PathVariable Integer id, HttpServletResponse response) {
		Trade trade = tradeService.findById(id);
		if (trade == null) {
			response.setStatus(4040);
		}
		return trade;
	}
	
}
