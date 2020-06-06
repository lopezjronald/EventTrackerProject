package com.skilldistillery.trades.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Trade {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "reference_id")
	private int referenceId;

	@Column(name = "trade_date")
	private String tradeDate;

	@Column(name = "time_of_trade")
	private String timeOfTrade;

	@Column(name = "underlying")
	private String underlying;

	@Column(name = "expiration_date")
	private String expirationDate;

	@Column(name = "strike_price")
	private double strikePrice;

	@Column(name = "trade_type")
	private String tradeType;

	@Column(name = "open_interest")
	private int openInterest;

	@Column(name = "ind")
	private String ind;

	@Column(name = "exchange_code")
	private String exchangeCode;

	@Column(name = "spread")
	private double spread;

	@Column(name = "premium_price")
	private double premiumPrice;

	@Column(name = "size")
	private int size;

	@Column(name = "bid_size")
	private int bidSize;

	@Column(name = "bid_price")
	private double bidPrice;

	@Column(name = "ask_price")
	private double askPrice;

	@Column(name = "ask_size")
	private int askSize;

	@Column(name = "edge")
	private String edge;

	@Column(name = "lean_size")
	private int leanSize;

	@Column(name = "size_ratio")
	private String sizeRatio;

	@Column(name = "delta")
	private double delta;

	@Column(name = "theta")
	private double theta;

	@Column(name = "vega")
	private double vega;

	@Column(name = "gamma")
	private double gamma;

	@Column(name = "sigma")
	private double sigma;

	@Column(name = "rho")
	private double rho;

	public Trade() {
	}

	public Trade(int referenceId, String tradeDate, String timeOfTrade, String underlying, String expirationDate,
			double strikePrice, String tradeType, int openInterest, String ind, String exchangeCode, double spread,
			double premiumPrice, int size, int bidSize, double bidPrice, double askPrice, int askSize, String edge,
			int leanSize, String sizeRatio, double delta, double theta, double vega, double gamma, double sigma,
			double rho) {
		this.referenceId = referenceId;
		this.tradeDate = tradeDate;
		this.timeOfTrade = timeOfTrade;
		this.underlying = underlying;
		this.expirationDate = expirationDate;
		this.strikePrice = strikePrice;
		this.tradeType = tradeType;
		this.openInterest = openInterest;
		this.ind = ind;
		this.exchangeCode = exchangeCode;
		this.spread = spread;
		this.premiumPrice = premiumPrice;
		this.size = size;
		this.bidSize = bidSize;
		this.bidPrice = bidPrice;
		this.askPrice = askPrice;
		this.askSize = askSize;
		this.edge = edge;
		this.leanSize = leanSize;
		this.sizeRatio = sizeRatio;
		this.delta = delta;
		this.theta = theta;
		this.vega = vega;
		this.gamma = gamma;
		this.sigma = sigma;
		this.rho = rho;
	}

	public int getReferenceId() {
		return referenceId;
	}

	public void setReferenceId(int referenceId) {
		this.referenceId = referenceId;
	}

	public String getTradeDate() {
		return tradeDate;
	}

	public void setTradeDate(String tradeDate) {
		this.tradeDate = tradeDate;
	}

	public String getTimeOfTrade() {
		return timeOfTrade;
	}

	public void setTimeOfTrade(String timeOfTrade) {
		this.timeOfTrade = timeOfTrade;
	}

	public String getUnderlying() {
		return underlying;
	}

	public void setUnderlying(String underlying) {
		this.underlying = underlying;
	}

	public String getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}

	public double getStrikePrice() {
		return strikePrice;
	}

	public void setStrikePrice(double strikePrice) {
		this.strikePrice = strikePrice;
	}

	public String getTradeType() {
		return tradeType;
	}

	public void setTradeType(String tradeType) {
		this.tradeType = tradeType;
	}

	public int getOpenInterest() {
		return openInterest;
	}

	public void setOpenInterest(int openInterest) {
		this.openInterest = openInterest;
	}

	public String getInd() {
		return ind;
	}

	public void setInd(String ind) {
		this.ind = ind;
	}

	public String getExchangeCode() {
		return exchangeCode;
	}

	public void setExchangeCode(String exchangeCode) {
		this.exchangeCode = exchangeCode;
	}

	public double getSpread() {
		return spread;
	}

	public void setSpread(double spread) {
		this.spread = spread;
	}

	public double getPremiumPrice() {
		return premiumPrice;
	}

	public void setPremiumPrice(double premiumPrice) {
		this.premiumPrice = premiumPrice;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public int getBidSize() {
		return bidSize;
	}

	public void setBidSize(int bidSize) {
		this.bidSize = bidSize;
	}

	public double getBidPrice() {
		return bidPrice;
	}

	public void setBidPrice(double bidPrice) {
		this.bidPrice = bidPrice;
	}

	public double getAskPrice() {
		return askPrice;
	}

	public void setAskPrice(double askPrice) {
		this.askPrice = askPrice;
	}

	public int getAskSize() {
		return askSize;
	}

	public void setAskSize(int askSize) {
		this.askSize = askSize;
	}

	public String getEdge() {
		return edge;
	}

	public void setEdge(String edge) {
		this.edge = edge;
	}

	public int getLeanSize() {
		return leanSize;
	}

	public void setLeanSize(int leanSize) {
		this.leanSize = leanSize;
	}

	public String getSizeRatio() {
		return sizeRatio;
	}

	public void setSizeRatio(String sizeRatio) {
		this.sizeRatio = sizeRatio;
	}

	public double getDelta() {
		return delta;
	}

	public void setDelta(double delta) {
		this.delta = delta;
	}

	public double getTheta() {
		return theta;
	}

	public void setTheta(double theta) {
		this.theta = theta;
	}

	public double getVega() {
		return vega;
	}

	public void setVega(double vega) {
		this.vega = vega;
	}

	public double getGamma() {
		return gamma;
	}

	public void setGamma(double gamma) {
		this.gamma = gamma;
	}

	public double getSigma() {
		return sigma;
	}

	public void setSigma(double sigma) {
		this.sigma = sigma;
	}

	public double getRho() {
		return rho;
	}

	public void setRho(double rho) {
		this.rho = rho;
	}

	public int getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Trade [id=" + id + ", referenceId=" + referenceId + ", tradeDate=" + tradeDate + ", timeOfTrade="
				+ timeOfTrade + ", underlying=" + underlying + ", expirationDate=" + expirationDate + ", strikePrice="
				+ strikePrice + ", tradeType=" + tradeType + ", openInterest=" + openInterest + ", ind=" + ind
				+ ", exchangeCode=" + exchangeCode + ", spread=" + spread + ", premiumPrice=" + premiumPrice + ", size="
				+ size + ", bidSize=" + bidSize + ", bidPrice=" + bidPrice + ", askPrice=" + askPrice + ", askSize="
				+ askSize + ", edge=" + edge + ", leanSize=" + leanSize + ", sizeRatio=" + sizeRatio + ", delta="
				+ delta + ", theta=" + theta + ", vega=" + vega + ", gamma=" + gamma + ", sigma=" + sigma + ", rho="
				+ rho + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Trade other = (Trade) obj;
		if (id != other.id)
			return false;
		return true;
	}

}
