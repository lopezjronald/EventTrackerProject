package com.skilldistillery.trades.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.trades.entities.Trade;
import com.skilldistillery.trades.repositories.TradeRepository;

@Service
public class TradeServiceImpl implements TradeService {

	@Autowired
	private TradeRepository tradeRepo;
	
	@Override
	public List<Trade> findAll() {
		return tradeRepo.findAll();
	}

	@Override
	public Trade findById(int tradeId) {
		Optional<Trade> optionalTrade = tradeRepo.findById(tradeId);
		Trade managedTrade = null;
		if (optionalTrade.isPresent()) {
			managedTrade = optionalTrade.get();
		}
		return managedTrade;
	}

	@Override
	public Trade create(Trade trade) {
		return tradeRepo.save(trade);
	}
	
	@Override
	public Trade update(Trade trade, int tradeId) {
		Optional<Trade> optionalTrade = tradeRepo.findById(tradeId);
		Trade managedTrade = null;
		if (optionalTrade.isPresent()) {
			managedTrade = optionalTrade.get();
			managedTrade.setReferenceId(trade.getReferenceId());
			managedTrade.setTradeDate(trade.getTradeDate());
			managedTrade.setTimeOfTrade(trade.getTimeOfTrade());
			managedTrade.setUnderlying(trade.getUnderlying());
			managedTrade.setExpirationDate(trade.getExpirationDate());
			managedTrade.setStrikePrice(trade.getStrikePrice());
			managedTrade.setTradeType(trade.getTradeType());
			managedTrade.setOpenInterest(trade.getOpenInterest());
			managedTrade.setInd(trade.getInd());
			managedTrade.setExchangeCode(trade.getExchangeCode());
			managedTrade.setSpread(trade.getSpread());
			managedTrade.setPremiumPrice(trade.getPremiumPrice());
			managedTrade.setSize(trade.getSize());
			managedTrade.setBidSize(trade.getBidSize());
			managedTrade.setBidPrice(trade.getBidPrice());
			managedTrade.setAskPrice(trade.getAskPrice());
			managedTrade.setAskSize(trade.getAskSize());
			managedTrade.setEdge(trade.getEdge());
			managedTrade.setLeanSize(trade.getLeanSize());
			managedTrade.setSizeRatio(trade.getSizeRatio());
			managedTrade.setDelta(trade.getDelta());
			managedTrade.setTheta(trade.getTheta());
			managedTrade.setVega(trade.getVega());
			managedTrade.setGamma(trade.getGamma());
			managedTrade.setSigma(trade.getSigma());
			managedTrade.setRho(trade.getRho());
			tradeRepo.saveAndFlush(managedTrade);
		}
		return managedTrade;
	}

	@Override
	public boolean delete(int tradeId) {
		try {
			tradeRepo.deleteById(tradeId);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}















