import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createTranslator } from 'next-intl';

describe('i18n Loader & next-intl Integration (TDD)', () => {
  let loader;

  test('loader module can be imported', async () => {
    loader = await import('../src/i18n/loader.ts');
    assert.ok(loader.loadNamespace, 'loadNamespace function must exist');
    assert.ok(loader.loadNamespaces, 'loadNamespaces function must exist');
    assert.ok(loader.loadAllMessages, 'loadAllMessages function must exist');
  });

  test('loadNamespace loads single namespace correctly', async () => {
    const commonEs = await loader.loadNamespace('es', 'common');
    assert.ok(commonEs.nav, 'common namespace in ES must contain nav');
    assert.ok(commonEs.footer, 'common namespace in ES must contain footer');
    assert.strictEqual(commonEs.nav.home, 'Inicio');

    const commonEn = await loader.loadNamespace('en', 'common');
    assert.strictEqual(commonEn.nav.home, 'Home');

    const commonPt = await loader.loadNamespace('pt', 'common');
    assert.strictEqual(commonPt.nav.home, 'Início');
  });

  test('loadNamespaces loads only requested namespaces for route modularity', async () => {
    // Simulating /projects route loading only ['common', 'projects']
    const routeMessages = await loader.loadNamespaces('es', ['common', 'projects']);
    assert.ok(routeMessages.nav, 'Must contain nav from common');
    assert.ok(routeMessages.footer, 'Must contain footer from common');
    assert.ok(routeMessages.projects, 'Must contain projects');
    assert.ok(Array.isArray(routeMessages.projects.list), 'Must have projects.list');
    assert.strictEqual(routeMessages.projects.list.length, 6);

    // Verifying other namespaces are NOT loaded (smaller payload)
    assert.strictEqual(routeMessages.services, undefined, 'services must NOT be loaded for /projects');
    assert.strictEqual(routeMessages.contact, undefined, 'contact must NOT be loaded for /projects');
    assert.strictEqual(routeMessages.profile, undefined, 'profile must NOT be loaded for /projects');
  });

  test('loadAllMessages aggregates all 6 namespaces seamlessly', async () => {
    for (const locale of ['es', 'en', 'pt']) {
      const all = await loader.loadAllMessages(locale);
      assert.ok(all.nav, `all.nav missing in ${locale}`);
      assert.ok(all.footer, `all.footer missing in ${locale}`);
      assert.ok(all.home, `all.home missing in ${locale}`);
      assert.ok(all.projects, `all.projects missing in ${locale}`);
      assert.ok(all.services, `all.services missing in ${locale}`);
      assert.ok(all.profile, `all.profile missing in ${locale}`);
      assert.ok(all.contact, `all.contact missing in ${locale}`);
    }
  });

  test('next-intl createTranslator works directly with loaded messages', async () => {
    const messages = await loader.loadAllMessages('es');
    const t = createTranslator({ locale: 'es', messages });

    assert.strictEqual(t('nav.home'), 'Inicio');
    assert.strictEqual(t('home.hero.title'), 'Optimizamos con IA.');
    assert.strictEqual(t('projects.list.0.name'), 'SIS Consultorios');
    assert.strictEqual(t('projects.list.1.name'), 'Orbit');
  });
});
