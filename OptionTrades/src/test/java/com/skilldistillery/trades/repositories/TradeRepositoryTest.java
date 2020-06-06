package com.skilldistillery.trades.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.skilldistillery.trades.entities.Trade;

@SpringBootTest
public class TradeRepositoryTest {
	
	@Autowired
	private TradeRepository repo;
	
	@Test
	void test_findByReferenceId() {
		Trade trade = repo.findByReferenceId(281400577);
		assertNotNull(trade);
		assertEquals(1, trade.getId());
	}

}
