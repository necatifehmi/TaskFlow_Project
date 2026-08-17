# 🚀 TaskFlow - Görev & Analiz Yönetim Paneli

Staj dönemimde **VSCode** ortamında geliştirdiğim bu proje; **Python**, **HTML**, **CSS** ve **JavaScript** teknolojileri kullanılarak oluşturulmuş dinamik bir görev yönetim ve analiz panelidir.

Kullanıcıların günlük ve iş süreçlerindeki görevlerini kolayca organize etmelerini, durum bazlı takip yapabilmelerini ve istatistiksel grafiklerle süreçlerini analiz edebilmelerini sağlar.

---

## ✨ Öne Çıkan Özellikler

* 🌙 **Açık / Karanlık Mod (Dark/Light Mode):** Üst menüdeki tema butonu ile göz yormayan karanlık mod ve aydınlık mod arasında anlık geçiş yapılabilir. Tema tercihi hafızada (`localStorage`) saklanır.
* ➕ **Dinamik Görev Yönetimi:** 
  * Yeni görev ekleme modalı ile başlık, kategori (İş, Kişisel, Eğitim vb.), öncelik ve durum seçimi.
  * Görevlerin durumunu (*Bekliyor*, *Devam Ediyor*, *Tamamlandı*) tek tıkla güncelleme ve silme.
* 🔍 **Arama ve Filtreleme:** Kategoriye göre filtreleme yapabilme ve görev başlığı/açıklamasında anlık canlı arama.
* 📊 **Grafik ve İstatistik Analizleri:** **Chart.js** entegrasyonu sayesinde görevlerin kategorisel ve durum bazlı dağılımlarını Pasta (Pie) ve Halka (Doughnut) grafiklerle görselleştirme.
* 🔐 **Interaktif Giriş / Kayıt Ekranı:** Şık geçiş efektlerine sahip modal yapısıyla kullanıcı giriş ve kayıt simülasyonu (hatalı şifre uyarıları dahil).
* ⚙️ **Veri Yönetimi & Yerel Depolama:** Tüm veriler tarayıcı hafızasında saklanır. İstenildiğinde varsayılan örnek verileri yükleme veya sıfırlama seçeneği sunar.

---

## 🛠️ Kullanılan Teknolojiler

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Styling:** Tailwind CSS, FontAwesome & Boxicons
* **Grafik:** Chart.js
* **Backend / Geliştirme:** Python (Flask), VSCode