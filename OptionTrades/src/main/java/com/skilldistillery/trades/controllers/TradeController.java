package com.skilldistillery.trades.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PostMapping("trades")
	public Trade addTrade(@RequestBody Trade trade, HttpServletRequest request, HttpServletResponse response) {
		try {
			trade = tradeService.create(trade);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(trade.getId());
			response.setHeader("Location",  url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			trade = null;
		}
		return trade;
	}
	
	@PutMapping("trades/{id}")
	public Trade updateTrade(@PathVariable Integer id, @RequestBody Trade trade, HttpServletResponse response) {
		try {
			trade = tradeService.update(trade, id);
			if(trade == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			trade = null;
		}
		return trade;
	}
	
	@DeleteMapping("trades/{id}")
	public void deleteFilm(@PathVariable Integer id, HttpServletResponse response) {
		try {
			if (tradeService.delete(id)) {
				response.setStatus(204);
			} else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(409);
		}
	}
	
	
}































