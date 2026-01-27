# 🚀 Resumen del Cambio de Despliegue

## El Problema
Antes: El código de la aplicación estaba en la rama `main`, pero GitHub Pages se desplegaba desde una rama `gh-pages` separada que había que actualizar manualmente con `npm run deploy`.

## La Solución
Ahora: GitHub Actions despliega automáticamente desde `main` a GitHub Pages cada vez que haces push.

## ✅ Cambios Realizados

1. **Workflow de GitHub Actions** (`.github/workflows/deploy.yml`)
   - Se ejecuta automáticamente en cada push a `main`
   - Construye la aplicación con Vite
   - Despliega a GitHub Pages sin intervención manual

2. **Configuración de Vite** (`vite.config.ts`)
   - Añadido `base: '/impostor-game/'` para rutas correctas en GitHub Pages

3. **Documentación actualizada**
   - README actualizado con nuevas instrucciones
   - Guía detallada en `GITHUB_PAGES_SETUP.md`

## 🔧 Configuración Final Requerida

**IMPORTANTE**: Después de hacer merge de este PR, debes cambiar la configuración en GitHub:

1. Ve a https://github.com/nel386/impostor-game/settings/pages
2. En **"Build and deployment"**:
   - Source: Cambia de **"Deploy from a branch"** a **"GitHub Actions"**
3. Guarda los cambios

## 🎉 Resultado

Una vez configurado:
- Cada `git push` a `main` despliega automáticamente
- No necesitas ejecutar `npm run deploy` manualmente
- El sitio siempre estará sincronizado con tu código en `main`
- URL del sitio: https://nel386.github.io/impostor-game/

## 📝 Comandos Importantes

```bash
# Desarrollo local
npm run dev

# Build para verificar
npm run build

# Preview del build
npm run preview

# Deploy manual (solo si falla GitHub Actions)
npm run build && npm run deploy
```

---

Para más detalles, consulta `GITHUB_PAGES_SETUP.md`
