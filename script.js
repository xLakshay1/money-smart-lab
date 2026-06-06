Reveal.initialize({
  hash: true,
  controls: true,
  controlsTutorial: false,
  progress: true,
  slideNumber: "c/t",
  center: false,
  navigationMode: "linear",
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
    role: "Capital parking and near-term goal protection",
    returnType: "Fixed or pre-declared",
    risk: "Low credit risk, but weaker inflation protection",
    liquidity: "Moderate; premature withdrawal may reduce return",
    ideal: "Short-term capital parking and goal protection",
    watch: "Tax on interest and reinvestment risk",
    example: "Example: money needed in 12 to 24 months for a fee payment or travel plan.",
    horizon: "Usually best for short, date-known goals",
    taxNote: "Interest is taxed, so compare post-tax return rather than headline rate.",
    complexity: "Low",
    presenter: "Use FD when the job is certainty and timing, not maximum growth.",
    scores: { safety: 5, liquidity: 3, growth: 1, complexity: 1 },
    compare: [
      ["Why people use it", "Useful when principal stability matters more than outperforming inflation."],
      ["What it beats", "Better fit than equity for short-horizon money with a known deadline."],
      ["Main caution", "Looks safe, but post-tax real return may be weak over long periods."],
    ],
  },
  {
    key: "ppf",
    label: "PPF",
    role: "Long-term retirement-style compounding bucket",
    returnType: "Government-backed rate that resets periodically",
    risk: "Very low credit risk",
    liquidity: "Low; long lock-in with rule-based withdrawal access",
    ideal: "Retirement-style long-term compounding",
    watch: "Not suitable when money may be needed early",
    example: "Example: disciplined long-term retirement accumulation.",
    horizon: "Designed for long holding periods",
    taxNote: "Tax treatment is attractive, but liquidity is intentionally restricted.",
    complexity: "Low to medium",
    presenter: "PPF is a discipline tool first and a return tool second.",
    scores: { safety: 5, liquidity: 1, growth: 2, complexity: 2 },
    compare: [
      ["Why people use it", "Builds a protected long-run bucket without daily market stress."],
      ["What it beats", "More reliable than chasing hot products for retirement money."],
      ["Main caution", "Great for discipline, but poor if the investor may need liquidity early."],
    ],
  },
  {
    key: "vpf",
    label: "VPF",
    role: "Salary-linked top-up for retirement accumulation",
    returnType: "Provident-fund style compounding through payroll saving",
    risk: "Low inside the provident-fund framework",
    liquidity: "Lower flexibility than open-market products",
    ideal: "Employees who want to top up retirement savings automatically",
    watch: "Salary-linked and less flexible than market products",
    example: "Example: automatic salary-based retirement saving for a salaried employee.",
    horizon: "Best for salaried employees with a long retirement horizon",
    taxNote: "Good for disciplined payroll saving, but flexibility is limited.",
    complexity: "Medium",
    presenter: "VPF works well for employees who want automation and do not need quick access.",
    scores: { safety: 4, liquidity: 1, growth: 2, complexity: 2 },
    compare: [
      ["Why people use it", "Creates forced saving through payroll without day-to-day decision fatigue."],
      ["What it beats", "More disciplined than trying to save the same money manually each month."],
      ["Main caution", "The investor gives up flexibility in exchange for automation and structure."],
    ],
  },
  {
    key: "sgb",
    label: "Gold Bonds",
    role: "Strategic gold allocation and inflation hedge sleeve",
    returnType: "Gold price exposure plus coupon on issued bonds",
    risk: "Gold-price volatility even though the bond obligation is sovereign",
    liquidity: "Can vary depending on issue window and secondary market depth",
    ideal: "Strategic gold allocation without storing physical gold",
    watch: "Gold can remain volatile for long periods",
    example: "Example: adding a modest gold hedge to a diversified portfolio.",
    horizon: "Works better as a strategic diversifier than a trading position",
    taxNote: "Understand issue terms, coupon, and how exit timing affects realized outcome.",
    complexity: "Medium",
    presenter: "Gold bonds are usually a hedge sleeve, not the main engine of wealth creation.",
    scores: { safety: 3, liquidity: 2, growth: 2, complexity: 3 },
    compare: [
      ["Why people use it", "Adds a diversifier that can behave differently from both cash and equity."],
      ["What it beats", "Cleaner than storing physical gold when the aim is portfolio allocation."],
      ["Main caution", "Gold can stay flat or volatile for long stretches, so position sizing matters."],
    ],
  },
  {
    key: "mf",
    label: "Mutual Funds",
    role: "Professionally managed pooled investment vehicle",
    returnType: "Market-linked based on underlying portfolio",
    risk: "Depends on whether the fund holds debt, equity, or hybrid assets",
    liquidity: "Usually high in open-ended schemes",
    ideal: "Diversified investing with professional management",
    watch: "Scheme mandate, cost, and benchmark fit matter",
    example: "Example: SIP into a diversified portfolio instead of buying one stock.",
    horizon: "Depends entirely on the scheme mandate",
    taxNote: "Tax treatment differs across equity, debt, and hybrid structures.",
    complexity: "Medium",
    presenter: "A mutual fund is only a wrapper; the real question is what sits inside it.",
    scores: { safety: 3, liquidity: 4, growth: 3, complexity: 3 },
    compare: [
      ["Why people use it", "Gives diversification and fund-management access without picking every security."],
      ["What it beats", "Often better than concentrated direct bets for beginners who need structure."],
      ["Main caution", "The label 'mutual fund' is too broad; always check category, cost, and mandate."],
    ],
  },
  {
    key: "equity",
    label: "Equity Funds",
    role: "Long-horizon growth engine inside a diversified structure",
    returnType: "Market-linked with higher long-run growth potential",
    risk: "High short-term volatility and drawdown risk",
    liquidity: "Units are accessible, but value can swing sharply",
    ideal: "Goals with a 5-year or longer time horizon",
    watch: "Do not use this bucket for money needed soon",
    example: "Example: retirement, long-term wealth creation, or long-horizon family goals.",
    horizon: "Usually 5 years or more",
    taxNote: "Return path matters more than one-year snapshots; taxes should be read with holding period.",
    complexity: "Medium",
    presenter: "Equity funds solve diversification better than random stock picking, but not the pain of volatility.",
    scores: { safety: 2, liquidity: 4, growth: 5, complexity: 3 },
    compare: [
      ["Why people use it", "Designed for compounding when the investor has time and emotional patience."],
      ["What it beats", "Better diversification than one or two direct stock ideas."],
      ["Main caution", "Short-term drawdowns are normal, so this must not hold near-term money."],
    ],
  },
  {
    key: "ulip",
    label: "ULIP",
    role: "Insurance plus market-linked investment wrapper",
    returnType: "Market-linked inside an insurance wrapper",
    risk: "Depends on selected fund mix and policy design",
    liquidity: "Lower because of lock-in and policy structure",
    ideal: "Only for users who understand both insurance and investment layers",
    watch: "Charges, lock-in, and complexity must be justified",
    example: "Example: a buyer combining insurance and market exposure in one product.",
    horizon: "Long commitment product that should be entered deliberately",
    taxNote: "Charges, insurance cost, and policy structure affect the investor more than headline illustrations.",
    complexity: "High",
    presenter: "ULIP should be explained as a bundled structure, not as a simple mutual fund substitute.",
    scores: { safety: 2, liquidity: 2, growth: 3, complexity: 4 },
    compare: [
      ["Why people use it", "Some buyers prefer one wrapper for protection and investment."],
      ["What it beats", "It can simplify paperwork, but not necessarily improve portfolio clarity."],
      ["Main caution", "Bundling can hide costs and reduce flexibility if the buyer does not inspect the product well."],
    ],
  },
  {
    key: "stocks",
    label: "Stocks",
    role: "Direct ownership in businesses",
    returnType: "Pure market-linked ownership return",
    risk: "High company-specific and market risk",
    liquidity: "High for liquid listed shares",
    ideal: "Investors who can study businesses and tolerate drawdowns",
    watch: "Concentration risk and valuation mistakes are common",
    example: "Example: directly owning a listed company after research.",
    horizon: "Useful for long-run investors with research discipline",
    taxNote: "Taxes matter, but decision quality and concentration risk matter even more.",
    complexity: "High",
    presenter: "Stocks can create wealth, but only if the investor can handle selection risk and emotional pressure.",
    scores: { safety: 1, liquidity: 4, growth: 5, complexity: 5 },
    compare: [
      ["Why people use it", "Direct ownership offers full upside when the business thesis is right."],
      ["What it beats", "Can outperform broad funds, but only with better research and better behavior."],
      ["Main caution", "Single-name risk is brutal when the investor mistakes confidence for analysis."],
    ],
  },
  {
    key: "debentures",
    label: "Debentures",
    role: "Lending to companies for coupon income and principal repayment",
    returnType: "Coupon or interest plus principal repayment terms",
    risk: "Credit risk, interest-rate risk, and liquidity variation",
    liquidity: "Depends on issuer quality and market depth",
    ideal: "Debt exposure when the investor can evaluate the issuer",
    watch: "Secured vs unsecured, rating, covenant quality, and issuer health",
    example: "Example: lending to a company rather than owning part of it.",
    horizon: "Works only when issuer analysis and holding ability are both present",
    taxNote: "Headline coupon should always be read alongside default risk and exit flexibility.",
    complexity: "High",
    presenter: "A debenture is not just a higher rate; it is a credit decision on the issuer.",
    scores: { safety: 2, liquidity: 2, growth: 2, complexity: 4 },
    compare: [
      ["Why people use it", "Used for income-oriented lending exposure when the issuer can be understood."],
      ["What it beats", "Can offer more yield than safer products, but only by taking more risk."],
      ["Main caution", "Credit analysis matters more than coupon temptation."],
    ],
  },
];

