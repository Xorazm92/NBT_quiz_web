# NBT Quiz Web Application

Ushbu loyiha NBT imtixonlariga tayyorgarlik ko'rish uchun mo'ljallangan interaktiv veb-ilovasi. Foydalanuvchilar turli yo'nalishlari bo'yicha savollardan test topshiriqlarini yechib, o'z bilimlarini sinab ko'rishlari mumkin.

## Xususiyatlari

- Interaktiv test topshirish interfeysi
- Turli fan yo'nalishlari bo'yicha savollar
- Real vaqt rejimida natijalarni ko'rsatish
- Responsive dizayn - barcha qurilmalarda ishlaydi
- Natijalarni saqlash va tahlil qilish imkoniyati

## Texnologiyalar

- HTML5
- CSS3
- JavaScript
- Local Storage

## O'rnatish

1. Loyihani clone qiling:
```bash
git clone https://github.com/Xorazm92/NBT_quiz_web.git
cd NBT_quiz_web
```

2. Loyihani ishga tushirish uchun index.html faylini brauzerda oching yoki web server orqali ishga tushiring.

## AWS'da Joylash (Deployment)

1. AWS EC2 instance yarating
2. Instance'ga SSH orqali ulaning
3. Nginx o'rnating:
```bash
sudo apt update
sudo apt install nginx git -y
```

4. Loyihani clone qiling:
```bash
sudo mkdir -p /var/www/quiz-app
cd /var/www/quiz-app
sudo git clone https://github.com/Xorazm92/NBT_quiz_web.git .
```

5. Nginx konfiguratsiyasini sozlang:
```bash
sudo nano /etc/nginx/sites-available/quiz-app
```

6. SSL sertifikat o'rnating:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx
```

## Foydalanish

1. Bosh sahifada "Boshlash" tugmasini bosing
2. Fan yo'nalishini tanlang
3. Savollarga javob bering
4. Test yakunida natijangizni ko'ring

## Hissa Qo'Shish

Loyihani yaxshilash bo'yicha takliflaringiz bo'lsa, Pull Request yuborishingiz mumkin.

## Litsenziya

MIT

## Muallif

[Your Name]

## Bog'lanish

- Website: [zufariy.uz]
- Email: [zufar.bobojonov.dev@gmail.com]
- Telegram: [(https://t.me/Zufar_Xorazmiy)]
