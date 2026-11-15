# Dokun — Çiftlik (PWA)

İnteraktif çocuk kitabı prototipi: tek çiftlik sahnesi, 6 hayvan, **Keşfet** ve **Bul bakalım** modları.

**Canlı (GitHub Pages):** https://saitgumus.github.io/dokun-ciftlik/

> Ses dosyaları **sentezlenmiş yer tutucudur**. Gerçek hayvan kayıtlarıyla değiştirilebilir.

## Çalıştırma

```bash
npm install
npm run dev
```

## Modlar

| Mod | Davranış |
|-----|----------|
| Keşfet | Hayvana dokun → yer tutucu ses + hafif hareket |
| Bul bakalım | “X nerede?” → doğru hayvana dokun |

## Hayvanlar

İnek, koyun, tavuk, at, ördek, keçi

## Deploy

`main` dalına push → GitHub Actions → Pages (`/.github/workflows/deploy-pages.yml`).

İlk seferde: **Settings → Pages → Source: GitHub Actions**.
