const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const pagePath = process.cwd() + "/.next/server/app/index.html";
  const HTMLcontent = fs.readFileSync(pagePath, "utf8");
  const CSSpath = process.cwd() + "/.next/static/css/";
  const CSSfiles = fs.readdirSync(CSSpath).filter((fn) => fn.endsWith(".css"));
  console.log(CSSfiles);
  const CSScontent = fs.readFileSync(CSSpath + CSSfiles[0], "utf8");

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--font-render-hinting=none",
    ],
  });
  const page = await browser.newPage();
  await page.setContent(HTMLcontent, {
    waitUntil: ["networkidle0"],
  });
  await page.addStyleTag({ content: CSScontent });
  await page.evaluateHandle("document.fonts.ready");

  await page.pdf({
    path: "public/cv.pdf",
    format: "A4",
    scale: 0.67,
    printBackground: true,
  });
  await browser.close();
})();
