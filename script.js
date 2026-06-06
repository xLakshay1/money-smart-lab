Reveal.initialize({
  hash: true,
  controls: true,
  progress: true,
  slideNumber: "c/t",
  center: false,
  transition: "slide",
  backgroundTransition: "fade",
  width: 1440,
  height: 820,
  margin: 0.04,
});

const formatRupees = (value) =>
  `Rs ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(value))}`;

const formatCompactRupees = (value) => {
  if (value >= 10000000) return `Rs ${(value / 10000000).toFixed(2)}Cr`;
  if (value >= 100000) return `Rs ${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `Rs ${(value / 1000).toFixed(1)}K`;
  return formatRupees(value);
};

const productData = [
  {
    key: "fd",
    label: "FD",
    returnType: "Fixed / pre-declared",
    risk: "Low credit risk, weak inflation protection",
    liquidity: "Moderate; penalty may apply",
    ideal: "Short-term goals and parking money",
    watch: "Tax on interest and reinvestment risk",
    example: "Example: money needed in 12 to 24 months.",
  },
  {
    key: "ppf",
    label: "PPF",
    returnType: "Government-backed, periodically reset rate",
    risk: "Very low credit risk",
    liquidity: "Low; long lock-in with rule-based access",
    ideal: "Long-term retirement-style compounding",
    watch: "Not for near-term needs",
    example: "Example: disciplined retirement bucket.",
  },
  {
    key: "vpf",
    label: "VPF",
    returnType: "Provident-fund style long-run compounding",
    risk: "Low inside the PF framework",
    liquidity: "Lower flexibility than open-market products",
    ideal: "Employees topping up retirement savings",
    watch: "Salary-linked and less flexible",
    example: "Example: automatic payroll-based wealth building.",
  },
  {
    key: "sgb",
    label: "Gold Bonds",
    returnType: "Gold price exposure plus coupon on issued bonds",
    risk: "Gold-price volatility",
    liquidity: "Issue and trading liquidity can vary",
    ideal: "Gold allocation without storing physical gold",
    watch: "Availability depends on official issuances",
    example: "Example: modest portfolio diversification into gold.",
  },
  {
    key: "mf",
    label: "Mutual Funds",
    returnType: "Market-linked",
    risk: "Depends on the underlying assets",
    liquidity: "Usually high in open-ended structures",
    ideal: "Diversification with professional management",
    watch: "Scheme category, cost, and mandate drift",
    example: "Example: SIP into a diversified portfolio.",
  },
  {
    key: "equity",
    label: "Equity Funds",
    returnType: "Market-linked with growth potential",
    risk: "High short-term volatility",
    liquidity: "Usually good, but value swings widely",
    ideal: "Long-term wealth creation",
    watch: "Do not use for money needed soon",
    example: "Example: 10-year retirement or wealth goal.",
  },
  {
    key: "ulip",
    label: "ULIP",
    returnType: "Market-linked inside insurance wrapper",
    risk: "Depends on fund mix and policy structure",
    liquidity: "Lower because of lock-in and design",
    ideal: "Only if you understand both layers",
    watch: "Charges, lock-in, and complexity",
    example: "Example: investment plus insurance in one product.",
  },
  {
    key: "stocks",
    label: "Stocks",
    returnType: "Pure market-linked equity return",
    risk: "High company-specific and market risk",
    liquidity: "High for liquid listed names",
    ideal: "Investors who can research businesses",
    watch: "Concentration and behavioural errors",
    example: "Example: owning part of a listed company.",
  },
  {
    key: "debentures",
    label: "Debentures",
    returnType: "Coupon / interest plus principal terms",
    risk: "Credit and interest-rate risk",
    liquidity: "Varies widely by issuer",
    ideal: "Debt exposure with issuer evaluation",
    watch: "Secured vs unsecured, rating, covenants",
    example: "Example: lending to a company instead of owning it.",
  },
];

const glossaryData = [
  ["Equity fund", "A mutual fund mainly investing in shares for long-term growth."],
  ["Mutual fund", "Pooled money managed according to a stated investment strategy."],
  ["ULIP", "Insurance plus investment wrapped inside one policy structure."],
  ["Stocks", "Part ownership in a listed company."],
  ["Debentures", "Debt instruments through which companies borrow from investors."],
  ["Interest on securities", "Coupon or contractual interest from bonds and similar instruments."],
  ["Secured assets", "Assets pledged as collateral against borrowing."],
  ["Demat account", "Electronic account that holds securities, not cash salary or savings."],
];

const quantData = {
  returns: [
    ["CAGR", "Smooths a multi-year path into one annualized growth number."],
    ["XIRR", "Useful when SIPs and withdrawals happen on irregular dates."],
    ["Rolling returns", "Shows consistency across many starting points instead of one lucky date."],
  ],
  risk: [
    ["Volatility", "Measures how widely returns swing around the average."],
    ["Max drawdown", "Largest drop from a prior peak, which investors feel very directly."],
    ["Value at Risk", "A probabilistic estimate of downside over a chosen horizon."],
  ],
  portfolio: [
    ["Correlation", "Tells you how assets move relative to each other."],
    ["Sharpe ratio", "Return earned per unit of volatility."],
    ["Tracking error", "How much a passive product drifts from its benchmark."],
  ],
  debt: [
    ["Yield to maturity", "Annualized return if a bond is held to maturity and pays as expected."],
    ["Duration", "Bond-price sensitivity to interest-rate changes."],
    ["Credit spread", "Extra yield demanded over a safer benchmark."],
  ],
  execution: [
    ["Factor exposure", "Tilt toward value, momentum, quality, size, or low volatility."],
    ["Rebalancing", "Restoring target weights after market moves."],
    ["Slippage", "The gap between theoretical and actually executed price."],
  ],
};

const quizQuestions = [
  {
    question: "Which product usually fits best for money needed within one year?",
    options: ["Equity fund", "FD or cash-like bucket", "Small-cap stocks", "Long-lock-in retirement bucket"],
    answer: 1,
    explain: "Near-term money usually needs liquidity and stability first.",
  },
  {
    question: "A demat account mainly stores:",
    options: ["Electronic securities", "Cash salary", "Insurance premiums", "Tax refunds"],
    answer: 0,
    explain: "It is the electronic holding place for shares, bonds, ETFs, and similar securities.",
  },
  {
    question: "Diversification helps most when assets are:",
    options: ["Perfectly correlated", "Unrelated or differently correlated", "All guaranteed", "All equally taxed"],
    answer: 1,
    explain: "Assets that do not move together the same way can improve the portfolio trade-off.",
  },
  {
    question: "What is the key difference between a stock and a debenture?",
    options: ["Both mean ownership", "Stock is ownership, debenture is lending", "Debenture is always safer than cash", "Only stocks earn returns"],
    answer: 1,
    explain: "A stock is ownership; a debenture is a loan to the issuer.",
  },
];

function renderProductExplorer() {
  const selector = document.getElementById("productSelector");
  const detail = document.getElementById("productDetail");
  const tableBody = document.getElementById("comparisonTableBody");

  selector.innerHTML = productData
    .map(
      (item, index) =>
        `<button class="${index === 0 ? "active" : ""}" data-product="${item.key}">${item.label}</button>`
    )
    .join("");

  tableBody.innerHTML = productData
    .map(
      (item) => `
        <tr>
          <td>${item.label}</td>
          <td>${item.returnType}</td>
          <td>${item.risk}</td>
          <td>${item.liquidity}</td>
        </tr>
      `
    )
    .join("");

  const renderDetail = (key) => {
    const product = productData.find((item) => item.key === key);
    if (!product) return;
    detail.innerHTML = `
      <p class="kicker">Selected product</p>
      <h3>${product.label}</h3>
      <p>${product.example}</p>
      <div class="detail-grid">
        <div class="detail-box"><strong>Return</strong><p>${product.returnType}</p></div>
        <div class="detail-box"><strong>Risk</strong><p>${product.risk}</p></div>
        <div class="detail-box"><strong>Liquidity</strong><p>${product.liquidity}</p></div>
        <div class="detail-box"><strong>Best use</strong><p>${product.ideal}</p></div>
        <div class="detail-box"><strong>Watch out</strong><p>${product.watch}</p></div>
        <div class="detail-box"><strong>Trainer line</strong><p>Ask what job this product is doing in the portfolio.</p></div>
      </div>
    `;
  };

  renderDetail("fd");

  selector.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    selector.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderDetail(button.dataset.product);
  });
}

function renderGlossary() {
  const container = document.getElementById("glossaryGrid");
  container.innerHTML = glossaryData
    .map(
      ([title, text]) => `
        <div class="card glossary-card">
          <h3>${title}</h3>
          <p>${text}</p>
        </div>
      `
    )
    .join("");
}

function renderQuant() {
  const tabs = document.getElementById("quantTabs");
  const grid = document.getElementById("quantGrid");
  const labels = {
    returns: "Return metrics",
    risk: "Risk metrics",
    portfolio: "Portfolio metrics",
    debt: "Debt metrics",
    execution: "Execution and factors",
  };

  tabs.innerHTML = Object.entries(labels)
    .map(
      ([key, label], index) =>
        `<button class="${index === 0 ? "active" : ""}" data-quant="${key}">${label}</button>`
    )
    .join("");

  const renderCards = (key) => {
    grid.innerHTML = quantData[key]
      .map(
        ([title, text]) => `
          <div class="quant-card">
            <h3>${title}</h3>
            <p>${text}</p>
          </div>
        `
      )
      .join("");
  };

  renderCards("returns");

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    tabs.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderCards(button.dataset.quant);
  });
}

function renderQuiz() {
  const container = document.getElementById("quizGrid");
  container.innerHTML = quizQuestions
    .map(
      (question, qIndex) => `
        <div class="quiz-card">
          <p class="kicker">Question ${qIndex + 1}</p>
          <h3>${question.question}</h3>
          <div class="quiz-options">
            ${question.options
              .map(
                (option, oIndex) => `
                  <button class="quiz-option" data-question="${qIndex}" data-option="${oIndex}">
                    ${option}
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="quiz-feedback" id="quiz-feedback-${qIndex}"></div>
        </div>
      `
    )
    .join("");

  container.addEventListener("click", (event) => {
    const option = event.target.closest(".quiz-option");
    if (!option) return;
    const qIndex = Number(option.dataset.question);
    const oIndex = Number(option.dataset.option);
    const question = quizQuestions[qIndex];
    const feedback = document.getElementById(`quiz-feedback-${qIndex}`);
    container.querySelectorAll(`.quiz-option[data-question="${qIndex}"]`).forEach((item) => {
      item.classList.remove("correct", "wrong");
      if (Number(item.dataset.option) === question.answer) item.classList.add("correct");
      if (Number(item.dataset.option) === oIndex && oIndex !== question.answer) item.classList.add("wrong");
    });
    feedback.textContent = question.explain;
  });
}

function drawAxes(width, height, padding) {
  return `
    <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.25)" />
    <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.25)" />
  `;
}

function makePath(points) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

function initBudgetDemo() {
  const incomeRange = document.getElementById("incomeRange");
  const savingRateRange = document.getElementById("savingRateRange");
  const incomeValue = document.getElementById("incomeValue");
  const savingValue = document.getElementById("savingValue");
  const spendValue = document.getElementById("spendValue");
  const fundMonthsValue = document.getElementById("fundMonthsValue");

  const render = () => {
    const income = Number(incomeRange.value);
    const rate = Number(savingRateRange.value) / 100;
    const saved = income * rate;
    const spent = income - saved;
    const months = saved > 0 ? Math.ceil((spent * 6) / saved) : 0;

    incomeValue.textContent = formatRupees(income);
    savingValue.textContent = formatRupees(saved);
    spendValue.textContent = formatRupees(spent);
    fundMonthsValue.textContent = `${months} months`;
  };

  incomeRange.addEventListener("input", render);
  savingRateRange.addEventListener("input", render);
  render();
}

function initSipDemo() {
  const amountRange = document.getElementById("sipAmountRange");
  const returnRange = document.getElementById("sipReturnRange");
  const yearsRange = document.getElementById("sipYearsRange");
  const amountValue = document.getElementById("sipAmountValue");
  const investedValue = document.getElementById("sipInvestedValue");
  const corpusValue = document.getElementById("sipCorpusValue");
  const gainValue = document.getElementById("sipGainValue");
  const chart = document.getElementById("sipChart");

  const render = () => {
    const monthlySip = Number(amountRange.value);
    const annualReturn = Number(returnRange.value) / 100;
    const years = Number(yearsRange.value);
    const monthlyRate = annualReturn / 12;
    const months = years * 12;
    let value = 0;
    const yearlyValues = [];

    for (let month = 1; month <= months; month += 1) {
      value = value * (1 + monthlyRate) + monthlySip;
      if (month % 12 === 0) yearlyValues.push(value);
    }

    const invested = monthlySip * months;
    const gain = value - invested;
    amountValue.textContent = formatRupees(monthlySip);
    investedValue.textContent = formatCompactRupees(invested);
    corpusValue.textContent = formatCompactRupees(value);
    gainValue.textContent = formatCompactRupees(gain);

    const width = 640;
    const height = 360;
    const padding = 44;
    const maxY = Math.max(...yearlyValues, 1);
    const points = yearlyValues.map((entry, index) => ({
      x: padding + (index / Math.max(yearlyValues.length - 1, 1)) * (width - padding * 2),
      y: height - padding - (entry / maxY) * (height - padding * 2),
    }));
    const path = makePath(points);
    const area = `${path} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;

    chart.innerHTML = `
      ${drawAxes(width, height, padding)}
      <path d="${area}" fill="rgba(79,210,178,0.12)"></path>
      <path d="${path}" fill="none" stroke="#78f5cf" stroke-width="4" stroke-linecap="round"></path>
      ${points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="4.5" fill="#f0b45a"></circle>`).join("")}
      <text x="${padding}" y="24" fill="#eff5f1" font-size="13" font-weight="700">Projected value path</text>
    `;
  };

  [amountRange, returnRange, yearsRange].forEach((input) => input.addEventListener("input", render));
  render();
}

const mptAssets = [
  { name: "FD", return: 0.067, vol: 0.012, color: "#7ca6ff" },
  { name: "Debt Fund", return: 0.077, vol: 0.04, color: "#60a8d7" },
  { name: "Gold / SGB", return: 0.09, vol: 0.14, color: "#f0b45a" },
  { name: "Equity Fund", return: 0.125, vol: 0.19, color: "#4fd2b2" },
];

const corr = [
  [1, 0.45, 0.15, 0.05],
  [0.45, 1, 0.2, 0.2],
  [0.15, 0.2, 1, 0.12],
  [0.05, 0.2, 0.12, 1],
];

const covariance = mptAssets.map((assetA, i) =>
  mptAssets.map((assetB, j) => assetA.vol * assetB.vol * corr[i][j])
);

const portfolioStats = (weights) => {
  const expectedReturn = weights.reduce((sum, weight, index) => sum + weight * mptAssets[index].return, 0);
  let variance = 0;
  for (let i = 0; i < weights.length; i += 1) {
    for (let j = 0; j < weights.length; j += 1) {
      variance += weights[i] * weights[j] * covariance[i][j];
    }
  }
  return { expectedReturn, volatility: Math.sqrt(variance) };
};

const simulatedPortfolios = Array.from({ length: 900 }, () => {
  const raw = mptAssets.map(() => Math.random());
  const total = raw.reduce((sum, value) => sum + value, 0);
  const weights = raw.map((value) => value / total);
  return { weights, ...portfolioStats(weights) };
});

const frontier = simulatedPortfolios
  .slice()
  .sort((a, b) => a.volatility - b.volatility)
  .reduce((accumulator, portfolio) => {
    const last = accumulator[accumulator.length - 1];
    if (!last || portfolio.expectedReturn > last.expectedReturn) accumulator.push(portfolio);
    return accumulator;
  }, []);

function initMptDemo() {
  const input = document.getElementById("riskToleranceRange");
  const returnValue = document.getElementById("mptReturnValue");
  const volValue = document.getElementById("mptVolValue");
  const sharpeValue = document.getElementById("mptSharpeValue");
  const tagValue = document.getElementById("mptTagValue");
  const bars = document.getElementById("allocationBars");
  const chart = document.getElementById("mptChart");

  const tagFromRisk = (risk) => {
    if (risk < 25) return "Capital-first";
    if (risk < 50) return "Balanced growth";
    if (risk < 75) return "Growth with buffers";
    return "High-growth stance";
  };

  const render = () => {
    const risk = Number(input.value) / 100;
    const targetVol =
      frontier[0].volatility + risk * (frontier[frontier.length - 1].volatility - frontier[0].volatility);
    const selected = frontier.reduce((best, current) =>
      Math.abs(current.volatility - targetVol) < Math.abs(best.volatility - targetVol) ? current : best
    );
    const sharpe = selected.volatility > 0 ? selected.expectedReturn / selected.volatility : 0;

    returnValue.textContent = `${(selected.expectedReturn * 100).toFixed(1)}%`;
    volValue.textContent = `${(selected.volatility * 100).toFixed(1)}%`;
    sharpeValue.textContent = sharpe.toFixed(2);
    tagValue.textContent = tagFromRisk(Number(input.value));

    bars.innerHTML = selected.weights
      .map(
        (weight, index) => `
          <div class="allocation-row">
            <strong>${mptAssets[index].name}</strong>
            <div class="allocation-track"><div class="allocation-fill" style="width:${(weight * 100).toFixed(1)}%; background:${mptAssets[index].color};"></div></div>
            <span>${(weight * 100).toFixed(0)}%</span>
          </div>
        `
      )
      .join("");

    const width = 640;
    const height = 420;
    const padding = 54;
    const maxVol = Math.max(...simulatedPortfolios.map((item) => item.volatility)) * 1.05;
    const maxReturn = Math.max(...simulatedPortfolios.map((item) => item.expectedReturn)) * 1.05;
    const toPoint = (portfolio) => ({
      x: padding + (portfolio.volatility / maxVol) * (width - padding * 2),
      y: height - padding - (portfolio.expectedReturn / maxReturn) * (height - padding * 2),
    });
    const focus = toPoint(selected);
    chart.innerHTML = `
      ${drawAxes(width, height, padding)}
      ${simulatedPortfolios
        .map((portfolio) => {
          const point = toPoint(portfolio);
          return `<circle cx="${point.x}" cy="${point.y}" r="3" fill="rgba(124,166,255,0.18)"></circle>`;
        })
        .join("")}
      <path d="${makePath(frontier.map(toPoint))}" fill="none" stroke="#f0b45a" stroke-width="4"></path>
      <circle cx="${focus.x}" cy="${focus.y}" r="8" fill="#78f5cf" stroke="#08111b" stroke-width="4"></circle>
      <text x="${padding}" y="24" fill="#eff5f1" font-size="13" font-weight="700">Efficient frontier</text>
      <text x="${focus.x + 12}" y="${focus.y - 10}" fill="#eff5f1" font-size="12">Selected mix</text>
    `;
  };

  input.addEventListener("input", render);
  render();
}

renderProductExplorer();
renderGlossary();
renderQuant();
renderQuiz();
initBudgetDemo();
initSipDemo();
initMptDemo();
