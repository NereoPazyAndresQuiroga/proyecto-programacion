# AulaHub — Despliegue con Nginx

## Opciones de despliegue

### Opcion 1: Docker Compose (recomendada)

```bash
cd deploy
docker-compose up --build -d
```

La app estara disponible en `http://localhost`.

### Opcion 2: Docker manual

```bash
docker build -f deploy/Dockerfile -t aulahub:latest .
docker run -d -p 80:80 --name aulahub-nginx aulahub:latest
```

### Opcion 3: Nginx nativo (sin Docker)

1. Construir el proyecto:
```bash
npm run build
```

2. Copiar los archivos estaticos del cliente:
```bash
cp -r dist/* /var/www/aulahub/
```

3. Copiar la configuracion de Nginx:
```bash
cp deploy/nginx.conf /etc/nginx/sites-available/aulahub
ln -s /etc/nginx/sites-available/aulahub /etc/nginx/sites-enabled/aulahub
nginx -s reload
```

## Notas importantes

- Este setup sirve el **frontend estatico** (SPA). Las `server functions` (backend) requieren un servidor Node.js o Cloudflare Workers por separado.
- El routing de la SPA esta configurado con `try_files` para que todas las rutas caigan en `index.html`.
- Los assets estaticos tienen cache de 6 meses.
- Asegurate de configurar HTTPS en produccion (ver `deploy/nginx-ssl.conf`).
