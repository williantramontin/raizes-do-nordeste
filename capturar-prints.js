const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'documento', 'imagens');
const base = 'https://williantramontin.github.io/raizes-do-nordeste';

async function shot(page, name, opts = {}) {
  const file = path.join(outDir, name);
  await page.screenshot({ path: file, fullPage: true, ...opts });
  console.log('OK:', name);
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await mobile.goto(base + '/', { waitUntil: 'networkidle' });
  await shot(mobile, 'tela-inicio.png');

  await mobile.goto(base + '/cadastro.html', { waitUntil: 'networkidle' });
  await shot(mobile, 'cadastro-lgpd.png');

  await mobile.goto(base + '/cardapio.html?unidade=1', { waitUntil: 'networkidle' });
  await shot(mobile, 'cardapio.png');

  await desktop.goto(base + '/cardapio.html?unidade=1', { waitUntil: 'networkidle' });
  await shot(desktop, 'cardapio-desktop.png');

  const pedidoMock = {
    id: 1234567890,
    itens: [
      { id: 1, nome: 'Tapioca de Carne de Sol', preco: 18.90, qtd: 2, icon: '🫓' },
      { id: 4, nome: 'Suco de Caju', preco: 9.0, qtd: 1, icon: '🥤' }
    ],
    total: 46.8,
    status: 'Recebido',
    data: '21/06/2026 14:30',
    unidadeId: 1
  };

  await mobile.goto(base + '/', { waitUntil: 'networkidle' });
  await mobile.evaluate((p) => localStorage.setItem('pedidoAtual', JSON.stringify(p)), pedidoMock);
  await mobile.goto(base + '/pagamento.html', { waitUntil: 'networkidle' });
  await shot(mobile, 'pagamento-antes.png');

  await mobile.click('#btn-pagar');
  await mobile.waitForTimeout(2500);
  await shot(mobile, 'pagamento-confirmado.png');

  await mobile.goto(base + '/', { waitUntil: 'networkidle' });
  await mobile.evaluate((p) => {
    p.status = 'Pago';
    localStorage.setItem('pedidoAtual', JSON.stringify(p));
  }, pedidoMock);
  await mobile.goto(base + '/pedido.html', { waitUntil: 'networkidle' });
  await shot(mobile, 'pedido-status.png');

  await mobile.goto(base + '/', { waitUntil: 'networkidle' });
  await mobile.evaluate((p) => {
    p.status = 'Recebido';
    localStorage.setItem('pedidoAtual', JSON.stringify(p));
  }, pedidoMock);
  await mobile.goto(base + '/pagamento.html', { waitUntil: 'networkidle' });
  await mobile.click('#btn-falha');
  await mobile.waitForTimeout(500);
  await shot(mobile, 'pagamento-erro.png');

  await mobile.goto(base + '/wireframes/', { waitUntil: 'networkidle' });
  await shot(mobile, 'wireframes-mobile.png');

  await desktop.goto(base + '/wireframes/', { waitUntil: 'networkidle' });
  await shot(desktop, 'wireframes-desktop.png');

  await browser.close();
  console.log('Capturas concluidas em', outDir);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
