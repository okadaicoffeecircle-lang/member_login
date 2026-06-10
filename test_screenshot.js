const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const fileUrl = 'file://' + path.resolve(__dirname, 'index.html');

  const sizes = [
    { name: 'desktop_large', width: 1440, height: 900 },
    { name: 'desktop_small', width: 800, height: 700 },
    { name: 'tablet', width: 700, height: 1000 },
    { name: 'mobile_portrait', width: 390, height: 844 },
  ];

  for (const s of sizes) {
    const page = await browser.newPage({ viewport: { width: s.width, height: s.height } });
    await page.goto(fileUrl);
    await page.evaluate(() => {
      showCard({
        name: 'ヤマダタロウ',
        role: 'メンバー',
        member_id: '001',
        joined_date: '2025-04-01'
      });
    });
    await page.screenshot({ path: `screenshot_${s.name}.png` });
    await page.close();
  }

  await browser.close();
})();
