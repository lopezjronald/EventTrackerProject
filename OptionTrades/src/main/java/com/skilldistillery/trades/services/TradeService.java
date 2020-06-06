package com.skilldistillery.trades.services;

import java.util.List;

import com.skilldistillery.trades.entities.Trade;

public interface TradeService {
	
	List <Trade> findAll();
	
	Trade findById(int tradeId);
	
	Trade create(Trade trade);
	
	Trade update(Trade trade, int tradeId);
	
	boolean delete(int tradeId);

}
