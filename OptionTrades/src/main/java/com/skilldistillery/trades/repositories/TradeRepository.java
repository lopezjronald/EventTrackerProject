package com.skilldistillery.trades.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilldistillery.trades.entities.Trade;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Integer> {

	Trade findByReferenceId(int id);
	
}
