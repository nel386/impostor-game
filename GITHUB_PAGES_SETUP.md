# Configuración de GitHub Pages

Este proyecto usa GitHub Actions para desplegar automáticamente a GitHub Pages desde la rama `main`.

## Configuración en GitHub

Para que el despliegue automático funcione, sigue estos pasos en el repositorio de GitHub:

1. Ve a **Settings** (Configuración) del repositorio
2. En el menú lateral, haz clic en **Pages**
3. En la sección **Build and deployment** (Construcción y despliegue):
   - **Source**: Selecciona **"GitHub Actions"**
   - ~~No selecciones "Deploy from a branch"~~

## ¿Cómo funciona?

### Despliegue Automático
- Cada vez que hagas `git push` a la rama `main`, GitHub Actions:
  1. Instala las dependencias (`npm ci`)
  2. Construye la aplicación (`npm run build`)
  3. Despliega el contenido de la carpeta `dist/` a GitHub Pages

### Despliegue Manual
- También puedes activar el workflow manualmente desde la pestaña **Actions** en GitHub
- Selecciona el workflow "Deploy to GitHub Pages"
- Haz clic en **"Run workflow"**

## URL del sitio

Una vez configurado, tu sitio estará disponible en:
```
https://nel386.github.io/impostor-game/
```

## Archivos importantes

- **`.github/workflows/deploy.yml`**: Workflow de GitHub Actions
- **`vite.config.ts`**: Configuración de Vite con `base: '/impostor-game/'` para GitHub Pages (este es el archivo que determina las rutas correctas)
- **`package.json`**: Contiene el campo `homepage` (opcional, usado por gh-pages CLI) y el script `deploy` para despliegue manual si se necesita

## Solución de problemas

### El sitio no carga correctamente
- Verifica que el campo `base` en `vite.config.ts` coincida con el nombre del repositorio
- Asegúrate de que GitHub Pages esté configurado para usar **"GitHub Actions"** como fuente

### El workflow falla
- Revisa los logs en la pestaña **Actions** del repositorio
- Verifica que `npm run build` funcione localmente antes de hacer push

### Cambios no se reflejan
- Los cambios pueden tardar 1-2 minutos en aparecer después del despliegue
- Limpia la caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)

## Migración desde gh-pages branch

Si previamente usabas la rama `gh-pages` con `npm run deploy`:
1. La rama `gh-pages` ya no es necesaria (pero puedes mantenerla si quieres)
2. El workflow ahora maneja todo automáticamente
3. El comando `npm run deploy` todavía existe y funciona como respaldo manual:
   - Útil si el workflow de GitHub Actions falla
   - Requiere ejecutar `npm run build` primero
   - Sube directamente a la rama gh-pages (no recomendado para uso regular)