const glossaryData = [
  ["Equity fund", "A mutual fund mainly investing in shares for long-term growth."],
  ["Mutual fund", "A pooled investment vehicle managed according to a stated portfolio mandate."],
  ["ULIP", "An insurance product where part of the money also goes into market-linked units."],
  ["Stocks", "Part ownership in a listed company."],
  ["Debentures", "Debt instruments through which companies borrow from investors."],
  ["Interest on securities", "Coupon or contractual interest received from bonds and similar instruments."],
  ["Secured assets", "Assets pledged as collateral so a lender has a claim if the borrower defaults."],
  ["Demat account", "An electronic account that stores securities, not salary cash."],
  ["Stock exchange", "A regulated electronic marketplace where listed securities are traded."],
  ["SEBI", "The securities regulator that oversees market conduct and investor protection in India."],
  ["Fund management", "The process of selecting, allocating, monitoring, and rebalancing investments."],
  ["PPF and VPF", "Long-term provident-style saving products usually used for disciplined retirement building."],
];

const quantData = {
  mpt: {
    label: "MPT and frontier",
    feature: {
      title: "Efficient frontier",
      summary:
        "Modern Portfolio Theory asks which mix gives the highest expected return for a chosen level of risk, not which single product looks most exciting.",
      formula: "min w'Σw  subject to  E[R_p] = target return and  Σw = 1",
      caption:
        "The covariance matrix matters because portfolio risk depends on how assets behave together, not just on stand-alone volatility.",
      cue: "MPT is strongest when it turns diversification into a measurable design choice instead of a slogan.",
      points: ["Expected return vector", "Covariance matrix", "Sharpe trade-off", "Rebalancing discipline"],
    },
    cards: [
      ["Covariance matrix", "Shows which asset combinations dampen or amplify each other inside one portfolio."],
      ["Correlation", "Low or changing correlation is the raw material behind diversification benefit."],
      ["Sharpe ratio", "Compares excess return earned per unit of volatility taken."],
      ["Capital market line", "Links efficient risky portfolios with the idea of a risk-free allocation mix."],
    ],
    takeaway:
      "MPT is useful, but its optimizer is only as good as the assumptions used for return, volatility, and correlation.",
  },
  tail: {
    label: "Tail risk",
    feature: {
      title: "Downside-risk toolkit",
      summary:
        "Average return can hide ugly path risk. Quant work often focuses on what happens in the bad left tail, not just in normal months.",
      formula: "CVaR_a = E[Loss | Loss > VaR_a]",
      caption:
        "Expected shortfall asks: if losses cross the VaR threshold, how bad are they on average?",
      cue: "Investors rarely quit because CAGR was low. They quit because drawdowns felt unbearable.",
      points: ["VaR", "CVaR / Expected shortfall", "Max drawdown", "Stress scenarios"],
    },
    cards: [
      ["Value at Risk", "A percentile estimate of possible loss over a chosen horizon and confidence level."],
      ["Expected shortfall", "Looks beyond the VaR cutoff and measures the average severity of tail losses."],
      ["Max drawdown", "Tracks the deepest peak-to-trough fall, which is behaviorally very important."],
      ["Scenario stress tests", "Models what happens if rates spike, equities crash, or liquidity dries up together."],
    ],
    takeaway:
      "Volatility alone is not enough; two portfolios with the same volatility can feel completely different in a crisis.",
  },
  factors: {
    label: "Factors and CAPM",
    feature: {
      title: "CAPM and factor models",
      summary:
        "Quant portfolios often explain return through market beta plus systematic tilts such as value, size, momentum, quality, and low volatility.",
      formula: "R_i - R_f = alpha + beta_mkt (R_m - R_f) + beta_factor F + error",
      caption:
        "Alpha is the part not explained by chosen risk factors. Beta measures sensitivity to those factors.",
      cue: "A portfolio may look diversified by number of holdings but still be heavily concentrated in one hidden factor.",
      points: ["Beta", "Alpha", "Factor exposure", "Tracking and information ratio"],
    },
    cards: [
      ["Beta", "Measures how strongly a security or portfolio moves with the market benchmark."],
      ["Alpha", "Return not explained by the benchmark or chosen factor model."],
      ["Tracking error", "Volatility of active return versus a benchmark."],
      ["Information ratio", "Active return earned per unit of tracking error taken."],
    ],
    takeaway:
      "Factor language helps explain why two diversified portfolios can still behave very differently in the same market.",
  },
  fixedIncome: {
    label: "Fixed income math",
    feature: {
      title: "Bond analytics",
      summary:
        "Debt investing is not just about coupon. Price sensitivity, yield changes, and credit spread behavior drive actual outcomes.",
      formula: "ΔP/P ≈ -D_mod Δy + 0.5 C (Δy)^2",
      caption:
        "Modified duration estimates first-order sensitivity to yield change, while convexity improves the approximation.",
      cue: "When rates move sharply, duration and convexity explain why two debt portfolios react differently.",
      points: ["YTM", "Modified duration", "Convexity", "Credit spread"],
    },
    cards: [
      ["Yield to maturity", "Annualized return if the bond is held to maturity and promised cash flows arrive."],
      ["Modified duration", "Approximate percentage price change for a 1% change in yield."],
      ["Convexity", "Measures how duration itself changes as yields move."],
      ["Credit spread", "Extra yield demanded for bearing credit risk over a safer benchmark."],
    ],
    takeaway:
      "A higher coupon does not automatically mean a better debt product; rate risk and credit risk decide the real trade-off.",
  },
  execution: {
    label: "Execution and implementation",
    feature: {
      title: "Implementation drag",
      summary:
        "Good portfolio ideas can still underperform if costs, turnover, taxes, or poor execution eat the expected edge.",
      formula: "Net alpha = gross alpha - cost - slippage - tax drag",
      caption:
        "In live investing, implementation quality often decides whether a strategy keeps its theoretical advantage.",
      cue: "A strategy that looks brilliant in a spreadsheet can fail in the market if trading friction is ignored.",
      points: ["Turnover", "Slippage", "Rebalancing bands", "Liquidity depth"],
    },
    cards: [
      ["Turnover", "Measures how much of the portfolio is replaced over a period and often predicts cost drag."],
      ["Slippage", "The gap between theoretical fill price and actual execution price."],
      ["Rebalancing bands", "Allow a portfolio to drift within a range before trading, reducing unnecessary churn."],
      ["Liquidity depth", "Shows whether the market can absorb order size without causing a damaging price move."],
    ],
    takeaway:
      "Quant success is not only about better models; it is also about surviving real-world trading friction.",
  },
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
    options: ["Perfectly correlated", "Differently correlated", "All guaranteed", "All equally taxed"],
    answer: 1,
    explain: "Assets that do not move together in the same way can improve the portfolio trade-off.",
  },
  {
    question: "What is the key difference between a stock and a debenture?",
    options: ["Both mean ownership", "Stock is ownership, debenture is lending", "Debenture is always safer than cash", "Only stocks can be listed"],
    answer: 1,
    explain: "A stock is ownership in a company, while a debenture means lending money to it.",
  },
];

