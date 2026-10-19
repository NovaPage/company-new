import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const LOCALES = ['es', 'en', 'pt'];
const NAMESPACES = ['common', 'home', 'projects', 'services', 'profile', 'contact'];
const MESSAGES_DIR = path.resolve('src/messages');

describe('i18n Namespaces Structure (TDD)', () => {
  test('all locale directories exist', () => {
    for (const locale of LOCALES) {
      const locPath = path.join(MESSAGES_DIR, locale);
      assert.ok(fs.existsSync(locPath), `Locale directory for "${locale}" must exist at ${locPath}`);
    }
  });

  test('all namespace files exist in each locale', () => {
    for (const locale of LOCALES) {
      for (const ns of NAMESPACES) {
        const filePath = path.join(MESSAGES_DIR, locale, `${ns}.json`);
        assert.ok(fs.existsSync(filePath), `Namespace file "${ns}.json" must exist for locale "${locale}"`);
      }
    }
  });

  test('each namespace file contains valid JSON and non-empty content', () => {
    for (const locale of LOCALES) {
      for (const ns of NAMESPACES) {
        const filePath = path.join(MESSAGES_DIR, locale, `${ns}.json`);
        const content = fs.readFileSync(filePath, 'utf-8');
        let parsed;
        assert.doesNotThrow(() => {
          parsed = JSON.parse(content);
        }, `File ${filePath} must be valid JSON`);
        assert.ok(typeof parsed === 'object' && parsed !== null, `Namespace ${ns} must be an object`);
        assert.ok(Object.keys(parsed).length > 0, `Namespace ${ns} in ${locale} must not be empty`);
      }
    }
  });

  test('key symmetry across all 3 languages in every namespace', () => {
    function getAllKeys(obj, prefix = '') {
      const keys = new Set();
      if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
          for (let i = 0; i < obj.length; i++) {
            const current = `${prefix}[${i}]`;
            keys.add(current);
            for (const k of getAllKeys(obj[i], current)) keys.add(k);
          }
        } else {
          for (const [k, v] of Object.entries(obj)) {
            const current = prefix ? `${prefix}.${k}` : k;
            keys.add(current);
            for (const childKey of getAllKeys(v, current)) keys.add(childKey);
          }
        }
      }
      return keys;
    }

    for (const ns of NAMESPACES) {
      const esPath = path.join(MESSAGES_DIR, 'es', `${ns}.json`);
      const enPath = path.join(MESSAGES_DIR, 'en', `${ns}.json`);
      const ptPath = path.join(MESSAGES_DIR, 'pt', `${ns}.json`);

      const esData = JSON.parse(fs.readFileSync(esPath, 'utf-8'));
      const enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
      const ptData = JSON.parse(fs.readFileSync(ptPath, 'utf-8'));

      const esKeys = getAllKeys(esData);
      const enKeys = getAllKeys(enData);
      const ptKeys = getAllKeys(ptData);

      const diffEn = [...esKeys].filter(k => !enKeys.has(k));
      const diffPt = [...esKeys].filter(k => !ptKeys.has(k));

      assert.deepStrictEqual(diffEn, [], `Namespace ${ns} has missing keys in EN compared to ES: ${diffEn.join(', ')}`);
      assert.deepStrictEqual(diffPt, [], `Namespace ${ns} has missing keys in PT compared to ES: ${diffPt.join(', ')}`);
      assert.strictEqual(esKeys.size, enKeys.size, `Namespace ${ns} must have exact same number of keys in ES and EN`);
      assert.strictEqual(esKeys.size, ptKeys.size, `Namespace ${ns} must have exact same number of keys in ES and PT`);
    }
  });

  test('projects namespace contains all 6 expected projects with valid video IDs', () => {
    for (const locale of LOCALES) {
      const projectsPath = path.join(MESSAGES_DIR, locale, 'projects.json');
      const data = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
      const list = data.list;
      assert.ok(Array.isArray(list), `projects.list must be an array in ${locale}`);
      assert.strictEqual(list.length, 6, `projects.list must contain exactly 6 projects in ${locale}`);

      const expectedIds = ['sis', 'orbit', 'habits', 'dagua', 'outreach', 'eduplatform'];
      const actualIds = list.map(p => p.id);
      assert.deepStrictEqual(actualIds, expectedIds, `Projects IDs mismatch in ${locale}`);

      for (const p of list) {
        assert.ok(p.name, `Project ${p.id} must have a name in ${locale}`);
        assert.ok(p.tagline, `Project ${p.id} must have a tagline in ${locale}`);
        assert.ok(p.description, `Project ${p.id} must have a description in ${locale}`);
        assert.ok(p.videoId && p.videoId.length >= 10, `Project ${p.id} must have a valid YouTube videoId`);
      }
    }
  });
});
