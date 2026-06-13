# SINPE Bridge Front

Aplicacion movil Expo/React Native para operar el frente POS de SINPE Bridge.

## Requisitos

- Node.js compatible con Expo 54
- npm
- Un backend disponible con los endpoints configurados en `EXPO_PUBLIC_API_URL`

## Configuracion

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Crear `.env` basado en `.env.example`:

   ```bash
   EXPO_PUBLIC_API_URL=https://tu-api-publica
   ```

3. Iniciar la app:

   ```bash
   npm run start
   ```

## Scripts

- `npm run start`: abre Expo.
- `npm run android`: abre Expo en Android.
- `npm run ios`: abre Expo en iOS.
- `npm run web`: abre Expo Web.
- `npm run lint`: ejecuta lint.

## Modulos principales

- Ordenes disponibles.
- Revision manual de transacciones sospechosas.
- Notificaciones de pago por SignalR.
- Historial de transacciones.
- Intentos de fraude.
- Monitoreo del telefono POS.

## Validacion recomendada

```bash
npm run lint
npx tsc --noEmit
```
