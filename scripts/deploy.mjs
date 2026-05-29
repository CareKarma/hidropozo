#!/usr/bin/env node
/**
 * Despliegue automatizado para Hidropozo.
 *
 * Hostinger publica desde la carpeta `dist/` commiteada en `master`.
 * Este script, desde tu rama de trabajo (ej. pruebasJairo):
 *   1. Verifica que no tengas cambios de código sin commitear.
 *   2. Cambia a master y mergea tu rama.
 *   3. Reconstruye dist/ (npm run build).
 *   4. Commitea dist/ y hace push de master (esto dispara el deploy).
 *   5. Hace push de tu rama y vuelve a ella, dejando dist/ listo para el preview local.
 *
 * Uso:  npm run deploy
 */
import { execSync } from 'node:child_process';

const MAIN = 'master';
const sh = (cmd) => execSync(cmd, { stdio: 'inherit' });
const cap = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();
const log = (msg) => console.log(`\n\x1b[36m▶ ${msg}\x1b[0m`);

try {
  const branch = cap('git rev-parse --abbrev-ref HEAD');
  log(`Rama actual: ${branch}`);

  // 1) No permitir desplegar con cambios de código sin commitear
  //    (se ignoran dist/ y .claude/, que no son parte del código fuente).
  //    OJO: no usar cap() aquí — su .trim() quita el espacio inicial de la
  //    primera línea del porcelain y desalinea el slice(3).
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  const dirty = status
    .split('\n')
    .filter(Boolean)
    .filter((line) => {
      const file = line.slice(3);
      return !file.startsWith('dist/') && !file.startsWith('.claude/');
    });
  if (dirty.length) {
    console.error('\n\x1b[31m✖ Tienes cambios sin commitear:\x1b[0m');
    console.error(dirty.join('\n'));
    console.error('\nHaz commit de tus cambios antes de desplegar (git add/commit).');
    process.exit(1);
  }

  // 2) Pasar a master y mergear la rama de trabajo
  if (branch !== MAIN) {
    log(`Cambiando a ${MAIN} y mergeando ${branch}…`);
    sh(`git checkout ${MAIN}`);
    sh(`git merge ${branch} --no-edit`);
  } else {
    log('Ya estás en master.');
  }

  // 3) Reconstruir el sitio
  log('Construyendo el sitio (npm run build)…');
  sh('npm run build');

  // 4) Commitear dist/ (está en .gitignore → se fuerza con -f)
  sh('git add -f -A -- dist');
  const distChanged = cap('git diff --cached --name-only -- dist');
  if (distChanged) {
    sh('git commit -m "build: dist/ para deploy en Hostinger"');
  } else {
    log('dist/ sin cambios; no hay nada nuevo que commitear.');
  }

  // 5) Publicar master (dispara el deploy de Hostinger)
  log(`Publicando ${MAIN}…`);
  sh(`git push origin ${MAIN}`);

  // 6) Sincronizar la rama de trabajo y volver a ella con dist/ reconstruido
  if (branch !== MAIN) {
    sh(`git push origin ${branch}`);
    sh(`git checkout ${branch}`);
    log('Reconstruyendo dist/ en tu rama de trabajo (para el preview local)…');
    sh('npm run build');
  }

  console.log('\n\x1b[32m✅ Despliegue completo. Hostinger publicará en breve.\x1b[0m\n');
} catch (err) {
  console.error('\n\x1b[31m✖ El despliegue falló.\x1b[0m Revisa el error de arriba.');
  console.error('Si fue un conflicto de merge, resuélvelo y vuelve a intentar.');
  process.exit(1);
}