function renderProductExplorer() {
  const selector = document.getElementById("productSelector");
  const detail = document.getElementById("productDetail");
  const lens = document.getElementById("productLens");

  if (!selector || !detail || !lens) return;

  selector.innerHTML = productData
    .map(
      (item, index) =>
        `<button class="${index === 0 ? "active" : ""}" data-product="${item.key}">${item.label}</button>`
    )
    .join("");

  const renderDetail = (key) => {
    const product = productData.find((item) => item.key === key);
    if (!product) return;

    detail.innerHTML = `
      <p class="kicker">Selected product</p>
      <h3>${product.label}</h3>
      <p class="support-text top-zero">${product.example}</p>
      <div class="detail-grid">
        <div class="detail-box"><strong>Role in portfolio</strong><p>${product.role}</p></div>
        <div class="detail-box"><strong>Return nature</strong><p>${product.returnType}</p></div>
        <div class="detail-box"><strong>Risk profile</strong><p>${product.risk}</p></div>
        <div class="detail-box"><strong>Liquidity</strong><p>${product.liquidity}</p></div>
        <div class="detail-box"><strong>Best fit</strong><p>${product.ideal}</p></div>
        <div class="detail-box"><strong>Tax and checks</strong><p>${product.taxNote}</p></div>
      </div>
      <div class="presenter-note"><strong>Presenter line:</strong> ${product.presenter}</div>
    `;

    lens.innerHTML = `
      <div class="table-head">
        <h3>Comparison lens</h3>
        <p>This view helps trainees compare products by job, horizon, and portfolio behavior instead of by return alone.</p>
      </div>
      <div class="product-lens-grid">
        <div class="lens-box"><strong>Time horizon</strong><p>${product.horizon}</p></div>
        <div class="lens-box"><strong>Complexity</strong><p>${product.complexity}</p></div>
      </div>
      <div class="rating-stack">
        ${[
          ["Safety", product.scores.safety],
          ["Liquidity", product.scores.liquidity],
          ["Growth", product.scores.growth],
          ["Complexity", product.scores.complexity],
        ]
          .map(
            ([label, score]) => `
              <div class="rating-row">
                <span>${label}</span>
                <div class="rating-track"><div class="rating-fill" style="width:${(score / 5) * 100}%"></div></div>
                <strong>${score}/5</strong>
              </div>
            `
          )
          .join("")}
      </div>
      <div class="compare-grid">
        ${product.compare
          .map(
            ([title, text]) => `
              <div class="compare-note">
                <strong>${title}</strong>
                <p>${text}</p>
              </div>
            `
          )
          .join("")}
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
  if (!container) return;

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
  const feature = document.getElementById("quantFeature");
  const grid = document.getElementById("quantGrid");
  const takeaway = document.getElementById("quantTakeaway");
  if (!tabs || !feature || !grid || !takeaway) return;

  tabs.innerHTML = Object.entries(quantData)
    .map(
      ([key, module], index) =>
        `<button class="${index === 0 ? "active" : ""}" data-quant="${key}">${module.label}</button>`
    )
    .join("");

  const renderCards = (key) => {
    const module = quantData[key];
    if (!module) return;

    feature.innerHTML = `
      <p class="kicker">Featured concept</p>
      <h3>${module.feature.title}</h3>
      <p class="support-text top-zero">${module.feature.summary}</p>
      <div class="formula-panel">
        <div class="formula-line">${module.feature.formula}</div>
        <div class="formula-caption">${module.feature.caption}</div>
      </div>
      <div class="feature-points">
        ${module.feature.points.map((point) => `<span class="feature-point">${point}</span>`).join("")}
      </div>
      <div class="quote-banner compact-banner">${module.feature.cue}</div>
    `;

    grid.innerHTML = module.cards
      .map(
        ([title, text]) => `
          <div class="quant-card">
            <h3>${title}</h3>
            <p>${text}</p>
          </div>
        `
      )
      .join("");

    takeaway.textContent = module.takeaway;
  };

  renderCards("mpt");

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    tabs.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderCards(button.dataset.quant);
  });
}

function renderQuizBlock(containerId, questions, offset) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = questions
    .map(
      (question, qIndex) => `
        <div class="quiz-card">
          <p class="kicker">Question ${offset + qIndex + 1}</p>
          <h3>${question.question}</h3>
          <div class="quiz-options">
            ${question.options
              .map(
                (option, oIndex) => `
                  <button class="quiz-option" data-question="${offset + qIndex}" data-option="${oIndex}">
                    ${option}
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="quiz-feedback" id="quiz-feedback-${offset + qIndex}"></div>
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

    if (feedback) feedback.textContent = question.explain;
  });
}

function renderQuiz() {
  renderQuizBlock("quizGridA", quizQuestions.slice(0, 2), 0);
  renderQuizBlock("quizGridB", quizQuestions.slice(2), 2);
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
  const incomeRangeLabel = document.getElementById("incomeRangeLabel");
  const savingRateRangeLabel = document.getElementById("savingRateRangeLabel");
  const incomeValue = document.getElementById("incomeValue");
  const savingValue = document.getElementById("savingValue");
  const spendValue = document.getElementById("spendValue");
  const fundMonthsValue = document.getElementById("fundMonthsValue");

  if (
    !incomeRange ||
    !savingRateRange ||
    !incomeRangeLabel ||
    !savingRateRangeLabel ||
    !incomeValue ||
    !savingValue ||
    !spendValue ||
    !fundMonthsValue
  ) {
    return;
  }

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
    incomeRangeLabel.textContent = formatRupees(income);
    savingRateRangeLabel.textContent = `${Number(savingRateRange.value)}%`;
  };

  incomeRange.addEventListener("input", render);
  savingRateRange.addEventListener("input", render);
  render();
}

function initSipDemo() {
  const amountRange = document.getElementById("sipAmountRange");
  const returnRange = document.getElementById("sipReturnRange");
  const yearsRange = document.getElementById("sipYearsRange");
  const amountRangeLabel = document.getElementById("sipAmountRangeLabel");
  const returnRangeLabel = document.getElementById("sipReturnRangeLabel");
  const yearsRangeLabel = document.getElementById("sipYearsRangeLabel");
  const amountValue = document.getElementById("sipAmountValue");
  const investedValue = document.getElementById("sipInvestedValue");
  const corpusValue = document.getElementById("sipCorpusValue");
  const gainValue = document.getElementById("sipGainValue");
  const chart = document.getElementById("sipChart");

  if (
    !amountRange ||
    !returnRange ||
    !yearsRange ||
    !amountRangeLabel ||
    !returnRangeLabel ||
    !yearsRangeLabel ||
    !amountValue ||
    !investedValue ||
    !corpusValue ||
    !gainValue ||
    !chart
  ) {
    return;
  }

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
    amountRangeLabel.textContent = formatRupees(monthlySip);
    returnRangeLabel.textContent = `${Number(returnRange.value).toFixed(1)}%`;
    yearsRangeLabel.textContent = `${years} years`;

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
      <path d="${area}" fill="rgba(52,225,192,0.14)"></path>
      <path d="${path}" fill="none" stroke="#50d6ff" stroke-width="4" stroke-linecap="round"></path>
      ${points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="4.5" fill="#ffcc63"></circle>`).join("")}
      <text x="${padding}" y="24" fill="#f7f6fb" font-size="13" font-weight="700">Projected value path</text>
    `;
  };

  [amountRange, returnRange, yearsRange].forEach((input) => input.addEventListener("input", render));
  render();
}

const mptAssets = [
  { name: "FD", return: 0.067, vol: 0.012, color: "#6ca7ff" },
  { name: "Debt Fund", return: 0.077, vol: 0.04, color: "#50d6ff" },
  { name: "Gold / SGB", return: 0.09, vol: 0.14, color: "#ffcc63" },
  { name: "Equity Fund", return: 0.125, vol: 0.19, color: "#34e1c0" },
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
  const riskLabel = document.getElementById("riskToleranceRangeLabel");
  const returnValue = document.getElementById("mptReturnValue");
  const volValue = document.getElementById("mptVolValue");
  const sharpeValue = document.getElementById("mptSharpeValue");
  const tagValue = document.getElementById("mptTagValue");
  const bars = document.getElementById("allocationBars");
  const chart = document.getElementById("mptChart");

  if (!input || !riskLabel || !returnValue || !volValue || !sharpeValue || !tagValue || !bars || !chart) return;

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
    riskLabel.textContent = `${Number(input.value)} / 100`;

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
          return `<circle cx="${point.x}" cy="${point.y}" r="3" fill="rgba(108,167,255,0.16)"></circle>`;
        })
        .join("")}
      <path d="${makePath(frontier.map(toPoint))}" fill="none" stroke="#ffcc63" stroke-width="4"></path>
      <circle cx="${focus.x}" cy="${focus.y}" r="8" fill="#34e1c0" stroke="#090d1d" stroke-width="4"></circle>
      <text x="${padding}" y="24" fill="#f7f6fb" font-size="13" font-weight="700">Efficient frontier</text>
      <text x="${focus.x + 12}" y="${focus.y - 10}" fill="#f7f6fb" font-size="12">Selected mix</text>
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
